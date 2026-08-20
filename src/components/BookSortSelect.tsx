'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const sortOptions = [
    { value: 'newest', label: 'Newest Added' },
    { value: 'oldest', label: 'Oldest Added' },
    { value: 'title-asc', label: 'Title (A-Z)' },
    { value: 'title-desc', label: 'Title (Z-A)' },
];

export function BookSortSelect() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get('sort') ?? 'newest';

    const handleChange = (value: string | null) => {
        if (value === null) return;
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'newest') {
            params.delete('sort');
        } else {
            params.set('sort', value);
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Select value={currentSort} onValueChange={handleChange}>
            <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}