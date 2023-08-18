import { Outlet } from "react-router-dom";
import styles from "./email.module.css";

export const EmailPage = () => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  </div>
);
