import React, { useState } from "react";
import {
  Grid,
  Card,
  Image,
  Menu,
  Dropdown,
  Input,
  Flag,
  Message
} from "semantic-ui-react";

import data1 from "../data/players.json";
import "./styles.css";

//country dropdown options
const country = [
  { key: "india", text: "India", value: "India" },
  { key: "england", text: "England", value: "England" },
  { key: "south africa", text: "South Africa", value: "South Africa" },
  { key: "australia", text: "Australia", value: "Australia" },
  { key: "bangladesh", text: "Bangladesh", value: "Bangladesh" },
  { key: "sri lanka", text: "Sri Lanka", value: "Sri Lanka" },
  { key: "west indies", text: "West Indies", value: "West Indies" },
  { key: "new zealand", text: "New Zealand", value: "New Zealand" },
  { key: "pakistan", text: "Pakistan", value: "Pakistan" }
];

//batting dropdown options
const batting = [
  { key: "right-hand", text: "Right-hand", value: "Right-hand" },
  { key: "left-hand", text: "Left-hand", value: "Left-hand" }
];

//bowling dropdown options
const bowling = [
  {
    key: "right-arm medium",
    text: "Right-arm medium",
    value: "Right-arm medium"
  },
  { key: "right-arm fast", text: "Right-arm fast", value: "Right-arm fast" },
  {
    key: "right-arm offbreak",
    text: "Right-arm offbreak",
    value: "Right-arm offbreak"
  },
  { key: "legbreak googly", text: "Legbreak googly", value: "Legbreak googly" },
  { key: "left-arm medium", text: "Left-arm medium", value: "Left-arm medium" },
  { key: "left-arm fast", text: "Left-arm fast", value: "Left-arm fast" },
  {
    key: "left-arm orthodox",
    text: "Left-arm orthodox",
    value: "Left-arm orthodox"
  }
];

export default function Players() {
  // State variable for Single Search
  const [searchText, setSearchText] = useState("");
  // State  variable for data
  const [datas, setDatas] = useState(data1);
  // State  variable  for country multi-search
  const [multiDat, setMultiData] = useState([]);
  // State  variable  for bat multi-search
  const [multibat, setMultibat] = useState([]);
  // State  variable  for bowl multi-search
  const [multibowl, setMultibowl] = useState([]);

  //attributes for exclude from search result
  const excludeColumns = ["DOB"];

  //Handle single search
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  // handle bowl search
  const handlebowl = (data) => {
    const bowl = data.value;
    //set state
    setMultibowl(data.value);
    //filter data based on bat only
    if (multiDat.length === 0 && multibat.length !== 0 && bowl.length === 0) {
      filt(multibat);
    }
    //display non-filter data
    else if (multiDat.length <= 0 && multibat.length <= 0 && bowl.length <= 0) {
      setDatas(data1);
    }
    //filter data based on both country and bowl
    else if (multiDat.length > 0 && multibat.length <= 0 && bowl.length > 0) {
      filtbowl(multiDat, bowl);
    }
    //filter data based on both country and bat
    else if (multiDat.length > 0 && multibat.length > 0 && bowl.length <= 0) {
      filtbat(multiDat, multibat);
    }
    //filter data based on both bat and bowl
    else if (multiDat.length <= 0 && multibat.length > 0 && bowl.length > 0) {
      filtbowlb(multibat, bowl);
    }
    //filter data based on country only
    else if (multiDat.length > 0 && multibat.length <= 0 && bowl.length <= 0) {
      filt(multiDat);
    }
    //filter data based on all the attributes
    else if (multiDat.length > 0 && multibat.length > 0 && bowl.length > 0) {
      filtbowlc(multiDat, multibat, bowl);
    }
    //filter data based on bowl only
    else if (multiDat.length <= 0 && multibat.length <= 0 && bowl.length > 0) {
      filt(bowl);
    }
  };

  // handle bat search
  const handlebat = (data) => {
    const bat = data.value;
    //set state
    setMultibat(data.value);
    //filter data based on bat only
    if (multiDat.length === 0 && bat.length !== 0 && multibowl.length === 0) {
      filt(bat);
    }
    //display non-filter data
    else if (multiDat.length <= 0 && bat.length <= 0 && multibowl.length <= 0) {
      setDatas(data1);
    }
    //filter data based on both country and bowl
    else if (multiDat.length > 0 && bat.length <= 0 && multibowl.length > 0) {
      filtbowl(multiDat, multibowl);
    }
    //filter data based on both country and bat
    else if (multiDat.length > 0 && bat.length > 0 && multibowl.length <= 0) {
      filtbat(multiDat, bat);
    }
    //filter data based on both bat and bowl
    else if (multiDat.length <= 0 && bat.length > 0 && multibowl.length > 0) {
      filtbowlb(bat, multibowl);
    }
    //filter data based on country only
    else if (multiDat.length > 0 && bat.length <= 0 && multibowl.length <= 0) {
      filt(multiDat);
    }
    //filter data based on all the attributes
    else if (multiDat.length > 0 && bat.length > 0 && multibowl.length > 0) {
      filtbowlc(multiDat, bat, multibowl);
    }
    //filter data based on bowl only
    else if (multiDat.length <= 0 && bat.length <= 0 && multibowl.length > 0) {
      filt(multibowl);
    }
  };

  // handle country search
  const handle = (data) => {
    const cot = data.value;
    //set state
    setMultiData(data.value);
    //filter data based on bat only
    if (cot.length === 0 && multibat.length !== 0 && multibowl.length === 0) {
      filt(multibat);
    }
    //display non-filter data
    else if (cot.length <= 0 && multibat.length <= 0 && multibowl.length <= 0) {
      setDatas(data1);
    }
    //filter data based on both country and bowl
    else if (cot.length > 0 && multibat.length <= 0 && multibowl.length > 0) {
      filtbowl(cot, multibowl);
    }
    //filter data based on both country and bat
    else if (cot.length > 0 && multibat.length > 0 && multibowl.length <= 0) {
      filtbat(cot, multibat);
    }
    //filter data based on both bat and bowl
    else if (cot.length <= 0 && multibat.length > 0 && multibowl.length > 0) {
      filtbowlb(multibat, multibowl);
    }
    //filter data based on country only
    else if (cot.length > 0 && multibat.length <= 0 && multibowl.length <= 0) {
      filt(cot);
    }
    //filter data based on all the attributes
    else if (cot.length > 0 && multibat.length > 0 && multibowl.length > 0) {
      filtbowlc(cot, multibat, multibowl);
    }
    //filter data based on bowl only
    else if (cot.length <= 0 && multibat.length <= 0 && multibowl.length > 0) {
      filt(multibowl);
    }
  };

  //filter single attribute
  const filt = (a1) => {
    const dt = [];
    a1.forEach((ele) => {
      const words = data1.filter((word) => {
        return Object.keys(word).some((key) =>
          word[key].toString().includes(ele)
        );
      });
      dt.push(words);
    });
    setDatas(dt.flat());
  };

  //filter country and bat
  const filtbat = (a1, a2) => {
    const dt2 = [];
    for (let i = 0; i < a2.length; i++) {
      for (let j = 0; j < a1.length; j++) {
        const words = data1.filter(
          (word) => word.Country === a1[j] && word.Batting_Hand === a2[i]
        );
        dt2.push(words);
      }
    }
    setDatas(dt2.flat());
  };

  //filter bowl and country
  const filtbowl = (a1, a3) => {
    const dt2 = [];
    for (let i = 0; i < a3.length; i++) {
      for (let j = 0; j < a1.length; j++) {
        const words = data1.filter(
          (word) => word.Bowling_Skill === a3[i] && word.Country === a1[j]
        );
        dt2.push(words);
      }
    }
    setDatas(dt2.flat());
  };

  //filter bat and bowl
  const filtbowlb = (a2, a1) => {
    const dt2 = [];
    for (let i = 0; i < a2.length; i++) {
      for (let j = 0; j < a1.length; j++) {
        const words = data1.filter(
          (word) => word.Batting_Hand === a2[i] && word.Bowling_Skill === a1[j]
        );
        dt2.push(words);
      }
    }
    setDatas(dt2.flat());
  };

  //filter all the attributes
  const filtbowlc = (a1, a2, a3) => {
    const dt2 = [];
    for (let i = 0; i < a3.length; i++) {
      for (let j = 0; j < a2.length; j++) {
        for (let k = 0; k < a1.length; k++) {
          const words = data1.filter(
            (word) =>
              word.Bowling_Skill === a3[i] &&
              word.Country === a1[k] &&
              word.Batting_Hand === a2[j]
          );
          dt2.push(words);
        }
      }
    }
    setDatas(dt2.flat());
  };

  // filter single search value
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setDatas(data1);
    else {
      const filteredData = data1.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setDatas(filteredData);
    }
  };

  // text color
  const st = {
    color: "black"
  };

  return (
    <div>
      <Card centered className="search">
        <Card.Content>
          {/* multi-search dropdown */}
          <Menu vertical className="menu">
            <Menu.Item>
              <div className="pla">
                <Dropdown
                  placeholder="Country"
                  fluid
                  multiple
                  selection
                  options={country}
                  onChange={(e, data) => handle(data)}
                />
                <Dropdown
                  placeholder="Batting"
                  fluid
                  multiple
                  selection
                  options={batting}
                  onChange={(e, data) => handlebat(data)}
                />
                <Dropdown
                  placeholder="Bowling"
                  fluid
                  multiple
                  selection
                  options={bowling}
                  onChange={(e, data) => handlebowl(data)}
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
      {/* displays filter or non-filter data  */}
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
      {/* display data not found message */}
      <div className="notf">
        {datas.length === 0 && (
          <Card centered className="notfound">
            <Card.Content>
              <Message warning compact centered>
                <Message.Header>
                  Sorry,data matching filter parameters not found :){" "}
                </Message.Header>
                <p>Try again</p>
              </Message>
            </Card.Content>
          </Card>
        )}
      </div>
    </div>
  );
}
