// A wrapper to manage the state of the user coords between location button(s) and map

"use client"

import { ReactComponentElement, useState} from "react";
import Map from '@/components/map';
import LocationButton from "./locationButton";
import { LocationContext, allowedLocationContext } from "@/context/locationContext"
import { getChainData } from '@/api/getChainData'
import { ChainData } from "@/app/interfaces";

// const LocationContext = createContext({})
export const dynamic = 'force-dynamic'

export default function MapWrapper(){

  const [userCoordinates, setUserCoordinates] = useState<[number, number]>([43.6532, -79.3832]);
  const [allowedLocation, setAllowedLocation] = useState<boolean>(false);

  return (
    <LocationContext.Provider value={{ userCoordinates, setUserCoordinates }}>
      <allowedLocationContext.Provider value={{ allowedLocation, setAllowedLocation }}>
        <LocationButton/>
        <Map/>
      </allowedLocationContext.Provider>
    </LocationContext.Provider>
  )
}
