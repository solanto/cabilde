import slugify from "../lib/slugify"

const Section = ({ title, anchor = slugify(title), children }) =>
    <section>
        <h2 id={anchor}>{title}</h2>
        {children}
    </section>

export const Resumen = ({ title, anchor, rep: { partido, representacion, distrito } }) =>
    <Section {...{ title, anchor }}>
        <p>Partido: {partido}</p>
        <p>Representación: {representacion}</p>
        <p>Distrito: {distrito}</p>
    </Section>

export const ViajesComisiones = ({ title, anchor, rep: { } }) =>
    <Section {...{ title, anchor }}>
        {/* TODO: implement viajes y comisiones */}
    </Section>

export const Actividades = ({ title, anchor, rep: { } }) =>
    <Section {...{ title, anchor }}>
        {/* TODO: implement actividades */}
    </Section>

export const RedesSociales = ({ title, anchor, rep: { contacto } }) =>
    <Section {...{ title, anchor }}>
        
    </Section>
