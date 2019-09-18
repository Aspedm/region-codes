import React from 'react';
import PropTypes from 'prop-types';
import { Group, List, Cell } from '@vkontakte/vkui';
import Icon24Done from '@vkontakte/icons/dist/24/done';

// Configs
import { COUNTRY_LIST } from '../../configs/country'; 

const CountryList = ({ setCountryCode, selectedCountry, setActiveView, regionViewName }) => {

    /**
     * @param {String} key
     */
    const selectCountry = (key) => {
        setCountryCode(key);
        setActiveView(regionViewName);
    }

    const getCountryList = () => {
        return COUNTRY_LIST.map(item =>
            <Cell 
                key={item.key}
                onClick={() => selectCountry(item.key)}
                asideContent={selectedCountry === item.key ? <Icon24Done fill="var(--accent)" /> : null}
            >
                {item.name}
            </Cell>    
        )
    };

    const countries = getCountryList();

    return (
        <Group>
            <List>
                {countries}
            </List>
        </Group>
    );
};

CountryList.propTypes = {
    setCountryCode: PropTypes.func.isRequired,
    setActiveView: PropTypes.func.isRequired,
    selectedCountry: PropTypes.string.isRequired,
    regionViewName: PropTypes.string.isRequired,
};

export default CountryList;
