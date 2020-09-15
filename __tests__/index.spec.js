const InstaDP = require('../lib');
const fs = require('fs');
const path = require('path');
const storiesHtml = fs.readFileSync(path.join(__dirname, '_stories.html'), 'utf8')
const instadp = new InstaDP();

describe('InstaDP', () => {
  describe('_fetchStoryMediaFromHTML', () => {
    test('should throw a TypeError on invalid html input', () => {
      expect(() => { instadp._fetchStoryMediaFromHTML(null); }).toThrow(TypeError);
      expect(() => { instadp._fetchStoryMediaFromHTML(null); }).toThrow(/Invalid HTML/);
    });

    test('should return an array with 2 story items containing an image and video', () => {
      const stories = instadp._fetchStoryMediaFromHTML(storiesHtml);

      expect(stories).toHaveLength(2);
      expect(stories[0]).toStrictEqual('image.jpg');
      expect(stories[1]).toStrictEqual('video.mp4');
    });
  });
});
