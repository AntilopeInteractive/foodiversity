"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/index.html","9b1376c2bba1cdf8ee74f3689498045a"],["/static/css/main.78c93b3a.css","a1c46e39420246d809f1855541fcb67e"],["/static/js/main.8caab02e.js","48fa06ea31fbe315cc0253412cb6bd89"],["/static/media/BannerFood.233b7521.jpg","233b7521d722dc21dac0ec7277a5c45a"],["/static/media/Pixeled.525e2d92.eot","525e2d921fea4cfc878b231107a21807"],["/static/media/Pixeled.63f3f2ab.woff","63f3f2abf6b81f02f8b2552af628027a"],["/static/media/Pixeled.645f3e42.ttf","645f3e428b900baae797d1874d48fd76"],["/static/media/Pixeled.8fc7a3b5.svg","8fc7a3b5f6cfab6d36637ebb6a5bb36e"],["/static/media/icomoon.2fc9a9be.woff","2fc9a9be6709f75b15f9134f17620548"],["/static/media/icomoon.3240964e.ttf","3240964e6b2e4f9423506cd51ed0f7b1"],["/static/media/icomoon.3de00ffa.svg","3de00ffab6fcb8d5cab561e5532063da"],["/static/media/icomoon.87c5bdde.eot","87c5bdde7ce9a24cc352c8a3fde67a25"],["/static/media/mobile-food-banner.c142942d.jpg","c142942d333c83b94625780bc4c3c42d"],["/static/media/referidos.41486a91.jpg","41486a91f364210b288263634f27f243"],["/static/media/videoBackground.8c229c99.png","8c229c99f376d4acb758e159e53a04e9"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL("/index.html",self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});