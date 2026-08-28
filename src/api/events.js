import { apiUrl } from './config.js'

function unwrapEvents(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.events)) {
    return payload.events
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  throw new Error('Events API returned an unexpected response.')
}

function unwrapEvent(payload) {
  if (payload?.event && typeof payload.event === 'object') {
    return payload.event
  }

  if (payload?.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) {
    return payload.data
  }

  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    return payload
  }

  throw new Error('Events API returned an unexpected response.')
}

async function fetchFromApi(path, { signal, errorMessage } = {}) {
  const timeoutSignal = AbortSignal.timeout(8000)
  const combinedSignal = signal
    ? AbortSignal.any([signal, timeoutSignal])
    : timeoutSignal

  try {
    return await fetch(apiUrl(path), { signal: combinedSignal })
  } catch (err) {
    if (err.name === 'AbortError') {
      throw err
    }

    throw new Error(errorMessage || 'Could not load events. Please try again.')
  }
}

export async function getEvents({ signal } = {}) {
  const response = await fetchFromApi('/api/events', {
    signal,
    errorMessage: 'Could not load events. Please try again.',
  })

  if (!response.ok) {
    throw new Error('Could not load events. Please try again.')
  }

  const payload = await response.json()
  return unwrapEvents(payload)
}

export async function getEventById(id, { signal } = {}) {
  const response = await fetchFromApi(`/api/events/${id}`, {
    signal,
    errorMessage: 'Could not load this event. Please try again.',
  })

  if (response.status === 404) {
    const error = new Error('Event not found.')
    error.name = 'EventNotFoundError'
    throw error
  }

  if (!response.ok) {
    throw new Error('Could not load this event. Please try again.')
  }

  const payload = await response.json()
  return unwrapEvent(payload)
}
