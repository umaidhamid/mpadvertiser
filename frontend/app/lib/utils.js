import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind class names
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount, currency = "USD", options = {}) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        ...options,
    }).format(amount);
}

// Generate unique ID
export function generateUniqueId(prefix = "id") {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

// Truncate text
export function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
}

// Format date
export function formatDate(date, options = {}) {
    return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        ...options,
    }).format(date);
}

// Debounce
export function debounce(func, wait) {
    let timeout = null;

    return function (...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);
    };
}

// Throttle
export function throttle(func, limit) {
    let inThrottle = false;

    return function (...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;

            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}