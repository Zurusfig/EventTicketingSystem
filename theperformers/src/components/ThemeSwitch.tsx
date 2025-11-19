"use client";

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ThemeSwitch() {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = window.localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark')
    root.classList.add(theme)

    window.localStorage.setItem('theme', theme)
  }, [theme, mounted])

  if (!mounted) return <div className="h-6 w-11" />

  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className={classNames(
        isLight ? 'bg-yellow-500' : 'bg-slate-700',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out items-center'
      )}
    >
      <span className="sr-only">Toggle Theme</span>
      <span
        className={classNames(
          isLight ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-flex h-4 w-4 transform items-center justify-center rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        {isLight ? (
          <Sun className="h-3 w-3 text-yellow-500" />
        ) : (
          <Moon className="h-3 w-3 text-slate-700" />
        )}
      </span>
    </button>
  )
}