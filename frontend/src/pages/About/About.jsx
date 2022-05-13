import { Section, Span } from "./About.styled";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function About() {
  return (
    <Section>
      <Helmet>
        <title>About | travelGram App</title>
      </Helmet>
      <h1>
        About <Span>travel</Span>Gram
      </h1>
      <h3 style={{ marginBottom: "1rem" }}>
        Welcome to <Span>travel</Span>Gram
      </h3>
      <p>travelGram is an app that allows you to upload and share your travel images.</p>
      <p style={{ marginTop: "1rem", marginBottom: "1rem" }}>This app is perfect for:</p>
      <ul>
        <li>Sharing your travel images with your friends and family.</li>
        <li>Professional and amateur photographers wanting to share their portfolio.</li>
        <li>Backpackers wanting to share their journey.</li>
        <li>Gap year students wanting to share the places they’ve been to with their friends and colleagues.</li>
        <li>
          You – Have you been somewhere or went traveling and want to share the pictures you’ve taken? If yes, then this
          app is for you.{" "}
          <Link to="/register" style={{ color: "#222", fontWeight: "bold" }}>
            Register
          </Link>{" "}
          now to get started.
        </li>
      </ul>
    </Section>
  );
}

export default About;
