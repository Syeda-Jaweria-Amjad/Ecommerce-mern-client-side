import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import "./Card.css"
import Card from '../../components/Card/Card';


const PreLaunch = ({product}) => {
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
      <div className='bg-gray-950 text-white flex justify-center mt-3 font-semibold text-2xl lg:text-4xl md:text-3xl sm:text-xl py-5'>
        Pre - Launch
      </div>
      <div className="container mx-auto px-4 flex flex-wrap gap-8 my-8 justify-center">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {products.map((item) => (
          <Card key={item._id} item={item} />
        ))}
        </div>
      </div>
      
    </div>
  );
};

export default PreLaunch;
