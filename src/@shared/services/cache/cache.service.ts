import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CacheService {
    private cache = new Map<string, any>();

    constructor() {}

    // Method to check if the value exists in the cache
    has(key: string): boolean {
        return this.cache.has(key);
    }

    // Method to get a value from the cache
    get(key: string): any {
        return this.cache.get(key);
    }

    // Method to set a value in the cache
    set(key: string, value: any): void {
        this.cache.set(key, value);
    }

    // Method to remove a value from the cache
    delete(key: string): void {
        this.cache.delete(key);
    }

    // Method to clear the entire cache
    clear(): void {
        this.cache.clear();
    }
}
