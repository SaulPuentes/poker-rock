import { Layout } from 'antd';
import styles from '../../styles/Home.module.scss'
import Game from '../../components/game'

const { Header, Sider, Content } = Layout;

export default function Home() {
  return (
    <Layout>
      <Header className={styles.header}>POKER ROCK</Header>
      <Layout>
        <Content className={styles.content}>
          <Game />
        </Content>
        <Sider className={styles.leaderboard}>
          Leaderboard
        </Sider>
      </Layout>
    </Layout>
  )
}
