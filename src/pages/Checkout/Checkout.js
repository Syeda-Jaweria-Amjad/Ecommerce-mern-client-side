import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [quantities, setQuantities] = useState([]);
  

    const fetchCartItems = async () => {
        try {
          const response = await axios.get('https://ecommerce-mern-server-side.onrender.com/api/cart/cart');
          const result = response.data
          setCartItems(result);
          console.log("checkout getting cart" , result)

          const initialQuantities = response.data.map(item => item.quantity);

          setQuantities(initialQuantities);
          calculateSubtotal(response.data, initialQuantities);
    

        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };

      const calculateSubtotal = (items, quantities) => {
        const total = items.reduce((sum, item, index) => sum + item.productId.currentPrice * quantities[index], 0);
        setSubtotal(total);
      };


      useEffect(() => {
          fetchCartItems();
      },[] );

  return (
    <div>
        <div className='mb-10 p-5'>
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <div className='text-gray-900 font-bold text-2xl'>Checkout</div>
                <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                <div className="relative">
                    <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                    <li className="flex items-center space-x-3 text-left sm:space-x-4">
                        <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></a>
                        <span className="font-semibold text-gray-900">Shop</span>
                    </li>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <li className="flex items-center space-x-3 text-left sm:space-x-4">
                        <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
                        <span className="font-semibold text-gray-900">Shipping</span>
                    </li>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <li className="flex items-center space-x-3 text-left sm:space-x-4">
                        <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                        <span className="font-semibold text-gray-500">Payment</span>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                <p className="text-xl font-medium">Order Summary</p>
                <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
                <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                {
                    cartItems.map((item) => (
                        <div key={item._id} className="flex flex-col rounded-lg bg-white sm:flex-row">
                        <img
                            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                            src={`https://ecommerce-mern-server-side.onrender.com/uploads/${item.image}`} // Replace with the image URL from item
                            alt={""}  // Replace with a meaningful alt text
                        />
                        <div className="flex w-full flex-col px-4 py-4">
                            <span className="font-semibold">{item.name}</span>
                            <span className="float-right text-gray-400">Size: {item.productId.size.join(', ')}</span> {/* Display sizes, if available */}
                            <span className="float-right text-gray-400">Quantity: {item.quantity}</span> {/* Display sizes, if available */}
                            <p className="text-lg font-bold">Rs. {item.productId.currentPrice}</p> {/* Format the price */}
                        </div>
                        </div>
                    ))
                    }

                    
                </div>
                <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                <form className="mt-5 grid gap-6">
                    <div className="relative">
                    <input className="peer hidden" id="radio_1" type="radio" name="radio" defaultChecked />
                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                    <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                        <div className="ml-5">
                        <span className="mt-2 font-semibold">Cash on Delivery </span>
                        <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                        </div>
                    </label>
                    </div>
                    <div className="relative">
                    <input className="peer hidden" id="radio_2" type="radio" name="radio" defaultChecked />
                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                    <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                        <div className="ml-5">
                        <span className="mt-2 font-semibold">Card Payment</span>
                        <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                        </div>
                    </label>
                    </div>
                </form>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                <p className="text-xl font-medium">Payment Details</p>
                <p className="text-gray-400">Complete your order by providing your payment details.</p>
                <div className>
                    <label htmlFor="name" className="mt-4 mb-2 block text-sm font-medium">Name</label>
                    <div className="relative">
                        <input type="text" id="name" name="name" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Write your name here" />
                    </div>

                    <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
                    <div className="relative">
                    <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
                    </div>
                    
                    <label htmlFor="phone" className="mt-4 mb-2 block text-sm font-medium">Phone</label>
                    <div className="relative">
                        <input type="text" id="phone" name="phone" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Write your Phone Number here" />
                    </div>
                    


                    <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
                    <div className="flex flex-col sm:flex-row">
                    <div className="relative flex-shrink-0 sm:w-7/12">
                        <input type="text" id="billing-address" name="billing-address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        </div>
                    </div>
                    <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                        <option value="State">State</option>
                        <option value="State">Punjab</option>
                        <option value="State">Sindh</option>
                        <option value="State">Balochistan</option>
                        <option value="State">KPK</option>
                    </select>
                    
                    <input type="text" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
                    </div>


                    {/* Total */}

                    <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Subtotal</p>
                        <p className="font-semibold text-gray-900">PKR. {subtotal}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Shipping</p>
                        <p className="font-semibold text-gray-900">Rs.200</p>
                    </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">Rs. {subtotal + 200}</p>
                    </div>
                </div>
                <Link to={"/summary"}>
                    <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
                </Link>
                </div>
            </div>
        </div>


    </div>
  )
}

export default Checkout
