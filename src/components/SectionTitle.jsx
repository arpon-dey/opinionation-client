
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="text-center w-3/12 mx-auto mb-8">
            <p className="text-md text-orange-500 font-medium italic mb-2">---{subHeading}---</p>
            <p className=" font-medium text-3xl uppercase border-y-4 py-3">{heading}</p>
        </div>
    );
};

export default SectionTitle;