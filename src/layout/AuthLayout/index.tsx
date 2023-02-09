import React from 'react'
import { Outlet } from 'react-router-dom'
const AuthLayout = ({ children }: any) => {
    return (
        <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
            <div style={{}}>

            </div>
            <div style={{}}>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout