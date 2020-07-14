import React from 'react';
import PropTypes from 'prop-types';
import { Search } from '@vkontakte/vkui';

// Components
import SearchAlert from '../searchAlert';

// Configs
import { MAX_SEARCH_LENGTH } from '../../configs';

const SearchBar = ({ setQuerySearch, querySearch, setModal }) => {

    /**
	 * @param {String} query
	 * @returns {Mixed}
	 */
	const validateSearchQuery = query => {
		if (!query.length) return false;
		if (!query.replace(/\s/g, '').length) return false;
		if (query.length > MAX_SEARCH_LENGTH) return setModal(
			<SearchAlert setModal={setModal} />
		);

		return true;
	};

    /**
	 * @param {Object} e
     * @returns {Mixed}
	 */
	const searchOnChange = e => {
		const { target: {
			value,
		}} = e;

		if (!value.length) return setQuerySearch('');
		if (!validateSearchQuery(value)) return false;
		
		return setQuerySearch(value);
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
    setModal: PropTypes.func.isRequired,
};

export default SearchBar;