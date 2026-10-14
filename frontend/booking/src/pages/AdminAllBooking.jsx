
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from '../Context/useAuth'
import {useNavigate} from 'react-router-dom'
function AdminAllBooking() {
  const { token } = useAuth()
  const navigate=useNavigate()
  const [allbooking, setAllBooking] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetcherror, setFetcherror] = useState('')
  const [update, setUpdate] = useState('')
  const [updateError, setUpdateError] = useState('')
  const [updatingId, setUpdatingId] = useState('')

  async function fetchAllBooking() {
    if (!token) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setFetcherror('')

     
const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/admin/allbooking`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)

      setAllBooking(response.data)
    } catch (error) {
      setFetcherror('Unable to load bookings. Please try again.')
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllBooking()
  }, [token])

  async function updateStatus(id, status) {
    try {
      setUpdatingId(id)
      setUpdate('')
      setUpdateError('')

     await axios.patch(
  `${import.meta.env.VITE_API_URL}/api/admin/updatebooking/${id}`,
  { status },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)

      setUpdate(`Booking ${status} successfully.`)

      await fetchAllBooking()
    } catch (error) {
      setUpdateError(
        error.response?.data?.message || 'Unable to update booking status.'
      )
      console.log(error.response?.data || error.message)
    } finally {
      setUpdatingId('')
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
        <p className="text-gray-500">Loading bookings...</p>
      </div>
    )
  }

  if (fetcherror) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-xl bg-red-50 p-5 text-center text-red-600">
        {fetcherror}

        <button
          onClick={fetchAllBooking}
          className="mt-3 block w-full font-semibold underline"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className='flex justify-end'>
       <button
      onClick={() => navigate(-1)}
      className="rounded-lg border border-gray-300 px-4 py-2  text-sm font-medium text-gray-700 transition hover:bg-gray-100"
    >
      ← Back
    </button></div>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Admin Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            All Bookings
          </h1>

          <p className="mt-2 text-gray-500">
            Review customer bookings and manage their status.
          </p>
        </div>

        {update && (
          <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {update}
          </div>
        )}

        {updateError && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {updateError}
          </div>
        )}

        {allbooking.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-5xl">📷</div>

            <h2 className="text-xl font-bold text-gray-900">
              No bookings yet
            </h2>

            <p className="mt-2 text-gray-500">
              Customer bookings will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5 text-sm text-gray-500">
              Total bookings: <span className="font-semibold text-gray-900">{allbooking.length}</span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

              {allbooking.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-gray-500">Photography Service</p>

                      <h2 className="mt-1 text-xl font-bold text-gray-900">
                        {item.service?.name || 'Photography Service'}
                      </h2>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
                    <div>
                      <p className="text-sm text-gray-500">Booking Date</p>
                      <p className="mt-1 font-medium text-gray-800">
                        {item.date}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Booking Time</p>
                      <p className="mt-1 font-medium text-gray-800">
                        {item.time}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5">
                    <button
                      onClick={() => updateStatus(item._id, 'accepted')}
                      disabled={updatingId === item._id || item.status === 'accepted'}
                      className="rounded-lg bg-green-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {updatingId === item._id ? 'Updating...' : 'Accept'}
                    </button>

                    <button
                      onClick={() => updateStatus(item._id, 'rejected')}
                      disabled={updatingId === item._id || item.status === 'rejected'}
                      className="rounded-lg bg-red-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {updatingId === item._id ? 'Updating...' : 'Reject'}
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default AdminAllBooking
