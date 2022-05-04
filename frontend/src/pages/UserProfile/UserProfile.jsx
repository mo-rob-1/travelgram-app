import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { user } = useParams();
  const [images, setImages] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/images/${user}`)
      .then((res) => {
        console.log(res.data);
        setImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // fetch the name of the user from the database

  useEffect(() => {
    axios
      .get(`/api/users/${user}`)
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {images.length === 0 && (
        <div>
          <h1>{userInfo.name} - My Images</h1>
          <h3>This user has not uploaded any images yet.</h3>
        </div>
      )}

      {images.length > 0 && (
        <div>
          <h1>{userInfo.name} - User Profile</h1>
          {images.map((image) => (
            <div key={image._id}>
              <img src={image.image} alt={image.caption} />
              <h3>{image.caption}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
