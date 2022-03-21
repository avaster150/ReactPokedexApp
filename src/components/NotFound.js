import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="not-found text-center d-flex flex-column justify-content-center align-center">
      <h1>
        <i className="fas fa-exclamation-triangle"></i> 404
      </h1>
      <h2>Oops... Page Not Found</h2>
      <Link class="go-back" to="/">
        Go to home page
      </Link>
    </div>
  );
};
export default NotFound;
