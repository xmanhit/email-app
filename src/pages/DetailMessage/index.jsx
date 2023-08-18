import { useState, useEffect } from "react";
import { useRouteLoaderData } from "react-router-dom";
import Message from "../../utils/message";
import styles from "./detailMessage.module.css";
import formatDate from "../../utils/formatDate";

export const detailMessageLoader = ({ params }) => {
  return params;
};

export const DetailMessagePage = () => {
  const currentUserEmail = useRouteLoaderData("root").email;
  const { folder, id } = useRouteLoaderData("detail");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (folder && id && currentUserEmail) {
      const foundMessage = new Message(currentUserEmail).getMessage(id);
      if (foundMessage) {
        setMessage(foundMessage);
      }
    }
  }, [id, currentUserEmail]);

  if (!message) {
    return <div>No message found</div>;
  }

  const {
    from: { name, avatarUrl, email },
    timestamp,
    main: { title, content },
  } = message;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.row}>
            <div className={styles.colLeft}>
              <div
                className={styles.avatar}
                style={{
                  background: `url(${avatarUrl}) center center / cover no-repeat rgb(238, 238, 238)`,
                }}
              />
              <div className={styles.info}>
                <h6 className={styles.name}>{name}</h6>
                <p className={styles.message}>{email}</p>
              </div>
            </div>
            <div className={styles.colRight}>
              <p className={styles.time}>
                {formatDate(timestamp, "vi-VN", true)}
              </p>
              <div className={styles.actions}>
                <button className={styles.reply}>Reply</button>
                <button className={styles.forward}>Forward</button>
                <button className={styles.delete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </div>
  );
};
