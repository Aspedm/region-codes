import React from 'react';
import { Group, List, Cell, Div } from '@vkontakte/vkui';

// Graphics
import DefaultNumber from '../../assets/images/license-plate-default.png';
import TaxiImage from '../../assets/images/license-plate-taxi.png';
import ArmyImage from '../../assets/images/license-plate-army.png';
import DiplomatImage from '../../assets/images/license-plate-diplomatic.png';
import PoliceImage from '../../assets/images/license-plate-police.png';
import TransitImage from '../../assets/images/license-plate-transit.png';

const licencePlateList = [
    {
        name: 'Маршрутные ТС',
        image: TaxiImage,
    },
    {
        name: 'Военные ТС',
        image: ArmyImage,
    },
    {
        name: 'ТС дипломатических миссий',
        image: DiplomatImage,
    },
    {
        name: 'ТС МВД России',
        image: PoliceImage,
    },
    {
        name: 'Транзитные ТС',
        image: TransitImage,
    }
];

const colorfulLicensePlates = () => (
    <>
        <Div className="noteText">
            <p>
                В Российской Федерации большинство регистрационных знаков — стандартные знаки образца 1993 года, вид которых определён ГОСТ Р 50577-93 (приказ от 30 июля 1993 года № 362 о новых государственных регистрационных знаках транспортных средств). 
            </p>

            <div className="noteText__image">
                <img src={DefaultNumber} alt="" />
            </div>

            <p>
                Номерные знаки маршрутных ТС, военных ТС, ТС дипломатических миссий, ТС МВД России имеют формат и/или размеры, немного отличающиеся от стандартного.
            </p>
        </Div>

        {licencePlateList.map((item, index) => 
            <Group title={item.name} key={index}>
                <List>
                    <Cell>
                        <img className="cellImage" src={item.image} alt="" />
                    </Cell>
                </List>
            </Group>
        )}
    </>
);

export default colorfulLicensePlates;
