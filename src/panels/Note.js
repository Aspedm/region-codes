import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader, Group, List, Cell } from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import vkBridge from '@vkontakte/vk-bridge';

// Components
import ColorfulPanelContent from '../components/colorfulLicensePlates';
import DiferentFormPanelContent from '../components/diferentFormLicensePlates';
import WithoutFlagPanelConent from '../components/withoutFlagLicensePlates';

// Helpers
import { hideTabbar, showTabbar } from '../helpers';

const COLORFUL_PANEL = 'colorful-reg-plates-panel';
const FORM_PANEL = 'form-factor-panel';
const WITHOUT_FLAG_PANEL = 'reg-plates-without-flag-panel';

const NOTE_LIST = [
    {
        id: 1,
        name: 'Цветные номера',
        description: 'Кому их выдают и чем отличаются?',
        panel: COLORFUL_PANEL,
    },
    {
        id: 2,
        name: 'Номера разных форм',
        description: 'Можно получить прямоугольный номер?',
        panel: FORM_PANEL,
    },
    {
        id: 3,
        name: 'Номера без флага РФ',
        description: 'Как получить и какие преимущества дают?',
        panel: WITHOUT_FLAG_PANEL,
    }
]

const Note = ({ id, modal }) => {
    const [activePanel, setActivePanel] = useState(id);
    const [panelHistory, setPanelHistory] = useState([id]);

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

    const getNoteList = () => {
        return NOTE_LIST.map(item =>
            <Cell
                key={item.id}
                description={item.description}
                expandable 
                onClick={() => updateHistory(item.panel)}
            >
                {item.name}
            </Cell>
        )
    }

    const noteList = getNoteList();

    return (
        <View 
            id={id} 
            activePanel={activePanel}
            onSwipeBack={goBack}
            history={panelHistory}
            modal={modal}
        >
            <Panel id={id}>
                <PanelHeader>Заметки</PanelHeader>

                <Group title="Заметки об автомобильных номерах" description="Описаны автомобильные номера РФ">
                    <List>
                        {noteList}
                    </List>
                </Group>
            </Panel>

            <Panel id={COLORFUL_PANEL}>
                <PanelHeader left={<PanelHeaderBack onClick={goBack} />}>
                    Цветные номера
                </PanelHeader>
                
                <ColorfulPanelContent />
            </Panel>

            <Panel id={FORM_PANEL}>
                <PanelHeader left={<PanelHeaderBack onClick={goBack} />}>
                    Номера разных форм
                </PanelHeader>
                
                <DiferentFormPanelContent />
            </Panel>

            <Panel id={WITHOUT_FLAG_PANEL}>
                <PanelHeader left={<PanelHeaderBack onClick={goBack} />}>
                    Номера без флага РФ
                </PanelHeader>
                <WithoutFlagPanelConent />
            </Panel>
        </View>
    )
};

Note.propTypes = {
    id: PropTypes.string.isRequired,
    modal: PropTypes.any,
    setModal: PropTypes.func,
};

export default Note;