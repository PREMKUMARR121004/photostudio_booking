
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useAuth from '../Context/useAuth'

function Services() {
  const [service, setService] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { token } = useAuth()

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true)
        setError('')

        const response = await axios.get(
          'http://localhost:5000/api/getservices',{
            headers:{
                Authorization:`Bearer ${token}`
            }
          }
        )

        setService(response.data)
      } catch (error) {
        setError('Unable to load services. Please try again.')
        console.log(error.response?.data || error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const bookingLink = token ? '/bookingservice' : '/register'

  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Our Photography Services
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-5xl">
            Every Moment Deserves to Be Remembered
          </h1>

          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
            From weddings to special celebrations, we capture your important
            moments with care and creativity.
          </p>
        </div>

        {loading ? (
          <p className="py-12 text-center text-gray-500">
            Loading services...
          </p>
        ) : error ? (
          <div className="rounded-xl bg-red-50 p-6 text-center text-red-600">
            {error}
          </div>
        ) : service.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              No services available yet
            </h2>
            <p className="mt-2 text-gray-500">
              Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.map((item) => (
              <div
                key={item._id}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold text-gray-900">
                    {item.name}
                  </h2>

                  <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700">
                    ₹{Number(item.price).toLocaleString('en-IN')}
                  </span>
                </div>

                <p className="flex-1 leading-7 text-gray-600">
                  {item.description}
                </p>

                <Link
                  to={bookingLink}
                  className="mt-6 block rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 rounded-2xl bg-gray-900 px-6 py-10 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to Capture Your Special Moments?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-300">
            Choose a service and book your photography session with us.
          </p>

          <Link
            to={bookingLink}
            className="mt-6 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            Book a Session
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Services
