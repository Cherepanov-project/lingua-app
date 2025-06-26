import { http, HttpResponse } from 'msw';
import type { DefaultBodyType, PathParams } from 'msw';

const mockUserProfile = {
  id: 'user_123',
  email: 'test@example.com',
  name: 'John Doe',
  picture: 'https://example.com/user.jpg',
};

export const handlers = [
  http.get('https://dev-vsjevx5h8rqzm6di.us.auth0.com/api/v2/users/:userId', ({ params }) => {
    const { userId } = params;
    if (userId) {
      return HttpResponse.json({
        ...mockUserProfile,
        id: userId,
      }, { status: 200 });
    }
    return HttpResponse.json({ error: 'User not found' }, { status: 404 });
  }),
];