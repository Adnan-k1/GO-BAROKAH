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
