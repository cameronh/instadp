const fetch = require('node-fetch');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.instadp.com';
const STORIES_URL = BASE_URL + '/stories/';

class InstaDP {
  async getStories(username) {
    const html = await this._fetchStoryHTML(username);
    const stories = this._fetchStoryMediaFromHTML(html);

    return stories;
  }

  async _fetchStoryHTML(username) {
    const response = await fetch(`${STORIES_URL}${username}`);
    const body = await response.text();

    return body;
  }

  _fetchStoryMediaFromHTML(html) {
    try {
      const $ = cheerio.load(html);
      const media = $('.story-post').children().toArray().map(story => {
        return story.tagName === 'video' ?
          story.children.find(s => s.tagName === 'source').attribs.src :
          story.attribs.src
      });

      return media;
    } catch {
      throw new TypeError('Invalid HTML');
    }
  }
}

module.exports = InstaDP;