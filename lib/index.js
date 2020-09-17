const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * URL Endpoint Constants
 */
const BASE_URL = 'https://www.instadp.com';
const INSTAGRAM_BASE_URL = 'https://www.instagram.com/';
const PROFILE_PICTURE_URL = BASE_URL + '/fullsize/';
const STORIES_URL = BASE_URL + '/stories/';
const REELS_URL = BASE_URL + '/reels/';

/**
 * Fetches using the given fetcher and returns an HTML response
 * @param {any} fetcher Object to fetch data from an endpoint
 * @param {string} username 
 * @param {string} action_url Additional route after username
 * @returns {string} HTML response
 */
const _fetchHTML = async (fetcher, username, action_url) => {
  const response = await fetcher(`${action_url}${username}`);
  const body = await response.text();

  return body;
}

/**
 * Fetches using the given fetcher and returns a JSON response
 * @param {any} fetcher Object to fetch data from an endpoint
 * @param {string} url URL to fetch data from
 * @returns {Object} JSON response
 */
const _fetchJSON = async (fetcher, url) => {
  const response = await fetcher(url);
  const json = await response.json();

  return json;
}

/**
 * Returns the actual video source from a list of reels
 * @param {any} fetcher Object to fetch data from endpoint
 * @param {Array<string>} reels List of reel sources
 * @returns {Array<string>} List of reel video sources
 */
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

/**
 * Returns a list of story sources from HTML
 * @param {string} html
 * @returns {(Array<string>|string)} List of story sources
 */
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

/**
 * Returns a list of reel sources from HTML
 * @param {any} fetcher Object to fetch data from an endpoint
 * @param {*} html
 * @returns {(Array<string>|string)} List of reel sources
 */
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

/**
 * Returns a profile picture source from HTML
 * @param {string} html
 * @returns {string} URL to profile picture
 */
const _fetchProfilePictureFromHTML = (html) => {
  try {
    const $ = cheerio.load(html);
    const profilePicture = $('.instadp-post').children().toArray()[0];

    return profilePicture.attribs.src;
  } catch {
    throw new TypeError('Invalid HTML');
  }
}

/**
 * Represents an InstaDP instance.
 */
class InstaDP {
  fetcher = null;

  /**
   * @constructor
   * @param {any} fetcher Object to fetch data from an endpoint
   */
  constructor(fetcher) {
    if (!fetcher) this.fetcher = fetch;
    else this.fetcher = fetcher;
  }

  /**
   * Returns an instance of the current fetcher object
   */
  getFetcher() { return this.fetcher }

  /**
   * Returns the full-size profile picture for the provided username
   * @param {string} username
   * @returns {string} URL to profile picture
   */
  async getProfilePicture(username) {
    const html = await _fetchHTML(this.fetcher, username, PROFILE_PICTURE_URL);
    const profilePicture = _fetchProfilePictureFromHTML(html);

    return profilePicture;
  }

  /**
   * Returns a list of stories for the provided username
   * @param {string} username
   * @returns {(Array<string>|string)} List of story media
   */
  async getStories(username) {
    const html = await _fetchHTML(this.fetcher, username, STORIES_URL);
    const stories = _fetchStoryMediaFromHTML(html);

    return stories;
  }

  /**
   * 
   * @param {string} username
   * @returns {(Array<string>|string)} List of reel media
   */
  async getReels(username) {
    const html = await _fetchHTML(this.fetcher, username, REELS_URL);
    const reels = await _fetchReelMediaFromHTML(this.fetcher, html);

    return reels;
  }
}

module.exports = InstaDP;