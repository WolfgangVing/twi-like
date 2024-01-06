import { Navbar } from "../ui/navbar/navbar";
import { SideBar } from "../ui/sidebar/sidebar";


export default function BrowseLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <SideBar />
                {children}
            </div>
        </>
    );
};

