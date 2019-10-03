import React from 'react';
import PropTypes from 'prop-types';
import { InfoRow, List, Cell } from '@vkontakte/vkui';
import get from 'lodash/get';


const PhonesList = ({ region }) => {

    const getRegionPhones = () => {
        const phones = get(region , 'meta.phones', null);

        if (!phones) {
            return <Cell
            >
                Нет информации
            </Cell>
        }

        return phones.map((item, index) => 
            <Cell
                key={index}
                expandable={true}
                href={`tel:${item}`}
            >
                <InfoRow title={index === 0 ? 'Телефон' : ''}>
                    {item}
                </InfoRow>
            </Cell>
        )
    };

    const regionPhones = getRegionPhones();

    return (
        <List>
            {regionPhones} 
        </List>
    )
};

PhonesList.propTypes = {
    region: PropTypes.object.isRequired,
}

export default PhonesList;
