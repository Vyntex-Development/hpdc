import Hero from "../../Layout/Hero/Hero";
import HeroLayer from "../../../assets/images/hero-multiple-pages.png";
import { useEffect, useState } from "react";
import GalleryFiltration from "./Filtration/GalleryFiltration";

const GalleryPage = ({ data }) => {
  const [diamonds, setDiamonds] = useState([]);
  const [query, setQuery] = useState(null);
  const [reset, resetValues] = useState(false);
  const [count, setCount] = useState(null);
  const [initialCount, setInitialCount] = useState(null);
  // const [mobileDataForFetching, setMobileDataForFetching] = useState(null);
  const [filteredData, setFilteredData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (values) => {
    if (!values) return;

    let query = "diamonds?_where";

    Object.entries(values).forEach(([key, value], index) => {
      if (value.type) {
        Object.entries(value).forEach(([key, val], index) => {
          if (key === "type") {
            return;
          }
          query =
            index >= 1
              ? query + `&[${key}]=${val}`
              : query + `&[${key}]=${val}`;
        });
      } else {
        query =
          index >= 1
            ? query + `&[${key}]=${value}`
            : query + `[0][${key}]=${value}`;
      }
    });

    const response = await fetch(
      `https://strapi-ranger-h7d5y.ondigitalocean.app/${query}&_limit=6`
    );
    const allDiamonds = await fetch(
      `https://strapi-ranger-h7d5y.ondigitalocean.app/${query}`
    );
    if (!response.ok || !allDiamonds.ok) {
      console.log("error");
    }
    const data = await response.json();
    console.log(data);
    const totalCount = await allDiamonds.json();
    setQuery(query);
    setDiamonds(data);
    setCount(totalCount.length);
    // setMobileDataForFetching(null);
  };

  useEffect(() => {
    setDiamonds(data.diamonds);
    setCount(data.count);
    setInitialCount(data.count);
    setIsLoading(false);
  }, []);

  const getMoreDiamondsHandler = async () => {
    if (count === 1) {
      return;
    }

    let resp = await fetch(
      `https://strapi-ranger-h7d5y.ondigitalocean.app/${
        query ? query : "diamonds?"
      }&_start=${diamonds.length}&_limit=6`
    );

    console.log(
      `https://strapi-ranger-h7d5y.ondigitalocean.app/${
        query ? query : "diamonds?"
      }&_start=${diamonds.length}&_limit=6`
    );

    const data = await resp.json();
    setDiamonds([...diamonds, ...data]);
  };

  // const storeDataOnMobileDEvice = (mobileData) => {
  //   if (mobileData) {
  //     setMobileDataForFetching(mobileData);
  //   }
  // };

  const hasWhiteSpace = (s) => {
    return s.indexOf(" ") >= 0;
  };

  const setFilterValues = (val, name) => {
    // console.log(val, name);
    if (hasWhiteSpace(name)) {
      name = name.split(" ").join("_");
    }
    if (name === "subcolor") {
      name = "sub_color";
    }
    if (val.includes("-")) {
      let splittedValues = val.split(" - ");
      val = {
        type: "range",
        [`${name}_from_gte`]: splittedValues[0],
        [`${name}_to_lte`]: splittedValues[1],
      };
      // }
    }

    let modifiedFilterData = { ...filteredData };
    if (modifiedFilterData.hasOwnProperty([name])) {
      if (modifiedFilterData[name].some((v) => val === v)) {
        modifiedFilterData[name].splice(
          modifiedFilterData[name].indexOf(val),
          1
        );
      } else {
        modifiedFilterData[name].push(val);
      }
    } else {
      modifiedFilterData[name] = [val];
    }

    setFilteredData(modifiedFilterData);

    // if (device === "desktop") {
    fetchData(modifiedFilterData);
    // } else {
    // storeDataOnMobileDEvice(modifiedFilterData);
    // }
  };

  // const apply = () => {
  //   fetchData(mobileDataForFetching);
  // };

  const inputSingleAPICall = (val) => {
    if (val.trim() === "") {
      return;
    }
    let modifiedFilterData = { ...filteredData };
    modifiedFilterData = { id: val };
    setFilteredData(modifiedFilterData);
    fetchData(modifiedFilterData);
    resetValues(false);
    setCount(1);
  };

  const inputChangedHandler = (e) => {
    setInputValue(e.target.value);
    resetValues(true);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      inputSingleAPICall(e.target.value);
    }, 1000);
    setTimer(newTimer);
  };

  const setCurrentValue = (ev) => {
    setCount(1);
    setFilteredData({
      id: ev.target.value,
    });

    if (ev.target.value.trim() === "") {
      getMoreDiamondsHandler(true);
      setFilteredData({});
      resetValues(true);
      setCount(initialCount);

      const fetchAll = async () => {
        setQuery(null);

        let resp = await fetch(
          `https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds?_limit=6`
        );
        const data = await resp.json();

        if (data) {
          setDiamonds([...data]);
        }
        resetValues(false);
      };

      fetchAll();
    }
  };

  return (
    <>
      <Hero
        title="DIAMONDS GALLERY"
        description="A collection of 10,000 unique algorithmically generated digital diamonds stored on the Solana blockchain."
        image={HeroLayer.src}
        page="gallery"
      ></Hero>
      <GalleryFiltration
        data={data}
        diamonds={diamonds}
        fetchData={(data) => fetchData(data)}
        setFilterValues={(val, name) => setFilterValues(val, name)}
        inputChangedHandler={inputChangedHandler}
        value={inputValue}
        setCurrentValue={setCurrentValue}
        reset={reset}
        isLoading={isLoading}
        onGetMoreDiamonds={getMoreDiamondsHandler}
        count={count}
      />
    </>
  );
};

export default GalleryPage;
