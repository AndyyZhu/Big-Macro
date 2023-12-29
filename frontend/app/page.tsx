import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import ExpandingArrow from '@/components/expanding-arrow'
import Map from '@/components/map';
import { getChainData } from '@/api/getChainData'
import { getFoodItems } from '@/api/foodItems'


export const dynamic = 'force-dynamic'

export default async function Home() {

  const chainData = await getChainData()
  const foodData = await getFoodItems(chainData.nearbyChains)

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      

      <Image src="/Subway.png" width={60} height={60} alt="Subway" className="absolute w-14 h-14 left-40 top-20 transform hover:rotate-180 transition-transform duration-300 ease-in-out" />
      <Image src="/Mcd.png" width={75} height={75} alt="Mcd" className="absolute w-20 h-20 left-20 top-60 transform rotate-[-45] transform hover:rotate-180 transition-transform duration-300 ease-in-out" />
      <Image src="/Popeyes.png" width={75} height={75} alt="Popeyes" className="absolute w-14 h-14 right-40 top-60 transform rotate-45 transform hover:rotate-180 transition-transform duration-300 ease-in-out" />
      <Image src="/Chipotle.png" width={75} height={75} alt="Chipotle" className="absolute w-18 h-18 right-20 top-20 transform hover:rotate-180 transition-transform duration-300 ease-in-out" />
      <Image src="/Tims.png" width={75} height={75} alt="Tims" className="absolute w-12 h-12 right-10 top-80 transform hover:rotate-180 transition-transform duration-300 ease-in-out" />


      <h1 className="pt-40 pb-8 mx-20 max-w-6xl bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-5xl font-bold tracking-tight md:text-7xl">
        Uncover the Best Macronutrient-Rich Meals from Local Menus
      </h1>
      <h2 className="pb-8 mx-20 max-w-6xl text-center text-xl font-normal tracking-tight md:text-2xl">
        Discover the quickest and easiest fast-food protein options, perfect for when you need to grab a bite on the go. Enjoy the convenience of fast food without sacrificing your macronutrient goals.
      </h2>

      <Link
        href="https://vercel.com/templates/next.js/postgres-prisma"
        className="group mt-20 mb-10 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
      >
        <p>Placeholder, allow location?</p>
        <ExpandingArrow />
      </Link>

      <Map data={chainData.allLocations} />
      <div className="mb-10"></div>

      <Suspense fallback={<TablePlaceholder />}>
        <Table data={foodData} />
      </Suspense>

      <h2 className="pt-8 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-3xl">
        Best Options Near You
      </h2>

      <Suspense fallback={<TablePlaceholder />}>
        <Table data={foodData} />
      </Suspense>
      <p className="font-light text-gray-600 w-full max-w-lg text-center mt-6">
        <Link
          href="https://vercel.com/postgres"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Vercel Postgres
        </Link>{' '}
        demo with{' '}
        <Link
          href="https://prisma.io"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Prisma
        </Link>{' '}
        as the ORM. <br /> Built with{' '}
        <Link
          href="https://nextjs.org/docs"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Next.js App Router
        </Link>
        .
      </p>

      <div className="flex justify-center space-x-5 pt-10 mt-10 mb-10 border-t border-gray-300 w-full max-w-xl text-gray-600">
        <Link
          href="https://postgres-starter.vercel.app/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Starter
        </Link>
      </div>

      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
        <Link href="https://vercel.com">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
        </Link>
        <Link
          href="https://github.com/vercel/examples/tree/main/storage/postgres-prisma"
          className="flex items-center space-x-2"
        >
          <Image
            src="/github.svg"
            alt="GitHub Logo"
            width={24}
            height={24}
            priority
          />
          <p className="font-light">Source</p>
        </Link>
      </div>
    </main>
  )
}
