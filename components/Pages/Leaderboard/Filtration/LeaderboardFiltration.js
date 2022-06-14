import classes from "./LeaderboardFiltration.module.css";
import { useState, useEffect } from "react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Button from "../../../UI/Button";
import Link from "next/link";
import Card from "../../../UI/Card";
import Search from "../../../UI/Search";
import MultiRangeSlider from "../../../UI/MultiRangeSlider";
import FiltrationDropdown from "../../../UI/FiltrationDropdown";

const LeaderboardFiltration = (props) => {
  const [activeButton, setActiveButton] = useState("DESC");
  const [hasMore, setHasMore] = useState(true);
  const [areVisible, setAreVisible] = useState(true);
  const [dropdowns, setDropdowns] = useState([]);
  const [from, setFrom] = useState(props.data?.min?.[0].rarity);
  const [to, setTo] = useState(props.data?.max?.[0].rarity);

  // const [spinnerIsVisible, setSpinnerIsVisible] = useState(true);

  const setActive = (type) => {
    setActiveButton(type);
    props.onSort(type);
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

  const dropdownHandler = (type) => {
    const modifiedDropdowns = [...dropdowns];
    modifiedDropdowns.some((dd) => dd === type)
      ? modifiedDropdowns.splice(modifiedDropdowns.indexOf(type), 1)
      : modifiedDropdowns.push(type);
    setDropdowns(modifiedDropdowns);
  };

  const onSetRangeElementHandler = (ev, rangeType) => {
    if (rangeType === "from" && ev.target.value < props.data?.min?.[0].rarity)
      return;
    if (rangeType === "to" && ev.target.value > props.data?.max?.[0].rarity)
      return;
    props.inputChangedHandler(ev, rangeType);
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
              <Link href={`/leaderboard/${diamond.id}`} passHref>
                <Card
                  title="name"
                  mediaUrlWebm={diamond.image.url}
                  mediaUrl={diamond.image_mp4.url}
                  name="name"
                  value="name"
                  rarity="name"
                >
                  <div>
                    <span>Rarity Score</span>
                    <span>{diamond.rarity}</span>
                  </div>
                  <div>
                    <span>Rarity Rank</span>
                    <span>{diamond.rarity_name}</span>
                  </div>
                </Card>
              </Link>
              <Link href={`/leaderboard/${diamond.id}`} passHref>
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
            <FiltrationDropdown id="1" type="multiple" dropdownTitle="Rarity">
              <div className={classes.RarityWrapper}>
                <Button
                  onClick={() => setActive("ASC")}
                  type="filter"
                  active={activeButton === "ASC"}
                >
                  Least Rare
                </Button>
                <Button
                  onClick={() => setActive("DESC")}
                  type="filter"
                  active={activeButton === "DESC"}
                >
                  Most Rare
                </Button>
              </div>
            </FiltrationDropdown>
            <FiltrationDropdown id="2" type="multiple" dropdownTitle="Opacity">
              <div className={classes.OpacityFilter}>
                <div className={classes.DragDealer}>
                  <MultiRangeSlider
                    min={1}
                    max={100}
                    minValue={props.data?.min?.[0].rarity}
                    maxValue={props.data?.max?.[0].rarity}
                    onChange={({ min, max }) => setRangeValues(min, max)}
                    onSetRangeElement={onSetRangeElementHandler}
                    step="0.0001"
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

export default LeaderboardFiltration;
