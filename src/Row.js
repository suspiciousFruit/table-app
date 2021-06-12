import React from 'react'
import {useState} from 'react'
import Cell from './Cell'
import './Row.css'

const Row = ({ item, index, onChooseHandler, onDataChange }) => {
    const [isChecked, setChecked] = useState(false);
  
    const changeHandler = (event) => {
      setChecked(!isChecked);
      onChooseHandler(index, !isChecked);
    };
    
    const onDataChangeHandler = (key, value) => {
      const changes = {};
      changes[key] = value
      onDataChange(changes, index);
    };

    return (
      <div className="row__container">
        <Cell
        initValue={item.name}
        inputType="text"
        onDataChange={onDataChangeHandler}
        columnName="name"
      />
      <Cell
        initValue={item.type}
        inputType="text"
        onDataChange={onDataChangeHandler}
        columnName="type"
      />
      <Cell
        initValue={item.color}
        inputType="color"
        onDataChange={onDataChangeHandler}
        columnName="color"
      />
        <input
          className="row__checkbox"
          onChange={changeHandler}
          type="checkbox"
        />
      </div>
    );
};

export default Row;

