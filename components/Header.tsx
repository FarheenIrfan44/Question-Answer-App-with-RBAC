'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Q&A platform
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/">
                  <Button variant="ghost">Home</Button>
                </Link>
              </li>
              <li>
                <Link href="/qa">
                  <Button variant="ghost">Q&A</Button>
                </Link>
              </li>

              <li>
                <Link href="/admin">
                  <Button variant="ghost">Admin</Button>
                </Link>
              </li>
              <SignedIn>
                <li className="flex items-center cursor-pointer">
                  <UserButton />
                </li>
              </SignedIn>
              <SignedOut>
                <li className="flex items-center rounded bg-black px-2 font-bold text-white">
                  <SignInButton mode="modal" />
                </li>
              </SignedOut>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header