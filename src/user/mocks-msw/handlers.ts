import { http, HttpResponse } from 'msw';

const mockUserProfile = {
  id: 'user_123',
  email: 'test@example.com',
  name: 'John Doe',
  picture: 'https://example.com/user.jpg',
};

export const handlers = [
  http.get('https://dev-vsjevx5h8rqzm6di.us.auth0.com/api/v2/users/:userId', ({ params }) => {
    console.log('MSW перехватил /api/v2/users/:userId, userId:', params.userId);
      return HttpResponse.json({
        ...mockUserProfile,
      }, { status: 200 });
  }),
];