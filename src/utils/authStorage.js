export const AUTH_SESSION_EXPIRED_EVENT = "auth:session-expired";

const TOKEN_KEY = "token";
const USER_SESSION_KEY = "user_session";

const normalizeToken = (token) => String(token || "").replace(/^['"]|['"]$/g, "");

export const normalizeUser = (user) => {
  if (!user) return null;

  const name = user.name ?? user.username ?? "";
  const phoneNumber = user.phoneNumber ?? user.phone_number ?? null;
  const phoneNumberVerified = user.phoneNumberVerified ?? user.phone_number_verified ?? false;
  const emailVerified = user.emailVerified ?? user.email_verified ?? false;

  return {
    ...user,
    name,
    username: user.username ?? name,
    phoneNumber,
    phone_number: phoneNumber,
    phoneNumberVerified,
    phone_number_verified: phoneNumberVerified,
    emailVerified,
    email_verified: emailVerified,
  };
};

export const getToken = () => normalizeToken(localStorage.getItem(TOKEN_KEY));

export const setAuthSession = (user, token) => {
  const normalizedUser = normalizeUser(user);
  if (normalizedUser) localStorage.setItem(USER_SESSION_KEY, JSON.stringify(normalizedUser));
  if (token) localStorage.setItem(TOKEN_KEY, normalizeToken(token));
};

export const getSavedUser = () => {
  const savedUser = localStorage.getItem(USER_SESSION_KEY);
  if (!savedUser) return null;

  try {
    return normalizeUser(JSON.parse(savedUser));
  } catch {
    localStorage.removeItem(USER_SESSION_KEY);
    return null;
  }
};

export const setSavedUser = (user) => {
  const normalizedUser = normalizeUser(user);
  if (normalizedUser) localStorage.setItem(USER_SESSION_KEY, JSON.stringify(normalizedUser));
};

export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_SESSION_KEY);
};
