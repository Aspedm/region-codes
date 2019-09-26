import React from 'react';
import { Group, List, Cell } from '@vkontakte/vkui';
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
                {item}
            </Cell>
        )
    };

    const regionPhones = getRegionPhones();

    return (
        <Group title="Тел. дежурной части гибдд" description="Для звонка ножмите на номер телефона">
            <List>
                {regionPhones} 
            </List>
        </Group>
    )
};

export default PhonesList;
