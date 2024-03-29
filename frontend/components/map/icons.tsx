import { Icon } from 'leaflet'

export const user = new Icon ({
  iconUrl : 'userIcon.png',
  iconSize : [20,20],
  iconAnchor : [10,10], // point of the icon which will correspond to marker's location
  popupAnchor : [3, 3] // point from which the popup should open relative to the iconAnchor
})


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

export const popeyes = new Icon ({
  iconUrl : 'Popeyes.svg',
  iconSize : [22,22],
  iconAnchor : [10,10],
  popupAnchor : [0, 0]
})

export const subway = new Icon ({
  iconUrl : 'Subway.svg',
  iconSize : [22,22],
  iconAnchor : [10,10],
  popupAnchor : [0, 0]
})

export const harveys = new Icon ({
  iconUrl : 'Harveys.svg',
  iconSize : [22,22],
  iconAnchor : [10,10],
  popupAnchor : [0, 0]
})