type TCallback = (query: string) => void;

class SearchStore {
  private query = '';
  private listeners: TCallback[] = [];

  setQuery(newQuery: string): void {
    this.query = newQuery;
    this.listeners.forEach((callback: TCallback): void => callback(newQuery));
  }

  subscribe(callback: TCallback): () => void {
    this.listeners.push(callback);
    return (): void => {
      this.listeners = this.listeners.filter(
        (fn: TCallback): boolean => fn != callback
      );
    };
  }

  getQuery(): string {
    return this.query;
  }
}

export const searchStore = new SearchStore();
