import React from 'react';
import PropTypes from 'prop-types';

const roadNumber = ({ code }) => (
    <div className="roadNumber">
        <div className="left">
            <span className="roadNumber__serial">C</span>
            <span className="roadNumber__regNumber">&nbsp;065&nbsp;</span>
            <span className="roadNumber__serial">MK</span>
        </div>
        <div className="right">
            <div className="roadNumber__region">
                {code || '00'}
            </div>
        </div>
    </div>
);

roadNumber.propTypes = {
    code: PropTypes.string,
}

export default roadNumber;
