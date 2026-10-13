
import React from 'react'

function ContactUs() {
  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Get in Touch
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Have questions about our photography services?
            Contact us to discuss your special moments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:shadow-md">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <span className="text-2xl">✉️</span>
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Email
            </h2>

            <p className="mt-3 wrap-break-word text-gray-600">
              Add your business email
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:shadow-md">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <span className="text-2xl">📞</span>
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Phone
            </h2>

            <p className="mt-3 text-gray-600">
              Add your contact number
            </p>
          </div>

       
<div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm transition hover:shadow-md sm:col-span-2">
  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
    <span className="text-2xl">🕒</span>
  </div>

  <h2 className="text-xl font-bold text-gray-900">
    Working Hours
  </h2>

  <p className="mt-3 text-gray-600">
    Monday – Saturday
  </p>

  <p className="mt-1 text-gray-600">
    9:00 AM – 6:00 PM
  </p>
</div>


        </div>

      </div>
    </div>
  )
}

export default ContactUs