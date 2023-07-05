namespace HRSystem.Extension
{
    using System.ComponentModel;
    using System.Reflection;

    public static class EnumExtensions
    {
        public static string GetDescription(this System.Enum value)
        {
            Type type = value.GetType();
            MemberInfo[] memInfo = type.GetMember(value.ToString());
            if (memInfo.Length > 0)
            {
                object[] attributes = memInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                if (attributes.Length > 0)
                {
                    return ((DescriptionAttribute)attributes[0]).Description;
                }
            }
            return value.ToString();
        }
    }

}
