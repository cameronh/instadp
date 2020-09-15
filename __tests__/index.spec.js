const InstaDP = require('../lib');
const fs = require('fs');
const path = require('path');
const storiesHtml = fs.readFileSync(path.join(__dirname, '_stories.html'), 'utf8');

const mockFetcher = async (url) => {
  return { text: async () => storiesHtml }
}

const mockFetcherNull = async (url) => {
  return { text: async () => null }
}

const instadp = new InstaDP(mockFetcher);
const instadpFail = new InstaDP(mockFetcherNull);

describe('InstaDP', () => {
  describe('getStories', () => {
    test('should return an array with 2 story items containing an image and video', async () => {
      const stories = await instadp.getStories('foo');

      expect(stories).toHaveLength(2);
      expect(stories[0]).toStrictEqual('image.jpg');
      expect(stories[1]).toStrictEqual('video.mp4');
    });

    test('should throw an error for invalid html input', async () => {
      await expect(instadpFail.getStories('foo')).rejects.toThrow(TypeError);
    });
  });
});
