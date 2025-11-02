import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Outlet, ScrollRestoration } from "react-router";

const HomePage = () => {
    return (
        <>
        <Navbar/>
    <ScrollRestoration/>
        <main className="min-h-[calc(100vh-4rem)] bg-background mt-14">
            <Outlet/>

        </main>
            <Footer/>
        </>
    );
};

export default HomePage;