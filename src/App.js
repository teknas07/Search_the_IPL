import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles.css";
import Team from "./Team";
import Nav from "./header";
import Home from "./Home";
import Players from "./Players";
import Match from "./Match";
export default function App() {
  return (
    <div className="App">
      <Nav />

      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/teams" component={Team} />
        <Route path="/players" component={Players} />
        <Route path="/matchs" component={Match} />
      </Switch>
    </div>
  );
}
