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

export async function getEvents({ signal } = {}) {
  const timeoutSignal = AbortSignal.timeout(8000)
  const combinedSignal = signal
    ? AbortSignal.any([signal, timeoutSignal])
    : timeoutSignal

  let response

  try {
    response = await fetch(apiUrl('/api/events'), { signal: combinedSignal })
  } catch (err) {
    if (err.name === 'AbortError') {
      throw err
    }

    throw new Error('Could not load events. Please try again.')
  }

  if (!response.ok) {
    throw new Error('Could not load events. Please try again.')
  }

  const payload = await response.json()
  return unwrapEvents(payload)
}
