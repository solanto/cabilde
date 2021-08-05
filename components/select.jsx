import { forwardRef } from "react"
import ReactSelect from "react-select"
import ReactAsyncSelect from "react-select/async"
import FixRequiredSelect from "./fix-required-select"

const Select = forwardRef((props, ref) =>
    <FixRequiredSelect
        {...{ ref, ...props }}
        SelectComponent={ReactSelect}
    />
)

Select.displayName = "Select"

const AsyncSelect = forwardRef((props, ref) =>
    <FixRequiredSelect
        {...{ ref, ...props }}
        SelectComponent={ReactAsyncSelect}
    />
)

AsyncSelect.displayName = "AsyncSelect"

export { Select, AsyncSelect }
