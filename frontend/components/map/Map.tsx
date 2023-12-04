'use client'

import 'leaflet/dist/leaflet.css'
import style from '../../styles/Home.module.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { mcD, tims } from './icons'

function Map(props: any) {

    const locationsArray = props.data

    return ( 
        <MapContainer className={style.map} center={[43.9029, -79.4396]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {locationsArray.map((location: any) => {
                let icon = mcD
                if (location.name == 'Tim Hortons') {
                  icon = tims
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