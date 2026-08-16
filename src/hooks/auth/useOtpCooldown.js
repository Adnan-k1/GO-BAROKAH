import { useCallback, useEffect, useState } from "react";
import {
  clearOtpCooldown,
  getOtpCooldownSeconds,
  setOtpCooldown,
} from "../../utils/otpCooldown";

export const useOtpCooldown = (channel, identifier) => {
  const [cooldownSeconds, setCooldownSeconds] = useState(() =>
    getOtpCooldownSeconds(channel, identifier),
  );

  useEffect(() => {
    const updateCooldown = () => {
      setCooldownSeconds(getOtpCooldownSeconds(channel, identifier));
    };

    updateCooldown();
    const intervalId = window.setInterval(updateCooldown, 1000);

    return () => window.clearInterval(intervalId);
  }, [channel, identifier]);

  const startCooldown = useCallback(
    (seconds) => {
      setOtpCooldown(channel, identifier, seconds);
      setCooldownSeconds(getOtpCooldownSeconds(channel, identifier));
    },
    [channel, identifier],
  );

  return {
    cooldownSeconds,
    isOnCooldown: cooldownSeconds > 0,
    startCooldown,
    clearCooldown: useCallback(() => {
      clearOtpCooldown(channel, identifier);
      setCooldownSeconds(0);
    }, [channel, identifier]),
  };
};
