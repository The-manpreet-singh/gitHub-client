import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Following.scss";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  TextField,
} from "@mui/material";
export default function Posts() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("user-list");
    if (data) {
      setSearchInput(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user-list", JSON.stringify(searchInput));
  });

  useEffect(() => {
    axios.get(`https://api.github.com/users`).then((response) => {
      setAPIData(response.data);
      //console.log(response.data);
    });
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Container py={6}>
        <Grid className="search" container spacing={2}>
          <TextField
            icon="search"
            placeholder="Search..."
            onChange={(e) => searchItems(e.target.value)}
          />
        </Grid>

        <Grid className="card" container spacing={2} style={{ marginTop: 20 }}>
          {searchInput.length > 1
            ? filteredResults.map((item) => {
                return (
                  <Grid item sm={6} md={6} key={item.id}>
                    <Card className="Data">
                      <CardContent>
                        <Typography component={"div"}>
                          {item.login}
                          {/* <br />
                          {item.followers_url} */}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            : APIData.map((item) => {
                return (
                  <Grid item sm={6} md={6} key={item.id}>
                    <Card>
                      <CardContent>
                        <Typography component={"div"}>
                          {item.login}
                          {/* <br />
                          {item.followers_url} */}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
        </Grid>
      </Container>
    </div>
  );
}
