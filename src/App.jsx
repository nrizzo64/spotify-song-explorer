import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/Header.css'
import './components/Dashboard.css'
import BarChartFeature from './components/BarChartFeature.jsx'
import Tracks from './components/Tracks.jsx'
import Header from './components/Header.jsx'

function App() {

  return (
    <div className="wrapper">
      <Header />

      <div className="dashboard">
        <Tracks />

        {/* <BarChartFeature tracks={visibleTracks} /> */}

      </div>
    </div>
  )
}

export default App
