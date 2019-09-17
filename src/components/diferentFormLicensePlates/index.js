import React from 'react';
import { Group, List, Cell, Div } from '@vkontakte/vkui';

// Graphics
import DefaultImage from '../../assets/images/license-plate-default-2.png';
import TractorImage from '../../assets/images/license-plate-tractor-2.png';
import MopedImage from '../../assets/images/license-plate-moped.png';
import ClassicIamge from '../../assets/images/license-plate-antique.png';
import SportImage from '../../assets/images/license-plate-sport.png';

const licencePlateList = [
    {
        name: 'ТС с нестандартным креплением',
        image: DefaultImage,
    },
    {
        name: 'Трактора',
        image: TractorImage,
    },
    {
        name: 'Мопеды',
        image: MopedImage,
    },
    {
        name: 'Классические авто',
        image: ClassicIamge,
    },
    {
        name: 'Спортивные авто',
        image: SportImage,
    },
];

const diferentFormLicensePlates = () => (
    <>
        <Div className="noteText">
            <p>
                Номера разных форм можно получить для тракторов, спортивных, классических автомобилей, а также для мототехники.
                С недавнего времени в этот список входят автомобили с нестандартным креплением.
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

export default diferentFormLicensePlates;
