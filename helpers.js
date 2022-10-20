export const formatDate = (date) => {
  const [ weekday, month, day, time, year ] = date.toLocaleString().split(' ')
  return `${weekday}, ${month} ${day} ${year}`
}