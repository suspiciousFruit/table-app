import React from 'react'
import {useState} from 'react'
import Row from './Row'
import './Table.css'


const Table = ({ initItems }) => {
    const [items, setItems] = useState(initItems);
    const [curId, setCurId] = useState(initItems.length);
  
    const [chooseItems, setChooseItems] = useState([]);
  
    const onChooseHandler = (index, isChecked) => {
      if (isChecked) setChooseItems([...chooseItems, index]);
      else setChooseItems(chooseItems.filter((i) => i !== index));
    };
  
    const onAddHandler = () => {
      setItems([...items, { id: curId, name: "", type: "", color: "" }]);
      setCurId(curId + 1);
    };
  
    const onRemoveHandler = () => {
      setItems(
        items.filter((el, i) => {
          return chooseItems.indexOf(i) === -1;
        })
      );
      setChooseItems([]);
    };
  
    const onChangeHandler = () => {
      if (chooseItems.length === 2) {
        const nItems = [...items];
        const [a, b] = chooseItems;
        const temp = nItems[a];
        nItems[a] = nItems[b];
        nItems[b] = temp;
        setItems(nItems);
      } else alert("Для обмена необходимо выбрать две записи");
    };
  
    const onSaveHandler = () => {
      localStorage.setItem("items", JSON.stringify({ items, curId }));
    };
  
    const onLoadHandler = () => {
      const nItems = JSON.parse(localStorage.getItem("items"));
      setItems(nItems.items);
      setCurId(nItems.curId);
    };
  
    const onDataChangeHandler = (changes, index) => {
      const nItems = [...items];
      nItems[index] = { ...nItems[index], ...changes };
      setItems(nItems);
    };

      ///// Drag and drop
    const [curIndex, setCurIndex] = useState(null)

    const onDragStartHandler = (e, index) => setCurIndex(index)
  
    const onDragEndHandler = (e, index) => {
      e.preventDefault();

      const nItems = [...items]
      const temp = nItems[index]
      nItems[index] = nItems[curIndex]
      nItems[curIndex] = temp
      setItems(nItems)
      setCurIndex(null)
    };
  
    const onDragOverHandler = (e) => e.preventDefault()

    return (
      <div className="table">
        <div>
          <div className="table__header">Name</div>
          <div className="table__header">Type</div>
          <div className="table__header">Color</div>
        </div>
        {items.map((item, index) => {
          return (
            <div
              draggable={true}
              onDragStart={e => onDragStartHandler(e, index)}
              onDragOver={e => onDragOverHandler(e)}
              onDrop={e => onDragEndHandler(e, index)}
            >
              <Row
                item={item}
                index={index}
                onChooseHandler={onChooseHandler}
                key={item.id}
                onDataChange={onDataChangeHandler}
              />
            </div>
          );
        })}
        <button onClick={onAddHandler}>Add line</button>
        <button onClick={onRemoveHandler}>Remove</button>
        <button onClick={onChangeHandler}>Change</button>
        <div>
          <button onClick={onSaveHandler}>Save Table</button>
          <button onClick={onLoadHandler}>Load Table</button>
        </div>
      </div>
    );
  };

export default Table;
