import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper";
import classes from "./TraitsSlider.module.css";
import { useState, useEffect } from "react";
import "swiper/css/effect-creative";
const TraitsSlider = ({ categories, filtersWrapperWidth, activeCategory }) => {
  const [ranges, setRanges] = useState({
    from: 1,
    to: categories[activeCategory].length,
  });
  const [numberOfSliderCardsTo, setNumberOfSliderCardsTo] = useState([6]);
  const [numberOfSliderCardsFrom, setNumberOfSliderCardsfrom] = useState([1]);
  const [numOfPaginationElements, setNumOfPaginationElements] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    setRanges({
      from: 1,
      to:
        categories[activeCategory].length < 6
          ? categories[activeCategory].length
          : 6,
    });
  }, [categories[activeCategory].length]);

  useEffect(() => {
    setNumberOfSliderCardsTo([6]);
    setNumberOfSliderCardsfrom([1]);
  }, [activeCategory]);

  useEffect(() => {
    setNumOfPaginationElements(categories[activeCategory].category.length);
  }, [activeCategory]);

  const sum = (numOfSlideCards) => {
    return numOfSlideCards.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  };

  const setRangesHandler = (activeIndex, prevIndex, numOfCards) => {
    const modifiedNumberOfSliderCardsTo = [...numberOfSliderCardsTo];
    const modifiedNumberOfSliderCardsFrom = [...numberOfSliderCardsFrom];
    if (activeIndex > prevIndex) {
      modifiedNumberOfSliderCardsTo.push(numOfCards);
      modifiedNumberOfSliderCardsFrom.push(6);
    } else {
      modifiedNumberOfSliderCardsTo.pop();
      modifiedNumberOfSliderCardsFrom.pop();
    }
    setNumberOfSliderCardsTo(modifiedNumberOfSliderCardsTo);
    setNumberOfSliderCardsfrom(modifiedNumberOfSliderCardsFrom);
    let ranges = {
      from: sum(modifiedNumberOfSliderCardsFrom),
      to: sum(modifiedNumberOfSliderCardsTo),
    };
    setRanges(ranges);
  };

  return (
    <div
      className="traits-slider"
      style={{
        width: `calc(100% - ${filtersWrapperWidth}px)`,
        paddingLeft: "8rem",
        position: "relative",
      }}
    >
      {categories.map((category, index) => {
        const { category: slider } = category;
        return (
          <div
            key={index}
            className={`${activeCategory === index ? "active-slider" : ""} ${
              classes.Slider
            } slider-contaianer`}
          >
            <div className={classes.PaginationWrapper}>
              <span className="range-from">{`${
                ranges.from.toString().length === 1
                  ? "0" + ranges.from.toString()
                  : ranges.from
              }`}</span>
              {/* <span className="range-from">3</span> */}
              <div className={classes.Pagination}>
                {Array(numOfPaginationElements)
                  .fill()
                  .map((n, i) => {
                    return (
                      <div
                        className={`${
                          activeIndex === i ? classes.ActivePaginationEl : ""
                        }`}
                        key={i}
                      ></div>
                    );
                  })}
              </div>
              <span className="range-to">{`${
                ranges.to.toString().length === 1
                  ? "0" + ranges.to.toString()
                  : ranges.to
              }`}</span>
              {/* <span className="range-to">3</span> */}
            </div>

            <Swiper
              modules={[Navigation, EffectFade]}
              spaceBetween={0}
              slidesPerGroup={1}
              // breakpoints={{
              //   1440: {
              //     slidesPerView: 4,
              //   },
              //   768: {
              //     slidesPerView: 2,
              //   },
              //   0: {
              //     slidesPerView: 1,
              //   },
              // }}
              onSlideChange={(ev) => {
                setRangesHandler(
                  ev.activeIndex,
                  ev.previousIndex,
                  ev.slides[ev.activeIndex].childElementCount
                );
                setActiveIndex(ev.activeIndex);
              }}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {slider.map((slides, i) => {
                return (
                  <SwiperSlide key={i} className={classes.Slide}>
                    {slides.map((slide, slideIndex) => {
                      return (
                        <Card
                          key={slideIndex}
                          title={slide.title}
                          mediaUrlWebm={slide.mediaUrlWebm}
                          mediaUrl={slide.mediaUrl}
                        >
                          <div>
                            <span>{category.name}</span>
                            <span>{slide.description}</span>
                          </div>
                          <div>
                            <span>Rarity</span>
                            <span>{slide.title}</span>
                          </div>
                        </Card>
                      );
                    })}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        );
      })}
    </div>
  );
};

export default TraitsSlider;
