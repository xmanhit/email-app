import {
  NavLink,
  Outlet,
  redirect,
  useFetcher,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { fakeAuthProvider } from "../../utils/auth";
import User from "../../utils/user";
import Message from "../../utils/message";
import Folder from "../../components/Folder";
import styles from "./main.module.css";
import connectLogoWhite from "../../assets/connect_logo_white.svg";
import { ReactComponent as HomeIcon } from "../../assets/home_icon.svg";
import { ReactComponent as EmailIcon } from "../../assets/email_icon.svg";
import { ReactComponent as ContactIcon } from "../../assets/contact_icon.svg";
import { ReactComponent as LogoutIcon } from "../../assets/logout_icon.svg";

export function mainLoader() {
  if (!fakeAuthProvider.isAuthenticated) {
    return redirect("/login");
  }
  return null;
}

export function MainPage() {
  const { email } = useRouteLoaderData("root");
  const [folders, setFolders] = useState([]);
  const [info, setInfo] = useState({});
  const { pathname } = useLocation();

  useEffect(() => {
    if (email) {
      const allFolders = new Message(email).getFolders;
      setFolders(allFolders);
      setInfo(User.getUserInfo(email));
    }
  }, [email]);

  let fetcher = useFetcher();
  let isLoggingOut = fetcher.formData != null;
  let { name, avatarUrl } = info;

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.wrapperNavbar}>
          <div className={styles.breadcrumb}>
            Pathname: <span className={styles.pathname}>{pathname}</span>
          </div>
          <div className={styles.user}>
            <div className={styles.wrapperUser}>
              <h6 className={styles.name}>{name}</h6>
              <p className={styles.email}>{email}</p>
            </div>
            <div>
              <div
                className={styles.avatar}
                style={{
                  background: `url(${avatarUrl}) center center / cover no-repeat rgb(238, 238, 238)`,
                }}
              ></div>
            </div>
            <fetcher.Form method="post" action="/logout">
              <button
                title="Logout"
                className={styles.logout}
                type="submit"
                disabled={isLoggingOut}
              >
                <LogoutIcon className={styles.icon} />
              </button>
            </fetcher.Form>
          </div>
        </div>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.wrapperLogo}>
          <img className={styles.logo} src={connectLogoWhite} alt="logo" />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.wrapperIcon}>
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <HomeIcon className={styles.icon} style={{ width: "1.125em" }} />
            </NavLink>
            <NavLink
              to="email"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <EmailIcon className={styles.icon} />
            </NavLink>
            <NavLink
              to="contact"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <ContactIcon className={styles.icon} />
            </NavLink>
          </div>
          <Folder styles={styles} pathname={pathname} folders={folders} />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
