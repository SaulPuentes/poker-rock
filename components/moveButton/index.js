import { Button, Tooltip } from 'antd'

export default function MoveButton({ action, bet, callback, isMyTurn }) {
  
  return (
    <Tooltip title={!isMyTurn && 'Wait until your turn'}>
      <Button onClick={() => callback(action, bet)} disabled={!isMyTurn}>
        {action.toUpperCase()}
      </Button>
    </Tooltip>
  )
}