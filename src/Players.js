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

import data1 from "./players.json";
import "./styles.css";

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

const batting = [
  { key: "right-hand", text: "Right-hand", value: "Right-hand" },
  { key: "left-hand", text: "Left-hand", value: "Left-hand" }
];

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
  // const multiselectRef = React.createRef();
  const [searchText, setSearchText] = useState("");
  const [datas, setDatas] = useState(data1);
  const [multiDat, setMultiData] = useState([]);
  const [multibat, setMultibat] = useState([]);
  const [multibowl, setMultibowl] = useState([]);

  const excludeColumns = ["DOB"];
  // var bat = [];

  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  // const check = (multiDat, multibat, multibowl) => {
  //   console.log(multiDat, multibat, multibowl);
  //   if (
  //     multiDat.length === 0 &&
  //     typeof multibat === "undefined" &&
  //     multibowl.length !== 0
  //   ) {
  //     filt(multibowl);
  //   } else if (
  //     multiDat.length === 0 &&
  //     multibat === "undefined" &&
  //     multibowl.length === 0
  //   ) {
  //     setDatas(data1);
  //   } else if (
  //     multiDat.length !== 0 &&
  //     typeof multibat === "undefined" &&
  //     multibowl.length !== 0
  //   ) {
  //     console.log("done");
  //     filtbowl(multiDat, multibowl);
  //   } else if (
  //     multiDat.length === 0 &&
  //     typeof multibat !== "undefined" &&
  //     multibowl.length !== 0
  //   ) {
  //     filtbowlb(multibat, multibowl);
  //   } else if (
  //     multiDat.length !== 0 &&
  //     typeof multibat === "undefined" &&
  //     multibowl.length === 0
  //   ) {
  //     filt(multiDat);
  //   } else if (
  //     multiDat.length === 0 &&
  //     typeof multibat !== "undefined" &&
  //     multibowl.length === 0
  //   ) {
  //     filt(multibat);
  //   } else if (
  //     multiDat.length !== 0 &&
  //     multibat.length !== 0 &&
  //     multibowl.length === 0
  //   ) {
  //     console.log("cbat");
  //     filtbat(multiDat);
  //   } else if (
  //     multiDat.length !== 0 &&
  //     multibat.length !== null &&
  //     multibowl.length !== 0
  //   ) {
  //     filtbowlc(multiDat, multibowl);
  //   }
  // };

  const handlebowl = (data) => {
    const bowl = data.value;
    // console.log(bowl, bowl.length);
    // console.log(multibat, multibat.length);
    // console.log(multiDat, multiDat.length);

    setMultibowl(data.value);
    // if (
    //   multiDat.length === 0 &&
    //   typeof multibat === "undefined" &&
    //   data.value.length !== 0
    // ) {
    //   filt(bowl);
    // } else if (
    //   multiDat.length === 0 &&
    //   typeof multibat === "undefined" &&
    //   data.value.length === 0
    // ) {
    //   setDatas(data1);
    // } else if (
    //   multiDat.length !== 0 &&
    //   typeof multibat === "undefined" &&
    //   data.value.length !== 0
    // ) {
    //   console.log("done");
    //   filtbowl(multiDat, data.value);
    // } else if (
    //   multiDat.length === 0 &&
    //   typeof multibat !== "undefined" &&
    //   data.value.length !== 0
    // ) {
    //   filtbowlb(multibat, data.value);
    // } else if (
    //   multiDat.length !== 0 &&
    //   typeof multibat === "undefined" &&
    //   data.value.length === 0
    // ) {
    //   filt(multiDat);
    // } else if (
    //   multiDat.length === 0 &&
    //   typeof multibat !== "undefined" &&
    //   data.value.length === 0
    // ) {
    //   filt(multibat);
    // } else if (
    //   multiDat.length !== 0 &&
    //   multibat.length !== 0 &&
    //   data.value.length === 0
    // ) {
    //   console.log("cbat");
    //   filtbat(multiDat);
    // } else if (
    //   multiDat.length !== 0 &&
    //   multibat.length !== null &&
    //   data.value.length !== 0
    // ) {
    //   filtbowlc(multiDat, data.value);
    // }
    if (multiDat.length === 0 && multibat.length !== 0 && bowl.length === 0) {
      // console.log("bat");
      filt(multibat);
    } else if (
      multiDat.length <= 0 &&
      multibat.length <= 0 &&
      bowl.length <= 0
    ) {
      setDatas(data1);
    } else if (multiDat.length > 0 && multibat.length <= 0 && bowl.length > 0) {
      filtbowl(multiDat, bowl);
    } else if (multiDat.length > 0 && multibat.length > 0 && bowl.length <= 0) {
      // console.log("cb");
      filtbat(multiDat, multibat);
    } else if (multiDat.length <= 0 && multibat.length > 0 && bowl.length > 0) {
      filtbowlb(multibat, bowl);
    } else if (
      multiDat.length > 0 &&
      multibat.length <= 0 &&
      bowl.length <= 0
    ) {
      filt(multiDat);
    } else if (multiDat.length > 0 && multibat.length > 0 && bowl.length > 0) {
      filtbowlc(multiDat, multibat, bowl);
    } else if (
      multiDat.length <= 0 &&
      multibat.length <= 0 &&
      bowl.length > 0
    ) {
      filt(bowl);
    }
    // check(multiDat, multibat, data.value);
  };

  const handlebat = (data) => {
    const bat = data.value;
    setMultibat(data.value);
    console.log(bat);
    if (multiDat.length === 0 && bat.length !== 0 && multibowl.length === 0) {
      // console.log("bat");
      filt(bat);
    } else if (
      multiDat.length <= 0 &&
      bat.length <= 0 &&
      multibowl.length <= 0
    ) {
      setDatas(data1);
    } else if (multiDat.length > 0 && bat.length <= 0 && multibowl.length > 0) {
      filtbowl(multiDat, multibowl);
    } else if (multiDat.length > 0 && bat.length > 0 && multibowl.length <= 0) {
      // console.log("cb");
      filtbat(multiDat, bat);
    } else if (multiDat.length <= 0 && bat.length > 0 && multibowl.length > 0) {
      filtbowlb(bat, multibowl);
    } else if (
      multiDat.length > 0 &&
      bat.length <= 0 &&
      multibowl.length <= 0
    ) {
      filt(multiDat);
    } else if (multiDat.length > 0 && bat.length > 0 && multibowl.length > 0) {
      filtbowlc(multiDat, bat, multibowl);
    } else if (
      multiDat.length <= 0 &&
      bat.length <= 0 &&
      multibowl.length > 0
    ) {
      filt(multibowl);
    }
  };

  const handle = (data) => {
    // console.log(data.value);
    const cot = data.value;
    setMultiData(data.value);
    // console.log(bat);
    // if (cot.length > 0 && multibat.length > 0) {
    //   // console.log(bat);
    //   filtbat(cot);
    //   console.log("empty");
    // } else if (cot.length > 0) {
    //   filt(cot);
    // } else {
    //   setDatas(data1);
    // }
    if (cot.length === 0 && multibat.length !== 0 && multibowl.length === 0) {
      // console.log("bat");
      filt(multibat);
    } else if (
      cot.length <= 0 &&
      multibat.length <= 0 &&
      multibowl.length <= 0
    ) {
      setDatas(data1);
    } else if (cot.length > 0 && multibat.length <= 0 && multibowl.length > 0) {
      filtbowl(cot, multibowl);
    } else if (cot.length > 0 && multibat.length > 0 && multibowl.length <= 0) {
      // console.log("cb");
      filtbat(cot, multibat);
    } else if (cot.length <= 0 && multibat.length > 0 && multibowl.length > 0) {
      filtbowlb(multibat, multibowl);
    } else if (
      cot.length > 0 &&
      multibat.length <= 0 &&
      multibowl.length <= 0
    ) {
      filt(cot);
    } else if (cot.length > 0 && multibat.length > 0 && multibowl.length > 0) {
      filtbowlc(cot, multibat, multibowl);
    } else if (
      cot.length <= 0 &&
      multibat.length <= 0 &&
      multibowl.length > 0
    ) {
      filt(multibowl);
    }
    // check(data.value,multibat,multibowl);
  };

  const filt = (a1) => {
    const dt = [];
    a1.forEach((ele) => {
      // console.log(ele);
      const words = data1.filter((word) => {
        return Object.keys(word).some((key) =>
          word[key].toString().includes(ele)
        );
      });
      // word.Country===(ele));
      dt.push(words);
    });

    console.log(dt.flat());
    setDatas(dt.flat());
  };

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
    // const dt1 = [];
    // a2.forEach((ele) => {
    //   console.log(bat);
    //   const words = data1.filter(
    //     (word) => word.Bowling_Skill === ele && word.Batting_Hand === bat
    //   );
    //   dt1.push(words);
    // });
    // console.log(dt1.flat());
    // setDatas(dt1.flat());
  };

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
    console.log(dt2.flat());
    setDatas(dt2.flat());
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
