import classes from "./Collection.module.css";
import CollectionSlider from "../../../UI/CollectionSlider";

const Collection = ({ diamonds }) => {
  return (
    <div className={`container collection ${classes.Collection}`}>
      <div>
        <h2>Explore Collection</h2>
      </div>
      <CollectionSlider diamonds={diamonds} />
    </div>
  );
};

export default Collection;
