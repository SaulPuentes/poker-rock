import React, {useState } from 'react'
import { signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

function TodoApp(){
    const [items, setItems] = useState([]);
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (text.length === 0) {
        return;
      }
      const newItem = {
        text,
        id: Date.now()
      };
      setItems(items.concat(newItem));
      setText('');
    }

    return (<>
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
  }//End of TodoApp


  function TodoList(props){
      return<>
        <ul>
          {props.items.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </>
    
  }//End of TodoList

export default function Home(){
    const [ session, loading ] = useSession()
    const router = useRouter()

    return <>
    {session && <>
    <span onClick={() => router.push('index')}>Click me</span><br/>
        Signed in as {session.user.name} <br/>
    <button onClick={signOut}>Sign out</button><br/>
    

    <div>
        <h3>Tareas pendientes</h3>
        <TodoApp />
        
      </div>

    </>}
    </>



}//End of Home


