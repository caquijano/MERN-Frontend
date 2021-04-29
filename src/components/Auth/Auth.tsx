import React, { useState } from 'react'
import Login from './Login'
import Principal from './Principal'
import Register from './Register'

function Auth() {
    const [lg, setLg] = useState(true)
    return (
        <div className="form-group row col-lg-12" style={{padding:0, margin:0}}>
      <div style={{padding:0, margin:0}} className=" form-group col-lg-7">
        <Principal/>
      </div>
      <div className=" card form-group col-lg-5" style={{padding:0, margin:0}}>
        {lg ? 
                <Login setLg={setLg}/> 
                :
                <Register setLg={setLg}/>
        }
      </div>
        </div>
    )
}

export default Auth
