import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { Hero } from '@/components/Hero'
import { Logo, Logomark } from '@/components/Logo'
import { MobileNavigation } from '@/components/MobileNavigation'
import { Navigation } from '@/components/Navigation'
import { Prose } from '@/components/Prose'
import { Search } from '@/components/Search'
import { ThemeSelector } from '@/components/ThemeSelector'

const navigation = [
  {
    title: 'Introduction',
    links: [
      { title: 'Getting started', href: '/' },
      { title: 'Checking In', href: '/docs/checking-in' },
      { title: 'Checking Out', href: '/docs/checking-out' },
      { title: 'Where to Find Things', href: '/docs/where-to-find-things' },
    ],
  },
  {
    title: 'House Rules',
    links: [
      {
        title: 'General',
        href: '/docs/general',
      },
      {
        title: 'Parking',
        href: '/docs/parking',
      },
      { title: 'Water Usage', href: '/docs/water-usage' },
      {
        title: 'Garbage and Recycling',
        href: '/docs/garbage-and-recycling',
      },
      {
        title: 'Pets (Dog)',
        href: '/docs/pets',
      },
      {
        title: 'Furniture',
        href: '/docs/furniture',
      },
    ],
  },
  {
    title: 'Contact Information',
    links: [
      { title: 'Emergency', href: '/docs/emergency' },
      { title: 'Non-emergency', href: '/docs/non-emergency' },
    ],
  },
  {
    title: 'Helpful Tips and Other Stuff',
    links: [
      { title: 'House Stuff', href: '/docs/house-stuff' },
      { title: 'Beach Stuff', href: '/docs/beach-stuff' },
      { title: 'WiFi and Cellular Coverage', href: '/docs/wifi' },
      { title: 'Places to Eat', href: '/docs/places-to-eat' },
      { title: 'Places to Visit', href: '/docs/places-to-visit' },
    ],
  },
]

function AirBnbIcon(props) {
  return (
    <svg width="24px" height="24px" viewBox="0 0 64 64" {...props}>
      <path
        d="M56.4,51.2c-0.4,3.2-2.6,5.9-5.6,7.1c-1.5,0.6-3.1,0.8-4.6,0.6c-1.5-0.2-3.1-0.7-4.6-1.6
   c-2.2-1.2-4.4-3.1-7-5.9C38.6,46.5,41,42,42,38c0.4-1.9,0.5-3.6,0.3-5.2c-0.2-1.5-0.8-2.9-1.6-4.2c-1.9-2.7-5.1-4.3-8.6-4.3
   s-6.7,1.6-8.6,4.3c-0.9,1.2-1.4,2.6-1.6,4.2c-0.2,1.6-0.2,3.4,0.3,5.2c0.9,4,3.4,8.6,7.4,13.5c-2.5,2.8-4.8,4.7-7,5.9
   c-1.6,0.9-3.1,1.4-4.6,1.6c-1.6,0.2-3.2,0-4.6-0.6c-3-1.2-5.1-4-5.6-7.1c-0.2-1.5-0.1-3.1,0.5-4.8c0.2-0.6,0.5-1.2,0.8-2
   c0.4-1,0.9-2,1.4-3.1l0.1-0.1C14.7,32.3,19.2,23,23.9,14l0.2-0.4c0.5-0.9,1-1.9,1.5-2.8c0.5-1,1-1.9,1.7-2.7c1.3-1.5,3-2.3,4.9-2.3
   c1.9,0,3.6,0.8,4.9,2.3c0.7,0.8,1.2,1.7,1.7,2.7c0.5,0.9,1,1.9,1.5,2.8l0.2,0.4c4.6,9.1,9.2,18.4,13.4,27.5v0.1
   c0.5,1,0.9,2.1,1.4,3.1c0.3,0.7,0.6,1.3,0.8,2C56.4,48.1,56.6,49.6,56.4,51.2L56.4,51.2z M32,48.4c-3.3-4.2-5.4-8.1-6.2-11.4
   c-0.3-1.4-0.4-2.6-0.2-3.7c0.1-1,0.5-1.8,1-2.6c1.2-1.6,3.1-2.7,5.4-2.7s4.3,1,5.4,2.7c0.5,0.7,0.9,1.6,1,2.6
   c0.2,1.1,0.1,2.4-0.2,3.7C37.4,40.2,35.3,44.2,32,48.4L32,48.4z M59.5,45.2c-0.3-0.7-0.6-1.5-0.9-2.2c-0.5-1.1-1-2.1-1.4-3.1
   l-0.1-0.1c-4.2-9.2-8.7-18.4-13.5-27.6l-0.2-0.4C43,10.9,42.5,10,42,9c-0.6-1.1-1.2-2.3-2.2-3.4c-2-2.4-4.8-3.8-7.8-3.8
   c-3.1,0-5.8,1.3-7.8,3.7c-0.9,1.1-1.6,2.3-2.2,3.4c-0.5,1-1,2-1.5,2.9l-0.2,0.4c-4.7,9.2-9.3,18.4-13.5,27.6l-0.1,0.1
   c-0.4,1-0.9,2-1.4,3.1c-0.3,0.7-0.6,1.5-0.9,2.2c-0.8,2.3-1,4.4-0.7,6.6c0.7,4.6,3.7,8.4,7.9,10.1c1.6,0.7,3.2,1,4.9,1
   c0.5,0,1.1-0.1,1.6-0.1c2-0.2,4.1-0.9,6.1-2.1c2.5-1.4,4.9-3.4,7.6-6.3c2.7,2.9,5.1,4.9,7.6,6.3c2,1.2,4.1,1.8,6.1,2.1
   c0.5,0.1,1.1,0.1,1.6,0.1c1.7,0,3.4-0.3,4.9-1c4.3-1.7,7.3-5.6,7.9-10.1C60.6,49.6,60.3,47.5,59.5,45.2L59.5,45.2z"
      />
    </svg>
  )
}

function Header({ navigation }) {
  let [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent'
      )}
    >
      <div className="flex mr-6 lg:hidden">
        <MobileNavigation navigation={navigation} />
      </div>
      <div className="relative flex items-center flex-grow basis-0">
        <Link href="/" aria-label="Home page">
          <Logo className="hidden w-auto h-9 fill-slate-700 dark:fill-sky-100 lg:block" />
        </Link>
      </div>
      <div className="mr-6 -my-5 sm:mr-8 md:mr-0">{/* <Search /> */}</div>
      <div className="relative flex justify-end gap-6 basis-0 sm:gap-8 md:flex-grow">
        <ThemeSelector className="relative z-10" />
        <Link
          href="https://airbnb.com/h/truenorthdillonbeach"
          className="group"
          aria-label="AirBnb"
        >
          <AirBnbIcon className="w-6 h-6 fill-red-400 group-hover:fill-red-500 dark:group-hover:fill-red-300" />
        </Link>
      </div>
    </header>
  )
}

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id)

  let getHeadings = useCallback((tableOfContents) => {
    return tableOfContents
      .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
      .map((id) => {
        let el = document.getElementById(id)
        if (!el) return

        let style = window.getComputedStyle(el)
        let scrollMt = parseFloat(style.scrollMarginTop)

        let top = window.scrollY + el.getBoundingClientRect().top - scrollMt
        return { id, top }
      })
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0) return
    let headings = getHeadings(tableOfContents)
    function onScroll() {
      let top = window.scrollY
      let current = headings[0].id
      for (let heading of headings) {
        if (top >= heading.top) {
          current = heading.id
        } else {
          break
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
    }
  }, [getHeadings, tableOfContents])

  return currentSection
}

export function Layout({ children, title, tableOfContents }) {
  let router = useRouter()
  let isHomePage = router.pathname === '/'
  let allLinks = navigation.flatMap((section) => section.links)
  let linkIndex = allLinks.findIndex((link) => link.href === router.pathname)
  let previousPage = allLinks[linkIndex - 1]
  let nextPage = allLinks[linkIndex + 1]
  let section = navigation.find((section) =>
    section.links.find((link) => link.href === router.pathname)
  )
  let currentSection = useTableOfContents(tableOfContents)

  function isActive(section) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  return (
    <>
      <Header navigation={navigation} />

      {isHomePage && <Hero />}

      <div className="relative flex justify-center mx-auto max-w-8xl sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto py-16 pl-0.5">
            <div className="absolute bottom-0 right-0 hidden w-px h-12 top-16 bg-gradient-to-t from-slate-800 dark:block" />
            <div className="absolute bottom-0 right-0 hidden w-px top-28 bg-slate-800 dark:block" />
            <Navigation
              navigation={navigation}
              className="w-64 pr-8 xl:w-72 xl:pr-16"
            />
          </div>
        </div>
        <div className="flex-auto max-w-2xl min-w-0 px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          <article>
            {(title || section) && (
              <header className="space-y-1 mb-9">
                {section && (
                  <p className="text-sm font-medium font-display text-sky-500">
                    {section.title}
                  </p>
                )}
                {title && (
                  <h1 className="text-3xl tracking-tight font-display text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
              </header>
            )}
            <Prose>{children}</Prose>
          </article>
          <dl className="flex pt-6 mt-12 border-t border-slate-200 dark:border-slate-800">
            {previousPage && (
              <div>
                <dt className="text-sm font-medium font-display text-slate-900 dark:text-white">
                  Previous
                </dt>
                <dd className="mt-1">
                  <Link
                    href={previousPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    <span aria-hidden="true">&larr;</span> {previousPage.title}
                  </Link>
                </dd>
              </div>
            )}
            {nextPage && (
              <div className="ml-auto text-right">
                <dt className="text-sm font-medium font-display text-slate-900 dark:text-white">
                  Next
                </dt>
                <dd className="mt-1">
                  <Link
                    href={nextPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    {nextPage.title} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            {tableOfContents.length > 0 && (
              <>
                <h2
                  id="on-this-page-title"
                  className="text-sm font-medium font-display text-slate-900 dark:text-white"
                >
                  On this page
                </h2>
                <ol role="list" className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <Link
                          href={`#${section.id}`}
                          className={clsx(
                            isActive(section)
                              ? 'text-sky-500'
                              : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                          )}
                        >
                          {section.title}
                        </Link>
                      </h3>
                      {section.children.length > 0 && (
                        <ol
                          role="list"
                          className="pl-5 mt-2 space-y-3 text-slate-500 dark:text-slate-400"
                        >
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <Link
                                href={`#${subSection.id}`}
                                className={
                                  isActive(subSection)
                                    ? 'text-sky-500'
                                    : 'hover:text-slate-600 dark:hover:text-slate-300'
                                }
                              >
                                {subSection.title}
                              </Link>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}
