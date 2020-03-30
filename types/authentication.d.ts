import { ZObject, Bundle, HttpRequestOptions } from "zapier-platform-core";
import { InputField } from "./fields";

// ------

type BaseAuth = {
  /**
   * Authentication type
   */
  type: string;
  /**
   * Credential fields
   */
  fields?: InputField[];
  /**
   * A function that will be called when Zapier tests the authentication credentials
   */
  test: (z: ZObject, bundle: Bundle) => Promise<object>;
  /**
   * Connection label
   */
  connectionLabel: string;
};

/**
 * Basic authentication
 */
type BasicAuth = {
  type: "basic";
} & BaseAuth;

/**
 * Digest authentication
 */
type DigestAuth = {
  type: "digest";
} & BaseAuth;

/**
 * OAuth1 authentication
 */
type OAuth1Auth = {
  type: "oauth1";
  oauth1Config: {
    /**
     * Authorization URL
     */
    authorizeUrl:
      | string
      | ((z: ZObject, bundle: Bundle) => Promise<string> | string)
      | (HttpRequestOptions & {
          url: string;
          params: {
            oauth_token: string;
          };
        });
    /**
     * Get request token
     */
    getRequestToken:
      | ((z: ZObject, bundle: Bundle) => Promise<object>)
      | (HttpRequestOptions & {
          url: string;
          auth: {
            oauth_consumer_key: string;
            oauth_consumer_secret: string;
            oauth_signature_method: string;
            oauth_callback: string;
            oauth_version: "1.0";
          };
        });
    /**
     * Get access token
     */
    getAccessToken:
      | ((z: ZObject, bundle: Bundle) => Promise<object>)
      | (HttpRequestOptions & {
          url: string;
          auth: {
            oauth_consumer_key: string;
            oauth_consumer_secret: string;
            oauth_token: string;
            oauth_token_secret: string;
            oauth_verifier: string;
          };
        });
  };
} & BaseAuth;

/**
 * OAuth2 authentication
 */
type OAuth2Auth = {
  type: "oauth2";
  /**
   * OAuth2 configuration
   */
  oauth2Config: {
    /**
     * Authorization URL
     */
    authorizeUrl:
      | string
      | ((z: ZObject, bundle: Bundle) => Promise<string> | string)
      | (HttpRequestOptions & {
          url: string;
          params: {
            client_id: string;
            state: string;
            redirect_uri: string;
            response_type: "code";
          };
        });

    /**
     * Fetch an access token
     */
    getAccessToken: (
      z: ZObject,
      bundle: Bundle
    ) => Promise<{
      /**
       * This property can be retrieved from `bundle.authData` later on.
       */
      [key: string]: any;
      /**
       * Access Token
       */
      access_token: string;
      /**
       * Refresh Token
       */
      refresh_token?: string;
    }>;
    /**
     * Refresh the access token
     */
    refreshAccessToken?: (z: ZObject, bundle: Bundle) => Promise<object>;
    /**
     * Should the access token be refreshed automatically when the request throws a **401** error?
     * @defaultValue true
     */
    autoRefresh?: boolean;
    /**
     * OAuth2 scopes
     */
    scope?: string;
  };
} & BaseAuth;

/**
 * Session authentication
 */
type SessionAuth = {
  type: "session";
  sessionConfig: {
    perform: (z: ZObject, bundle: Bundle) => Promise<object>;
  };
} & BaseAuth;

/**
 * Custom authentication
 */
type CustomAuth = {
  type: "custom";
} & BaseAuth;

/**
 * Authentication
 */
type Authentication =
  | BasicAuth
  | DigestAuth
  | OAuth1Auth
  | OAuth2Auth
  | SessionAuth
  | CustomAuth;
