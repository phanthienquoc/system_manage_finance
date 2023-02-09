import React, { useState, useEffect, useReducer, useMemo } from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import Service from 'service'

function StockManament() {

    const [data, setData] = React.useState([])
    const rerender = useReducer(() => ({}), {})[1]

    const [sorting, setSorting] = useState<SortingState>([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        let users: any = await Service.Stock.getStock()
        const { data } = users
        setData(data)
    }

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'Code',
                header: () => <span>Code</span>,
            },
            {
                accessorKey: 'Name',
                header: () => <span>Name</span>,
            },
            {
                accessorKey: 'Type',
                header: () => <span>Type</span>,
            },
            {
                accessorKey: 'Exchange',
                header: () => <span>Exchange</span>,
            },
            {
                accessorKey: 'Country',
                header: () => <span>Country</span>,
            },
        ],
        []
    )


    const table = useReactTable({
        data,
        columns: columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    })

    return (
        <div className="p-2">
            <div className="h-2" />
            <table style={{ width: "100%" }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table
                        .getRowModel()
                        .rows.slice(0, 9)
                        .map(row => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            <div>{table.getRowModel().rows.length} Rows</div>
            <div>
                <button onClick={() => rerender()}>Force Rerender</button>
            </div>
            <div>
                <button onClick={() => { }}>Refresh Data</button>
            </div>
            <pre>{JSON.stringify(sorting, null, 2)}</pre>
        </div>
    )
}

export default StockManament