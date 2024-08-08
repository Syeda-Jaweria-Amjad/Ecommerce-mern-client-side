import React from 'react'

const ContactForm = () => {
  return (
    <div>
      <section className="bg-black dark:bg-white">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-left text-white dark:text-black mx-3">Contact Us</h2>
          <form action="#" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-3">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-gray-800">Name:</label>
                <input type="text" id="name" className="block p-3 w-full text-sm text-white bg-gray-700 rounded-3xl border border-white focus:ring-primary-500 focus:border-primary-500 shadow-sm dark:bg-gray-200 dark:text-black" placeholder="Write here your Name" required />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white dark:text-gray-800">Phone:</label>
                <input type="text" id="phone" className="block p-3 w-full text-sm text-white bg-gray-700 rounded-3xl border border-white focus:ring-primary-500 focus:border-primary-500 shadow-sm dark:bg-gray-200 dark:text-black" placeholder="Write here your Phone Number" required />
              </div>
            </div>
            <div className='mx-3'>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-gray-800">Your email</label>
              <input type="email" id="email" className="shadow-sm bg-gray-700 border border-white text-white text-sm rounded-3xl focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:shadow-sm-light dark:bg-gray-200 dark:text-black" placeholder="name@flowbite.com" required />
            </div>
            <div className='mx-3'>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-white dark:text-gray-800">Your message</label>
              <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-white bg-gray-700 rounded-3xl shadow-sm border border-white focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-200 dark:text-black" placeholder="Leave a comment..." defaultValue={""} />
            </div>
            <button type="button" className="text-gray-900 mx-3 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-lg px-10 py-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ContactForm
