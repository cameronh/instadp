<h1 align="center">instadp</h1>
<h5 align="center">Fast, flexible & lean implementation to grab profile photos, stories, and reels from instadp.</h5>
<div align="center">
  <a href="http://travis-ci.org/cameronh/instadp">
    <img src="https://travis-ci.org/cameronh/instadp.svg?branch=master" alt="Travis CI" />
  </a>
  <a href='https://coveralls.io/github/cameronh/instadp?branch=master'>
    <img src='https://coveralls.io/repos/github/cameronh/instadp/badge.svg?branch=master' alt='Coverage Status' />
  </a>
</div>


```js
const instadp = require('instadp');

(async() => {
  const stories = await instadp.getStories('username');
})();
//=> ['some_photo.jpg', 'some_video.mp4']
```

## Note

This library is currently under active development - you may only retrieve user stories.

## Installation
`npm install instadp`

## Testing
`npm test`
