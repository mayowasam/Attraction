import {useMemo, useState, useEffect, createContext, useContext } from "react";
import { useDarkMode } from "./useDarkMode";
import { DarkTheme, LightTheme } from '../styles/globalstyles';



const StateContext = createContext()



function StateProvider({ children }) {
    const { theme, Toggle } = useDarkMode()
    const themeMode = (theme === "dark") ? DarkTheme : LightTheme
    const [places, setPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [clickedOnMap, setClickedOnMap ] = useState() 
    const [loading, setLoading] =  useState(true)
    const [type, setType] = useState("attractions")
    const [rating, setRating] = useState(0)
    // const [filtered, setFiltered] = useState([])
    const [weather, setWeather] = useState([])

 console.log({ places });
  // console.log({weather});
    console.log({ rating });


// to filter the places by rating
    // let mappedData = filtered.length ? filtered : places

      //filter by ratings
  // useEffect(() => {
  //   // console.log(places[0]?.rating);
  //   if(Number(rating) === 0) {
  //     console.log("inside/", {places});
  //     setFiltered([])
  //   }
  //   let filter = places.length > 0 && places.filter(place => Number(place.rating) >= Number(rating))
  //   console.log({ filter });
  //   setFiltered(filter)

  // }, [rating])


    const Info = useMemo(
      () => {
        if(Number(rating) === 0){
          return places
        }else if(places.length > 0 && Number(rating) > 0){

          return places.filter(place => Number(place.rating) >= Number(rating))

        }
      },
      [rating, places]
  );

    //get my present coordinates when i open the app
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}}) =>  {
      setCoordinates({
        lat: latitude,
        lng: longitude,

      })
    })

  },[])


    return <StateContext.Provider value={{
        theme,
        Toggle,
        themeMode,
        places,
        setPlaces,
        coordinates, 
        setCoordinates,
        bounds, 
        setBounds,
        clickedOnMap, 
        setClickedOnMap,
        loading, 
        setLoading,
        type, 
        setType,
        rating, 
        setRating,
        // filtered, 
        // setFiltered,
        // mappedData,
        weather, 
        setWeather,
        Info

    }}>
        {children}
    </StateContext.Provider>
}

export const useStateVal = () => useContext(StateContext)

export default StateProvider