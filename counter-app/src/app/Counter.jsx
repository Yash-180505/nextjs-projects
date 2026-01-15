
"use client"

import { useState } from "react"

export default function Counter(){
    const[count,setCount]=useState(0)


    function increase(){
        setCount(count+1)
    }

    
    function reset(){
        setCount(0)
    }
    function decrease(){
        setCount(count-1)
    }
return(
    <>
    <div className="outer">
        <h2>Counter App</h2>
            <p className="display">{count}</p>
    <button className="inc" onClick={increase}>Increase</button>
       <button className="reset" onClick={reset}>Reset</button>
     <button  className="dec"onClick={decrease}>Decrease</button>


    </div>

    </>
     
)



}