import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Root, View, Panel, PanelHeader, Search, List, Cell, Group } from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

// Components
import RegionInfoModal from '../components/regionInfoModal';
import SelectCountryFromList from '../components/countryList';
import EmptyCountryList from '../components/emptyCountryList';
import SelectCountry from '../components/selectCountry';
import SearchAlert from '../components/searchAlert';

// Configs
import { DEFAULT_COUNTRY, COUNTRY_LIST } from '../configs/country';
import { MAX_SEARCH_LENGTH } from '../configs';

const COUNTRY_VIEW = 'country-view';

const Home = ({ id }) => {
	const [querySearch, setQuerySearch] = useState('');
	const [popout, setPopout] = useState(null);
	const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY);
	const [activeView, setActiveView] = useState(id);

	/**
     * Only Android device, support back button event
     */
    useEffect(() => {
        window.addEventListener('popstate', () => setPopout(null), false);

        return () => {
            window.removeEventListener('popstate', () => setPopout(null), false);
        };
    });

	useEffect(() => {
		if (querySearch) return setQuerySearch('');
	}, [activeView]);

	/**
	 * @param {Object} region
	 */
	const showRegionInfo = region => {
		setPopout(
			<RegionInfoModal setPopout={setPopout} region={region} />
		);

		window.history.pushState({}, '', region);
	};

	/**
	 * @param {String} query
	 * @returns {*}
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
	 */
	const searchOnChange = query => {
		if (validateSearchQuery(query)) return setQuerySearch(query);

		return false;
	};

	/**
	 * @param {String} country
	 */
	const getRegionList = () => {
		const search = querySearch.toLowerCase();
		const countryData = COUNTRY_LIST.find(item => item.key === countryCode);
		
		const result = countryData ? countryData.data.filter(item => {
			const tags = item.tags.join(',').toLowerCase();
			return tags.indexOf(search) > -1;
		}) : [];

		return result.map(item =>
			<Cell 
				multiline
				expandable
				key={item.name}
				description={`Код региона: ${item.codes.join(', ')}`}
				onClick={() => showRegionInfo(item)}
			>
				{item.name}
			</Cell>
		)
	};

	const regionList = getRegionList();
	const listIsEmpty = regionList.length === 0;

	return (
		<Root activeView={activeView}>
			<View id={id} activePanel={id} popout={popout}>
				<Panel id={id}>
					<PanelHeader noShadow>Коды регионов</PanelHeader>

					<Search
						value={querySearch}
						onChange={searchOnChange}
						placeholder="Введите номер региона"
					/>

					<SelectCountry 
						setActiveView={setActiveView}
						countryViewName={COUNTRY_VIEW}
						selectedCountry={countryCode}
					/>

					{!listIsEmpty &&
						<Group>
							<List>
								{regionList}
							</List>
						</Group>
					}

					{listIsEmpty && <EmptyCountryList /> }
				</Panel>
			</View>

			<View id={COUNTRY_VIEW} activePanel={COUNTRY_VIEW}>
				<Panel id={COUNTRY_VIEW}>
					<PanelHeader 
						noShadow
						left={<PanelHeaderBack onClick={() => setActiveView(id)} />}
					>
						Выбор страны
					</PanelHeader>

					<SelectCountryFromList 
						setCountryCode={setCountryCode}
						setActiveView={setActiveView}
						regionViewName={id}
						selectedCountry={countryCode}
					/>
				</Panel>
			</View>
		</Root>
	)
};

Home.propTypes = {
    id: PropTypes.string.isRequired,
    scheme: PropTypes.string.isRequired,
};

export default Home;