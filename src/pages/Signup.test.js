import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "./Signup";
import CustomInput from "../components/CustomInput.component";
import LoaderSpinner from "../components/LoaderSpinner.component";

it("<Signup /> renders correctly", async () => {
  const tree = renderer
    .create(
      <Router>
        <Signup />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("<Signup /> renders correctly when there is a custom input", () => {
  const tree = renderer.create(<CustomInput />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("<Signup /> renders correctly when there is custom input with props", () => {
  const tree = renderer
    .create(
      <CustomInput placeholder="hello" type="text" handleChange={() => {}} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("<Signup /> renders correctly when there is a Loader Spinner", () => {
  const tree = renderer.create(<LoaderSpinner />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("<Signup /> check matchers and pass", async () => {
  const user = {
    fullname:"tester",
    email: "test@gmail.com",
    password: "123456",
    confirmPassword:"123456",
  };

  expect(user).toMatchSnapshot({
    fullname: expect.any(String),
    email: expect.any(String),
    password: "123456",
    confirmPassword: "123456",
  });
});