import Head from 'next/head'

import { CallToAction } from '@/cometaComponents/CallToAction'
import { Faqs } from '@/cometaComponents/Faqs'
import { Footer } from '@/cometaComponents/Footer'
import { Header } from '@/cometaComponents/Header'
import { Hero } from '@/cometaComponents/Hero'
import { PrimaryFeatures } from '@/cometaComponents/PrimaryFeatures'
import { SecondaryFeatures } from '@/cometaComponents/SecondaryFeatures'

export default function Home() {
  return (
    <>
      <Head>
        <title>Cometa - Tu super en linea.</title>
        <meta
          name="description"
          content="Ordena tu comida en nuestra App, tu despensa o un servicio que necesitas, lo entregamos en tu domicilio o tu recoges en tienda."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
