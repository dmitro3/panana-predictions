'use client';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { redirect, usePathname } from 'next/navigation';
import { URLPattern } from 'next/server';
import { useEffect } from 'react';

export interface URLPatternInit {
    baseURL?: string;
    username?: string;
    password?: string;
    protocol?: string;
    hostname?: string;
    port?: string;
    pathname?: string;
    search?: string;
    hash?: string;
}

export interface RouteGuardProps {
    protectedRoutes: { pattern: URLPatternInit, redirectPath: string }[];
}

export function RouteGuard(props: RouteGuardProps) {
    const { protectedRoutes } = props;
    const pathname = usePathname();
    const { connected } = useWallet();

    useEffect(() => {
        const protectedRoute = protectedRoutes.find(protectedRoute => new URLPattern(protectedRoute.pattern).test(`https://test.org${pathname}`));
        if (protectedRoute && !connected) {
            redirect(protectedRoute.redirectPath);

        }
    }, [protectedRoutes, pathname, connected])
    return <></>;
}