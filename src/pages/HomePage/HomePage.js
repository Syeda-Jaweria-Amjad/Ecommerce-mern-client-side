import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Hero from "../../components/HeroSection/Hero";
import axios from "axios";


const HomePage = () => {
  const [products, setProducts] = useState([]);
  

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://ecommerce-mern-server-side.onrender.com/api/products/getproduct', 
        {
          header:{
            'Content-type': "application/json"
          }
        });

      setProducts(response.data);
      
      console.log(response.data);
    } catch (error) {
      console.error('There has been a problem with your Axios operation:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div>
        <Hero />
        <div className="sm:text-2xl md:text-3xl lg:text-4xl text-black flex justify-center p-6 font-extrabold mt-7">
          PRE-LAUNCH COLLECTION
        </div>
        <div className="container mx-auto px-4 flex flex-wrap gap-8 my-8 justify-center">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"> {/* Use flex class here */}
    {products.slice(0,3).map((item) => (
      <Card key={item._id} item={item} />
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default HomePage;
