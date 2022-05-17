import React from "react";
import ReactDom from "react-dom";
import GitHubUsers from "./../GitHubUsers";
import renderer from "react-test-renderer";
import { render, screen, cleanup } from "@testing-library/react";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<GitHubUsers />, div);
});

afterEach(() => {
  cleanup();
});

test("should render complted GitHubUsers", () => {
  render(<GitHubUsers />);
  const githubList = screen.getByTestId("gitHub-1");
  expect(githubList).toBeInTheDocument();
  expect(githubList).toHaveTextContent("Sort ByFollowersRepos");
  expect(githubList).not.toContainHTML("<select>");
});

test("matches snapshot", () => {
  const tree = renderer.create(<GitHubUsers />).toJSON();
  //console.log(tree);
  expect(tree).toMatchSnapshot();
});
