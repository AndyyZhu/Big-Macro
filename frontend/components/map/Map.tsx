'use client'

import 'leaflet/dist/leaflet.css'
import style from '../../styles/Home.module.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { user, mcD, tims, popeyes, subway } from './icons'
import { useContext, useEffect, useState } from 'react'
import { LocationContext, allowedLocationContext } from "@/context/locationContext"
import { getChainData } from '@/api/getChainData'

function MapContent({ userCoordinates, allowedLocation, setLocationsArray }: { userCoordinates: number[], allowedLocation: boolean, setLocationsArray: React.Dispatch<React.SetStateAction<Array<string>>>}) {
    const map = useMap();

    useEffect(() => {
        if (allowedLocation) {
            const retrieveChainData = async (lat: number, lng: number) => {
                const chainData = await getChainData(lat, lng)
                setLocationsArray(chainData.allLocations)
            }
            retrieveChainData(userCoordinates[0], userCoordinates[1])

            // pan to user's location
            map.flyTo([userCoordinates[0], userCoordinates[1]], 15);
        }

        return () => {
            // Cleanup code here
        };
    }, [userCoordinates, allowedLocation, map]);

    return null; 
}


function Map(props: any) {

    const [locationsArray, setLocationsArray] = useState<string []>([])
    let { userCoordinates, setUserCoordinates } = useContext(LocationContext);
    const {allowedLocation, setAllowedLocation} = useContext(allowedLocationContext)

    return (
        <MapContainer className={style.map} center={userCoordinates} zoom={4} scrollWheelZoom={true}>
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
            <MapContent userCoordinates={userCoordinates} allowedLocation={allowedLocation} setLocationsArray={setLocationsArray}/>
            {locationsArray && locationsArray.map((location: any) => {
                let icon = mcD
                if (location.name == 'Tim Hortons') {
                  icon = tims
                } else if (location.name == 'Popeyes Louisiana Kitchen') {
                    icon = popeyes
                } else if (location.name == 'Subway') {
                    icon = subway
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