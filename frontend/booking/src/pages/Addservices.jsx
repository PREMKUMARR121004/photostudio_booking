
import React, { useState } from 'react'
import axios from 'axios'
import useAuth from '../Context/useAuth'
import { useNavigate } from 'react-router-dom'

function Addservices() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const [error, setError] = useState('')
  const [nameerror, setNameError] = useState('')
  const [descriptionerror, setDesError] = useState('')
  const [priceerror, setPriceError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const { token } = useAuth()

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setSuccess('')
    setNameError('')
    setDesError('')
    setPriceError('')

    let hasError = false

    if (!name) {
      setNameError('Please select a service.')
      hasError = true
    }

    if (!description.trim()) {
      setDesError('Please enter a description.')
      hasError = true
    }

    if (!price || Number(price) <= 0) {
      setPriceError('Please enter a price greater than zero.')
      hasError = true
    }

    if (hasError) {
      setError('Please correct the errors below.')
      return
    }

    const service = {
      name,
      description: description.trim(),
      price: Number(price)
    }

    try {
      setLoading(true)

    await axios.post(
  `${import.meta.env.VITE_API_URL}/api/admin/addservice`,
  service,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)

      setSuccess('Service added successfully!')

      setName('')
      setDescription('')
      setPrice('')
    } catch (error) {
      setError(
        error.response?.data?.message || 'Unable to add service. Please try again.'
      )
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
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
            Admin Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Add a Service
          </h1>

          <p className="mt-3 text-gray-500">
            Add a photography service and set its price.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
        >
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <div className="space-y-6">

            <div>
              <label
                htmlFor="serviceName"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Service Name
              </label>

              <select
                id="serviceName"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setNameError('')
                  setError('')
                  setSuccess('')
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select a service</option>
                <option value="Wedding">Wedding Photography</option>
                <option value="Portrait">Portrait Photography</option>
                <option value="Birthday">Birthday Photography</option>
                <option value="Function">Function Photography</option>
              </select>

              {nameerror && (
                <p className="mt-2 text-sm text-red-600">{nameerror}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                rows="4"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value)
                  setDesError('')
                  setError('')
                  setSuccess('')
                }}
                placeholder="Describe what this photography service includes..."
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {descriptionerror && (
                <p className="mt-2 text-sm text-red-600">{descriptionerror}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Price (₹)
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-gray-500">
                  ₹
                </span>

                <input
                  id="price"
                  type="number"
                  min="1"
                  step="1"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value)
                    setPriceError('')
                    setError('')
                    setSuccess('')
                  }}
                  placeholder="Enter service price"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-9 pr-4 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {priceerror && (
                <p className="mt-2 text-sm text-red-600">{priceerror}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Adding Service...' : '+ Add Service'}
            </button>

          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Check the service name, description, and price before adding.
        </p>

      </div>
    </div>
  )
}

export default Addservices
