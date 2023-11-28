import useSurvey from "../../../Hooks/useSurvey";

const UnpublishSurvey = () => {
    const [survey] = useSurvey()
    return (
        <div>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Publish</th>
                        <th>Unpublish</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        survey.map((item, index) => <tr key={item._id}>
                            <td>{index + 1}</td>

                            <td className="font-semibold text-md">
                                {item.name}
                            </td>
                           
                            
                            <td>
                                <button
                                    className="btn btn-success border-0 font-semibold text-white btn-xs">
                                    Publish
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-error bg-red-400 font-semibold text-white btn-xs">
                                    Unpublish
                                </button>
                            </td>
                        </tr>)
                    }

                </tbody>


            </table>
        </div>
    </div>
    );
};

export default UnpublishSurvey;