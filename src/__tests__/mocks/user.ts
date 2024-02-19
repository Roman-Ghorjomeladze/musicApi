import { User } from ".prisma/client";

export const MockUser: User = {
  id: 1,
  username: "john_doe",
  name: "John Doe",
  password: "password",
  createdAt: new Date('2024-02-18T01:03:52.125Z'),
  updatedAt: new Date('2024-02-18T01:03:52.125Z'),
};

export const UnauthorisedRequest = {
  data: null,
  ok: false,
  errors: {
    message: "Unauthorised request",
    all: ["Unauthorised request"],
  },
};
