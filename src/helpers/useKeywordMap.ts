import { useState, useEffect, useMemo } from "react";
import { keywordMapStore } from "./keywordMap";
import { KeywordMap } from "./types";

export const useKeywordMap = function () {
  const [keywordMap, setKeywordMap] = useState<KeywordMap | null>(keywordMapStore.getMap());
  const [loading, setLoading] = useState<boolean>(keywordMapStore.isLoading());
  const [error, setError] = useState<string | null>(keywordMapStore.getError());

  useEffect(() => {
    // Fetch if not loaded
    if (!keywordMap && !loading) {
      keywordMapStore.fetchKeywordMap();
    }

    // Make listeners for store changes
    const unsubscribe = keywordMapStore.subscribe((newMap) => {
      setKeywordMap(newMap);
      setLoading(keywordMapStore.isLoading());
      setError(keywordMapStore.getError());
    });

    return unsubscribe;
  }, [keywordMap, loading]);

  const memoizedMap = useMemo(() => ({
    keywordMap,
    loading,
    error,
    refetch: keywordMapStore.fetchKeywordMap.bind(keywordMapStore),
    clearCache: keywordMapStore.clearCache.bind(keywordMapStore)
  }), [keywordMap, loading, error]);
  return memoizedMap;
};