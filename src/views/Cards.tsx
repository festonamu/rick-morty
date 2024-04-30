import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import Overview from '../components/Overview';
import './../assets/style/_cards.scss';

const Cards: FC = () => {
  const { type } = useParams<string>();
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [episode, setEpisode] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const { data: cards, pagination, loading, error } = useFetch(`https://rickandmortyapi.com/api/${type}?page=${page}&name=${name}&status=${status}&episode=${episode}`);

  const filterBy = (kind: string, param: string) => {
    const actions: { [key: string]: () => void } = {
      'name': () => { setEpisode(''); setStatus(''); setName(param); },
      'episode': () => { setName(''); setStatus(''); setEpisode(param); },
      'status': () => { setName(''); setEpisode(''); setStatus(param); },
      'clear': () => { setEpisode(''); setName(''); setStatus(''); }
    };

    actions[kind]?.();
  }

  useEffect(() => {
    setPage(1);
  }, [type])

  return (
    <div>
      <h2 className="ps">{`${type}s`}</h2>
      <div className={`cards__filters ps ${loading ? 'disabled' : ''}`}>
        <Filters type={type} name={name} episode={episode} status={status} filterBy={filterBy} />
        {pagination && pagination.pages > 1 && !error && <Pagination pagination={pagination} page={page} changePage={setPage} />}

      </div>
      {(loading || error) ? (<Loader message={error} />) :
        <>
          <div className="cards">
            {cards.map((card: any) => (
              <div className="card" key={card.id}>
                <Overview card={card} type={type} />
              </div>
            ))}
          </div>
          {pagination && pagination.pages > 1 && <Pagination pagination={pagination} page={page} changePage={setPage} />}
        </>
      }
    </div>
  );
};

export default Cards;