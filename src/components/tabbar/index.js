import React from 'react';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';

// Graphics
import Icon24Note from '@vkontakte/icons/dist/24/note';
import Icon24VideoFillNone from '@vkontakte/icons/dist/24/video_fill_none';
import Icon24Report from '@vkontakte/icons/dist/24/report';

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
            text="Коды регионов"
        >
            <Icon24VideoFillNone />
        </TabbarItem>

        <TabbarItem
            onClick={go}
            selected={selected === 'fines'}
            data-story="fines"
            text="КоАП РФ"
        >
            <Icon24Report />
        </TabbarItem>
    </Tabbar>
);

export default tabbar;
