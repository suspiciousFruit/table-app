import React from 'react'
import {useState} from 'react'
import Cell from './Cell'
import './Row.css'

const Row = ({ item, index, onChooseHandler }) => {
    const [isChecked, setChecked] = useState(false);
  
    const changeHandler = (event) => {
      setChecked(!isChecked);
      onChooseHandler(index, !isChecked);
    };
  
    return (
      <div className="row__container">
        <Cell initValue={item.name} inputType="text" />
        <Cell initValue={item.type} inputType="text" />
        <Cell initValue={item.color} inputType="color" />
        <input onChange={changeHandler} type="checkbox" />
      </div>
    );
};

export default Row;

