import Hero from "../../Layout/Hero/Hero";
import { useEffect, useState } from "react";
import LeaderboardFiltration from "./Filtration/LeaderboardFiltration";

const LeaderboardPage = ({ data, slices }) => {
  const { title, description, image } = slices[0];

  // console.log(pageData);
  const [diamonds, setDiamonds] = useState([]);
  const [currentType, setCurrentType] = useState("most");
  const [reset, resetValues] = useState(false);
  const [range, setRange] = useState({});
  const [timer, setTimer] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [alreadyFiltered, setAlreadyFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialCount, setInitialCount] = useState(null);
  const [count, setCount] = useState(null);
  const [query, setQuery] = useState(null);
  const [type, setType] = useState("");
  const [maxRarity, setMaxRarity] = useState(null);
  const [minRarity, setMinRarity] = useState(null);

  const fetchData = async (values) => {
    if (!values) return;

    let query = "diamonds?_where";
    let countQuery = "diamonds/count?_where";

    Object.entries(values).forEach(([key, value], index) => {
      if (!value) return;
      query =
        index >= 1
          ? query + `&[${key}]=${value}`
          : query + `[0][${key}]=${value}`;
      countQuery =
        index >= 1
          ? countQuery + `&[${key}]=${value}`
          : countQuery + `[0][${key}]=${value}`;
    });

    try {
      let url1 = `https://strapi-ranger-h7d5y.ondigitalocean.app/${query}&_sort=rarity:${
        type ? type : "DESC"
      },id:ASC&_limit=12`;
      let url2 = `https://strapi-ranger-h7d5y.ondigitalocean.app/${countQuery}&_sort=rarity:${
        type ? type : "DESC"
      }`;

      console.log(url2);

      let [res1, res2] = await Promise.all([
        fetch(url1).then((response) => response.json()),
        fetch(url2).then((response) => response.json()),
      ]);

      setCount(res2);
      setDiamonds(res1);
    } catch (err) {
      console.log(err);
    }

    setQuery(query);
    resetValues(false);
  };

  useEffect(() => {
    setDiamonds(data.diamonds);
    setCount(data.count);
    setInitialCount(data.count);
    setIsLoading(false);
    setMaxRarity(data.max?.[0].rarity);
    setMinRarity(data.min?.[0].rarity);
  }, []);

  const getResponse = async () => {
    let resp = await fetch(
      `https://strapi-ranger-h7d5y.ondigitalocean.app/${
        query ? query : "diamonds?"
      }&_start=${diamonds.length}&_sort=rarity:${
        type ? type : "DESC"
      },id:ASC&_limit=9`
    );

    return resp;
  };

  const getMoreDiamondsHandler = async () => {
    const resp = await getResponse();
    const data = await resp.json();
    setDiamonds([...diamonds, ...data]);
  };

  const sortDiamonds = async (type) => {
    if (type === currentType) return;

    const res = await fetch(
      `https://strapi-ranger-h7d5y.ondigitalocean.app/${
        query ? query : "diamonds?"
      }&_sort=rarity:${type}&_limit=9`
    );

    const data = await res.json();
    setType(type);
    setDiamonds([...data]);
  };

  const modifyRange = (val, type) => {
    let modifiedRange = { ...range };

    if (type === "from") {
      modifiedRange = {
        ...modifiedRange,
        rarity_gte: val,
      };
    } else {
      modifiedRange = {
        ...modifiedRange,
        rarity_lte: val,
      };
    }
    setRange(modifiedRange);
    return modifiedRange;
  };

  const inputSingleAPICall = (val, type) => {
    if (val.trim() === "" && type === "from") {
      return;
    }

    if (type === "id") {
      fetchData({ id: val });
      return;
    }

    let range = modifyRange(val, type);
    const isLte = !!range.rarity_lte;

    if (range.rarity_gte && isLte) {
      if (range.rarity_lte <= range.rarity_gte) {
        return;
      }
    }

    if (!alreadyFiltered) {
      setAlreadyFiltered(true);
    }
    fetchData(range);
  };

  const inputChangedHandler = (e, type) => {
    if (type === "id") {
      resetValues(true);
    }
    setInputValue(e.target.value);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      inputSingleAPICall(e.target.value, type);
    }, 1000);
    setTimer(newTimer);
  };

  const setCurrentValueHadler = (ev, rangeType) => {
    let range = modifyRange(ev.target.value, rangeType);

    if (alreadyFiltered) {
      let toReset = Object.entries(range).every(([_, values]) => {
        return values.trim() === "";
      });

      if (toReset) {
        const fetchInitialData = async () => {
          const res = await fetch(
            `https://strapi-ranger-h7d5y.ondigitalocean.app/diamonds?_sort=rarity:${type}&_limit=9`
          );
          const data = await res.json();
          setDiamonds([...data]);
          setCount(initialCount);
          setQuery(null);
        };

        fetchInitialData();
      } else {
        let includesKey = Object.keys(range).includes("rarity_lte");
        let isEmpty = range["rarity_lte"] === "";
        if (includesKey && isEmpty) {
          let rangeVal = `diamonds?_where[0][rarity_gte]=${+range[
            "rarity_gte"
          ]}`;
          const fetchDataWithFirstField = async () => {
            const res = await fetch(
              `https://strapi-ranger-h7d5y.ondigitalocean.app/${rangeVal}&_sort=rarity:${type}&_limit=9`
            );
            const res2 = await fetch(
              `https://strapi-ranger-h7d5y.ondigitalocean.app/${rangeVal}&_sort=rarity:${type}`
            );
            const data = await res.json();
            const data2 = await res2.json();
            setDiamonds([...data]);
            setCount(data2.length);
            setQuery(rangeVal);
          };
          fetchDataWithFirstField();
        }
      }
    }
  };

  return (
    <>
      <Hero
        title={title}
        description={description}
        image={image.data.attributes.url}
        page="leaderboard"
      ></Hero>
      <LeaderboardFiltration
        data={data}
        diamonds={diamonds}
        onSort={sortDiamonds}
        inputChangedHandler={inputChangedHandler}
        isLoading={isLoading}
        onGetMoreDiamonds={getMoreDiamondsHandler}
        count={count}
        min={minRarity}
        max={maxRarity}
        reset={reset}
        setCurrentValue={setCurrentValueHadler}
      />
    </>
  );
};

export default LeaderboardPage;
