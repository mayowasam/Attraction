import GoogleMapReact from 'google-map-react';
import { GoLocation } from 'react-icons/go';
import { useStateVal } from '../utils/StateProvider';
import PlaceOnMap from './PlaceOnMap';


export function Map() {
    const { coordinates, setCoordinates, setBounds, places, setClickedOnMap, weather,
        // mappedData, 
        Info
    } = useStateVal()

    // console.log("map", { coordinates }, { bounds });
    
    return (
        <>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
                // defaultCenter={coordinates}
                defaultZoom={10}
                center={coordinates}
                // center={{lat: 52.520007, lng: 13.404954}}
                margin={[50, 50, 50, 50]}
                options={
                    {
                        disableDefaultUI: true,
                        zoomControl:true
                    }
                }
                onChange={(e) => {
                    console.log({ e });
                    setCoordinates({
                        lat: e.center.lat,
                        lng: e.center.lng
                    })

                    setBounds({
                        ne: e.marginBounds.ne,
                        sw: e.marginBounds.sw
                    })
                }}
                onChildClick={(child) =>{
                    console.log({child})
                    setClickedOnMap(child)

                }}

            >

                {/* display all the place result on the map */}
                {
                    // places && places.map((place, i) => (
                        Info && Info.map((place, i) => (
                            <div
                            lat={Number(place.latitude)}
                            lng={Number(place.longitude)}
                            key={i}
                        >
                            {window.innerWidth < 400 ? <GoLocation /> : <PlaceOnMap place={place} />}
                        </div>

                    ))
                }

                {
                   weather && weather?.list?.length> 0 && weather?.list?.map((data, i) => (
                        <div
                            lat={Number(data.coord.lat)}
                            lng={Number(data.coord.lon)}
                            key={i}
                        >
                            <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="" />
                        </div>
                    ))
                }



            </GoogleMapReact>
        </>
    )
}