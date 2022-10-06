import { useEffect, useRef, useState } from 'react'
import style from './style.module.css'
import { editDate, editPhoneNumber, checkPhoneNumber, checkEmail } from './helper'

/**
 * @param {string} label - заголово
 * @param {string} type - тип данных (phone-number | date)
 * @param {string} className - добавляет класс к общему контейнеру
 * @param {boolean} isCheck - необходимо ли валидирирова поле
 * @param {boolean} required - Обязательное ли поле
 * @param {funсtion} validator - функция для валидации, в случае если не устраивает стандартная (return true | false)
 * @param {funсtion} normalize - Для нормализации данных принимает строку (return string)
 * @param {funсtion} onChangeValue - callback срабатывает после изменения даннх на вход получает строку
 */
const Input = ({ label, type, className: cn, isCheck, validator, required, normalize, onChangeValue }) => {
  const [value, setValue] = useState('')
  const [inFocus , setInFocus] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const inputRef = useRef(null)

  const getLabelClass = () => {
    let className = style.label
    if (inFocus || inputRef.current?.value) 
      className += ' ' + style.labelFocus
    return className
  }

  useEffect(() => {
    if (!isCheck) return
    const { value } = inputRef.current

    if (required && !inputRef.current.value) return setIsValid(false)

    if (validator) {
      // не стандартная валидация
      setIsValid(validator(value))
    } else {
      // стандартная валидация по типу данных
      switch(type) {
        case 'phone-number': return setIsValid(checkPhoneNumber(value))
        case 'email': return setIsValid(checkEmail(value))
        default: setValue(value)
      }
    }
  }, [isCheck])

  const onChange = (e) => {
    const {value} = e.target
    if (!isValid) setIsValid(true) // если поле обновилось сбрасываем не валидность
    // нормализация
    if (normalize) return setValue(normalize(value))
    switch(type) {
      case 'phone-number': return editPhoneNumber(value, setValue)
      case 'date': return editDate(value, setValue)
      default: setValue(value)
    }
  }

  useEffect(() => {
    if (onChangeValue) onChangeValue(value)
  }, [value])

  return (
    <div className={`${style.container} ${isValid ? '': style.error} ${cn ?? ''}`}>
      <label className={getLabelClass()}>{label}{required ? '*' : null}</label>
      <input ref={inputRef} className={style.input}
        value={value}
        onChange={onChange}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      ></input>
    </div>
  )
}

export default Input