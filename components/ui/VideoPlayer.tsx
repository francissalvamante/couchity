import { ActivityIndicator } from "react-native";
import React, { useState } from "react";
import YoutubeIframe from "react-native-youtube-iframe";

const VideoPlayer = ({ videoKey }) => {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const onChangeState = (event) => {
    if (event === "ended") setPlaying(false);
  };

  return (
    <>
      <YoutubeIframe
        height={250}
        play={playing}
        videoId={videoKey}
        onChangeState={onChangeState}
        onReady={() => setReady(true)}
      />
      {!ready && (
        <ActivityIndicator
          size="large"
          className="absolute top-[95px] left-[45.5%]"
        />
      )}
    </>
  );
};

export default VideoPlayer;
