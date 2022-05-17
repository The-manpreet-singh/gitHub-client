import axios from "axios";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import {
  Card,
  CardContent,
  Container,
  Typography,
  Pagination,
} from "@mui/material";
import "./Repos.scss";

export const Repos = (props) => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);

  //console.log(props)

  useEffect(() => {
    let login = props.location.state.user;
    const loadRepos = async () => {
      //console.log(login);
      const result = await axios(
        `https://api.github.com/users/${login}/repos?sort=updated&type=owner&direction=desc&page=${page}&per_page=10`
      );
      //console.log(result.data);
      //setSearchInput(props.login.user);
      setRepos(result.data);
    };
    loadRepos();
  });

  const listRepos =
    repos.length !== 0 ? (
      repos.map((item) => (
        <Grid sm={6} key={item.id} item>
          <Card>
            <CardContent>
              <Typography component={"div"}>
                Full Name: {item.full_name}
              </Typography>
              <Typography component={"div"}>
                Description: {item.description}
              </Typography>
              <Typography component={"div"}>
                Number of Stars: {item.stargazers_count}
              </Typography>
              <Typography component={"div"}>
                Number of Watcheres: {item.watchers}
              </Typography>
              <Typography component={"div"} variant="body2">
                Number of Forks: {item.forks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))
    ) : (
      <Grid>
        <li>No repos</li>
      </Grid>
    );
  return (
    <Container py={6} className="Data">
      <Grid container spacing={2}>
        {listRepos}
      </Grid>
      <Pagination
        className="Pagination"
        count={10}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </Container>
  );
};
