import { useEffect, useState } from 'react'
import { getEvents } from '../api/events.js'
import EventCard from '../components/EventCard.jsx'
import { getEventId, sortEventsByDate } from '../utils/eventFields.js'

function HomePage() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadEvents() {
      setStatus('loading')
      setError('')

      try {
        const data = await getEvents({ signal: controller.signal })
        setEvents(sortEventsByDate(data))
        setStatus('success')
      } catch (err) {
        if (err.name === 'AbortError') {
          return
        }

        setError(err.message || 'Could not load events. Please try again.')
        setStatus('error')
      }
    }

    loadEvents()

    return () => controller.abort()
  }, [reloadToken])

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight text-balance">Events</h1>
      <p className="mt-2 text-slate-600">Browse upcoming events in chronological order.</p>

      {status === 'loading' ? (
        <p className="mt-8 text-slate-600" aria-live="polite">
          Loading events…
        </p>
      ) : null}

      {status === 'error' ? (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5" role="alert">
          <p className="text-slate-800">{error}</p>
          <button
            type="button"
            className="mt-4 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
            onClick={() => setReloadToken((token) => token + 1)}
          >
            Try again
          </button>
        </div>
      ) : null}

      {status === 'success' && events.length === 0 ? (
        <p className="mt-8 text-slate-600">No events found.</p>
      ) : null}

      {status === 'success' && events.length > 0 ? (
        <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <li key={getEventId(event) ?? `event-${index}`}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
}

export default HomePage
