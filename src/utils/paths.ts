function normalizeBase(base: string): string {
  if (!base || base === '/') {
    return '/';
  }

  return base.endsWith('/') ? base : `${base}/`;
}

const base = normalizeBase(import.meta.env.BASE_URL);

export function withBase(path: string): string {
  if (base === '/') {
    return path.startsWith('/') ? path : `/${path}`;
  }

  const basePath = base.endsWith('/') ? base.slice(0, -1) : base;

  if (path === '/') {
    return `${basePath}/`;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

export function stripBase(pathname: string): string {
  if (base === '/') {
    return pathname || '/';
  }

  const basePath = base.endsWith('/') ? base.slice(0, -1) : base;

  if (pathname === basePath || pathname === `${basePath}/`) {
    return '/';
  }

  if (pathname.startsWith(`${basePath}/`)) {
    const stripped = pathname.slice(basePath.length);
    return stripped || '/';
  }

  return pathname;
}
