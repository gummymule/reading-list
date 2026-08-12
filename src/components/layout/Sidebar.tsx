'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, BookOpen, CheckCircle2, Library, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookCounts } from "@/hooks/useBookCounts";

const navItems = [
    { label: 'All Books', href: '/', icon: Library, key: 'all' as const },
    { label: 'Currently Reading', href: '/currently-reading', icon: BookOpen, key: 'currently-reading' as const },
    { label: 'Want to Read', href: '/want-to-read', icon: Bookmark, key: 'want-to-read' as const },
    { label: 'Read', href: '/read', icon: CheckCircle2, key: 'read' as const },
    { label: 'Favorites', href: '/favorites', icon: Star, key: 'favorites' as const },
];

export function Sidebar() {
    const pathname = usePathname();
    const { counts, isLoading } = useBookCounts();
    return (
        <aside className="flex h-screen w-64 flex-col border-r bg-background p-4">
            <div className="mb-8 flex items-center gap-2 px-2">
                <BookOpen className="h-6 w-6" />
                <span className="font-serif text-lg font-bold">
                    Bookshelf
                </span>
            </div>

            <p className="mb-2 px-2 text-xs font-medium tracking-wide text-muted-foreground">
                LIBRARY
            </p>

            <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                    const isActive = pathname == item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center justify-between rounded-md px-2 py-2 text-sm transition-colors',
                                isActive
                                    ? 'bg-orange-50 font-medium text-orange-700'
                                    : 'text-foreground hover:bg-muted'
                            )}
                        >
                            <span className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {isLoading ? '...' : counts[item.key]}
                            </span>
                        </Link>
                    );
                })}

                <div className="mt-auto border-t pt-4">
                    <p className="mb-2 px-2 text-xs font-medium tracking-wide text-muted-foreground">
                        READING GOALS
                    </p>
                    <div className="px-2">
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold">
                                15
                            </span>
                            <span className="text-sm text-muted-foreground">
                                / 24 books
                            </span>
                            <span className="ml-auto text-sm text-muted-foreground">
                                2026
                            </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full w-[63%] rounded-full bg-orange-600" />
                        </div>
                        <p className="mt-1.5 text-xs text-muted-foreground">63% complete · 9 books to go</p>
                    </div>
                </div>
            </nav>
        </aside>
    )
}