## Classes

<dl>
<dt><a href="#InstaDP">InstaDP</a></dt>
<dd><p>Represents an InstaDP instance.</p>
</dd>
</dl>

<a name="InstaDP"></a>

## InstaDP
Represents an InstaDP instance.

**Kind**: global class  

* [InstaDP](#InstaDP)
    * [new InstaDP(fetcher)](#new_InstaDP_new)
    * [.getFetcher()](#InstaDP+getFetcher)
    * [.getProfilePicture(username)](#InstaDP+getProfilePicture) ⇒ <code>string</code>
    * [.getStories(username)](#InstaDP+getStories) ⇒ <code>Array.&lt;string&gt;</code> \| <code>string</code>
    * [.getReels(username)](#InstaDP+getReels) ⇒ <code>Array.&lt;string&gt;</code> \| <code>string</code>

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

### instaDP.getProfilePicture(username) ⇒ <code>string</code>
Returns the full-size profile picture for the provided username

**Kind**: instance method of [<code>InstaDP</code>](#InstaDP)  
**Returns**: <code>string</code> - URL to profile picture  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | User to fetch data from |

<a name="InstaDP+getStories"></a>

### instaDP.getStories(username) ⇒ <code>Array.&lt;string&gt;</code> \| <code>string</code>
Returns a list of stories for the provided username

**Kind**: instance method of [<code>InstaDP</code>](#InstaDP)  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>string</code> - List of story media  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | User to fetch data from |

<a name="InstaDP+getReels"></a>

### instaDP.getReels(username) ⇒ <code>Array.&lt;string&gt;</code> \| <code>string</code>
Returns a list of reels for the provided username

**Kind**: instance method of [<code>InstaDP</code>](#InstaDP)  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>string</code> - List of reel media  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | User to fetch data from |

<a name="_fetchHTML"></a>

## \_fetchHTML(fetcher, username, action_url) ⇒ <code>string</code>
Fetches using the given fetcher and returns an HTML response

**Kind**: global function  
**Returns**: <code>string</code> - HTML response  

| Param | Type | Description |
| --- | --- | --- |
| fetcher | <code>any</code> | Object to fetch data from an endpoint |
| username | <code>string</code> | User to fetch data from |
| action_url | <code>string</code> | Additional route after username |

<a name="_fetchJSON"></a>

## \_fetchJSON(fetcher, url) ⇒ <code>Object</code>
Fetches using the given fetcher and returns a JSON response

**Kind**: global function  
**Returns**: <code>Object</code> - JSON response  

| Param | Type | Description |
| --- | --- | --- |
| fetcher | <code>any</code> | Object to fetch data from an endpoint |
| url | <code>string</code> | URL to fetch data from |

<a name="_fetchReelSource"></a>

## \_fetchReelSource(fetcher, reels) ⇒ <code>Array.&lt;string&gt;</code>
Returns the actual video source from a list of reels

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - List of reel video sources  

| Param | Type | Description |
| --- | --- | --- |
| fetcher | <code>any</code> | Object to fetch data from endpoint |
| reels | <code>Array.&lt;string&gt;</code> | List of reel sources |

<a name="_fetchStoryMediaFromHTML"></a>

## \_fetchStoryMediaFromHTML(html) ⇒ <code>Array.&lt;string&gt;</code> \| <code>string</code>
Returns a list of story sources from HTML

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>string</code> - List of story sources  

| Param | Type | Description |
| --- | --- | --- |
| html | <code>string</code> | Source HTML |

<a name="_fetchReelMediaFromHTML"></a>

## \_fetchReelMediaFromHTML(fetcher, html) ⇒ <code>Array.&lt;string&gt;</code> \| <code>string</code>
Returns a list of reel sources from HTML

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>string</code> - List of reel sources  

| Param | Type | Description |
| --- | --- | --- |
| fetcher | <code>any</code> | Object to fetch data from an endpoint |
| html | <code>string</code> | Source HTML |

<a name="_fetchProfilePictureFromHTML"></a>

## \_fetchProfilePictureFromHTML(html) ⇒ <code>string</code>
Returns a profile picture source from HTML

**Kind**: global function  
**Returns**: <code>string</code> - URL to profile picture  

| Param | Type | Description |
| --- | --- | --- |
| html | <code>string</code> | Source HTML |

## Functions

<dl>
<dt><a href="#_fetchHTML">_fetchHTML(fetcher, username, action_url)</a> ⇒ <code>string</code></dt>
<dd><p>Fetches using the given fetcher and returns an HTML response</p>
</dd>
<dt><a href="#_fetchJSON">_fetchJSON(fetcher, url)</a> ⇒ <code>Object</code></dt>
<dd><p>Fetches using the given fetcher and returns a JSON response</p>
</dd>
<dt><a href="#_fetchReelSource">_fetchReelSource(fetcher, reels)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns the actual video source from a list of reels</p>
</dd>
<dt><a href="#_fetchStoryMediaFromHTML">_fetchStoryMediaFromHTML(html)</a> ⇒ <code>Array.&lt;string&gt;</code> | <code>string</code></dt>
<dd><p>Returns a list of story sources from HTML</p>
</dd>
<dt><a href="#_fetchReelMediaFromHTML">_fetchReelMediaFromHTML(fetcher, html)</a> ⇒ <code>Array.&lt;string&gt;</code> | <code>string</code></dt>
<dd><p>Returns a list of reel sources from HTML</p>
</dd>
<dt><a href="#_fetchProfilePictureFromHTML">_fetchProfilePictureFromHTML(html)</a> ⇒ <code>string</code></dt>
<dd><p>Returns a profile picture source from HTML</p>
</dd>
</dl>