import React, { useState } from 'react';
import { View, Panel, PanelHeader, HeaderButton, Group, List, Cell } from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import VkConnect from '@vkontakte/vk-connect';
import Icon24View from '@vkontakte/icons/dist/24/view';

// Components
import FinesDetail from '../components/finesDetail';

// Data
const finesData = require('../data/fines/ru.json');

const FINES_APP_ID = 6253254;
const FINES_DETAIL_PANEL = 'fines-detail-panel';

const Fines = ({ id }) => {

    const [activePanel, setActivePanel] = useState(id);
    const [detailPanelData, setDetailPanelData] = useState({});

    /**
     * @returns {ReactDOM}
     */
    const getFinesList = () => {
        return finesData.map(item => 
            <Cell
                key={item.id}
                expandable={true}
                onClick={() => openDetailPanel(item)}
            >
                {item.name}
            </Cell>    
        )
    };

    /**
     * @returns {Object}
     */
    const openCheckFinesApp = () => {
        return VkConnect.send('VKWebAppOpenApp', {
            app_id: FINES_APP_ID,
        });
    };

    const openDetailPanel = item => {
        setDetailPanelData(item);
        setActivePanel(FINES_DETAIL_PANEL)
    };

    const finesList = getFinesList();

    return (
        <View id={id} activePanel={activePanel}>
            <Panel id={id}>
                <PanelHeader
                    left={<HeaderButton onClick={openCheckFinesApp}><Icon24View/></HeaderButton>}
                >
                    КоАП РФ
                </PanelHeader>

                <Group title="Тематика">
                    <List>
                        {finesList}
                    </List>
                </Group>
            </Panel>

            <Panel id={FINES_DETAIL_PANEL}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => setActivePanel(id)} />}
                >
                    {detailPanelData.name}
                </PanelHeader>

                <FinesDetail item={detailPanelData} />
            </Panel>
        </View>
    )
};

export default Fines;
