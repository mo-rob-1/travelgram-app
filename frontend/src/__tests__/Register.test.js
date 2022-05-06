import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../pages/Register/Register";

describe("Register", () => {
  it("renders the register user page", () => {
    const history = createMemoryHistory();
    const { asFragment } = render(
      <Provider store={store} history={history}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders every Register text", () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
    expect(screen.getAllByText("Register")).toBeTruthy();
  });

  it("renders email input", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Register />
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
          <Register />
        </Router>
      </Provider>
    );

    const passwordInput = getByTestId("password-input");
    expect(passwordInput).toBeTruthy();
  });

  it("renders confirm password input", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    const passwordInput = getByTestId("confirm-password-input");
    expect(passwordInput).toBeTruthy();
  });

  it("renders register button", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
    getByRole("button", { name: /register/i });
  });
});
