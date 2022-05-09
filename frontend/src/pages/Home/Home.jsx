import { useEffect, useState } from "react";
import axios from "axios";
import { Section, Image, List, Figure, Location, Username, IconWrapper, Title } from "./Home.styled";
import ModalImage from "react-modal-image";
import { GoLocation } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";

function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("/api/images")
      .then((res) => {
        console.log(res.data);
        setImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Section>
      <Title>All Images</Title>
      <List>
        {images.map((image) => (
          // <li key={image.cloudinary_id}>
          //   <figure>
          //     <Image src={image.image} alt={image.caption} data-testid="image" />
          //     <figcaption>
          //       <p>{image.caption}</p>
          //       <p>{image.imageLocation}</p>
          //     </figcaption>
          //   </figure>
          // </li>

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
    </Section>
  );
}

export default Home;
