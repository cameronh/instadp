## Modules

<dl>
<dt><a href="#module_util">util</a></dt>
<dd><p>A collection of helper functions used by InstaDP</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#InstaDP">InstaDP</a></dt>
<dd><p>Represents an InstaDP instance.</p>
</dd>
</dl>

<a name="module_util"></a>

## util
A collection of helper functions used by InstaDP


* [util](#module_util)
    * [~fetchHTML(fetcher, username, action_url)](#module_util..fetchHTML) ⇒ <code>Promise.&lt;string&gt;</code>
    * [~fetchJSON(fetcher, url)](#module_util..fetchJSON) ⇒ <code>Promise.&lt;any&gt;</code>
    * [~fetchAccount(fetcher, username, action_url)](#module_util..fetchAccount) ⇒ <code>Promise.&lt;any&gt;</code>
    * [~fetchReelSource(fetcher, reels)](#module_util..fetchReelSource) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [~fetchReelMediaFromHTML(fetcher, html)](#module_util..fetchReelMediaFromHTML) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> \| <code>Promise.&lt;string&gt;</code>
    * [~fetchProfilePictureFromHTML(html)](#module_util..fetchProfilePictureFromHTML) ⇒ <code>string</code>

<a name="module_util..fetchHTML"></a>

### util~fetchHTML(fetcher, username, action_url) ⇒ <code>Promise.&lt;string&gt;</code>
Fetches using the given fetcher and returns an HTML response

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Promise.&lt;string&gt;</code> - HTML response  

| Param | Type | Description |
| --- | --- | --- |
| fetcher | <code>any</code> | Object to fetch data from an endpoint |
| username | <code>string</code> | User to fetch data from |
| action_url | <code>string</code> | Additional route after username |

<a name="module_util..fetchJSON"></a>

### util~fetchJSON(fetcher, url) ⇒ <code>Promise.&lt;any&gt;</code>
Fetches using the given fetcher and returns a JSON response

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Promise.&lt;any&gt;</code> - JSON response  

| Param | Type | Description |
| --- | --- | --- |
| fetcher | <code>any</code> | Object to fetch data from an endpoint |
| url | <code>string</code> | URL to fetch data from |

<a name="module_util..fetchAccount"></a>

### util~fetchAccount(fetcher, username, action_url) ⇒ <code>Promise.&lt;any&gt;</code>
**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Promise.&lt;any&gt;</code> - JSON response  

| Param | Type | Description |
| --- | --- | --- |
| fetcher | <code>any</code> | Object to fetch data from an endpoint |
| username | <code>string</code> | User to fetch data from |
| action_url | <code>string</code> | Additional route after username |

<a name="module_util..fetchReelSource"></a>

### util~fetchReelSource(fetcher, reels) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Returns the actual video source from a list of reels

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - List of reel video sources  

| Param | Type | Description |
| --- | --- | --- |
| fetcher | <code>any</code> | Object to fetch data from endpoint |
| reels | <code>Array.&lt;string&gt;</code> | List of reel sources |

<a name="module_util..fetchReelMediaFromHTML"></a>

### util~fetchReelMediaFromHTML(fetcher, html) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> \| <code>Promise.&lt;string&gt;</code>
Returns a list of reel sources from HTML

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> \| <code>Promise.&lt;string&gt;</code> - List of reel sources  

| Param | Type | Description |
| --- | --- | --- |
| fetcher | <code>any</code> | Object to fetch data from an endpoint |
| html | <code>string</code> | Source HTML |

<a name="module_util..fetchProfilePictureFromHTML"></a>

### util~fetchProfilePictureFromHTML(html) ⇒ <code>string</code>
Returns a profile picture source from HTML

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - URL to profile picture  

| Param | Type | Description |
| --- | --- | --- |
| html | <code>string</code> | Source HTML |

<a name="InstaDP"></a>

## InstaDP
Represents an InstaDP instance.

**Kind**: global class  

* [InstaDP](#InstaDP)
    * [new InstaDP(fetcher)](#new_InstaDP_new)
    * [.getFetcher()](#InstaDP+getFetcher)
    * [.getProfilePicture(username)](#InstaDP+getProfilePicture) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getStories(username)](#InstaDP+getStories) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> \| <code>Promise.&lt;string&gt;</code>
    * [.getReels(username)](#InstaDP+getReels) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> \| <code>Promise.&lt;string&gt;</code>

<a name="new_InstaDP_new"></a>

### new InstaDP(fetcher)

| Param | Type | Description |
| --- | --- | --- |
| fetcher | <code>any</code> | Object to fetch data from an endpoint |

<a name="InstaDP+getFetcher"></a>

### instaDP.getFetcher()
Returns an instance of the current fetcher object

**Kind**: instance method of [<code>InstaDP</code>](#InstaDP)  
<a name="InstaDP+getProfilePicture"></a>

### instaDP.getProfilePicture(username) ⇒ <code>Promise.&lt;string&gt;</code>
Returns the full-size profile picture for the provided username

**Kind**: instance method of [<code>InstaDP</code>](#InstaDP)  
**Returns**: <code>Promise.&lt;string&gt;</code> - URL to profile picture  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | User to fetch data from |

<a name="InstaDP+getStories"></a>

### instaDP.getStories(username) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> \| <code>Promise.&lt;string&gt;</code>
Returns a list of stories for the provided username

**Kind**: instance method of [<code>InstaDP</code>](#InstaDP)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> \| <code>Promise.&lt;string&gt;</code> - List of story media  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | User to fetch data from |

<a name="InstaDP+getReels"></a>

### instaDP.getReels(username) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> \| <code>Promise.&lt;string&gt;</code>
Returns a list of reels for the provided username

**Kind**: instance method of [<code>InstaDP</code>](#InstaDP)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> \| <code>Promise.&lt;string&gt;</code> - List of reel media  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | User to fetch data from |

