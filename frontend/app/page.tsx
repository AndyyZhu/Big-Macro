import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import ExpandingArrow from '@/components/expanding-arrow'
import Map from '@/components/map';
import { getNutritionInfo } from '@/api/calcNutrition'
import MapWrapper from '@/components/mapWrapper'

export const dynamic = 'force-dynamic'

export default async function Home() {

  const nutriData = await getNutritionInfo()

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      
      <div className="relative flex items-center justify-center">
        <Image src="/Subway.svg" width={60} height={60} alt="Subway" className="absolute left-0 top-1/2 transform -translate-y-1/2 md:w-16 md:h-16 transform hover:rotate-180 transition-transform duration-300 ease-in-out" />
        <Image src="/Mcd.png" width={75} height={75} alt="Mcd" className="absolute left-5 top-1/5 transform -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 transform hover:rotate-180 transition-transform duration-300 ease-in-out" />

        <div>
          <h1 className="pt-40 pb-8 mx-20 max-w-6xl bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-5xl font-bold tracking-tight md:text-7xl">
            Uncover the Best Macronutrient-Rich Meals from Local Menus
          </h1>
          <h2 className="pb-8 mx-20 max-w-6xl text-center text-xl font-normal tracking-tight md:text-2xl">
            Discover the quickest and easiest fast-food protein options, perfect for when you need to grab a bite on the go. Enjoy the convenience of fast food without sacrificing your macronutrient goals.
          </h2>
        </div>

        <Image src="/Popeyes.svg" width={60} height={60} alt="Popeyes" className="absolute right-1 top-1/2 transform translate-x-5 translate-y-20 w-16 h-16 md:w-16 md:h-16 transform hover:rotate-180 transition-transform duration-300 ease-in-out" />
        <Image src="/Chipotle.png" width={75} height={75} alt="Chipotle" className="absolute right-0 top-1/2 transform translate-y-3 w-16 h-16 md:w-20 md:h-20 transform hover:rotate-180 transition-transform duration-300 ease-in-out" />
        <Image src="/Tims.png" width={75} height={75} alt="Tims" className="absolute right-5 top-1/5 transform -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 transform hover:rotate-180 transition-transform duration-300 ease-in-out" />
      </div>

      <MapWrapper />

      <h2 className="pt-8 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-4xl font-medium tracking-tight text-transparent md:text-3xl">
        Best Options Near You
      </h2>

      <Suspense fallback={<TablePlaceholder />}>
        <Table data={nutriData} />
      </Suspense>

      <h2 className="pt-8 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-3xl">
        Best Options Overall
      </h2>

      <Suspense fallback={<TablePlaceholder />}>
        <Table data={nutriData} />
      </Suspense>
      
      <div className='mt-10'></div>
      <p className="mt-40 mb-20 font-light text-gray-600 w-full max-w-lg text-center mt-6">
        Made by{' '}
        <Link
          href="https://www.kylezhou.com/"
          target="_blank"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Kyle
        </Link>{' '}
        and{' '}
        <Link
          href="https://github.com/AndyyZhu"
          target="_blank"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Andy
        </Link>
        .
      </p>

      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
        {/* insert bottom left and bottom right icons here */}
        {/* className="flex items-center space-x-2" */}
      </div>
    </main>
  )
}
