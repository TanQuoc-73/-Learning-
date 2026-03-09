import { useTranslations } from 'next-intl';

export default function FlashcardsPage() {
    const t = useTranslations('Navbar');

    return (
        <div className="container mx-auto p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-amber-900 mb-6">{t('flashcards')}</h1>
            <div className="w-full max-w-md aspect-[3/4] bg-white rounded-3xl shadow-xl flex items-center justify-center p-8 border-4 border-amber-100 cursor-pointer hover:border-orange-300 transition-colors">
                <div className="text-center">
                    <span className="text-8xl font-bold text-orange-800 block mb-4">你好</span>
                    <span className="text-2xl text-amber-600 block mb-2">nǐ hǎo</span>
                    <span className="text-lg text-amber-800/60 opacity-0 hover:opacity-100 transition-opacity">Hello / Hi</span>
                </div>
            </div>
        </div>
    );
}
