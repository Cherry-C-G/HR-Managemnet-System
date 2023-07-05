using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRSystem.Models
{
    [Table("User")]
    public class User
	{
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int PersonId { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ModificationDate { get; set; }

        [ForeignKey("PersonId")]
        public virtual Person Person { get; set; }
    }
}

