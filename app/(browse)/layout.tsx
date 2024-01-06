import { Navbar } from "../ui/navbar/navbar";


export default function BrowseLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex h-full pt-20">
                <Navbar />
                {children}
            </div>
        </>
    );
};

