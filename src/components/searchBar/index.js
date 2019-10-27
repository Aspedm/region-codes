import React from 'react';
import PropTypes from 'prop-types';
import { Search } from '@vkontakte/vkui';

// Components
import SearchAlert from '../searchAlert';

// Configs
import { MAX_SEARCH_LENGTH } from '../../configs';

const SearchBar = ({ setQuerySearch, querySearch, setPopout }) => {

    /**
	 * @param {String} query
	 * @returns {Mixed}
	 */
	const validateSearchQuery = query => {
		if (!query.length) return true;
		if (!query.replace(/\s/g, '').length) return false;
		if (query.length > MAX_SEARCH_LENGTH) return setPopout(
			<SearchAlert setPopout={setPopout} />
		);

		return true;
	};

    /**
	 * @param {String} query
     * @returns {Mixed}
	 */
	const searchOnChange = query => {
		if (validateSearchQuery(query)) return setQuerySearch(query);

		return false;
	};

    return (
        <Search
            value={querySearch}
            onChange={searchOnChange}
            placeholder="Введите номер региона"
        />
    );
};

SearchBar.propTypes = {
    querySearch: PropTypes.string,
    setQuerySearch: PropTypes.func.isRequired,
    setPopout: PropTypes.func.isRequired,
};

export default SearchBar;