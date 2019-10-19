import React from 'react';
import { Placeholder } from '@vkontakte/vkui';
import Icon56HideOutline from '@vkontakte/icons/dist/56/hide_outline';

const EmptyCountryList = () => (
    <Placeholder
        icon={<Icon56HideOutline />}
        title="Регион не найден"
    >
        Попробуйте ввести название или номер региона.
    </Placeholder>
);

export default EmptyCountryList;
