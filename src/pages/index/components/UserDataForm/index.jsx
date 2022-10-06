import { useState } from 'react'
import { Form, Input, Button } from '../../../../components'
import style from './style.module.css'
import { checkDate, checkFullName, editFullName } from './helper'

const UserDataForm = () => {
  const [isCheck, setIsCheck] = useState(false)
  const onValidate = () => setIsCheck(true)

  const commonParams = {
    isCheck:isCheck,
    required: true,
    className: style.input,
    onChangeValue: () => setIsCheck(false),
  }

  return (
    <Form className={style.container}>
      <div className={style.body}>
        <Input
          label='ФИО'
          type="userName"
          validator={checkFullName}
          normalize={editFullName}
          {...commonParams}
        />
        <Input
          label='Телефон'
          type="phone-number"
          {...commonParams}
        />
        <Input
          label='Email'
          type="email"
          {...commonParams}
        />
        <Input
          label='Дата'
          type="date"
          validator={checkDate}
          {...commonParams}
        />
      </div>
      <Button
        name='Продолжить'
        onClick={onValidate}
      />
    </Form>
  )
}

export default UserDataForm