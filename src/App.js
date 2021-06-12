import React from 'react'
import Table from './Table'
import './index.css'

function App() {
  const items = [
    { name: "name1", type: "main", color: "#f4f4f4" },
    { name: "name2", type: "side", color: "#f8f8f8" }
  ];

  const idItems = items.map((item, i) => {
    return { ...item, id: i };
  });

  
  return <Table initItems={idItems} />;
}

export default App;
