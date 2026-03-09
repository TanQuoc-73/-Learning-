'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { BookOpen, Layers, Library, Languages, Search, ArrowLeftRight } from 'lucide-react';

const dictionary: Record<string, { zh: string; pinyin: string; en: string; vi: string }> = {
    "你好": {
        zh: "你好",
        pinyin: "nǐ hǎo",
        en: "hello",
        vi: "xin chào"
    },
    "谢谢": {
        zh: "谢谢",
        pinyin: "xiè xiè",
        en: "thank you",
        vi: "cảm ơn"
    },
    "再见": {
        zh: "再见",
        pinyin: "zài jiàn",
        en: "goodbye",
        vi: "tạm biệt"
    },
    "中国": {
        zh: "中国",
        pinyin: "zhōng guó",
        en: "China",
        vi: "Trung Quốc"
    },
    "我爱你": {
        zh: "我爱你",
        pinyin: "wǒ ài nǐ",
        en: "I love you",
        vi: "tôi yêu bạn"
    }
};

type Language = 'zh' | 'en' | 'vi';

export default function Home() {
    const t = useTranslations('Home');
    const [inputText, setInputText] = useState('');
    const [sourceLang, setSourceLang] = useState<Language>('zh');
    const [targetLang, setTargetLang] = useState<Language>('en');

    const [result, setResult] = useState<{
        sourceWord: string;
        targetWord: string;
        pinyin?: string;
        notFound?: boolean
    } | null>(null);

    const getPlaceholder = (lang: Language) => {
        switch (lang) {
            case 'zh': return t('demoPlaceholder');
            case 'en': return 'Enter English text (e.g. hello)';
            case 'vi': return 'Nhập văn bản tiếng Việt (VD: xin chào)';
        }
    };

    const getLanguageName = (lang: Language) => {
        switch (lang) {
            case 'zh': return t('demoChinese');
            case 'en': return t('demoEnglish');
            case 'vi': return t('demoVietnamese');
        }
    };

    const handleSwap = () => {
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
        setInputText('');
        setResult(null);
    };

    const handleTranslate = () => {
        const word = inputText.trim().toLowerCase();
        if (!word) {
            setResult(null);
            return;
        }

        // Search dictionary
        let foundEntry = null;
        for (const key in dictionary) {
            const entryDetail = dictionary[key];
            // depending on source language, match against it
            // (English and Vietnamese usually searched in lowercase)
            if (entryDetail[sourceLang].toLowerCase() === word) {
                foundEntry = entryDetail;
                break;
            }
        }

        if (foundEntry) {
            setResult({
                sourceWord: foundEntry[sourceLang],
                targetWord: foundEntry[targetLang],
                // Set pinyin if either target or source is Chinese
                pinyin: (sourceLang === 'zh' || targetLang === 'zh') ? foundEntry.pinyin : undefined
            });
        } else {
            setResult({ sourceWord: '', targetWord: '', notFound: true });
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* 1️⃣ Hero Section */}
            <section className="relative w-full py-24 md:py-32 lg:py-40 bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
                <div className="absolute inset-0 bg-[#f9f5f0] opacity-30"></div>
                <div className="container relative mx-auto px-4 md:px-6 flex flex-col items-center text-center z-10">
                    <Badge variant="secondary" className="mb-6 bg-orange-200 text-orange-900 border-orange-300 hover:bg-orange-300 px-3 py-1 text-sm rounded-full">
                        ✨ Start your journey today
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-amber-950 tracking-tight leading-tight mb-6 max-w-4xl drop-shadow-sm">
                        {t('title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-amber-900/80 mb-10 max-w-2xl">
                        {t('subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg text-lg h-14 px-8 transition-transform hover:scale-105">
                            {t('startLearning')}
                        </Button>
                        <Button size="lg" variant="outline" className="border-orange-300 text-orange-800 hover:bg-orange-100 bg-white rounded-full text-lg h-14 px-8">
                            {t('browseLessons')}
                        </Button>
                    </div>
                </div>
            </section>

            {/* Translation Demo Section */}
            <section className="w-full py-16 bg-white relative -mt-10 z-20">
                <div className="container mx-auto px-4 md:px-6 -mt-24">
                    <Card className="max-w-xl mx-auto border-amber-200 shadow-xl rounded-2xl bg-white overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white pb-6 pt-6 text-center">
                            <div className="flex justify-center items-center gap-2 mb-2">
                                <Languages className="w-6 h-6" />
                                <CardTitle className="text-2xl font-bold">{t('demoTitle')}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-8 px-6 pb-8">

                            {/* Language Selectors */}
                            <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
                                <Select value={sourceLang} onValueChange={(value) => setSourceLang(value as Language)}>
                                    <SelectTrigger className="w-full sm:w-[140px] border-amber-200 focus:ring-orange-500 text-amber-900 font-medium bg-amber-50/50">
                                        <SelectValue placeholder="Source" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="zh">{t('demoChinese')}</SelectItem>
                                        <SelectItem value="en">{t('demoEnglish')}</SelectItem>
                                        <SelectItem value="vi">{t('demoVietnamese')}</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button variant="ghost" size="icon" onClick={handleSwap} className="text-amber-600 hover:text-orange-600 hover:bg-amber-100 shrink-0 transform rotate-90 sm:rotate-0">
                                    <ArrowLeftRight className="w-5 h-5" />
                                </Button>

                                <Select value={targetLang} onValueChange={(value) => setTargetLang(value as Language)}>
                                    <SelectTrigger className="w-full sm:w-[140px] border-amber-200 focus:ring-orange-500 text-amber-900 font-medium bg-amber-50/50">
                                        <SelectValue placeholder="Target" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="zh">{t('demoChinese')}</SelectItem>
                                        <SelectItem value="en">{t('demoEnglish')}</SelectItem>
                                        <SelectItem value="vi">{t('demoVietnamese')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Input & Action */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Input
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleTranslate()}
                                    placeholder={getPlaceholder(sourceLang)}
                                    className="h-12 border-amber-200 focus-visible:ring-orange-500 text-lg rounded-xl flex-1 bg-white"
                                />
                                <Button
                                    onClick={handleTranslate}
                                    className="h-12 px-6 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-md sm:w-auto w-full flex gap-2"
                                >
                                    <Search className="w-4 h-4" />
                                    {t('demoButton')}
                                </Button>
                            </div>

                            {/* Result Display */}
                            {result && (
                                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    {result.notFound ? (
                                        <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 font-medium">
                                            {t('demoNotFound')}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-4 bg-amber-50/50 rounded-2xl p-6 border border-amber-100">

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                                {/* Source Display */}
                                                <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-amber-100 shadow-sm">
                                                    <span className="text-xs font-semibold text-amber-600/70 uppercase tracking-wider mb-2">{getLanguageName(sourceLang)}</span>
                                                    <span className={`font-medium text-amber-950 ${sourceLang === 'zh' ? 'text-3xl font-extrabold text-orange-900' : 'text-xl'}`}>
                                                        {result.sourceWord}
                                                    </span>
                                                </div>

                                                {/* Target Display */}
                                                <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-amber-100 shadow-sm border-orange-200 ring-1 ring-orange-500/20">
                                                    <span className="text-xs font-semibold text-amber-600/70 uppercase tracking-wider mb-2">{getLanguageName(targetLang)}</span>
                                                    <span className={`font-medium text-amber-950 ${targetLang === 'zh' ? 'text-3xl font-extrabold text-orange-900' : 'text-xl'}`}>
                                                        {result.targetWord}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Display Pinyin if applicable */}
                                            {result.pinyin && (
                                                <>
                                                    <Separator className="bg-amber-200 mt-2" />
                                                    <div className="flex flex-col items-center justify-center pt-2">
                                                        <span className="text-xs font-semibold text-amber-600/70 uppercase tracking-wider mb-1">{t('demoPinyin')}</span>
                                                        <span className="text-lg text-amber-800 font-medium bg-amber-100/50 px-4 py-1 rounded-md">{result.pinyin}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* 2️⃣ Features Section */}
            <section className="w-full py-16 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 relative inline-block">
                            {t('featuresTitle')}
                            <span className="absolute -bottom-2 left-[10%] right-[10%] h-1 bg-orange-400 rounded-full"></span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <Card className="border-amber-100 shadow-md hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-amber-50">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-4 text-orange-600 shadow-inner">
                                    <BookOpen size={28} />
                                </div>
                                <CardTitle className="text-2xl text-amber-950">{t('features.vocabulary.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-amber-800/80 leading-relaxed">
                                    {t('features.vocabulary.description')}
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="border-amber-100 shadow-md hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-amber-50">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-4 text-orange-600 shadow-inner">
                                    <Layers size={28} />
                                </div>
                                <CardTitle className="text-2xl text-amber-950">{t('features.flashcards.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-amber-800/80 leading-relaxed">
                                    {t('features.flashcards.description')}
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="border-amber-100 shadow-md hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-amber-50">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-4 text-orange-600 shadow-inner">
                                    <Library size={28} />
                                </div>
                                <CardTitle className="text-2xl text-amber-950">{t('features.dictionary.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-amber-800/80 leading-relaxed">
                                    {t('features.dictionary.description')}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 3️⃣ HSK Levels Section */}
            <section className="w-full py-20 bg-amber-50">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-12">
                        {t('hskTitle')}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                        {[1, 2, 3, 4, 5, 6].map((level) => (
                            <div
                                key={level}
                                className="group relative flex flex-col items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-3xl shadow-sm border-2 border-amber-200 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-orange-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="text-2xl sm:text-3xl font-black text-amber-800 group-hover:text-white relative z-10 transition-colors">
                                    HSK {level}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4️⃣ Call To Action Section */}
            <section className="w-full py-24 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-center">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 drop-shadow-md">
                        {t('ctaTitle')}
                    </h2>
                    <Button size="lg" className="bg-white text-orange-600 hover:bg-amber-50 rounded-full h-14 px-10 text-xl font-bold shadow-xl transition-transform hover:scale-105">
                        {t('ctaButton')}
                    </Button>
                </div>
            </section>
        </div>
    );
}
