// // ProductList.jsx
// import React, { useState } from 'react';
// import CartModal from '../CartModal/CartModal'; // Ensure you have the correct path

// const ProductList = ({ products, updateCart }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   const handleAddToCart = (product) => {
//     const updatedCart = [...cart, product];
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     updateCart(updatedCart);
//   };

//   return (
//     <div>
//       <button
//         onClick={openModal}
//         className="fixed top-4 right-4 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
//       >
//         View Cart
//       </button>
//       <CartModal isOpen={isOpen} closeModal={closeModal} cart={cart} updateCart={updateCart} />

//       {products.map((product) => (
//         <div key={product.id} className="border rounded-lg p-4 m-2">
//           <h2 className="text-xl font-bold">{product.name}</h2>
//           <p className="mt-2">{product.description}</p>
//           <p className="mt-2 text-lg font-semibold">${product.currentPrice}</p>
//           <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;
