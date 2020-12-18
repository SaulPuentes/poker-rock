import { Layout } from 'antd';
import styles from '../../styles/Home.module.scss'
import Lobby from '../../components/lobby'

const { Header, Sider, Content } = Layout;

export default function Home() {
  return (
    <Layout>
      <Header className={styles.header}>POKER ROCK</Header>
      <Layout>
        <Content className={styles.content}>
          <Lobby />
        </Content>
        <Sider className={styles.leaderboard}>
          Leaderboard
        </Sider>
      </Layout>
    </Layout>
  )
}
