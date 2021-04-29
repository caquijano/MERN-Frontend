import React from 'react'
import { useParams } from "react-router-dom";

function Home() {
    interface Params {
        name?: string;
      }
    
      const params = useParams<Params>();
    return (
        <div>
            <h1>Home {params.name}</h1>
        </div>
    )
}

export default Home
