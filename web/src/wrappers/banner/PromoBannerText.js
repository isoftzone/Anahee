import clsx from "clsx";

const PromoBannerText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
      />
      <div style={styles.banner}>
        <div style={styles.marquee}>
          <div style={styles.marqueeContent}>
            {Array(6).fill(
              <span style={styles.text}>
                Pre-Launch Offer: Flat 15% OFF – Limited Time Only!
              </span>
            )}
          </div>
          <div style={styles.marqueeContent}>
            {Array(6).fill(
              <span style={styles.text}>
                Pre-Launch Offer: Flat 15% OFF – Limited Time Only!
              </span>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scrollMarquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          @media (max-width: 768px) {
            .promo-text {
              font-size: 4vw !important;
              margin-right: 6vw !important;
            }
          }

          @media (max-width: 480px) {
            .promo-text {
              font-size: 5vw !important;
              margin-right: 8vw !important;
            }

           
          }
        `}
      </style>
    </>
  );
};

const styles = {
  banner: {
    width: "100%",
    height: "56px",
    backgroundColor: "#5CAE86",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  marquee: {
    display: "flex",
    width: "200%",
    animation: "scrollMarquee 20s linear infinite",
  },
  marqueeContent: {
    display: "flex",
    whiteSpace: "nowrap",
  },
  text: {
    color: "white",
    fontSize: "15px", // larger for better readability
    fontWeight: 600, // semi-bold
    letterSpacing: "0.3px", // subtle spacing like the image
    marginRight: "60px", // extra gap between text chunks
    whiteSpace: "nowrap", // ensures one-line
  },
};

export default PromoBannerText;
