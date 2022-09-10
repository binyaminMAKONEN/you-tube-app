import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Stack, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Videos from "./Videos";
import axios from "axios";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState([]);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/videos",
      params: { part: "contentDetails,snippet,statistics", id: id },
      headers: {
        "X-RapidAPI-Key": "5de0722db1msh3b14a48dea3e7a1p15c8bajsn2288cf021295",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response?.data?.items[0]);
        setVideoDetail(response?.data?.items[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
      //
      const option = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/search',
        params: {
          relatedToVideoId: id,
          part: 'id,snippet',
          type: 'video',
          maxResults: '50'
        },
        headers: {
          'X-RapidAPI-Key': '5de0722db1msh3b14a48dea3e7a1p15c8bajsn2288cf021295',
          'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
      };
      
      axios.request(option).then(function (response) {
        console.log(response.data.items);
        setVideo(response?.data?.items)
      }).catch(function (error) {
        console.error(error);
      });
  }, [id]);
  if(!videoDetail?.snippet)return "Loading..."
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`http://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent='space-between' sx={{color:"#fff"}} py={1} px={2}>
           <Link to={`/channel/${channelId}`}>
            <Typography variant={{sm:'subtitle1',md:'h6'}}
            color="#fff"
            >
             {channelTitle}
             <CheckCircle sx={{fontSize:'12px' ,color:'gray',ml:'5px'}}/>
            </Typography>
           </Link>
            <Stack direction='row' gap="20px" alignItems='center'>
               <Typography variant="body1" sx={{opacity:0.7}}>
                {parseInt(viewCount).toLocaleString()} views
               </Typography>
               <Typography variant="body1" sx={{opacity:0.7}}>
                {parseInt(likeCount).toLocaleString()} like
               </Typography>
            </Stack>
            </Stack>
          </Box>
        </Box>
      <Box px={2} py={{md:1,xs:5}}  justifyContent='center' alignItems='center'>
        <Videos videos={video} direction='column' />
      </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
