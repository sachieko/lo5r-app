import axios from "axios";
import { Pagelink, KeywordMap } from "./types";
const { VITE_API_URL, VITE_API_TEST, TEST_MODE } = import.meta.env;
const APIURL: string = TEST_MODE === "TRUE" ? VITE_API_TEST : VITE_API_URL;

interface StoredData {
  keywordMap: KeywordMap;
  timestamp: number;
  version: string;
}

class KeywordMapStore {
  private keywordMap: KeywordMap | null = null;
  private loading: boolean = false;
  private error: string | null = null;
  private listeners: Set<(map: KeywordMap | null) => void> = new Set();
  private storageKey = 'l5rsrd_keyword_map';
  private isStorageAvailable = false;
  private cacheExpiryMs = 24 * 60 * 60 * 1000; // 24 hours in ms
  private readonly DATA_VERSION = '1.0'; // Increment if data structure changes

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    this.checkStorageAvailability();
    
    const storedData = this.loadFromStorage();
    
    if (storedData && this.isCacheValid(storedData.timestamp)) {
      this.keywordMap = storedData.keywordMap;
      this.notifyListeners();
    }
  }

  private checkStorageAvailability(): void {
    try {
      const testKey = `test_${Date.now()}`;
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      this.isStorageAvailable = true;
    } catch (e) {
      this.isStorageAvailable = false;
      console.warn('localStorage is not available:', e);
    }
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.cacheExpiryMs;
  }

  private loadFromStorage(): StoredData | null {
    if (!this.isStorageAvailable) return null;

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return null;

      const parsed: StoredData = JSON.parse(stored);
      
      if (parsed.version !== this.DATA_VERSION || !parsed.keywordMap || !parsed.timestamp) {
        console.warn('Invalid cache structure, clearing cache');
        this.clearStorage();
        return null;
      }

      return parsed;
    } catch (error) {
      console.warn('Failed to load L5RSRDs keyword Map from storage', error);
      this.clearStorage();
      return null;
    }
  }

  private saveToStorage(): void {
    if (!this.isStorageAvailable || !this.keywordMap) return;

    try {
      const data: StoredData = {
        keywordMap: this.keywordMap,
        timestamp: Date.now(),
        version: this.DATA_VERSION
      };

      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save L5RSRDs keyword Map to localStorage:', error);
    }
  }

  async fetchKeywordMap(forceRefresh: boolean = false): Promise<void> {
    if (this.loading) return;

    // Check if we can use cached data
    if (!forceRefresh && this.keywordMap) {
      const storedData = this.loadFromStorage();
      if (storedData && this.isCacheValid(storedData.timestamp)) {
        return; // Cache is valid, no need to fetch
      }
    }

    this.loading = true;
    this.error = null;
    this.notifyListeners();

    try {
      const results = await axios.get(`${APIURL}/pagelinks/`);
      const data: Pagelink[] = results.data;

      const keywordMap: KeywordMap = {};
      data.forEach((row) => {
        keywordMap[row.key] = row.link;
      });

      this.keywordMap = keywordMap;
      this.saveToStorage();
    } catch (err) {
      this.error = err instanceof Error ? err.message : "Failed to fetch L5RSRDs keyword map";
      console.error("Error fetching L5RSRDs keyword Map:", err);
      
      // If we have stale data, keep it but notify about the error
      if (!this.keywordMap) {
        this.keywordMap = null;
      }
    } finally {
      this.loading = false;
      this.notifyListeners();
    }
  }

  async refreshInBackground(): Promise<void> {
    if (this.loading) return;

    try {
      const results = await axios.get(`${APIURL}/pagelinks/`);
      const data: Pagelink[] = results.data;

      const newKeywordMap: KeywordMap = {};
      data.forEach((row) => {
        newKeywordMap[row.key] = row.link;
      });

      // Only update if data changed
      if (JSON.stringify(this.keywordMap) !== JSON.stringify(newKeywordMap)) {
        this.keywordMap = newKeywordMap;
        this.saveToStorage();
        this.notifyListeners();
      }
    } catch (err) {
      console.error("Background refresh failed:", err);
    }
  }

  private clearStorage(): void {
    if (this.isStorageAvailable) {
      localStorage.removeItem(this.storageKey);
      console.log("localStorage data from L5RSRD cleared")
    }
  }

  clearCache(): void {
    this.keywordMap = null;
    this.loading = false;
    this.error = null;
    this.clearStorage();
    this.notifyListeners();
  }

  getMap(): KeywordMap | null { return this.keywordMap; }
  isLoading(): boolean { return this.loading; }
  getError(): string | null { return this.error; }
  
  subscribe(listener: (map: KeywordMap | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.keywordMap));
  }
}

export const keywordMapStore = new KeywordMapStore();
