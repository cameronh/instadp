const cheerio = require('cheerio');
const { URLSearchParams } = require('url');

/**
 * A collection of helper functions used by InstaDP
 * @module util
 */

const INSTAGRAM_BASE_URL = 'https://www.instagram.com/';
const BASE_URL = 'https://www.instadp.com';
const PROFILE_PICTURE_URL = BASE_URL + '/fullsize/';
const STORIES_URL = BASE_URL + '/stories/';
const REELS_URL = BASE_URL + '/reels/';

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
  return response.json();
}

/**
 * 
 * @param {any} fetcher Object to fetch data from an endpoint
 * @param {string} username User to fetch data from
 * @param {string} action_url Additional route after username
 * @returns {Promise<any>} JSON response
 */
const fetchAccount = async (fetcher, username, action_url) => {
  try {
    const gql = await fetchJSON(fetcher, `${INSTAGRAM_BASE_URL}${username}/?__a=1`);

    const params = new URLSearchParams();
    params.append('data', JSON.stringify(gql));

    const response = await fetcher(`${action_url}${username}`, { method: 'POST', body: params });
    return response.json();
  } catch {
  }
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
  INSTAGRAM_BASE_URL,
  BASE_URL,
  PROFILE_PICTURE_URL,
  STORIES_URL,
  REELS_URL,
  fetchHTML,
  fetchJSON,
  fetchAccount,
  fetchReelSource,
  fetchReelMediaFromHTML,
  fetchProfilePictureFromHTML
}