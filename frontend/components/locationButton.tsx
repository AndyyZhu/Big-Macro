"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useEffect, useState, useContext } from 'react'
import { LocationContext, allowedLocationContext } from "@/context/locationContext"

export default function LocationButton() {

  const [location, setLocation] = useState({});
  const [buttonText, setButonText] = useState('Allow Location?');
  const [disabled, setDisabled] = useState(false)
  const { userCoordinates, setUserCoordinates } = useContext(LocationContext)
  const { allowedLocation, setAllowedLocation } = useContext(allowedLocationContext)

  const findLocation = () => {
    if('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude });
          setButonText('Location Allowed')
          setDisabled(true)
          setUserCoordinates([latitude, longitude])
          setAllowedLocation(true)
      })
    }
  }

  return (
    <Button
      className="mt-8 mb-10"
      onClick={findLocation}
      disabled={disabled}
    >

      {buttonText}
    </Button>
  )
}