import { useStateVal } from "./StateProvider";
import axios from 'axios'

export default function useEndpoint() {
  const { setPlaces, setLoading, setWeather ,
    setRating
  } = useStateVal()



  // const options = {
  //   // method: 'GET',
  //   // url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
  //   params: {
  //     bl_latitude: '11.847676',
  //     tr_latitude: '12.838442',
  //     bl_longitude: '109.095887',
  //     tr_longitude: '109.149359',
  //     // restaurant_tagcategory_standalone: '10591',
  //     // restaurant_tagcategory: '10591',
  //     // limit: '30',
  //     // currency: 'USD',
  //     // open_now: 'false',
  //     // lunit: 'km',
  //     // lang: 'en_US'
  //   },
  //   headers: {
  //     'X-RapidAPI-Key': '3059419d25msh8f1722e97fa45f8p1f0517jsncf6a93b74048',
  //     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  //   }
  // };

  // // export const get = () => {
  // //     axios.request(options).then(function (response) {
  // //         console.log(response.data);
  // //     }).catch(function (error) {
  // //         console.error(error);
  // //     });

  // // }



  const getPlaces = async (bounds, type,coord) => {
    // console.log({ bounds });
    // console.log({ type });
    // setRating(0)
    setLoading(true)
    try {
      const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        params: {
          bl_latitude: bounds.sw.lat,
          tr_latitude: bounds.ne.lat,
          bl_longitude: bounds.sw.lng,
          tr_longitude: bounds.ne.lat,
          // restaurant_tagcategory_standalone: '10591',
          // restaurant_tagcategory: '10591',
          // limit: '30',
          // currency: 'USD',
          // open_now: 'false',
          // lunit: 'km',
          // lang: 'en_US'
        },
        headers: {
          // 'X-RapidAPI-Key': '3059419d25msh8f1722e97fa45f8p1f0517jsncf6a93b74048',
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_KEY,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      })
      // console.log(data);
      if(data){
        // console.log("running data");
        setPlaces(data)
        getWeather(coord)
        // setFiltered([])

      }

      setLoading(false)

    } catch (error) {
      console.log(error);

    }

  }

  const getWeather = async (coord) => {
    // console.log({coord});
    try {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find',
        {
          params: {
            cnt: '50',
            lon: coord.lng,
            type: 'link, accurate',
            lat: coord.lat,
            units: 'imperial, metric'
          }
        ,
        
          headers: {
            'X-RapidAPI-Key': '3059419d25msh8f1722e97fa45f8p1f0517jsncf6a93b74048',
            // 'X-RapidAPI-Key': process.env.REACT_APP_RAPID_KEY,
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
          }
        })

        setWeather(data)
    } catch (error) {
      console.log(error);

    }

  }





  return {
    getPlaces,
    getWeather
  }



}









// //list

// const axios = require("axios");

// const options = {
//   method: 'POST',
//   url: 'https://travel-advisor.p.rapidapi.com/restaurant-filters/v2/list',
//   params: {currency: 'USD', units: 'km', lang: 'en_US'},
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': '3059419d25msh8f1722e97fa45f8p1f0517jsncf6a93b74048',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   },
//   data: '{"geoId":293928,"partySize":2,"reservationTime":"2022-03-07T20:00","sort":"RELEVANCE","sortOrder":"asc","filters":[{"id":"establishment","value":["10591","9900"]},{"id":"option","value":["10602","10870","16547"]},{"id":"meal","value":["10597"]},{"id":"price","value":["10955"]},{"id":"minRating","value":["40"]}]}'
// };




// export const get = () => {
//     axios.request(options).then(function (response) {
//         console.log(response.data);
//     }).catch(function (error) {
//         console.error(error);
//     });

// }

// //filter list

// const axios = require("axios");

// const options = {
//   method: 'POST',
//   url: 'https://travel-advisor.p.rapidapi.com/restaurant-filters/v2/list',
//   params: {currency: 'USD', units: 'km', lang: 'en_US'},
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': '3059419d25msh8f1722e97fa45f8p1f0517jsncf6a93b74048',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   },
//   data: '{"geoId":293928,"partySize":2,"reservationTime":"2022-03-07T20:00","sort":"RELEVANCE","sortOrder":"asc","filters":[{"id":"establishment","value":["10591","9900"]},{"id":"option","value":["10602","10870","16547"]},{"id":"meal","value":["10597"]},{"id":"price","value":["10955"]},{"id":"minRating","value":["40"]}]}'
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// //get detail
// const axios = require("axios");

// const options = {
//   method: 'POST',
//   url: 'https://travel-advisor.p.rapidapi.com/restaurants/v2/get-details',
//   params: {currency: 'USD', units: 'km', lang: 'en_US'},
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': '3059419d25msh8f1722e97fa45f8p1f0517jsncf6a93b74048',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   },
//   data: '{"contentId":"58dcec40-99dd-4420-851c-75d9aa007e0a","reservationTime":"2022-03-07T20:00","partySize":2}'
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// //hotels

// //filters
// const axios = require("axios");

// const options = {
//   method: 'POST',
//   url: 'https://travel-advisor.p.rapidapi.com/hotel-filters/v2/list',
//   params: {lang: 'en_US', units: 'km', currency: 'USD'},
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': '3059419d25msh8f1722e97fa45f8p1f0517jsncf6a93b74048',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   },
//   data: '{"geoId":293928,"checkIn":"2021-07-03","checkOut":"2021-07-05","sort":"PRICE_LOW_TO_HIGH","sortOrder":"asc","filters":[{"id":"deals","value":["1","2","3"]},{"id":"price","value":["31","122"]},{"id":"type","value":["9189","9201"]},{"id":"amenity","value":["9156","9658","21778","9176"]},{"id":"distFrom","value":["2227712","25.0"]},{"id":"rating","value":["40"]},{"id":"class","value":["9572"]}],"rooms":[{"adults":2,"childrenAges":[2]},{"adults":2,"childrenAges":[3]}]}'
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// //list

// const axios = require("axios");

// const options = {
//   method: 'POST',
//   url: 'https://travel-advisor.p.rapidapi.com/hotels/v2/list',
//   params: {currency: 'USD', units: 'km', lang: 'en_US'},
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': '3059419d25msh8f1722e97fa45f8p1f0517jsncf6a93b74048',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   },
//   data: '{"geoId":293928,"checkIn":"2022-03-10","checkOut":"2022-03-15","sort":"PRICE_LOW_TO_HIGH","sortOrder":"asc","filters":[{"id":"deals","value":["1","2","3"]},{"id":"price","value":["31","122"]},{"id":"type","value":["9189","9201"]},{"id":"amenity","value":["9156","9658","21778","9176"]},{"id":"distFrom","value":["2227712","25.0"]},{"id":"rating","value":["40"]},{"id":"class","value":["9572"]}],"rooms":[{"adults":2,"childrenAges":[2]},{"adults":2,"childrenAges":[3]}],"boundingBox":{"northEastCorner":{"latitude":12.248278039408776,"longitude":109.1981618106365},"southWestCorner":{"latitude":12.243407232845051,"longitude":109.1921640560031}},"updateToken":""}'
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });


// //offers
// const axios = require("axios");

// const options = {
//   method: 'POST',
//   url: 'https://travel-advisor.p.rapidapi.com/hotels/v2/get-offers',
//   params: {currency: 'USD', units: 'km', lang: 'en_US'},
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': '3059419d25msh8f1722e97fa45f8p1f0517jsncf6a93b74048',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   },
//   data: '{"detailId":181939,"checkIn":"2022-03-18","checkOut":"2022-03-19","rooms":[{"adults":2,"childrenAges":[]}],"updateToken":""}'
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// // details
// const axios = require("axios");

// const options = {
//   method: 'POST',
//   url: 'https://travel-advisor.p.rapidapi.com/hotels/v2/get-details',
//   params: {currency: 'USD', units: 'km', lang: 'en_US'},
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': '3059419d25msh8f1722e97fa45f8p1f0517jsncf6a93b74048',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   },
//   data: '{"contentId":"7307357","checkIn":"2022-03-03","checkOut":"2022-03-05","rooms":[{"adults":2,"childrenAges":[2]},{"adults":2,"childrenAges":[3]}]}'
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// //attraction

// //filter
// const axios = require("axios");

// const options = {
//   method: 'POST',
//   url: 'https://travel-advisor.p.rapidapi.com/attraction-filters/v2/list',
//   params: {currency: 'USD', units: 'km', lang: 'en_US'},
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': '3059419d25msh8f1722e97fa45f8p1f0517jsncf6a93b74048',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   },
//   data: '{"geoId":293928,"startDate":"2022-03-10","endDate":"2022-03-15","pax":[{"ageBand":"ADULT","count":2}],"sort":"TRAVELER_FAVORITE_V2","sortOrder":"asc","filters":[{"id":"category","value":["40"]},{"id":"rating","value":["40"]},{"id":"navbar","value":["ATTRACTIONOVERVIEW:-true"]}]}'
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// //list

// const axios = require("axios");

// const options = {
//   method: 'POST',
//   url: 'https://travel-advisor.p.rapidapi.com/attractions/v2/list',
//   params: {currency: 'USD', units: 'km', lang: 'en_US'},
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': '3059419d25msh8f1722e97fa45f8p1f0517jsncf6a93b74048',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   },
//   data: '{"geoId":293928,"startDate":"2022-03-10","endDate":"2022-03-15","pax":[{"ageBand":"ADULT","count":2}],"sort":"TRAVELER_FAVORITE_V2","sortOrder":"asc","filters":[{"id":"category","value":["40"]},{"id":"rating","value":["40"]},{"id":"navbar","value":["ATTRACTIONOVERVIEW:-true"]}],"boundingBox":{"northEastCorner":{"latitude":12.248278039408776,"longitude":109.1981618106365},"southWestCorner":{"latitude":12.243407232845051,"longitude":109.1921640560031}},"updateToken":""}'
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// //details

// const axios = require("axios");

// const options = {
//   method: 'POST',
//   url: 'https://travel-advisor.p.rapidapi.com/attractions/v2/get-details',
//   params: {currency: 'USD', units: 'km', lang: 'en_US'},
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': '3059419d25msh8f1722e97fa45f8p1f0517jsncf6a93b74048',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   },
//   data: '{"contentId":"1451754","startDate":"2022-06-30","endDate":"2022-07-01","pax":[{"ageBand":"ADULT","count":2}]}'
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });