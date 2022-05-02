import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

function MyImages() {
  const { user } = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const { name } = useParams();

  // use axios to get users images by user id
  useEffect(() => {
    axios
      .get(`/api/images/${user._id}`)
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
      <h1>My Images</h1>
      {images.map((image) => (
        <div key={image._id}>
          <img src={image.image} alt={image.caption} />
          <h3>{image.caption}</h3>
        </div>
      ))}
    </div>
  );
}

export default MyImages;
