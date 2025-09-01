import axios from "axios";
import { Pagelink, KeywordMap } from "./types";
const { VITE_API_URL, VITE_API_TEST, TEST_MODE } = import.meta.env;
const APIURL: string = TEST_MODE === "TRUE" ? VITE_API_TEST : VITE_API_URL;

class KeywordMapStore {
  private keywordMap: KeywordMap | null = null;
  private loading: boolean = false;
  private error: string | null = null;
  private listeners: Set<(map: KeywordMap | null) => void> = new Set();

  constructor() {}

  getMap(): KeywordMap | null {
    return this.keywordMap;
  }

  isLoading(): boolean {
    return this.loading;
  }

  getError(): string | null {
    return this.error;
  }

  subscribe(listener: (map: KeywordMap | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.keywordMap));
  }

  async fetchKeywordMap(): Promise<void> {
    if (this.loading || this.keywordMap) return;

    this.loading = true;
    this.error = null;

    try {
      const results = await axios.get(`${APIURL}/pagelinks/`);
      const data: Pagelink[] = results.data;

      const keywordMap: KeywordMap = {};
      data.forEach((row) => {
        keywordMap[row.key] = row.link;
      });

      this.keywordMap = keywordMap;
      this.loading = false;
      this.notifyListeners();
    } catch (err) {
      this.loading = false;
      this.error =
        err instanceof Error ? err.message : "Failed to fetch keyword map";
      console.error("Error fetching keywordMap:", err);
    }
  }

  clearCache(): void {
    this.keywordMap = null;
    this.loading = false;
    this.error = null;
    this.notifyListeners();
  }
}

export const keywordMapStore = new KeywordMapStore();