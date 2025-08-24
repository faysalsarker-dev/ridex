import { Footer } from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import { Outlet } from "react-router";

const HomePage = () => {
    return (
        <>
        <Navbar/>
            {/* <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="pb-20 md:pb-0"
      >
        
      </motion.main> */}
        <main className="min-h-screen bg-background mt-14">
            <Outlet/>

        </main>
            <Footer/>
        </>
    );
};

export default HomePage;