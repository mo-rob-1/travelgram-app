import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ModalImage from "react-modal-image";
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
} from "./UserProfile.styled";
import { GoLocation } from "react-icons/go";

function UserProfile() {
  const { user } = useParams();
  const [images, setImages] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/images/${user}`)
      .then((res) => {
        setImages(res.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/users/${user}`)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          <UserInfoWrapper>
            <UserInfoTextWrapper>
              <Avatar src={userInfo.avatar} alt={userInfo.name} />
              <Title>{userInfo.username}</Title>
              <Name>{userInfo.name}</Name>
            </UserInfoTextWrapper>
            <NumberOfImagesWrapper>
              <h3>{images.length} images</h3>
            </NumberOfImagesWrapper>
          </UserInfoWrapper>
          <Line></Line>
          <h3 data-testid="no-images" style={{ marginTop: "1.5rem" }}>
            This user has not uploaded any images yet.
          </h3>
        </div>
      )}

      {images.length > 0 && (
        <div>
          <UserInfoWrapper>
            <UserInfoTextWrapper>
              <Avatar src={userInfo.avatar} alt={userInfo.name} />
              <Title>{userInfo.username}</Title>
              <Name>{userInfo.name}</Name>
            </UserInfoTextWrapper>
            <NumberOfImagesWrapper>
              <h3>{images.length} images</h3>
            </NumberOfImagesWrapper>
          </UserInfoWrapper>
          <Line></Line>
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
                  {/* <Username>
                    <IconWrapper>
                      <AiOutlineUser style={{ marginRight: "4px" }} /> {image.username}
                    </IconWrapper>
                  </Username> */}
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
      )}
    </Section>
  );
}

export default UserProfile;
