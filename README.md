<h1 align="center">instadp</h1>
<h5 align="center">Fast, flexible & lean implementation to grab profile photos, stories, and reels from instadp.</h5>
<br />

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
