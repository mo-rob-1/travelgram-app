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
          <Link to="/">tavelGram</Link>
        </div>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <button>
                <Link to="/upload-image">Upload Image</Link>
              </button>
            </li>
            <li>
              <button>
                <Link to="/profile">Profile</Link>
              </button>
            </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li className="mr-4 md:mr-10">
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
