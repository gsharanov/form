import { useState } from 'react';
import { Form, Input, Button } from '../../../../components';
import style from './style.module.css';
import { checkDate, checkFullName, editFullName } from './helper';
import { inputTypes } from '../../../../constants';

const UserDataForm = () => {
  const [isCheck, setIsCheck] = useState(false);
  const onValidate = () => setIsCheck(true);

  const commonParams = {
    isCheck:isCheck,
    required: true,
    className: style.input,
    onChangeValue: () => setIsCheck(false),
  };

  return (
    <Form className={style.container}>
      <div className={style.body}>
        <Input
          label='ФИО'
          type={inputTypes.USER_NAME}
          validator={checkFullName}
          normalize={editFullName}
          {...commonParams}
        />
        <Input
          label='Телефон'
          type={inputTypes.PHONE_NUMBER}
          {...commonParams}
        />
        <Input
          label='Email'
          type={inputTypes.EMAIL}
          {...commonParams}
        />
        <Input
          label='Дата'
          type={inputTypes.DATE}
          validator={checkDate}
          {...commonParams}
        />
      </div>
      <Button onClick={onValidate}>Продолжить</Button>
    </Form>
  );
};

export default UserDataForm;