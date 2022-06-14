import classes from "./GalleryFiltration.module.css";
import { useState, useEffect } from "react";
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
  const [from, setFrom] = useState(0.0);
  const [to, setTo] = useState(1.0);

  // const [spinnerIsVisible, setSpinnerIsVisible] = useState(true);

  const setActive = (type) => {
    console.log(type);
    const modifiedActiveButtons = [...activeButtons];
    if (modifiedActiveButtons.some((btn) => btn === type)) {
      modifiedActiveButtons.splice(modifiedActiveButtons.indexOf(type), 1);
      setActiveButtons(modifiedActiveButtons);
    } else {
      modifiedActiveButtons.push(type);
      setActiveButtons(modifiedActiveButtons);
    }
    console.log(modifiedActiveButtons);
  };

  useEffect(() => {
    setHasMore(props.diamonds.length > props.count ? null : true);
    // setSpinnerIsVisible(props.diamonds.length >= props.count ? false : true);
  }, [props.diamonds.length, props.count]);

  const getMoreDiamonds = () => {
    props.onGetMoreDiamonds();
  };

  let content;

  const setRangeValues = (min, max) => {
    setFrom(min);
    setTo(max);
  };

  const onSetRangeElementHandler = (ev, rangeType) => {
    // console.log(ev, rangeType);
    // if (rangeType === "from" && ev.target.value < props.data?.min?.[0].rarity)
    //   return;
    // if (rangeType === "to" && ev.target.value > props.data?.max?.[0].rarity)
    //   return;
    // props.inputChangedHandler(ev, rangeType);
  };

  if (props.diamonds && props.diamonds.length === 0) {
    content = <p>No items found</p>;
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
            className={`${classes.Filters} ${!areVisible ? classes.Close : ""}`}
          >
            <FiltrationDropdown
              id="1"
              type="multiple"
              dropdownTitle="Cut quality"
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
            <FiltrationDropdown id="2" type="multiple" dropdownTitle="Color">
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
            >
              <div className={classes.RarityWrapper}>
                {subColors.map((sC) => {
                  return (
                    <Button
                      onClick={() => {
                        setActive(sC.name);
                        props.setFilterValues(sC.name, "sub-color");
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
            <FiltrationDropdown id="4" type="multiple" dropdownTitle="Opacity">
              <div className={classes.OpacityFilter}>
                <div className={classes.DragDealer}>
                  <MultiRangeSlider
                    min={0}
                    max={1}
                    minValue={0.2}
                    maxValue={0.8}
                    onChange={({ min, max }) => setRangeValues(min, max)}
                    onSetRangeElement={onSetRangeElementHandler}
                    step="0.1"
                  />
                </div>
                <div className={classes.FromToWrapper}>
                  <div>
                    <span>From: </span>
                    {from}
                  </div>
                  <div>
                    <span>To: </span>
                    {to}
                  </div>
                </div>
              </div>
            </FiltrationDropdown>
          </div>
        </div>

        <div className={classes.FiltratedItems}>
          <Search />
          {content}
        </div>
      </div>
    </div>
  );
};

export default GalleryFiltration;
