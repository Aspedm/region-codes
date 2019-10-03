import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { List, Cell, InfoRow } from '@vkontakte/vkui';

const DutyTrafficPoliceAdress = ({ region }) => {

    const getWorkTime = () => {
        const workTimes = get(region , 'meta.workTime', null);

        if (!workTimes) return [];

        return workTimes.map((item, index) => 
            <Cell
                key={index}
            >
                <InfoRow title={index === 0 ? 'Часы работы' : ''}>
                    {item}
                </InfoRow>
            </Cell>
        )
    };

    const workTime = getWorkTime();

    return (
        <List>
            {region.meta.adress &&
                <Cell multiline>
                    <InfoRow title="Адрес">
                        {region.meta.adress}
                    </InfoRow>
                </Cell>
            }

            {region.meta.workTime && workTime}
        </List>
    )
};

DutyTrafficPoliceAdress.propTypes = {
    region: PropTypes.object.isRequired,
}

export default DutyTrafficPoliceAdress;
