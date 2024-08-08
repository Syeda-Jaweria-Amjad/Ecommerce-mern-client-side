import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
  return (
    <Link to={`/singleproduct/${item._id}`}>
      <div className='card-container'>
        <div className='img-div'>
          <div className='main-img'>
            <img className="" src={`https://ecommerce-mern-server-side.onrender.com/uploads/${item.image}`} alt="product not available" />
          </div>
          <div className='tag'>10% Sale</div>
        </div>
        <div className='content-container'>
          <div className='title-div'>{item.name}</div>
          <div className='star-div'>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${index < item.ratings ? 'text-yellow-300' : 'text-gray-200 dark:text-gray-600'}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{item.ratings.toFixed(1)}</span>
          </div>
          <div className='price-div'>
            <div className='old-price'>Rs.{item.oldPrice}</div>
            <div className='new-price'>Rs.{item.currentPrice}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
