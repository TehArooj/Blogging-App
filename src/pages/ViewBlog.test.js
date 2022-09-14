import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import ViewBlog from "./ViewBlog";

afterEach(cleanup);

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
    };
  };


it("<ViewBlog /> renders correctly", async () => {
  const tree = renderer
    .create(
      <Router>
        <ViewBlog />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("<ViewBlog /> check matchers and pass", async () => {
  const blog = {
    date: new Date(),
    blog:'Blog Text',
    title: 'LeBron James new book stars',
    author:'Maxwell'
  };

  expect(blog).toMatchSnapshot({
    date: expect.any(Date),
    blog: expect.any(String),
    title: expect.any(String),
    author: expect.any(String),
  });
});
