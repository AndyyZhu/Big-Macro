"use client"

import * as React from "react"

import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import RefreshButton from './refresh-button'
import { Combobox } from '@/components/combobox'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function TableWrapper(props : any) {

  const { data } = props
  const foodItems = data["Highest Protein"]

  const [foodData, setFoodData] = React.useState(foodItems)
  const [foodFilter, setFoodFilter] = React.useState("Highest Protein")


  // Callback function to receive data from the child Combobox component
  const handleFilterChange = (filterString : any) => {
    console.log(filterString)
    if (filterString == "highest protein") {
      setFoodData(data["Highest Protein"])
    } else if (filterString == "protein/calorie ratio") {
      setFoodData(data["Highest Protein/Cal Ratio"])
    }
  };
  

  const startTime = Date.now()
  const duration = Date.now() - startTime

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-4xl mx-auto w-full">
      <div className="mb-5">
        <Combobox updateFoodFilter={handleFilterChange}/>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[130px]">Restaurant</TableHead>
            <TableHead className="w-[200px]">Item</TableHead>
            <TableHead className="w-[120px]">Calories</TableHead>
            <TableHead className="w-[120px]">Protein (g)</TableHead>
            <TableHead className="w-[120px]">Carbs (g)</TableHead>
            <TableHead className="text-right">Fat (g)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

        {foodData.map((food : any) => (
          <TableRow key={food.itemName}>
            <TableCell>
              <Image
                src={food.logo}
                alt={food.restaurantName}
                width={48}
                height={48}
                className="rounded-full ring-1 ring-gray-900/5"
              />
            </TableCell>
            
            <TableCell className="font-medium">{food.itemName}</TableCell>
            <TableCell>{food.nutritionalinfo[0].calories}</TableCell>
            <TableCell>{food.nutritionalinfo[0].protein_grams}</TableCell>
            <TableCell>{food.nutritionalinfo[0].carbohydrates_grams}</TableCell>
            <TableCell className="text-right">{food.nutritionalinfo[0].fat_grams}</TableCell>
          </TableRow>
        ))}

  
        </TableBody>
      </Table>

      
    </div>
  )
}
