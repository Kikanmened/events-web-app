import { useState } from 'react'
import { useNavigate } from 'react-router'
import { createEvent } from '../services/api'

function CreateEventPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    latitude: '',
    longitude: '',
  })

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setIsLoading(true)

    try {
      await createEvent({
        title: formData.title,
        description: formData.description,
        date: new Date(formData.date).toISOString(),
        location: formData.location,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      })

      navigate('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">
        Create event
      </h1>

      <p className="mt-2 text-slate-600">
        Create a new event.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
            placeholder="Event title"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
            placeholder="Describe your event"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Date and time
          </label>

          <input
            id="date"
            name="date"
            type="datetime-local"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Location
          </label>

          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
            placeholder="Event location"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="latitude"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Latitude
            </label>

            <input
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              value={formData.latitude}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
              placeholder="52.5200"
            />
          </div>

          <div>
            <label
              htmlFor="longitude"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Longitude
            </label>

            <input
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              value={formData.longitude}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
              placeholder="13.4050"
            />
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Creating event...' : 'Create event'}
        </button>
      </form>
    </div>
  )
}

export default CreateEventPage