import { useEffect, useState } from "react";
import axios from "axios";
import { Image, List } from "./Home.styled";
import ModalImage from "react-modal-image";

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
    <div>
      <h1>Welcome to travelGram</h1>

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

        <List>
          <li key={image.cloudinary_id}>
            <figure>
              <div>
                <ModalImage small={image.image} large={image.image} alt={image.caption} />
              </div>
              <figcaption>
                <p>{image.caption}</p>
                <p>{image.imageLocation}</p>
              </figcaption>
            </figure>
          </li>
        </List>
      ))}
    </div>
  );
}

export default Home;
