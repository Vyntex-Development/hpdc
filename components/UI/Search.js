import SearchSvg from "../../assets/images/SearchSvg";
import classes from "./Search.module.css";
import { useState } from "react";
const Search = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${classes.Search} ${open ? classes.Open : ""}`}>
      {open && (
        <input
          type="text"
          placeholder="Search by # Number
"
        />
      )}
      <SearchSvg
        onOpen={() => {
          setOpen(!open);
        }}
      />
    </div>
  );
};

export default Search;
