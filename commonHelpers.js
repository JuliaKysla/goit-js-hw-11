import{S as u,i as f}from"./assets/vendor-5b791d57.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const m=document.querySelector(".search-form"),c=document.querySelector(".pictures-list");document.querySelector(".js-load-btn");const l=document.querySelector(".js-loader");function p(r){return new Promise((i,s)=>{const t=`https://pixabay.com/api/?${new URLSearchParams({key:"42110209-7b075b8eaa13f3df464bddae0",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0})}`;fetch(t).then(e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}).then(e=>{e.hits.length===0?s("Sorry, there are no images matching your search query. Please try again!"):i(e.hits)}).catch(e=>s(e))})}m.addEventListener("submit",d);function d(r){r.preventDefault();const i=r.currentTarget,s=r.target.elements.query.value;c.innerHTML="",w(),p(s).then(o=>{g(o),a()}).catch(o=>{b(o),a()}).finally(()=>i.reset())}const h=new u(".pictures-list a",{captionDelay:250,captionsData:"alt"});function g(r){const i=L(r);c.insertAdjacentHTML("beforeend",i),h.refresh()}function y({largeImageURL:r,webformatURL:i,tags:s,likes:o,views:t,comments:e,downloads:n}){return` <li class="picture-card">
<a class="gallary-card-link" href="${r}">
  <img src="${i}" alt="${s}" />
  <ul class="image-info">
    <li class="image-item-info">
      <p>Likes</p>
      <p>${o}</p>
    </li>
    <li class="image-item-info">
      <p>Views</p>
      <p>${t}</p>
    </li>
    <li class="image-item-info">
      <p>Comments</p>
      <p>${e}</p>
    </li>
    <li class="image-item-info">
      <p>Downloads</p>
      <p>${n}</p>
    </li>
  </ul>
</a>
</li>`}function L(r){return r.map(y).join("")}function b(r){f.error({title:"Error",message:r,position:"topRight"})}function w(){l.classList.remove("is-hidden")}function a(){l.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map
