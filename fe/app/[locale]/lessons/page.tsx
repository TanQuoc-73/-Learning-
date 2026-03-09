import { useTranslations } from 'next-intl';

export default function LessonsPage() {
    const t = useTranslations('Navbar');

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-amber-900 mb-6">{t('lessons')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((lesson) => (
                    <div key={lesson} className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow cursor-pointer">
                        <h2 className="text-xl font-semibold text-orange-800 mb-2">Lesson {lesson}</h2>
                        <p className="text-amber-700">Basic greetings and introductions in Chinese.</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
