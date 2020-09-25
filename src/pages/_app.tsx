import React from 'react'
import '../styles/index.css'
import '@reach/menu-button/styles.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/static/favicon.ico" sizes="16x16" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
