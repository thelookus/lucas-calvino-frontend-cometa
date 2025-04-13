import { Timestamp } from 'firebase/firestore'

export const formatDate = (dateString: string | Timestamp) => {
  let date: Date

  if (dateString instanceof Timestamp) {
    date = dateString.toDate()
  } else {
    date = new Date(dateString)
  }

  const weekday = date.toLocaleDateString('es-ES', { weekday: 'short' })
  const day = date.getDate()
  const time = date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  return `${weekday} ${day}, ${time}`
}
