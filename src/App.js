import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState();
  const [showingProducts, setShowingProducts] = useState();
  const [selectedCategory, setSelectedCategory] = useState("Choose a category");
  const [selectedPrice, setSelectedPrice] = useState("Choose a price");

  const getProducts = async () => {
  
    const result = await fetch("https://fakestoreapi.com/products");
    const receivedProducts = await result.json();
    
    // This is just for showing "Loading spinner"
    setTimeout(() => {  
      setProducts(receivedProducts);
      setShowingProducts(receivedProducts)
      console.log("getProducts runned!");
    }, 4000);
   
  };

  useEffect(() => {
    getProducts();
    console.log("useEffect!");
  }, []);

  const selectFiltering = async (event) => {
    const selectedValue = event.target.value;

    if (event.target.id === "categories") {
      setSelectedCategory(selectedValue);
    } else if (event.target.id === "prices") {
      setSelectedPrice(selectedValue);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [selectedPrice, selectedCategory]);

  const applyFilters = () => {
    let filteredProducts = products;

    if (selectedCategory !== "Choose a category") {
      filteredProducts = filteredProducts.filter(item => item.category === selectedCategory);
    }

    if (selectedPrice !== "Choose a price") {
      const priceRange = selectedPrice.split("-");
      const minPrice = parseFloat(priceRange[0]);
      const maxPrice = parseFloat(priceRange[1]);
      
      filteredProducts = filteredProducts.filter(item => item.price >= minPrice && item.price <= maxPrice);
    }

    setShowingProducts(filteredProducts);
    console.log("applyFilters! Selected Category:", selectedCategory, "Selected Price:", selectedPrice);
  };

  const sortByRatingDescending = () => {
    const sortedProducts = [...showingProducts].sort((a, b) => b.rating.rate - a.rating.rate);
    setShowingProducts(sortedProducts);
  };

  const sortByPriceDescending = () => {
    const sortedProducts = [...showingProducts].sort((a, b) => b.price - a.price);
    setShowingProducts(sortedProducts);
  };

  const resetFilters = () => {
    setSelectedCategory("Choose a category");
    setSelectedPrice("Choose a price");
    setShowingProducts(products);
    console.log("All filters deleted!")
  };

  return (
    <div className="App mt-5">
      <button onClick={getProducts}>Fetch</button>
      <button onClick={() => console.log(products)}>log All products</button>
      {/* <button onClick={() => console.log(showingProducts)}>Show</button> */}
      <button onClick={sortByRatingDescending}>Sort by Rating (High to Low)</button>
      <button onClick={sortByPriceDescending}>Sort by Price (High to Low)</button>
      <button onClick={resetFilters}>Reset Filters</button>
      <a href="https://github.com/seyedehsandev/challenge1/" target='_blank' className='bg-red-800 text-white px-4 py-3 rounded-xl'>Repo</a>
      <br /><hr className='mt-5'/>

      <form className="max-w-sm mx-5 sm:mx-auto">
        <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select a category
        </label>
        <select
          id="categories"
          onChange={selectFiltering}
          value={selectedCategory}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="Choose a category" disabled>Choose a category</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>

        <label htmlFor="prices" className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select a price range
        </label>
        <select
          id="prices"
          onChange={selectFiltering}
          value={selectedPrice}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="Choose a price" disabled>Choose a price</option>
          <option value="0-20">$0 - $20</option>
          <option value="20-50">$20 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-1000">$100 - $1000</option>

        </select>
      </form>
    <hr className='my-4'/>
      <div className="product-list gap-x-4 gap-y-5 m-5">
        {showingProducts ? showingProducts.map(product => (
          

<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#" className='flex justify-center'>
        <img className="w-[300px] md:w-[350px] h-[250px] md:h-[350px] p-8 rounded-t-lg" src={product.image} alt="product image" />
    </a>
    <div className="px-5 pb-5">
        <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title.slice(0 ,25)}</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
  
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{product.rating.rate}</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
        </div>
    </div>
</div>

        )): (<div role="status">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>)}
      </div>
    </div>
  );
}

export default App;
