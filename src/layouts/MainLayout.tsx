import type {ReactNode} from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
    return <div className="container mt-4">{children}</div>;
}