import { BookX, SearchX } from "lucide-react";

interface EmptyStateProps {
    variant?: 'no-data' | 'no-results';
    title: string;
    description?: string;
}

export function EmptyState({ variant = 'no-data', title, description }: EmptyStateProps) {
    const Icon = variant === 'no-results' ? SearchX : BookX;

    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
            <Icon className="h-10 w-10 text-muted-foreground/50" />
            <p className="mt-4 font-serif text-lg font-medium">{title}</p>
            {description && (
                <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    )
}