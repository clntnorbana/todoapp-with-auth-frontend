import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const linkStyles = ({ isActive }) => {
    return isActive ? "opacity-100" : "opacity-50";
  };

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="py-5 shadow-md">
      <div className="container mx-auto lg:px-80 md:px-40 px-5 flex justify-between items-center">
        <NavLink to="/" className="font-semibold text-2xl">
          Todo-List
        </NavLink>
        <nav>
          {user && (
            <div className="flex gap-2 items-center">
              <span className="opacity-75">{user.email}</span>
              <button
                className="bg-zinc-600 p-2 rounded-md shadow-md hover:bg-zinc-500"
                onClick={handleClick}
              >
                Logout
              </button>
            </div>
          )}

          {!user && (
            <div className="flex gap-2">
              <NavLink className={linkStyles} to="/login">
                Login
              </NavLink>
              <NavLink className={linkStyles} to="/signup">
                Sign up
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
