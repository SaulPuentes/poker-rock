import { Layout, Spin, Avatar } from 'antd';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import styles from '../../styles/Home.module.scss'
import Countdown from '../components/countdown'

const { Header, Sider, Content } = Layout;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const data = [
  {
    name: 'Username 1',
  },
  {
    name: 'Username 2',
  },
  {
    name: 'Username 3',
  },
  {
    name: 'Username 4',
  },
];

export default function Home() {
  return (
    <Layout>
      <Header className={styles.header}>POKER ROCK</Header>
      <Layout>
        <Content className={styles.content}>
          <div className={styles.waitingTitle}>
            <Spin indicator={antIcon} />
            Waiting for other players
          </div>
          <Countdown />
          <ul className={styles.playersList}>
            {data.map(item => (
              <li><Avatar shape="square" size="large" icon={<UserOutlined />} />{item.name}</li>
            ))}
          </ul>
        </Content>
        <Sider className={styles.leaderboard}>
          Leaderboard
        </Sider>
      </Layout>
    </Layout>
  )
}
