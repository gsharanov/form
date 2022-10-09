const insert = (str, index, insertStr) => {
  return str.slice(0, index) + insertStr + str.slice(index)
}

export const checkEmail = (email) => {
  if(email.length > 30) return false
  return /^[-.0-9_a-zA-Z]{0,}[-0-9_a-zA-Z]+@[-0-9_a-zA-Z]+[-.0-9_a-zA-Z]?[-0-9_a-zA-Z]+\.[-0-9_a-zA-Z]+[-0-9_a-zA-Z]+[-.0-9_a-zA-Z]?$/.test(email)
}

export const checkPhoneNumber = (str) => {
  if (str.length < 11) return
  const operatorCode = str.match(/[(][0-9]{3}[)]/)?.[0]
  if (operatorCode) {
    if (['1', '2', '7'].includes(operatorCode[1])) return false
  } else {
    if (['1', '2', '7'].includes(str.slice(-10, -9))) return false
  }
  return true
}

export const formattingPhoneNumber = (value, cb) => {
  value = value.match(/[0-9]*/g).join('')
  if (value.length < 11) return
  value = `+${value.slice(0, -10)} (${value.slice(-10,-7)}) ${value.slice(-7,-4)}-${value.slice(-4,-2)}-${value.slice(-2)}`
  cb(value)
}

export const editPhoneNumber = (value, cb) => {
  value = value.match(/[0-9]*/g).filter(s => !!s).join('')
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