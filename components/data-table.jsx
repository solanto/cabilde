import { Table } from "@trussworks/react-uswds";

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
 */

const DataTable = ({ data, templateData = data[0], getEntry = item => item, rowHeader, ...props }) =>
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
        <tbody>
            {data.map((item, index) =>
                <tr key={index}>
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

export default DataTable
