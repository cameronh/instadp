const InstaDP = require('../lib');
const fs = require('fs');
const path = require('path');
const storiesHtml = fs.readFileSync(path.join(__dirname, 'html/stories.html'), 'utf8');
const profilePictureHtml = fs.readFileSync(path.join(__dirname, 'html/profile_picture.html'), 'utf8');
const reelsHtml = fs.readFileSync(path.join(__dirname, 'html/reels.html'), 'utf8');
const reelsJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'json/reels.json'), 'utf8'));

describe('InstaDP', () => {
  test('should pick a default fetcher if none given', () => {
    const instadp = new InstaDP();
    expect(instadp.getFetcher()).not.toBeNull();
  });

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

  describe('getReels', () => {
    test('should return an array with 2 reel items', async () => {
      const mockFetcher = async (_url) => {
        return {
          text: async () => reelsHtml,
          json: async () => reelsJson
        }
      }
      const instadp = new InstaDP(mockFetcher);

      const reels = await instadp.getReels('foo');

      expect(reels).toHaveLength(2);
    });

    test('should return a message stating no reels on the profile when given an empty list', async () => {
      const mockFetcher = async (_url) => {
        return { text: async () => `<ul class="reels-items-list"></ul>` }
      }

      const instadp = new InstaDP(mockFetcher);
      const reels = await instadp.getReels('foo');

      expect(reels).toStrictEqual('No reels posted on the profile');
    });

    test('should throw an error for invalid html input', async () => {
      const mockFetcherNull = async (_url) => {
        return { text: async () => null }
      }
      const instadpFail = new InstaDP(mockFetcherNull);

      await expect(instadpFail.getReels('foo')).rejects.toThrow(TypeError);
    });
  });
});
