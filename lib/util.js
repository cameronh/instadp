const cheerio = require('cheerio');

/**
 * A collection of helper functions used by InstaDP
 * @module util
 */

const INSTAGRAM_BASE_URL = 'https://www.instagram.com/';

/**
 * Fetches using the given fetcher and returns an HTML response
 * @param {any} fetcher Object to fetch data from an endpoint
 * @param {string} username User to fetch data from
 * @param {string} action_url Additional route after username
 * @returns {Promise<string>} HTML response
 */
const fetchHTML = async (fetcher, username, action_url) => {
  const response = await fetcher(`${action_url}${username}`);
  const body = await response.text();

  return body;
}

/**
 * Fetches using the given fetcher and returns a JSON response
 * @param {any} fetcher Object to fetch data from an endpoint
 * @param {string} url URL to fetch data from
 * @returns {Promise<any>} JSON response
 */
const fetchJSON = async (fetcher, url) => {
  const response = await fetcher(url);
  const json = await response.json();

  return json;
}

/**
 * Returns the actual video source from a list of reels
 * @param {any} fetcher Object to fetch data from endpoint
 * @param {Array<string>} reels List of reel sources
 * @returns {Promise<string[]>} List of reel video sources
 */
const fetchReelSource = async (fetcher, reels) => {
  const reelItems = await Promise.all(
    reels.map(async reel => {
      const gqlJson = await fetchJSON(fetcher, `${INSTAGRAM_BASE_URL}${reel}/?__a=1`);
      const reelSrc = gqlJson.graphql.shortcode_media.video_url;

      return reelSrc;
    })
  );


  return reelItems;
}

/**
 * Returns a list of story sources from HTML
 * @param {string} html Source HTML
 * @returns {(string[]|string)} List of story sources
 */
const fetchStoryMediaFromHTML = (html) => {
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
 * @param {string} html Source HTML
 * @returns {(Promise<string[]>|Promise<string>)} List of reel sources
 */
const fetchReelMediaFromHTML = async (fetcher, html) => {
  try {
    const $ = cheerio.load(html);
    const media = $('.reel-item').children().toArray().map(reel => reel.attribs.href);
    const reelItems = await fetchReelSource(fetcher, media);

    return reelItems.length === 0 ? 'No reels posted on the profile' : reelItems;
  } catch {
    throw new TypeError('Invalid HTML');
  }
}

/**
 * Returns a profile picture source from HTML
 * @param {string} html Source HTML
 * @returns {string} URL to profile picture
 */
const fetchProfilePictureFromHTML = (html) => {
  try {
    const $ = cheerio.load(html);
    const profilePicture = $('.instadp-post').children().toArray()[0];

    return profilePicture.attribs.src;
  } catch {
    throw new TypeError('Invalid HTML');
  }
}

module.exports = {
  fetchHTML,
  fetchJSON,
  fetchReelSource,
  fetchStoryMediaFromHTML,
  fetchReelMediaFromHTML,
  fetchProfilePictureFromHTML
}