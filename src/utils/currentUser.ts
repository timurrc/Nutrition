const STORAGE_KEY = "currentUserId";

export function getCurrentUserId(): number | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  const id = Number(raw);
  return Number.isFinite(id) ? id : null;
}

export function setCurrentUserId(userId: number): void {
  localStorage.setItem(STORAGE_KEY, String(userId));
}

export function isAuthenticated(): boolean {
  return getCurrentUserId() !== null;
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY);
}
