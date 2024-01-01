import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import RefreshButton from './refresh-button'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default async function TableWrapper(props : any) {

  const { data } = props
  const foodItems = data

  const startTime = Date.now()
  // const users = await prisma.users.findMany()
  const duration = Date.now() - startTime

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-4xl mx-auto w-full">
      
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[130px]">Restaurant</TableHead>
            <TableHead className="w-[200px]">Item</TableHead>
            <TableHead className="w-[120px]">Protein (g)</TableHead>
            <TableHead className="w-[120px]">Calories</TableHead>
            <TableHead className="text-right">Fat (g)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

        {foodItems.map((food : any) => (
          <TableRow key={food.item_id}>
            <TableCell>
              <Image
                src={food.logo}
                alt={food.restaurantName}
                width={48}
                height={48}
                className="rounded-full ring-1 ring-gray-900/5"
              />
            </TableCell>
            
            <TableCell className="font-medium">{food.name}</TableCell>
            <TableCell>5</TableCell>
            <TableCell>5</TableCell>
            <TableCell className="text-right">32</TableCell>
          </TableRow>
        ))}

  
        </TableBody>
      </Table>

      
    </div>
  )
}
