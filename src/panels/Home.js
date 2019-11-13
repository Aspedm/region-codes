import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Root, View, Panel, PanelHeader } from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

// Components
import RegionInfoModal from '../components/regionInfoModal';
import LicensePlatesList from '../components/licensePlatesList';
import SelectCountryFromList from '../components/countryList';
import SelectCountry from '../components/selectCountry';
import SearchBar from '../components/searchBar';

// Configs
import { DEFAULT_COUNTRY, COUNTRY_LIST } from '../configs/country';

const COUNTRY_VIEW = 'country-view';

const Home = ({ id, modal, setModal }) => {
	const [querySearch, setQuerySearch] = useState('');
	const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY);
	const [activeView, setActiveView] = useState(id);

	/**
     * Only Android device, support back button event
     */
    useEffect(() => {
        window.addEventListener('popstate', () => setModal(null), false);

        return () => {
            window.removeEventListener('popstate', () => setModal(null), false);
        };
    });

	useEffect(() => {
		if (querySearch) return setQuerySearch('');
	}, [activeView]);

	/**
	 * @param {Object} region
	 */
	const showRegionInfo = region => {
		setModal(
			<RegionInfoModal setModal={setModal} region={region} />
		);

		window.history.pushState({}, '', region);
	};


	/**
	 * @param {String} country
	 * @returns {Array}
	 */
	const getRegionList = () => {
		const search = querySearch.toLowerCase();
		const countryData = COUNTRY_LIST.find(item => item.key === countryCode);
		
		const result = countryData ? countryData.data.filter(item => {
			const tags = item.tags.join(',').toLowerCase();
			return tags.indexOf(search) > -1;
		}) : [];

		return result;
	};

	const regionList = getRegionList();

	return (
		<Root activeView={activeView}>
			<View 
				id={id} 
				activePanel={id} 
				modal={modal}
			>
				<Panel id={id}>
					<PanelHeader noShadow>Коды регионов</PanelHeader>

					<SearchBar 
						querySearch={querySearch}
						setQuerySearch={setQuerySearch}
						setModal={setModal}
					/>

					<SelectCountry 
						setActiveView={setActiveView}
						countryViewName={COUNTRY_VIEW}
						selectedCountry={countryCode}
					/>

					<LicensePlatesList 
						list={regionList}
						showRegionInfo={showRegionInfo}
					/>
				</Panel>
			</View>

			<View 
				id={COUNTRY_VIEW} 
				activePanel={COUNTRY_VIEW}
			>
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
	modal: PropTypes.any,
    setModal: PropTypes.func,
};

export default Home;