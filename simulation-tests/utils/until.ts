import { delay } from "@std/async/delay";

type Opts = { maxAttempts?: number; attemptIntervalMs?: number };

export const tryUntil = async <
  Fn extends (...args: never[]) => Promise<unknown> | unknown
>(
  fn: Fn,
  opts: Opts = { maxAttempts: 5, attemptIntervalMs: 50 }
) => {
  const { maxAttempts, attemptIntervalMs } = {
    maxAttempts: 5,
    attemptIntervalMs: 50,
    ...opts,
  };
  let attempts = 0;
  while (true) {
    attempts++;
    const result = await fn();
    if (!!result || attempts > maxAttempts) return result;
    await delay(attemptIntervalMs);
  }
};
