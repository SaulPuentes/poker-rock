import React from 'react'
import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'


export default function Home() {
  //With the function session brings the current session.
  const [ session, loading ] = useSession()
  const router = useRouter()
  
    return <>
    {!session && <>
      Not signed in <br/>
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
  return {
    props:{ 
      session
    }
  }
}


