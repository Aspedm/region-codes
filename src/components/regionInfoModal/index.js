import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ModalRoot, ModalPage, ModalPageHeader, Group, List, Cell, Counter, HeaderButton, Tabs, TabsItem, Div } from '@vkontakte/vkui';
import get from 'lodash/get';
import { IS_PLATFORM_ANDROID, IS_PLATFORM_IOS } from '@vkontakte/vkui/dist/lib/platform';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

// Components
import RoadNumber from '../roadNumber';

const INFO_MODAL_ID = 'info-modal';
const INFO_TAB = 'info';
const PHONES_TAB = 'phones';

const RegionInfoModal = ({ setPopout, region }) => {
    const [activeTab, setActiveTab] = useState(INFO_TAB);

    const getRegionPhones = () => {
        const phones = get(region , 'meta.phones', ['Нет информации']);

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
        <ModalRoot activeModal={INFO_MODAL_ID}>
            <ModalPage
                id={INFO_MODAL_ID}
                onClose={() => setPopout(null)}
                header={
                    <ModalPageHeader
                        left={IS_PLATFORM_ANDROID && <HeaderButton onClick={() => setPopout(null)}><Icon24Cancel /></HeaderButton>}
                        right={IS_PLATFORM_IOS && <HeaderButton onClick={() => setPopout(null)}><Icon24Dismiss /></HeaderButton>}
                    >
                        {region.name}
                    </ModalPageHeader>
                }
            >
                <RoadNumber code={region.codes[0]} />

                <Div>
                    <Tabs theme="light">
                        <TabsItem
                            onClick={() => setActiveTab(INFO_TAB)}
                            selected={activeTab === INFO_TAB}
                        >
                            О регионе
                        </TabsItem>

                        <TabsItem
                            onClick={() => setActiveTab(PHONES_TAB)}
                            selected={activeTab === PHONES_TAB}
                        >
                            Номера телефонов
                        </TabsItem>
                    </Tabs>
                </Div>

                {activeTab === INFO_TAB &&
                    <Group title="Статистика по региону" description="Учитываются только леговые автомобили. Дата обновления: 25.06.2019">
                        <List>
                            <Cell 
                                description="На 1000 человек."
                                indicator={<Counter type="primary">{region.meta.carCount}</Counter>}
                            >
                                Кол-во машин
                            </Cell>
                            <Cell 
                                description="По кол-ву машин."
                                indicator={<Counter type="primary">{region.meta.postionByCarCount}</Counter>}
                            >
                                Занимаемое место
                            </Cell>
                        </List>
                    </Group>
                }

                {activeTab === PHONES_TAB &&
                    <Group title="Тел. дежурной части гибдд" description="Для звонка ножмите на номер телефона">
                        <List>
                            {regionPhones} 
                        </List>
                    </Group>
                }
            </ModalPage>
        </ModalRoot>
    );
};

RegionInfoModal.propTypes = {
    setPopout: PropTypes.func.isRequired,
    region: PropTypes.object.isRequired,
}

export default RegionInfoModal;