import React from 'react';
import PropTypes from "prop-types"
import menus from '../../../constant/router'
import { Link } from 'react-router-dom'

const SideMenu = ({ open, onMenuSize }: any) => {
    return (
        <aside className="side-menu" style={{ width: open ? "200px" : "80px" }}>
            <div className="flex justify-end space-y-1 p-2">
                <button onClick={onMenuSize}>{open ? "x" : ">"}</button>
            </div>
            <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
                {
                    menus.map((item: any, index: number) => (
                        <Link to={item.path} key={item.path} className="flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 bg-gray-200 hover:bg-grey-800 group animate-flash">
                            {item.name}
                        </Link>
                    ))
                }

            </nav>
        </aside >
    );
};

SideMenu.propTypes = {
    open: PropTypes.any,
    onMenuSize: PropTypes.any,
}

export default SideMenu;