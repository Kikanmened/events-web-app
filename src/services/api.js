import { getToken } from '../utils/auth'

const API_URL = import.meta.env.VITE_API_URL

export const registerUser = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Registration failed')
  }

  return data
}

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Login failed')
  }

  return data
}

export const authenticatedFetch = async (url, options = {}) => {
  const token = getToken()

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  }

  return fetch(url, {
    ...options,
    headers,
  })
}

export const getProfile = async () => {
  const response = await authenticatedFetch(`${API_URL}/api/auth/profile`)

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to get profile')
  }

  return data
}