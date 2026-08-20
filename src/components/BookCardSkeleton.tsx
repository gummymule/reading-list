import { Card, CardContent } from "./ui/card";

export function BookCardSkeleton() {
    return (
        <Card className="overflow-hidden">
            <CardContent className="flex gap-4 p-4">
                <div className="h-32 w-24 flex-shrink-0 animate-pulse rounded-md bg-muted">

                    <div className="flex flex-1 flex-col gap-2">
                        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                        <div className="mt-1 h-5 w-20 animate-pulse rounded-full bg-muted" />

                        <div className="mt-auto flex justify-end gap-1 pt-2">
                            <div className="h-6 w-6 animate-pulse rounded bg-muted" />
                            <div className="h-6 w-6 animate-pulse rounded bg-muted" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}