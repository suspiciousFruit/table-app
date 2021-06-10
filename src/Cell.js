import React from 'react'
import {useState} from 'react'
import './Cell.css'

export default function Cell({ initValue, inputType, columnName, onDataChange }) {
    const [isRead, setIsRead] = useState(true);
    const [value, setValue] = useState(initValue);
  
    const clickHandler = () => setIsRead(!isRead);
    const keyPressHandler = (event) => {
      if (event.key === "Enter") {
        setIsRead(!isRead)
        onDataChange(columnName, value);
      }
    };
    const blurHandler = () => {
      setIsRead(!isRead);
      onDataChange(columnName, value);
    }
    const onChangeHandler = (event) => setValue(event.target.value);
  
    if (isRead)
      return (
        <div onClick={clickHandler} className="cell__div">
          {value}
        </div>
      );
  
    return (
      <div className="cell__input__container">
        <input
          className="cell__input"
          type={inputType}
          onKeyPress={keyPressHandler}
          onChange={onChangeHandler}
          onBlur={blurHandler}
          ref={(e) => e && e.focus()}
          value={value}
        />
      </div>
    );
};

