import { useEffect, useState } from "react";
import { NavLink, Outlet, useRouteLoaderData } from "react-router-dom";
import Message from "../../utils/message";
import formatDate from "../../utils/formatDate";
import styles from "./summaryMessage.module.css";

export function summaryMessageLoader({ params }) {
  return params;
}

export function SummaryMessagePage() {
  const [summaryEmails, setSummaryEmails] = useState([]);
  const folder = useRouteLoaderData("folder").folder;
  const currentUserEmail = useRouteLoaderData("root").email;

  useEffect(() => {
    if (folder && currentUserEmail) {
      const newSummaryEmails = new Message(currentUserEmail).foldersMessages[
        folder
      ];
      if (!newSummaryEmails) {
        throw new Response("Not Found", { status: 404 });
      }
      setSummaryEmails(newSummaryEmails);
    }
  }, [folder, currentUserEmail]);

  const markMessageAsRead = (emailId) => {
    const newSummaryEmails = [...summaryEmails];
    const summaryEmailIndex = newSummaryEmails.findIndex(
      ({ id, unread }) => id === emailId && unread
    );

    if (summaryEmailIndex > -1) {
      newSummaryEmails[summaryEmailIndex].unread = false;
      setSummaryEmails(newSummaryEmails);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.summaryEmails}>
            <div>
              {summaryEmails.map(
                ({
                  id,
                  unread,
                  from: { name, avatarUrl },
                  timestamp,
                  main: { title, content },
                }) => {
                  return (
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.summaryEmail} ${styles.active}`
                          : unread
                          ? `${styles.summaryEmail} ${styles.unread}`
                          : styles.summaryEmail
                      }
                      key={id}
                      to={id}
                      onClick={() => {
                        markMessageAsRead(id);
                      }}
                    >
                      <div
                        className={styles.avatar}
                        style={{
                          background: `url(${avatarUrl}) center center / cover no-repeat rgb(238, 238, 238)`,
                        }}
                      />
                      <div className={styles.wrapper}>
                        <div className={styles.info}>
                          <p>{name}</p>
                          <p>{formatDate(timestamp)}</p>
                        </div>
                        <div>
                          <h6 className={styles.title}>{title}</h6>
                        </div>
                        <div>
                          <p className={styles.content}>{content}</p>
                        </div>
                      </div>
                    </NavLink>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
