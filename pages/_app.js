import '../styles/globals.css'
import { Provider } from 'next-auth/client'

//The function my App is modified, so, the session can be maintained
//while the user is logged.
function MyApp({ Component, pageProps }) {
  return( 
    <Provider session = {pageProps.session}>
      <Component {...pageProps} />
    </Provider>
    );

}//End of MyApp


export default MyApp


/*
import { Provider } from 'next-auth/client'

export default function App ({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
*/