// import { useRef, useState } from "react";
// const VideoWithCustomPlayButton = ({ src, type }) => {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const handlePlay = () => {
//     if (videoRef.current) {
//       videoRef.current.play();
//       setIsPlaying(true);
//     }
//   };
//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         borderRadius: "10px",
//         overflow: "hidden",
//       }}
//     >
//       <video
//         ref={videoRef}
//         width="100%"
//         height="auto"
//         muted
//         playsInline
//         style={{ display: "block", borderRadius: "10px" }}
//       >
//         <source src={src} type={type} />
//         Your browser does not support the video tag.
//       </video>
//       {!isPlaying && (
//         <button
//           onClick={handlePlay}
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             background: "white",
//             border: "none",
//             borderRadius: "50%",
//             padding: "12px 14px",
//             cursor: "pointer",
//             boxShadow: "0 0 10px rgba(0,0,0,0.3)",
//           }}
//         >
//           {/* :arrow_forward: */}
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="red"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M8 5v14l11-7L8 5z" />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// };
// export default VideoWithCustomPlayButton;

import React, { useEffect,useState, useRef, forwardRef } from "react";

const VideoWithCustomPlayButton = forwardRef(
  ({ src, type, isPlaying, onPlayPause, volume, onVolumeChange,setVideoElement }, ref) => {
    const videoRef = useRef(null);
    const [showVolumeControl, setShowVolumeControl] = useState(false);
        useEffect(() => {
      if (setVideoElement) {
        setVideoElement(videoRef.current);
      }
    }, [setVideoElement]);

    React.useImperativeHandle(ref, () => videoRef.current);

    return (
      <div style={{ position: "relative", width: "100%", borderRadius: "10px", overflow: "hidden" }}>
        <video
          ref={videoRef}
          src={src}
          type={type}
          controls={false}
          playsInline
          style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
        />

        {/* Play/Pause Button Centered */}
        <button
          onClick={onPlayPause}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255,255,255,0.8)",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          {isPlaying ? (
            <span style={{ fontSize: "24px" }}>❚❚</span>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          )}
        </button>

        {/* Volume Controls Bottom-Right */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: 2,
          }}
        >
          {showVolumeControl && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              style={{
                width: "80px",
                backgroundColor: "#fff",
                borderRadius: "4px",
              }}
            />
          )}
          <button
            onClick={() => setShowVolumeControl(!showVolumeControl)}
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {volume === 0 ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    );
  }
);

export default VideoWithCustomPlayButton;

