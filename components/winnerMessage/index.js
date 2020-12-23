import { Button, Row, Col } from 'antd'
import { useRouter } from 'next/router'

export default function WinnerMessage({ winner }) {
  const router = useRouter()

  const handleClick = () => router.push('/home');
  
  return (
  <div>
    <Row gutter={[8,8]}>
      <Col span={20}>
        <h1>{winner.message}</h1>
      </Col>
      <Col span={4}>
        <Button onClick={handleClick}> Replay Game </Button>
      </Col>
    </Row>
  </div>
  )//End of return
  
  }//End of CurrentTurn
  