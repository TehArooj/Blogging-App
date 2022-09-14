import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";


// 👇️ must wrap your component in <Router>

test("<App /> renders correctly", async () => {
  render(
    <Router>
      <App />
    </Router>
  );
});
