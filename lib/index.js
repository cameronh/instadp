const fetch = require('node-fetch');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.instadp.com';
const INSTAGRAM_BASE_URL = 'https://www.instagram.com/';
const PROFILE_PICTURE_URL = BASE_URL + '/fullsize/';
const STORIES_URL = BASE_URL + '/stories/';
const REELS_URL = BASE_URL + '/reels/';

const _fetchHTML = async (fetcher, username, action_url) => {
  const response = await fetcher(`${action_url}${username}`);
  const body = await response.text();

  return body;
}

const _fetchJSON = async (fetcher, url) => {
  const response = await fetcher(url);
  const json = await response.json();

  return json;
}

const _fetchReelSource = async (fetcher, reels) => {
  const reelItems = await Promise.all(
    reels.map(async reel => {
      const gqlJson = await _fetchJSON(fetcher, `${INSTAGRAM_BASE_URL}${reel}/?__a=1`);
      const reelSrc = gqlJson.graphql.shortcode_media.video_url;

      return reelSrc;
    })
  );


  return reelItems;
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

const _fetchReelMediaFromHTML = async (fetcher, html) => {
  try {
    const $ = cheerio.load(html);
    const media = $('.reel-item').children().toArray().map(reel => reel.attribs.href);
    const reelItems = await _fetchReelSource(fetcher, media);

    return reelItems.length === 0 ? 'No reels posted on the profile' : reelItems;
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

  constructor(fetcher) {
    if (!fetcher) this.fetcher = fetch;
    else this.fetcher = fetcher;
  }

  getFetcher() { return this.fetcher }

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

  async getReels(username) {
    const html = await _fetchHTML(this.fetcher, username, REELS_URL);
    const reels = await _fetchReelMediaFromHTML(this.fetcher, html);

    return reels;
  }
}

module.exports = InstaDP;