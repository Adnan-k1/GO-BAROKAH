export const AUTH_SESSION_EXPIRED_EVENT = "auth:session-expired";

const TOKEN_KEY = "token";
const USER_SESSION_KEY = "user_session";

const normalizeToken = (token) => String(token || "").replace(/^['"]|['"]$/g, "");

export const getToken = () => normalizeToken(localStorage.getItem(TOKEN_KEY));

export const setAuthSession = (user, token) => {
  if (user) localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
  if (token) localStorage.setItem(TOKEN_KEY, normalizeToken(token));
};

export const getSavedUser = () => {
  const savedUser = localStorage.getItem(USER_SESSION_KEY);
  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem(USER_SESSION_KEY);
    return null;
  }
};

export const setSavedUser = (user) => {
  if (user) localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
};

export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_SESSION_KEY);
};
