import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function usePreviousPath() {
    const [prevPath, setPrevPath] = useState(null);
    const location = useLocation();
  
    useEffect(() => {
      if (prevPath !== location.pathname) {
        setPrevPath(location.pathname);
        let index = url.indexOf("?");
        url = index !== -1 ? url.substring(0, index) : url;
      }
    }, [location.pathname, prevPath]);
  }

  usePreviousPath();

  useEffect(() => {
    setPagination([]);
    setData([]);
    setLoading(true);
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else if (data.results) {
          setError('');
          setPagination(data.info);
          setData(data.results);
        } else {
          setError('');
          setData(data);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(`There was a problem while fetching the data!`)
      })
  }, [url])

  return { data, pagination, loading, error }
}

export default useFetch;