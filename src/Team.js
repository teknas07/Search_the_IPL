import React, { useState } from "react";
import { Grid, Card, Menu, Input } from "semantic-ui-react";

import data from "./teams.json";
import "./styles.css";

export default function Team() {
  const [searchText, setSearchText] = useState("");
  const [datas, setDatas] = useState(data);

  const excludeColumns = [""];

  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

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
    </div>
  );
}
