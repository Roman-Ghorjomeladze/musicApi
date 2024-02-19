export const MockSignUpRequestBody = {
	username: "roma_gh",
	password: "password",
	name: "Roman",
};
export const MockLoginRequestBody = {
	username: "roma_gh",
	password: "password",
};

export const MockLoginResponse = {
	data: {
	  user: {
		id: 1,
		username: 'john_doe',
		name: 'John Doe',
		password: 'password',
		createdAt: '2024-02-18T01:03:52.125Z',
		updatedAt: '2024-02-18T01:03:52.125Z'
	  },
	  accessToken: 'access_token'
	},
	ok: true
  }