import {
  PaginationParams,
  CommonResponse,
} from "@src/interfaces/httpResponseTypes";

export const formatResponse = (
  data: unknown,
  meta?: PaginationParams
): CommonResponse => {
  return meta ? { data, ok: true, meta } : { data, ok: true };
};

export const formatError = (
  message: string,
  errors: unknown[] = []
): CommonResponse => {
  return {
    data: null,
    ok: false,
    errors: {
      message,
      all: errors,
    },
  };
};
