import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header>
      <div>
        <div>
          <Link to="/">travelGram</Link>
        </div>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/our-users">Our Users</Link>
            </li>
            <li>
              <Link to="/upload-image">Upload Image</Link>
            </li>
            <li>
              <Link to="/my-images">My Images</Link>
            </li>
            {/* <li>
              <button>
                <Link to="/update-profile">Update Profile</Link>
              </button>
            </li> */}
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/our-users" data-testid="our-users-link">
                Our Users
              </Link>
            </li>
            <li>
              <Link to="/login" data-testid="login-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" data-testid="register-link">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
