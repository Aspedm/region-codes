import isString from 'lodash/isString';
import { DARK_THEME_IDS } from '../configs';

/**
 * @param {String} scheme
 * @returns {Boolean}
 */
export const isDark = scheme => {
    if (!isString(scheme)) return false;

    return DARK_THEME_IDS.indexOf(scheme) !== -1;
};