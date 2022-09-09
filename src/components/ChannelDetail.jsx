import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import Videos from './Videos'
import ChannelCard from './ChannelCard'
import { fetchFromApi } from './utils/fetchFromApi'
import axios from "axios"

const ChannelDetail = () => {
  const {id} = useParams()
  const [channelDetail,setChannelDetail] =useState(null)
  const [video,setVideo] =useState([])
console.log(channelDetail);
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/channels',
      params: {part: 'snippet,statistics', id:id },
      headers: {
        'X-RapidAPI-Key': 'eea2323f1amshd73156367368367p1a2e17jsn4ff6e884e13f',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setChannelDetail(response?.data?.items[0])
    }).catch(function (error) {
      console.error(error);
    })    

    const option = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        channelId: id,
        part: 'snippet,id',
        order: 'date',
        maxResults: '50'
      },
      headers: {
        'X-RapidAPI-Key': 'eea2323f1amshd73156367368367p1a2e17jsn4ff6e884e13f',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
    
    axios.request(option).then(function (response) {
      console.log(response?.data?.items);
      setVideo(response?.data?.items)
    }).catch(function (error) {
      console.error(error);
    });
},[id])
  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{
    background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
    height:'300px'

        }}/>
<ChannelCard channelDetail={channelDetail}/>
        
      </Box>

    </Box>
  )
}

export default ChannelDetail