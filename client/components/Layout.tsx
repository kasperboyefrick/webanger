// components/Layout.tsx
import React, {ReactNode} from 'react';
import Link from 'next/link';
import LoginButton from "@/components/LoginButton";
import Profile from "@/components/Profile";

interface LayoutProps {
    children: ReactNode;
}

function Layout({children}: LayoutProps) {
    return (
        <div>
            <header className="bg-gray-900 text-white p-4">
                <div className="container mx-auto">
                    <div className="flex flex-row">
                        <div className="container mx-auto">
                            <Link href="/" className="text-2xl font-extrabold">Your App Name </Link>
                            <nav>
                                <ul className="flex space-x-4">
                                    <li>
                                        <Link href="/"> Home </Link>
                                    </li>
                                    <li>
                                        <Link href="/about"> About </Link>
                                    </li>
                                    {/* Add more navigation links for your pages */}
                                </ul>
                            </nav>
                        </div>
                        <div>
                            <Profile/>
                        </div>
                    </div>
                </div>
            </header>
            <main>{children}</main>
        </div>
    );
}

export default Layout;
