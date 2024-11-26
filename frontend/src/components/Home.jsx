import React from 'react'
import Navbar from './Navbar'
import Featured from './Featured'
import Footer from './Footer'
import Public_events from './public_events'
// import MoreEvents from './MoreEvents'
const HomePage = () => {
  return (
    <div>
        <Navbar />
        <Featured />
        {/* <MoreEvents/> */}
        <br />
        <Public_events/>
        <Footer />

    </div>
  )
}

export default HomePage;