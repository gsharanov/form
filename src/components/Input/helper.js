const insert = (str, index, insertStr) => {
  return str.slice(0, index) + insertStr + str.slice(index)
}

export const checkEmail = (email) => {
  return /^[^а-яА-Я]*[^\.а-яА-Я]{1}[@][^\.а-яА-Я]+[^а-яА-Я]?[^\.а-яА-Я]+[.][^\.а-яА-Я]{2}[^а-яА-Я]{0,}$/.test(email)
}

export const checkPhoneNumber = (str) => {
  if (str.length !== 18) return false 
  // проверка на оператора
  if (['1', '2', '7'].includes(str[4])) return false
  return true
}

export const editPhoneNumber = (value, cb) => {
  value = value.match(/[0-9]*/g).filter(s => !!s).join('')
  if (value) {
    if (value[0] === '8') {
      value = '+7' + value.slice(1)
    } else if (value[0] === '7') {
      value = '+' + value
    } else if (value[0] !== '7') {
      value = '+7' + value
    }
  }

  if (value.length > 12) {
    value = value.slice(0, 12)
  }
  if (value.length > 10) {
    value = value.slice(0, 10) + '-' + value.slice(10)
  }
  if (value.length > 8) {
    value = insert(value, 8, '-')
  }
  if (value.length > 5) {
    value = insert(value, 5, ') ')
  }
  if (value.length > 2) {
    value = insert(value, 2, ' (')
  }

  cb(value)
}

export const editDate = (value, cb) => {
  value = value.match(/[0-9]*/g).filter(s => !!s).join('')

  if(value.length > 8) {
    value = value.slice(0, 8)
  }
  if (value.length > 4)
    value = insert(value, 4, '.')
  if (value.length > 2)
    value = insert(value, 2, '.')

  cb(value)
}