const Loader = ({message}) => {
  return ( 
    <div className="loader">
      {message && <div className="loader__nodata">{message}</div>}
      {!message && <div className="loader__spinner"></div>}
    </div>
   );
}
 
export default Loader;