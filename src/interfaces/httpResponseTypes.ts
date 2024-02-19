import { Response } from "express";

export type PaginationParams = {
  limit: number;
  offset: number;
  page: number;
};

export type CommonResponse = {
  data: unknown;
  meta?: PaginationParams;
  ok: boolean;
  errors?: {
    message: string;
    all: unknown[];
  };
};

export type GeneralResponse = Response<any, Record<string, unknown>>;
