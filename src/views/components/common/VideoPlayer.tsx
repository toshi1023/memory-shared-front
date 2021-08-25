import * as React from "react";
import videojs from "video.js";

// Styles
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
}

const initialOptions: videojs.PlayerOptions = {
    controls: true,
    fluid: true,
    preload: 'metadata',
    controlBar: {
        volumePanel: {
        inline: false
        }
    }
};

/**
 * ビデオ再生用関数
 * @param param0 
 * @returns 
 */
const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoNode = React.useRef<HTMLVideoElement>(null);
  const player = React.useRef<videojs.Player>();
  
  React.useEffect(() => {
    if(videoNode !== null) {
        player.current = videojs(videoNode.current!, {
            ...initialOptions,
            ...options
        }).ready(function() {
        // console.log('onPlayerReady', this);
        });
        return () => {
            if (player.current) {
                player.current.dispose();
            }
        };
    }
  }, [options]);

  return <video ref={videoNode} className="video-js" style={{ margin: '10px 0 10px 0'}} />;
};

export default VideoPlayer;