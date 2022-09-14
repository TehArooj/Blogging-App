import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import Home from "./Home";
import LoaderSpinner from "../components/LoaderSpinner.component"
import HomepageLoaderSpinner from "../components/HomepageLoaderSpinner.component";

afterEach(cleanup);
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
    };
  };

it("<Home /> renders correctly", async () => {
  const tree = renderer
    .create(
      <Router>
        <Home />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("<Home /> renders correctly when there is a Loader Spinner", () => {
  const tree = renderer.create(<LoaderSpinner />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("<Home /> renders correctly when there is a  Homepage Loader Spinner", () => {
  const tree = renderer.create(<HomepageLoaderSpinner />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("<Home /> check matchers and pass", async () => {
  const blog = {
    date: new Date(),
    blog: "Blog Text",
    title: "LeBron James new book stars",
    author: "Maxwell",
  };

  expect(blog).toMatchSnapshot({
    date: expect.any(Date),
    blog: expect.any(String),
    title: expect.any(String),
    author: expect.any(String),
  });
});
