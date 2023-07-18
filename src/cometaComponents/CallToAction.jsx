import { AppStoreLink } from '@/cometaComponents/AppStoreLink'
import { CircleBackground } from '@/cometaComponents/CircleBackground'
import { Container } from '@/cometaComponents/Container'
import { PlayStoreLink } from './PlayStoreLink'

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
    >
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Haz tu primer pedido hoy
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Toma 60 segundos hacer tu cuenta y descargar la app para que
            comiences a disfrutar de los sabores que te rodean o comiences a
            ganar por entregar pedidos.
          </p>
          <div className="mt-8 flex justify-around">
            <AppStoreLink color="white" />
            <PlayStoreLink />
          </div>
        </div>
      </Container>
    </section>
  )
}
