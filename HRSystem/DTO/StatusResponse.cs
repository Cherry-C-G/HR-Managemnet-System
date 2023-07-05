namespace HRSystem.DTO
{
    using System;

    public class StatusResponse
    {
        public string? Status { get; set; }

        public string? VisaStatus { get; set; }

        public string? VisaType { get; set; }
        public string? Name { get; internal set; }
        public DateTime VisaEndDate { get; internal set; } = DateTime.MinValue;
        public string? Avatar { get; internal set; }
        public string? Comment { get; internal set; }
        public dynamic? DocumentComment { get; set; }
    }
}