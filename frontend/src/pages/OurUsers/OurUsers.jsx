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
  LoginLink,
} from "./OurUsers.styled";
import axios from "axios";
import { useSelector } from "react-redux";

function OurUsers() {
  const [users, setUsers] = useState([]);
  const [limitUsers, setLimitUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);

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

  useEffect(() => {
    if (users.length > 0) {
      const limit = users.slice(0, 6);
      setLimitUsers(limit);
    }
  }, [users]);

  if (loading) {
    return (
      <Section>
        <h2>Loading...</h2>
      </Section>
    );
  }

  return (
    <Section>
      {users.length === 0 && (
        <div>
          <Title>All Users</Title>
          <h2>Login or register to be our first user.</h2>
        </div>
      )}

      {user ? (
        <div>
          <Title>All Users</Title>
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
                    <ViewProfile>View Profile</ViewProfile>
                  </UserTextWrapper>
                </StyledCardLink>
              </ListItem>
            ))}
          </List>
        </div>
      ) : (
        <div>
          <Title>Our Users</Title>
          <List data-testid="list">
            {limitUsers.map((user) => (
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
                    <ViewProfile>View Profile</ViewProfile>
                  </UserTextWrapper>
                </StyledCardLink>
              </ListItem>
            ))}
          </List>
          <div style={{ textAlign: "center", marginTop: "4rem", marginBottom: "4rem" }}>
            <LoginLink to="/login">Login to view all users</LoginLink>
          </div>
        </div>
      )}
    </Section>
  );
}

export default OurUsers;
