import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  function usePreviousPath() {
    const [prevPath, setPrevPath] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
      if (prevPath !== location.pathname) {
        setPrevPath(location.pathname);
        const index = url.indexOf("?");
        url = index !== -1 ? url.substring(0, index) : url;
      }
    }, [location.pathname, prevPath]);
  }

  usePreviousPath();

  useEffect(() => {
    setPagination(null);
    setData(null);
    setLoading(true);
    fetch(url)
      .then(response => response.json())
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
      .catch(() => {
        setLoading(false);
        setError(`There was a problem while fetching the data!`)
      })
  }, [url])

  return { data, pagination, loading, error }
}

export default useFetch;
