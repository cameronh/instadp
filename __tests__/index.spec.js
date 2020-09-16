const InstaDP = require('../lib');
const fs = require('fs');
const path = require('path');
const storiesHtml = fs.readFileSync(path.join(__dirname, '_stories.html'), 'utf8');
const profilePictureHtml = fs.readFileSync(path.join(__dirname, '_profile_picture.html'), 'utf8');

describe('InstaDP', () => {
  describe('getProfilePicture', () => {
    test('should return a url to the full size profile image', async () => {
      const mockFetcher = async (_url) => {
        return { text: async () => profilePictureHtml }
      }
      const instadp = new InstaDP(mockFetcher);

      const profilePicture = await instadp.getProfilePicture('foo');

      expect(profilePicture).toStrictEqual('image.jpg');
    });

    test('should throw an error for invalid html input', async () => {
      const mockFetcherNull = async (_url) => {
        return { text: async () => null }
      }
      const instadpFail = new InstaDP(mockFetcherNull);

      await expect(instadpFail.getProfilePicture('foo')).rejects.toThrow(TypeError);
    });
  });

  describe('getStories', () => {
    test('should return an array with 2 story items containing an image and video', async () => {
      const mockFetcher = async (_url) => {
        return { text: async () => storiesHtml }
      }
      const instadp = new InstaDP(mockFetcher);

      const stories = await instadp.getStories('foo');

      expect(stories).toHaveLength(2);
      expect(stories[0]).toStrictEqual('image.jpg');
      expect(stories[1]).toStrictEqual('video.mp4');
    });

    test('should return a message stating no stories on the profile when given an empty list', async () => {
      const mockFetcher = async (_url) => {
        return { text: async () => `<ul class="stories-list"></ul>` }
      }

      const instadp = new InstaDP(mockFetcher);
      const stories = await instadp.getStories('foo');

      expect(stories).toStrictEqual('No stories posted on the profile');
    });

    test('should throw an error for invalid html input', async () => {
      const mockFetcherNull = async (_url) => {
        return { text: async () => null }
      }
      const instadpFail = new InstaDP(mockFetcherNull);

      await expect(instadpFail.getStories('foo')).rejects.toThrow(TypeError);
    });
  });
});
