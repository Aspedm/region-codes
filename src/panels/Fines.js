import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader, PanelHeaderButton, Group, List, Cell } from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import vkBridge from '@vkontakte/vk-bridge';

// Components
import FinesDetail from '../components/finesDetail';

// Helpers
import { hideTabbar, showTabbar } from '../helpers';

// Data
const finesData = require('../data/fines/ru.json');

const FINES_APP_ID = 6253254;
const FINES_APP_ICON = 'https://sun9-7.userapi.com/c848520/v848520804/1d16eb/YrT2oK8WQMI.jpg';
const FINES_DETAIL_PANEL = 'fines-detail-panel';

const Fines = ({ id, modal }) => {
    const [activePanel, setActivePanel] = useState(id);
    const [panelHistory, setPanelHistory] = useState([id]);
    const [detailPanelData, setDetailPanelData] = useState({});
    

    /**
     * Only Android device, support back button event
     */
    useEffect(() => {
        window.addEventListener('popstate', goBack, false);

        return () => {
            window.removeEventListener('popstate', goBack, false);
        };
    });

    useEffect(() => {
        if (activePanel !== id) hideTabbar();

        return () => {
            showTabbar();
        };
    }, [activePanel]);

    /**
     * Method required for only support iOSSwipeBack
     */
    const goBack = () => {
        const history = [...panelHistory];
        history.pop();

        const activePanel = history[history.length - 1];

        if (activePanel === id) {
            vkBridge.send('VKWebAppDisableSwipeBack');
        }

        setPanelHistory(history);
        setActivePanel(activePanel);
    }
    
    /**
     * Method required for only support iOSSwipeBack
     * @param {String} target
     */
    const updateHistory = target => {
        const history = [...panelHistory];
        history.push(target);

        if (activePanel === id) {
            vkBridge.send('VKWebAppEnableSwipeBack');
        }

        window.history.pushState({}, '', target);
        setPanelHistory(history);
        setActivePanel(target);
    }
    
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
        return vkBridge.send('VKWebAppOpenApp', {
            app_id: FINES_APP_ID,
        });
    };

    /**
     * @param {Object} item
     */
    const openDetailPanel = item => {
        setDetailPanelData(item);
        updateHistory(FINES_DETAIL_PANEL);
    };

    const finesList = getFinesList();

    return (
        <View 
            id={id} 
            activePanel={activePanel}
            onSwipeBack={goBack}
            history={panelHistory}
            modal={modal}
        >
            <Panel id={id}>
                <PanelHeader
                    left={
                        <PanelHeaderButton onClick={openCheckFinesApp}>
                            <img src={FINES_APP_ICON} className="Icon openFinesAppIcon" alt="fines app" />
                        </PanelHeaderButton>
                    }
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
                    left={<PanelHeaderBack onClick={goBack} />}
                >
                    {detailPanelData.name}
                </PanelHeader>

                <FinesDetail item={detailPanelData} />
            </Panel>
        </View>
    )
};

Fines.propTypes = {
    id: PropTypes.string.isRequired,
    modal: PropTypes.any,
    setModal: PropTypes.func,
};

export default Fines;
