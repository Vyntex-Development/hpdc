import classes from "./GalleryFiltration.module.css";
import { useState, useEffect, useRef } from "react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Button from "../../../UI/Button";
import Link from "next/link";
import Card from "../../../UI/Card";
import Search from "../../../UI/Search";
import MultiRangeSlider from "../../../UI/MultiRangeSlider";
import FiltrationDropdown from "../../../UI/FiltrationDropdown";

const GalleryFiltration = (props) => {
  const {
    color: colors,
    sub_color: subColors,
    quality,
  } = props.data.filtration_fields;
  const [activeButtons, setActiveButtons] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [areVisible, setAreVisible] = useState(true);
  const [opacityRange, setOpacityRange] = useState({ from: 0, to: 1 });
  const [weightRange, setWeightRange] = useState({ from: 0, to: 5 });
  const [rarityRange, setRarityRange] = useState({ from: 0, to: 100 });

  // const [spinnerIsVisible, setSpinnerIsVisible] = useState(true);
  let content;

  const filtersRef = useRef();

  const setActive = (type) => {
    const modifiedActiveButtons = [...activeButtons];
    if (modifiedActiveButtons.some((btn) => btn === type)) {
      modifiedActiveButtons.splice(modifiedActiveButtons.indexOf(type), 1);
      setActiveButtons(modifiedActiveButtons);
    } else {
      modifiedActiveButtons.push(type);
      setActiveButtons(modifiedActiveButtons);
    }
  };

  useEffect(() => {
    setHasMore(props.diamonds.length > props.count ? null : true);
    // setSpinnerIsVisible(props.diamonds.length >= props.count ? false : true);
  }, [props.diamonds.length, props.count]);

  useEffect(() => {
    if (props.reset) {
      setActiveButtons([]);
    }
  }, [props.reset]);

  const getMoreDiamonds = () => {
    props.onGetMoreDiamonds();
  };

  const setRangeValues = (min, max, name) => {
    if (name === "opacity") {
      setOpacityRange({ ...opacityRange, from: min, to: max });
    }
    if (name === "weight") {
      setWeightRange({ ...weightRange, from: min, to: max });
    }
    if (name === "rarity") {
      setRarityRange({ ...rarityRange, from: min, to: max });
    }
  };

  const onSetRangeElementHandler = (ev, rangeType, name, min, max) => {
    console.log(min, max);
    if (name === "opacity") {
      props.setRangeValues(`${min}-${max}`, "opacity");
    }
    if (name === "weight") {
      props.setRangeValues(`${min}-${max}`, "weight");
    }
    if (name === "rarity") {
      props.setRangeValues(`${min}-${max}`, "rarity");
    }
  };

  if (props.diamonds && props.diamonds.length === 0) {
    content = <p className={classes.NoItemsFound}>No items found</p>;
  }

  if (props.diamonds && props.diamonds.length !== 0) {
    content = (
      <InfiniteScroll
        next={getMoreDiamonds}
        dataLength={props.diamonds.length}
        hasMore={hasMore}
        // loader={spinnerIsVisible && <Spinner gridCol="true" />}
      >
        {props.diamonds.map((diamond) => {
          return (
            <div className={classes.Item} key={diamond.id}>
              <Link href={`/leaderboard/${diamond.id}`}>
                <a>
                  <Card
                    title="name"
                    mediaUrlWebm={diamond.image.url}
                    mediaUrl={diamond.image_mp4.url}
                    name="name"
                    value="name"
                    rarity="name"
                  >
                    <div>
                      <span>Opacity</span>
                      <span>
                        {diamond.opacity_from} - {diamond.opacity_to}
                      </span>
                    </div>
                    <div>
                      <span>Color</span>
                      <span>{diamond.color}</span>
                    </div>
                    <div>
                      <span>Cut Quality</span>
                      <span>{diamond.cut_quality}</span>
                    </div>
                    <div>
                      <span>Rarity Rank</span>
                      <span>{diamond.rarity_name}</span>
                    </div>
                  </Card>
                </a>
              </Link>
              <Link href={`/leaderboard/${diamond.id}`}>
                <div className={classes.ItemId}>
                  <Button type="primary">{`Diamond #${diamond.id}`}</Button>
                </div>
              </Link>
            </div>
          );
        })}
      </InfiniteScroll>
    );
  }

  return (
    <div className="container">
      <div className={classes.FiltrationSection}>
        <div className={classes.FiltersWrapper}>
          <Button
            onClick={() => setAreVisible(!areVisible)}
            type="hide-filters"
          >
            Hide Filters
          </Button>

          <div
            ref={filtersRef}
            className={`${classes.Filters} ${!areVisible ? classes.Close : ""}`}
          >
            <FiltrationDropdown
              id="1"
              type="multiple"
              dropdownTitle="Cut quality"
              reset={props.reset}
            >
              <div className={classes.RarityWrapper}>
                {quality.map((q) => {
                  return (
                    <Button
                      key={q.id}
                      type="filter"
                      active={activeButtons.some(
                        (btnName) => btnName === q.name
                      )}
                      onClick={() => {
                        setActive(q.name);
                        props.setFilterValues(q.name, "cut_quality");
                      }}
                    >
                      {q.name}
                    </Button>
                  );
                })}
              </div>
            </FiltrationDropdown>
            <FiltrationDropdown
              id="2"
              type="multiple"
              dropdownTitle="Color"
              reset={props.reset}
            >
              <div className={classes.RarityWrapper}>
                {colors.map((c) => {
                  return (
                    <Button
                      onClick={() => {
                        setActive(c.name);
                        props.setFilterValues(c.name, "color");
                      }}
                      key={c.id}
                      type="filter"
                      active={activeButtons.some(
                        (btnName) => btnName === c.name
                      )}
                    >
                      {c.name}
                    </Button>
                  );
                })}
              </div>
            </FiltrationDropdown>
            <FiltrationDropdown
              id="3"
              type="multiple"
              dropdownTitle="Sub color"
              reset={props.reset}
            >
              <div className={classes.RarityWrapper}>
                {subColors.map((sC) => {
                  return (
                    <Button
                      onClick={() => {
                        setActive(sC.name);
                        props.setFilterValues(sC.name, "sub_color");
                      }}
                      key={sC.id}
                      type="filter"
                      active={activeButtons.some(
                        (btnName) => btnName === sC.name
                      )}
                    >
                      {sC.name}
                    </Button>
                  );
                })}
              </div>
            </FiltrationDropdown>
            <FiltrationDropdown
              id="4"
              type="multiple"
              dropdownTitle="Opacity"
              reset={props.reset}
            >
              <div className={classes.OpacityFilter}>
                <div className={classes.DragDealer}>
                  <MultiRangeSlider
                    min={0}
                    max={1}
                    minValue={0}
                    maxValue={1}
                    name="opacity"
                    reset={props.reset}
                    onChange={({ min, max }) => {
                      setRangeValues(min, max, "opacity");
                    }}
                    onSetRangeElement={onSetRangeElementHandler}
                    step="0.1"
                  />
                </div>
                <div className={classes.FromToWrapper}>
                  <div>
                    <span>From: </span>
                    {opacityRange.from}
                  </div>
                  <div>
                    <span>To: </span>
                    {opacityRange.to}
                  </div>
                </div>
              </div>
            </FiltrationDropdown>
            <FiltrationDropdown
              id="5"
              type="multiple"
              dropdownTitle="Weight"
              reset={props.reset}
            >
              <div className={classes.OpacityFilter}>
                <div className={classes.DragDealer}>
                  <MultiRangeSlider
                    min={0}
                    max={5}
                    minValue={0}
                    maxValue={5}
                    reset={props.reset}
                    name="weight"
                    onChange={({ min, max }) => {
                      setRangeValues(min, max, "weight");
                      // props.setFilterValues(`${min}-${max}`, "weight");
                    }}
                    onSetRangeElement={onSetRangeElementHandler}
                    step="0.01"
                  />
                </div>
                <div className={classes.FromToWrapper}>
                  <div>
                    <span>From: </span>
                    {weightRange.from}
                  </div>
                  <div>
                    <span>To: </span>
                    {weightRange.to}
                  </div>
                </div>
              </div>
            </FiltrationDropdown>
            <FiltrationDropdown
              id="6"
              type="multiple"
              dropdownTitle="Rarity"
              reset={props.reset}
            >
              <div className={classes.OpacityFilter}>
                <div className={classes.DragDealer}>
                  <MultiRangeSlider
                    min={0}
                    max={100}
                    minValue={0}
                    maxValue={100}
                    reset={props.reset}
                    name="rarity"
                    onChange={({ min, max }) => {
                      setRangeValues(min, max, "rarity");
                      // props.setFilterValues(`${min}-${max}`, "rarity");
                    }}
                    step="0.01"
                    onSetRangeElement={onSetRangeElementHandler}
                  />
                </div>
                <div className={classes.FromToWrapper}>
                  <div>
                    <span>From: </span>
                    {rarityRange.from}
                  </div>
                  <div>
                    <span>To: </span>
                    {rarityRange.to}
                  </div>
                </div>
              </div>
            </FiltrationDropdown>
          </div>
        </div>
        <div className={classes.FiltratedItems}>
          <Search
            inputChangedHandler={props.inputChangedHandler}
            setCurrentValue={props.setCurrentValue}
          />
          {content}
        </div>
      </div>
    </div>
  );
};

export default GalleryFiltration;
