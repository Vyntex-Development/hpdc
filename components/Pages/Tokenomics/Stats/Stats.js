import Dropdown from "../../../UI/Dropdown";
import classes from "./Stats.module.css";
import { useState } from "react";
import ChartSvg from "../../../../assets/images/ChartSvg";

const Stats = ({ tokenomics }) => {
  console.log(tokenomics);
  const { title, description, dropdown: dropdowns } = tokenomics;
  const [active, setActive] = useState(1);

  const setActiveHandler = (_, id) => {
    setActive(id);
  };

  return (
    <div className={`${classes.StatsWrapper} container`}>
      <div className={classes.Stats}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={classes.DropdownsWrapper}>
          {dropdowns.map((dd) => {
            return (
              <Dropdown
                id={dd.id}
                key={dd.id}
                color={dd.color}
                dropdownText={dd.title}
                panelText={dd.description}
                onActive={setActiveHandler}
                active={active}
              />
            );
          })}
        </div>
      </div>
      <div className={classes.Chart}>
        <div>
          <ChartSvg active={active} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
