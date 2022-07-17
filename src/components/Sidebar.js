import styled from "styled-components"
import { AiFillStar } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { RiPhoneFill } from 'react-icons/ri'
import { BsFillAwardFill } from 'react-icons/bs'
import { createRef, useEffect, useState } from "react"
import { useStateVal } from "../utils/StateProvider"
import  Loader  from "./Loader"
import water from '../assets/water-sm.jpg'

const Container = styled.div`
display: grid;
grid-template-rows: 100px 70vh;
// border: 5px solid blue;
width: 100%;
height: 100%;
padding: .5rem 1rem;



`

const Header = styled.div`
// border: 3px solid red;
width: 100%;
height: 100%;

h1{
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
    text-transform: uppercase;


}



.select{
    display: flex;
    align-items: center;
    gap: 1rem;
    // border: 2px solid red;

    div{
        display: flex;
        flex-direction: column;
        align-item: center;
        width: 5rem;
        // border: 2px solid blue;


        label{
            font-size: .7rem;
        }

        select{
            border: none;
            border-bottom: 1px solid grey;
            padding: .5rem 0;
            font-size: .7rem;
            font-weight: 500;
            outline: none;
            background: transparent;
            color:${props => props.theme.text};



            option{
                // background: red;
                background: ${props => props.theme.body};;
                color:${props => props.theme.text};

            }
    

        }
    }

}


@media (max-width: 700px){
    h1{
        font-size: 1rem;
        font-weight: 600; 
        margin-bottom: .5rem;

    }

   

}

`

const Content = styled.div`
// border: 3px solid yellow;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
gap: 1rem;
padding: 2rem 0;
overflow:hidden;
overflow-y: scroll;

 &::-webkit-scrollbar{
 display: none  
}


`

const Card = styled.div`
width: 100%;
// height: clamp(60rem, 30vh , 60rem);
height: 100vh;
// border: 2px solid purple;
padding: .5rem;
border: 1px solid ${props => props.theme.text};
border-radius: 2rem;
box-shadow: 3px 3px 3px ${props => props.theme.text};


// @media (max-width: 700px){

// }


`

const Top = styled.div`
width: 100%;
height: 40%;

img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;


}

@media (max-width: 700px){
    height: 40%;

}


`

const Bottom = styled.div`
width: 100%;
height: 60%;
display: flex;
flex-direction: column;
gap: .3rem;
font-size: .8rem;
// border: 2px solid red;
 
h3{
    padding: .5rem 0 ;
}

.panel{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .certification{
        justify-content: flex-end;
    }

}

.star{
    display: flex;
    align-items: center;
    color: #FF9529;
}

.tags{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: .5rem 1rem;

    span{
        background: gray;
        padding: .2rem;
        border-radius: 5px;
    }

}

.links{
    display: flex;
    align-items: center;
    gap: 1rem;
    // margin: 2rem 0;
    button{
        font-size: .7rem;
        border: none;
        cursor: pointer;
        ouline: none;
        padding: .5rem 0;
        background: ${props => props.theme.body};
        color: ${props => props.theme.text};

        ;
    
    }
    
    a{
        text-decoration: none;
        color: ${props => props.theme.text};
    }
}



`
export default function Sidebar() {
    const { places, type, setType, rating, setRating,clickedOnMap,setClickedOnMap, loading,
        Info 
    } = useStateVal()
    const [elRef, setElRef] = useState([])



    useEffect(() => {
        // const refs = Array(places.length).fill().map((_, i) => elRef[i] || createRef())
        const refs = Array(Info.length).fill().map((_, i) => elRef[i] || createRef())
        setElRef(refs)

    // }, [places])
}, [Info])



    console.log({Info});
    console.log({ elRef });
    console.log({ clickedOnMap });


    if (elRef.length > 0 && clickedOnMap && elRef[(Number(clickedOnMap))]) {
        console.log("card", elRef[(Number(clickedOnMap))]);
        if (Number(clickedOnMap) === 0) {
            elRef[(Number(clickedOnMap))].current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
            setClickedOnMap("")

        }else{
            elRef[(Number(clickedOnMap)) + 1].current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
            setClickedOnMap("")

        }
    }




    return (
        <>
            {
                loading ?
                    <>
                        < Loader />
                    </>
                    :
                    <>
                        <Container>


                            <Header>
                                <h1>{type}</h1>

                                <div className="select">

                                    <div>
                                        <label htmlFor="type">Type</label>
                                        <select name="attraction" value={type} id="type" onChange={(e) => setType(e.target.value)}>
                                            <option value="attractions">Attraction</option>
                                            <option value="hotels">Hotels</option>
                                            <option value="restaurants">Restaurant</option>

                                        </select>

                                    </div>

                                    <div>
                                        <label htmlFor="rating">Rating</label>
                                        <select name="rating" id="" value={rating} onChange={(e) => setRating(e.target.value)}>
                                            <option value="0">All</option>
                                            <option value="3">Above 3.0</option>
                                            <option value="4">Above 4.0</option>
                                            <option value="4.5">Above 4.5</option>

                                        </select>

                                    </div>
                                </div>


                            </Header>
                            <Content>
                            {/* {places.map((place, i) => ( */}
                                {Info.map((place, i) => (
                                    <Card key={i} ref={elRef[i]} >
                                        <Top>
                                            {place.photo && place.photo.images ? <img src={place.photo.images.large.url} alt={place.name} />:  <img src={water} alt="random"/>}
                                        </Top>
                                        <Bottom>
                                            <h3>{place.name}</h3>
                                            <div className="panel">

                                                {place.rating && <div className="star">
                                                    {[...Array(Math.round(Number(place.rating)))].map((x, id) => (
                                                        <div className="fullstar" key={id}>
                                                            <AiFillStar />
                                                        </div>

                                                    ))}
                                                </div>
                                                }
                                                <span>{`out of ${place?.num_reviews} reviews`}</span>

                                            </div>

                                            <div className="panel">
                                                <span>price</span>
                                                <span>{place?.price}</span>
                                            </div>
                                            <div className="panel">
                                                <span>ranking</span>
                                                <span>{place.ranking}</span>

                                            </div>



                                            {place.awards &&
                                                <div >
                                                    {place.awards.map((award, id) => (
                                                        <div className="panel" key={id}>
                                                            <div><BsFillAwardFill /></div>
                                                            <span className="certification">{award.display_name}</span>

                                                        </div>
                                                    ))}
                                                </div>
                                            }

                                            <div className="tags">
                                                {
                                                    place.cuisine && place.cuisine.map(cuisine => (
                                                        <span key={cuisine.key}>#{cuisine.name}</span>

                                                    ))
                                                }

                                            </div>

                                            <div className="panel">
                                                <span><GoLocation /></span>
                                                <span> {place.address}</span>
                                            </div>

                                            <div className="panel">
                                                <span><RiPhoneFill /></span>
                                                <span> {place.phone}</span>
                                            </div>

                                            <div className="links">
                                                <button onClick={() => window.open(place.web_url, "_blank")}>Travel Advisor</button>

                                                <a href={place.website} target="_blank" rel="noreferrer">Website</a>

                                            </div>


                                        </Bottom>
                                    </Card>

                                ))
                                }


                            </Content>

                        </Container>
                    </>

            }






            {/* <Container>


                <Header>
                    <h1>{type}</h1>

                    <div className="select">

                        <div>
                            <label htmlFor="type">Type</label>
                            <select name="attraction" value={type} id="type" onChange={(e) => setType(e.target.value)}>
                                <option value="attractions">Attraction</option>
                                <option value="hotels">Hotels</option>
                                <option value="restaurants">Restaurant</option>

                            </select>

                        </div>

                        <div>
                            <label htmlFor="rating">Rating</label>
                            <select name="rating" id="" value={rating} onChange={(e) => setRating(e.target.value)}>
                                <option value="0">All</option>
                                <option value="3">Above 3.0</option>
                                <option value="4">Above 4.0</option>
                                <option value="4.5">Above 4.5</option>

                            </select>

                        </div>
                    </div>


                </Header>
                <Content>
                    {data.map((x, i) => (
                        <Card key={i} ref={elRef[i]} >
                            <Top>
                                {<img src={x.bigImage} alt={x.name} />}
                            </Top>
                            <Bottom>
                                <h3>{x.name}</h3>
                                <div className="panel">

                                    {x.rating && <div className="star">
                                        {[...Array(Math.round(Number(x.rating)))].map((_, id) => (
                                            <div className="fullstar" key={id}>
                                                <AiFillStar />
                                            </div>

                                        ))}
                                    </div>
                                    }
                                    <span>{`out of ${x?.num_reviews} reviews`}</span>

                                </div>

                                <div className="panel">
                                    <span>price</span>
                                    <span>{x?.price}</span>
                                </div>
                                <div className="panel">
                                    <span>ranking</span>
                                    <span>{x.ranking}</span>

                                </div>



                                {x.awards &&
                                    <div >
                                        {x.awards.map((award, id) => (
                                            <div className="panel" key={id}>
                                                <div><BsFillAwardFill /></div>
                                                <span className="certification">{award.display_name}</span>

                                            </div>
                                        ))}
                                    </div>
                                }

                                <div className="tags">
                                    {
                                        x.cuisine && x.cuisine.map(cuisine => (
                                            <span key={cuisine.key}>#{cuisine.name}</span>

                                        ))
                                    }

                                </div>

                                <div className="panel">
                                    <span><GoLocation /></span>
                                    <span> {x.address}</span>
                                </div>

                                <div className="panel">
                                    <span><RiPhoneFill /></span>
                                    <span> {x.phone}</span>
                                </div>

                                <div className="links">
                                    <button onClick={() => window.open(x.web_url, "_blank")}>Travel Advisor</button>

                                    <a href={x.website} target="_blank" rel="noreferrer">Website</a>

                                </div>


                            </Bottom>
                        </Card>

                    ))
                    }


                </Content>

            </Container> */}
        </>

    )
}