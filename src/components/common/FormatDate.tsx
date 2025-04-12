export function formatDate(date:string) {
  if (date) {
    const formattedDate =  new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
    return formattedDate
  } else {
    return '?'
  }
}