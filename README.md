<h1 align="center">instadp</h1>
<h5 align="center">Fast and lean implementation to grab profile photos, stories & reels from instagram without needing an account.</h5>
<div align="center">
  <a href="http://travis-ci.org/cameronh/instadp">
    <img src="https://travis-ci.org/cameronh/instadp.svg?branch=master" alt="Travis CI" />
  </a>
  <a href='https://coveralls.io/github/cameronh/instadp?branch=master'>
    <img src='https://coveralls.io/repos/github/cameronh/instadp/badge.svg?branch=master&ts=09-15-2020' alt='Coverage Status' />
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

✅ <b>Full Size Profile Pictures</b>

✅ <b>Stories (Images, Videos)</b>

✅ <b>Reels</b>

⛔️ Highlights

⛔️ Direct Downloads

## Installation
`npm install instadp`

## Testing
`npm test`

## API
[Documentation](doc/api.md)
