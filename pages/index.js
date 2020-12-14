import React from 'react'
import useSWR from 'swr'
import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import styles from '../styles/Home.module.scss'
import React, {useState, useEffect } from 'react'
import { render } from 'react-dom'
import { useRouter } from 'next/router'

const fetcher = url => fetch(url).then(r => r.json())

function Profile() {
  const { data, error } = useSWR('/api/hello', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}

export default function Home(props) {
  //With the function session brings the current session.
  const [ session, loading ] = useSession()
  const router = useRouter()
    return <>
    {!session && <>
      Not signed in <br/>
      <Profile />
      <button onClick={signIn}>Sign in</button>
    </>} 
    {session && <>
      <span onClick={() => router.push('home')}>Click me</span><br/>
      Signed in as {session.user.name} <br/>
      <button onClick={signOut}>Sign out</button>
      
    </>}
  </>
//End of return/render


}//End of Home

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const res = await fetch('http://localhost:3000/api/hello')
  const json = await res.json();
  const name = json.name;
  return {
    props:{ 
      session,
      name
    }
  }
}


