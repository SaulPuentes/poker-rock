import styles from '../styles/Home.module.css'
import React, {useState, useEffect } from 'react'
import { getSession, signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  //With the function session brings the current session.
  const [ session, loading ] = useSession()
  
  return <>
  {!session && <>
    Not signed in <br/>
    <button onClick={signIn}>Sign in</button>
  </>}
  {session && <>
    Signed in as {session.user.name} <br/>
    <button onClick={signOut}>Sign out</button>
  </>}
</>

}


export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props:{ 
      session
    }
  }
}


/*
  return (
    <div className={styles.container}>
          
          <form action="/api/user" method="POST">
            <input type="text" name="name" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password"/>
            <input type="submit" name="Login" value="Login"/>
          </form>

          <form action="/api/user" method="POST">
            <input type="hidden" name="isNew" value="true" />
            <input type="text" name="name" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password"/>
            <input type="submit" name="Signup" value="Signup"/>
          </form>

    </div>
  )




  */