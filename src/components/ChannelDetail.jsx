import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {Videos,ChannelCard} from "./utils/component";
import { fetchFromApi } from "./utils/fetchFromApi";
import axios from "axios";
import { demoProfilePicture } from "./utils/constants";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [video, setVideo] = useState([]);
  // console.log(channelDetail);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/channels",
      params: { part: "snippet,statistics", id: id },
      headers: {
        'X-RapidAPI-Key': '094d143fe1msh82a8b910961974ap14d86fjsn7d7f23b8f895',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response?.data?.items[0]);
        setChannelDetail(response?.data?.items[0]);
      })
      .catch(function (error) {
        console.error(error);
      });

    const option = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/search",
      params: {
        channelId: id,
        part: "snippet,id",
        order: "date",
        maxResults: "50",
      },
      headers: {
        'X-RapidAPI-Key': '094d143fe1msh82a8b910961974ap14d86fjsn7d7f23b8f895',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    
      },
    };

    axios
      .request(option)
      .then(function (response) {
        // console.log(response?.data?.items);
        setVideo(response?.data?.items);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [id]);
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            backgroundImage:` url(${channelDetail?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture})`
            ,
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            // backgroundSize:'100% 100%',
            backgroundRepeat:'no-repeat',
            // background:
            //   "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
            zIndex: 10,
            height: "400px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} />
      </Box>
      <Box sx={{ display: "flex", p: 2 }}>
        <Box sx={{ mr:{sm:'100px'}}} />
        <Videos videos={video} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
