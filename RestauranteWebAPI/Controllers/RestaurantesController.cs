using System;
using System.Data;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using RestauranteWebAPI.Context;
using RestauranteWebAPI.Models;
using System.Web.Mvc;

namespace RestauranteWebAPI.Controllers
{
    public class RestaurantesController : ApiController
    {
        private RestauranteContext db = new RestauranteContext();
        // GET: api/Restaurantes
        public JsonResult GetRestaurantes()
        {
            return retornoEmJson(db.Restaurantes.OrderBy(r => r.nome));
        }

        // GET: api/Restaurantes/5
        [ResponseType(typeof(Restaurante))]
        public JsonResult GetRestauranteById(int id)
        {
            return retornoEmJson(db.Restaurantes.Where(rst => rst.id.Equals(id)).ToList().OrderBy(r => r.nome));
        }

        // GET: api/Restaurantes/5
        [ResponseType(typeof(Restaurante))]
        public JsonResult GetRestauranteByName(string nome)
        {
            return retornoEmJson(db.Restaurantes.Where(rst => rst.nome.Contains(nome)).ToList().OrderBy(r => r.nome));
        }

        // POST: api/Restaurantes
        [ResponseType(typeof(void))]
        public JsonResult PostRestaurante(Restaurante restaurante)
        {
            if (restaurante != null)
            {
                try
                {
                    db.Restaurantes.Add(restaurante);
                    db.SaveChanges();
                    return retornoEmJson("Restaurante inserido com sucesso");
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                return retornoEmJson("Requisição de atualização de Restaurante inválida.");
            }
        }

        // PUT: api/Restaurantes/5
        [ResponseType(typeof(void))]
        public JsonResult PutRestaurante(int id, Restaurante restaurante)
        {
            if (restaurante != null)
            {
                try
                {
                    if (id == 0)
                    {
                        db.Restaurantes.Add(restaurante);
                        db.SaveChanges();
                        return retornoEmJson("Restaurante inserido com sucesso");
                    }
                    else
                    {
                        Restaurante restauranteParaAtualizar = db.Restaurantes.Where(prt => prt.id.Equals(id)).FirstOrDefault();
                        restauranteParaAtualizar.nome = (restaurante.nome != null ? restaurante.nome : restauranteParaAtualizar.nome);
                        db.SaveChanges();
                        return retornoEmJson("Restaurante atualizado com sucesso!");
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                return retornoEmJson("Requisição de atualização de Restaurante inválida.");
            }
        }

        // DELETE: api/Restaurantes/5
        [ResponseType(typeof(Restaurante))]
        public JsonResult DeleteRestaurante(int id)
        {
            if (id != 0)
            {
                try
                {
                    Restaurante RestauranteParaDeletar = db.Restaurantes.Find(id);
                    if (RestauranteParaDeletar != null)
                    {
                        db.Restaurantes.Remove(RestauranteParaDeletar);
                        db.SaveChanges();
                        return retornoEmJson("Restaurante deletado com sucesso");
                    }
                    else
                    {
                        return retornoEmJson("Restaurante não encontrado!");
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                return retornoEmJson("Requisição de deleção de Restaurante inválida.");
            }
        }

        // Serialização dos dados
        private JsonResult retornoEmJson(Object entrada)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var retorno = new JsonResult();
            retorno.Data = entrada;
            retorno.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return retorno;
        }

        /*// GET: odata/Restaurantes
        [EnableQuery]
        public IQueryable<Restaurante> GetRestaurantes()
        {
            return db.Restaurantes;
        }

        // GET: odata/Restaurantes(5)
        [EnableQuery]
        public SingleResult<Restaurante> GetRestaurante([FromODataUri] int key)
        {
            return SingleResult.Create(db.Restaurantes.Where(restaurante => restaurante.id == key));
        }

        // PUT: odata/Restaurantes(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Restaurante> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Restaurante restaurante = db.Restaurantes.Find(key);
            if (restaurante == null)
            {
                return NotFound();
            }

            patch.Put(restaurante);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RestauranteExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(restaurante);
        }

        // POST: odata/Restaurantes
        public IHttpActionResult Post(Restaurante restaurante)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Restaurantes.Add(restaurante);
            db.SaveChanges();

            return Created(restaurante);
        }

        // PATCH: odata/Restaurantes(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Restaurante> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Restaurante restaurante = db.Restaurantes.Find(key);
            if (restaurante == null)
            {
                return NotFound();
            }

            patch.Patch(restaurante);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RestauranteExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(restaurante);
        }

        // DELETE: odata/Restaurantes(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Restaurante restaurante = db.Restaurantes.Find(key);
            if (restaurante == null)
            {
                return NotFound();
            }

            db.Restaurantes.Remove(restaurante);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Restaurantes(5)/Pratos
        [EnableQuery]
        public IQueryable<Prato> GetPratos([FromODataUri] int key)
        {
            return db.Restaurantes.Where(m => m.id == key).SelectMany(m => m.Pratos);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RestauranteExists(int key)
        {
            return db.Restaurantes.Count(e => e.id == key) > 0;
        }*/
    }
}
