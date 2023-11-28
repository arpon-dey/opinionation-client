import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";

const image_hosting_key = import.meta.env.VITE_IMG_HOST_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateSurvey = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const surveyDetails = useLoaderData()
    console.log(surveyDetails);
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async(data) => {
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(img_hosting_api, imageFile, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        if(res.data.success){
            const surveyItem  = {
                name: data.name,
                category: data.category,
                description: data.description,
                query1: data.query1,
                query2: data.query2,
                image: res.data.data.display_url
            }

            const surveyRes = await axiosSecure.put(`/survey/update/${surveyDetails._id}`, surveyItem)
            console.log(surveyRes.data);
            if(surveyRes.data.modifiedCount>0){
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} updated successfully`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log('res with img url', res.data);

    }
    return (
        <div>
            <SectionTitle heading='Update survey' subHeading='Some changes'></SectionTitle>
            <div className="w-9/12 mx-auto mt-16 bg-gradient-to-r from-slate-300 to-slate-100 p-16 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)}>

                   
                    <div className="form-control grid grid-cols-1  gap-2 mb-4">
                        <input
                            type="text"
                            {...register("name", {required: true})}
                            required
                            placeholder="Name a survey"
                            defaultValue={surveyDetails.name}
                            name="name"
                            className="input input-bordered bg-white text-black"
                        />
                    </div>
                    <div className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <select defaultValue='default'  {...register("category", {required: true})}
                            className="select select-success w-full ">
                            <option disabled value='default'>Select a category</option>
                            <option value="travel">Travel</option>
                            <option value="health">Health</option>
                            <option value="food">Food</option>
                            
                        </select>
                       
                    <input
                            {...register("image", {required: true})}
                            type="file"
                            name="image"
                            className="input input-bordered pt-2  bg-slate-100 text-black"
                        />
                    
                    </div>



                    <div className="form-control  gap-2 mb-4">
                        <textarea
                            {...register("description", {required: true})}
                            type="text"
                            placeholder="Short description"
                            defaultValue={surveyDetails.description}
                            name="description"
                            className="textarea textarea-bordered   bg-white text-black"
                        />
                    </div>
                    <div className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                            type="text"
                            {...register("query1", {required: true})}
                            required
                            placeholder="Query 1"
                            defaultValue={surveyDetails.query1}
                            name="query1"
                            className="input input-bordered bg-white text-black"
                        />
                       
                       <input
                            type="text"
                            {...register("query2", {required: true})}
                            required
                            placeholder="Query 2"
                            defaultValue={surveyDetails.query2}
                            name="query2"
                            className="input input-bordered bg-white text-black"
                        />
                    
                    </div>
                   
                    <input type="submit" className="btn bg-teal-500 w-48 hover:bg-teal-600 text-white font-semibold border-0" value='Update Survey ' />
                </form>
            </div>
        </div>

    );
};


export default UpdateSurvey;