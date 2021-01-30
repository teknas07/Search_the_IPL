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
  Dropdown,
  Message
} from "semantic-ui-react";

import data from "./data/Matches.json";
import "./styles.css";

//Season dropdown options
const season = [
  { key: "ipl2018", text: "IPL-2018", value: "IPL-2018", disabled: false },
  { key: "ipl2019", text: "IPL-2019", value: "IPL-2019", disabled: false }
];

// City dropdown options
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

// Venue dropdown options
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
  },
  {
    key: "IS bindra stadium",
    text: "IS Bindra Stadium",
    value: "IS Bindra Stadium"
  }
];

export default function Match() {
  // State variable for Single Search
  const [searchText, setSearchText] = useState("");
  // State  variable for data
  const [datas, setDatas] = useState(data);
  // State  variable  for season multi-search
  const [multisea, setMultisea] = useState([]);
  // State  variable  for city multi-search
  const [multicity, setMulticity] = useState([]);
  // State  variable  for venue multi-search
  const [multiven, setMultiven] = useState([]);

  //attributes that are  exclude from search result
  const excludeColumns = ["team1", "team2", "winner"];
  //Handle single search
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  // handle venue search
  const handlevenue = (e) => {
    const venue = e.value;
    //Set state
    setMultiven(e.value);
    //filter data based on both season and city
    if (multisea.length > 0 && multicity.length > 0 && venue.length <= 0) {
      filtboth(multicity, multisea);
    }
    //filter data based on venue only
    else if (
      venue.length > 0 &&
      multisea.length <= 0 &&
      multicity.length <= 0
    ) {
      filt(venue);
    }
    //filter data based on season only
    else if (
      multisea.length > 0 &&
      multicity.length <= 0 &&
      venue.length <= 0
    ) {
      filt(multisea);
    }
    //filter data based on both season and venue
    else if (multisea.length > 0 && multicity.length <= 0 && venue.length > 0) {
      filtv(venue, multisea);
    }
    //filter data based on all the attributes
    else if (multisea.length > 0 && multicity.length > 0 && venue.length > 0) {
      alert("Either select city or venue but not both together");
    }
    // displays non-filter data
    else {
      setDatas(data);
    }
  };
  // remove the parameters from city search filter when venue is selected
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

  // handle city search
  const handlecity = (e) => {
    const city = e.value;
    //set state
    setMulticity(e.value);
    //filter data based on saeson and city
    if (multisea.length > 0 && city.length > 0) {
      filtboth(city, multisea);
    }
    //filter data based on city only
    else if (city.length > 0) {
      filt(city);
    }
    // filter data based on season only
    else if (multisea.length > 0 && city.length <= 0 && multiven.length <= 0) {
      filt(multisea);
    }
    // filter data based on season and venue
    else if (multisea.length > 0 && city.length <= 0 && multiven.length > 0) {
      filtv(multiven, multisea);
    }
    // display non-filter data
    else {
      setDatas(data);
    }
  };

  // remove the parameters from venue search filter when city is selected
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

  // handle season search
  const handle = (e) => {
    const cot = e.value;
    //set state
    setMultisea(e.value);
    //filter data based on season only
    if (cot.length > 0 && multicity.length <= 0 && multiven.length <= 0) {
      filt(cot);
    }
    // filter data based on both season and venue
    else if (cot.length > 0 && multicity.length <= 0 && multiven.length > 0) {
      filtv(multiven, cot);
    }
    // filter data based on venue only
    else if (cot.length <= 0 && multicity.length <= 0 && multiven.length > 0) {
      filt(multiven);
    }
    //filter data based on season and city
    else if (cot.length > 0 && multicity.length > 0) {
      filtboth(multicity, cot);
    }
    //filter data based on city only
    else if (multicity.length > 0) {
      filt(multicity);
    }
    //display non-filter data
    else {
      setDatas(data);
    }
  };

  //filter single attribute
  const filt = (a1) => {
    const dt = [];
    a1.forEach((ele) => {
      const words = data.filter((word) => {
        return Object.keys(word).some((key) =>
          word[key].toString().includes(ele)
        );
      });
      dt.push(words);
    });
    setDatas(dt.flat());
  };

  //filter season and city
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

  // filter season and venue
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

  // text color for venue
  const venue1 = {
    color: "red"
  };

  return (
    <div>
      <Card centered className="search">
        <Card.Content>
          {/* multi-search dropdown */}
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
      {/* displays filter or non-filter data  */}
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
      {/* display data not found message */}
      <div className="notf">
        {datas.length === 0 && (
          <Card centered className="notfound">
            <Card.Content>
              <Message warning compact centered>
                <Message.Header>
                  Sorry,data matching filter parameters not found :)
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
