import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CartModal = ({ isOpen, closeModal }) => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [quantities, setQuantities] = useState([]);

  // Fetch cart items from API
  const fetchCartItems = async () => {
    try {
      const response = await axios.get('https://ecommerce-mern-server-side.onrender.com/api/cart/cart');
      const initialQuantities = response.data.map(item => item.quantity);
      setCartItems(response.data);
      setQuantities(initialQuantities);
      calculateSubtotal(response.data, initialQuantities);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  // Calculate subtotal based on cart items and quantities
  const calculateSubtotal = (items, quantities) => {
    const total = items.reduce((sum, item, index) => sum + item.productId.currentPrice * quantities[index], 0);
    setSubtotal(total);
  };

  // Increase quantity for a specific item
  const increaseQuantity = async (index) => {
    const itemId = cartItems[index]._id; // Get item ID from cartItems

    try {
      const response = await axios.put(`https://ecommerce-mern-server-side.onrender.com/api/cart/cart/${itemId}/increase`);
      const updatedItem = response.data;

      setCartItems(prevItems => {
        const newItems = [...prevItems];
        newItems[index] = updatedItem;
        return newItems;
      });

      setQuantities(prevQuantities => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] += 1;
        calculateSubtotal(cartItems, newQuantities); // Recalculate subtotal
        return newQuantities;
      });
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  // Decrease quantity for a specific item, ensure quantity does not go below 1
  const decreaseQuantity = async (index) => {
    const itemId = cartItems[index]._id; // Get item ID from cartItems

    try {
      const response = await axios.put(`https://ecommerce-mern-server-side.onrender.com/api/cart/cart/${itemId}/decrease`);
      const updatedItem = response.data;

      setCartItems(prevItems => {
        const newItems = [...prevItems];
        newItems[index] = updatedItem;
        return newItems;
      });

      setQuantities(prevQuantities => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] = Math.max(newQuantities[index] - 1, 1);
        calculateSubtotal(cartItems, newQuantities); // Recalculate subtotal
        return newQuantities;
      });
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  // Handle quantity input change for a specific item
  const handleQuantityChange = (index, e) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantities(prevQuantities => {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[index] = value;
        calculateSubtotal(cartItems, updatedQuantities); // Recalculate subtotal
        return updatedQuantities;
      });
    }
  };

  // Remove item from cart
  const removeFromCart = async (id, index) => {
    try {
      const response = await axios.delete(`https://ecommerce-mern-server-side.onrender.com/api/cart/cart/${id}`);

      if (response.status === 200) {
        console.log(response.data.message); // "Product removed from cart"
        const updatedCartItems = cartItems.filter(item => item._id !== id);
        const updatedQuantities = quantities.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
        setQuantities(updatedQuantities);
        calculateSubtotal(updatedCartItems, updatedQuantities); // Recalculate subtotal

        // Save modal state to local storage and reload
        localStorage.setItem('isModalOpen', true);
       
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message); // Handle error message
      } else {
        console.error('An error occurred while removing from cart:', error.message);
        // Handle network or other errors
      }
    }
  };

  useEffect(() => {
    // Check local storage for modal state
    const isModalOpen = JSON.parse(localStorage.getItem('isModalOpen'));
    if (isModalOpen) {
      fetchCartItems();
      localStorage.removeItem('isModalOpen'); // Remove the item after use
    } else if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  return (
    <Transition show={isOpen || JSON.parse(localStorage.getItem('isModalOpen'))}>
      <Dialog className="fixed inset-0 overflow-hidden" onClose={closeModal}>
        <Transition.Child
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-70"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="flex justify-center items-center h-full w-full">
          <Transition.Child
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="w-full max-w-md">
              <div className="flex flex-col h-full bg-white shadow-xl">
                <div className="flex items-start justify-between px-4 mt-10 sm:px-6">
                  <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-500"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close panel</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="px-4 py-3 sm:px-6 flex-1 overflow-y-auto">
                  <ul role="list" className="divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <li key={item._id} className="flex py-4">
                        <div className="h-20 w-18 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={`https://ecommerce-mern-server-side.onrender.com/uploads/${item.image}`}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">{item.name}</a>
                            </h3>
                            <p className="ml-3 text-sm">{`Rs. ${item.productId.currentPrice * quantities[index]}`}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.color}</p>

                          <div className="flex justify-start items-center mt-4 gap-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Quantity:</label>
                            <div className="block mb-2 text-sm font-medium text-gray-900">
                              {item.quantity}
                            </div>
                              
                              
                          </div>

                          <div className="flex justify-end mt-2">
                            <button
                              type="button"
                              className="text-indigo-600 hover:text-indigo-500"
                              onClick={() => removeFromCart(item._id, index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>PKR. {subtotal.toFixed(1)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                </div>

                <Link to={"/checkout"} onClick={closeModal} className="px-4 py-4 sm:px-6">
                  <button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CartModal;
