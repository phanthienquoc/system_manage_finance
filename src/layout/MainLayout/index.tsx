import React, { useMemo, useState } from 'react'

import Header from '../component/Header';
import { Outlet } from 'react-router-dom';
import SideMenu from '../component/SideMenu';
import MainContent from '../component/MainContent';

import '../tailwindcss.css';

const MainLayout = ({ children }: any) => {
    const [open, setOpen] = useState(true);
    const [headerStyle, setHeaderStyle] = useState('white')

    const _handleChange = () => { setOpen(!open) }

    const _handleHeaderStyle = (value: string) => { setHeaderStyle(value) }

    const renderLayout = useMemo(() => {
        return (
            <div className="app">
                <Header headerStyle={headerStyle} />
                <SideMenu open={open} onMenuSize={_handleChange} />
                <MainContent open={open} onScroll={_handleHeaderStyle} >
                    <Outlet />
                </MainContent>
            </div>
        )
    }, [])

    return (
        <React.Fragment>{renderLayout}</React.Fragment>

    )
}

export default MainLayout