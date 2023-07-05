namespace HRSystem.Enum
{
    using System.ComponentModel;

    public enum VisaStatus
    {
        [Description("OPT Receipt")]
        OPT_Receipt = 1,

        [Description("OPT EAD")]
        OPT_EAD = 2,

        [Description("I-983")]
        I_983 = 3,

        [Description("I-20")]
        I_20 = 4,

        [Description("OPT STEM Receipt")]
        OPT_STEM_Receipt = 5,

        [Description("OPT STEM EAD")]
        OPT_STEM_EAD = 6,

        [Description("Unknown")]
        Unknown = 0
    }

}
