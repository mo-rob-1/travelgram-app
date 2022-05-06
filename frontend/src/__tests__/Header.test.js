import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../components/Header/Header";

describe("Header", () => {
  it("renders the header", () => {
    const history = createMemoryHistory();
    const { asFragment } = render(
      <Provider store={store} history={history}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the text logo", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    expect(screen.getAllByText("travelGram")).toBeTruthy();
  });

  it("renders the 'our users' link", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    const ourUsersLink = getByTestId("our-users-link");
    expect(ourUsersLink).toBeTruthy();
  });

  it("renders the login link", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    const login = getByTestId("login-link");
    expect(login).toBeTruthy();
  });
});
