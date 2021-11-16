import { Table } from "@trussworks/react-uswds"
import { useCallback, useEffect, useRef } from "react"
import clickableTableStyles from "../styles/clickable-table.module"
import NoData from "./no-data"


/**
 * 
 * @typedef {typeof Table} USWDSTable
 */

const onClickBlockers = [
    "A",
    "BUTTON"
]

function discernClick(onClick) {
    return event =>
        !onClickBlockers.includes(event.target.nodeName)
            && typeof event.target.onclick != "function"
            && onClick(event)
}

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
 * @param {string} [props.noDataMessage]
 */

const DataTable = ({
    data,
    templateData = data[0],
    getEntry = item => item,
    rowHeader,
    getOnClick,
    noDataMessage,
    ...props
}) => {
    const bodyRef = useCallback(
        node => node && getOnClick
            && node.classList.add(clickableTableStyles["tbody--clickable"]),
        [getOnClick]
    )

    if (data.length == 0) return <NoData>{noDataMessage}</NoData>

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
                        onClick={getOnClick ? discernClick(getOnClick(item)) : null}
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
