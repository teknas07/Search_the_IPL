import React, { useState } from "react";
// import { filterData, SearchType } from "filter-data";

// import { Multiselect } from "multiselect-react-dropdown";
import {
  Grid,
  Card,
  Image,
  Menu,
  Dropdown,
  Input,
  Flag
} from "semantic-ui-react";

import data from "./players.json";
import "./styles.css";

const country = [
  { key: "india", text: "India", value: "india" },
  { key: "england", text: "England", value: "england" },
  { key: "south africa", text: "South Africa", value: "south africa" },
  { key: "australia", text: "Australia", value: "Australia" },
  { key: "bangladesh", text: "Bangladesh", value: "bangladesh" },
  { key: "sri lanka", text: "Sri Lanka", value: "sri lanka" },
  { key: "west indies", text: "West Indies", value: "west indies" },
  { key: "new zealand", text: "New Zealand", value: "new zealand" },
  { key: "pakistan", text: "Pakistan", value: "pakistan" }
];

const batting = [
  { key: "right-hand", text: "Right-hand", value: "right-hand" },
  { key: "left-hand", text: "Left-hand", value: "left-hand" }
];

const bowling = [
  {
    key: "right-arm medium",
    text: "Right-arm medium",
    value: "right-arm medium"
  },
  { key: "right-arm fast", text: "Right-arm fast", value: "Right-arm fast" },
  {
    key: "right-arm offbreak",
    text: "Right-arm offbreak",
    value: "right-arm offbreak"
  },
  { key: "legbreak googly", text: "Legbreak googly", value: "legbreak googly" },
  { key: "left-arm medium", text: "Left-arm medium", value: "left-arm medium" },
  { key: "left-arm fast", text: "Left-arm fast", value: "left-arm fast" },
  {
    key: "left-arm orthodox",
    text: "Left-arm orthodox",
    value: "left-arm orthodox"
  }
];

export default function Players() {
  // const multiselectRef = React.createRef();
  const [searchText, setSearchText] = useState("");
  const [datas, setDatas] = useState(data);
  // const [multiDat, setMultiData] = useState([]);
  const excludeColumns = ["DOB"];

  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  // const handle = (e) => {
  // console.log(e.value);
  // multiData.push(e.value);
  // var res = multiData.flat();
  // console.log(res);

  //   var result = multiData.reduce((r, e) => (r.push(...e), r), [])
  // console.log(result);
  //  var res= e.value;
  //  console.log(res);
  //  filtered();
  //  const filtered = datas.filter(function(item) {
  //   return e.value.indexOf(item.country);
  // });
  // console.log(filtered);
  // var res = e.value;
  // res.forEach(element => {
  //   filterData(element);

  // });
  // console.log(res);
  // var words = res.map((v) => v.toLowerCase().trim());

  // console.log(words);
  // var filtered = data.filter("india");

  // console.log(filtered);
  // filterObjsInArr(data,res);
  // filteredArray(words);
  // };

  // var filteredArray = (words) => {
  // let filteredPoets = words;
  // filteredPoets = filteredPoets.filter((poet) => {
  //   // let poetName = poet.firstName.toLowerCase() + poet.lastName.toLowerCase()
  //   return data.indexOf(
  //     words) !== -1
  // })
  // setMultiData({
  //   filteredPoets
  // });
  // console.log(filteredPoets);
  // const result = data.filter((word) => !word.includes(words));
  // const result = filterData(data, words);
  // setDatas(result);
  // };

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

  const st = {
    color: "black"
  };

  return (
    <div>
      <Card centered className="search">
        <Card.Content>
          <Menu vertical className="menu">
            <Menu.Item>
              <div className="pla">
                <Dropdown
                  placeholder="Country"
                  fluid
                  multiple
                  selection
                  options={country}
                />
                <Dropdown
                  placeholder="Batting"
                  fluid
                  multiple
                  selection
                  options={batting}

                  // onChange={(e, data) => handle(data)}
                />
                <Dropdown
                  placeholder="Bowling"
                  fluid
                  multiple
                  selection
                  options={bowling}
                />
              </div>
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
      <Grid doubling stackable columns={5}>
        {datas.map((val, key) => (
          <Grid.Column>
            <div className="pys">
              <Card key={key} centered className="box">
                <Card.Content>
                  <Image
                    className="img"
                    floated="right"
                    size="mini"
                    alt="players"
                    src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                  />
                  <Card.Header style={st}>{val.Player_Name}</Card.Header>
                  <Card.Meta style={st}>
                    {val.Country} <Flag name={val.Country.toLowerCase()} />
                  </Card.Meta>
                  <hr />
                  <Card.Description style={st}>
                    Batting : <strong>{val.Batting_Hand}</strong>
                    <br />
                    Bowling : <strong>{val.Bowling_Skill}</strong>
                    <br />
                    DOB : <strong>{val.DOB}</strong>
                  </Card.Description>
                </Card.Content>
              </Card>
            </div>
          </Grid.Column>
        ))}
        ;
      </Grid>
    </div>
  );
}
