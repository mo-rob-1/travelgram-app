import { useEffect, useState } from "react";
import moment from "moment";
import {
  List,
  ListItem,
  ImageWrapper,
  Avatar,
  Title,
  StyledCardLink,
  UsernameTitle,
  UserTextWrapper,
  ViewProfile,
  Section,
} from "./OurUsers.styled";
import axios from "axios";

function OurUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        setUsers(res.data.reverse());
        setLoading(false);
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
      <Title>Our Users</Title>
      <List data-testid="list">
        {users.map((user) => (
          <ListItem key={user.cloudinary_id}>
            <StyledCardLink to={`/our-users/${user._id}`}>
              <ImageWrapper>
                <Avatar src={user.avatar} alt={user.username} />
              </ImageWrapper>

              <UserTextWrapper>
                <UsernameTitle>{user.username}</UsernameTitle>
                <div style={{ marginTop: ".7rem", marginBottom: ".7rem", display: "grid", gap: ".4rem" }}>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p>Joined: {moment(user.createdAt).format("MMMM YYYY")}</p>
                </div>
                <ViewProfile to={`/our-users/${user._id}`}>View Profile</ViewProfile>
              </UserTextWrapper>
            </StyledCardLink>
          </ListItem>
        ))}
      </List>
    </Section>
  );
}

export default OurUsers;
