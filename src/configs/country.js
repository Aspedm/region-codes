const ru = require('../data/licence-plates/ru.json');
const uk = require('../data/licence-plates/uk.json');
const uz = require('../data/licence-plates/uz.json');
const by = require('../data/licence-plates/by.json');

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