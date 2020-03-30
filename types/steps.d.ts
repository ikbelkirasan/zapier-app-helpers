import { ZObject, Bundle } from "zapier-platform-core";
import { InputField, OutputField } from "./fields";

export interface Sample {
  /**
   * An ID field is required.
   */
  id: string | number;
  [key: string]: any;
}

export type HandlerFn<T> = (z: ZObject, bundle: Bundle) => Promise<T> | T;

export interface BaseStep<T> {
  key: string;
  noun: string;
  display: {
    label: string;
    description: string;
    hidden?: boolean;
  };
  operation: {
    perform: HandlerFn<T>;
    sample: Sample;
    inputFields?: InputField[];
    outputFields?: OutputField[];
  };
}

export type Search = BaseStep<object[]>;

export type Create = BaseStep<object>;

export type Trigger = BaseStep<object[]> & {
  operation: {
    type?: "hook";
    performSubscribe?: HandlerFn<object>;
    performUnsubscribe?: HandlerFn<object>;
    performList?: HandlerFn<object[]>;
  };
};

export type SearchOrCreate = Omit<BaseStep<object>, "operation"> & {
  create: string;
  search: string;
};

// ----

interface ResourceMethodGet {
  [key: string]: any;
}

interface ResourceMethodHook {
  [key: string]: any;
}

interface ResourceMethodList {
  [key: string]: any;
}

interface ResourceMethodSearch {
  [key: string]: any;
}

interface ResourceMethodCreate {
  [key: string]: any;
}

export type Resource = {
  /**
   * A key to uniquely identify this resource.
   */
  key: string;
  /**
   * A noun for this resource that completes the sentence "create a new XXX".
   */
  noun: string;
  /**
   * How will we get a single object given a unique identifier/id?
   */
  get?: ResourceMethodGet;
  /**
   * How will we get notified of new objects? Will be turned into a trigger automatically.
   */
  hook?: ResourceMethodHook;
  /**
   * How will we get a list of new objects? Will be turned into a trigger automatically.
   */
  list?: ResourceMethodList;
  /**
   * How will we find a specific object given filters or search terms? Will be turned into a search automatically.
   */
  search?: ResourceMethodSearch;
  /**
   * How will we find create a specific object given inputs? Will be turned into a create automatically.
   */
  create?: ResourceMethodCreate;
  /**
   * What fields of data will this return?
   */
  outputFields?: OutputField[];
  /**
   * What does a sample of data look like?
   */
  sample?: Sample;
};
