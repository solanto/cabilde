import { forwardRef } from "react"
import ReactSelect from "react-select"
import ReactAsyncSelect from "react-select/async"
import FixRequiredSelect from "./fix-required-select"

export const Select = forwardRef((props, ref) =>
    <FixRequiredSelect
        {...{ ref, ...props }}
        SelectComponent={ReactSelect}
    />
)

Select.displayName = "Select"

export const AsyncSelect = forwardRef((props, ref) =>
    <FixRequiredSelect
        {...{ ref, ...props }}
        SelectComponent={ReactAsyncSelect}
    />
)

AsyncSelect.displayName = "AsyncSelect"
