import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  // display all images from the database and console.log them
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

      <ul>
        {images.map((image) => (
          <li key={image.cloudinary_id}>
            <img src={image.image} alt={image.caption} height="400" />
            <p>{image.caption}</p>
            <p>{image.imageLocation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
