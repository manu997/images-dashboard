global.IntersectionObserver = class {
  root: Element | null = null;
  rootMargin = "0px";
  thresholds: ReadonlyArray<number> = [];

  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
};
