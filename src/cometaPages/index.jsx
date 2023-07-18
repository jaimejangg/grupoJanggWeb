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
          content="By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses."
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
