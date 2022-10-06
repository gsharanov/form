export const checkDate = (str) => {
  if (str.length !== 10) return false

  const day = +str.slice(0, 2)
  const month = +str.slice(3, 5)
  const year = +str.slice(6)

  const correctDate = new Date(year, month - 1, day) // месяца отсчитываются от 0 в отличии от года и дня
  // если дата введене не корретно, то резултат сдвинится
  if (correctDate.getDate() !== day ) return false
  if (correctDate.getMonth() + 1 !== month) return false
  if (correctDate.getFullYear() !== year) return false // !!! если год меньше 100 работает не корректно !!!
  // дата не больше текущей
  if (Date.now() < correctDate.getTime()) return false
  // data не меньше 01.01.2010
  const leftDate = new Date(2010, 0, 1)
  if (leftDate.getTime() > correctDate.getTime()) return false
  return true
}

export const checkFullName = (str) => {
  str = str.trimStart().trimEnd()
  if (str.length > 50) return false
  if (str.match(/ /g)?.length !== 2) return false
  return true
}

export const editFullName = (value) => {
  value = value.replaceAll(/[^а-яА-Я- ]/g, '')
  value = value.match(/[а-яА-Я-]+ |[а-яА-Я-]+$/g)
    ?.slice(0, 3)
    .map(el => el[0].toUpperCase() + el.slice(1).toLowerCase())
    .join('') ?? ''
  return value
}