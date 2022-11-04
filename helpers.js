export const formatDate = (date) => {
  const [ weekday, month, space, day, time, year ] = date.toLocaleString().split(' ')
  return `${weekday}, ${month} ${day} ${year}`
}