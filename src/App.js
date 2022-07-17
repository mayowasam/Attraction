import styled from 'styled-components'
import { GlobalStyles } from './styles/globalstyles';
import { ThemeProvider } from "styled-components";
import { useStateVal } from './utils/StateProvider'
import { Logo, Moon, Sun } from './utils/svg';
import Sidebar from './components/Sidebar';
import { Map } from './components/Map';
import useEndpoint from './utils/Endpoint'
import { useEffect, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api'

const Container = styled.div`
width: 100%;
height: 100vh;
display: grid;
grid-template-columns: 1fr 2fr;
grid-template-rows: 70px 2fr;
overflow: hidden;
background: ${props => props.theme.body};
color:${props => props.theme.text};


&>:first-child{
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  // border: 2px solid red;
  align-items: center;
  padding: 1rem;

  input{
    width: 100%;
    padding: .5rem;
    outline: none;
    border: .5px solid ${props => props.theme.text};
    border-radius: 2rem;
    background: transparent;
    color:${props => props.theme.text};


  }

  &>:last-child{
    justify-self: flex-end;
  }


}



&>:last-child{
  // border: 3px solid yellow;
  height: 100%;
  width: 100%;

}

@media (max-width: 700px){
  grid-template-columns: 1fr;
  grid-template-rows: 70px 10rem 2fr;

  &>:first-child{
    padding: .5rem;

    input::placeholder{
      font-size: .7rem;
  
    }
  }

  .sidebar{
    grid-row: 3
  }
  &>:last-child{
    grid-row: 2/ 2;

  
  }

}



`




function App() {

  const { themeMode, Toggle, theme, coordinates, bounds, type, rating, places, setCoordinates } = useStateVal()
  const { getPlaces,} = useEndpoint()
  const [autocomplete, setAutocomplete] = useState()

 


  //to get the restaurants around me
  useEffect(() => {
    // console.log({ coordinates }, { bounds });
    if (bounds.sw && bounds.ne) {
      getPlaces(bounds, type, coordinates)
      // getWeather(coordinates)

    }
    // }, [type, coordinates, bounds])
  }, [type, bounds])








  const onLoad = (auto) => setAutocomplete(auto)
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()

    setCoordinates({
      lat,
      lng
    })
  }

  return (
    <>
    <GlobalStyles />
      <ThemeProvider theme={themeMode}>

        <Container>
        <nav>
          <h1>
            <Logo fill="#FEAD01" />

          </h1>

          <div className='input'>

            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
            >
              <input type="search" placeholder='search new places' />

            </Autocomplete>



          </div>

          <div onClick={Toggle}>
            {theme === "dark" ?
              <Moon width="30" height="30" fill="currentColor" style={{ padding: 0 }} />
              :
              <Sun style={{ padding: 0 }} width="30" height="30" fill="currentColor" />}

          </div>

        </nav>

        <div className="sidebar">
          <Sidebar />

        </div>

        <div className="map">
          <Map />

        </div>
    </Container>
      </ThemeProvider>
    </>

  );
}

export default App;
