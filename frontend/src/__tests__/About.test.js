import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter as Router } from "react-router-dom";
import About from "../pages/About/About";

describe("About", () => {
  it("renders the about page", () => {
    const history = createMemoryHistory();
    const { asFragment } = render(
      <Provider store={store} history={history}>
        <Router>
          <About />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
