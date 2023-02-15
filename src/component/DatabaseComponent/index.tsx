import React, { useEffect } from 'react';

import Service from 'service';
import Table from 'core/Table';

import { ColumnDef } from "@tanstack/react-table";
const Database = (props: any) => {
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                header: 'server',
                accessorKey: 'server',
                columns: [],
            },
            {
                header: 'authentication',
                accessorKey: 'authentication',
                columns: [
                    {
                        header: 'type',
                        accessorKey: 'authentication.type',
                    },
                    {
                        header: 'options',
                        columns: [
                            {
                                accessorKey: 'authentication.options.userName',
                                header: 'userName',
                                footer: props => props.column.userName,
                            },
                            {
                                header: 'password',
                                accessorKey: 'authentication.options.password',
                                footer: props => props.column.password,
                            },

                        ],
                    },
                ],
            },
            {
                header: 'options',
                columns: [
                    {
                        accessorKey: 'database',
                        cell: info => info.getValue(),
                        footer: props => props.column.database,
                    },
                    {
                        accessorKey: 'encrypt',
                        cell: info => info.getValue(),
                        footer: props => props.column.encrypt,
                    },
                    {
                        id: 'trustServerCertificate',
                        accessorFn: row => row.trustServerCertificate,
                        cell: info => info.getValue(),
                        header: () => <span>trustServerCertificate</span>,
                        footer: props => props.column.id,
                    },
                ],
            },
        ],
        []
    )


    const [data, setData] = React.useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        let { data }: any = await Service.Database.getDatabase()
        setData(data)
    }
    const refreshData = async () => { fetchData() }
    const tableProps = {
        data,
        columns,
        refreshData: refreshData
    }


    return (<Table {...tableProps} />)
}

export default Database;