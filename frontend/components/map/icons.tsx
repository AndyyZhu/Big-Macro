import { Icon } from 'leaflet'

export const mcD = new Icon ({
    iconUrl : 'Mcd.png',
    iconSize : [22,22],
    iconAnchor : [10,10], // point of the icon which will correspond to marker's location
    popupAnchor : [3, 3] // point from which the popup should open relative to the iconAnchor
})

export const tims = new Icon ({
    iconUrl : 'Tims.png',
    iconSize : [22,22],
    iconAnchor : [10,10],
    popupAnchor : [0, 0]
})