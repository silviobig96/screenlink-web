export type GetToken = () => Promise<string | null>;

export interface ApiRequestOptions<TBody> extends Omit<RequestInit, "body"> {
  body?: TBody;
  schema?: { parse: (value: unknown) => unknown };
}

export interface ApiClient {
  request<TResponse, TBody = never>(
    path: string,
    options?: ApiRequestOptions<TBody>,
  ): Promise<TResponse>;
}
