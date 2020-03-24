const setHeaders = (
  request: RequestInit,
  headers: { [key: string]: string },
) => {
  if (!headers && request.headers) {
    (request.headers as Headers).append('Accept', 'application/json');
    (request.headers as Headers).append('Content-Type', 'application/json');
    (request.headers as Headers).append(
      'Transfer-Encoding',
      'application/json',
    );
  }

  if (headers && request.headers) {
    Object.keys(headers).forEach((name) => (request.headers as Headers).set(name, headers[name]));
  }
};

const doFetch = (
  url: string,
  method: string,
  body: any,
  headers?: { [key: string]: string },
) => {
  const request: RequestInit = {
    method,
    headers: new Headers(),
    credentials: 'same-origin',
  };

  if (headers) {
    setHeaders(request, headers);
  }

  if (body) {
    request.body = body;
  }

  return fetch(url, request);
};

const OkResponseWithJson = [200, 201];
const OkResponseNoJson = [202];

const doJsonFetch = async <T>(
  url: string,
  method: string,
  body: any,
  headers?: { [key: string]: string },
): Promise<T> => {
  const response = await doFetch(url, method, JSON.stringify(body), headers);
  if (response.status >= 200 && response.status < 300) {
    if (OkResponseWithJson.includes(response.status)) {
      return response.json();
    }
    if (OkResponseNoJson.includes(response.status)) {
      // eslint-disable-next-line
      return;
    }
  }
  throw new Error(`${response.status}-${response.statusText}`);
};

export const jsonGet = <T>(
  url: string,
  body?: string,
  headers?: { [key: string]: string },
) => doJsonFetch<T>(url, 'GET', body, headers);

export const jsonPost = <T>(
  url: string,
  body?: any,
  headers?: { [key: string]: string },
) => doJsonFetch<T>(url, 'POST', body, headers);
export const jsonPut = <T>(
  url: string,
  body?: any,
  headers?: { [key: string]: string },
) => doJsonFetch<T>(url, 'PUT', body, headers);
