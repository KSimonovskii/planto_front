interface Props {
    hierarchy: string[]
}

const ProductHierarchy = ({hierarchy} : Props) => {

    const prepareString = (str) => (str.replace("-"," "));

    const getDiv = (str, i) => {

        const isLast = (i === hierarchy.length - 1);

        return (
            <div className={"inline-flex justify-start items-center gap-2"} key = {`--${i}`}>
                <div className={`justify-start text-lime-800 text-base font-['Rubik'] ${isLast? "font-bold" : "font-normal leading-normal"}`} key={i}>
                    {prepareString(str)}
                </div>
                {!isLast &&
                    (<div className={"justify-start text-lime-800 text-base font-normal font-['Rubik'] uppercase"} key={`${i}/`}> /</div>)
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