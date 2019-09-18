import React from 'react';
import PropTypes from 'prop-types';
import { FormLayout, SelectMimicry } from '@vkontakte/vkui';
import get from 'lodash/get';

// Configs
import { COUNTRY_LIST } from '../../configs/country';

const SelectCountry = ({ setActiveView, countryViewName, selectedCountry }) => {

    /**
     * @returns {String}
     */
    const getCountryName = () => {
        const country = COUNTRY_LIST.find(item => item.key === selectedCountry);
        const countryName = get(country, 'name', '');

        return countryName;
    }

    const country = getCountryName();

    return (
        <FormLayout>
            <SelectMimicry
                top="Выберите страну"
                placeholder="Не выбрана"
                onClick={() => setActiveView(countryViewName)}
            >
                {country}
            </SelectMimicry>
        </FormLayout>
    );
};

SelectCountry.propTypes = {
    setActiveView: PropTypes.func.isRequired,
    countryViewName: PropTypes.string.isRequired,
    selectedCountry: PropTypes.string.isRequired,
};

export default SelectCountry;