import createMiddleware from 'next-intl/middleware';

export const routing = {
    locales: ['en', 'vi', 'zh'],
    defaultLocale: 'en'
};

export default createMiddleware({
    locales: routing.locales,
    defaultLocale: routing.defaultLocale,
});

export const config = {
    matcher: ['/((?!_next|favicon.ico|images).*)']
};
