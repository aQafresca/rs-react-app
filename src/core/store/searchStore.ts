type TCallback = (query: string) => void;

const createSearchStore = () => {
  let query = '';
  const listeners: TCallback[] = [];

  return {
    setQuery(newQuery: string): void {
      query = newQuery;
      listeners.forEach((callback: TCallback): void => callback(newQuery));
    },

    subscribe(callback: TCallback): () => void {
      listeners.push(callback);
      return (): void => {
        listeners.splice(listeners.indexOf(callback), 1);
      };
    },

    getQuery(): string {
      return query;
    },
  };
};

export const searchStore = createSearchStore();
