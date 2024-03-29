"use client"

import { createContext, SetStateAction, Dispatch } from 'react';

type UserCoordinates = [number, number];

interface UserCoordinatesContextProps {
  userCoordinates: UserCoordinates;
  setUserCoordinates: Dispatch<SetStateAction<UserCoordinates>>;
}

interface allowedLocationContextProps {
  allowedLocation: boolean;
  setAllowedLocation: Dispatch<SetStateAction<boolean>>;
}

export const LocationContext = createContext<UserCoordinatesContextProps>({userCoordinates: [0, 0], setUserCoordinates: () => {}});
export const allowedLocationContext = createContext<allowedLocationContextProps>({allowedLocation: false, setAllowedLocation: () => {}});