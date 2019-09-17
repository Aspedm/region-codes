import React, {useState} from 'react';
import { View,  Panel, PanelHeader, Search, List, Cell, Group } from '@vkontakte/vkui';

// Components
import RegionInfoModal from '../components/regionInfoModal';

// Data
const ru = require('../data/ru.json');
const uk = require('../data/uk.json');

const COUNTRY_MAP = {
	ru,
	uk,
};

const home = ({ id }) => {
	const [querySearch, setQuerySearch] = useState('');
	const [popout, setPopout] = useState(null);

	/**
	 * @param {Object} region
	 */
	const showRegionInfo = region => {
		setPopout(
			<RegionInfoModal setPopout={setPopout} region={region} />
		)
	};

	/**
	 * @param {String} query 
	 */
	const searchOnChange = query => {
		setQuerySearch(query);
	};

	/**
	 * @param {String} country
	 */
	const getRegionList = country => {
		const search = querySearch.toLowerCase();
		const result = COUNTRY_MAP[country].filter(item => {
			const codesString = item.codes.join(',');
			return codesString.indexOf(search) > -1;
		});

		return result.map(item =>
			<Cell 
				multiline
				expandable
				key={item.name}
				description={`Код региона: ${item.codes.join(',')}`}
				onClick={() => showRegionInfo(item)}
			>
				{item.name}
			</Cell>
		)
	};

	const regionList = getRegionList('ru');

	return (
		<View id={id} activePanel={id} popout={popout}>
			<Panel id={id}>
				<PanelHeader noShadow>Коды регионов</PanelHeader>
				<Search
					value={querySearch}
					onChange={searchOnChange}
					placeholder="Введите номер региона"
				/>
				{regionList.length > 0 && 
					<List>
						{regionList}
					</List>
				}

				{regionList.length === 0 &&
					<Group 
						title="Введенный код региона не найден" 
						description="В списке представленны коды регинов ГИБДД, на сентябрь 2019 года." 
					/>
				}
			</Panel>
		</View>
	)
};

export default home;