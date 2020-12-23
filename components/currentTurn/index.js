import styles from './currentTurn.module.scss'

export default function CurrentTurn({ players, currentTurnIndex }) {
return (
<>
<div className={styles.currentTurn}>
    <h1>{`Turn of ${ players[currentTurnIndex] }`}</h1>

</div>
</>
)//End of return

}//End of CurrentTurn
