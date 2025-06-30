import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Rover from "./components/Rover";

export default function App() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Rover />} />
                <Route path="*" element={<p className="m-4">Sorry, nothing here.</p>} />
            </Routes>
        </MainLayout>
    );
}