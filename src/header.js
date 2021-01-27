import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./styles.css";

export default class header extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div className="header">
        <Menu inverted>
          <Menu.Menu position="right">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                Home
              </Link>
            </Menu.Item>

            <Menu.Item
              name="inbox"
              active={activeItem === "inbox"}
              onClick={this.handleItemClick}
            >
              <Link to="/teams" style={{ textDecoration: "none" }}>
                Teams
              </Link>
            </Menu.Item>

            <Menu.Item
              name="spam"
              active={activeItem === "spam"}
              onClick={this.handleItemClick}
            >
              <Link to="/players">Players</Link>
            </Menu.Item>
            <Menu.Item
              name="updates"
              active={activeItem === "updates"}
              onClick={this.handleItemClick}
            >
              <Link to="/matchs">Matches</Link>
              {/* <a href="/matchs">Matches</a> */}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
