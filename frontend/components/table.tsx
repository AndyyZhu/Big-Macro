import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import RefreshButton from './refresh-button'

export default async function Table(props : any) {

  const { data } = props
  const foodItems = data

  const startTime = Date.now()
  // const users = await prisma.users.findMany()
  const duration = Date.now() - startTime

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Recent Users</h2>
          <p className="text-sm text-gray-500">
            Fetched {foodItems.length} users in {duration}ms
          </p>
        </div>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        {foodItems.map((food : any) => (
          <div
            key={food.name}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={food.image}
                alt={food.name}
                width={48}
                height={48}
                className="rounded-full ring-1 ring-gray-900/5"
              />
              <div className="space-y-1">
                <p className="font-medium leading-none">{food.name}</p>
                <p className="text-sm text-gray-500">{food.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{timeAgo(food.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
