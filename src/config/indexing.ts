const UNINDEXED_ROUTES = ['search'];

export const isUnindexedPath = (pathname: string): boolean =>
  UNINDEXED_ROUTES.includes(pathname.split('/').filter(Boolean).slice(1).join('/'));
