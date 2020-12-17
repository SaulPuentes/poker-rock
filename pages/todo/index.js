import React, {useEffect, useState } from 'react'
import { gameChannel } from '../../util/channel'
import { apiTodo } from '../../util/request'

export default function TodoApp(){

  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    receiveUpdateFromPusher()
  })


  const receiveUpdateFromPusher = () => {
    gameChannel.bind('new-task', data => {
      if (!items.includes(data.item))
        setItems([...items, data.item])
    })
  }

  const handleChange = (e) => {
      setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.length === 0) {
      return;
    }
    const newItem = {
      text,
      id: Date.now()
    };
    await apiTodo({ item: newItem });
    setText('');
  }

  return (<>

    <h3>Tareas pendientes</h3>
    <TodoList items={items}/>
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">
        ¿Qué se necesita hacer?
      </label>
      <input
        id="new-todo"
        onChange={handleChange}
        value={text}
      />
      <button>
        Añadir #{items.length + 1}
      </button>
    </form>    
  </>
  )
}


function TodoList(props){
  return<>
    <ul>
      {props.items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  </>

}