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

const doJsonFetch = <T>(url, method, body, headers): Promise<T> =>
  doFetch(url, method, JSON.stringify(body), headers)
    .then(
      (response) => {
        if (response.status === 200) {
          return response.json();
        }
        return response
          .json()
          .then(
            data => Promise.reject(data),
            error => Promise.reject(error),
          );
      },
      error => Promise.reject(error),
    );

export const jsonGet = <T>(url, body?: string, headers?: {[key: string]: string}) => doJsonFetch<T>(url, 'GET', body, headers);

export const jsonPost = <T>(url, body?: any, headers?: {[key: string]: string}) => doJsonFetch<T>(url, 'POST', body, headers);
