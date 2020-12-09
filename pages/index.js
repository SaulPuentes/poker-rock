import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
          <form action="/api/users" method="POST">
            <input type="text" name="name" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password"/>
            <input type="submit" name="Login" value="Login"/>
          </form>
          <form action="/api/users" method="POST">
            <input type="hidden" name="isNew" value="true" />
            <input type="text" name="name" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password"/>
            <input type="submit" name="Signup" value="Signup"/>
          </form>

    </div>
  )
}
