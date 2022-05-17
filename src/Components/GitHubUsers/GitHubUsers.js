import "./GitHubUsers.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Avatar,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

export default function GitHubUsers() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      // const res =
      //   await axios.get(`https://api.github.com/search/users?q=language:javascript+type:user&sort=followers&order
      // =desc`);
      // const data = [...res.data.items];

      // const githubToken = "713d68d65422abe4eed50fbf9cd000ddfbbd28fa";
      // const res = await axios({
      //   method: "get",
      //   url: `https://api.github.com/users`,
      //   headers: {
      //     Authorization: `token ${githubToken}`,
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Credentials": "true",
      //     "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      //     "Access-Control-Allow-Headers":
      //       "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      //   },
      // });
      // const data = [...res.data];

      const res = await axios.get(`https://api.github.com/users`);
      const data = [...res.data];
      //console.log(data);

      var userUrl = [];
      for (let i = 0; i < data.length; i++) {
        userUrl.push(data[i].login);

        //console.log(userUrl);
      }

      const res1 = [];
      for (let i = 0; i < userUrl.length; i++) {
        const res2 = await axios.get(
          ` https://api.github.com/users/${userUrl[i]}`
        );

        res1.push(res2.data);

        //console.log(res2.data);
      }
      //console.log(res1);
      setUsers(res1);
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        followers: "followers",
        public_repos: "public_repos",
      };
      const sortProperty = types[type];
      const sorted = [...users].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      //  console.log(sorted);
      setSorting(sorted);
    };
    sortArray(sortType);
  }, [sortType, users]);

  const gitHubList = (
    <InfiniteScroll
      dataLength={sorting.length}
      next={() => setPage(page + 1)}
      hasMore={true}
    >
      <Grid container spacing={2} className="dataStyle">
        {sorting.map((user) => (
          <Grid item sm={3} key={user.id}>
            <Card>
              <CardContent>
                <Typography component={"div"} className="Avatar">
                  <Avatar
                    alt="Remy Sharp"
                    src={user.avatar_url}
                    sx={{ width: 200, height: 200 }}
                  />
                </Typography>
                <Typography className="Card" component={"div"} variant="body2">
                  Name: {user.name}
                  <br />
                  Login Name: {user.login} <br />
                  Location: {user.location} <br />
                  Repos: {user.public_repos} <br />
                  Gists: {user.public_gists} <br />
                  Followers: {user.followers} <br />
                  Following:{user.following} <br />
                </Typography>
                <Typography className="Card" component={"div"}>
                  <Button variant="outlined" size="medium">
                    <Link
                      to={{
                        pathname: `/repos/${user.login}`,
                        state: { user: user.login },
                      }}
                    >
                      Repos List
                    </Link>
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );

  return (
    <div data-testid="gitHub-1" className="User">
      <Container>
        <select
          defaultValue="Sort"
          onChange={(e) => setSortType(e.target.value)}
        >
          <option disabled value="Sort">
            Sort By
          </option>
          <option value="followers">Followers</option>
          <option value="public_repos">Repos</option>
        </select>

        {gitHubList}

        {/* <Pagination
          className="Pagination"
          count={10}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(event, value) => setPage(value)}
        />
         */}
      </Container>
    </div>
  );
}
