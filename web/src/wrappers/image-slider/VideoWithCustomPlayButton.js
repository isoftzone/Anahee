import { useRef, useState } from "react";
const VideoWithCustomPlayButton = ({ src, type }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        muted
        playsInline
        style={{ display: "block", borderRadius: "10px" }}
      >
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <button
          onClick={handlePlay}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            border: "none",
            borderRadius: "50%",
            padding: "12px 14px",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          {/* :arrow_forward: */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="red"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        </button>
      )}
    </div>
  );
};
export default VideoWithCustomPlayButton;