import React, { useEffect, useState } from 'react';
import UserManagement from 'component/UserManagement';
import Service from 'service';
import axios from 'axios';

const UserContainer = (props: any) => {
    console.log("renderr UserContainer")

    const [data, setData] = useState([])
    useEffect(() => {
        console.log("renderr UserContainer useEffect")

        _handleGetData()
    }, [])

    const _handleGetData = async () => {
        let response: any = await axios.get("http://localhost:9999/user");
        let data = response.json()
        setData(data)

    }

    return <UserManagement data={data} />
}

export default UserContainer