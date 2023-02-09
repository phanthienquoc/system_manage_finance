import PropTypes from "prop-types"
import React, { useState, useReducer, useMemo } from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'

function UserManagement({ data }: any) {
    const rerender = useReducer(() => ({}), {})[1]

    const [sorting, setSorting] = useState<SortingState>([])


    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'user_id',
                header: () => <span>user_id</span>,
            },
            {
                accessorKey: 'username',
                header: () => <span>username</span>,
            },
            {
                accessorKey: 'first_name',
                header: () => <span>first_name</span>,
            },
            {
                accessorKey: 'last_name',
                header: () => <span>last_name</span>,
            },
            {
                accessorKey: 'language_code',
                header: () => <span>language_code</span>,
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
                        .rows.slice(0, 10)
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

UserManagement.propTypes = {
    data: PropTypes.any
}

export default UserManagement