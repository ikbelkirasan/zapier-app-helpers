import { Authentication } from "./authentication";
import { BeforeRequestHook, AfterResponseHook } from "./hooks";
import { Trigger, Create, Search, SearchOrCreate, Resource } from "./steps";

export interface App {
  /**
   * App version
   */
  version: string;
  /**
   * Platform version
   */
  platformVersion: string;
  /**
   * Authentication handler
   */
  authentication?: Authentication;
  /**
   * Before request hooks
   */
  beforeRequest?: BeforeRequestHook[];
  /**
   * After response hooks
   */
  afterResponse?: AfterResponseHook[];
  /**
   * Trigger steps
   */
  triggers?: {
    [key: string]: Trigger;
  };
  /**
   * Create action steps
   */
  creates?: {
    [key: string]: Create;
  };
  /**
   * Search action steps
   */
  searches?: {
    [key: string]: Search;
  };
  /**
   * Search or Create steps
   */
  searchOrCreates?: {
    [key: string]: SearchOrCreate;
  };
  /**
   * Resources
   */
  resources?: {
    [key: string]: Resource;
  };
}
