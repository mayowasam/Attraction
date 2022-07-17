import styled from "styled-components"

const Card = styled.div`
width: 6rem;
height: 6rem;
padding: .3rem;
// border: 2px solid red;
background: white;

.image{
    width: 100%;
    height:70%;

    img{
        width: 100%;
        height:100%;
        object-fit: cover;
    }
}

.name{
    font-size: .6rem;
    padding: .2rem 0 ;
}

`



export default function PlaceOnMap({place}){
    // console.log({ place});

    return (
        <Card>
            <div className="image">
            {place.photo && place.photo.images && <img src={place.photo.images.large.url} alt={place.name} />}

            </div>
            <div className="name">{place.name}</div>
        </Card>

    )
}