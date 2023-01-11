import style from './style.module.css';

const Button = ({children, className: cn, onClick}) => {
  return (
    <button onClick={onClick} className={`${style.button} ${cn ?? ''}`}>{children}</button>
  );
};

export default Button;