import {
  ZObject,
  Bundle,
  HttpRequestOptions,
  HttpResponse
} from "zapier-platform-core";

export type BeforeRequestHook = (
  request: HttpRequestOptions,
  z: ZObject,
  bundle: Bundle
) => Promise<HttpRequestOptions>;

export type AfterResponseHook = (
  response: HttpResponse,
  z: ZObject,
  bundle: Bundle
) => Promise<HttpResponse>;
