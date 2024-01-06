import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-6">
            {children}
        </div>
    )
}