interface Props {
    hierarchy: string[]
}

const ProductHierarchy = ({hierarchy} : Props) => {

    const prepareString = (str: string) => (str.replace("-"," "));

    const getDiv = (str: string, i: number) => {

        const isLast = (i === hierarchy.length - 1);

        return (
            <div className={"inline-flex justify-start items-center"} key = {`--${i}`}>
                <span className={`justify-start text-lime-800 text-base font-['Rubik'] ${isLast? "font-bold" : "font-normal leading-normal"}`} key={i}>
                    {prepareString(str)}
                </span>
                {!isLast &&
                    (<span className={"justify-start text-lime-800 text-base font-normal font-['Rubik'] uppercase mx-1"} key={`${i}/`}>/</span>)
                }
            </div>
    )
}

    return (
        <div data-property-1="Default">
            {hierarchy && hierarchy.map(((str, i) => (getDiv(str, i))))}
        </div>
    );
};

export default ProductHierarchy;