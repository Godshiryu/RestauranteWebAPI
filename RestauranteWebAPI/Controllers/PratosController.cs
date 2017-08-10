using System;
using System.Data;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using RestauranteWebAPI.Context;
using RestauranteWebAPI.Models;
using System.Web.Mvc;
using System.Collections.Generic;

namespace RestauranteWebAPI.Controllers
{
    public class PratosController : ApiController
    {
        private RestauranteContext db = new RestauranteContext();
        // GET: api/Pratos
        public JsonResult GetPratos()
        {
            return retornoEmJson((from p in db.Pratos   
                                 join r in db.Restaurantes on p.restauranteId equals r.id
                                 orderby p.nome
                                 select new { p.id, p.nome, p.preco, restauranteId = r.id, restauranteNome = r.nome}).ToArray());
        }

        // GET: api/Pratos/5
        [ResponseType(typeof(Prato))]
        public JsonResult GetPratoById(int id)
        {
            return retornoEmJson(db.Pratos.Where(prt => prt.id.Equals(id)).ToList().OrderBy(p => p.nome));
        }

        // POST: api/Prato
        [ResponseType(typeof(void))]
        public JsonResult PostPrato(Prato prato)
        {
            if (prato != null)
            {
                try
                { 
                    db.Pratos.Add(prato);
                    db.SaveChanges();
                    return retornoEmJson("Prato inserido com sucesso");
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                return retornoEmJson("Requisição de atualização de Prato inválida.");
            }
        }

        // PUT: api/Pratos/5
        [ResponseType(typeof(void))]
        public JsonResult PutPrato(int id, Prato prato)
        {
            if (prato != null)
            {
                try
                {
                    Prato pratoParaAtualizar = db.Pratos.Where(prt => prt.id.Equals(id)).FirstOrDefault();
                    pratoParaAtualizar.nome = (prato.nome != null ? prato.nome : pratoParaAtualizar.nome);
                    pratoParaAtualizar.preco = (prato.preco != 0 ? prato.preco : pratoParaAtualizar.preco);
                    pratoParaAtualizar.restauranteId = (prato.restauranteId != 0 ? prato.restauranteId : pratoParaAtualizar.restauranteId);
                    db.SaveChanges();
                    return retornoEmJson("Prato atualizado com sucesso!");
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                return retornoEmJson("Requisição de atualização de prato inválida.");
            }
        }

        // DELETE: api/Pratos/5
        [ResponseType(typeof(Prato))]
        public JsonResult DeletePrato(int id)
        {
            if (id != 0)
            {
                try
                {
                    Prato pratoParaDeletar = db.Pratos.Find(id);
                    if (pratoParaDeletar != null)
                    {
                        db.Pratos.Remove(pratoParaDeletar);
                        db.SaveChanges();
                        return retornoEmJson("Prato deletado com sucesso");
                    }
                    else
                    {
                        return retornoEmJson("Prato não encontrado!");
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                return retornoEmJson("Requisição de deleção de prato inválida.");
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
    }
}