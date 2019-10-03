import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Avatar } from '@vkontakte/vkui';
import Icon16Clear from '@vkontakte/icons/dist/16/clear';

// Configs
import { MAX_SEARCH_LENGTH } from '../../configs';

const SearchAlert = ({ setPopout }) => {
    return (
        <Snackbar
            layout="vertical"
            onClose={() => setPopout(null)}
            before={<Avatar size={24} className="snackbarIcon"><Icon16Clear fill="#fff" width={14} height={14} /></Avatar>}
        >
            Максимальная длина поиска: {MAX_SEARCH_LENGTH} символов
        </Snackbar>
    )
};

SearchAlert.propTypes = {
    setPopout: PropTypes.func.isRequired,
};

export default SearchAlert;
