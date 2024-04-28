import { useEffect, useState, useContext } from "react";
import { TypeContext } from "./Contexts";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [empty, setEmpty] = useState('');
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
        .then((data) => {
          setTimeout(() => {
            if (data.error) {
              setEmpty(data.error);
            } else if (data.results) {
              setEmpty('');
              setPagination(data.info);
              setData(data.results);
            } else {
              setEmpty('');
              setData(data);
            }
            setLoading(false);
          }, 1)
  
          return data;
        })
        .then((data) => {
          console.log('data', data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [url])

  return { data, pagination, loading, empty }
}

export default useFetch;