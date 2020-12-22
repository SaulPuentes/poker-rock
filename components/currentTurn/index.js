export default function CurrentTurn({ players, currentTurnIndex }) {
return <h1>{`Turn of ${ players[currentTurnIndex]._user }`}</h1>
}