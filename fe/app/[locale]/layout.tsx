import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../proxy';
import Navbar from '@/components/layouts/Navbar';
import '../globals.css';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return { title: 'XueXi Hanyu', description: 'Chinese Learning Platform' };
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className="antialiased font-sans bg-amber-50">
                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    <main className="min-h-screen">
                        {children}
                    </main>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
