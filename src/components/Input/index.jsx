import { useEffect, useRef, useState } from 'react';
import style from './style.module.css';
import { editDate, editPhoneNumber, checkPhoneNumber, checkEmail, formattingPhoneNumber } from './helper';
import { inputTypes } from '../../constants';
import { useLayoutEffect } from 'react';

const Input = ({ label, type, className: cn, isCheck, validator, required, normalize, onChangeValue }) => {
  const [value, setValue] = useState('');
  const [inFocus , setInFocus] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef(null);
  const cursorIndex = useRef(null);

  const getLabelClass = () => {
    let className = style.label;
    if (inFocus || inputRef.current?.value) 
      className += ' ' + style.labelFocus;
    return className;
  };

  const getPlaceholder = () => {
    if (!inFocus) return '';

    switch(type) {
      case inputTypes.DATE: return 'ДД.ММ.ГГГГ';
      default: return '';
    }
  };

  useEffect(() => {
    if (typeof cursorIndex.current === 'number') {
      inputRef.current.selectionStart = inputRef.current.selectionEnd = cursorIndex.current
    }
  });


  useEffect(() => {
    if (!isCheck) return;
    const { value } = inputRef.current;

    if (required && !inputRef.current.value) return setIsValid(false);

    if (validator) {
      // не стандартная валидация
      setIsValid(validator(value));
    } else {
      // стандартная валидация по типу данных
      switch(type) {
        case inputTypes.PHONE_NUMBER: {
          setIsValid(checkPhoneNumber(value));
          return formattingPhoneNumber(value, setValue);
        }
        case inputTypes.EMAIL: return setIsValid(checkEmail(value));
        default: setValue(value);
      }
    }
  }, [isCheck]);

  const onChange = (e) => {
    const {value: newValue} = e.target;
    if (!isValid) setIsValid(true); // если поле обновилось сбрасываем не валидность
    // нормализация
    if (normalize) return setValue(normalize(newValue));
    switch(type) {
      case inputTypes.PHONE_NUMBER: return editPhoneNumber(newValue, setValue);
      case inputTypes.DATE: return editDate(value, setValue, newValue, cursorIndex, inputRef);
      default: setValue(newValue);
    }
  };

  useEffect(() => {
    if (onChangeValue) onChangeValue(value);
  }, [value, onChangeValue]);

  return (
    <div className={`${style.container} ${isValid ? '': style.error} ${cn ?? ''}`}>
      <label className={getLabelClass()}>{label}{required ? '*' : null}</label>
      <input ref={inputRef} className={style.input}
        value={value}
        onChange={onChange}
        placeholder={getPlaceholder()}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      ></input>
    </div>
  );
};

export default Input;