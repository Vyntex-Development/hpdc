import classes from "./Categories.module.css";
import CustomLink from "../../../UI/CustomLink";
import { useState, useRef, useEffect } from "react";
import { changePostitionOfSwiperElements } from "../../../../utils/utils";
import FiltrationDropdown from "../../../UI/FiltrationDropdown";
import TraitsSlider from "../../../UI/TraitsSlider";
import "swiper/css";
import "swiper/css/navigation";

const Categories = ({ categories, slider }) => {
  const { title, description, choices } = slider;
  const [activeCategory, setActiveCategory] = useState(0);
  const filtersWrapperRef = useRef();

  const [filtersWrapperWidth, setFiltersWrapperWidth] = useState(null);

  useEffect(() => {
    setFiltersWrapperWidth(filtersWrapperRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    changePostitionOfSwiperElements(
      Array.from(document.querySelectorAll(".swiper-button-next")),
      ".slider-contaianer"
    );
    changePostitionOfSwiperElements(
      Array.from(document.querySelectorAll(".swiper-button-prev")),
      ".slider-contaianer"
    );
    changePostitionOfSwiperElements(
      Array.from(document.querySelectorAll(".swiper-pagination")),
      ".slider-contaianer"
    );
  }, []);

  return (
    <div className="container">
      <div className={classes.CategoriesWrapper}>
        <div ref={filtersWrapperRef} className={classes.FiltersWrapper}>
          <FiltrationDropdown id="1" dropdownTitle={title}>
            <p className={classes.Paragraph}>{description}</p>
            <ul className={classes.FilterList}>
              {categories.map((category, index) => {
                return (
                  <li
                    key={index}
                    className={
                      activeCategory === index ? classes.ActiveCategory : ""
                    }
                    onClick={() => setActiveCategory(index)}
                  >
                    <span></span>
                    {category.name}
                  </li>
                );
              })}
            </ul>
          </FiltrationDropdown>
          <CustomLink type="blue" href="/gallery">
            Explore Gallery
          </CustomLink>
        </div>
        <TraitsSlider
          categories={categories}
          filtersWrapperWidth={filtersWrapperWidth}
          activeCategory={activeCategory}
        />
      </div>
    </div>
  );
};

export default Categories;
