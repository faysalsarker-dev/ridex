import { Footer } from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import { Outlet } from "react-router";

const HomePage = () => {
    return (
        <>
        <Navbar/>
        <main className="min-h-screen">
            <Outlet/>

        </main>
            <Footer/>
        </>
    );
};

export default HomePage;