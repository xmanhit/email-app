import { useMemo } from "react";
import { NavLink } from "react-router-dom";

const Folder = ({ styles, pathname, folders }) => {
  return (
    <div className={styles.wrapperFolder}>
      {pathname.indexOf("email") > -1 ? (
        folders.map((folder) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            key={folder}
            to={`email/${folder}`}
          >
            {folder}
          </NavLink>
        ))
      ) : (
        <p className={styles.contruction}>Construction</p>
      )}
    </div>
  );
};

export default Folder;
