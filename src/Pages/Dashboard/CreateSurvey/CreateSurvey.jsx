import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic.jsx";
import useAxiosSecure from "../../../Hooks/useAxiosSecure.jsx";
import SectionTitle from "../../../components/SectionTitle.jsx";


const image_hosting_key = import.meta.env.VITE_IMG_HOST_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const CreateSurvey = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async(data) => {
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(img_hosting_api, imageFile, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        if(res.data.success){
            const menuItem  = {
                name: data.name,
                category: data.category,
                description: data.description,
                query1: data.query1,
                query2: data.query2,
                image: res.data.data.display_url
            }

            const menuRes = await axiosSecure.post('/survey', menuItem)
            console.log(menuRes.data);
            if(menuRes.data.insertedId){
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} added to the menu successfully`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log('res with img url', res.data);

    }
    return (
        <div>
            <SectionTitle heading='Add an survey' subHeading='whats new'></SectionTitle>
            <div className="w-9/12 mx-auto mt-16 bg-gradient-to-r from-slate-300 to-slate-100 p-16 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* <input placeholder="Name a recipe" {...register("name")} /> */}
                    {/* <input {...register("category")} /> */}
                    <div className="form-control grid grid-cols-1  gap-2 mb-4">
                        <input
                            type="text"
                            {...register("name", {required: true})}
                            required
                            placeholder="Name a survey"
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
                            <option value="environment">Environment</option>
                            <option value="technology">Technology</option>
                            <option value="entertainment">Entertainment</option>
                            
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
                            name="query1"
                            className="input input-bordered bg-white text-black"
                        />
                       
                       <input
                            type="text"
                            {...register("query2", {required: true})}
                            required
                            placeholder="Query 2"
                            name="query2"
                            className="input input-bordered bg-white text-black"
                        />
                    
                    </div>
                   
                    <input type="submit" className="btn bg-teal-500 w-48 hover:bg-teal-600 text-white font-semibold" value='add Survey ' />
                </form>
            </div>
        </div>

    );
};

export default CreateSurvey;