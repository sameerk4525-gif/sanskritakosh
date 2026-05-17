"use client";

export function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse-gentle bg-border rounded-lg ${className}`} />
    );
}

export function SkeletonCard() {
    return (
        <div className="card space-y-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
        </div>
    );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
    return (
        <div className="space-y-3">
            {Array(lines)
                .fill(0)
                .map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                ))}
        </div>
    );
}
