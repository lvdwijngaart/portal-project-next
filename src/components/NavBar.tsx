// src/components/Navbar.tsx
"use client"

import React from 'react';
import './NavBar.css';
// import { enabledModules } from '../../config/modules.config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '@/features/auth/services/auth';
import { LogoutButton } from '@/features/auth/components/logout-button';
import Image from 'next/image';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

type Props = { session: Session | null }

export default function NavBar() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  const adminToggleLink = isAdminPage ? '/' : '/admin';

  const { data: session, status } = useSession()

  console.log(session?.user);

  const AdminPages = [
    {label: '🏠 Home', route: '/admin'},
    {label: '👥 Members', route: '/admin/members'},
    {label: '🏆 Teams', route: '/admin/teams' },
    {label: '🎉 Activities', route: '/admin/activities' },
    {label: '⚙️ Settings', route: '/admin/settings' },
  ];

  const UserPages = [
    {label: '🏠 Home', route: '/'},
    {label: '📚 Useful Docs', route: '/documents'},
    {label: '🏆 Teams', route: '/teams' },
    {label: '🎉 Activities', route: '/activities' },
    {label: '⚙️ Settings', route: '/settings' },
  ];

  return (
    <div>
      <aside className={`sidebar${isAdminPage ? ' admin' : ''}`}>
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Club Logo" />
          <h2>Club Portal</h2>
        </div>
        <nav className="sidebar-nav">
          {(isAdminPage ? AdminPages : UserPages).map((page) => (
            <Link href={page.route} key={page.label}>
              {page.label}
            </Link>
          ))}

          <div className="admin-button-container">
            <Link href={adminToggleLink} className="admin-button">
                {isAdminPage ? 'Exit Admin' : '🔑 Admin'}
            </Link>
          </div>
        </nav>

        
        {/* Client-side content that doesn't use Node.js modules */}
        {session && session.user && 
          (
            <div className="logout-page">
              <h1>Hey {session.user.name}!</h1>
              {session.user.image && 
                <Image src={session.user.image} width={48} height={48} alt="Avatar"/>
              }
              <LogoutButton />
            </div>
          )
        }        

        <div className="sidebar-footer">
          <p>© 2025 Club Portal</p>
          <p>Version 1.0.0</p>
        </div>
      </aside>

        {/* {enabledModules
          .filter(mod => mod.showInSidebar && mod.route)
          .map(mod => (
            <Link to={mod.route || '/'} key={mod.id}>
              {mod.icon} {mod.label}
            </Link>
        ))} */}
    </div>
  );
}