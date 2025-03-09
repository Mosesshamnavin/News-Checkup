export const localstorage = {
  set: (key: string, data: unknown): void => {
    const value = data !== null && typeof data === "object" ? JSON.stringify(data) : String(data);
    localStorage.setItem(key, value);
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  get: <T = string>(key: string): T | null => {
    const item = localStorage.getItem(key);
    try {
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      return item as unknown as T; // Return as string if parsing fails
    }
  },
};
