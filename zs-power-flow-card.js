/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

let ZsPowerFlowCardEditor = class ZsPowerFlowCardEditor extends i {
    setConfig(config) {
        this._config = config;
    }
    render() {
        const config = this._config;
        if (!config) {
            return b ``;
        }
        return b `
      <div class="form">
        <section class="section">
          <div class="section-header">
            <h4>Podstawy</h4>
            <p>Najwazniejsze ustawienia karty oraz glowne sensory mocy.</p>
          </div>

          <div class="grid one">
            ${this.renderTextField('Tytul', 'title', config.title ?? '')}
          </div>

          <div class="grid two">
            ${this.renderEntityField('Produkcja PV', 'solar_entity', config.solar_entity ?? '', ['sensor'], 'Aktualna moc produkcji z paneli. Najczesciej sensor w W lub kW, np. laczna moc PV.')}
            ${this.renderEntityField('Moc sieci', 'grid_entity', config.grid_entity ?? '', ['sensor'], 'Aktualna moc wymiany z siecia. Oczekiwane: plus = import, minus = eksport.')}
            ${this.renderEntityField('Moc baterii', 'battery_power_entity', config.battery_power_entity ?? '', ['sensor'], 'Aktualna moc baterii. Oczekiwane: plus = rozladowanie do domu, minus = ladowanie.')}
            ${this.renderEntityField('SOC baterii', 'battery_soc_entity', config.battery_soc_entity ?? '', ['sensor'], 'Procent naladowania baterii, najlepiej sensor 0-100.')}
            ${this.renderEntityField('Zuzycie domu', 'home_entity', config.home_entity ?? '', ['sensor'], 'Calkowita aktualna moc odbiorow domu.')}
            ${this.renderNumberField('Pojemnosc baterii (kWh)', 'battery_capacity_kwh', config.battery_capacity_kwh, 'Sluzy do wyliczenia energii zgromadzonej w baterii na podstawie SOC.')}
          </div>

          <p class="hint">Konwencja tej wersji: siec plus = import, minus = eksport; bateria plus = rozladowanie, minus = ladowanie.</p>
        </section>

        <section class="section">
          <div class="section-header">
            <h4>Widok i zachowanie</h4>
            <p>Wybierz tryb prosty lub zaawansowany oraz ustaw prezentacje danych.</p>
          </div>

          <div class="grid two">
            ${this.renderSelectField('Widok', 'view_mode', config.view_mode ?? 'simple', [
            ['simple', 'Simple'],
            ['advanced', 'Advanced'],
        ], 'Simple pokazuje najwazniejsze dane, a advanced dodaje statusy i metryki dzienne.')}
            ${this.renderSelectField('Motyw', 'theme', config.theme ?? 'aurora', [
            ['aurora', 'Aurora'],
            ['graphite', 'Graphite'],
            ['sunset', 'Sunset'],
        ], 'Zmienia palete kolorow i charakter wizualny karty.')}
            ${this.renderSelectField('Layout', 'layout', config.layout ?? 'balanced', [
            ['balanced', 'Balanced'],
            ['focus-home', 'Focus home'],
        ], 'Balanced jest bardziej symetryczny, a Focus home bardziej eksponuje zuzycie domu.')}
            ${this.renderSelectField('Preset wizualny', 'visual_preset', config.visual_preset ?? 'default', [
            ['default', 'Default'],
            ['compact', 'Compact'],
            ['analytics', 'Analytics'],
        ], 'Default jest zbalansowany, Compact bardziej zwarty, a Analytics robi wiecej miejsca na dane pomocnicze.')}
            ${this.renderSelectField('Styl flow', 'flow_style', config.flow_style ?? 'soft', [
            ['soft', 'Soft'],
            ['beam', 'Beam'],
            ['pulse', 'Pulse'],
        ], 'Zmienia charakter animacji przeplywu energii bez zmiany danych.')}
            ${this.renderSelectField('Tryb szczegolow', 'details_mode', config.details_mode ?? 'summary', [
            ['summary', 'Summary'],
            ['extended', 'Extended'],
        ], 'Extended pokazuje wiecej kart z przeplywami i energiami dziennymi.')}
            ${this.renderNumberField('Miejsca po przecinku', 'decimals', config.decimals, 'Ile cyfr po przecinku pokazywac dla wartosci mocy.')}
          </div>

          <div class="toggle-grid">
            ${this.renderToggleTile('Pokaz szczegoly', 'show_details', config.show_details ?? true)}
            ${this.renderToggleTile('Pokaz PV', 'show_solar', config.show_solar ?? true)}
            ${this.renderToggleTile('Pokaz siec', 'show_grid', config.show_grid ?? true)}
            ${this.renderToggleTile('Pokaz baterie', 'show_battery', config.show_battery ?? true)}
            ${this.renderToggleTile('Animacje przeplywu', 'animation_enabled', config.animation_enabled ?? true)}
            ${this.renderToggleTile('Belka statusu', 'show_status_bar', config.show_status_bar ?? true)}
            ${this.renderToggleTile('Odwroc znak sieci', 'invert_grid', config.invert_grid ?? false)}
            ${this.renderToggleTile('Odwroc znak baterii', 'invert_battery', config.invert_battery ?? false)}
            ${this.renderToggleTile('Pokaz breakdown PV', 'show_pv_breakdown', config.show_pv_breakdown ?? true)}
            ${this.renderToggleTile('Pokaz breakdown faz', 'show_phase_breakdown', config.show_phase_breakdown ?? true)}
          </div>
        </section>

        <section class="section">
          <div class="section-header">
            <h4>Status i metryki zaawansowane</h4>
            <p>Opcjonalne pola dla widoku advanced. Jesli ich nie ustawisz, karta nadal bedzie dzialac.</p>
          </div>

          <div class="grid two">
            ${this.renderEntityField('Stan on/off-grid', 'grid_connected_entity', config.grid_connected_entity ?? '', ['binary_sensor', 'sensor'], 'Binary sensor lub sensor tekstowy wskazujacy, czy falownik pracuje z siecia. Obslugiwane m.in. on/off, connected/disconnected.')}
            ${this.renderEntityField('Status inwertera', 'inverter_status_entity', config.inverter_status_entity ?? '', ['sensor'], 'Tekstowy status pracy inwertera, np. Normal, Fault, Standby.')}
            ${this.renderEntityField('Produkcja dzienna', 'daily_solar_energy_entity', config.daily_solar_energy_entity ?? '', ['sensor'], 'Dzisiejsza energia wyprodukowana przez PV, najlepiej w kWh.')}
            ${this.renderEntityField('Zuzycie dzienne', 'daily_home_energy_entity', config.daily_home_energy_entity ?? '', ['sensor'], 'Dzisiejsza energia zuzyta przez odbiory domu.')}
            ${this.renderEntityField('Import dzienny', 'daily_grid_import_energy_entity', config.daily_grid_import_energy_entity ?? '', ['sensor'], 'Dzisiejsza energia pobrana z sieci.')}
            ${this.renderEntityField('Eksport dzienny', 'daily_grid_export_energy_entity', config.daily_grid_export_energy_entity ?? '', ['sensor'], 'Dzisiejsza energia oddana do sieci.')}
            ${this.renderEntityField('Ladowanie baterii dzisiaj', 'daily_battery_charge_energy_entity', config.daily_battery_charge_energy_entity ?? '', ['sensor'], 'Dzisiejsza energia wlozona do baterii.')}
            ${this.renderEntityField('Rozladowanie baterii dzisiaj', 'daily_battery_discharge_energy_entity', config.daily_battery_discharge_energy_entity ?? '', ['sensor'], 'Dzisiejsza energia oddana z baterii.')}
            ${this.renderEntityField('Stan baterii', 'battery_state_entity', config.battery_state_entity ?? '', ['sensor'], 'Tekstowy stan baterii, np. idle, charging, discharging.')}
            ${this.renderEntityField('SOH baterii', 'battery_soh_entity', config.battery_soh_entity ?? '', ['sensor'], 'Kondycja baterii, zwykle procent.')}
            ${this.renderEntityField('Temperatura baterii', 'battery_temperature_entity', config.battery_temperature_entity ?? '', ['sensor'], 'Temperatura baterii w stopniach C.')}
            ${this.renderEntityField('Temperatura inwertera', 'inverter_temperature_entity', config.inverter_temperature_entity ?? '', ['sensor'], 'Temperatura inwertera lub sekcji DC.')}
            ${this.renderEntityField('Alarm urzadzenia', 'device_alarm_entity', config.device_alarm_entity ?? '', ['sensor'], 'Tekstowy alarm inwertera, np. OK lub opis alarmu.')}
            ${this.renderEntityField('Fault urzadzenia', 'device_fault_entity', config.device_fault_entity ?? '', ['sensor'], 'Tekstowy fault inwertera, np. OK lub opis bledu.')}
            ${this.renderEntityField('Alarm baterii', 'battery_alarm_entity', config.battery_alarm_entity ?? '', ['binary_sensor', 'sensor'], 'Alarm baterii jako binary sensor lub tekstowy stan.')}
            ${this.renderEntityField('Fault baterii', 'battery_fault_entity', config.battery_fault_entity ?? '', ['binary_sensor', 'sensor'], 'Fault baterii jako binary sensor lub tekstowy stan.')}
            ${this.renderEntityField('Tryb pracy falownika', 'work_mode_entity', config.work_mode_entity ?? '', ['sensor', 'select'], 'Biezacy work mode lub tekstowy status trybu pracy.')}
            ${this.renderEntityField('Pattern energii', 'energy_pattern_entity', config.energy_pattern_entity ?? '', ['sensor', 'select'], 'Informacja o strategii pracy, np. Battery First, Load First.')}
            ${this.renderEntityField('PV1 moc', 'pv1_power_entity', config.pv1_power_entity ?? '', ['sensor'], 'Opcjonalny breakdown pierwszego MPPT/stringu PV.')}
            ${this.renderEntityField('PV2 moc', 'pv2_power_entity', config.pv2_power_entity ?? '', ['sensor'], 'Opcjonalny breakdown drugiego MPPT/stringu PV.')}
            ${this.renderEntityField('PV3 moc', 'pv3_power_entity', config.pv3_power_entity ?? '', ['sensor'], 'Opcjonalny breakdown trzeciego MPPT/stringu PV.')}
            ${this.renderEntityField('Load L1 moc', 'load_l1_power_entity', config.load_l1_power_entity ?? '', ['sensor'], 'Opcjonalna moc fazy L1 dla obciazenia.')}
            ${this.renderEntityField('Load L2 moc', 'load_l2_power_entity', config.load_l2_power_entity ?? '', ['sensor'], 'Opcjonalna moc fazy L2 dla obciazenia.')}
            ${this.renderEntityField('Load L3 moc', 'load_l3_power_entity', config.load_l3_power_entity ?? '', ['sensor'], 'Opcjonalna moc fazy L3 dla obciazenia.')}
            ${this.renderEntityField('Grid L1 moc', 'grid_l1_power_entity', config.grid_l1_power_entity ?? '', ['sensor'], 'Opcjonalna moc fazy L1 po stronie sieci.')}
            ${this.renderEntityField('Grid L2 moc', 'grid_l2_power_entity', config.grid_l2_power_entity ?? '', ['sensor'], 'Opcjonalna moc fazy L2 po stronie sieci.')}
            ${this.renderEntityField('Grid L3 moc', 'grid_l3_power_entity', config.grid_l3_power_entity ?? '', ['sensor'], 'Opcjonalna moc fazy L3 po stronie sieci.')}
          </div>
        </section>

        <section class="section">
          <div class="section-header">
            <h4>Etykiety</h4>
            <p>Opcjonalnie zmien nazwy blokow widocznych na karcie.</p>
          </div>

          <div class="grid two">
            ${this.renderTextField('Etykieta PV', 'solar_label', config.solar_label ?? '')}
            ${this.renderTextField('Etykieta sieci', 'grid_label', config.grid_label ?? '')}
            ${this.renderTextField('Etykieta baterii', 'battery_label', config.battery_label ?? '')}
            ${this.renderTextField('Etykieta domu', 'home_label', config.home_label ?? '')}
          </div>
        </section>
      </div>
    `;
    }
    renderTextField(label, key, value) {
        return b `
      <label class="field">
        <span class="field-label">${label}</span>
        <input
          class="text-input"
          .value=${value}
          @input=${(event) => this.updateConfig(key, event.target.value)}
        />
      </label>
    `;
    }
    renderNumberField(label, key, value, helpText) {
        return b `
      <label class="field">
        <span class="field-label">${label}</span>
        <input
          class="text-input"
          type="number"
          .value=${value === undefined ? '' : String(value)}
          @input=${(event) => {
            const next = event.target.value;
            this.updateConfig(key, next === '' ? undefined : Number(next));
        }}
        />
        ${helpText ? b `<span class="helper">${helpText}</span>` : ''}
      </label>
    `;
    }
    renderEntityField(label, key, value, includeDomains, helpText) {
        const listId = `entities-${String(key)}`;
        const entityIds = this.getEntityIds(includeDomains);
        return b `
      <label class="field">
        <span class="field-label">${label}</span>
        <input
          class="text-input"
          .value=${value}
          list=${listId}
          placeholder="sensor.twoja_encja"
          spellcheck="false"
          autocapitalize="off"
          autocomplete="off"
          @input=${(event) => this.updateConfig(key, event.target.value || undefined)}
        />
        <datalist id=${listId}>
          ${entityIds.map((entityId) => b `<option value=${entityId}></option>`)}
        </datalist>
        ${helpText ? b `<span class="helper">${helpText}</span>` : ''}
      </label>
    `;
    }
    renderSelectField(label, key, value, options, helpText) {
        return b `
      <label class="field">
        <span class="field-label">${label}</span>
        <select
          class="text-input"
          .value=${value}
          @change=${(event) => this.updateConfig(key, event.target.value)}
        >
          ${options.map(([optionValue, optionLabel]) => b `<option value=${optionValue} ?selected=${value === optionValue}>${optionLabel}</option>`)}
        </select>
        ${helpText ? b `<span class="helper">${helpText}</span>` : ''}
      </label>
    `;
    }
    renderToggleTile(label, key, value) {
        return b `
      <label class="toggle-tile">
        <input
          type="checkbox"
          .checked=${value}
          @change=${(event) => this.updateConfig(key, event.target.checked)}
        />
        <span>${label}</span>
      </label>
    `;
    }
    getEntityIds(includeDomains) {
        const states = this.hass?.states ?? {};
        return Object.keys(states)
            .filter((entityId) => includeDomains.includes(entityId.split('.')[0]))
            .sort((a, b) => a.localeCompare(b));
    }
    updateConfig(key, value) {
        const nextConfig = {
            ...this._config,
            [key]: value,
        };
        this._config = nextConfig;
        this.dispatchEvent(new CustomEvent('config-changed', {
            detail: { config: nextConfig },
            bubbles: true,
            composed: true,
        }));
    }
};
ZsPowerFlowCardEditor.styles = i$3 `
    :host {
      display: block;
      padding-top: 8px;
    }

    .form {
      display: grid;
      gap: 20px;
    }

    .section {
      display: grid;
      gap: 14px;
      padding: 16px;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.74)),
        var(--card-background-color);
      border: 1px solid var(--divider-color);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
    }

    .section-header h4 {
      margin: 0 0 4px;
      font-size: 1rem;
    }

    .section-header p,
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 0.9rem;
      line-height: 1.45;
    }

    .grid {
      display: grid;
      gap: 12px;
    }

    .grid.one {
      grid-template-columns: 1fr;
    }

    .grid.two {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .field {
      display: grid;
      gap: 6px;
    }

    .field-label {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }

    .helper {
      font-size: 0.79rem;
      line-height: 1.4;
      color: var(--secondary-text-color);
    }

    .text-input {
      width: 100%;
      box-sizing: border-box;
      border-radius: 16px;
      border: 1px solid rgba(120, 131, 155, 0.22);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.96), rgba(247,248,252,0.96));
      color: var(--primary-text-color);
      padding: 13px 14px;
      font: inherit;
      outline: none;
      transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
    }

    .text-input:focus {
      border-color: rgba(59, 130, 246, 0.5);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
    }

    .toggle-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }

    .toggle-tile {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 16px;
      border: 1px solid rgba(120, 131, 155, 0.22);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.96), rgba(247,248,252,0.96));
      cursor: pointer;
      transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
    }

    .toggle-tile:hover {
      transform: translateY(-1px);
      border-color: rgba(59, 130, 246, 0.28);
    }

    .toggle-tile input {
      width: 16px;
      height: 16px;
      margin: 0;
    }

    @media (max-width: 800px) {
      .grid.two,
      .toggle-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
__decorate([
    n({ attribute: false })
], ZsPowerFlowCardEditor.prototype, "hass", void 0);
__decorate([
    r()
], ZsPowerFlowCardEditor.prototype, "_config", void 0);
ZsPowerFlowCardEditor = __decorate([
    t('zs-power-flow-card-editor')
], ZsPowerFlowCardEditor);

const THEMES = {
    aurora: {
        panel: 'linear-gradient(145deg, rgba(8,24,38,0.96), rgba(12,52,61,0.94))',
        border: 'rgba(125, 249, 255, 0.18)',
        text: '#ecfeff',
        muted: 'rgba(220, 252, 255, 0.68)',
        solar: '#f7b500',
        grid: '#60a5fa',
        battery: '#34d399',
        home: '#f472b6',
    },
    graphite: {
        panel: 'linear-gradient(145deg, rgba(17,24,39,0.98), rgba(31,41,55,0.94))',
        border: 'rgba(255,255,255,0.1)',
        text: '#f9fafb',
        muted: 'rgba(249, 250, 251, 0.62)',
        solar: '#f59e0b',
        grid: '#38bdf8',
        battery: '#22c55e',
        home: '#fb7185',
    },
    sunset: {
        panel: 'linear-gradient(145deg, rgba(55,23,48,0.96), rgba(125,43,79,0.92))',
        border: 'rgba(255,255,255,0.12)',
        text: '#fff7ed',
        muted: 'rgba(255, 247, 237, 0.7)',
        solar: '#fb923c',
        grid: '#93c5fd',
        battery: '#86efac',
        home: '#f9a8d4',
    },
};
const FALLBACK_VALUES_W = {
    solar: 4800,
    grid: -1200,
    batteryPower: -1600,
    batterySoc: 68,
    home: 5200,
};
function getEntity(hass, entityId) {
    if (!hass || !entityId)
        return undefined;
    return hass.states[entityId];
}
function parseRawNumber(entity) {
    if (!entity)
        return null;
    const parsed = Number(entity.state);
    return Number.isFinite(parsed) ? parsed : null;
}
function getUnit(entity) {
    const unit = entity?.attributes?.unit_of_measurement;
    return typeof unit === 'string' ? unit : null;
}
function parsePowerWatts(entity, fallbackWatts = 0) {
    const value = parseRawNumber(entity);
    if (value === null)
        return fallbackWatts;
    const unit = (getUnit(entity) ?? '').toLowerCase();
    if (unit === 'kw')
        return value * 1000;
    return value;
}
function parseOptionalEnergyKwh(entity) {
    const value = parseRawNumber(entity);
    if (value === null)
        return null;
    const unit = (getUnit(entity) ?? '').toLowerCase();
    if (unit === 'wh')
        return value / 1000;
    if (unit === 'mwh')
        return value * 1000;
    return value;
}
function parseOptionalNumber(entity) {
    return parseRawNumber(entity);
}
function parseEntityText(entity) {
    const value = entity?.state;
    return value && value !== 'unknown' && value !== 'unavailable' ? value : null;
}
function parseOptionalBoolean(entity) {
    const state = parseEntityText(entity)?.toLowerCase();
    if (!state)
        return null;
    if (['on', 'connected', 'online', 'true', '1', 'ok', 'normal'].includes(state))
        return true;
    if (['off', 'disconnected', 'offline', 'false', '0', 'fault', 'alarm'].includes(state))
        return false;
    return null;
}
function parseGridConnected(entity) {
    const state = parseEntityText(entity)?.toLowerCase();
    if (!state)
        return null;
    if (['on', 'connected', 'online', 'true', '1'].includes(state))
        return true;
    if (['off', 'disconnected', 'offline', 'false', '0'].includes(state))
        return false;
    return null;
}
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function withDisplayPower(valueWatts) {
    const absolute = Math.abs(valueWatts);
    if (absolute >= 1000) {
        return { displayValue: valueWatts / 1000, displayUnit: 'kW' };
    }
    return { displayValue: valueWatts, displayUnit: 'W' };
}
function createNode(label, valueWatts, accent, secondary) {
    const display = withDisplayPower(valueWatts);
    return {
        label,
        value: valueWatts,
        displayValue: display.displayValue,
        displayUnit: display.displayUnit,
        accent,
        secondary,
    };
}
function createBreakdownItem(label, valueWatts) {
    const display = withDisplayPower(valueWatts);
    return {
        label,
        value: valueWatts,
        displayValue: display.displayValue,
        displayUnit: display.displayUnit,
    };
}
function createOptionalBreakdown(hass, entries) {
    return entries
        .map(({ label, entityId }) => {
        const entity = getEntity(hass, entityId);
        const numeric = parseRawNumber(entity);
        if (numeric === null || !entityId)
            return null;
        return createBreakdownItem(label, parsePowerWatts(entity));
    })
        .filter((item) => item !== null);
}
function getThemeTokens(theme) {
    return THEMES[theme ?? 'aurora'];
}
function buildSnapshot(hass, config) {
    const themeTokens = getThemeTokens(config.theme);
    const solarEntity = getEntity(hass, config.solar_entity);
    const gridEntity = getEntity(hass, config.grid_entity);
    const batteryEntity = getEntity(hass, config.battery_power_entity);
    const homeEntity = getEntity(hass, config.home_entity);
    const socEntity = getEntity(hass, config.battery_soc_entity);
    const solar = Math.max(0, parsePowerWatts(solarEntity, FALLBACK_VALUES_W.solar));
    const gridBase = parsePowerWatts(gridEntity, FALLBACK_VALUES_W.grid);
    const batteryBase = parsePowerWatts(batteryEntity, FALLBACK_VALUES_W.batteryPower);
    const home = Math.max(0, parsePowerWatts(homeEntity, FALLBACK_VALUES_W.home));
    const grid = (config.invert_grid ? -1 : 1) * gridBase;
    const batteryPower = (config.invert_battery ? -1 : 1) * batteryBase;
    const socValue = parseOptionalNumber(socEntity) ?? FALLBACK_VALUES_W.batterySoc;
    const soc = Number.isFinite(socValue) ? clamp(socValue, 0, 100) : null;
    const batteryCapacity = config.battery_capacity_kwh ?? 0;
    const solarToHome = Math.min(solar, home);
    const remainingSolar = Math.max(0, solar - solarToHome);
    const solarToBattery = batteryPower < 0 ? Math.min(remainingSolar, Math.abs(batteryPower)) : 0;
    const solarToGrid = Math.max(0, remainingSolar - solarToBattery);
    const batteryToHome = batteryPower > 0 ? Math.min(home, batteryPower) : 0;
    const gridToHome = grid > 0 ? Math.min(home, grid) : 0;
    const batteryStoredKwh = soc !== null && batteryCapacity > 0 ? (batteryCapacity * soc) / 100 : null;
    const netHomeDemand = home - solar;
    const gridConnected = parseGridConnected(getEntity(hass, config.grid_connected_entity));
    const inverterStatus = parseEntityText(getEntity(hass, config.inverter_status_entity));
    const batteryState = parseEntityText(getEntity(hass, config.battery_state_entity));
    return {
        solar: createNode(config.solar_label ?? 'Produkcja', solar, themeTokens.solar, 'PV'),
        grid: createNode(config.grid_label ?? 'Siec', grid, themeTokens.grid, grid >= 0 ? 'Import' : 'Eksport'),
        battery: {
            ...createNode(config.battery_label ?? 'Magazyn', batteryPower, themeTokens.battery, soc === null ? 'Stan nieznany' : `SOC ${soc.toFixed(0)}%`),
            soc,
            mode: batteryPower > 0 ? 'discharging' : batteryPower < 0 ? 'charging' : 'idle',
        },
        home: createNode(config.home_label ?? 'Dom', home, themeTokens.home, 'Zuzycie'),
        solarToHome,
        solarToBattery,
        solarToGrid,
        gridToHome,
        batteryToHome,
        batteryStoredKwh,
        netHomeDemand,
        gridConnected,
        inverterStatus,
        batteryState,
        batterySoh: parseOptionalNumber(getEntity(hass, config.battery_soh_entity)),
        batteryTemperature: parseOptionalNumber(getEntity(hass, config.battery_temperature_entity)),
        inverterTemperature: parseOptionalNumber(getEntity(hass, config.inverter_temperature_entity)),
        deviceAlarm: parseEntityText(getEntity(hass, config.device_alarm_entity)),
        deviceFault: parseEntityText(getEntity(hass, config.device_fault_entity)),
        batteryAlarm: parseOptionalBoolean(getEntity(hass, config.battery_alarm_entity)),
        batteryFault: parseOptionalBoolean(getEntity(hass, config.battery_fault_entity)),
        workMode: parseEntityText(getEntity(hass, config.work_mode_entity)),
        energyPattern: parseEntityText(getEntity(hass, config.energy_pattern_entity)),
        dailyEnergy: {
            solar: parseOptionalEnergyKwh(getEntity(hass, config.daily_solar_energy_entity)),
            home: parseOptionalEnergyKwh(getEntity(hass, config.daily_home_energy_entity)),
            gridImport: parseOptionalEnergyKwh(getEntity(hass, config.daily_grid_import_energy_entity)),
            gridExport: parseOptionalEnergyKwh(getEntity(hass, config.daily_grid_export_energy_entity)),
            batteryCharge: parseOptionalEnergyKwh(getEntity(hass, config.daily_battery_charge_energy_entity)),
            batteryDischarge: parseOptionalEnergyKwh(getEntity(hass, config.daily_battery_discharge_energy_entity)),
        },
        pvBreakdown: createOptionalBreakdown(hass, [
            { label: 'PV1', entityId: config.pv1_power_entity },
            { label: 'PV2', entityId: config.pv2_power_entity },
            { label: 'PV3', entityId: config.pv3_power_entity },
        ]),
        loadPhaseBreakdown: createOptionalBreakdown(hass, [
            { label: 'L1 load', entityId: config.load_l1_power_entity },
            { label: 'L2 load', entityId: config.load_l2_power_entity },
            { label: 'L3 load', entityId: config.load_l3_power_entity },
        ]),
        gridPhaseBreakdown: createOptionalBreakdown(hass, [
            { label: 'L1 grid', entityId: config.grid_l1_power_entity },
            { label: 'L2 grid', entityId: config.grid_l2_power_entity },
            { label: 'L3 grid', entityId: config.grid_l3_power_entity },
        ]),
    };
}
function formatPower(valueWatts, decimals = 1) {
    const display = withDisplayPower(valueWatts);
    const precision = display.displayUnit === 'kW' ? decimals : 0;
    return `${display.displayValue.toFixed(precision)} ${display.displayUnit}`;
}
function formatEnergy(value, decimals = 0) {
    if (value === null)
        return '--';
    return `${value.toFixed(decimals)}%`;
}
function formatKwh(value, decimals = 1) {
    if (value === null)
        return '--';
    return `${value.toFixed(decimals)} kWh`;
}
function prettifyStatus(value) {
    if (!value)
        return null;
    const normalized = value.toLowerCase();
    const map = {
        idle: 'Idle',
        charging: 'Ladowanie',
        discharging: 'Rozladowanie',
        normal: 'Normal',
        fault: 'Fault',
        alarm: 'Alarm',
        'battery first': 'Battery First',
        'load first': 'Load First',
        'zero export to load': 'Zero Export To Load',
        'selling first': 'Selling First',
        'on-grid': 'On-grid',
        'off-grid': 'Off-grid',
    };
    return map[normalized] ?? value;
}

const DEFAULT_CONFIG = {
    type: 'custom:zs-power-flow-card',
    title: 'Power Flow',
    battery_capacity_kwh: 10,
    theme: 'aurora',
    layout: 'balanced',
    view_mode: 'simple',
    visual_preset: 'default',
    flow_style: 'soft',
    show_details: true,
    details_mode: 'summary',
    show_solar: true,
    show_grid: true,
    show_battery: true,
    animation_enabled: true,
    show_status_bar: true,
    decimals: 1,
};
let ZsPowerFlowCard = class ZsPowerFlowCard extends i {
    constructor() {
        super(...arguments);
        this._config = DEFAULT_CONFIG;
    }
    static getConfigElement() {
        return document.createElement('zs-power-flow-card-editor');
    }
    static getStubConfig() {
        return DEFAULT_CONFIG;
    }
    setConfig(config) {
        if (!config?.type) {
            throw new Error('Config requires a type.');
        }
        this._config = { ...DEFAULT_CONFIG, ...config };
    }
    getCardSize() {
        return this._config.view_mode === 'advanced' ? 6 : 4;
    }
    render() {
        const snapshot = buildSnapshot(this.hass, this._config);
        const theme = getThemeTokens(this._config.theme);
        const layoutClass = this._config.layout === 'focus-home' ? 'layout-focus-home' : 'layout-balanced';
        const advanced = this._config.view_mode === 'advanced';
        const presetClass = `preset-${this._config.visual_preset ?? 'default'}`;
        const flowStyleClass = `flow-style-${this._config.flow_style ?? 'soft'}`;
        return b `
      <ha-card
        style=${`--zs-panel:${theme.panel}; --zs-border:${theme.border}; --zs-text:${theme.text}; --zs-muted:${theme.muted}; --zs-solar:${theme.solar}; --zs-grid:${theme.grid}; --zs-battery:${theme.battery}; --zs-home:${theme.home};`}
      >
        <section class="shell">
          <div class="hero">
            <div class="hero-copy">
              <p class="eyebrow">ZS Power Flow</p>
              <h2>${this._config.title ?? 'Power Flow'}</h2>
              <p class="subtitle">${advanced ? 'Widok zaawansowany z dodatkowymi metrykami' : 'Widok prosty z kluczowym przeplywem energii'}</p>
            </div>
            <div class="hero-side">
              ${this._config.show_status_bar ? this.renderStatusRail(snapshot, advanced) : A}
              <div class="status-pill">${this.describeSystemBalance(snapshot)}</div>
            </div>
          </div>

          <div class=${`stage ${layoutClass} ${presetClass} ${flowStyleClass} ${advanced ? 'stage-advanced' : 'stage-simple'}`}>
            <div class="ambient ambient-a"></div>
            <div class="ambient ambient-b"></div>
            <div class="grid-lines"></div>

            ${this._config.show_solar ? this.renderNode(snapshot.solar, 'top left', 'solar', this._config.solar_entity) : A}
            ${this._config.show_grid ? this.renderNode(snapshot.grid, 'top right', 'grid', this._config.grid_entity) : A}
            ${this.renderCore(snapshot, advanced)}
            ${this._config.show_battery ? this.renderNode(snapshot.battery, 'bottom left', 'battery', this._config.battery_power_entity, snapshot.battery.soc) : A}
            ${this.renderNode(snapshot.home, 'bottom right', 'home', this._config.home_entity)}

            ${this._config.show_solar
            ? this.renderFlow({
                power: snapshot.solar.value,
                color: snapshot.solar.accent,
                path: 'M 224 164 C 250 160, 272 170, 296 190',
                direction: 'forward',
            })
            : A}
            ${this._config.show_grid
            ? this.renderFlow({
                power: Math.abs(snapshot.grid.value),
                color: snapshot.grid.accent,
                path: 'M 474 178 C 444 174, 418 182, 394 198',
                direction: snapshot.grid.value >= 0 ? 'forward' : 'reverse',
            })
            : A}
            ${this._config.show_battery
            ? this.renderFlow({
                power: Math.abs(snapshot.battery.value),
                color: snapshot.battery.accent,
                path: 'M 224 298 C 250 306, 272 296, 296 274',
                direction: snapshot.battery.value > 0 ? 'forward' : 'reverse',
            })
            : A}
            ${this.renderFlow({
            power: snapshot.home.value,
            color: snapshot.home.accent,
            path: 'M 396 274 C 426 292, 452 302, 476 304',
            direction: 'forward',
        })}
          </div>

          ${advanced ? this.renderAdvancedRail(snapshot) : A}
          ${advanced ? this.renderHealthRail(snapshot) : A}
          ${advanced ? this.renderBreakdowns(snapshot) : A}
          ${this._config.show_details ? this.renderDetails(snapshot, advanced) : A}
        </section>
      </ha-card>
    `;
    }
    renderStatusRail(snapshot, advanced) {
        return b `
      <div class="status-rail">
        <div class=${`badge ${snapshot.gridConnected === false ? 'warn' : 'ok'}`}>
          <span class="badge-dot"></span>
          ${snapshot.gridConnected === null ? 'Stan sieci nieznany' : snapshot.gridConnected ? 'On-grid' : 'Off-grid'}
        </div>
        ${advanced && snapshot.inverterStatus
            ? b `<div class="badge info">${snapshot.inverterStatus}</div>`
            : A}
        ${advanced ? b `<div class="badge soft">${this.describeBatteryStatus(snapshot)}</div>` : A}
      </div>
    `;
    }
    renderCore(snapshot, advanced) {
        return b `
      <div class="core">
        <div class="core-ring"></div>
        <div class="core-ring pulse"></div>
        <div class="core-content">
          <span class="core-label">Bilans</span>
          <strong>${formatPower(snapshot.netHomeDemand, this._config.decimals ?? 1)}</strong>
          <small>${advanced ? 'zapotrzebowanie netto i status pracy' : 'zapotrzebowanie netto'}</small>
        </div>
      </div>
    `;
    }
    renderNode(node, position, iconName, entityId, soc) {
        return b `
      <article
        class=${`node ${position} ${entityId ? 'clickable' : ''}`}
        style=${`--accent:${node.accent};`}
        @click=${() => this.showMoreInfo(entityId)}
      >
        <div class="icon">${this.renderIcon(iconName)}</div>
        <div class="meta">
          <span class="label">${node.label}</span>
          <strong>${formatPower(node.value, this._config.decimals ?? 1)}</strong>
          <small>${node.secondary}</small>
          ${soc === undefined ? A : b `<small class="soc">Poziom: ${formatEnergy(soc, 0)}</small>`}
        </div>
      </article>
    `;
    }
    renderIcon(iconName) {
        const paths = {
            solar: b `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"></path>
        </svg>
      `,
            grid: b `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 4h8l3 5-7 11L5 9l3-5Z"></path>
          <path d="M9 9h6M8 13h8M7 17h10"></path>
        </svg>
      `,
            battery: b `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="7" width="14" height="10" rx="2"></rect>
          <path d="M20 10v4"></path>
          <path d="M7 12h6M10 9v6"></path>
        </svg>
      `,
            home: b `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 11.5 12 5l8 6.5"></path>
          <path d="M6.5 10.5V19h11v-8.5"></path>
          <path d="M10 19v-5h4v5"></path>
        </svg>
      `,
        };
        return paths[iconName];
    }
    renderFlow({ power, color, path, direction, }) {
        const active = power > 12;
        const width = Math.max(2, Math.min(8, Math.abs(power) < 250 ? 2.6 : Math.abs(power) / 420));
        const animate = this._config.animation_enabled ?? true;
        const glow = Math.max(0.16, Math.min(0.42, Math.abs(power) / 3000));
        const style = this._config.flow_style ?? 'soft';
        const directionClass = direction === 'reverse' ? 'reverse' : 'forward';
        return b `
      <svg class="flow" viewBox="0 0 640 420" preserveAspectRatio="none" aria-hidden="true">
        <path class="flow-track" d=${path}></path>
        <path
          class=${`flow-aura ${style} ${active ? 'visible' : ''}`}
          style=${`--flow-color:${color}; --flow-width:${width + 4}px; --flow-opacity:${glow};`}
          d=${path}
        ></path>
        <path
          class=${`flow-line ${style} ${directionClass} ${active ? 'visible' : ''} ${active && animate ? 'active' : ''}`}
          style=${`--flow-color:${color}; --flow-width:${width}px; --flow-speed:${Math.max(2.6, 7.6 - Math.min(Math.abs(power) / 700, 4.2))}s;`}
          d=${path}
        ></path>
      </svg>
    `;
    }
    renderDetails(snapshot, advanced) {
        const baseCards = b `
      <div class="detail-card highlight">
        <span>PV do domu</span>
        <strong>${formatPower(snapshot.solarToHome, this._config.decimals ?? 1)}</strong>
      </div>
      <div class="detail-card">
        <span>PV do magazynu</span>
        <strong>${formatPower(snapshot.solarToBattery, this._config.decimals ?? 1)}</strong>
      </div>
      <div class="detail-card">
        <span>Siec do domu</span>
        <strong>${formatPower(snapshot.gridToHome, this._config.decimals ?? 1)}</strong>
      </div>
      <div class="detail-card">
        <span>Energia w baterii</span>
        <strong>${formatKwh(snapshot.batteryStoredKwh, 1)}</strong>
      </div>
    `;
        if (!advanced) {
            return b `<section class="details simple">${baseCards}</section>`;
        }
        return b `
      <section class="details advanced">
        ${baseCards}
        <div class="detail-card">
          <span>Eksport do sieci</span>
          <strong>${formatPower(snapshot.solarToGrid, this._config.decimals ?? 1)}</strong>
        </div>
        <div class="detail-card">
          <span>Oddawanie z baterii</span>
          <strong>${formatPower(snapshot.batteryToHome, this._config.decimals ?? 1)}</strong>
        </div>
        <div class="detail-card metric">
          <span>Dzienna produkcja</span>
          <strong>${formatKwh(snapshot.dailyEnergy.solar, 1)}</strong>
        </div>
        <div class="detail-card metric">
          <span>Dzienne zuzycie</span>
          <strong>${formatKwh(snapshot.dailyEnergy.home, 1)}</strong>
        </div>
        <div class="detail-card metric">
          <span>Import dzisiaj</span>
          <strong>${formatKwh(snapshot.dailyEnergy.gridImport, 1)}</strong>
        </div>
        <div class="detail-card metric">
          <span>Eksport dzisiaj</span>
          <strong>${formatKwh(snapshot.dailyEnergy.gridExport, 1)}</strong>
        </div>
        <div class="detail-card metric">
          <span>Ladowanie baterii dzisiaj</span>
          <strong>${formatKwh(snapshot.dailyEnergy.batteryCharge, 1)}</strong>
        </div>
        <div class="detail-card metric">
          <span>Rozladowanie baterii dzisiaj</span>
          <strong>${formatKwh(snapshot.dailyEnergy.batteryDischarge, 1)}</strong>
        </div>
      </section>
    `;
    }
    renderAdvancedRail(snapshot) {
        return b `
      <section class="advanced-rail">
        <div class="rail-card">
          <span>Tryb pracy</span>
          <strong>${prettifyStatus(snapshot.workMode) ?? this.describeSystemBalance(snapshot)}</strong>
          <small>${prettifyStatus(snapshot.energyPattern) ?? prettifyStatus(snapshot.inverterStatus) ?? 'Brak statusu inwertera'}</small>
        </div>
        <div class="rail-card">
          <span>Stan magazynu</span>
          <strong>${this.describeBatteryStatus(snapshot)}</strong>
          <small>${prettifyStatus(snapshot.batteryState) ?? (snapshot.battery.soc === null ? 'SOC nieznany' : `SOC ${snapshot.battery.soc.toFixed(0)}%`)}</small>
        </div>
        <div class="rail-card">
          <span>Tryb polaczenia</span>
          <strong>${snapshot.gridConnected === null ? 'Nieznany' : snapshot.gridConnected ? 'On-grid' : 'Off-grid'}</strong>
          <small>${snapshot.grid.value >= 0 ? 'Import z sieci' : 'Eksport do sieci'}</small>
        </div>
      </section>
    `;
    }
    renderBreakdowns(snapshot) {
        const showPv = (this._config.show_pv_breakdown ?? true) && snapshot.pvBreakdown.length > 0;
        const showLoadPhases = (this._config.show_phase_breakdown ?? true) && snapshot.loadPhaseBreakdown.length > 0;
        const showGridPhases = (this._config.show_phase_breakdown ?? true) && snapshot.gridPhaseBreakdown.length > 0;
        if (!showPv && !showLoadPhases && !showGridPhases) {
            return A;
        }
        return b `
      <section class="breakdown-grid">
        ${showPv ? this.renderBreakdownCard('MPPT / PV', snapshot.pvBreakdown) : A}
        ${showLoadPhases ? this.renderBreakdownCard('Fazy obciazenia', snapshot.loadPhaseBreakdown) : A}
        ${showGridPhases ? this.renderBreakdownCard('Fazy sieci', snapshot.gridPhaseBreakdown) : A}
      </section>
    `;
    }
    renderBreakdownCard(title, items) {
        return b `
      <div class="breakdown-card">
        <span class="breakdown-title">${title}</span>
        <div class="breakdown-list">
          ${items.map((item) => b `
              <div class="breakdown-item">
                <span>${item.label}</span>
                <strong>${formatPower(item.value, this._config.decimals ?? 1)}</strong>
              </div>
            `)}
        </div>
      </div>
    `;
    }
    renderHealthRail(snapshot) {
        return b `
      <section class="health-rail">
        <div class="health-card">
          <span>Kondycja baterii</span>
          <strong>${snapshot.batterySoh === null ? '--' : `${snapshot.batterySoh.toFixed(1)}% SOH`}</strong>
          <small>${snapshot.batteryTemperature === null ? 'Temp. baterii --' : `Temp. baterii ${snapshot.batteryTemperature.toFixed(0)}°C`}</small>
        </div>
        <div class="health-card">
          <span>Temperatura falownika</span>
          <strong>${snapshot.inverterTemperature === null ? '--' : `${snapshot.inverterTemperature.toFixed(0)}°C`}</strong>
          <small>${snapshot.inverterStatus ?? 'Brak statusu'}</small>
        </div>
        <div class="health-card ${this.isHealthy(snapshot.deviceAlarm) ? '' : 'warn'}">
          <span>Alarm urzadzenia</span>
          <strong>${snapshot.deviceAlarm ?? '--'}</strong>
          <small>Fault: ${snapshot.deviceFault ?? '--'}</small>
        </div>
        <div class="health-card ${snapshot.batteryAlarm === false && snapshot.batteryFault === false ? '' : 'warn'}">
          <span>Alarm baterii</span>
          <strong>${this.describeBinaryHealth(snapshot.batteryAlarm)}</strong>
          <small>Fault: ${this.describeBinaryHealth(snapshot.batteryFault)}</small>
        </div>
      </section>
    `;
    }
    describeSystemBalance(snapshot) {
        if (snapshot.gridConnected === false) {
            return 'Praca off-grid';
        }
        if (snapshot.solar.value > snapshot.home.value && snapshot.grid.value < 0) {
            return 'Nadwyzka produkcji';
        }
        if (snapshot.grid.value > 0 && snapshot.solar.value < snapshot.home.value) {
            return 'Wsparcie z sieci';
        }
        if (snapshot.battery.mode === 'discharging') {
            return 'Praca z magazynu';
        }
        if (snapshot.battery.mode === 'charging') {
            return 'Ladowanie magazynu';
        }
        return 'Przeplyw stabilny';
    }
    describeBatteryStatus(snapshot) {
        if (snapshot.batteryState)
            return prettifyStatus(snapshot.batteryState) ?? snapshot.batteryState;
        if (snapshot.battery.mode === 'charging')
            return 'Ladowanie';
        if (snapshot.battery.mode === 'discharging')
            return 'Rozladowanie';
        return 'Stabilny bufor';
    }
    showMoreInfo(entityId) {
        if (!entityId || !this.hass)
            return;
        this.dispatchEvent(new CustomEvent('hass-more-info', {
            detail: { entityId },
            bubbles: true,
            composed: true,
        }));
    }
    isHealthy(value) {
        if (!value)
            return true;
        return ['ok', 'normal', 'none', 'idle'].includes(value.toLowerCase());
    }
    describeBinaryHealth(value) {
        if (value === null)
            return '--';
        return value ? 'Alarm' : 'OK';
    }
};
ZsPowerFlowCard.styles = i$3 `
    :host {
      display: block;
    }

    ha-card {
      background: var(--zs-panel);
      border: 1px solid var(--zs-border);
      border-radius: 30px;
      color: var(--zs-text);
      overflow: hidden;
      box-shadow:
        0 24px 80px rgba(0, 0, 0, 0.28),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }

    .shell {
      padding: 24px;
      position: relative;
      max-width: 1480px;
      margin: 0 auto;
      background:
        radial-gradient(circle at top left, rgba(255, 255, 255, 0.14), transparent 28%),
        radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.08), transparent 30%);
    }

    .hero {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      align-items: flex-start;
      margin-bottom: 18px;
    }

    .hero-copy {
      max-width: 420px;
    }

    .hero-side {
      display: grid;
      gap: 10px;
      justify-items: end;
    }

    .eyebrow {
      margin: 0 0 6px;
      text-transform: uppercase;
      letter-spacing: 0.24em;
      font-size: 0.72rem;
      color: var(--zs-muted);
    }

    h2 {
      margin: 0;
      font-size: clamp(1.6rem, 2.3vw, 2.25rem);
      line-height: 1;
    }

    .subtitle {
      margin: 10px 0 0;
      color: var(--zs-muted);
      font-size: 0.92rem;
      line-height: 1.45;
    }

    .status-rail {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .badge,
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--zs-muted);
      font-size: 0.82rem;
      white-space: nowrap;
    }

    .badge.ok .badge-dot {
      background: #86efac;
    }

    .badge.warn .badge-dot {
      background: #fca5a5;
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #93c5fd;
      box-shadow: 0 0 10px currentColor;
    }

    .badge.soft {
      background: rgba(255, 255, 255, 0.05);
    }

    .stage {
      position: relative;
      min-height: 430px;
      border-radius: 26px;
      overflow: hidden;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01)),
        rgba(7, 10, 18, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.07);
    }

    .stage-advanced {
      min-height: 450px;
    }

    .stage.preset-compact {
      min-height: 390px;
    }

    .stage.preset-analytics {
      min-height: 470px;
    }

    .ambient {
      position: absolute;
      border-radius: 999px;
      filter: blur(36px);
      opacity: 0.26;
      pointer-events: none;
    }

    .ambient-a {
      top: 36px;
      left: 70px;
      width: 140px;
      height: 140px;
      background: var(--zs-solar);
      animation: float 12s ease-in-out infinite;
    }

    .ambient-b {
      right: 90px;
      bottom: 52px;
      width: 160px;
      height: 160px;
      background: var(--zs-home);
      animation: float 14s ease-in-out infinite reverse;
    }

    .grid-lines {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
      background-size: 28px 28px;
      mask-image: radial-gradient(circle at center, black 32%, transparent 82%);
      opacity: 0.3;
    }

    .core {
      position: absolute;
      inset: 50% auto auto 50%;
      transform: translate(-50%, -50%);
      width: 168px;
      height: 168px;
      display: grid;
      place-items: center;
      z-index: 2;
    }

    .stage.layout-focus-home .core {
      width: 188px;
      height: 188px;
    }

    .core-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background:
        radial-gradient(circle, rgba(255,255,255,0.18), rgba(255,255,255,0.03) 62%, transparent 63%),
        conic-gradient(from 180deg, rgba(255,255,255,0.16), transparent, rgba(255,255,255,0.2));
      box-shadow:
        inset 0 0 46px rgba(255, 255, 255, 0.08),
        0 0 40px rgba(255, 255, 255, 0.06);
    }

    .core-ring.pulse {
      inset: -12px;
      opacity: 0.28;
      animation: pulse 4.8s ease-in-out infinite;
    }

    .core-content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 22px;
    }

    .core-label,
    .core-content small {
      display: block;
      color: var(--zs-muted);
    }

    .core-content strong {
      display: block;
      margin: 8px 0 4px;
      font-size: 1.55rem;
    }

    .node {
      position: absolute;
      width: 178px;
      padding: 16px;
      border-radius: 24px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025)),
        rgba(9, 13, 24, 0.34);
      border: 1px solid rgba(255, 255, 255, 0.09);
      backdrop-filter: blur(14px);
      display: flex;
      gap: 14px;
      z-index: 2;
      box-shadow:
        0 18px 34px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255,255,255,0.05);
      transition: transform 180ms ease, border-color 180ms ease;
    }

    .node:hover {
      transform: translateY(-2px);
      border-color: color-mix(in srgb, var(--accent) 28%, rgba(255,255,255,0.08));
    }

    .node.clickable {
      cursor: pointer;
    }

    .top.left {
      top: 26px;
      left: 26px;
    }

    .top.right {
      top: 26px;
      right: 26px;
    }

    .bottom.left {
      bottom: 26px;
      left: 26px;
    }

    .bottom.right {
      bottom: 26px;
      right: 26px;
    }

    .icon {
      width: 52px;
      height: 52px;
      border-radius: 18px;
      background: color-mix(in srgb, var(--accent) 24%, transparent);
      color: var(--accent);
      display: grid;
      place-items: center;
      flex: 0 0 auto;
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent);
    }

    .icon svg {
      width: 24px;
      height: 24px;
      stroke: currentColor;
      fill: none;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .icon svg circle,
    .icon svg rect {
      fill: none;
    }

    .meta {
      display: grid;
      gap: 4px;
    }

    .label,
    .meta small {
      color: var(--zs-muted);
    }

    .meta strong {
      font-size: 1.28rem;
      line-height: 1.05;
    }

    .soc {
      margin-top: 2px;
    }

    .flow {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      overflow: visible;
    }

    .flow-track {
      fill: none;
      stroke: rgba(255, 255, 255, 0.06);
      stroke-width: 2;
      stroke-linecap: round;
    }

    .flow-aura {
      fill: none;
      stroke: var(--flow-color);
      stroke-width: var(--flow-width);
      stroke-linecap: round;
      opacity: 0;
      filter: blur(8px);
    }

    .flow-aura.visible {
      opacity: var(--flow-opacity);
    }

    .flow-line {
      fill: none;
      stroke: var(--flow-color);
      stroke-width: var(--flow-width);
      stroke-linecap: round;
      stroke-dasharray: 18 24;
      opacity: 0.14;
      filter: drop-shadow(0 0 10px color-mix(in srgb, var(--flow-color) 45%, transparent));
    }

    .flow-line.soft {
      stroke-dasharray: 18 24;
    }

    .flow-line.beam {
      stroke-dasharray: 28 34;
      filter: drop-shadow(0 0 14px color-mix(in srgb, var(--flow-color) 55%, transparent));
    }

    .flow-line.pulse {
      stroke-dasharray: 10 18;
      filter: drop-shadow(0 0 12px color-mix(in srgb, var(--flow-color) 52%, transparent));
    }

    .flow-aura.beam.visible {
      opacity: calc(var(--flow-opacity) + 0.08);
    }

    .flow-aura.pulse.visible {
      opacity: calc(var(--flow-opacity) + 0.02);
    }

    .flow-line.visible {
      opacity: 0.9;
    }

    .flow-line.active {
      animation: flow var(--flow-speed) linear infinite;
    }

    .flow-line.reverse.active {
      animation-direction: reverse;
    }

    .flow-line.pulse.active {
      animation:
        flow var(--flow-speed) linear infinite,
        flowPulse 2.8s ease-in-out infinite;
    }

    .flow-line.pulse.reverse.active {
      animation-direction: reverse, normal;
    }

    .details {
      display: grid;
      gap: 12px;
      margin-top: 16px;
    }

    .breakdown-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-top: 12px;
    }

    .breakdown-card {
      padding: 14px 16px;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
        rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
    }

    .breakdown-title {
      display: block;
      color: var(--zs-muted);
      margin-bottom: 10px;
      font-size: 0.84rem;
    }

    .breakdown-list {
      display: grid;
      gap: 8px;
    }

    .breakdown-item {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: baseline;
      padding-top: 8px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }

    .breakdown-item:first-child {
      border-top: 0;
      padding-top: 0;
    }

    .breakdown-item span {
      color: var(--zs-muted);
    }

    .breakdown-item strong {
      font-size: 0.98rem;
    }

    .advanced-rail {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-top: 16px;
    }

    .health-rail {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-top: 12px;
    }

    .rail-card {
      padding: 14px 16px;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
        rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
    }

    .health-card {
      padding: 14px 16px;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
        rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
    }

    .health-card.warn {
      border-color: rgba(248, 113, 113, 0.3);
      box-shadow: inset 0 0 0 1px rgba(248, 113, 113, 0.08);
    }

    .health-card span,
    .health-card small {
      display: block;
      color: var(--zs-muted);
    }

    .health-card strong {
      display: block;
      margin: 6px 0 4px;
      font-size: 1.02rem;
    }

    .rail-card span,
    .rail-card small {
      display: block;
      color: var(--zs-muted);
    }

    .rail-card strong {
      display: block;
      margin: 6px 0 4px;
      font-size: 1.05rem;
    }

    .details.simple {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .details.advanced {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      align-items: start;
    }

    .detail-card {
      padding: 12px 14px;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
        rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      min-height: 68px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .detail-card.highlight {
      border-color: color-mix(in srgb, var(--zs-solar) 22%, rgba(255,255,255,0.06));
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03);
    }

    .detail-card.metric {
      background:
        linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.018)),
        rgba(5, 9, 17, 0.18);
      min-height: 70px;
    }

    .detail-card span {
      display: block;
      color: var(--zs-muted);
      margin-bottom: 4px;
      font-size: 0.77rem;
      line-height: 1.3;
    }

    .detail-card strong {
      font-size: 1.3rem;
      line-height: 1.02;
      letter-spacing: -0.01em;
    }

    @keyframes flow {
      from {
        stroke-dashoffset: 0;
      }
      to {
        stroke-dashoffset: -168;
      }
    }

    @keyframes flowPulse {
      0%, 100% {
        opacity: 0.72;
      }
      50% {
        opacity: 1;
      }
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(0.98);
        opacity: 0.18;
      }
      50% {
        transform: scale(1.03);
        opacity: 0.32;
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translate3d(0, 0, 0);
      }
      50% {
        transform: translate3d(10px, -12px, 0);
      }
    }

    @media (max-width: 760px) {
      .hero {
        flex-direction: column;
      }

      .hero-side {
        justify-items: start;
      }

      .status-rail {
        justify-content: flex-start;
      }

      .details.simple,
      .details.advanced {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .advanced-rail {
        grid-template-columns: 1fr;
      }

      .health-rail {
        grid-template-columns: 1fr;
      }

      .breakdown-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (min-width: 1180px) {
      .stage {
        min-height: 500px;
      }

      .stage-advanced {
        min-height: 530px;
      }

      .top.left {
        top: 34px;
        left: 40px;
      }

      .top.right {
        top: 34px;
        right: 40px;
      }

      .bottom.left {
        bottom: 34px;
        left: 40px;
      }

      .bottom.right {
        bottom: 34px;
        right: 40px;
      }

      .node {
        width: 208px;
        padding: 18px;
      }

      .icon {
        width: 58px;
        height: 58px;
      }

      .meta strong {
        font-size: 1.5rem;
      }

      .core {
        width: 198px;
        height: 198px;
      }

      .stage.layout-focus-home .core {
        width: 220px;
        height: 220px;
      }

      .details.simple {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .details.advanced {
        grid-template-columns: repeat(6, minmax(0, 1fr));
      }

      .detail-card {
        min-height: 72px;
      }

      .detail-card.metric {
        min-height: 74px;
      }

      .detail-card strong {
        font-size: 1.36rem;
      }

      .advanced-rail {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .health-rail {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .breakdown-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 560px) {
      .shell {
        padding: 16px;
      }

      .stage {
        min-height: 700px;
      }

      .node {
        width: calc(50% - 20px);
        gap: 10px;
        padding: 14px;
      }

      .icon {
        width: 46px;
        height: 46px;
      }

      .details.simple,
      .details.advanced {
        grid-template-columns: 1fr;
      }
    }
  `;
__decorate([
    n({ attribute: false })
], ZsPowerFlowCard.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], ZsPowerFlowCard.prototype, "_config", void 0);
ZsPowerFlowCard = __decorate([
    t('zs-power-flow-card')
], ZsPowerFlowCard);
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'zs-power-flow-card',
    name: 'ZS Power Flow Card',
    description: 'Modern configurable power flow card for Home Assistant.',
});

export { ZsPowerFlowCard };
//# sourceMappingURL=zs-power-flow-card.js.map
