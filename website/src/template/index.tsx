import type { ReactNode } from 'react'
import { cx } from 'twind'
import Head from 'next/head'
import { useRouter } from 'next/router'
import twindLogo from '#/twind-logo.png'
import { loader } from '~/image'
import Header from './header'
import Footer from './footer'

export default function Layout({
  title,
  description,
  edit,
  children,
  nav,
  aside,
}: {
  title?: string
  description?: string
  edit?: string
  children: ReactNode
  nav?: ReactNode
  aside?: ReactNode
}) {
  const router = useRouter()
  // TODO: skip to content
  // TODO: update theme-color based on dark mode
  return (
    <>
      <Head>
        <title>{[title, 'Twind'].filter(Boolean).join(' — ')}</title>
        {/* TODO: add Twind prefix */}
        <meta key="og:title" property="og:title" content={title || 'Twind'} />
        <meta key="twitter:title" name="twitter:title" content={title || 'Twind'} />

        {description && (
          <meta key="og:description" property="og:description" content={description} />
        )}
        {description && (
          <meta key="twitter:description" name="twitter:description" content={description} />
        )}

        <meta key="og:url" property="og:url" content={`https://twind.style${router.pathname}`} />
        <meta property="og:locale" content="en_US" />

        <meta property="og:type" content="article" />

        <meta
          key="og:image"
          property="og:image"
          content={loader({
            src: twindLogo.src,
            width: 1200,
            height: 630,
            fit: 'pad',
            format: 'png',
          })}
        />
        <meta
          key="twitter:image"
          name="twitter:image"
          content={loader({ src: twindLogo.src, width: 512, format: 'png' })}
        />
        <meta name="twitter:card" content="summary" />

        {/* TODO:???<meta name="twitter:site" content="@tw-in-js" />*/}

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1"></link>
        <link rel="manifest" href="/site.webmanifest?v=1"></link>
        <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1" color="#5bbad5"></link>
        <link rel="shortcut icon" href="/favicon.ico?v=1"></link>
        <meta name="msapplication-TileColor" content="#80cbc4"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
        <meta name="apple-mobile-web-app-title" content="Twind"></meta>
        <meta name="application-name" content="Twind"></meta>

        {/* TODO: update based on actual server used */}
        <link rel="preconnect" href="https://bh4d9od16a-dsn.algolia.net" crossOrigin="true"></link>
      </Head>

      {/* adjust bg and text colors in _document.tsx as well */}
      <div className="antialiased bg-brand-1 text-brand-11">
        <Header sticky={!!nav} />

        <div className="max-w-8xl mx-auto relative px-4 lg:px-10">
          {nav && (
            <div className="w-72 hidden lg:block fixed top-16 bottom-0 pb-10 pr-8 overflow-y-auto">
              {nav}
            </div>
          )}

          {aside && (
            <div className="w-72 hidden xl:block fixed top-16 bottom-0 right-[max(0px,calc(50%-45rem))] py-10 overflow-y-auto">
              {aside}
            </div>
          )}

          <div className={cx(nav && 'mx-auto max-w-prose lg:max-w-none lg:ml-80 xl:mr-80')}>
            <main>{children}</main>

            <Footer edit={edit} />
          </div>
        </div>
      </div>
    </>
  )
}