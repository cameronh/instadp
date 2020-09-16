const fetch = require('node-fetch');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.instadp.com';
const PROFILE_PICTURE_URL = BASE_URL + '/fullsize/';
const STORIES_URL = BASE_URL + '/stories/';

const _fetchHTML = async (fetcher, username, action_url) => {
  const response = await fetcher(`${action_url}${username}`);
  const body = await response.text();

  return body;
}

const _fetchStoryMediaFromHTML = (html) => {
  try {
    const $ = cheerio.load(html);
    const media = $('.story-post').children().toArray().map(story => {
      return story.tagName === 'video' ?
        story.children.find(s => s.tagName === 'source').attribs.src :
        story.attribs.src
    });

    return media.length === 0 ? 'No stories posted on the profile' : media;
  } catch {
    throw new TypeError('Invalid HTML');
  }
}

const _fetchProfilePictureFromHTML = (html) => {
  try {
    const $ = cheerio.load(html);
    const profilePicture = $('.instadp-post').children().toArray()[0];

    return profilePicture.attribs.src;
  } catch {
    throw new TypeError('Invalid HTML');
  }
}

class InstaDP {
  fetcher = null;

  constructor(fetcher = fetch) {
    this.fetcher = fetcher;
  }

  async getProfilePicture(username) {
    const html = await _fetchHTML(this.fetcher, username, PROFILE_PICTURE_URL);
    const profilePicture = _fetchProfilePictureFromHTML(html);

    return profilePicture;
  }

  async getStories(username) {
    const html = await _fetchHTML(this.fetcher, username, STORIES_URL);
    const stories = _fetchStoryMediaFromHTML(html);

    return stories;
  }
}

module.exports = InstaDP;