/*
  This is only Notes 
  --------------------------------

Configuring Cloudinary to your project 
- need to have an cloudinary accoutn
- install CloudinaryDotNet from the NuGet gallery 
- Make sure CloudName, ApiKey and ApiSecret are available 
- Configure these keys either in appSetting.js or using termial as f.f
 But inorder to you could able to config the keys from terminal, you need to have 
 the 'Secret Manger Tool' command so, run the f.f command 

 dotnet user-secrets init 

Then, run the f.f 

dotnet user-secrets set "Cloudinary": "CloudName"
dotnet user-secrets set "Cloudinary": "ApiKey"
dotnet user-secrets set "Cloudinary": "ApiSecret"
















  Pagination
  ----------
  - evalution of an expression is delayed or deffered 
  IQuerable<T> 

  var query = _context.Products
             .OrderBy(prod => prod.Name)
             .Where(prod => prod.Brand.Contains("Angular"))
             .Skip(5)
             .Take(5)
             .AsQueryable()  ----- all this happens in memory 

             return query.ToListAsync() ---- at this stage we excute it against 
                                           the database 

    GetProducts(string orderBy)
    ----------------
    var query = await _context.Products.AsQueryable();
    
    expression tree 
    query = orderBy switch 
    {
        "price" => query.OrderBy(p => p.Price)
        "priceDesc" => query.OrderByDescending(p => p.Price),
        _ => query(p => p.name)
    };
    return await query.ToListAsync(); ---- against the DB 


    Filter 
    ---------------
    public static IQueryable<Product> Filter (this IQueryable<Product> query, string brands, string types){
        var brandList = new List<string>();
        var typesList = new List<string>();

        if (!string.IsNullOrEmpty(brands))
           brandList.AddRange(brands.ToLower().Split(",").ToList());

        if (!string.IsNullOrEmpty(types))
            typesList.AddRange(types.ToLower().Split(",").ToList());

        query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
        query = query.Where(p => p.typesList.Count == 0 || typesList.Contains(p.Type.ToLower()));

        return query;
        
        

        Pagination
        -------------------------

        public class PagedList<T> : List<T> 
        {
             public class PagedList(List<T> items, int count, int pageNumber, int pageSize) : List<T> 
        {
            MetaData = metaData;
        }

        public MetaData MetaData {get; set; }

        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetFilter()
        {
            --- creating anonymous object 
            ... use Select to project to sth other than Product in this case to Types ad Brands 
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new {types, brands});
        }

        fetchFilters: () =>   sb-ang1.png

        CLIENT SIDE 
        -----------------
        export const fetchFilters = createAsyncThuk (
            'catalog/fetchFilters',
            async (_, thunkAPI) => {
                try {
                    return agent.Catalog.fetchFilters

                } catch (error){

                }
            }
        )

        Authentication using JWT 
        -----------------------------------
        public class TokenService
        {
            public TokenService(UserManager<User> userManager, IConfiguration config)
            {
                _userManager = userManager;
                _config = config;
            }

            public async Task<string>  GeneerateToken(User user )
            {
                token contains three parts 
                1. Header: Algorithm used to encrypt the password, type of authentication used 
                2. Body or Payload: roles, claims and expiary date 
                3. Verification signature 

                -----adding the claims 
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, user.Email)
                    new Claim(ClaimTypes.Name, user.Name)

                    var roles = await _userManager.GetRolesAsync(user);
                    foreach (var role in roles)
                    {
                        claims.Add(new Claim(ClaimTypes.Role, role));
                    }
                }

                ----SIGNATURE 
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTSettings:TokenKey"]));

                var creds = new SigningCredentails(key, SecurityAlogorithms.HmacSha512);

                var tokenOptios = new JwtSecurityToken(
                    issuer: null,
                    audience: null,
                    claims: claims,
                    expires: DateTime.Now.AddDays(7),
                    signingCredentials: creds
                )

                return new JwtSecurityTokenHandler().WriteToken(tokenOptions);


            }


        }

        This is a note on middleware
        export default ({dispatch}) => next => action => {
            if (!action.payload || !action.payload.then){
                return next(action)
            }

            if it has a promise 
            action.payload.then((response) => {

            }){

            }
        }

        This is all about HIGHER FUNCTIONS 
        auht.js
        export default function(state, action){
            default: return state;
        }

       
    }// END 




NOTES ON GIT and GITHUB
-----------------------------------------------------------------













*/