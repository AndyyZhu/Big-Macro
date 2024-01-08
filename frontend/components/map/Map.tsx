'use client'

import 'leaflet/dist/leaflet.css'
import style from '../../styles/Home.module.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { user, mcD, tims, popeyes } from './icons'
import { useContext, useEffect, useState } from 'react'
import { LocationContext, allowedLocationContext } from "@/context/locationContext"
import { getChainData } from '@/api/getChainData'

function Map(props: any) {

    // var locationsArray = props.data
    const [locationsArray, setLocationsArray] = useState([])
    let { userCoordinates, setUserCoordinates } = useContext(LocationContext);
    const {allowedLocation, setAllowedLocation} = useContext(allowedLocationContext)

    useEffect(() => {

        if (allowedLocation) {
            const retrieveChainData = async (lat: number, lng: number) => {
                const chainData = await getChainData(lat, lng)
                setLocationsArray(chainData.allLocations)
            }
            retrieveChainData(userCoordinates[0], userCoordinates[1])
        }
        return () => {
          // Cleanup code here
        };
    }, [userCoordinates, allowedLocation]);
    

    return (
        <MapContainer className={style.map} center={userCoordinates} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {allowedLocation && (
                <Marker
                    position={userCoordinates}
                    icon={user}
                />
            )}

            {locationsArray && locationsArray.map((location: any) => {
                let icon = mcD
                if (location.name == 'Tim Hortons') {
                  icon = tims
                } else if (location.name == 'Popeyes Louisiana Kitchen') {
                    icon = popeyes
                }
                return (
                    <Marker
                        key={location.id} 
                        position={[location.lat, location.lng]}
                        icon={icon}
                    >
                        <Popup>
                            {location.name} <br /> {location.vicinity}
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
     );
}

export default Map;