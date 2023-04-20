import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  weight: '500',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {

  return (
    <Layout className={outfit.className}>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  )
}
