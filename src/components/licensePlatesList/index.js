import React from 'react';
import PropTypes from 'prop-types';
import { Group, List, Cell } from '@vkontakte/vkui';

// Components
import EmptyList from '../emptyCountryList';

const LicensePlatesList = ({ list, showRegionInfo }) => {

    /**
     * @param {Array} codes
     * @returns {String}
     */
    const getCodes = codes => {
        return codes.join(', ');
    };

    /**
     * @returns {Array}
     */
    const getLicensePlatesList = () => {
        return list.map(item =>
			<Cell 
				multiline
				expandable
				key={item.name}
				description={`Код региона: ${getCodes(item.codes)}`}
				onClick={() => showRegionInfo(item)}
			>
				{item.name}
			</Cell>
		)
    };

    const licensePlatesList = getLicensePlatesList();
    const listIsEmpty = list.length === 0;

    return (
        <>
            {!listIsEmpty &&
                <Group>
                    <List>
                        {licensePlatesList}
                    </List>
                </Group>
            }

            {listIsEmpty && <EmptyList /> }
        </>
    );
};

LicensePlatesList.propTypes = {
    list: PropTypes.array.isRequired,
    showRegionInfo: PropTypes.func.isRequired,
};

export default LicensePlatesList;