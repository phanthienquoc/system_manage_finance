import PropTypes from "prop-types"
import React from 'react';

const MainContent = ({ children, open, onScroll = () => { } }: any) => {

    const handleScroll = () => {
        if (window.scrollY > 0) {
            onScroll('beige');
        } else {
            onScroll('white');
        }
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <main className="main-content" style={{ marginLeft: open ? "200px" : "80px" }}>
            {children}
        </main>
    );
};

MainContent.propTypes = {
    children: PropTypes.any,
    onScroll: PropTypes.any,
    open: PropTypes.bool,
    setHeaderColor: PropTypes.func
}

export default MainContent;
