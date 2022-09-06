import React from 'react'
import {Link} from "react-router-dom"
import {Typography,Card,CardContent,CardMedia} from "@mui/material"
import {checkCircle} from "@mui/icons-material"
import { demoThumbnailUrl,demoChannelUrl,demoVideoUrl,demoChannelTitle,demoVideoTitle} from './utils/constants'
const VideoCard = ({video:{id:{videoId},snippet}}) => {
    // console.log(videoId,snippet.title);
  return (
    <Card>
        <Link to={videoId ? `/video/${videoId}`:demoVideoUrl}>
        <CardMedia image={snippet?.thumbnails?.high?.url}
        alt={snippet?.title}
        sx={{width:358,height:200}}/>
        </Link>
        <CardContent
        sx={{background:'#1e1e1e',height:"106px",width:358}}>
            <Link to={videoId ? `/video/${videoId}`:demoVideoUrl}>
            <Typography
            variant='subtitle1'
            fontWeight="bold" color="#FFF">
                {snippet?.title.slice(0,60)||demoVideoTitle.slice(0,60)}
            </Typography>
            </Link>
        </CardContent>
    </Card>
  )
}

export default VideoCard