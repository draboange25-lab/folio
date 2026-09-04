'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 border-b border-dark-tertiary bg-dark/80 backdrop-blur-md">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-display text-2xl font-bold text-lime">
          Folio
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/templates" className="btn-ghost text-sm">
            Explorer
          </Link>

          {session ? (
            <>
              <Link href="/dashboard" className="btn-ghost text-sm">
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                className="btn-secondary text-sm"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn-ghost text-sm">
                Connexion
              </Link>
              <Link href="/auth/signup" className="btn-primary text-sm">
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
