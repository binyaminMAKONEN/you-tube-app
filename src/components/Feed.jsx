import React from 'react'
import { useState,useEffect } from 'react'
import {Stack , Box ,Typography} from "@mui/material"
import Sidebar from './Sidebar'
import Videos from "./Videos"
import { fetchFromApi } from './utils/fetchFromApi'
import axios from "axios"
const Feed = () => {
    const [selectedCategory,setSelectedCategory] =useState('New')
    const [videos,setVideos] =useState([])
    useEffect(() => {
        // fetchFromApi(`${selectedCategory}`)
        // .then((data)=>setVideos(data.items))
        const options = {
            method: 'GET',
            url: `https://youtube-v31.p.rapidapi.com/search`,
            params: {
              
              q:selectedCategory,
              part: 'snippet,id',
              regionCode: 'US',
              maxResults: '50',
              order: 'date'
            },
            headers: {
              'X-RapidAPI-Key': 'eea2323f1amshd73156367368367p1a2e17jsn4ff6e884e13f',
              'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
            }
          };
          
          console.log(selectedCategory);
          axios.request(options).then(function (response) {
              console.log();
              setVideos(response.data.items)
          }).catch(function (error) {
              console.error(error);
          });
        
    },[selectedCategory])
  return (
    <Stack  sx={{flexDirection:{sx:"column",md:"row"}
    }}>
        <Box sx={{height:{sx:"auto",md:"92vh"},borderRight: "1px solid #3d3d3d"
        ,px:{sm:0,md:2}}}
        >
            <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}/>
            <Typography className='copyright'
            variant='body2' sx={{mt:1.5}}>
                Copyright benjamin media
            </Typography>

        </Box>
        <Box p={2} sx={{overflowY:"auto",height:"90vh",flex:2}}>
            <Typography variant='h4'
            fontWeight="bold" mb={2} sx={{color:"white"}} >
              {selectedCategory}<span style={{color:"#F31503"}}>videos</span>
            </Typography>
            <Videos videos={videos}/>
        </Box>
    </Stack>
  )
}

export default Feed