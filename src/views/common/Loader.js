import { Link } from "react-router-dom";

const Loader = ({ message }) => {
  return (
    <div className="loader">
      {message ?
        <>
          <div className="loader__nodata">
            <p>{message}</p>
            <Link to={'/'}>Go home</Link>
          </div>
        </>
        :
        <div className="loader__spinner"></div>
      }
    </div>
  );
}

export default Loader;