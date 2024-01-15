// A wrapper to manage the state of the user coords between location button(s) and map

"use client"

import { useState, useEffect } from "react";
import Map from '@/components/map';
import LocationButton from "./locationButton";
import { LocationContext, allowedLocationContext } from "@/context/locationContext"
import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import { getChainData } from "@/api/getChainData";
import { getFoodItems } from "@/api/foodItems";

// const LocationContext = createContext({})
export const dynamic = 'force-dynamic'

export default function Wrapper(){

  const [userCoordinates, setUserCoordinates] = useState<[number, number]>([43.6532, -79.3832]);
  const [allowedLocation, setAllowedLocation] = useState<boolean>(false);
  const [locationsArray, setLocationsArray] = useState<string []>([])
  const [chains, setChains] = useState<string []>([])
  const [foodItems, setFoodItems] = useState<string []>([])

  useEffect(() => {
    if (allowedLocation) {
        const retrieveChainAndFoodData = async (lat: number, lng: number) => {
            const chainData = await getChainData(lat, lng)
            setLocationsArray(chainData.allLocations)
            setChains(chainData.nearbyChains)
            const foodData = await getFoodItems(chainData.nearbyChains)
            setFoodItems(foodData.nearby)
        }
        retrieveChainAndFoodData(userCoordinates[0], userCoordinates[1])
    }
  }, [userCoordinates, allowedLocation]);

  return (
    <LocationContext.Provider value={{ userCoordinates, setUserCoordinates }}>
      <allowedLocationContext.Provider value={{ allowedLocation, setAllowedLocation }}>
        <LocationButton/>
        <Map locationsArray={locationsArray}/>

          <div className="items-center justify-center mt-10">
            <h2 className="pt-8 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight md:text-3xl">
              Best Options Near You
            </h2>
            {allowedLocation ? (
            <Suspense fallback={<TablePlaceholder />}>
              <Table data={foodItems}/>
            </Suspense>
            ) : (
              <TablePlaceholder message="Allow location to see the best options around you..."/>
            )}
          </div>
      </allowedLocationContext.Provider>
    </LocationContext.Provider>
  )
}
