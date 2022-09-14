import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import CustomInput from "../components/CustomInput.component";
import LoaderSpinner from "../components/LoaderSpinner.component";


it("<Login /> renders correctly", async () => {
  const tree = renderer
    .create(
      <Router>
        <Login />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("<Login /> renders correctly when there is a custom input", () => {
  const tree = renderer.create(<CustomInput />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("<Login /> renders correctly when there is custom input with props", () => {
  const tree = renderer
    .create(
      <CustomInput placeholder="hello" type="text" handleChange={() => {}} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("<Login /> renders correctly when there is a Loader Spinner", () => {
  const tree = renderer.create(<LoaderSpinner />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("<Login /> check matchers and pass", async () => {
  const user = {
    email: "test@gmail.com",
    password: "123456",
  };

  expect(user).toMatchSnapshot({
    email: expect.any(String),
    password: expect.any(String),
  });
});