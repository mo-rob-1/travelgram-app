import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollButton from "../components/ScrollButton/ScrollButton";

describe("ScrollButton", () => {
  it("renders the scroll button", () => {
    const history = createMemoryHistory();
    const { asFragment } = render(
      <Provider store={store} history={history}>
        <Router>
          <ScrollButton />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
