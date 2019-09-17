import React from 'react';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';

// Graphics
import Icon24Note from '@vkontakte/icons/dist/24/note';
import Icon24List from '@vkontakte/icons/dist/24/list';

const tabbar = ({ go, selected }) => (
    <Tabbar>
        <TabbarItem
            onClick={go}
            selected={selected === 'note'}
            data-story="note"
            text="Заметки"
        >
            <Icon24Note />
        </TabbarItem>

        <TabbarItem
            onClick={go}
            selected={selected === 'home'}
            data-story="home"
            text="Коды"
        >
            <Icon24List />
        </TabbarItem>
    </Tabbar>
);

export default tabbar;
