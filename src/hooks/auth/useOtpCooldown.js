import { useCallback, useEffect, useState } from "react";
import {
  clearOtpCooldown,
  getOtpCooldownSeconds,
  setOtpCooldown,
} from "../../utils/otpCooldown";

export const useOtpCooldown = (channel, identifier) => {
  const normalizedIdentifier = String(identifier || "").trim();
  const hasIdentifier = Boolean(normalizedIdentifier);
  const [cooldownSeconds, setCooldownSeconds] = useState(() =>
    hasIdentifier ? getOtpCooldownSeconds(channel, normalizedIdentifier) : 0,
  );

  useEffect(() => {
    if (!hasIdentifier) return undefined;

    const updateCooldown = () => {
      setCooldownSeconds(getOtpCooldownSeconds(channel, normalizedIdentifier));
    };

    const initialUpdateId = window.setTimeout(updateCooldown, 0);
    const intervalId = window.setInterval(updateCooldown, 1000);

    return () => {
      window.clearTimeout(initialUpdateId);
      window.clearInterval(intervalId);
    };
  }, [channel, hasIdentifier, normalizedIdentifier]);

  const startCooldown = useCallback(
    (seconds) => {
      if (!hasIdentifier) return;

      setOtpCooldown(channel, normalizedIdentifier, seconds);
      setCooldownSeconds(getOtpCooldownSeconds(channel, normalizedIdentifier));
    },
    [channel, hasIdentifier, normalizedIdentifier],
  );

  const clearCooldown = useCallback(() => {
    if (!hasIdentifier) return;

    clearOtpCooldown(channel, normalizedIdentifier);
    setCooldownSeconds(0);
  }, [channel, hasIdentifier, normalizedIdentifier]);

  const visibleCooldownSeconds = hasIdentifier ? cooldownSeconds : 0;

  return {
    cooldownSeconds: visibleCooldownSeconds,
    isOnCooldown: visibleCooldownSeconds > 0,
    startCooldown,
    clearCooldown,
  };
};
