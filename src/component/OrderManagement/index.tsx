import React, { useEffect } from 'react';

import Service from 'service';
import Table from './component'

import { Order } from './order.ds';
import { ColumnDef } from "@tanstack/react-table";

const OrderManagement = () => {
    const columns = React.useMemo<ColumnDef<Order>[]>(
        () => [
            {
                header: 'Name',
                footer: props => props.column.id,
                columns: [
                    {
                        accessorKey: 'Code',
                        cell: info => info.getValue(),
                        footer: props => props.column.id,
                    },
                    {
                        accessorFn: row => row.lastName,
                        id: 'Name',
                        cell: info => info.getValue(),
                        header: () => <span>Last Name</span>,
                        footer: props => props.column.id,
                    },
                ],
            },
            {
                header: 'Info',
                footer: props => props.column.id,
                columns: [
                    {
                        accessorKey: 'Country',
                        header: () => 'Country',
                        footer: props => props.column.id,
                    },
                    {
                        header: 'More Info',
                        columns: [
                            {
                                accessorKey: 'Type',
                                header: () => <span>Visits</span>,
                                footer: props => props.column.id,
                            },
                            {
                                accessorKey: 'Isin',
                                header: 'Isin',
                                footer: props => props.column.id,
                            },
                            {
                                accessorKey: 'Exchange',
                                header: 'Exchange',
                                footer: props => props.column.id,
                            },
                        ],
                    },
                ],
            },
        ],
        []
    )

    const [data, setData] = React.useState([]);

    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = async () => {
        let { data }: any = await Service.Order.getStock()
        setData(data)
    }
    const refreshData = async () => { getOrders() }
    const tableProps = {
        data,
        columns,
        refreshData: refreshData
    }


    return (<Table {...tableProps} />)
}

export default OrderManagement;