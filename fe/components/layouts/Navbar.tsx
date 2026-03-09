'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Globe, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (newLocale: string) => {
        // Basic way to replace the locale prefix in pathname
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        // If we're at the root which might just be `/`, ensure we go to `/${newLocale}`
        if (pathname === '/') {
            router.push(`/${newLocale}`);
            return;
        }
        router.push(newPath || `/${newLocale}`);
    };

    const navLinks = [
        { href: `/${locale}/lessons`, label: t('lessons') },
        { href: `/${locale}/flashcards`, label: t('flashcards') },
        { href: `/${locale}/dictionary`, label: t('dictionary') },
        { href: `/${locale}/hsk`, label: t('hsk') },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full overflow-hidden border-b border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <Link href={`/${locale}`} className="flex items-center gap-2 text-xl font-bold text-orange-800 hover:text-orange-900 transition-colors">
                        <span className="text-2xl">🍂</span>
                        <span className="hidden sm:inline-block">XueXi Hanyu</span>
                    </Link>
                </div>

                {/* Center: Desktop Nav */}
                <div className="hidden md:flex items-center gap-6 text-amber-900 font-medium">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:text-orange-600 transition-colors relative group">
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                        </Link>
                    ))}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-1 text-orange-500 font-bold bg-orange-100 rounded-full px-3 py-1 text-sm mr-2 shadow-inner">
                        <Flame className="w-4 h-4" />
                        <span>12</span>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap text-amber-800 hover:text-orange-600 hover:bg-orange-100/50 rounded-full shrink-0 h-10 w-10">
                            <Globe className="w-5 h-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-amber-50 border-amber-200 shadow-md rounded-xl">
                            <DropdownMenuItem onClick={() => handleLanguageChange('en')} className="focus:bg-orange-100 cursor-pointer text-amber-900">English</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange('vi')} className="focus:bg-orange-100 cursor-pointer text-amber-900">Tiếng Việt</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange('zh')} className="focus:bg-orange-100 cursor-pointer text-amber-900">中文 (Chinese)</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="ghost" className="hidden lg:inline-flex text-amber-800 hover:bg-orange-100/50 rounded-full">
                        {t('login')}
                    </Button>
                    <Button className="hidden sm:inline-flex bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md transition-transform hover:scale-105">
                        {t('startLearning')}
                    </Button>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger className="md:hidden inline-flex items-center justify-center whitespace-nowrap text-amber-800 hover:bg-orange-100/50 rounded-full h-10 w-10">
                            <Menu className="w-6 h-6" />
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-amber-50 border-amber-200">
                            <div className="flex flex-col gap-6 mt-8">
                                {navLinks.map((link) => (
                                    <Link key={link.href} href={link.href} className="text-lg font-medium text-amber-900 hover:text-orange-600 transition-colors">
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="h-px bg-amber-200 w-full my-4"></div>
                                <Button variant="outline" className="w-full border-orange-300 text-orange-700 bg-white/50 hover:bg-orange-50 rounded-full">
                                    {t('login')}
                                </Button>
                                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                                    {t('startLearning')}
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
