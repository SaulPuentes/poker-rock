import '../styles/globals.css'
import { useState, createContext } from 'react'
import { Provider } from 'next-auth/client'

export const GameContext = createContext()

const initialGameSeed = {
  id: '5fe313688c45b52a180993ca',
  players: ['sebsmgzz', 'rafael', 'saulpuentes'],
  me: 'saulpuentes'
}

//The function my App is modified, so, the session can be maintained
//while the user is logged.
function MyApp({ Component, pageProps }) {
  const [game, setGame] = useState(initialGameSeed);

  return( 
    <Provider session = {pageProps.session}>
      <GameContext.Provider value={[game, setGame]}>
        <Component {...pageProps} />
      </GameContext.Provider>
    </Provider>
    );

}//End of MyApp


export default MyApp
