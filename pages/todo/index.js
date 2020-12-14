import React, {useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import axios from 'axios'

const pusher = new Pusher('18af7ca777e2024297da', {
  cluster: 'mt1'
})

const channel = pusher.subscribe('poker-rock')

export default function TodoApp(){

  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    receiveUpdateFromPusher()
  })


  const receiveUpdateFromPusher = () => {
    channel.bind('new-task', data => {
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
    axios.post('http://localhost:8080/add-task', { item: newItem })
    .then(res => {
      console.log('received by server')
    })
    .catch(error => {
      throw error
    })
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
}//End of Home


function TodoList(props){
  return<>
    <ul>
      {props.items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  </>

}//End of TodoList