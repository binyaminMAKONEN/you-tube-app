import React from 'react'
import {BrowserRouter as Router ,Routes ,Route} from "react-router-dom"
import {Box} from "@mui/material"
import {Navbar,Feed,VideoDetail,ChannelDetail,SearchFeed} from './components/utils/component'

const App = () => {
  return (
    <Router>
      <Box sx={{backgroundColor:"#000"}}>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Feed/>}/>
          <Route path='/video/:id'  element={<VideoDetail/>}/>
          <Route path='/channel/:id'  element={<ChannelDetail/>}/>
          <Route path='/search/:searchTerm'  element={<SearchFeed/>}/>

        </Routes>
      </Box>
    </Router>
  )
}

export default App