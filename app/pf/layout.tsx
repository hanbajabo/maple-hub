
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: '%s | Portfolio',
        default: 'Portfolio Collection',
    },
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
