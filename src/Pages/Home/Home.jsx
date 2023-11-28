import Banner from "./Banner/Banner";
import Faq from "./Faq/Faq";
import Features from "./Features/Features";
import Latest from "./LatestSurvey/Latest";
import Tastimonial from "./Tastimonial/Tastimonial";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Latest></Latest>
            {/* <MostVoted></MostVoted> */}
            <Features></Features>
            <Tastimonial></Tastimonial>
            <Faq></Faq>

        </div>
    );
};

export default Home;