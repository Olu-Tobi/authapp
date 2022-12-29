import { SessionProvider } from "next-auth/react"
import Layout from "../components/Layout"
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, Fragment } from "react";
import { store } from '../redux/store'
import { Provider } from 'react-redux'

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>AuthApp</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <Provider store={store}>
      <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
          <Layout>
          <ToastContainer />
            <Component {...pageProps}/>
          </Layout>
        </SessionProvider>
        <CssBaseline />
      </ThemeProvider>
      </Provider>
      
    </Fragment>
  );
}


App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

