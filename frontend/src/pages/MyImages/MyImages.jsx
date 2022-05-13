import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../../features/auth/authSlice";
import { deleteImage, reset } from "../../features/images/imageSlice";
import {
  Section,
  List,
  Figure,
  Location,
  IconWrapper,
  Title,
  Avatar,
  UserInfoWrapper,
  NumberOfImagesWrapper,
  Name,
  UserInfoTextWrapper,
  Line,
  DeleteButton,
  DeleteAccountButton,
  LocationLink,
} from "./MyImages.styled";
import ModalImage from "react-modal-image";
import { GoLocation } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { Helmet } from "react-helmet";

function MyImages() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isSuccess } = useSelector((state) => state.images);

  const [userImages, setUserImages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteAccount = () => {
    const confirm = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirm) {
      axios
        .delete(`/api/users/${user._id}`)
        .then(() => {
          dispatch(reset());
          dispatch(logout());
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
        setUserImages(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Section>
      <Helmet>
        <title>My Images | travelGram App</title>
      </Helmet>
      {userImages.length === 0 && (
        <div>
          <UserInfoWrapper>
            <UserInfoTextWrapper>
              <Avatar src={user.avatar} alt={user.name} />
              <Title>{user.username}</Title>
              <Name>{user.name}</Name>
            </UserInfoTextWrapper>
            <NumberOfImagesWrapper>
              <h3>{userImages.length} images</h3>
            </NumberOfImagesWrapper>
          </UserInfoWrapper>

          <DeleteAccountButton onClick={deleteAccount}>
            <AiOutlineClose style={{ marginRight: "4px" }} />
            <span>Delete Account</span>
          </DeleteAccountButton>
          <Line></Line>
          <h3 data-testid="no-images" style={{ marginTop: "1.5rem" }}>
            You have not uploaded any images yet.
          </h3>
        </div>
      )}

      {userImages.length > 0 && (
        <div>
          <UserInfoWrapper>
            <UserInfoTextWrapper>
              <Avatar src={user.avatar} alt={user.name} />
              <Title>{user.username}</Title>
              <Name>{user.name}</Name>
            </UserInfoTextWrapper>
            <NumberOfImagesWrapper>
              <h3>{userImages.length} images</h3>
            </NumberOfImagesWrapper>
          </UserInfoWrapper>

          <DeleteAccountButton onClick={deleteAccount}>
            <AiOutlineClose style={{ marginRight: "4px" }} />
            <span>Delete Account</span>
          </DeleteAccountButton>

          <Line></Line>
          <List>
            {userImages.map((image) => (
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
                  <Location>
                    <IconWrapper>
                      <LocationLink href={`https://www.google.co.uk/maps/place/${image.imageLocation}`} target="_blank">
                        <GoLocation style={{ marginRight: "4px" }} /> {image.imageLocation}
                      </LocationLink>
                    </IconWrapper>
                  </Location>
                  <DeleteButton onClick={() => dispatch(deleteImage(image._id)) && navigate("/")}>
                    <AiOutlineClose style={{ color: "#fff", fontSize: "1.4rem", position: "relative", top: "2px" }} />
                  </DeleteButton>
                </Figure>
              </li>
            ))}
          </List>
        </div>
      )}
    </Section>
  );
}

export default MyImages;
