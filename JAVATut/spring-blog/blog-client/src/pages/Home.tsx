import React, { useRef, useEffect } from "react"
import MainPanel from "../components/MainPanel"
import RightPanel from "../components/RightPanel"


interface Props {}

const Home = (props: Props) => {

  useEffect(() => {
    
  }, [])

  return (
    <div className="ui container">

      <div className="ui grid stackable">
        <div className="eleven wide column">
          <MainPanel />
        </div>

        <div className="five wide column">
          <RightPanel />
        </div>
      </div>
    </div>
  )
}

export default Home
