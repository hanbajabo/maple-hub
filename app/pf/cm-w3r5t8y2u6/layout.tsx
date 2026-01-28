
export const metadata = {
    title: 'Portfolio - Maple Analysis',
    description: 'Private Portfolio Document',
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
