import style from './style.module.css'

const Form = ({children, className: cn, }) => {
  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form className={`${style.form} ${cn}`} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form