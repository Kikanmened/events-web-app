import { useParams } from 'react-router'

function EventDetailsPage() {
  const { id } = useParams()

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight text-balance">
        Event details
      </h1>
      <p className="mt-2 text-slate-600">
        Details for event {id} will be shown here.
      </p>
    </>
  )
}

export default EventDetailsPage
