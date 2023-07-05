using AuthService.DAO;
using AuthService.Middleware;
using AuthService.Util;
using Microsoft.EntityFrameworkCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddLogging(loggingbuilder =>
{
    _ = loggingbuilder.AddConsole();
    _ = loggingbuilder.AddDebug();
});

IConfigurationRoot config = new ConfigurationBuilder().AddJsonFile("appsettings.json", optional: false, reloadOnChange: true).Build();

builder.Services.AddSingleton<IConfiguration>(config);

builder.Services.AddDbContext<AuthDbContext>(option =>
    option.UseSqlServer(builder.Configuration.GetConnectionString("Default")));


//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//        .AddJwtBearer(options =>
//        {
//            options.TokenValidationParameters = new TokenValidationParameters
//            {
//                ValidateIssuer = true,
//                ValidateAudience = true,
//                ValidateLifetime = true,
//                ValidateIssuerSigningKey = true,
//                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(config.GetValue<string>("Jwt:Key")))
//            };
//        });



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddTransient<IJwtUtils, JWTTokenUtil>();
//builder.Services.AddSingleton<JwtMiddleware>();
//builder.Services.AddSingleton<ExceptionMiddleware>();

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    _ = app.UseSwagger();
    _ = app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

//app.UseHttpsRedirection();


app.UseRouting();
app.UseCors("AllowLocalhost");

//app.UseMiddleware<ExceptionMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
