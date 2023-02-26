import { HexKey } from "@snort/nostr";
import { Latest } from "./Latest";
import { LoginSession } from "./LoginSession";

/**
 * Multi-account session store
 */
export interface SessionStore {
  /**
   * Get a session by public key
   */
  get(key?: HexKey): LoginSession | undefined;

  /**
   * Set session information for a given public key
   */
  set(key: HexKey, session: LoginSession): void;

  /**
   * Set the active session
   */
  switchSession(key: HexKey): void;

  /**
   * Load session from localStroage
   */
  load(): void;

  /**
   * Save sessions to localStorage
   */
  save(): void;

  /**
   * Create a plain object for serialization
   */
  object(): Readonly<any>;
}

/**
 * Simple session store in localStorage
 */
class LocalStorageSessionStore implements SessionStore {
  static Key = "session";
  sessions: Map<HexKey, LoginSession>;

  constructor(from?: Record<HexKey, LoginSession>) {
    this.sessions = from ? new Map(Object.entries(from)) : new Map();
  }

  get(key?: HexKey) {
    if (!key) {
      return [...this.sessions.values()].find(a => a.active);
    }
    return this.sessions.get(key);
  }

  set(key: HexKey, session: LoginSession) {
    this.sessions.set(key, session);
    this.save();
  }

  switchSession(key: HexKey) {
    this.sessions.forEach((v, k) => {
      v.active = k === key;
    });
    this.save();
  }

  load() {
    const cache = window.localStorage.getItem(LocalStorageSessionStore.Key);
    if (cache) {
      const data: Record<HexKey, LoginSession> = JSON.parse(cache);
      this.sessions = new Map(Object.entries(data));
    }
  }

  save() {
    const toWrite = Object.fromEntries(this.sessions.entries());
    window.localStorage.setItem(LocalStorageSessionStore.Key, JSON.stringify(toWrite));
  }

  object() {
    for (const s of [...this.sessions.values()]) {
    }
  }
}

export const LocalSessionStore = new LocalStorageSessionStore();
LocalSessionStore.load();
