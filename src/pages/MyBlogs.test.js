import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { cleanup} from "@testing-library/react"
import LoaderSpinner from "../components/LoaderSpinner.component";
import DeleteLoaderSpinner from "../components/DeleteLoaderSpinner.component";
import MyBlogs from "./MyBlogs";

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

it("<MyBlogs /> renders correctly", async () => {

  const tree = renderer
    .create(
        <Router>
        <MyBlogs />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("<MyBlogs /> renders correctly when there is a Loader Spinner", () => {
  const tree = renderer.create(<LoaderSpinner />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("<MyBlogs /> renders correctly when there is a Delete Loader Spinner", () => {
  const tree = renderer.create(<DeleteLoaderSpinner />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("<MyBlogs /> check matchers and pass", async () => {
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