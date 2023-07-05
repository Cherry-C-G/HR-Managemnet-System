using System;
using System.Text;
using Azure.Storage.Blobs;
using HRSystem.DAO;
using HRSystem.Middleware;
using HRSystem.Models;
using HRSystem.Services;
using HRSystem.Util;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddTransient<PersonInfoDAO>();
builder.Services.AddTransient<HouseDAO>();
builder.Services.AddDbContext<HRDbContext>();
builder.Services.AddTransient<OnBoardingDAO>();
builder.Services.AddTransient<PersonInfoService>();

//add blobServiceClient
builder.Services.AddScoped(_ =>
{
    return new BlobServiceClient(builder.Configuration.GetConnectionString("AzureStorage"));
});

builder.Services.AddSwaggerGen();

builder.Services.AddLogging(loggingbuilder =>
{
    _ = loggingbuilder.AddConsole();
    _ = loggingbuilder.AddDebug();
});

IConfigurationRoot config = new ConfigurationBuilder().AddJsonFile("appsettings.json", optional: false, reloadOnChange: true).Build();

builder.Services.AddSingleton<IConfiguration>(config);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(config.GetValue<string>("Jwt:Key")))
            };
        });

builder.Services.AddTransient<IJwtUtils, JWTTokenUtil>();
builder.Services.AddSingleton<JwtMiddleware>();
builder.Services.AddSingleton<ExceptionMiddleware>();
builder.Services.AddScoped<IFileService, FileService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});


WebApplication app = builder.Build();



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    _ = app.UseHsts();
}
else
{
    _ = app.UseSwagger();
    _ = app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("AllowLocalhost");

app.UseMiddleware<JwtMiddleware>();
app.UseMiddleware<ExceptionMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
