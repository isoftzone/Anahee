// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swiper, { SwiperSlide } from "../../components/swiper";
// import ImageSliderOneSingle from "../../components/image-slider/ImageSliderOneSingle";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
// const settings = {
//   loop: true,
//   speed: 1000,
//   navigation: true,
//   autoHeight: false,
//   slidesPerView: 4,
//   spaceBetween: 20, // Add gap between slides
//   autoplay: {
//     delay: 5000,
//     disableOnInteraction: false,
//   },
//   grabCursor: true,
//   breakpoints: {
//     320: {
//       slidesPerView: 1,
//       spaceBetween: 10,
//     },
//     640: {
//       slidesPerView: 2,
//       spaceBetween: 15,
//     },
//     768: {
//       slidesPerView: 3,
//       spaceBetween: 20,
//     },
//     1024: {
//       slidesPerView: 4,
//       spaceBetween: 20,
//     },
//   },
// };
// const ImageSliderOne = ({ spaceTopClass, spaceBottomClass }) => {
//   const [images, setImages] = useState([]);
//   // useEffect(() => {
//   //   axios
//   //     .get(`${BASE_URL}/videos/productsvideo.mp4`)
//   //     .then((response) => {
//   //       console.log(":white_check_mark: API Response:", response.data);
//   //       setImages(response.data.images);
//   //     })
//   //     .catch((error) => {
//   //       console.error(":x: Error fetching image slider:", error);
//   //     });
//   // }, []);
//   useEffect(() => {
//   const files = ["video1.mp4", "video2.webm", "clip.ogg"]; // hardcoded
//   const videoFiles = files.filter((file) =>
//     /\.(mp4|webm|ogg|mov)$/i.test(file)
//   );
//   const videoURLs = videoFiles.map((filename) => ({
//     images: `${BASE_URL}/videos/productsvideo.mp4`,
//     link: "/",
//     alt: filename,
//   }));
//   setImages(videoURLs);
// }, []);
//   return (
//     <div className={`image-slider-area ${spaceTopClass} ${spaceBottomClass}`}>
//       <div className="image-slider-active mx-sm-5 px-sm-5">
//         <div className="text-center single-image-text flex">
//           <h1 className="social-media">Social Media Pressence</h1>
//           {images.length  ? (
//             <Swiper options={settings}>
//               {images.map((single, key) => (
//                 <SwiperSlide key={key}>
//                   <ImageSliderOneSingle data={single} />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           ) : (
//             <p>No images available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// ImageSliderOne.propTypes = {
//   spaceBottomClass: PropTypes.string,
//   spaceTopClass: PropTypes.string,
// };
// export default ImageSliderOne;
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Swiper, { SwiperSlide } from "../../components/swiper"; // Your Swiper wrapper
import VideoWithCustomPlayButton from "./VideoWithCustomPlayButton"; // adjust path as needed
const swiperSettings = {
  loop: true,
  speed: 1000,
  navigation: true,
  autoHeight: false,
  slidesPerView: 4,
  spaceBetween: 20,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  grabCursor: true,
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 10 },
    640: { slidesPerView: 2, spaceBetween: 15 },
    768: { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 4, spaceBetween: 20 },
  },
};
const ImageSliderOne = ({ spaceTopClass, spaceBottomClass }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const files = [
      "productsvideo.mp4",
      "productsvideo2.mp4",
      "productsvideo3.mp4",
      "productsvideo4.mp4",
    ]; // hardcoded video files
    const videoData = files.map((filename) => ({
      src: `/assets/img/team/${filename}`,
      type: `video/${filename.split(".").pop()}`, // infers 'mp4', 'webm', etc.
      alt: filename,
    }));
    setVideos(videoData);
  }, []);
  return (
    <div
      className={`image-slider-area ${spaceTopClass || ""} ${
        spaceBottomClass || ""
      }`}
    >
      <div className="image-slider-active mx-sm-5 px-sm-5">
        <div className="text-center single-image-text flex">
          <h1 className="social-media">Social Media Presence</h1>
          {videos.length ? (
            <Swiper options={swiperSettings}>
              {videos.map((video, index) => (
                <SwiperSlide key={index}>
                  <div className="video-slide">
                    <VideoWithCustomPlayButton
                      src={video.src}
                      type={video.type}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>No videos available</p>
          )}
        </div>
      </div>
    </div>
  );
};
ImageSliderOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};
export default ImageSliderOne;