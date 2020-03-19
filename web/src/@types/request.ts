export interface RequestStatus {
  pending: boolean;
  successful: boolean;
  failed: boolean;
}

export interface RequestSet {
  reset: () => void;
  pending: () => void;
  successful: () => void;
  failed: () => void;
}