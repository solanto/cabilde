import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";

/**
 * 
 * @param {object} props 
 * @param {string} [props.size]
 * @param {string} [props.defaultValue]
 * @param {string} [props.placeholder]
 */

const Search = ({ size = "big", defaultValue, placeholder }) =>
    <Form
        role="search"
        search="true"
        className={`usa-search ${size == "small" ? "usa-search--small" : "usa-search--big"}`}
    >
        <Label htmlFor="buscar" class="usa-sr-only">Busca</Label>
        <TextInput id="buscar" name="busqueda" type="search" {...{ defaultValue, placeholder }} />
        <Button
            type="submit" 
            className="usa-search__submit-text" 
            aria-label="Envía esta búsqueda"
        >
            <span className={size == "small" ? "usa-sr-only" : "usa-search__submit-text"}>Busca</span>
        </Button>
    </Form>

export default Search
