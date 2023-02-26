import { HexKey, RelaySettings, u256 } from "@snort/nostr";

export interface LoginSession {
  /**
   * Public key for this session
   */
  publicKey: HexKey;

  /**
   * Currently active login
   */
  active: boolean;

  /**
   * If login session is read only
   */
  readOnly: boolean;

  /**
   * Followed pubkeys
   */
  follows: Array<HexKey>;

  /**
   * Users relays
   */
  relays: Record<string, RelaySettings>;

  /**
   * Followed tags
   */
  tags: Array<string>;

  /**
   * Pinned events
   */
  pinned: Array<u256>;

  /**
   * Bookmarked events
   */
  bookmarked: Array<u256>;

  /**
   * Muted public keys
   */
  muted: Array<HexKey>;

  /**
   * Blocked public keys
   */
  blocked: Array<HexKey>;

  /**
   * The private key for this session
   */
  privateKey?: HexKey;
}
