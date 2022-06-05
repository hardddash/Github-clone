export const customStyles = {
    control: (styles: any) => ({
        ...styles,
        border: '1px solid var(--color-neutral-light)',
        borderRadius: '6px',
        marginLeft: '8px',
        minWidth: '40px',
        fontSize: '12px',
        minHeight: '32px',
        height: '32px',
    }),
    valueContainer: (provided: any) => ({
        ...provided,
        height: '32px',
        padding: '0 6px'
    }),
    input: (provided: any) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    indicatorsContainer: (provided: any) => ({
        ...provided,
        height: '32px',
    }),
    option: (provided: any) => ({
        ...provided,
        fontSize: '12px',
    }),
}