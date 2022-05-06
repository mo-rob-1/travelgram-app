import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter as Router } from "react-router-dom";
import UserProfile from "../pages/UserProfile/UserProfile";

describe("UserProfile", () => {
  it("renders the user profile page", () => {
    const history = createMemoryHistory();
    const { asFragment } = render(
      <Provider store={store} history={history}>
        <Router>
          <UserProfile />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // it renders the no images text if there are no images
  it("renders the no images text if there are no images", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Provider store={store} history={history}>
        <Router>
          <UserProfile />
        </Router>
      </Provider>
    );
    const text = getByTestId("no-images");
    expect(text).toBeTruthy();
  });
});
