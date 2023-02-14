import React, { useEffect } from "react";
import {
    Column,
    ColumnDef,
    flexRender,
    useReactTable,
    getCoreRowModel,
    Table as ReactTable,
    getFilteredRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";

// const Table = ({ data, columns, refreshData }: { data: Order[]; columns: ColumnDef<Order>[]; refreshData: Function }) => {
const Table = ({ data, columns, refreshData }: { data: any[]; columns: ColumnDef<any>[]; refreshData: Function }) => {
    const table = useReactTable({
        data,
        columns,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        //
        debugTable: true,
    });

    return (
        <div className="p-2">
            <div className="h-2" />
            <div>
                <button onClick={() => refreshData()}>Refresh Data</button>
            </div>
            <TTable table={table} />
            <div className="h-2" />
            <Pagination table={table} />

        </div>
    );
};

function Filter({ column, table, }: { column: Column<any, any>, table: ReactTable<any> }) {
    const columnFilterValue = column.getFilterValue()
    const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

    return typeof firstValue === 'number' ? (
        <div className="flex space-x-2">
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[0] ?? ''}
                onChange={e =>
                    column.setFilterValue((old: [number, number]) => [
                        e.target.value,
                        old?.[1],
                    ])
                }
                placeholder={`Min`}
                className="w-24 border shadow rounded"
            />
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[1] ?? ''}
                onChange={e =>
                    column.setFilterValue((old: [number, number]) => [
                        old?.[0],
                        e.target.value,
                    ])
                }
                placeholder={`Max`}
                className="w-24 border shadow rounded"
            />
        </div>
    ) : (
        <input
            type="text"
            value={(columnFilterValue ?? '') as string}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
            className="w-36 border shadow rounded"
        />
    )
}


const TTable = ({ table }: any) => {
    return (
        <table>
            <thead>
                {table.getHeaderGroups().map((headerGroup: any) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header: any) => {
                            return (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter column={header.column} table={table} />
                                                </div>
                                            ) : null}
                                        </div>
                                    )}
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row: any) => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell: any) => {
                                return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>)
}

const Pagination = ({ table }: any) => {
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex">
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <div className="flex">
                    <button
                        className="border rounded p-1"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<<"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    <button className="border rounded p-1" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        {">"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {">>"}
                    </button>
                </div>


            </div>
            <div className="flex">

                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>

            {/* <div>{table.getRowModel().rows.length} Rows</div>
                <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}

        </div>
    )
}

export default Table;

