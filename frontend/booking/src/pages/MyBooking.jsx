
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from '../Context/useAuth'
import { useNavigate } from 'react-router-dom'
function MyBooking() {
  const { token } = useAuth()

  const [booking, setBooking] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancelLoading, setCancelLoading] = useState('')
  const [error, setError] = useState('')
  const [cancelError, setCancelError] = useState('')
  const navigate=useNavigate()
  async function fetchBooking() {
    if (!token) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError('')

      
const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/mybooking`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)


      setBooking(response.data)
    } catch (error) {
      setError('Unable to load your bookings. Please try again.')
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooking()
  }, [token])

  async function handleDelete(id) {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this booking?'
    )

    if (!confirmCancel) return

    try {
      setCancelLoading(id)
      setCancelError('')

      
await axios.delete(
  `${import.meta.env.VITE_API_URL}/api/cancelbooking/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)


      setBooking((previousBooking) =>
        previousBooking.filter((item) => item._id !== id)
      )
    } catch (error) {
      setCancelError(
        error.response?.data?.message || 'Unable to cancel this booking.'
      )
      console.log(error.response?.data || error.message)
    } finally {
      setCancelLoading('')
    }
  }

  function getStatusStyle(status) {
    if (status === 'accepted') {
      return 'bg-green-100 text-green-700'
    }

    if (status === 'rejected') {
      return 'bg-red-100 text-red-700'
    }

    return 'bg-yellow-100 text-yellow-700'
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading your bookings...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-xl bg-red-50 p-5 text-center text-red-600">
        {error}
        <button
          onClick={fetchBooking}
          className="mt-3 block w-full font-semibold text-red-700 underline"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
          <div className='flex justify-end'>
       <button
      onClick={() => navigate(-1)}
      className="rounded-lg border border-gray-300 px-4 py-2  text-sm font-medium text-gray-700 transition hover:bg-gray-100"
    >
      ← Back
    </button></div>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Your Sessions
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 text-gray-500">
            View your photography sessions and booking status.
          </p>
        </div>

        {cancelError && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {cancelError}
          </div>
        )}

        {booking.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-5xl">📸</div>

            <h2 className="text-xl font-bold text-gray-900">
              No bookings yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your photography bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {booking.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">

                  <div>
                    <p className="text-sm text-gray-500">Photography Service</p>

                    <h2 className="mt-1 text-xl font-bold text-gray-900">
                      {item.service?.name || 'Photography Service'}
                    </h2>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(item.status)}`}
                  >
                    {item.status}
                  </span>

                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">

                  <div>
                    <p className="text-sm text-gray-500">Booking Date</p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {item.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Booking Time</p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {item.time}
                    </p>
                  </div>

                </div>

                <div className="mt-6 border-t border-gray-100 pt-5">
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={cancelLoading === item._id}
                    className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {cancelLoading === item._id
                      ? 'Cancelling...'
                      : 'Cancel Booking'}
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  )
}

export default MyBooking
