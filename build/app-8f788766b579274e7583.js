!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var s in n)("object"==typeof exports?exports:t)[s]=n[s]}}(self,(function(){return function(){"use strict";var __webpack_modules__={883:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return BaseComponent}});var _Router_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(99),_Core_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(436);class BaseComponent extends HTMLElement{constructor(){super(),this.content=""}static register(t,e){return customElements.define(t,this)}async updateContent(){this.render()}routeLink(t){t.preventDefault(),_Router_js__WEBPACK_IMPORTED_MODULE_0__.Z.route(t)}addEventsToArrayOfElements(t){t.forEach((t=>{let e=this.findAll(t[0]);1===e.length?(e=e[0],e.addEventListener(t[1],this.addPreventDefault(t[2]))):e.length>1&&e.forEach((e=>{e.addEventListener(t[1],this.addPreventDefault(t[2]))}))}))}addPreventDefault(fn){if(fn.toString().match("preventDefault()"))return fn;if(fn.toString().match(/\{/)){let eventParameter=fn.toString().match(/\([a-zA-Z]{1,}\)/)[0];return eventParameter=eventParameter.replace(/\(/,"").replace(/\)/,""),fn=fn.toString().replace(/\{/,`{\n${eventParameter}.preventDefault()`),fn=eval(fn),fn}}addEventListener(t,e,n){let s=[],a={};if(3===arguments.length)s.push({0:t,1:e,2:n}),this.addEventsToArrayOfElements(s);else if(1===arguments.length&&"object"==typeof arguments[0]){let t=arguments[0],e=0;for(let n in t)if(2===Object.keys(t[n]).length){let s="";""===s&&(s=n,a[e]=s,e++);for(let s in t[n])a[e]=t[n][s],e++}else a[e]=t[n],e++;s.push(a),this.addEventsToArrayOfElements(s)}}findAll=t=>document.querySelectorAll(t);find=t=>document.querySelector(t)}},436:function(t,e,n){n.d(e,{U:function(){return a},j:function(){return i}});var s=n(99);class a{static get Components(){return a.components}static set Components(t){for(let e in t)t[e].register(e,t[e]);a.components=t}static set Bootstrap(t){a.bootstrap=t}}let i=function(){let t=Array.prototype.slice.call(arguments)[0];if("object"!=typeof t)throw Error("Debe ingresar parámentros de configuración.");{s.Z.Routes=t.routes,a.Components=t.components[0],a.Bootstrap=t.bootstrap;const e=async()=>{s.Z.start()};document.addEventListener("DOMContentLoaded",e),o(),document.addEventListener("link",(t=>{t.target.setAttribute("onupdate","link"),s.Z.handleLocation()}))}};const o=()=>{document.querySelector("body").appendChild(document.createElement(s.Z.bootstrapName))}},99:function(t,e,n){n.d(e,{Z:function(){return a}});var s=n(436);n(883);class a{static route(t){(t=t||window.event).preventDefault(),"button"===t.target.localName&&(t.target.href=t.target.getAttribute("Link")),window.history.pushState({},"",t.target.href||"/"),t.path.filter((t=>a.bootstrapName===t.localName))[0].dispatchEvent(new CustomEvent("link",{bubbles:!0,composed:!0}))}static get bootstrapName(){return Object.keys(s.U.components).find((t=>{const e=s.U.components[t];if(s.U.bootstrap.some((t=>t===e)))return t}))}static set Routes(t){a._routes=t}static get routeComponent(){return a.routes[window.location.pathname]}static get routes(){return a._routes}static handlePartialLocation=async t=>{const e=`./templates/${t}.html`;return await fetch(e).then((t=>t.text()))};static handleLocation=async()=>{const t=window.location.pathname,e=a.routes[t]||a.routes[404];return await fetch(`./templates/${e}.html`).then((t=>t.text()))};static start(){document.getElementsByTagName(a.bootstrapName)[0].setAttribute("onupdate",!0),window.addEventListener("popstate",(t=>{a.bootstrap.forEach((t=>{document.getElementsByTagName(t)[0].dispatchEvent(new CustomEvent("link",{bubbles:!0,composed:!0}))}))}))}}}},__webpack_module_cache__={};function __webpack_require__(t){var e=__webpack_module_cache__[t];if(void 0!==e)return e.exports;var n=__webpack_module_cache__[t]={exports:{}};return __webpack_modules__[t](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=function(t,e){for(var n in e)__webpack_require__.o(e,n)&&!__webpack_require__.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},__webpack_require__.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},__webpack_require__.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var __webpack_exports__={};return function(){__webpack_require__.r(__webpack_exports__);var t=__webpack_require__(436),e=__webpack_require__(883),n=__webpack_require__(99);class s extends e.Z{constructor(){super(),this.content="",this.addEventListener("option-select",this.handleEvent)}static get observedAttributes(){return["update"]}async updateContent(){this.content=await n.Z.handleLocation(),this.render(),this.setAttribute("update",!1)}attributeChangedCallback(t,e,n){"update"===t&&"true"===n&&this.updateContent(),this.animateContentChange()}animateNewContent(){}animateContentChange(){let t=this.find("#wrapper");gsap.fromTo(t,{opacity:0},{opacity:1,delay:.35,duration:1})}connectedCallback(){this.updateContent(),this.setChildrenComponentsObserver()}setChildrenComponentsObserver(){this.observer=new MutationObserver(this.childrenMutation),this.observer.observe(this,{attributes:!0,childList:!0,subtree:!0})}childrenMutation(t){const e=[];for(const n of t)e.push(...n.addedNodes)}unsetChildrenComponentsObserver(){this.observer.disconnect()}connectedCallback(){this.setChildrenComponentsObserver(),this.updateContent()}disconnectedCallback(){this.unsetChildrenComponentsObserver()}render(){this.innerHTML=`\n      <div id='wrapper'>\n      ${this.content}\n      </div>\n      `}}class a extends s{constructor(){super(),this.content="",this.update=!1}static get observedAttributes(){return["onupdate"]}attributeChangedCallback(t,e,n){"onupdate"===t&&""!==n&&"false"!==n&&(this.updateContent(),this.setAttribute("onupdate",!1))}updateContent(){this.find("to-do-list-content").setAttribute("update",!0)}connectedCallback(){this.setAttribute("onupdate",!1),this.render()}render(){this.innerHTML=`\n      <app-header></app-header>\n      <to-do-list-content update='${this.update}'></to-do-list-content>\n      <side-text></side-text>\n      <app-footer></app-footer>\n    `}createRenderRoot(){return this}}class i extends e.Z{constructor(){super()}static get observedAttributes(){return["link"]}attributeChangedCallback(){}connectedCallback(){this.render(),this.findAll("a").forEach((t=>{t.addEventListener("click",(t=>{this.animateContentChange(),this.routeLink(t)}))}))}animateContentChange(){let t=this.find("#wrapper");gsap.to(t,{opacity:0,duration:1,delay:.35})}render(){this.innerHTML="\n    <nav>\n      <a href='/'>\n        <div class=\"logo\">\n          <h1>My Lister</h1>\n        </div>\n      </a>\n      <ul>\n        <li><a href='/my-tasks'>My Tasks</a></li>\n        <li><a href='/profile'>Profile</a></li>\n      </ul>\n    </nav>"}}class o extends e.Z{constructor(){super()}connectedCallback(){this.render()}render(){this.innerHTML='\n    \n    <header class="box header">\n      <nav-bar></nav-bar>\n    </header>'}}class r extends e.Z{constructor(){super()}addEventListeners(){}animateGsap(){const t=gsap.timeline({defaults:{duration:.75,ease:"Power3.easeOut"}});t.fromTo(this.find(".img-container"),{scale:1.4,borderRadius:"0rem"},{scale:1,borderRadius:"2rem",delay:.35,duration:2.5,ease:"elastic.out(1.5,1)"}),t.fromTo(this.find(".cta1"),{x:"100%",opacity:0},{x:0,opacity:1},"<20%"),t.fromTo(this.find(".cta2"),{y:"-100%",opacity:0},{y:0,opacity:1},"<20%"),t.fromTo(this.find(".cta3"),{y:"-100%",opacity:0},{y:0,opacity:1},"<40%"),t.fromTo(this.find(".cta4"),{x:"100%",opacity:0},{x:0,opacity:1},"<40%"),t.fromTo(this.find(".cta6"),{x:"-100%",opacity:0},{x:0,opacity:1},"<40%"),t.fromTo(this.find(".cta5"),{y:"100%",opacity:0},{y:0,opacity:1},"<40%"),t.fromTo(this.find(".app__btn"),{y:20,opacity:0},{y:0,opacity:1},"<")}connectedCallback(){this.render(),this.animateGsap(),this.find(".app__btn").addEventListener("click",(t=>{this.routeLink(t),this.animateContentChange()}))}animateContentChange(){let t=this.find("#wrapper");gsap.to(t,{opacity:0,duration:1,delay:.35})}render(){this.innerHTML='\n    <section class="hero">\n      <div class="img-container">\n      </div>\n      <div class="cta">\n        <div class="cta-text logo">\n          <h2><span class="cta1">MY</span></h2>\n          <h2><span class="cta2">LISTER</span></h2>\n        </div>\n        <div class="cta-text">\n          <h2><span class="cta3">TO</span></h2>\n          <h2><span class="cta4">-</span></h2>\n          <h2><span class="cta5">DO</span></h2>\n          <h2><span class="cta6">LIST</span></h2>\n        </div>\n        <button Link=\'create-list\' class="app__btn app__btn--red">Create a new List\n\n        </button>\n      </div>\n    </section>\n    '}}class c extends e.Z{constructor(){super()}connectedCallback(){this.render(),this.animate()}animate(){gsap.fromTo(this.find(".sidetext"),{x:-190,opacity:0},{x:0,opacity:1,delay:3});const t=this.find(".sidetext p"),e=t.textContent.split("");let n;t.innerHTML.includes("href")&&(n=t.querySelector("a"),n.innerHTML=""),t.innerHTML="";let s=!1;e.forEach((e=>{"@"===e&&(s=!s);let a=document.createElement("span");a.classList.add("letter"),a.innerHTML=" "===e?"&nbsp":e,s?n.appendChild(a):t.appendChild(a)})),s&&t.appendChild(n),gsap.set(this.findAll(".letter"),{display:"inline-block"}),gsap.fromTo(this.findAll(".letter"),{y:30},{y:0,delay:3.5,stagger:.05})}render(){this.innerHTML="\n    <div class=\"sidetext\">\n      <p>Proyecto Final JavaScript <a href='https://www.coderhouse.com/' target='_blank'>@CoderHouse</a></p>\n    </div>\n    "}}class l extends e.Z{_tasksList=[];constructor(){super(),this.content={menu:"<app-menu></app-menu>",section:"<tasks-list type='list'></tasks-list>"},this.addEventListener("option-select",this)}handleEvent(t){"app-menu"===t.target.nodeName.toLowerCase()&&t.path[0].classList.toString().includes("create")&&this.find("tasks-list").setAttribute("type","create")}async getPartialContent(t,e){this.content.section=await n.Z.handlePartialLocation(t),this.content.section="",this.render()}get taskList(){return this._tasksList}set taskList(t){this._tasksList=t}async updateContent(){}connectedCallback(){this.render()}data(t){}render(){this.innerHTML=`\n    <div class="app-content">\n      <div class="app-content__title title">\n        <h1>My Tasks</h1>\n      </div>\n      <aside class="app-content__menu menu-app">\n        ${this.content.menu}\n      </aside>\n      <section class="app-content__content content">\n        ${this.content.section}\n      </section>\n    </div>`}}class d extends e.Z{constructor(){super()}connectedCallback(){this.updateContent()}render(){this.innerHTML="\n    <footer class=\"box footer\">Footer\n      <a href='https://www.freepik.es/fotos/fondo'>Foto de hero creado por KamranAydinov - www.freepik.es</a>\n    </footer>\n    "}}class p{constructor(t,e,n,s){this._listName=t,this._observations=e,this._createdDate=n||Date.now(),this._modifiedDate=s||null}get name(){return this._listName}set name(t){this._listName=t}get observations(){return this._observations}set observations(t){this._observations=val}get createdDate(){return class{static formatDate(t){let e=(t=new Date(t)).getDate(),n=t.getMonth()+1,s=t.getFullYear();return n<10?`${e}-0${n}-${s}`:`${e}-${n}-${s}`}}.formatDate(this._createdDate)}set createdDate(t){this._createdDate=t}}class u extends e.Z{_taskLists=[];newListName="";newListObs="";constructor(){super(),this.addEventListener("sent-new-list",this.createNewList),this.retrieveLists()}createNewList(){this.taskLists.push(new p(this.newListName,this.newListObs)),this.storeLists(),this.setAttribute("type","list")}storeLists(){localStorage.setItem("userLists",JSON.stringify(this.taskLists))}retrieveLists(){let t=JSON.parse(localStorage.getItem("userLists"));t&&t.forEach((t=>{this.taskLists.push(new p(t._listName,t._observations,t._createdDate,t._modifiedDate))}))}static get observedAttributes(){return["type","title","observations","delete","edit","listName"]}get taskLists(){return this._taskLists}set taskLists(t){this._taskLists.push(t),this.render()}connectedCallback(){this.render()}attributeChangedCallback(t,e,n){"type"===t&&("list"===n&&0===this.taskLists.length?this.retrieveLists():"create"===n&&(this.newListName="",this.newListObs=""),this.render(),this.setEventListenersOnUpdate(n))}setEventListenersOnUpdate(t){"create"===t&&this.find(".task__button--send-list").addEventListener("click",(t=>{this.newListName=this.find('input[name="listName"]').value.trim(),this.newListObs=this.find("textarea").value.trim(),""!==this.newListName&&this.createNewList()}))}get style(){return"\n      <style>\n        :host {\n          display: inline-block;\n          width: 100%;\n        }\n\n        :host * {\n          box-sizing: border-box;\n        }\n\n        .lists__section {\n          position: relative;\n          border-radius: 5px;\n          overflow: hidden;\n          padding: calc(1vw + 0.1vw);\n          display: grid;\n          grid-template-columns: 1fr;\n          grid-template-rows: 5fr;\n          grid-gap: 1vh;\n        }\n\n        .lists__section::before {\n          content: '';\n          background-color: #000;\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          z-index: -1;\n          opacity: 0.2;\n        }\n\n        .lists__section .lists__collection {\n          padding: 0 20px;\n          display: grid;\n          grid-template-columns: 1fr;\n          grid-auto-rows: 1fr;\n          grid-gap: 5px;\n        }\n\n        .lists__collection .lists__item{\n          display: flex;\n          justify-content: space-between;\n        }\n\n        .lists__form {\n          display: flex;\n          flex-direction: column;\n          justify-content: start;\n        }\n      </style>\n    "}render(){let t,e;switch(this.getAttribute("type")){case"list":let n;e="Collection of Task Lists",n=this.taskLists&&this.taskLists.length>0?this.taskLists.map(((t,e)=>`\n            <div class='lists__item' id='${e}'>\n              <span>${t.name}</span><span>Created: ${t.createdDate}</span>\n            </div>\n          `)).join(""):"Your collection of task lists is empty.",t=`\n            <section class='lists__section'>\n              <div class='lists__row'>\n                ${n}\n            </div>\n          </section>`;break;case"create":e="Create New Task List",t=`\n          <form class='lists__form'>\n            <div class='input__container'>\n              <input\n                class='menu__input--text'\n                type='text'\n                name='listName'\n                placeholder='Set a name for the list...'\n                value='${this.newListName}'\n              />\n            </div>\n            <div classw='input__container'>\n              <textarea\n\n                type='text'\n                name='observations'\n                placeholder='Add some observations?'\n                value='${this.newListObs}'\n              ></textarea>\n            </div>\n\n            <button class='task__button--send-list' type='button'>Save List</button>\n          </form>\n        `;break;default:e="Clone List"}this.innerHTML=`\n        ${this.style}\n        <section class='lists__section'>\n          <slot name='lists__heading'>\n            <h2>${e}</h2>\n          </slot>\n          <div class='lists__collection'>\n            ${t}\n          </div>\n        </section >`}}class h extends e.Z{constructor(){super(),this.addEventListener("option-select",this.handleEvent)}connectedCallback(){this.render(),this.addMenuEventListeners()}addMenuEventListeners(){const t=this.findAll("button");for(let e of t)e.addEventListener("click",(t=>{t.target.dispatchEvent(new CustomEvent("option-select",{bubbles:!0,composed:!0}))}))}get style(){return"\n      <style>\n        :host {\n          display: block;\n        }\n\n        :host * {\n          box-sizing: border-box;\n        }\n\n        .app-menu__section {\n          position: relative;\n        }\n\n        h2,\n        ::slotted([slot='app-menu__heading']) {\n          text-align: center;\n          padding-bottom: 10px;\n        }\n      \n        .app-menu__section .app-menu__options {\n          padding: 0 10px;\n          display: grid;\n          grid-template-columns: minmax(90px, 1fr);\n        }\n\n        .app-menu__section .app-menu__options .app-menu__btn {\n          display: block;\n        }\n\n      </style>\n    "}render(){this.innerHTML=`\n    \n    ${this.style}\n    <section class='app-menu__section'>\n      <slot name="app-menu__heading">\n        <h2>Menu</h2>\n      </slot>\n      <div class='app-menu__options'>\n        <button class='app__btn--menu create'>Create List</button>\n        <button class='app__btn--menu clone'>Clone List</button>\n        <button class='app__btn--menu remove'>Remove Lists</button>\n      </div>\n    </section>\n    `}}(0,t.j)({components:[{"lister-app":a,"nav-bar":i,"app-header":o,"to-do-hero":r,"side-text":c,"to-do-list-content":s,"app-footer":d,"my-tasks":l,"tasks-list":u,"app-menu":h}],bootstrap:[a],routes:{"/":"landing-page","/my-tasks":"my-tasks","/create-list":"create-list"}})}(),__webpack_exports__}()}));