import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import NotFindPage from "./pages/NotFindPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Link to={"/"}>
          <h1 className={"title"}>Redux Todo List</h1>
        </Link>

        <Switch>
          <Route exact path={"/"}>
            <HomePage />
          </Route>
          <Route path={"/users/:id/todos"}>
            <TodosPage />
          </Route>
          <Route path={"/"}>
            <NotFindPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
