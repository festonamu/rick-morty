import { FC, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark, faFilter, faSkull, faSmile, faQuestion } from '@fortawesome/free-solid-svg-icons';
import './../assets/style/components/_filters.scss';

interface FiltersProps {
  type: string | undefined;
  name: string;
  episode: string;
  status: string;
  filterBy: (type: string, value: string) => void;
}

const Filters: FC<FiltersProps> = ({ type, name, episode, status, filterBy }) => {
  const searchNameBar = useRef<HTMLInputElement>(null);
  const searchEpisodeBar = useRef<HTMLInputElement>(null);
  const [filters, setFilters] = useState<boolean>(false);

  const toggleBar = (param: string) => {
    const episodeBar = searchEpisodeBar.current;
    const nameBar = searchNameBar.current;
    if (nameBar) {
      if (param === 'episode') {
        if (episodeBar && !episodeBar.classList.toggle('closed')) nameBar.classList.add('closed');
      } else if (!nameBar.classList.toggle('closed') && type === 'episode' && episodeBar) {
        episodeBar.classList.add('closed');
      } else if (nameBar && param === 'status') {
        nameBar.classList.add('closed');
      }
    }
  };

  const searchStatus = (statusValue: string) => {
    filterBy('status', statusValue);
    toggleBar('status');
  };

  const toggleFilters = () => {
    setFilters(!filters);
    filterBy('clear', '');
  };

  useEffect(() => {
    setFilters(false);
  }, [type]);

  return (
    <div className="filters">
      <div className={`filters__toggle ${filters ? '' : 'open'}`} onClick={toggleFilters}>
        <FontAwesomeIcon icon={faFilter} />
      </div>
      {filters &&
        <div className="filters__options">
          <div className="filters__options__bar filters__options__bar--input closed" ref={searchNameBar}>
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => toggleBar('name')} />
            <input type="text" placeholder={`Find by name...`} value={name}
              onChange={(e) => { filterBy('name', e.target.value) }} />
            <FontAwesomeIcon icon={faXmark} onClick={() => { filterBy('name', ''); }} />
          </div>
          {type === 'episode' &&
            <div className="filters__options__bar filters__options__bar--input closed" ref={searchEpisodeBar}>
              <FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => toggleBar('episode')} />
              <input type="text" placeholder={`Find by number...`} value={episode}
                onChange={(e) => { filterBy('episode', e.target.value); }} />
              <FontAwesomeIcon icon={faXmark} onClick={() => { filterBy('episode', ''); }} />
            </div>
          }
          {type === 'character' && (<>
            {['alive', 'dead', 'unknown'].map((statusValue, index) => (
              <div className={`filters__toggle ${statusValue} ${status === statusValue ? 'clicked' : ''}`}
                key={index} onClick={() => searchStatus(statusValue)}>
                <FontAwesomeIcon icon={statusValue === 'alive' ? faSmile : statusValue === 'dead' ? faSkull : faQuestion} />
              </div>
            ))}
          </>)}
        </div>
      }
    </div>
  );
}

export default Filters;