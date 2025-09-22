const USER_KEY = "notefy.user";

export interface NotefyUser {
  username: string;
  createdAt: string;
}

export const getCurrentUser = (): NotefyUser | null => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as NotefyUser) : null;
  } catch {
    return null;
  }
};

export const login = (username: string): NotefyUser => {
  const user: NotefyUser = { username, createdAt: Date.now().toString() };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const isLoggedIn = (): boolean => !!getCurrentUser();


