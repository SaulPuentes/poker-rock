import { Layout } from 'antd';
import Image from 'next/image'
import styles from '@styles/Home.module.scss'
import Game from '@components/game'
import Leaderboard from '@components/leaderboard'

const { Header, Sider, Content } = Layout;

export default function Home() {

  

  return (
    <Layout>
      <Header className={styles.header}>
        <Image src='/img/logo.svg' width={180} height={80}/>
      </Header>
      <Layout>
        <Content className={styles.content}>
          <Game />
        </Content>
        <Sider className={styles.leaderboard}>
          <Leaderboard />
        </Sider>
      </Layout>
    </Layout>
  )
}
