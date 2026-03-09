
import { Metadata } from "next";

export const metadata: Metadata = {
    title: '도서 기획서',
    description: '비공개 도서 기획서입니다.',
    robots: {
        index: false,
        follow: false,
        noarchive: true,
        nosnippet: true,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function BookLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
