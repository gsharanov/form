import style from './style.module.css'

const Button = ({name, className: cn, onClick}) => {
  return (
    <button onClick={onClick} className={`${style.button} ${cn ?? ''}`}>{name}</button>
  )
}

export default Button