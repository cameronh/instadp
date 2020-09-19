const fetch = require('node-fetch');
const util = require('./util');

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
   * @param {string} username User to fetch data from
   * @returns {Promise<string>} URL to profile picture
   */
  async getProfilePicture(username) {
    const html = await util.fetchHTML(this.fetcher, username, util.PROFILE_PICTURE_URL);
    const profilePicture = util.fetchProfilePictureFromHTML(html);

    return profilePicture;
  }

  /**
   * Returns a list of stories for the provided username
   * @param {string} username User to fetch data from
   * @returns {(Promise<string[]>|Promise<string>)} List of story media
   */
  async getStories(username) {
    try {
      const account = await util.fetchAccount(this.fetcher, username, util.STORIES_URL);
      if (account && account.stories) return account.stories.length ? account.stories.map(story => story.src) :
        'No stories posted on the profile';

      return 'Server error occurred. Please try again.';
    }
    catch {
    }
  }

  /**
   * Returns a list of reels for the provided username
   * @param {string} username User to fetch data from
   * @returns {(Promise<string[]>|Promise<string>)} List of reel media
   */
  async getReels(username) {
    const html = await util.fetchHTML(this.fetcher, username, util.REELS_URL);
    const reels = await util.fetchReelMediaFromHTML(this.fetcher, html);

    return reels;
  }
}

module.exports = InstaDP;