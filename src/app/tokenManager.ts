// tokenManager.ts — Markazlashtirilgan token boshqaruvi
const TOKENS_KEY = 'auth_tokens';

interface StoredTokens {
  access_token: string;
  refresh_token: string;
}

// In-memory cache — localStorage'dan har safar o'qimaslik uchun
let cachedTokens: StoredTokens | null = null;
let isLoaded = false;

const loadFromStorage = (): StoredTokens | null => {
  if (isLoaded) return cachedTokens;
  try {
    const raw = localStorage.getItem(TOKENS_KEY);
    cachedTokens = raw ? JSON.parse(raw) : null;
  } catch {
    cachedTokens = null;
  }
  isLoaded = true;
  return cachedTokens;
};

const writeToStorage = (tokens: StoredTokens | null) => {
  cachedTokens = tokens;
  isLoaded = true;
  if (tokens) {
    localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  } else {
    localStorage.removeItem(TOKENS_KEY);
  }
};

export const getAccessToken = (): string | null => {
  return loadFromStorage()?.access_token ?? null;
};

export const getRefreshToken = (): string | null => {
  return loadFromStorage()?.refresh_token ?? null;
};

export const saveTokens = (accessToken: string, refreshToken?: string) => {
  const current = loadFromStorage();
  writeToStorage({
    access_token: accessToken,
    refresh_token: refreshToken ?? current?.refresh_token ?? '',
  });
};

export const clearTokens = () => {
  writeToStorage(null);
};

// Eski 'rtk_cache' dan tokenlarni migrate qilish (bir martalik)
export const migrateOldCache = () => {
  const OLD_KEY = 'rtk_cache';
  try {
    const raw = localStorage.getItem(OLD_KEY);
    if (!raw) return;
    const old = JSON.parse(raw);
    const access = old?.auth_token;
    const refresh = old?.refresh_token;
    if (access && !loadFromStorage()) {
      saveTokens(access, refresh);
    }
    localStorage.removeItem(OLD_KEY);
  } catch {
    localStorage.removeItem(OLD_KEY);
  }
};
