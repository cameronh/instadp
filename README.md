<h1 align="center">instadp</h1>
<h5 align="center">Fast, flexible & lean implementation to grab profile photos, stories, and reels from instagram without needing an account (via instadp).</h5>
<div align="center">
  <a href="http://travis-ci.org/cameronh/instadp">
    <img src="https://travis-ci.org/cameronh/instadp.svg?branch=master" alt="Travis CI" />
  </a>
  <a href='https://coveralls.io/github/cameronh/instadp?branch=master'>
    <img src='https://coveralls.io/repos/github/cameronh/instadp/badge.svg?branch=master&dummy=unused' alt='Coverage Status' />
  </a>
</div>


```js
const InstaDP = require('instadp');

(async() => {
  const insta = new InstaDP();
  const stories = await insta.getStories('username');
})();
//stories => ['some_photo.jpg', 'some_video.mp4']
```

## Features

This library is currently under active development.

✅ <b>Full Size Profile Pictures</b>

✅ <b>Stories (Images, Videos)</b>

⛔️ Reels


## Installation
`npm install instadp`

## Testing
`npm test`
