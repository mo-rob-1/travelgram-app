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
      <h1>{userInfo.name} - User Profile</h1>
      {images.map((image) => (
        <div key={image._id}>
          <img src={image.image} alt={image.caption} />
          <h3>{image.caption}</h3>
        </div>
      ))}
    </div>
  );
}

export default UserProfile;
