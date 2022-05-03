import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { deleteImage, reset } from "../../features/images/imageSlice";

function MyImages() {
  const { user } = useSelector((state) => state.auth);
  const { images, isLoading, isSuccess } = useSelector((state) => state.images);

  const [userImages, setUserImages] = useState([]);

  const dispatch = useDispatch();

  const { name } = useParams();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  // const handle delete image

  // use axios to get users images by user id
  useEffect(() => {
    axios
      .get(`/api/images/${user._id}`)
      .then((res) => {
        console.log(res.data);
        setUserImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h1>{user?.name} - My Images</h1>
      {userImages.map((image) => (
        <div key={image._id}>
          <img src={image.image} alt={image.caption} />
          <h3>{image.caption}</h3>
          <p>{image.imageLocation}</p>
          <button onClick={() => dispatch(deleteImage(image._id)) && window.location.reload()}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default MyImages;
