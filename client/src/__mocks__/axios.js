import { mockPosts, newPost, deletedPostId } from './mockPosts';
import { fakeUser } from './mockAuth';
import { idCannotBeNullExceptionMessage } from './exceptionMessages';

export default {
  defaults: { 
    headers: { common: {} }
  },
  get: jest.fn((url, id) => {
    switch (url) {
      case '/api/posts': // getPosts()
        return Promise.resolve({ data: mockPosts } );
      case '/api/posts/abc123': // getPost()
        return Promise.resolve({ data: mockPosts[0] } );
      case '/api/posts/nonExistentPostId': // getPost()
        return Promise.reject({ data: null } );
      case '/api/profiles': // getCurrentProfile()
        return Promise.resolve({ data: {} } );
      case '/api/profiles/all': // getProfiles()
        return Promise.resolve({ data: ['profile1, profile2, profile3'] } );
      case '/api/profiles/handle/user123': // getProfileByHandle()
        return Promise.resolve({ data: 'fakeProfile' } );
      default:
        break;
    }
  }),
  post: jest.fn((url, requestData, history) => {
    switch (url) {
      case '/api/posts': // addPost()
        return Promise.resolve({ data: newPost } );
      case '/api/posts/def456/likes': // addLike()
        return Promise.resolve({ data: mockPosts } );
      case '/api/posts/def456/comments': // addComment()
        return Promise.resolve({ data: mockPosts[0] } );
      case '/api/posts/nonExistentPostId/comments': // addComment()
        return Promise.reject({ response: { data: idCannotBeNullExceptionMessage } } );
      case '/api/users/register': // registerUser()
        return Promise.resolve({ data: 'fakeUser' } );
      case '/api/users/login': // loginUser()
        return Promise.resolve({ data: { token: 'fakeToken' } } );
      case '/api/profiles': // setProfile()
        return Promise.resolve({ data: fakeUser } );
      case '/api/profiles/educations': // addEducation()
        return Promise.resolve();
      case '/api/profiles/experiences': // addExperience()
        return Promise.resolve();
    }
  }),
  delete: jest.fn((url) => {
    switch (url) {
      case '/api/posts/def456/likes': // deleteLike() resolve
        return Promise.resolve({ data: mockPosts } );
      case '/api/posts/null/likes': // deleteLike() reject
        return Promise.reject({ response: { data: idCannotBeNullExceptionMessage } } );
      case '/api/posts/ghi789': // deletePost()
        return Promise.resolve({ data: deletedPostId[0] } );
      case '/api/posts/def456/comments/pqr789': // deleteComment()
        return Promise.resolve({ data: deletedPostId[0] } );
      case '/api/profiles/educations/edu123': // deleteEducation()
        return Promise.resolve({ data: {} } );
      case '/api/profiles/experiences/exp123': // deleteExperience()
        return Promise.resolve({ data: {} } );
      case '/api/profiles': // deleteAccount()
        return Promise.resolve({ data: {} } );
    }
  })
};