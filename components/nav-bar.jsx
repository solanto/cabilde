import { Header, Title, NavMenuButton, PrimaryNav } from "@trussworks/react-uswds"
import Link from "./link"
import { useState } from "react"
import NavLink from "./nav-link"
import nav from "../data/nav"

const NavBar = () => {
    const [expanded, updateExpanded] = useState(false)
    const expand = () => updateExpanded(true)
    const collapse = () => updateExpanded(false)
    const toggle = () => updateExpanded(isExpanded => !isExpanded)

    return <>
        <div className={`usa-overlay ${expanded ? "is-visible" : ""}`}></div>
        <Header basic>
            <div className="usa-nav-container">
                <div className="usa-navbar">
                    <Title>
                        <Link href="/" variant="unstyled">{nav.title}</Link>
                    </Title>
                    <NavMenuButton onClick={expand} label="Menú" />
                </div>
                <PrimaryNav
                    items={Object.entries(nav.links).map(([title, target], index) =>
                        <NavLink
                            href={target}
                            key={index}
                            onClick={collapse}
                        >
                            {title}
                        </NavLink>
                    )}
                    mobileExpanded={expanded}
                    onToggleMobileNav={toggle}>
                    {/* <Search size="small" onSubmit={() => {}} /> */}
                </PrimaryNav>
            </div>
        </Header>
    </>
}

export default NavBar
