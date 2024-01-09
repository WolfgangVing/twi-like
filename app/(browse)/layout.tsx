import { Navbar } from "../ui/navbar/navbar";
import { headers } from "next/headers";
import { Sidebar } from "@/app/ui/sidebar/sidebar";
import { Container } from "../ui/container";
import { SideBarSkeleton } from "../ui/skeletons";
import { Suspense } from "react";

export default function BrowseLayout({
    children,
}: { children: React.ReactNode }) {


    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                {/*[ ]: Make a sidebar exclusive for mobile and another exclusive for desktop.*/}
                <Suspense fallback={<SideBarSkeleton />}>
                    <Sidebar />
                </Suspense>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    );
};

