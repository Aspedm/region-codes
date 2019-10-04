const ru = require('../data/licence-plates/ru.json');
const uk = require('../data/licence-plates/uk.json');
const uz = require('../data/licence-plates/uz.json');
const by = require('../data/licence-plates/by.json');
const kz = require('../data/licence-plates/kz.json');

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
        name: 'Узбекистан',
        data: uz,
    },
    {
        key: 'by',
        name: 'Беларусь',
        data: by,
    },
    {
        key: 'kz',
        name: 'Казахстан',
        data: kz,
    },
];

export const DEFAULT_COUNTRY = 'ru';