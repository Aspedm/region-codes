import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { ModalRoot, ModalPage, ModalPageHeader, Group, List, Cell, Counter, HeaderButton, Tabs, TabsItem, Div, InfoRow } from '@vkontakte/vkui';
import { IS_PLATFORM_ANDROID, IS_PLATFORM_IOS } from '@vkontakte/vkui/dist/lib/platform';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

// Components
import PhonesList from '../phonesList';
import AdressList from '../dutyTrafficPoliceAdress';

const INFO_MODAL_ID = 'info-modal';
const INFO_TAB = 'info';
const TRAFFIC_POLICE = 'traffic-police';

const RegionInfoModal = ({ setModal, region }) => {
    const [activeTab, setActiveTab] = useState(INFO_TAB);

    /**
     * @returns {Boolean}
     */
    const checkIsEmptyStat = () => {
        const carCount = get(region, 'meta.carCount', null);
        const postionByCarCount = get(region, 'meta.postionByCarCount', null);

        return !carCount && !postionByCarCount;
    };

    const statsIsEmpty = checkIsEmptyStat();

    return (
        <ModalRoot activeModal={INFO_MODAL_ID}>
            <ModalPage
                id={INFO_MODAL_ID}
                onClose={() => setModal(null)}
                dynamicContentHeight={true}
                header={
                    <ModalPageHeader
                        left={IS_PLATFORM_ANDROID && <HeaderButton onClick={() => setModal(null)}><Icon24Cancel /></HeaderButton>}
                        right={IS_PLATFORM_IOS && <HeaderButton onClick={() => setModal(null)}><Icon24Dismiss /></HeaderButton>}
                    >
                        {region.name}
                    </ModalPageHeader>
                }
            >

            <Div>
                <Tabs theme="light">
                    <TabsItem
                        onClick={() => setActiveTab(INFO_TAB)}
                        selected={activeTab === INFO_TAB}
                    >
                        О регионе
                    </TabsItem>

                    <TabsItem
                        onClick={() => setActiveTab(TRAFFIC_POLICE)}
                        selected={activeTab === TRAFFIC_POLICE}
                    >
                        Дежурная часть
                    </TabsItem>
                </Tabs>
            </Div>

            {activeTab === INFO_TAB &&
                <Group title="Статистика по региону" description="Учитываются только легковые автомобили. Дата обновления: 25.06.2019">
                    {!statsIsEmpty && 
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
                    }

                    {statsIsEmpty &&
                        <Div>
                            <InfoRow title="">
                                Для данного региона статистика недоступна.
                            </InfoRow>
                        </Div>
                    }
                </Group>
            }

            {activeTab === TRAFFIC_POLICE &&
                <Group title="Информация">
                    <PhonesList region={region} />
                    <AdressList region={region} />
                </Group>
            }
            </ModalPage>
        </ModalRoot>
    );
};

RegionInfoModal.propTypes = {
    setModal: PropTypes.func.isRequired,
    region: PropTypes.object.isRequired,
}

export default RegionInfoModal;