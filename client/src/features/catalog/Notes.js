/*
  This is only Notes 
  --------------------------------

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

        fetchFilters: () => 

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

       
    }// END 

















*/