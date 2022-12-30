import Hero from "../../Layout/Hero/Hero";
import HeroLayer from "../../../assets/images/hero-multiple-pages.png";
import { useEffect, useState } from "react";
import GalleryFiltration from "./Filtration/GalleryFiltration";

const GalleryPage = ({ data, slices }) => {
  const { title, description, image } = slices[0];

  const [diamonds, setDiamonds] = useState([]);
  const [query, setQuery] = useState(null);
  const [reset, resetValues] = useState(false);
  const [count, setCount] = useState(null);
  const [initialCount, setInitialCount] = useState(null);
  const [initial, setInitial] = useState(true);
  const [filteredData, setFilteredData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (values) => {
    console.log(values);

    if (!values) return;

    let query = "diamonds?_where";

    Object.entries(values).forEach(([key, value], index) => {
      let oKey = key;
      if (value.type) {
        Object.entries(value).forEach(([objKey, val], index) => {
          if (objKey === "type") {
            return;
          }
          query =
            index >= 1
              ? query + `&[${objKey}]=${val}`
              : query + `&[${objKey}]=${val}`;
        });
      } else {
        if (key !== "id") {
          Object.entries(value).forEach(([_, val], i) => {
            if (i !== 0) {
              query = query + `&_where[${oKey}]=${val}`;
              return;
            }

            if (index !== 0) {
              query = query + `&_where[${oKey}]=${val}`;
              return;
            }
            query = query + `[${oKey}]=${val}`;
          });
        } else {
          query =
            index >= 1
              ? query + `&[${key}]=${value}`
              : query + `[0][${key}]=${value}`;
        }
      }
    });

    const response = await fetch(
      `https://strapi-ranger-h7d5y.ondigitalocean.app/${query}&_limit=6`
    );
    // const allDiamonds = await fetch(
    //   `https://strapi-ranger-h7d5y.ondigitalocean.app/${query}`
    // );
    if (!response.ok) {
      console.log("error");
    }
    const data = await response.json();
    const totalCount = count + 6;
    setQuery(query);
    setDiamonds(data);
    if (data.length === 0) {
      resetValues(true);
      setFilteredData({});
    }
    setCount(totalCount);
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
        query ? query : "diamonds?_sort=id:ASC&"
      }&_start=${diamonds.length}&_limit=6`
    );

    const data = await resp.json();
    setDiamonds([...diamonds, ...data]);
  };

  useEffect(() => {
    setInitial(true);
    // setSpinnerIsVisible(props.diamonds.length >= props.count ? false : true);
  }, [initial]);

  const hasWhiteSpace = (s) => {
    return s.indexOf(" ") >= 0;
  };

  const setFilterValues = (val, name) => {
    if (hasWhiteSpace(name)) {
      name = name.split(" ").join("_");
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

    fetchData(modifiedFilterData);
  };

  const inputSingleAPICall = (val, name = false) => {
    if (name) {
      console.log(val);
      let splittedValues = val.split("-");
      if (name === "rarity") {
        val = {
          type: "range",
          [`${name}_gte`]: splittedValues[0],
          [`${name}_lte`]: splittedValues[1],
        };
      } else {
        val = {
          type: "range",
          [`${name}_from_gte`]: splittedValues[0],
          [`${name}_to_lte`]: splittedValues[1],
        };
      }

      let modifiedFilterData = { ...filteredData, [name]: val };
      setFilteredData(modifiedFilterData);
      fetchData(modifiedFilterData);
      return;
    }

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

  const setRangeValuesHandler = (value, filterName) => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      inputSingleAPICall(value, filterName);
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
          `https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds?_sort=id:ASC&_limit=6`
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
        title={title}
        description={description}
        image={image.data.attributes.url}
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
        setRangeValues={setRangeValuesHandler}
        count={count}
        query={query}
      />
    </>
  );
};

export default GalleryPage;
