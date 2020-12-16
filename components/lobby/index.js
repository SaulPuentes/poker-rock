import React from 'react'
import { Spin, Avatar } from 'antd'
import styles from './Lobby.module.scss'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import Countdown from '../countdown'


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

function Lobby() {
  return <>
    <div className={styles.waitingTitle}>
      <Spin indicator={antIcon} />
      Waiting for other players
    </div>
    <Countdown seconds={30} minutes={0}/>
    <ul className={styles.playersList}>
      {data.map(item => (
        <li><Avatar shape="square" size="large" icon={<UserOutlined />} />{item.name}</li>
      ))}
    </ul>
  </>
}

export default Lobby;