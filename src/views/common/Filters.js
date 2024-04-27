import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark, faFilter, faSkull, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

const Filters = ({ type, name, episode, status, filterBy }) => {
  const searchNameBar = useRef(null);
  const searchEpisodeBar = useRef(null);
  const [filters, setFilters] = useState(false);

  const toggleNameBar = () => {
    searchNameBar.current.classList.toggle('closed');
    if (!searchNameBar.current.classList.contains('closed') && type === 'episode') {
      searchEpisodeBar.current.classList.add('closed');
    }
  };

  const toggleEpisodeBar = () => {
    searchEpisodeBar.current.classList.toggle('closed');
    if (!searchEpisodeBar.current.classList.contains('closed')) {
      searchNameBar.current.classList.add('closed');
    }
  };
  const toggleFilters = () => {
    setFilters(!filters);
    filterBy('clear', '');
  };

  useEffect(() => {
    setFilters(false);
    // filterBy('clear', ''); //fix this
  }, [type])

  return (
    <div className="filters">
      <div className={`filters__toggle ${filters ? '' : 'open'}`} onClick={toggleFilters}>
        <FontAwesomeIcon icon={faFilter} />
      </div>
      {filters &&
        <div className="filters__options">
          <div className="filters__options__bar filters__options__bar--input closed" ref={searchNameBar}>
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={toggleNameBar} />
            <input type="text" placeholder={`Find by name...`} value={name}
              onChange={(e) => { filterBy('name', e.target.value) }} />
            <FontAwesomeIcon icon={faXmark} onClick={() => { filterBy('name', ''); }} />
          </div>
          {type === 'episode' &&
            <div className="filters__options__bar filters__options__bar--input closed" ref={searchEpisodeBar}>
              <FontAwesomeIcon icon={faMagnifyingGlass} onClick={toggleEpisodeBar} />
              <input type="text" placeholder={`Find by number...`} value={episode}
                onChange={(e) => { filterBy('episode', e.target.value); }} />
              <FontAwesomeIcon icon={faXmark} onClick={() => { filterBy('episode', ''); }} />
            </div>
          }
          {type === 'character' && (<>
            <div className={`filters__toggle alive ${status === 'Alive' ? 'clicked' : ''}`} onClick={() => { filterBy('status', 'Alive'); if (searchNameBar.current) { searchNameBar.current.classList.add('closed'); } }}>
              <FontAwesomeIcon icon={faFaceSmile} />
            </div>
            <div className={`filters__toggle dead ${status === 'Dead' ? 'clicked' : ''}`} onClick={() => { filterBy('status', 'Dead'); if (searchNameBar.current) { searchNameBar.current.classList.add('closed'); } }}>
              <FontAwesomeIcon icon={faSkull} />
            </div>
            <div className={`filters__toggle unknown ${status === 'unknown' ? 'clicked' : ''}`} onClick={() => { filterBy('status', 'unknown'); if (searchNameBar.current) { searchNameBar.current.classList.add('closed'); } }}>
              <FontAwesomeIcon icon={faSkull} />
            </div>
          </>)}
        </div>
      }
    </div>
  );
}

export default Filters;