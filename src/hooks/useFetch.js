import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [empty, setEmpty] = useState('');
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(true);

  useEffect(() => {
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
            setData(data.results);
            setPagination(data.info);
          } else {
            setEmpty('');
            setData(data);
          }
          setLoading(false);
          console.log(data)
        }, 100)
      })
      .catch(error => {
        console.log(error)
      }) 
  }, [url])

  return { data, pagination, loading, empty }
}

export default useFetch;