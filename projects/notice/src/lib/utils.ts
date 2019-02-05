/**
 * Generates random id
 */
export function uuid(): number {
  return Math.floor(Math.random() * (Date.now() - 1)) + 1;
}

/**
 * Simple is object check.
 */
export function isObject(item: Object): boolean {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}

/**
 * Deep merge objects.
 */
export function mergeDeep(...sources: Object[]): Object {
  const target = {};
  if (!sources.length) {
    return target;
  }

  while (sources.length > 0) {
    const source = sources.shift();
    if (isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          target[key] = mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, {[key]: source[key]});
        }
      }
    }
  }
  return target;
}

export function animate(start: number, duration: number, callback: (currentValue: number, progress: number) => any): void {
  let endTime;
  requestAnimationFrame((timestamp) => endTime = timestamp + duration);
  const calculate = () => {
    requestAnimationFrame((timestamp) => {
      const runtime = timestamp - endTime;
      const progress = Math.min(runtime / duration, 1) + start;
      if (runtime < duration) {
        if (callback(+(100 * progress).toFixed(2), progress)) {
          calculate();
        }
      }
    });
  };
}
