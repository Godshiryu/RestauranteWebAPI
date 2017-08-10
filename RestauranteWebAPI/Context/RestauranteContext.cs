using RestauranteWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RestauranteWebAPI.Context
{
    public class RestauranteContext : DbContext
    {
        public RestauranteContext() : base("name=stringConexaoRestaurantes")
        {
            Database.SetInitializer<RestauranteContext>(new DropCreateDatabaseIfModelChanges<RestauranteContext>());
            /*this.Configuration.LazyLoadingEnabled = false;*/
        }
        public DbSet<Restaurante> Restaurantes { get; set; }
        public DbSet<Prato> Pratos { get; set; }
    }
}