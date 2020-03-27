import React from 'react';
import { RequestStatus, RequestSet } from '../@types/request';

const useRequestStatus = (): [RequestStatus, RequestSet] => {
  const [status, setStatus] = React.useState<RequestStatus>({
    pending: false,
    successful: false,
    failed: false,
  });

  const setReset = React.useCallback(
    () =>
      setStatus({
        pending: false,
        successful: false,
        failed: false,
      }),
    [status]
  );

  const setPending = React.useCallback(
    () =>
      setStatus({
        pending: true,
        successful: false,
        failed: false,
      }),
    [status]
  );

  const setSuccessful = React.useCallback(
    () =>
      setStatus({
        pending: false,
        successful: true,
        failed: false,
      }),
    [status]
  );

  const setFailed = React.useCallback(
    () =>
      setStatus({
        pending: false,
        successful: false,
        failed: true,
      }),
    [status]
  );

  const set = React.useMemo(
    (): RequestSet => ({
      reset: setReset,
      pending: setPending,
      successful: setSuccessful,
      failed: setFailed,
    }),
    [setPending, setSuccessful, setFailed]
  );

  return [status, set];
};

export default useRequestStatus;
