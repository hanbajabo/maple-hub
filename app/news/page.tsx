import { redirect } from 'next/navigation';

export default function NewsPage() {
    // 단풍이 뉴스 기능 일시 중지
    redirect('/');
}
