import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteImage, reset } from "../../features/images/imageSlice";

function MyImages() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isSuccess } = useSelector((state) => state.images);

  const [userImages, setUserImages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

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
      {userImages.length === 0 && (
        <div>
          <h1>{user?.name} - My Images</h1>
          <h3>You have not uploaded any images yet.</h3>
        </div>
      )}

      {userImages.length > 0 && (
        <div>
          <h1>{user?.name} - My Images</h1>
          {userImages.map((image) => (
            <div key={image._id}>
              <img src={image.image} alt={image.caption} />
              <h3>{image.caption}</h3>
              <p>{image.imageLocation}</p>
              <button
                onClick={() => dispatch(deleteImage(image._id)) && window.location.reload(navigate("/my-images"))}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyImages;
