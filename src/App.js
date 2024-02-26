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
    setProducts(receivedProducts);
    setShowingProducts(receivedProducts)
    console.log("getProducts runned!");
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
        {showingProducts && showingProducts.map(product => (
          

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

        ))}
      </div>
    </div>
  );
}

export default App;
