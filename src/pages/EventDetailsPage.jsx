import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getEventById } from '../api/events.js'
import {
  formatEventDate,
  getEventDate,
  getEventDescription,
  getEventImage,
  getEventLocation,
  getEventTitle,
} from '../utils/eventFields.js'

function EventDetailsPage() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadEvent() {
      setStatus('loading')
      setError('')
      setEvent(null)

      try {
        const data = await getEventById(id, { signal: controller.signal })
        setEvent(data)
        setStatus('success')
      } catch (err) {
        if (err.name === 'AbortError') {
          return
        }

        if (err.name === 'EventNotFoundError') {
          setStatus('notfound')
          return
        }

        setError(err.message || 'Could not load this event. Please try again.')
        setStatus('error')
      }
    }

    loadEvent()

    return () => controller.abort()
  }, [id, reloadToken])

  const title = getEventTitle(event)
  const date = getEventDate(event)
  const location = getEventLocation(event)
  const description = getEventDescription(event)
  const image = getEventImage(event)

  return (
    <>
      <Link
        to="/"
        className="text-sm font-medium text-slate-700 underline underline-offset-4"
      >
        Back to events
      </Link>

      {status === 'loading' ? (
        <p className="mt-8 text-slate-600" aria-live="polite">
          Loading event…
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

      {status === 'notfound' ? (
        <div className="mt-8">
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            Event not found
          </h1>
          <p className="mt-2 text-slate-600">
            This event does not exist or may have been removed.
          </p>
        </div>
      ) : null}

      {status === 'success' && event ? (
        <article className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {image ? (
            <img src={image} alt="" className="h-64 w-full object-cover" />
          ) : null}

          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-semibold tracking-tight text-balance">
              {title}
            </h1>

            <p className="mt-3 text-slate-600">
              <time dateTime={date}>{formatEventDate(date)}</time>
            </p>

            {location ? <p className="mt-1 text-slate-600">{location}</p> : null}

            {description ? (
              <p className="mt-6 text-slate-700 text-pretty whitespace-pre-wrap">
                {description}
              </p>
            ) : (
              <p className="mt-6 text-slate-600">No description provided.</p>
            )}
          </div>
        </article>
      ) : null}
    </>
  )
}

export default EventDetailsPage
