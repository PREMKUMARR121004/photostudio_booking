
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useAuth from '../Context/useAuth'
import { useNavigate } from 'react-router-dom'

function Getservices() {
  const [service, setService] = useState([])
  const [selectedService, setSelectedService] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newPrice, setNewPrice] = useState("")

  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const { token } = useAuth()
  const navigate=useNavigate()
  async function fetchService() {
    try {
      setLoading(true)
      setError("")

      
const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/admin/getservices`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)


      setService(response.data)
    } catch (error) {
      setError("Unable to load services. Please try again.")
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchService()
    }
  }, [token])

  async function handleAddService(event) {
    event.preventDefault()

    try {
      setLoading(true)
      setError("")
      setMessage("")

      const newService = {
        name: newName,
        description: newDescription,
        price: Number(newPrice)
      }

    
await axios.post(
  `${import.meta.env.VITE_API_URL}/api/admin/addservice`,
  newService,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)


      setNewName("")
      setNewDescription("")
      setNewPrice("")
      setShowAddForm(false)

      setMessage("Service added successfully.")
      await fetchService()
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to add service. Please try again."
      )
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(item) {
    setSelectedService(item)
    setName(item.name)
    setDescription(item.description)
    setPrice(item.price)
    setError("")
    setMessage("")
  }

  async function handleUpdate(event, id) {
    event.preventDefault()

    try {
      setLoading(true)
      setError("")
      setMessage("")

      const updatedService = {
        name,
        description,
        price: Number(price)
      }

     
await axios.put(
  `${import.meta.env.VITE_API_URL}/api/admin/updateservices/${id}`,
  updatedService,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)


      setSelectedService(null)
      setMessage("Service updated successfully.")
      await fetchService()
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to update service. Please try again."
      )
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    )

    if (!confirmDelete) return

    try {
      setError("")
      setMessage("")

      
await axios.delete(
  `${import.meta.env.VITE_API_URL}/api/admin/deleteservice/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)


      setService((previousServices) =>
        previousServices.filter((item) => item._id !== id)
      )

      setMessage("Service deleted successfully.")
    } catch (error) {
      setError("Unable to delete service. Please try again.")
      console.log(error.response?.data || error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
          <div className='flex justify-end'>
       <button
      onClick={() => navigate(-1)}
      className="rounded-lg border border-gray-300 px-4 py-2  text-sm font-medium text-gray-700 transition hover:bg-gray-100"
    >
      ← Back
    </button></div>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Manage Services
          </h1>

          <p className="mt-2 text-gray-600">
            Add, edit and manage your photography services.
          </p>
        </div>

        {message && (
          <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={() => {
              setShowAddForm(!showAddForm)
              setError("")
              setMessage("")
            }}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {showAddForm ? "Cancel" : "+ Add Service"}
          </button>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleAddService}
            className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              Add New Service
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Service Name
                </label>

                <select
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select a service</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Function">Function</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price (₹)
                </label>

                <input
                  type="number"
                  min="1"
                  value={newPrice}
                  onChange={(event) => setNewPrice(event.target.value)}
                  required
                  placeholder="Enter price"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  value={newDescription}
                  onChange={(event) => setNewDescription(event.target.value)}
                  required
                  rows={3}
                  placeholder="Describe this photography service"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Adding..." : "Save Service"}
            </button>
          </form>
        )}

        {loading && service.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            Loading services...
          </p>
        ) : service.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              No services found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Add a service to see it listed here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.map((item) => (
              <div
                key={item._id}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold text-gray-900">
                    {item.name}
                  </h2>

                  <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                    ₹{Number(item.price).toLocaleString('en-IN')}
                  </span>
                </div>

                <p className="flex-1 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="flex-1 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
            <div className="my-6 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8">

              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Service
                </h2>

                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="rounded-lg px-3 py-1 text-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Close edit form"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={(event) =>
                  handleUpdate(event, selectedService._id)
                }
                className="space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Service Name
                  </label>

                  <select
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Function">Function</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter service description"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Price (₹)
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter price"
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Getservices
