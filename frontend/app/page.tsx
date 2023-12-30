import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import ExpandingArrow from '@/components/expanding-arrow'
import Map from '@/components/map';
import { getChainData } from '@/api/getChainData'
import { getRestaurantTypes, getMenuItems, getNutritionInfo } from '@/api/foodItems'
// import { getNutritionInfo } from '@/api/calcNutrition'


export const dynamic = 'force-dynamic'

export default async function Home() {

  const chainData = await getChainData()
  const restaurantData = await getRestaurantTypes()
  const nutriData = await getNutritionInfo()

  // console.log(restaurantData)
  // console.log(nutriData)

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      
      <h1 className="pt-40 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Big Macro
      </h1>
      
      <Link
        href="https://vercel.com/templates/next.js/postgres-prisma"
        className="group mt-20 mb-10 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
      >
        <p>Placeholder, allow location?</p>
        <ExpandingArrow />
      </Link>

      <Map data={chainData} />
      <div className="mb-10"></div>

      <Suspense fallback={<TablePlaceholder />}>
        <Table data={restaurantData} />
      </Suspense>

      <h2 className="pt-8 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-3xl">
        Best Options Near You
      </h2>

      <Suspense fallback={<TablePlaceholder />}>
        <Table data={nutriData} />
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
