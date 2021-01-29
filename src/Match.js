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

import data from "./Matches.json";
import "./styles.css";

const season = [
  { key: "ipl2018", text: "IPL-2018", value: "IPL-2018", disabled: false },
  { key: "ipl2019", text: "IPL-2019", value: "IPL-2019", disabled: false }
];

const city = [
  { key: "mumbai", text: "Mumbai", value: "Mumbai" },
  { key: "chennai", text: "Chennai", value: "Chennai" },
  { key: "mohali", text: "Mohali", value: "Mohali" },
  { key: "kolkata", text: "Kolkata", value: "Kolkata" },
  { key: "hyderabad", text: "Hyderabad", value: "Hyderabad" },
  { key: "jaipur", text: "Jaipur", value: "Jaipur" },
  { key: "bengaluru", text: "Bengaluru", value: "Bengaluru" },
  { key: "pune", text: "Pune", value: "Pune" },
  { key: "delhi", text: "Delhi", value: "Delhi" },
  { key: "indore", text: "Indore", value: "Indore" },
  { key: "visakhapatnam", text: "Visakhapatnam", value: "Visakhapatnam" }
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
  const [multisea, setMultisea] = useState([]);
  // var multiData = []
  const [multicity, setMulticity] = useState([]);
  const [multiven, setMultiven] = useState([]);
  const excludeColumns = ["team1", "team2", "winner"];

  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  const handlevenue = (e) => {
    console.log(e.value);
    const venue = e.value;
    setMultiven(e.value);
    // blockcity();
    // city.pop();
    console.log(multisea);
    if (multisea.length > 0 && multicity.length > 0 && venue.length <= 0) {
      console.log("both");
      filtboth(multicity, multisea);
      // console.log("empty");
    } else if (
      venue.length > 0 &&
      multisea.length <= 0 &&
      multicity.length <= 0
    ) {
      filt(venue);
    } else if (
      multisea.length > 0 &&
      multicity.length <= 0 &&
      venue.length <= 0
    ) {
      // console.log("seas");
      filt(multisea);
    } else if (
      multisea.length > 0 &&
      multicity.length <= 0 &&
      venue.length > 0
    ) {
      // console.log("seas");
      filtv(venue, multisea);
    } else if (
      multisea.length > 0 &&
      multicity.length > 0 &&
      venue.length > 0
    ) {
      console.log("seas");
      // filtv(venue,multisea);
      alert("Either select city or venue but not both together");
    } else {
      setDatas(data);
    }
  };

  const blockcity = () => {
    while (multicity.length > 0) {
      multicity.pop();
    }

    venue.forEach((ele) => {
      ele.disabled = false;
    });

    city.forEach((el) => {
      el.disabled = true;
    });
  };

  const handlecity = (e) => {
    console.log(e.value);
    const city = e.value;
    setMulticity(e.value);
    // blockvenue();

    // city.pop();
    // console.log(bat);
    if (multisea.length > 0 && city.length > 0) {
      console.log("both");
      filtboth(city, multisea);
      // console.log("empty");
    } else if (city.length > 0) {
      filt(city);
    } else if (
      multisea.length > 0 &&
      city.length <= 0 &&
      multiven.length <= 0
    ) {
      console.log("seas");
      filt(multisea);
    } else if (multisea.length > 0 && city.length <= 0 && multiven.length > 0) {
      console.log("seas");
      // blockcity();
      filtv(multiven, multisea);
    } else {
      setDatas(data);
    }
  };

  const blockvenue = () => {
    while (multiven.length > 0) {
      multiven.pop();
    }
    city.forEach((el) => {
      el.disabled = false;
    });
    venue.forEach((ele) => {
      ele.disabled = true;
    });
  };

  const handle = (e) => {
    // console.log(e);
    const cot = e.value;
    setMultisea(e.value);
    // console.log(bat);
    // if (cot.length > 0 && bat.length > 0) {
    //   console.log(bat);
    //   filtbat(cot);
    //   console.log("empty");
    // } else

    if (cot.length > 0 && multicity.length <= 0 && multiven.length <= 0) {
      filt(cot);
    } else if (cot.length > 0 && multicity.length <= 0 && multiven.length > 0) {
      console.log("seas");
      filtv(multiven, cot);
    } else if (
      cot.length <= 0 &&
      multicity.length <= 0 &&
      multiven.length > 0
    ) {
      // console.log("seas");
      filt(multiven);
    } else {
      setDatas(data);
    }
  };

  const filt = (a1) => {
    const dt = [];
    a1.forEach((ele) => {
      // console.log(ele);
      const words = data.filter((word) => {
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

  const filtboth = (a1, a3) => {
    const dt2 = [];
    for (let i = 0; i < a3.length; i++) {
      for (let j = 0; j < a1.length; j++) {
        const words = data.filter(
          (word) => word.Season === a3[i] && word.city === a1[j]
        );
        dt2.push(words);
      }
    }
    setDatas(dt2.flat());
  };

  const filtv = (a1, a3) => {
    const dt2 = [];
    for (let i = 0; i < a3.length; i++) {
      for (let j = 0; j < a1.length; j++) {
        const words = data.filter(
          (word) => word.Season === a3[i] && word.venue === a1[j]
        );
        dt2.push(words);
      }
    }
    setDatas(dt2.flat());
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
                onChange={(e, data) => handle(data)}
              />
              <Dropdown
                placeholder="City"
                fluid
                multiple
                selection
                options={city}
                onChange={(e, data) => handlecity(data)}
                onClick={blockvenue}
              />
              <Dropdown
                placeholder="Venue"
                fluid
                multiple
                selection
                options={venue}
                onChange={(e, data) => handlevenue(data)}
                onClick={blockcity}
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
