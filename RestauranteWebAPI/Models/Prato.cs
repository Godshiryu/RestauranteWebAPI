using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestauranteWebAPI.Models
{
    [Table("tb_prato")]
    public class Prato
    {
        [Key]
        public int id { get; set; }
        public string nome { get; set; }
        public double preco { get; set; }
        public int restauranteId { get; set; }
        public virtual Restaurante Restaurante { get; set; }
    }
}