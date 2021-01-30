import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./styles.css";

export default class header extends Component {
  // state variable
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div className="header">
        <Menu inverted>
          <Menu.Menu position="right">
            {/* home */}
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                Home
              </Link>
            </Menu.Item>
            {/* teams */}
            <Menu.Item
              name="team"
              active={activeItem === "team"}
              onClick={this.handleItemClick}
            >
              <Link to="/teams" style={{ textDecoration: "none" }}>
                Teams
              </Link>
            </Menu.Item>
            {/* players */}
            <Menu.Item
              name="player"
              active={activeItem === "player"}
              onClick={this.handleItemClick}
            >
              <Link to="/players">Players</Link>
            </Menu.Item>
            {/* Matches */}
            <Menu.Item
              name="match"
              active={activeItem === "match"}
              onClick={this.handleItemClick}
            >
              <Link to="/matchs">Matches</Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
