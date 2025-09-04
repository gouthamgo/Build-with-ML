// import { useState } from "react";


// export default function Counter(){
//     const[count,setCount] = useState(0);

//     const increment = () => {
//         setCount(prevCount => prevCount + 1);
//     };

//     const decrement = () =>{
//         setCount(count -1 )
//     }


//     return(
//         <div>
//             <p> Count: {count}</p>
//             <button onClick={increment}> + </button>
//             <button onClick={decrement}> - </button>
//         </div>
//     )


// }


/*
useState(0) -- start at zero


useEffect( () => {
    // code 
    }, [dependencies]);
The first argument to useEffect is a function that contains the side effect code.
The second argument is an optional array of dependencies. If provided, the effect will only re-run if any of the dependencies change.


useEffect(() => {

    const fetchData = async() => {
        const response = await fetch('https:api.example.com/data');
        const data = await response.json();
        setData(data);
        }
    fetchData()
    },[props.someProp])

*/


/*

import {useState} from 'react'


const[value,setValue] = useState(initialValue)



*/



import React,{ useState } from "react";

function Counter(){
    const[count,setCount] = useState(0);

    const handleButtonClick = () => {
        setCount(count +1);
    }


    return(
        <div>

        <p> Check the clicked total {count}</p>
        <button onClick={handleButtonClick}>
            Click here 
        </button>

        </div>



    )
};



export default Counter;
