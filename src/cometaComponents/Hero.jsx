import { useId, useRef, useState } from 'react'
import Image from 'next/image'
import frutasImage from '../cometaImages/frutas.png'
import clsx from 'clsx'
import { motion, useInView, useMotionValue } from 'framer-motion'

import { AppScreen } from '@/cometaComponents/AppScreen'
import { AppStoreLink } from '@/cometaComponents/AppStoreLink'
import { PlayStoreLink } from './PlayStoreLink'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { PhoneFrame } from '@/cometaComponents/PhoneFrame'
import logoBbc from '@/cometaImages/logos/bbc.svg'
import logoCbs from '@/cometaImages/logos/cbs.svg'
import logoCnn from '@/cometaImages/logos/cnn.svg'
import logoFastCompany from '@/cometaImages/logos/fast-company.svg'
import logoForbes from '@/cometaImages/logos/forbes.svg'
import LogoYahualica from './LogosPueblos'
import logoHuffpost from '@/cometaImages/logos/huffpost.svg'
import logoTechcrunch from '@/cometaImages/logos/techcrunch.svg'
import logoWired from '@/cometaImages/logos/wired.svg'

function BackgroundIllustration(props) {
  let id = useId()

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="animate-spin-slow absolute inset-0 h-full w-full"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="animate-spin-reverse-slower absolute inset-0 h-full w-full"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" stroke="#D4D4D4" />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        fill="#A3A3A3"
        stroke="#A3A3A3"
      />
    </svg>
  )
}

const prices = [
  997.56, 944.34, 972.25, 832.4, 888.76, 834.8, 805.56, 767.38, 861.21, 669.6,
  694.39, 721.32, 694.03, 610.1, 502.2, 549.56, 611.03, 583.4, 610.14, 660.6,
  752.11, 721.19, 638.89, 661.7, 694.51, 580.3, 638.0, 613.3, 651.64, 560.51,
  611.45, 670.68, 752.56,
]
const maxPrice = Math.max(...prices)
const minPrice = Math.min(...prices)

function Chart({
  className,
  activePointIndex,
  onChangeActivePointIndex,
  width: totalWidth,
  height: totalHeight,
  paddingX = 0,
  paddingY = 0,
  gridLines = 6,
  ...props
}) {
  let width = totalWidth - paddingX * 2
  let height = totalHeight - paddingY * 2

  let id = useId()
  let svgRef = useRef()
  let pathRef = useRef()
  let isInView = useInView(svgRef, { amount: 0.5, once: true })
  let pathWidth = useMotionValue(0)
  let [interactionEnabled, setInteractionEnabled] = useState(false)

  let path = ''
  let points = []

  for (let index = 0; index < prices.length; index++) {
    let x = paddingX + (index / (prices.length - 1)) * width
    let y =
      paddingY +
      (1 - (prices[index] - minPrice) / (maxPrice - minPrice)) * height
    points.push({ x, y })
    path += `${index === 0 ? 'M' : 'L'} ${x.toFixed(4)} ${y.toFixed(4)}`
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      className={clsx(className, 'overflow-visible')}
      {...(interactionEnabled
        ? {
            onPointerLeave: () => onChangeActivePointIndex(null),
            onPointerMove: (event) => {
              let x = event.nativeEvent.offsetX
              let closestPointIndex
              let closestDistance = Infinity
              for (
                let pointIndex = 0;
                pointIndex < points.length;
                pointIndex++
              ) {
                let point = points[pointIndex]
                let distance = Math.abs(point.x - x)
                if (distance < closestDistance) {
                  closestDistance = distance
                  closestPointIndex = pointIndex
                } else {
                  break
                }
              }
              onChangeActivePointIndex(closestPointIndex)
            },
          }
        : {})}
      {...props}
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={`${path} V ${height + paddingY} H ${paddingX} Z`} />
        </clipPath>
        <linearGradient id={`${id}-gradient`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#13B5C8" />
          <stop offset="100%" stopColor="#13B5C8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[...Array(gridLines - 1).keys()].map((index) => (
        <line
          key={index}
          stroke="#a3a3a3"
          opacity="0.1"
          x1="0"
          y1={(totalHeight / gridLines) * (index + 1)}
          x2={totalWidth}
          y2={(totalHeight / gridLines) * (index + 1)}
        />
      ))}
      <motion.rect
        y={paddingY}
        width={pathWidth}
        height={height}
        fill={`url(#${id}-gradient)`}
        clipPath={`url(#${id}-clip)`}
        opacity="0.5"
      />
      <motion.path
        ref={pathRef}
        d={path}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        transition={{ duration: 1 }}
        {...(isInView ? { stroke: '#06b6d4', animate: { pathLength: 1 } } : {})}
        onUpdate={({ pathLength }) => {
          pathWidth.set(
            pathRef.current.getPointAtLength(
              pathLength * pathRef.current.getTotalLength()
            ).x
          )
        }}
        onAnimationComplete={() => setInteractionEnabled(true)}
      />
      {activePointIndex !== null && (
        <>
          <line
            x1="0"
            y1={points[activePointIndex].y}
            x2={totalWidth}
            y2={points[activePointIndex].y}
            stroke="#06b6d4"
            strokeDasharray="1 3"
          />
          <circle
            r="4"
            cx={points[activePointIndex].x}
            cy={points[activePointIndex].y}
            fill="#fff"
            strokeWidth="2"
            stroke="#06b6d4"
          />
        </>
      )}
    </svg>
  )
}

function AppDemo() {
  let [activePointIndex, setActivePointIndex] = useState(null)
  let activePriceIndex = activePointIndex ?? prices.length - 1
  let activeValue = prices[activePriceIndex]
  let previousValue = prices[activePriceIndex - 1]
  let percentageChange =
    activePriceIndex === 0
      ? null
      : ((activeValue - previousValue) / previousValue) * 100

  return (
    <AppScreen>
      <AppScreen.Body>
        <div className="p-4">
          <div className="flex gap-2">
            <div className="text-xs leading-6 text-gray-500">
              Buscar restaurantes
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-auto h-6 w-6"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clip-rule="evenodd"
              />
            </svg>

            {/* <div className="text-sm text-gray-900">$CSS</div> */}
            {/* <svg viewBox="0 0 24 24" className="ml-auto h-6 w-6" fill="none">
              <path
                d="M5 12a7 7 0 1 1 14 0 7 7 0 0 1-14 0ZM12 9v6M15 12H9"
                stroke="#171717"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
          </div>
          <div className="mt-3 border-t border-gray-200 pt-5">
            {/* <div className="flex items-baseline gap-2">
              <div className="text-2xl tabular-nums tracking-tight text-gray-900">
                {activeValue.toFixed(2)}
              </div>
              <div className="text-sm text-gray-900">USD</div>
              {percentageChange && (
                <div
                  className={clsx(
                    'ml-auto text-sm tabular-nums tracking-tight',
                    percentageChange >= 0 ? 'text-cyan-500' : 'text-gray-500'
                  )}
                >
                  {`${
                    percentageChange >= 0 ? '+' : ''
                  }${percentageChange.toFixed(2)}%`}
                </div>
              )}
            </div> */}
            {/* <div className="mt-6 flex gap-4 text-xs text-gray-500">
              <div>1D</div>
              <div>5D</div>
              <div className="font-semibold text-cyan-600">1M</div>
              <div>6M</div>
              <div>1Y</div>
              <div>5Y</div>
            </div> */}
            <div className="mt-3 rounded-lg bg-gray-50 ring-1 ring-inset ring-black/5">
              {/* <Chart
                width={286}
                height={208}
                paddingX={16}
                paddingY={32}
                activePointIndex={activePointIndex}
                onChangeActivePointIndex={setActivePointIndex}
              /> */}
              <div className="relative w-full">
                <Image
                  src={frutasImage}
                  alt="frutas y verduras"
                  className="aspect-[16/9] w-full rounded-lg bg-gray-100 object-cover object-left sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
              </div>
            </div>
            {/* <div className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-semibold text-white">
              Trade
            </div> */}
            {/* <div className="mt-3 divide-y divide-gray-100 text-sm">
              <div className="flex justify-between py-1">
                <div className="text-gray-500">Open</div>
                <div className="font-medium text-gray-900">6,387.55</div>
              </div>
              <div className="flex justify-between py-1">
                <div className="text-gray-500">Closed</div>
                <div className="font-medium text-gray-900">6,487.09</div>
              </div>
              <div className="flex justify-between py-1">
                <div className="text-gray-500">Low</div>
                <div className="font-medium text-gray-900">6,322.01</div>
              </div>
            </div> */}
          </div>
        </div>
      </AppScreen.Body>
    </AppScreen>
  )
}

export function Hero() {
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-orange-500">
              Descubre sabores increibles a tu alrededor.
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Ordena en linea desde la app tus platillos favoritos y descubre
              lugares que deleitaran tu paladar, ademas haz tus compras de super
              y recibelo en la puerta de tu casa y mas, descargala.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <AppStoreLink />
              <PlayStoreLink />
              {/* <Button
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                variant="outline"
              >
                <PlayIcon className="h-6 w-6 flex-none" />
                <span className="ml-2.5">Watch the video</span>
              </Button> */}
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <PhoneFrame className="mx-auto max-w-[366px]" priority>
                <AppDemo />
              </PhoneFrame>
            </div>
          </div>
          <div className="relative lg:col-span-7 lg:mt-0 xl:col-span-6">
            <p className="pl-4 text-center text-sm font-semibold text-gray-900 lg:text-left">
              Disponible en Jalisco
            </p>
            {/* <ul
              role="list"
              className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
            > */}
            {/* <li key="yahualica"> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width={1080}
              // height={1080}
              className="h-40 object-cover"
              viewBox="0 0 810 810"
            >
              <path
                fill="#626262"
                d="M90.95 407.062 65.153 349.72h29.188l10.859 31.875 12.266-31.875H147.7l-27.547 54.422-.125 26.734H90.95ZM168.494 433.094c-5.532 0-10.497-1.422-14.891-4.266-4.399-2.844-7.844-6.773-10.344-11.797-2.492-5.02-3.734-10.601-3.734-16.75 0-5.988 1.398-11.472 4.203-16.453 2.812-4.988 6.586-8.941 11.328-11.86 4.75-2.913 9.926-4.374 15.531-4.374 5.532 0 10.516 1.445 14.953 4.328 4.438 2.875 7.88 6.824 10.329 11.844 2.457 5.023 3.644 10.527 3.562 16.515-.156 5.992-1.617 11.5-4.375 16.531-2.762 5.024-6.48 8.993-11.156 11.907-4.668 2.914-9.805 4.375-15.406 4.375Zm9.921-18.219c2.332 0 4.551-.64 6.657-1.922 2.101-1.281 3.816-3.031 5.14-5.25 1.32-2.219 2.02-4.691 2.094-7.422 0-2.719-.562-5.207-1.687-7.469-1.125-2.257-2.665-4.03-4.61-5.312-1.95-1.29-4.133-1.938-6.547-1.938-2.562 0-4.86.649-6.89 1.938-2.024 1.281-3.618 3.055-4.782 5.312-1.168 2.262-1.75 4.829-1.75 7.704 0 2.73.54 5.183 1.625 7.359 1.094 2.18 2.594 3.89 4.5 5.14a11.212 11.212 0 0 0 6.25 1.86Zm13.891-45.063h28.844v61.063h-28.844ZM281.169 399.937c0-3.582-.86-6.406-2.578-8.468-1.711-2.063-4.235-3.094-7.578-3.094-2.493 0-4.75.719-6.782 2.156-2.023 1.438-3.617 3.48-4.78 6.125-1.169 2.649-1.75 5.684-1.75 9.11l-7-2.797c.144-6.77 1.718-12.836 4.718-18.203 3-5.375 7.086-9.579 12.266-12.61 5.175-3.039 10.957-4.562 17.343-4.562 8.008 0 14.235 2.414 18.672 7.234 4.438 4.824 6.656 11.594 6.656 20.313v35.734H281.17Zm-52.547-56.171H257.7v87.109h-29.078ZM343.996 433.094c-8.023 0-14.25-2.41-18.687-7.235-4.438-4.832-6.656-11.609-6.656-20.328v-35.719h29.187v30.938c0 3.586.852 6.387 2.563 8.406 1.718 2.024 4.21 3.031 7.484 3.031 2.488 0 4.742-.718 6.766-2.156 2.03-1.437 3.644-3.457 4.843-6.062 1.207-2.614 1.813-5.633 1.813-9.063l7.015 2.813c-.156 6.773-1.734 12.843-4.734 18.218-3 5.368-7.09 9.57-12.266 12.61-5.18 3.031-10.953 4.547-17.328 4.547Zm27.313-63.282h29.078v61.063h-29.078ZM435.303 433.094c-5.531 0-10.496-1.422-14.89-4.266-4.399-2.844-7.844-6.773-10.344-11.797-2.492-5.02-3.735-10.601-3.735-16.75 0-5.988 1.399-11.472 4.203-16.453 2.813-4.988 6.586-8.941 11.329-11.86 4.75-2.913 9.925-4.374 15.53-4.374 5.532 0 10.516 1.445 14.954 4.328 4.437 2.875 7.879 6.824 10.328 11.844 2.457 5.023 3.645 10.527 3.563 16.515-.157 5.992-1.618 11.5-4.375 16.531-2.762 5.024-6.48 8.993-11.157 11.907-4.668 2.914-9.804 4.375-15.406 4.375Zm9.922-18.219c2.332 0 4.55-.64 6.656-1.922 2.102-1.281 3.817-3.031 5.14-5.25 1.321-2.219 2.02-4.691 2.095-7.422 0-2.719-.563-5.207-1.688-7.469-1.125-2.257-2.664-4.03-4.61-5.312-1.949-1.29-4.132-1.938-6.546-1.938-2.563 0-4.86.649-6.89 1.938-2.024 1.281-3.618 3.055-4.782 5.312-1.168 2.262-1.75 4.829-1.75 7.704 0 2.73.539 5.183 1.625 7.359 1.094 2.18 2.594 3.89 4.5 5.14a11.212 11.212 0 0 0 6.25 1.86Zm13.89-45.063h28.844v61.063h-28.843ZM496.37 343.766h29.077v87.109H496.37ZM535.134 369.812h29.188v61.063h-29.188Zm14.25-4.562c-3.43 0-6.605-.719-9.53-2.156-2.919-1.438-5.216-3.399-6.891-5.89-1.668-2.5-2.5-5.188-2.5-8.063 0-2.883.832-5.551 2.5-8 1.675-2.446 3.972-4.41 6.89-5.891 2.926-1.477 6.102-2.219 9.531-2.219 3.415 0 6.582.742 9.5 2.219 2.926 1.48 5.223 3.445 6.891 5.89 1.676 2.45 2.516 5.118 2.516 8 0 2.876-.84 5.563-2.516 8.063-1.668 2.492-3.965 4.453-6.89 5.89-2.919 1.438-6.086 2.157-9.5 2.157ZM608.106 433.094c-7.78 0-14.496-1.461-20.14-4.375-5.637-2.914-9.918-6.864-12.844-11.844-2.918-4.988-4.297-10.555-4.14-16.703.156-6.156 1.75-11.68 4.78-16.578 3.04-4.907 7.442-8.797 13.204-11.672 5.758-2.883 12.57-4.328 20.437-4.328 6.688 0 12.774 1.304 18.266 3.906 5.488 2.605 9.847 6.125 13.078 10.562 3.227 4.438 4.96 9.344 5.203 14.72H619.67c-.23-1.321-.793-2.587-1.688-3.798-.898-1.207-2.086-2.195-3.562-2.968-1.48-.782-3.195-1.172-5.14-1.172-2.419 0-4.481.527-6.188 1.578-1.711 1.043-3.012 2.422-3.907 4.14-.898 1.711-1.386 3.579-1.468 5.61-.075 2.18.297 4.164 1.11 5.953a9.72 9.72 0 0 0 3.733 4.266c1.676 1.043 3.645 1.562 5.907 1.562 2.957 0 5.367-.797 7.234-2.39 1.875-1.594 3.117-3.52 3.734-5.782h26.391c-.387 5.531-2.293 10.54-5.719 15.016-3.43 4.469-7.945 7.969-13.547 10.5-5.605 2.531-11.757 3.797-18.453 3.797ZM680.044 433.094c-5.531 0-10.496-1.422-14.89-4.266-4.4-2.844-7.844-6.773-10.344-11.797-2.493-5.02-3.735-10.601-3.735-16.75 0-5.988 1.399-11.472 4.203-16.453 2.813-4.988 6.586-8.941 11.328-11.86 4.75-2.913 9.926-4.374 15.532-4.374 5.53 0 10.515 1.445 14.953 4.328 4.437 2.875 7.879 6.824 10.328 11.844 2.457 5.023 3.644 10.527 3.562 16.515-.156 5.992-1.617 11.5-4.375 16.531-2.761 5.024-6.48 8.993-11.156 11.907-4.668 2.914-9.805 4.375-15.406 4.375Zm9.922-18.219c2.332 0 4.55-.64 6.656-1.922 2.102-1.281 3.816-3.031 5.14-5.25 1.321-2.219 2.02-4.691 2.094-7.422 0-2.719-.562-5.207-1.687-7.469-1.125-2.257-2.664-4.03-4.61-5.312-1.949-1.29-4.132-1.938-6.546-1.938-2.563 0-4.86.649-6.89 1.938-2.024 1.281-3.618 3.055-4.782 5.312-1.168 2.262-1.75 4.829-1.75 7.704 0 2.73.539 5.183 1.625 7.359 1.094 2.18 2.594 3.89 4.5 5.14a11.212 11.212 0 0 0 6.25 1.86Zm13.89-45.063H732.7v61.063h-28.844Zm0 0"
              />
            </svg>
            {/* <Image
                  src={LogoYahualica}
                  alt="Yahualica"
                  className="h-8"
                  unoptimized
                /> */}
            {/* </li> */}
            {/* {[
                ['Yahualica', LogoYahualica],
                ['TechCrunch', logoTechcrunch],
                ['Wired', logoWired],
                ['CNN', logoCnn, 'hidden xl:block'],
                ['BBC', logoBbc],
                ['CBS', logoCbs],
                ['Fast Company', logoFastCompany],
                ['HuffPost', logoHuffpost, 'hidden xl:block'],
              ].map(([name, logo, className]) => (
                <li key={name} className={clsx('flex', className)}>
                  <Image src={logo} alt={name} className="h-8" unoptimized />
                </li>
              ))} */}
            {/* </ul> */}
          </div>
        </div>
      </Container>
    </div>
  )
}
