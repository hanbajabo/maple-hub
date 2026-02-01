
export const metadata = {
    title: 'Limited World - Project Proposal',
    description: 'Portfolio Document: Limited World',
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
