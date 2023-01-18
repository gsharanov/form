const insert = (str, index, insertStr) => {
  return str.slice(0, index) + insertStr + str.slice(index);
};

export const checkEmail = (email) => {
  if(email.length > 30) return false;
  return /^[-.0-9_a-zA-Z]{0,}[-0-9_a-zA-Z]+@[-0-9_a-zA-Z]+[-.0-9_a-zA-Z]?[-0-9_a-zA-Z]+\.[-0-9_a-zA-Z]+[-0-9_a-zA-Z]+[-.0-9_a-zA-Z]?$/.test(email);
};

export const checkPhoneNumber = (str) => {
  if (str.length < 11) return;
  const operatorCode = str.match(/[(][0-9]{3}[)]/)?.[0];
  if (operatorCode) {
    if (['1', '2', '7'].includes(operatorCode[1])) return false;
  } else {
    if (['1', '2', '7'].includes(str.slice(-10, -9))) return false;
  }
  return true;
};

export const formattingPhoneNumber = (value, cb) => {
  value = value.match(/[0-9]*/g).join('');
  if (value.length < 11) return;
  value = `+${value.slice(0, -10)} (${value.slice(-10,-7)}) ${value.slice(-7,-4)}-${value.slice(-4,-2)}-${value.slice(-2)}`;
  cb(value);
};

export const editPhoneNumber = (value, cb) => {
  value = value.match(/[0-9]*/g).filter(s => !!s).join('');
  cb(value);
};

export const editDate = (value, cb, newValue, cursorIndex, inputRef) => {
  const template = "ДД.ММ.ГГГГ";
  const selectionStart = inputRef.current.selectionStart;
  const isAddSimol = value.length < newValue.length
  let cursorOffset = 0;

  console.log(newValue, selectionStart)
  if (isAddSimol && newValue[selectionStart - 1].search(/\d/))
    return setTimeout(() => {
      inputRef.current.selectionStart = inputRef.current.selectionEnd = cursorIndex.current;
    });


  if (newValue.length === 1) {
    cursorIndex.current = selectionStart + cursorOffset;
    return cb(newValue + template.slice(1))
  }

  if (isAddSimol) {
    if ([2, 5].includes(selectionStart)) {
      cursorOffset = 1
    }
    newValue = newValue.slice(0, selectionStart) + newValue.slice(selectionStart + 1)
    if ([3, 6].includes(selectionStart)) {
      newValue = newValue.slice(0, selectionStart - 1) + template.slice(selectionStart - 1, selectionStart) + newValue[selectionStart - 1] + newValue.slice(selectionStart + 1);
      cursorOffset += 1;
    }
  } else {
    newValue = newValue.slice(0, selectionStart) + template.slice(selectionStart, selectionStart + 1) + newValue.slice(selectionStart)
    if ([2, 5].includes(selectionStart)) {
      newValue = newValue.slice(0, selectionStart - 1) + template.slice(selectionStart - 1, selectionStart) + newValue.slice(selectionStart)
      cursorOffset = -1
    }
  }

  cursorIndex.current = selectionStart + cursorOffset;

  if (newValue === template) return cb('')
  if (newValue === value) {
    setTimeout(() => {
      inputRef.current.selectionStart = inputRef.current.selectionEnd = cursorIndex.current;
    });
  }
  cb(newValue.slice(0, template.length));
};