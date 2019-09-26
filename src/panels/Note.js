import React, {useState} from 'react';
import { View, Panel, PanelHeader, Group, List, Cell } from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

// Components
import ColorfulPanelContent from '../components/colorfulLicensePlates';
import DiferentFormPanelContent from '../components/diferentFormLicensePlates';
import WithoutFlagPanelConent from '../components/withoutFlagLicensePlates';

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

const note = ({ id }) => {
    const [activePanel, setActivePanel] = useState(id);

    const getNoteList = () => {
        return NOTE_LIST.map(item =>
            <Cell
                key={item.id}
                description={item.description}
                expandable 
                onClick={() => setActivePanel(item.panel)}
            >
                {item.name}
            </Cell>
        )
    }

    const noteList = getNoteList();

    return (
        <View id={id} activePanel={activePanel}>
            <Panel id={id}>
                <PanelHeader>Заметки</PanelHeader>

                <Group title="Заметки об автомобильных номерах" description="Описаны автомобильные номера РФ">
                    <List>
                        {noteList}
                    </List>
                </Group>
            </Panel>

            <Panel id={COLORFUL_PANEL}>
                <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel(id)} />}>
                    Цветные номера
                </PanelHeader>
                
                <ColorfulPanelContent />
            </Panel>

            <Panel id={FORM_PANEL}>
                <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel(id)} />}>
                    Номера разных форм
                </PanelHeader>
                
                <DiferentFormPanelContent />
            </Panel>

            <Panel id={WITHOUT_FLAG_PANEL}>
                <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel(id)} />}>
                    Номера без флага РФ
                </PanelHeader>
                <WithoutFlagPanelConent />
            </Panel>
        </View>
    )
};

export default note;