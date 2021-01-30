import React, { useState } from "react";
import { Grid, Card, Menu, Input, Message } from "semantic-ui-react";

import data from "./data/teams.json";
import "./styles.css";

export default function Team() {
  // State variable for Single Search
  const [searchText, setSearchText] = useState("");
  // State variable for data
  const [datas, setDatas] = useState(data);

  //attributes for exclude from search result
  const excludeColumns = [""];

  //Handle single search
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  // filter single search value
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setDatas(data);
    else {
      const filteredData = data.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setDatas(filteredData);
    }
  };

  return (
    <div className="team">
      <Card centered className="search">
        <Card.Content>
          {/* multi-search dropdown */}
          <Menu vertical className="menu">
            <Menu.Item position="right">
              <Input
                className="icon"
                icon="search"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => handleChange(e.target.value)}
              />
            </Menu.Item>
          </Menu>
        </Card.Content>
      </Card>
      {/* displays filter or non-filter data  */}
      <Grid doubling stackable columns={4}>
        {datas.map((val, key) => (
          <Grid.Column>
            <Card.Group centered>
              <Card
                className="teams"
                key={key}
                color={val.color}
                image={val.image}
                header={val.team1}
              />
            </Card.Group>
          </Grid.Column>
        ))}
        ;
      </Grid>
      {/* display data not found message */}
      <div className="notf">
        {datas.length === 0 && (
          <Card centered className="notfound">
            <Card.Content>
              <Message warning compact centered>
                <Message.Header>Sorry,entered data not found :)</Message.Header>
                <p>Try again</p>
              </Message>
            </Card.Content>
          </Card>
        )}
      </div>
    </div>
  );
}
