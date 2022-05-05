import { render, screen, waitForDomChange } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../pages/Login/Login";

describe("Login", () => {
  it("renders the login page", () => {
    const history = createMemoryHistory();
    const { asFragment } = render(
      <Provider store={store} history={history}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders every Login text", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    expect(screen.getAllByText("Login")).toBeTruthy();
  });

  it("renders email input", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = getByTestId("email-input");
    expect(emailInput).toBeTruthy();
  });

  it("renders password input", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const passwordInput = getByTestId("password-input");
    expect(passwordInput).toBeTruthy();
  });

  it("renders login button", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
    getByRole("button", { name: /login/i });
  });
});
