const Video = ({ mediaUrlWebm, mediaUrlMp4 }) => {
  const handlePlayVideo = (ev) => {
    ev.target.play();
  };

  const handlePauseVideo = (ev) => {
    ev.target.pause();
  };

  return (
    <video
      controls={false}
      loop
      muted
      playsInline
      preload="auto"
      onMouseLeave={handlePauseVideo}
      onMouseEnter={handlePlayVideo}
    >
      <source
        src={`${
          !mediaUrlWebm?.includes("https://")
            ? "https://" + mediaUrlWebm
            : mediaUrlWebm
        }`}
        type="video/webm"
      />
      <source
        src={`${
          !mediaUrlMp4?.includes("https://")
            ? "https://" + mediaUrlMp4
            : mediaUrlMp4
        }`}
        type="video/mp4"
      />
    </video>
  );
};

export default Video;
