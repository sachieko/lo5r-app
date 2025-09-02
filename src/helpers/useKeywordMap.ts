import { useState, useEffect, } from "react";
import { keywordMapStore } from "./keywordMap";
import { KeywordMap } from "./types";

export const useKeywordMap = function () {
  const [keywordMap, setKeywordMap] = useState<KeywordMap | null>(
    keywordMapStore.getMap()
  );
  const [loading, setLoading] = useState<boolean>(keywordMapStore.isLoading());
  const [error, setError] = useState<string | null>(keywordMapStore.getError());

  useEffect(() => {
    const unsubscribe = keywordMapStore.subscribe((newMap) => {
      setKeywordMap(newMap);
      setLoading(keywordMapStore.isLoading());
      setError(keywordMapStore.getError());
    });

    if (!keywordMap && !loading) {
      keywordMapStore.fetchKeywordMap();
    }
    return unsubscribe;
  }, []);

  return {
    keywordMap,
    loading,
    error,
    fetchKeywordMap: keywordMapStore.fetchKeywordMap.bind(keywordMapStore),
    refreshInBackground: keywordMapStore.refreshInBackground.bind(keywordMapStore),
    clearCache: keywordMapStore.clearCache.bind(keywordMapStore)
  };
};
