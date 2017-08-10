using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace RestauranteWebAPI.Models
{
    [Table("tb_restaurante")]
    public class Restaurante
    {
        [Key]
        public int id { get; set; }
        public string nome { get; set; }
        public virtual List<Prato> pratos { get; set; }
    }
}