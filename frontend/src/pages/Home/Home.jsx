import { useEffect, useState } from "react";
import axios from "axios";
import { Section, List, Figure, Location, Username, IconWrapper, Title, LoginLink, Span } from "./Home.styled";
import ModalImage from "react-modal-image";
import { GoLocation } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";

function Home() {
  const [images, setImages] = useState([]);
  const [limitImages, setLimitImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get("/api/images")
      .then((res) => {
        setImages(res.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const limit = images.slice(0, 9);
      setLimitImages(limit);
    }
  }, [images]);

  if (loading) {
    return (
      <Section>
        <h2>Loading...</h2>
      </Section>
    );
  }

  return (
    <Section>
      {images.length === 0 && (
        <div>
          <Title>All Images</Title>
          <h2>Login or register to be the first person to add an image</h2>
        </div>
      )}
      {user ? (
        <div>
          <Title>All Images</Title>
          <List>
            {images.map((image) => (
              <li key={image.cloudinary_id}>
                <Figure>
                  <div>
                    <ModalImage
                      small={image.image}
                      large={image.image}
                      alt={image.caption}
                      className="modalImg"
                      data-testid="image"
                    />
                  </div>
                  <Username>
                    <IconWrapper>
                      <AiOutlineUser style={{ marginRight: "4px" }} /> {image.username}
                    </IconWrapper>
                  </Username>
                  <Location>
                    <IconWrapper>
                      <GoLocation style={{ marginRight: "4px" }} /> {image.imageLocation}
                    </IconWrapper>
                  </Location>
                </Figure>
              </li>
            ))}
          </List>
        </div>
      ) : (
        <div>
          <Title>
            Welcome to <Span>travel</Span>Gram
          </Title>
          <List>
            {limitImages.map((image) => (
              <li key={image.cloudinary_id}>
                <Figure>
                  <div>
                    <ModalImage
                      small={image.image}
                      large={image.image}
                      alt={image.caption}
                      className="modalImg"
                      data-testid="image"
                    />
                  </div>
                  <Username>
                    <IconWrapper>
                      <AiOutlineUser style={{ marginRight: "4px" }} /> {image.username}
                    </IconWrapper>
                  </Username>
                  <Location>
                    <IconWrapper>
                      <GoLocation style={{ marginRight: "4px" }} /> {image.imageLocation}
                    </IconWrapper>
                  </Location>
                </Figure>
              </li>
            ))}
          </List>
          <div style={{ textAlign: "center", marginTop: "4rem", marginBottom: "4rem" }}>
            <LoginLink to="/login">Login to view all images</LoginLink>
          </div>
        </div>
      )}
    </Section>
  );
}

export default Home;
