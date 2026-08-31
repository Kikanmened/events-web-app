export function getEventId(event) {
  return event?.id ?? event?._id ?? event?.eventId
}

export function getEventTitle(event) {
  return event?.title || event?.name || 'Untitled event'
}

export function getEventDate(event) {
  return event?.date || event?.dateTime || event?.datetime || event?.startDate || ''
}

export function getEventLocation(event) {
  return event?.location || event?.venue || ''
}

export function getEventDescription(event) {
  return event?.description || ''
}

export function getEventImage(event) {
  return event?.image || event?.imageUrl || event?.image_url || ''
}

export function sortEventsByDate(events) {
  return [...events].sort((a, b) => {
    const dateA = Date.parse(getEventDate(a))
    const dateB = Date.parse(getEventDate(b))
    const validA = Number.isNaN(dateA) ? Number.POSITIVE_INFINITY : dateA
    const validB = Number.isNaN(dateB) ? Number.POSITIVE_INFINITY : dateB
    return validB - validA
  })
}

export function formatEventDate(value) {
  const timestamp = Date.parse(value)

  if (Number.isNaN(timestamp)) {
    return value || 'Date to be announced'
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp))
}
