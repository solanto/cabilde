import { Table } from "@trussworks/react-uswds"
import { useCallback, useEffect, useRef } from "react"
import clickableTableStyles from "../styles/clickable-table.module"


/**
 * 
 * @typedef {typeof Table} USWDSTable
 */

/**
 * 
 * @template dataItem
 * @augments USWDSTable
 * @param {object} props
 * @param {dataItem[]} props.data
 * @param {dataItem} [props.templateData=data[0]]
 * @param {function(dataItem):Object.<string, import("react").ReactChild>} [props.getEntry=item => item]
 * @param {string} props.rowHeader
 * @param {function(dataItem):function(Event):undefined} [props.getOnClick]
 */

const DataTable = ({
    data,
    templateData = data[0],
    getEntry = item => item,
    rowHeader,
    getOnClick = undefined,
    ...props
}) => {
    const bodyRef = useCallback(
        node => node && node.classList.add(clickableTableStyles["tbody--clickable"]),
        []
    )

    return (
        <Table {...props}>
            <thead>
                {Object
                    .keys(getEntry(templateData))
                    .map((key, index) =>
                        <th scope="col" role="columnheader" key={index}>
                            {key}
                        </th>
                    )
                }
            </thead>
            <tbody ref={bodyRef}>
                {data.map((item, index) =>
                    <tr
                        key={index}
                        onClick={getOnClick ? getOnClick(item) : null}
                    >
                        {Object
                            .entries(getEntry(item))
                            .map(([key, field], index) => {
                                const Column = key == rowHeader ? "th" : "td"
                                return <Column key={index}>{field}</Column>
                            })
                        }
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default DataTable
