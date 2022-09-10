import React from 'react'
import { useState,useEffect } from 'react'
import {  Box ,Typography} from "@mui/material"
import Videos from "./Videos"
import { fetchFromApi } from './utils/fetchFromApi'
import axios from "axios"
import { useParams } from 'react-router-dom'

const SearchFeed = () => {
  const [videos,setVideos] =useState([])
  const {searchTerm} = useParams()
  useEffect(() => {
      // fetchFromApi(`${selectedCategory}`)
      // .then((data)=>setVideos(data.items))
      const options = {
          method: 'GET',
          url: `https://youtube-v31.p.rapidapi.com/search`,
          params: {
            
            q:searchTerm,
            part: 'snippet,id',
            regionCode: 'US',
            maxResults: '50',
            order: 'date'
          },
          headers: {
            'X-RapidAPI-Key': '5de0722db1msh3b14a48dea3e7a1p15c8bajsn2288cf021295',
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        
          }
        };
        
        axios.request(options).then(function (response) {
            // console.log(response.data.items);
            setVideos(response.data.items)
        }).catch(function (error) {
            console.error(error);
        });
      
  },[searchTerm])
  return (
    <Box p={2} sx={{overflowY:"auto",height:"90vh",flex:2}}>
    <Typography variant='h4'
    fontWeight="bold" mb={2} sx={{color:"white"}} >
      Search result for<span style={{color:"#F31503"}}>{searchTerm}</span>
    </Typography>
    <Videos videos={videos}/>
</Box>
  )
}

export default SearchFeed