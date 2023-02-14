import React, { useState, useEffect, useMemo } from 'react';

import Service from 'service';
import Table from 'core/Table'

import { ColumnDef } from "@tanstack/react-table";
function UserManagement() {
    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'username',
                header: () => <span>Visits</span>,
                footer: props => props.column.id,
            },
            {
                accessorKey: 'user_id',
                cell: info => info.getValue(),
                header: () => <span>user_id</span>,
                footer: props => props.column.id,
            },
            {
                accessorKey: 'first_name',
                cell: info => info.getValue(),
                header: () => <span>first_name</span>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row.last_name,
                id: 'last_name',
                cell: info => info.getValue(),
                header: () => <span>last_name</span>,
                footer: props => props.column.id,
            },
        ],
        []
    )

    const [data, setData] = useState([]);

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        let { data }: any = await Service.User.getUser()
        setData(data)
    }
    const refreshData = async () => { getUsers() }
    const tableProps = {
        data,
        columns,
        refreshData: refreshData
    }

    return (<Table {...tableProps} />)
}

UserManagement.propTypes = {
}

export default UserManagement