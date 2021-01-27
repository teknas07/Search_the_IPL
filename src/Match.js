import React, { useState } from "react";
import {
  Grid,
  Card,
  Divider,
  Label,
  Image,
  Segment,
  Header,
  GridColumn,
  Menu,
  Input,
  Dropdown
} from "semantic-ui-react";

import data from "./Matchs.json";
import "./styles.css";

const season = [
  { key: "ipl2018", text: "IPL-2018", value: "IPL-2018" },
  { key: "ipl2019", text: "IPL-2019", value: "IPL-2019" }
];

const city = [
  { key: "mumbai", text: "Mumbai", value: "mumbai" },
  { key: "chennai", text: "Chennai", value: "chennai" },
  { key: "mohali", text: "Mohali", value: "mohali" },
  { key: "kolkata", text: "Kolkata", value: "kolkata" },
  { key: "hyderabad", text: "Hyderabad", value: "hyderabad" },
  { key: "jaipur", text: "Jaipur", value: "jaipur" },
  { key: "bengaluru", text: "Bengaluru", value: "bengaluru" },
  { key: "pune", text: "Pune", value: "pune" },
  { key: "delhi", text: "Delhi", value: "delhi" },
  { key: "indore", text: "Indore", value: "indore" },
  { key: "visakhapatnam", text: "Visakhapatnam", value: "visakhapatnam" }
];

const venue = [
  {
    key: "wankhede stadium",
    text: "Wankhede Stadium",
    value: "Wankhede Stadium"
  },
  {
    key: "ma chidambaram stadium",
    text: "MA Chidambaram Stadium",
    value: "MA Chidambaram Stadium"
  },
  {
    key: "punjab cricket assoc stadium",
    text: "Punjab Cricket Assoc Stadium",
    value: "Punjab Cricket Assoc Stadium"
  },
  { key: "eden gardens", text: "Eden Gardens", value: "Eden Gardens" },
  {
    key: "rajiv gandhi intl stadium",
    text: "Rajiv Gandhi Intl Stadium",
    value: "Rajiv Gandhi Intl Stadium"
  },
  {
    key: "sawai mansingh stadium",
    text: "Sawai Mansingh Stadium",
    value: "Sawai Mansingh Stadium"
  },
  {
    key: "m chinnaswamy stadium",
    text: "M Chinnaswamy Stadium",
    value: "M Chinnaswamy Stadium"
  },
  {
    key: "maharashtra cricket assoc",
    text: "Maharashtra Cricket Assoc",
    value: "Maharashtra Cricket Assoc"
  },
  {
    key: "feroz shah kotla",
    text: "Feroz Shah Kotla",
    value: "Feroz Shah Kotla"
  },
  {
    key: "holkar cricket stadium",
    text: "Holkar Cricket Stadium",
    value: "Holkar Cricket Stadium"
  },
  {
    key: "aca-vdca stadium",
    text: "ACA-VDCA Stadium",
    value: "ACA-VDCA Stadium"
  }
];

export default function Match() {
  const [searchText, setSearchText] = useState("");
  const [datas, setDatas] = useState(data);
  // const [multiData, setMultiData] = useState("");
  // var multiData = []
  const excludeColumns = ["team1", "team2", "winner"];

  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  const handle = (e) => {
    console.log(e.value);
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

  const venue1 = {
    color: "red"
  };

  return (
    <div>
      <Card centered className="search">
        <Card.Content>
          <Menu vertical className="menu">
            <Menu.Item>
              <Dropdown
                placeholder="IPL Seasons"
                fluid
                multiple
                selection
                options={season}
                // onChange={(e, data) => handle(data)}
              />
              <Dropdown
                placeholder="City"
                fluid
                multiple
                selection
                options={city}
              />
              <Dropdown
                placeholder="Venue"
                fluid
                multiple
                selection
                options={venue}
              />
            </Menu.Item>
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
      <Grid doubling stackable columns={3}>
        {datas.map((val, key) => (
          <GridColumn key={key}>
            <div className="psd">
              <Segment className="seg">
                <Label as="a" color="red" ribbon>
                  {val.Season}
                </Label>
                <div className="l2">
                  <Label className="date1" attached="top right">
                    {val.date}
                  </Label>
                </div>
                <Card centered className="titl">
                  <Card.Content className="matcht">
                    <Image
                      floated="left"
                      size="tiny"
                      src={val.team1}
                      circular
                      alt="team logo"
                    />
                    <Divider vertical>VS</Divider>
                    <Image
                      floated="right"
                      size="tiny"
                      src={val.team2}
                      circular
                      alt="team logo"
                    />
                  </Card.Content>
                </Card>
                <Card centered className="venue">
                  <Card.Content>
                    <Header style={venue1} as="h3" textAlign="center">
                      {val.venue}
                    </Header>
                  </Card.Content>
                </Card>
                <Card className="des" centered>
                  <Card.Content>
                    <Card.Description className="dest">
                      City : <strong>{val.city}</strong>
                      <hr />
                      Umpire-1 : <strong>{val.umpire1}</strong>
                      <br />
                      Umpire-2 : <strong>{val.umpire2}</strong>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Segment>
            </div>
          </GridColumn>
        ))}
        ;
      </Grid>
    </div>
  );
}
