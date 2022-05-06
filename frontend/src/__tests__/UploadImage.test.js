import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter as Router } from "react-router-dom";
import UploadImage from "../pages/UploadImage/UploadImage";

describe("UploadImage", () => {
  it("renders the upload image page", () => {
    const history = createMemoryHistory();
    const { asFragment } = render(
      <Provider store={store} history={history}>
        <Router>
          <UploadImage />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the form to upload image", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <UploadImage />
        </Router>
      </Provider>
    );
    const form = getByTestId("form");
    expect(form).toBeTruthy();
  });

  it("renders the input to upload image", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <UploadImage />
        </Router>
      </Provider>
    );
    const input = getByTestId("image-upload-input");
    expect(input).toBeTruthy();
  });

  it("renders the caption input", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <UploadImage />
        </Router>
      </Provider>
    );
    const input = getByTestId("caption-input");
    expect(input).toBeTruthy();
  });

  it("renders the image location input", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <UploadImage />
        </Router>
      </Provider>
    );
    const input = getByTestId("image-location-input");
    expect(input).toBeTruthy();
  });

  it("renders the upload button", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <UploadImage />
        </Router>
      </Provider>
    );
    const button = getByTestId("upload-button");
    expect(button).toBeTruthy();
  });
});
