type JWTConfig = {
  prefix?: string;
};

export function jwt(config: JWTConfig) {
  const key = config.prefix + 'token';

  function get(): string | null {
    return localStorage.getItem(key);
  }

  function set(token: string): void {
    localStorage.setItem(key, token);
  }

  function revoke(): void {
    localStorage.removeItem(key);
  }

  return {
    get,
    set,
    revoke,
  };
}
