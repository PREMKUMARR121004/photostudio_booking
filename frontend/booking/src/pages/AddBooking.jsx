
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../Context/useAuth'

function AddBooking() {
  const [service, setService] = useState([])
  const [selectedservice, setSelectedService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const { token } = useAuth()
  const navigate = useNavigate()

  const [serviceerror, setServiceError] = useState('')
  const [dateerror, setDateError] = useState('')
  const [timeerror, setTimeError] = useState('')
  const [confirm, setConfirm] = useState('')
  const [bookingerror, setBookingerror] = useState('')
  const [loading, setLoading] = useState(false)
  const [serviceLoading, setServiceLoading] = useState(true)

  useEffect(() => {
    async function fetchService() {
      if (!token) {
        setServiceLoading(false)
        return
      }

      try {
        setServiceLoading(true)

        
const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/getservices`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)


        setService(response.data)
      } catch (error) {
        console.log(error.response?.data || error.message)
        setBookingerror('Unable to load services. Please try again.')
      } finally {
        setServiceLoading(false)
      }
    }

    fetchService()
  }, [token])

  async function handleSubmit(event) {
    event.preventDefault()

    setServiceError('')
    setDateError('')
    setTimeError('')
    setConfirm('')
    setBookingerror('')

    let hasError = false

    if (!selectedservice) {
      setServiceError('Please select a service')
      hasError = true
    }

    if (!date) {
      setDateError('Please select a date')
      hasError = true
    } else {
      const today = new Date()
      const selectedDate = new Date(`${date}T00:00:00`)
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        setDateError('Please select today or a future date')
        hasError = true
      }
    }

    if (!time) {
      setTimeError('Please select a time')
      hasError = true
    }

    if (hasError) return

    const bookedService = {
      service: selectedservice,
      date,
      time
    }

    try {
      setLoading(true)

      await axios.post(
  `${import.meta.env.VITE_API_URL}/api/addbooking`,
  bookedService,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)

      setConfirm('Your booking request was submitted successfully!')
      setSelectedService('')
      setDate('')
      setTime('')
    } catch (error) {
      const message = error.response?.data?.message

      setBookingerror(
        typeof message === 'string'
          ? message
          : typeof error.response?.data === 'string'
            ? error.response.data
            : 'Unable to create your booking. Please try again.'
      )

      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-2xl">
          <div className='flex justify-end'>
       <button
      onClick={() => navigate(-1)}
      className="rounded-lg border border-gray-300 px-4 py-2  text-sm font-medium text-gray-700 transition hover:bg-gray-100"
    >
      ← Back
    </button></div>

        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Book Your Session
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Book a Photography Service
          </h1>

          <p className="mt-3 text-gray-500">
            Choose your service, date, and preferred time.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          {confirm && (
            <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-700">
              {confirm}

              <button
                type="button"
                onClick={() => navigate('/mybooking')}
                className="mt-2 block font-semibold underline"
              >
                View My Bookings
              </button>
            </div>
          )}

          {bookingerror && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {bookingerror}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Select Service
              </label>

              <select
                value={selectedservice}
                onChange={(event) => {
                  setSelectedService(event.target.value)
                  setServiceError('')
                  setConfirm('')
                  setBookingerror('')
                }}
                disabled={serviceLoading || service.length === 0}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              >
                <option value="">
                  {serviceLoading
                    ? 'Loading services...'
                    : service.length === 0
                      ? 'No services available'
                      : 'Choose a service'}
                </option>

                {service.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>

              {serviceerror && (
                <p className="mt-1 text-sm text-red-500">
                  {serviceerror}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Booking Date
              </label>

              <input
                type="date"
                value={date}
                min={new Date().toLocaleDateString('en-CA')}
                onChange={(event) => {
                  setDate(event.target.value)
                  setDateError('')
                  setConfirm('')
                  setBookingerror('')
                }}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {dateerror && (
                <p className="mt-1 text-sm text-red-500">
                  {dateerror}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Preferred Time
              </label>

              <input
                type="time"
                value={time}
                onChange={(event) => {
                  setTime(event.target.value)
                  setTimeError('')
                  setConfirm('')
                  setBookingerror('')
                }}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {timeerror && (
                <p className="mt-1 text-sm text-red-500">
                  {timeerror}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || serviceLoading || service.length === 0}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Submitting Booking...' : 'Confirm Booking'}
            </button>

          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Your booking will be subject to confirmation.
          </p>

        </div>
      </div>
    </div>
  )
}

export default AddBooking
