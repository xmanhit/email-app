import underConstruction from "../../assets/under_construction.png";
import styles from "./underConstruction.module.css";

export const UnderConstruction = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={underConstruction}
        alt="Under construction"
      />
    </div>
  );
};
