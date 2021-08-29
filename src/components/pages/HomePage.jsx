import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../redux/features/usersReducer";
import styles from "./HomePage.module.css";


const HomePage = () => {
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const usersMap = users.map((e) => {
    return (
      <li className={styles.item} key={e.id}>
        <Link to={`/users/${e.id}/todos`}>{e.name}</Link>
      </li>
    );
  });

  if (loading) return <div>Идет загрузка...</div>;

  return (
    <div>
      <div className={styles.title}>Список пользователей: </div>
      <ul  className={`${styles.usersList}`}>{usersMap}</ul>
    </div>
  );
};

export default HomePage;
