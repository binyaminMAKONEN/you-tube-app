import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import {
  demoThumbnailUrl,
  demoChannelUrl,
  demoVideoUrl,
  demoChannelTitle,
  demoVideoTitle,
} from "./utils/constants";
const VideoCard = ({video: { id: { videoId }, snippet, },
}) => {
  console.log(snippet);
  return (
    <Card sx={{ width: {minWidth:'100%', xs: '365px', sm: '355px', md: "320px",lg:"300px" }, boxShadow: "none", borderRadius: 0 }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          image={snippet?.thumbnails?.high?.url}
          alt={snippet?.title}
          sx={{ width:{xs:'100%', sm:'358px'} , height: 200 }}
        />
      </Link>
      <CardContent sx={{ background: "#1e1e1e", height: "106px"}}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Typography variant="subtitle2" fontWeight="bold" color="gray">
            {snippet?.channelTitle.slice(0, 60) || demoVideoTitle.slice(0, 60)}
            <CheckCircle sx={{fontSize:12,color:'gray',ml:'5px'}}/>
          </Typography>
         
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
