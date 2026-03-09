import { useTranslations } from 'next-intl';

export default function DictionaryPage() {
    const t = useTranslations('Navbar');

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-amber-900 mb-6">{t('dictionary')}</h1>
            <div className="max-w-2xl mx-auto">
                <input
                    type="text"
                    placeholder="Search for a word (pinyin, character, or translation)..."
                    className="w-full p-4 rounded-full border border-amber-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
                <div className="mt-8">
                    <p className="text-center text-amber-800 italic">No historical searches to display.</p>
                </div>
            </div>
        </div>
    );
}
