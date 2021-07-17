import { th, td } from "react"
import slugify from "../lib/slugify"

const TableRow = ({
    items,
    "head-first": headFirst = true,
    "head-section": headSection = false
}) =>
    <tr>
        {items.map(({ body, sort=body, ...props }, index) =>
            headSection
                ? <th data-sortable scope="col"
                    role="columnheader"
                    key={index}
                    {...props}>
                    {body}
                </th>
                : index == 0 && headFirst
                    ? <th scope="row"
                        data-sort-value={sort}
                        key={index}
                        {...props}>
                        {body}
                    </th>
                    : <td data-sort-value={sort}
                        key={index}
                        {...props}>
                        {body}
                    </td>
        )}
    </tr>

export default TableRow
