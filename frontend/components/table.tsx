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

  const updateData = (filterString: string) => {
    var res : any = []
    data.forEach((restaurant_object : any)=> {
      if (filterString == "highest protein") {
        res = [...res, ...restaurant_object["Highest Protein"]]
      } else if (filterString == "protein/calorie ratio") {
        res = [...res, ...restaurant_object["Highest Protein/Cal Ratio"]]
      } else if (filterString == "highest carb") {
        res = [...res, ...restaurant_object["Highest Carb"]]
      } else if (filterString == "highest calories") {
        res = [...res, ...restaurant_object["Highest Cal"]]
      }
    }); 
  
    return res
  }

  const foodItems = updateData("highest protein")
  const [foodData, setFoodData] = React.useState(foodItems)

  // Callback function to receive data from the child Combobox component
  const handleFilterChange = (filterString : string) => {
    setFoodData(updateData(filterString))
  };
  
  const startTime = Date.now()
  const duration = Date.now() - startTime

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-4xl mx-auto w-full">
      <div className="mb-5">
        <Combobox updateFoodFilter={handleFilterChange}/>
      </div>
      <Table>
        <TableCaption>A list of the top options</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[130px]">Restaurant</TableHead>
            <TableHead className="w-[200px]">Item</TableHead>
            <TableHead className="w-[120px]">Calories</TableHead>
            <TableHead className="w-[130px]">Protein (g)</TableHead>
            <TableHead className="w-[120px]">Carbs (g)</TableHead>
            <TableHead className="w-[120px]">Fat (g)</TableHead>
            <TableHead className="text-right">Protein/Calories</TableHead>
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
            <TableCell className="text-right"> {(food.nutritionalinfo[0].protein_grams / food.nutritionalinfo[0].calories).toFixed(3)}</TableCell>
          </TableRow>
        ))}

  
        </TableBody>
      </Table>

      
    </div>
  )
}
