import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Home/Home";
import axios from "axios";

describe("Home", () => {
  it("renders the homepage", () => {
    const history = createMemoryHistory();
    const { asFragment } = render(
      <Provider store={store} history={history}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the images", () => {
    const { findByTestId } = render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    findByTestId(() => {
      // get by data-testid
      const image = document.querySelector("[data-testid='image']");
      expect(image).toBeInTheDocument();
    });
  });

  it("checks for axios error", async () => {
    await axios
      .get("http://localhost:5000/api/images")
      .then((res) => {
        expect(res.status).toBe(200);
      })
      .catch((err) => {
        expect(err).toBeTruthy();
      });
  });

  it("checks for axios success", async () => {
    await axios
      .get("http://localhost:5000/api/images")
      .then((res) => {
        expect(res.status).toBe(200);
      })
      .catch((err) => {
        expect(err).toBeFalsy();
      });
  });
});
