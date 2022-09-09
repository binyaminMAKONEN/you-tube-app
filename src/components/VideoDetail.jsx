import React from 'react'
import { useState,useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import  ReactPlayer  from 'react-player'
import { Typography,Stack,Box } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import Videos from './Videos'
import axios from 'axios'

const VideoDetail = () => {
  const {id} = useParams()
  const [videoDetail,setVideoDetail] = useState(null)

  useEffect(()=>{
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/videos',
      params: {part: 'contentDetails,snippet,statistics', id:id},
      headers: {
        'X-RapidAPI-Key': 'eea2323f1amshd73156367368367p1a2e17jsn4ff6e884e13f',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response?.data?.items[0]);
      setVideoDetail(response?.data?.items[0])
    }).catch(function (error) {
      console.error(error);
    });

  },[id])
  // const {snippet:{title,channelId}}
  return (
    <Box minHeight="95vh">
      <Stack direction={{xs:'column',md:"row"}}>
          <Box flex={1}>
            <Box sx={{width:'100%',position:"sticky",top:"86px"}}>
<ReactPlayer url={`http://www.youtube.com/watch?v=${id}`} className="react-player" controls/>
<Typography color="#fff" variant='h5' fontWeight="bold" p={2}>
{videoDetail?.snippet?.title}
</Typography>
            </Box>
          </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail