const OTP_COOLDOWN_PREFIX = "otp_cooldown_until";
const OTP_INITIAL_REQUEST_PREFIX = "otp_initial_request_attempted";

const normalizeIdentifier = (identifier) => String(identifier || "").trim().toLowerCase();

const getStorageKey = (channel, identifier) => {
  const normalizedIdentifier = normalizeIdentifier(identifier);
  return `${OTP_COOLDOWN_PREFIX}_${channel}_${encodeURIComponent(normalizedIdentifier)}`;
};

const getInitialRequestKey = (channel, identifier) => {
  const normalizedIdentifier = normalizeIdentifier(identifier);
  return `${OTP_INITIAL_REQUEST_PREFIX}_${channel}_${encodeURIComponent(normalizedIdentifier)}`;
};

export const hasOtpInitialRequest = (channel, identifier) => {
  if (!normalizeIdentifier(identifier)) return false;
  return sessionStorage.getItem(getInitialRequestKey(channel, identifier)) === "true";
};

export const markOtpInitialRequest = (channel, identifier) => {
  if (normalizeIdentifier(identifier)) {
    sessionStorage.setItem(getInitialRequestKey(channel, identifier), "true");
  }
};

export const clearOtpInitialRequest = (channel, identifier) => {
  if (normalizeIdentifier(identifier)) {
    sessionStorage.removeItem(getInitialRequestKey(channel, identifier));
  }
};

export const getOtpCooldownUntil = (channel, identifier) => {
  if (!normalizeIdentifier(identifier)) return 0;

  const key = getStorageKey(channel, identifier);
  const storedUntil = Number(sessionStorage.getItem(key));

  if (!Number.isFinite(storedUntil) || storedUntil <= Date.now()) {
    sessionStorage.removeItem(key);
    return 0;
  }

  return storedUntil;
};

export const getOtpCooldownSeconds = (channel, identifier) => {
  const cooldownUntil = getOtpCooldownUntil(channel, identifier);
  return cooldownUntil ? Math.ceil((cooldownUntil - Date.now()) / 1000) : 0;
};

export const setOtpCooldown = (channel, identifier, seconds) => {
  const duration = Math.ceil(Number(seconds));
  if (!normalizeIdentifier(identifier) || !Number.isFinite(duration) || duration <= 0) {
    return 0;
  }

  const cooldownUntil = Date.now() + duration * 1000;
  sessionStorage.setItem(getStorageKey(channel, identifier), String(cooldownUntil));
  return cooldownUntil;
};

export const clearOtpCooldown = (channel, identifier) => {
  if (normalizeIdentifier(identifier)) {
    sessionStorage.removeItem(getStorageKey(channel, identifier));
  }
};

export const getRetryAfterSeconds = (error, fallbackSeconds = 60) => {
  const bodyValue = Number(error?.response?.data?.retry_after_seconds);
  const headerValue = Number(
    error?.response?.headers?.["retry-after"] ??
      error?.response?.headers?.get?.("retry-after"),
  );

  if (Number.isFinite(bodyValue) && bodyValue > 0) return Math.ceil(bodyValue);
  if (Number.isFinite(headerValue) && headerValue > 0) return Math.ceil(headerValue);
  return fallbackSeconds;
};

export const getOtpRequestErrorMessage = (error, fallbackMessage) => {
  const status = error?.response?.status;

  if (status === 429) return "Silakan tunggu sebelum meminta OTP lagi";
  if (status === 503) return "Layanan OTP sedang tidak tersedia";

  return error?.response?.data?.message || fallbackMessage;
};

export const formatOtpCooldown = (seconds) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
};
