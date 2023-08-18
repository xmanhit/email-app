import { useRouteError } from "react-router-dom";
import styles from "./error.module.css";

export function RootErrorBoundary() {
  let error = useRouteError();
  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <div className={styles.box}></div>
        <h3 className={styles.title}>ERROR {error?.status || 500}</h3>
        <p className={styles.message}>{error?.statusText}</p>
        {error?.data?.message && (
          <p className={styles.message}>{error.data.message}</p>
        )}
        <p className={styles.message}>
          Things are a little <span className={styles.unstable}>unstable</span>{" "}
          here
        </p>
        <p className={styles.message}>I suggest come back later</p>
      </div>
    </div>
  );
}
