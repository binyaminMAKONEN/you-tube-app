import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {Videos,ChannelCard} from "./utils/component";
import { fetchFromApi } from "./utils/fetchFromApi";
import { demoProfilePicture } from "./utils/constants";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [video, setVideo] = useState([]);
  // console.log(channelDetail);
  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromApi(`channels?part=snippet&id=${id}`);
      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromApi(`search?channelId=${id}&part=snippet%2Cid&order=date`);
      setVideo(videosData?.items);
    };

    fetchResults();
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
