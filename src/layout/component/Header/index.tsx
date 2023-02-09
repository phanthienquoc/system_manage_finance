import React from 'react';
import PropTypes from "prop-types"

const Header = ({ headerStyle }: any) => {
    return (
        <header className="header" style={{ background: headerStyle }}>
            <h1>Header</h1>
        </header>
    );
};

Header.propTypes = {
    headerStyle: PropTypes.any
}

export default Header;