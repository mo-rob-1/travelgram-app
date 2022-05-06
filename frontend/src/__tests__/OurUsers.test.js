import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter as Router } from "react-router-dom";
import OurUsers from "../pages/OurUsers/OurUsers";

describe("OurUsers", () => {
  it("renders the our users page", () => {
    const history = createMemoryHistory();
    const { asFragment } = render(
      <Provider store={store} history={history}>
        <Router>
          <OurUsers />
        </Router>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the list of users", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <OurUsers />
        </Router>
      </Provider>
    );

    const list = getByTestId("list");
    expect(list).toBeTruthy();
  });
});
