import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight text-balance">
        Page not found
      </h1>
      <p className="mt-2 text-slate-600">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block text-sm font-medium text-slate-900 underline underline-offset-4"
      >
        Back to events
      </Link>
    </>
  )
}

export default NotFoundPage
