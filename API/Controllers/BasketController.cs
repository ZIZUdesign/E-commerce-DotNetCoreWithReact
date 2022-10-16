using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return MapBasketToDto(basket);
        }



        [HttpPost] // we get productId & quantity from queryString 
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            //get basket || in case the buyer has not basket from before, create the basket 
            var basket = await RetrieveBasket();
            // the FirstOrDefault method returns null if the basket is not found 
            if(basket == null) basket = CreateBasket(); 
            //get product 
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails{Title= "Product Not Found"});
            //add item
            basket.AddItem(product, quantity); 
            //save changes 
            var result = await _context.SaveChangesAsync() > 0;
            
            if (result )  return CreatedAtRoute("GetBasket", MapBasketToDto(basket)); 

            return BadRequest(new ProblemDetails{Title= "Problem saving item to basket"});

        }

       

        [HttpDelete]
        public async Task<ActionResult> RemoveBaksetItem(int productId, int quantity)
        {
            //get basket 
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            // get the item inside the basket and remove it
            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem removing item from the basket"});
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Basket
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            // add buyer id 
            var buyerId = Guid.NewGuid().ToString(); //is a unique id and used to get the buyer id from db
            var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            // create the basket 
            var basket = new Basket{BuyerId = buyerId}; 
            // add the new basket to the Baskets 
            _context.Basket.Add(basket);

            return basket; 

        
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}