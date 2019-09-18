const ru = require('../data/ru.json');
const uk = require('../data/uk.json');
const uz = require('../data/uz.json');
const by = require('../data/by.json');

export const COUNTRY_LIST = [
    {
        key: 'ru',
        name: 'Россия',
        data: ru,
    },
    {
        key: 'uk',
        name: 'Украина',
        data: uk,
    },
    {
        key: 'uz',
        name: 'Узбекистам',
        data: uz,
    },
    {
        key: 'by',
        name: 'Беларусь',
        data: by,
    },
];

export const DEFAULT_COUNTRY = 'ru';