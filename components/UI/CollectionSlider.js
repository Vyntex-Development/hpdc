import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper";
import { useState } from "react";
import "swiper/css/effect-fade";
import CustomLink from "../UI/CustomLink";
import classes from "./CollectionSlider.module.css";
import Video from "./Video";

const CollectionSlider = ({ diamonds }) => {
  const [slideId, setSlideId] = useState(diamonds[0].id);
  const [activeSlide, setActiveSlide] = useState(1);

  const setSlideIdHandler = (id) => {
    setActiveSlide(id + 1);
    setSlideId(diamonds[id].id);
  };

  return (
    <div className={classes.SliderWrapper}>
      <div className={classes.SlideIdLarge}>DIAMOND#{slideId}</div>
      <Swiper
        modules={[Navigation, EffectFade]}
        spaceBetween={64}
        slidesPerGroup={1}
        effect="fade"
        onSlideChange={(ev) => {
          setSlideIdHandler(ev.activeIndex);
        }}
        navigation={{ nextEl: "#swiper-forward", prevEl: "#swiper-back" }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {diamonds.map((slide, index) => {
          const { url: mediaUrlWebm } = slide.image;
          const { url: mediaUrlMp4 } = slide.image_mp4;
          return (
            <SwiperSlide key={index} className={classes.Slide}>
              <div className={classes.Slide}>
                <div className={classes.SlideCard}>
                  <span className={classes.IdWrapper}>DIAMOND #{slide.id}</span>
                  <div className={classes.VideoWrapper}>
                    <Video
                      mediaUrlWebm={mediaUrlWebm}
                      mediaUrlMp4={mediaUrlMp4}
                    />
                  </div>
                  <ul className={classes.CardInfoWrapper}>
                    <li className={classes.CardInfo}>
                      <span>Opacity</span>
                      <span>
                        {slide.opacity_from} - {slide.opacity_to}
                      </span>
                    </li>
                    <li className={classes.CardInfo}>
                      <span>Color</span>
                      <span>{slide.color}</span>
                    </li>
                    <li className={classes.CardInfo}>
                      <span>Cut quality</span>
                      <span>{slide.cut_quality}</span>
                    </li>
                    <li className={classes.CardInfo}>
                      <span>Rarity rank</span>
                      <span>{slide.rarity_name}</span>
                    </li>
                  </ul>
                </div>
                <div className={classes.SlideInfoWrapper}>
                  <h3>Diamond #{slide.id}</h3>
                  <p>
                    Each diamond has unique traits that make every piece of them
                    100% unique.
                  </p>
                  <CustomLink href="/gallery" type="transparent">
                    Explore Diamonds
                  </CustomLink>
                  <div className={`${classes.ArrowsWrapper} arrows-wrapper`}>
                    <button id="swiper-back"></button>
                    <button id="swiper-forward"></button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <div className={classes.PaginationWrapper}>
          <span className="range-from">01</span>
          <div className={classes.Pagination}>
            {Array(diamonds.length)
              .fill()
              .map((n, i) => {
                return (
                  <div
                    className={`${
                      activeSlide === ++i ? classes.ActivePaginationEl : ""
                    }`}
                    key={i}
                  ></div>
                );
              })}
          </div>
          <span className="range-to">0{diamonds.length}</span>
        </div>
      </Swiper>
    </div>
  );
};

export default CollectionSlider;
