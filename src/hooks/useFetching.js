import { useState } from "react";

export function useFetching(callback) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetching(...args) {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error]
}
