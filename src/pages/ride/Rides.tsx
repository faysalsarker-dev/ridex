import LastRides from "@/components/custom/LastRides";
import PostRide from "./PostRide";

const Rides = () => {
    return (
        <div className="grid md:grid-cols-2 gap-4 ">
            <div>
<PostRide/>


            </div>
            <div>

                <LastRides/>
            </div>
        </div>
    );
};

export default Rides;