import { useEffect, useState, useContext } from "react";
import { TypeContext } from "./Contexts";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(true);
  const [type] = useContext(TypeContext);

  useEffect(() => {
    if (type) {
      setLoading(true);
      setData([]);
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
    }
  }, [url])

  return { data, pagination, loading, error }
}

export default useFetch;