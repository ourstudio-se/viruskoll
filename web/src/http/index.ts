const setHeaders = (request, headers) => {
  if (!headers) {
    request.headers.append('Accept', 'application/json');
    request.headers.append('Content-Type', 'application/json');
    request.headers.append('Transfer-Encoding', 'application/json');
  }

  if (headers) {
    Object
      .keys(headers)
      .forEach(name => request.headers.set(name, headers[name]));
  }
};

const doFetch = (url, method, body, headers) => {
  const request: RequestInit = {
    method,
    headers: new Headers(),
    credentials: 'same-origin',
  };

  setHeaders(request, headers);

  if (body) {
    request.body = body;
  }

  return fetch(url, request);
};

const OkResponseWithJson = [200, 201];
const OkResponseNoJson = [202];

const doJsonFetch = async <T>(url, method, body, headers): Promise<T> => {
  const response = await doFetch(url, method, JSON.stringify(body), headers)
  if (response.status >= 200 && response.status < 300) {
    if (OkResponseWithJson.includes(response.status)) {
      return await response.json();
    }
    if (OkResponseNoJson.includes(response.status)) {
      return;
    }
  }
  throw new Error(`${response.status}-${response.statusText}`);
}

export const jsonGet = <T>(url, body?: string, headers?: {[key: string]: string}) => doJsonFetch<T>(url, 'GET', body, headers);

export const jsonPost = <T>(url, body?: any, headers?: {[key: string]: string}) => doJsonFetch<T>(url, 'POST', body, headers);
export const jsonPut = <T>(url, body?: any, headers?: {[key: string]: string}) => doJsonFetch<T>(url, 'PUT', body, headers);
