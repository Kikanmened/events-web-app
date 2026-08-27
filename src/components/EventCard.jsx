import { Link } from 'react-router'
import {
  formatEventDate,
  getEventDate,
  getEventDescription,
  getEventId,
  getEventImage,
  getEventLocation,
  getEventTitle,
} from '../utils/eventFields.js'

function EventCard({ event }) {
  const id = getEventId(event)
  const title = getEventTitle(event)
  const date = getEventDate(event)
  const location = getEventLocation(event)
  const description = getEventDescription(event)
  const image = getEventImage(event)
  const detailsPath = id != null ? `/events/${id}` : '/'

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {image ? (
        <img src={image} alt="" className="h-40 w-full object-cover" />
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 text-balance">
          <Link to={detailsPath} className="hover:underline">
            {title}
          </Link>
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          <time dateTime={date}>{formatEventDate(date)}</time>
        </p>

        {location ? <p className="mt-1 text-sm text-slate-600">{location}</p> : null}

        {description ? (
          <p className="mt-3 line-clamp-3 text-sm text-slate-600 text-pretty">
            {description}
          </p>
        ) : null}

        <Link
          to={detailsPath}
          className="mt-auto pt-4 text-sm font-medium text-slate-900 underline underline-offset-4"
        >
          View details
        </Link>
      </div>
    </article>
  )
}

export default EventCard
