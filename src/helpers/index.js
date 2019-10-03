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

/**
 * @returns {String}
 */
export const hideTabbar = () => {
    const tabbar = document.getElementsByClassName('Tabbar')[0];
    if (!tabbar) return '';

    return tabbar.style.opacity = '0';
}

/**
 * @returns {String}
 */
export const showTabbar = () => {
    const tabbar = document.getElementsByClassName('Tabbar')[0];
    if (!tabbar) return '';

    return tabbar.style.opacity = '1';
}