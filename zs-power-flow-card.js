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
const t$2=globalThis,e$4=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$3,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

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

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1=(e,t,c)=>(c.configurable=true,c.enumerable=true,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,c),c);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e(e,r){return (n,s,i)=>{const o=t=>t.renderRoot?.querySelector(e)??null;return e$1(n,s,{get(){return o(this)}})}}

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
        ${this.renderWizardSection(config)}
        ${this.renderRecommendationSection(config)}
        ${this.renderValidationSection(config)}

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
            ['console', 'Console'],
        ], 'Default jest zbalansowany, Compact bardziej zwarty, Analytics robi wiecej miejsca na dane pomocnicze, a Console nawiazuje do prostych ekranow inwertera i paneli HMI.')}
            ${this.renderSelectField('Styl flow', 'flow_style', config.flow_style ?? 'soft', [
            ['soft', 'Soft'],
            ['beam', 'Beam'],
            ['pulse', 'Pulse'],
        ], 'Zmienia charakter animacji przeplywu energii bez zmiany danych.')}
            ${this.renderSelectField('Glowna wartosc baterii', 'battery_primary_metric', config.battery_primary_metric ?? 'power', [
            ['power', 'Moc (W / kW)'],
            ['soc', 'SOC (%)'],
        ], 'Pozwala wybrac, czy na kafelku magazynu najwieksza wartoscia ma byc aktualna moc baterii czy poziom naladowania.')}
            ${this.renderSelectField('Tryb szczegolow', 'details_mode', config.details_mode ?? 'summary', [
            ['summary', 'Summary'],
            ['extended', 'Extended'],
        ], 'Extended pokazuje wiecej kart z przeplywami i energiami dziennymi.')}
            ${this.renderNumberField('Miejsca po przecinku', 'decimals', config.decimals, 'Ile cyfr po przecinku pokazywac dla wartosci mocy.')}
            ${this.renderNumberField('Prog szumu mocy (W)', 'power_noise_floor_w', config.power_noise_floor_w, 'Male wartosci ponizej tego progu beda ignorowane w kierunku flow, zeby nie pokazywac pozornego wsparcia przy kilku watach. Domyslnie 30 W.')}
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
            <h4>Akcje</h4>
            <p>Co ma sie stac po kliknieciu lub przytrzymaniu glownego bloku PV, sieci, baterii i domu.</p>
          </div>

          <div class="grid two">
            ${this.renderActionTypeField('Klikniecie', 'tap_action', config.tap_action, 'Domyslnie otwiera more-info dla kliknietej encji.')}
            ${this.renderActionTypeField('Przytrzymanie', 'hold_action', config.hold_action, 'Moze otwierac more-info, przechodzic do widoku albo otwierac URL.')}
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
    renderWizardSection(config) {
        const profile = this.detectProfile();
        const profileLabel = profile === 'solarman' ? 'Solarman-like' : profile === 'deye_sunsynk' ? 'Deye / Sunsynk-like' : 'Generic';
        return b `
      <section class="section accent">
        <div class="section-header">
          <h4>Szybki start</h4>
          <p>Wykryty profil: <strong>${profileLabel}</strong>. Mozesz uzupelnic konfiguracje jednym kliknieciem i potem tylko ja skorygowac.</p>
        </div>

        <div class="wizard-actions">
          <button type="button" class="wizard-button" @click=${() => this.applySuggestedConfig(this.buildWizardConfig('core'))}>
            Ustaw podstawowe encje
          </button>
          <button type="button" class="wizard-button" @click=${() => this.applySuggestedConfig(this.buildWizardConfig('advanced'))}>
            Ustaw advanced
          </button>
          <button
            type="button"
            class="wizard-button secondary"
            @click=${() => this.applySuggestedConfig(this.buildWizardConfig(profile === 'generic' ? 'advanced' : 'profile'))}
          >
            Zastosuj preset ${profileLabel}
          </button>
        </div>
      </section>
    `;
    }
    renderRecommendationSection(config) {
        const recommendations = this.getRecommendations().filter(({ key, value }) => value && config[key] !== value);
        if (recommendations.length === 0)
            return b ``;
        return b `
      <section class="section accent">
        <div class="section-header">
          <h4>Rekomendowane mapowanie</h4>
          <p>Znalazlem encje, ktore wygladaja na dobre kandydaty. Mozesz je wstawic jednym kliknieciem.</p>
        </div>

        <div class="recommendation-list">
          ${recommendations.map(({ label, key, value, reason }) => b `
              <button type="button" class="recommendation" @click=${() => this.updateConfig(key, value)}>
                <strong>${label}</strong>
                <span>${value}</span>
                <small>${reason}</small>
              </button>
            `)}
        </div>
      </section>
    `;
    }
    renderValidationSection(config) {
        const issues = [];
        const required = [
            ['solar_entity', 'Produkcja PV'],
            ['grid_entity', 'Moc sieci'],
            ['battery_power_entity', 'Moc baterii'],
            ['battery_soc_entity', 'SOC baterii'],
            ['home_entity', 'Zuzycie domu'],
        ];
        required.forEach(([key, label]) => {
            if (!config[key])
                issues.push(`Brakuje pola: ${label}.`);
        });
        const coreValues = [config.solar_entity, config.grid_entity, config.battery_power_entity, config.battery_soc_entity, config.home_entity]
            .filter((value) => Boolean(value));
        const duplicates = coreValues.filter((value, index) => coreValues.indexOf(value) !== index);
        if (duplicates.length > 0) {
            issues.push(`Te same encje sa uzyte wielokrotnie: ${Array.from(new Set(duplicates)).join(', ')}.`);
        }
        if (issues.length === 0)
            return b ``;
        return b `
      <section class="section warning">
        <div class="section-header">
          <h4>Kontrola konfiguracji</h4>
          <p>To nie blokuje karty, ale warto to sprawdzic przed zapisaniem.</p>
        </div>
        <div class="validation-list">
          ${issues.map((issue) => b `<div class="validation-item">${issue}</div>`)}
        </div>
      </section>
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
    renderActionTypeField(label, key, value, helpText) {
        const action = value?.action ?? 'more-info';
        return b `
      <div class="field action-group">
        <span class="field-label">${label}</span>
        <select
          class="text-input"
          .value=${action}
          @change=${(event) => this.updateActionConfig(key, { action: event.target.value })}
        >
          <option value="more-info" ?selected=${action === 'more-info'}>More info</option>
          <option value="navigate" ?selected=${action === 'navigate'}>Navigate</option>
          <option value="url" ?selected=${action === 'url'}>Open URL</option>
          <option value="none" ?selected=${action === 'none'}>None</option>
        </select>
        ${action === 'navigate'
            ? b `
              <input
                class="text-input"
                .value=${value?.navigation_path ?? ''}
                placeholder="/lovelace/energia"
                @input=${(event) => this.updateActionConfig(key, {
                action: 'navigate',
                navigation_path: event.target.value || undefined,
            })}
              />
            `
            : ''}
        ${action === 'url'
            ? b `
              <input
                class="text-input"
                .value=${value?.url_path ?? ''}
                placeholder="https://example.com"
                @input=${(event) => this.updateActionConfig(key, {
                action: 'url',
                url_path: event.target.value || undefined,
            })}
              />
            `
            : ''}
        ${helpText ? b `<span class="helper">${helpText}</span>` : ''}
      </div>
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
    getRecommendations() {
        return [
            this.makeRecommendation('Produkcja PV', 'solar_entity', ['pv power', 'pv_power', 'solar power', 'solar_power', 'production']),
            this.makeRecommendation('Moc sieci', 'grid_entity', ['grid power', 'grid_power', 'import power', 'external power', 'internal power']),
            this.makeRecommendation('Moc baterii', 'battery_power_entity', ['battery power', 'battery_power']),
            this.makeRecommendation('SOC baterii', 'battery_soc_entity', ['battery', 'battery soc'], ['battery']),
            this.makeRecommendation('Zuzycie domu', 'home_entity', ['load power', 'load_power', 'home load', 'consumption']),
            this.makeRecommendation('Stan on/off-grid', 'grid_connected_entity', ['grid'], ['binary_sensor']),
            this.makeRecommendation('Status inwertera', 'inverter_status_entity', ['device state', 'inverter status', 'status']),
        ].filter((item) => Boolean(item));
    }
    buildWizardConfig(mode) {
        const profile = this.detectProfile();
        const core = {
            solar_entity: this.findBestEntity(['pv power', 'pv_power', 'solar power', 'production'], ['sensor'])?.entityId,
            grid_entity: this.findBestEntity(['grid power', 'grid_power', 'external power', 'import power'], ['sensor'])?.entityId,
            battery_power_entity: this.findBestEntity(['battery power', 'battery_power'], ['sensor'])?.entityId,
            battery_soc_entity: this.findBestEntity(['battery soc', ' battery ', 'battery'], ['sensor'])?.entityId,
            home_entity: this.findBestEntity(['load power', 'load_power', 'home load', 'consumption'], ['sensor'])?.entityId,
            grid_connected_entity: this.findBestEntity(['grid connected', ' grid '], ['binary_sensor', 'sensor'])?.entityId,
            inverter_status_entity: this.findBestEntity(['device state', 'inverter status', 'status'], ['sensor'])?.entityId,
            power_noise_floor_w: this._config?.power_noise_floor_w ?? 30,
        };
        if (mode === 'core') {
            return core;
        }
        const advanced = {
            ...core,
            daily_solar_energy_entity: this.findBestEntity(['today production', 'daily solar', 'today_production'], ['sensor'])?.entityId,
            daily_home_energy_entity: this.findBestEntity(['today load consumption', 'daily home', 'load consumption'], ['sensor'])?.entityId,
            daily_grid_import_energy_entity: this.findBestEntity(['today energy import', 'daily import', 'energy import'], ['sensor'])?.entityId,
            daily_grid_export_energy_entity: this.findBestEntity(['today energy export', 'daily export', 'energy export'], ['sensor'])?.entityId,
            daily_battery_charge_energy_entity: this.findBestEntity(['today battery charge', 'battery charge'], ['sensor'])?.entityId,
            daily_battery_discharge_energy_entity: this.findBestEntity(['today battery discharge', 'battery discharge'], ['sensor'])?.entityId,
            battery_state_entity: this.findBestEntity(['battery state'], ['sensor'])?.entityId,
            battery_soh_entity: this.findBestEntity(['battery soh'], ['sensor'])?.entityId,
            battery_temperature_entity: this.findBestEntity(['battery temperature'], ['sensor'])?.entityId,
            inverter_temperature_entity: this.findBestEntity(['inverter temperature', 'device temperature', 'temperature'], ['sensor'])?.entityId,
            device_alarm_entity: this.findBestEntity(['device alarm', 'alarm'], ['sensor'])?.entityId,
            device_fault_entity: this.findBestEntity(['device fault', 'fault'], ['sensor'])?.entityId,
            battery_alarm_entity: this.findBestEntity(['battery alarm'], ['binary_sensor', 'sensor'])?.entityId,
            battery_fault_entity: this.findBestEntity(['battery fault'], ['binary_sensor', 'sensor'])?.entityId,
            work_mode_entity: this.findBestEntity(['work mode'], ['sensor', 'select'])?.entityId,
            energy_pattern_entity: this.findBestEntity(['energy pattern'], ['sensor', 'select'])?.entityId,
            pv1_power_entity: this.findBestEntity(['pv1 power', 'pv1_power'], ['sensor'])?.entityId,
            pv2_power_entity: this.findBestEntity(['pv2 power', 'pv2_power'], ['sensor'])?.entityId,
            pv3_power_entity: this.findBestEntity(['pv3 power', 'pv3_power'], ['sensor'])?.entityId,
            load_l1_power_entity: this.findBestEntity(['load l1 power', 'load_l1_power'], ['sensor'])?.entityId,
            load_l2_power_entity: this.findBestEntity(['load l2 power', 'load_l2_power'], ['sensor'])?.entityId,
            load_l3_power_entity: this.findBestEntity(['load l3 power', 'load_l3_power'], ['sensor'])?.entityId,
            grid_l1_power_entity: this.findBestEntity(['grid l1 power', 'grid_l1_power'], ['sensor'])?.entityId,
            grid_l2_power_entity: this.findBestEntity(['grid l2 power', 'grid_l2_power'], ['sensor'])?.entityId,
            grid_l3_power_entity: this.findBestEntity(['grid l3 power', 'grid_l3_power'], ['sensor'])?.entityId,
            view_mode: 'advanced',
            visual_preset: profile === 'generic' ? 'default' : 'analytics',
        };
        if (mode === 'advanced') {
            return advanced;
        }
        if (profile === 'solarman') {
            return {
                ...advanced,
                theme: this._config?.theme ?? 'sunset',
                layout: this._config?.layout ?? 'balanced',
                show_pv_breakdown: true,
                show_phase_breakdown: true,
            };
        }
        if (profile === 'deye_sunsynk') {
            return {
                ...advanced,
                theme: this._config?.theme ?? 'aurora',
                visual_preset: 'analytics',
                show_pv_breakdown: true,
                show_phase_breakdown: true,
            };
        }
        return advanced;
    }
    detectProfile() {
        const entityIds = Object.keys(this.hass?.states ?? {}).join(' ').toLowerCase();
        if (entityIds.includes('solarman'))
            return 'solarman';
        if (entityIds.includes('deye') || entityIds.includes('sunsynk'))
            return 'deye_sunsynk';
        return 'generic';
    }
    applySuggestedConfig(patch) {
        const sanitized = Object.fromEntries(Object.entries(patch).filter(([, value]) => value !== undefined && value !== ''));
        const nextConfig = {
            ...this._config,
            ...sanitized,
        };
        this._config = nextConfig;
        this.dispatchEvent(new CustomEvent('config-changed', {
            detail: { config: nextConfig },
            bubbles: true,
            composed: true,
        }));
    }
    makeRecommendation(label, key, phrases, includeDomains = ['sensor', 'binary_sensor']) {
        const candidate = this.findBestEntity(phrases, includeDomains);
        if (!candidate)
            return null;
        return {
            label,
            key,
            value: candidate.entityId,
            reason: candidate.reason,
        };
    }
    findBestEntity(phrases, includeDomains) {
        const entries = Object.entries(this.hass?.states ?? {})
            .filter(([entityId]) => includeDomains.includes(entityId.split('.')[0]))
            .map(([entityId, state]) => {
            const friendlyName = typeof state.attributes?.friendly_name === 'string' ? state.attributes.friendly_name : '';
            const haystack = `${entityId} ${friendlyName}`.toLowerCase();
            let score = 0;
            const matched = [];
            phrases.forEach((phrase) => {
                if (haystack.includes(phrase)) {
                    score += phrase.length;
                    matched.push(phrase);
                }
            });
            if (score === 0)
                return null;
            return {
                entityId,
                score,
                reason: `Dopasowanie po: ${matched.join(', ')}`,
            };
        })
            .filter((entry) => Boolean(entry))
            .sort((a, b) => b.score - a.score || a.entityId.localeCompare(b.entityId));
        return entries[0];
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
    updateActionConfig(key, patch) {
        const previous = this._config?.[key];
        this.updateConfig(key, {
            ...previous,
            ...patch,
        });
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

    .section.accent {
      border-color: rgba(59, 130, 246, 0.22);
      box-shadow: 0 12px 34px rgba(59, 130, 246, 0.08);
    }

    .section.warning {
      border-color: rgba(245, 158, 11, 0.22);
      box-shadow: 0 12px 34px rgba(245, 158, 11, 0.08);
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

    .recommendation-list,
    .validation-list {
      display: grid;
      gap: 10px;
    }

    .wizard-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .wizard-button {
      border: 1px solid rgba(59, 130, 246, 0.2);
      background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(239,246,255,0.94));
      color: var(--primary-text-color);
      border-radius: 14px;
      padding: 11px 14px;
      font: inherit;
      cursor: pointer;
      transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
    }

    .wizard-button:hover {
      transform: translateY(-1px);
      border-color: rgba(59, 130, 246, 0.32);
      box-shadow: 0 10px 24px rgba(59, 130, 246, 0.12);
    }

    .wizard-button.secondary {
      background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(249,250,251,0.94));
    }

    .recommendation {
      display: grid;
      gap: 2px;
      text-align: left;
      border: 1px solid rgba(59, 130, 246, 0.18);
      background: linear-gradient(180deg, rgba(239,246,255,0.95), rgba(219,234,254,0.84));
      border-radius: 14px;
      padding: 12px 14px;
      cursor: pointer;
      transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
    }

    .recommendation:hover {
      transform: translateY(-1px);
      border-color: rgba(59, 130, 246, 0.3);
      box-shadow: 0 10px 24px rgba(59, 130, 246, 0.12);
    }

    .recommendation strong {
      font-size: 0.92rem;
    }

    .recommendation span,
    .recommendation small,
    .validation-item {
      color: var(--secondary-text-color);
    }

    .validation-item {
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.12);
      font-size: 0.88rem;
      line-height: 1.4;
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

    .action-group {
      align-content: start;
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
function applyNoiseFloor(value, floor) {
    return Math.abs(value) < floor ? 0 : value;
}
function withDisplayPower(valueWatts) {
    const absolute = Math.abs(valueWatts);
    if (absolute >= 1000) {
        return { displayValue: valueWatts / 1000, displayUnit: 'kW' };
    }
    return { displayValue: valueWatts, displayUnit: 'W' };
}
function createNode(label, valueWatts, flowValueWatts, accent, secondary) {
    const display = withDisplayPower(valueWatts);
    return {
        label,
        value: valueWatts,
        flowValue: flowValueWatts,
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
function ratioOrNull(numerator, denominator) {
    if (numerator === null || denominator === null || denominator <= 0)
        return null;
    return clamp((numerator / denominator) * 100, 0, 100);
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
    const noiseFloor = Math.max(0, config.power_noise_floor_w ?? 30);
    const effectiveGrid = applyNoiseFloor(grid, noiseFloor);
    const effectiveBatteryPower = applyNoiseFloor(batteryPower, noiseFloor);
    const socValue = parseOptionalNumber(socEntity) ?? FALLBACK_VALUES_W.batterySoc;
    const soc = Number.isFinite(socValue) ? clamp(socValue, 0, 100) : null;
    const batteryCapacity = config.battery_capacity_kwh ?? 0;
    let remainingSolarSupply = solar;
    let remainingGridImport = Math.max(0, effectiveGrid);
    let remainingBatteryDischarge = Math.max(0, effectiveBatteryPower);
    let remainingHomeDemand = home;
    let remainingBatteryCharge = Math.max(0, -effectiveBatteryPower);
    let remainingGridExport = Math.max(0, -effectiveGrid);
    const solarToHome = Math.min(remainingSolarSupply, remainingHomeDemand);
    remainingSolarSupply -= solarToHome;
    remainingHomeDemand -= solarToHome;
    const batteryToHome = Math.min(remainingBatteryDischarge, remainingHomeDemand);
    remainingBatteryDischarge -= batteryToHome;
    remainingHomeDemand -= batteryToHome;
    const gridToHome = Math.min(remainingGridImport, remainingHomeDemand);
    remainingGridImport -= gridToHome;
    remainingHomeDemand -= gridToHome;
    const solarToBattery = Math.min(remainingSolarSupply, remainingBatteryCharge);
    remainingSolarSupply -= solarToBattery;
    remainingBatteryCharge -= solarToBattery;
    const gridToBattery = Math.min(remainingGridImport, remainingBatteryCharge);
    remainingGridImport -= gridToBattery;
    remainingBatteryCharge -= gridToBattery;
    const solarToGrid = Math.min(remainingSolarSupply, remainingGridExport);
    remainingSolarSupply -= solarToGrid;
    remainingGridExport -= solarToGrid;
    const batteryToGrid = Math.min(remainingBatteryDischarge, remainingGridExport);
    remainingBatteryDischarge -= batteryToGrid;
    remainingGridExport -= batteryToGrid;
    const remainingSources = remainingSolarSupply + remainingGridImport + remainingBatteryDischarge;
    const remainingSinks = remainingHomeDemand + remainingBatteryCharge + remainingGridExport;
    const residualDelta = remainingSources - remainingSinks;
    const residualPower = Math.abs(residualDelta);
    const residualDirection = residualPower < 1
        ? 'balanced'
        : residualDelta > 0
            ? 'unassigned_source'
            : 'unassigned_demand';
    const batteryStoredKwh = soc !== null && batteryCapacity > 0 ? (batteryCapacity * soc) / 100 : null;
    const netHomeDemand = Math.max(0, home - solarToHome);
    const currentSourceTotal = solarToHome + gridToHome + batteryToHome;
    const dailyHomeValue = parseOptionalEnergyKwh(getEntity(hass, config.daily_home_energy_entity));
    const dailyImportValue = parseOptionalEnergyKwh(getEntity(hass, config.daily_grid_import_energy_entity));
    const dailySolarValue = parseOptionalEnergyKwh(getEntity(hass, config.daily_solar_energy_entity));
    const dailyExportValue = parseOptionalEnergyKwh(getEntity(hass, config.daily_grid_export_energy_entity));
    const dailySolarSelfUsed = dailySolarValue !== null && dailyExportValue !== null ? Math.max(0, dailySolarValue - dailyExportValue) : null;
    const batteryRuntimeHours = batteryStoredKwh !== null && home > 0 ? batteryStoredKwh / (home / 1000) : null;
    const residualRate = home > 0 ? clamp((residualPower / home) * 100, 0, 100) : null;
    const gridConnected = parseGridConnected(getEntity(hass, config.grid_connected_entity));
    const inverterStatus = parseEntityText(getEntity(hass, config.inverter_status_entity));
    const batteryState = parseEntityText(getEntity(hass, config.battery_state_entity));
    const dailyEnergy = {
        solar: dailySolarValue,
        home: dailyHomeValue,
        gridImport: dailyImportValue,
        gridExport: dailyExportValue,
        batteryCharge: parseOptionalEnergyKwh(getEntity(hass, config.daily_battery_charge_energy_entity)),
        batteryDischarge: parseOptionalEnergyKwh(getEntity(hass, config.daily_battery_discharge_energy_entity)),
    };
    return {
        solar: createNode(config.solar_label ?? 'Produkcja', solar, solar, themeTokens.solar, 'PV'),
        grid: createNode(config.grid_label ?? 'Siec', grid, effectiveGrid, themeTokens.grid, effectiveGrid >= 0 ? 'Import' : 'Eksport'),
        battery: {
            ...createNode(config.battery_label ?? 'Magazyn', batteryPower, effectiveBatteryPower, themeTokens.battery, soc === null ? 'Stan nieznany' : `SOC ${soc.toFixed(0)}%`),
            soc,
            mode: effectiveBatteryPower > 0 ? 'discharging' : effectiveBatteryPower < 0 ? 'charging' : 'idle',
        },
        home: createNode(config.home_label ?? 'Dom', home, home, themeTokens.home, 'Zuzycie'),
        solarToHome,
        solarToBattery,
        solarToGrid,
        gridToHome,
        gridToBattery,
        batteryToHome,
        batteryToGrid,
        batteryStoredKwh,
        netHomeDemand,
        residualPower,
        residualDirection,
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
        analytics: {
            currentSourceMix: {
                solar: currentSourceTotal > 0 ? (solarToHome / currentSourceTotal) * 100 : 0,
                grid: currentSourceTotal > 0 ? (gridToHome / currentSourceTotal) * 100 : 0,
                battery: currentSourceTotal > 0 ? (batteryToHome / currentSourceTotal) * 100 : 0,
            },
            selfConsumptionRate: ratioOrNull(dailySolarSelfUsed, dailySolarValue),
            selfSufficiencyRate: dailyHomeValue !== null && dailyImportValue !== null
                ? ratioOrNull(Math.max(0, dailyHomeValue - dailyImportValue), dailyHomeValue)
                : null,
            batteryRuntimeHours,
            residualRate,
        },
        dailyEnergy,
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
    battery_primary_metric: 'power',
    show_details: true,
    details_mode: 'summary',
    show_solar: true,
    show_grid: true,
    show_battery: true,
    animation_enabled: true,
    show_status_bar: true,
    decimals: 1,
};
function normalizeActionConfig(actionConfig) {
    const action = actionConfig?.action ?? 'more-info';
    if (action === 'navigate') {
        return {
            action,
            navigation_path: actionConfig?.navigation_path,
        };
    }
    if (action === 'url') {
        return {
            action,
            url_path: actionConfig?.url_path,
        };
    }
    return { action };
}
function normalizeConfig(config) {
    return {
        ...DEFAULT_CONFIG,
        ...config,
        power_noise_floor_w: Math.max(0, config.power_noise_floor_w ?? DEFAULT_CONFIG.power_noise_floor_w ?? 30),
        decimals: Math.max(0, Math.min(3, config.decimals ?? DEFAULT_CONFIG.decimals ?? 1)),
        tap_action: normalizeActionConfig(config.tap_action),
        hold_action: normalizeActionConfig(config.hold_action),
    };
}
let ZsPowerFlowCard = class ZsPowerFlowCard extends i {
    constructor() {
        super(...arguments);
        this._config = DEFAULT_CONFIG;
        this._flowPaths = {
            solar: '',
            grid: '',
            battery: '',
            home: '',
        };
        this._stageSize = { width: 640, height: 420 };
        this._flowFrame = 0;
        this._holdTriggered = false;
        this._observedFlowElements = new Set();
        this.handlePointerUp = () => {
            this.clearHoldTimer();
        };
        this.handlePointerLeave = () => {
            this.clearHoldTimer();
        };
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
        this._config = normalizeConfig(config);
    }
    getCardSize() {
        return this._config.view_mode === 'advanced' ? 6 : 4;
    }
    connectedCallback() {
        super.connectedCallback();
        this._resizeObserver = new ResizeObserver(() => this.scheduleFlowPathUpdate());
    }
    disconnectedCallback() {
        this._resizeObserver?.disconnect();
        this._resizeObserver = undefined;
        this._observedFlowElements.clear();
        cancelAnimationFrame(this._flowFrame);
        this.clearHoldTimer();
        super.disconnectedCallback();
    }
    firstUpdated() {
        this.observeFlowLayout();
        this.scheduleFlowPathUpdate();
    }
    updated(changedProps) {
        const changedKeys = new Set(Array.from(changedProps.keys()).map(String));
        const flowPathsChanged = changedKeys.has('_flowPaths');
        const stageSizeChanged = changedKeys.has('_stageSize');
        if (flowPathsChanged || stageSizeChanged) {
            return;
        }
        this.observeFlowLayout();
        this.scheduleFlowPathUpdate();
    }
    shouldUpdate(changedProps) {
        const changedKeys = new Set(Array.from(changedProps.keys()).map(String));
        const flowPathsChanged = changedKeys.has('_flowPaths');
        const stageSizeChanged = changedKeys.has('_stageSize');
        const configChanged = changedKeys.has('_config');
        if (flowPathsChanged || stageSizeChanged || configChanged) {
            return true;
        }
        if (changedKeys.has('hass')) {
            const previousHass = changedProps.get('hass');
            return this.hasRelevantHassChange(previousHass, this.hass);
        }
        return true;
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
              <p class="subtitle">${advanced ? 'Widok zaawansowany z dodatkowymi metrykami' : 'Widok prosty z kluczowym przepływem energii'}</p>
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

            ${this._config.show_solar
            ? this.renderNode(snapshot.solar, this.getNodePosition('solar'), 'solar', this._config.solar_entity, undefined, this.getConsoleNodeMetrics(snapshot, 'solar'))
            : A}
            ${this._config.show_grid
            ? this.renderNode(snapshot.grid, this.getNodePosition('grid'), 'grid', this._config.grid_entity, undefined, this.getConsoleNodeMetrics(snapshot, 'grid'))
            : A}
            ${this.renderCore(snapshot, advanced)}
            ${this._config.show_battery
            ? this.renderNode(snapshot.battery, this.getNodePosition('battery'), 'battery', this._config.battery_power_entity, snapshot.battery.soc, this.getConsoleNodeMetrics(snapshot, 'battery'), this.getBatteryDisplayOptions(snapshot))
            : A}
            ${this.renderNode(snapshot.home, this.getNodePosition('home'), 'home', this._config.home_entity, undefined, this.getConsoleNodeMetrics(snapshot, 'home'))}

            ${this._config.show_solar
            ? this.renderFlow({
                power: snapshot.solar.flowValue,
                color: snapshot.solar.accent,
                path: this._flowPaths.solar,
                direction: 'forward',
            })
            : A}
            ${this._config.show_grid
            ? this.renderFlow({
                power: Math.abs(snapshot.grid.flowValue),
                color: snapshot.grid.accent,
                path: this._flowPaths.grid,
                direction: snapshot.grid.flowValue >= 0 ? 'forward' : 'reverse',
            })
            : A}
            ${this._config.show_battery
            ? this.renderFlow({
                power: Math.abs(snapshot.battery.flowValue),
                color: snapshot.battery.accent,
                path: this._flowPaths.battery,
                direction: snapshot.battery.flowValue > 0 ? 'forward' : 'reverse',
            })
            : A}
            ${this.renderFlow({
            power: snapshot.home.value,
            color: snapshot.home.accent,
            path: this._flowPaths.home,
            direction: 'forward',
        })}
          </div>

          ${advanced ? this.renderAdvancedRail(snapshot) : A}
          ${advanced ? this.renderAnalyticsRail(snapshot) : A}
          ${advanced ? this.renderHealthRail(snapshot) : A}
          ${advanced ? this.renderBreakdowns(snapshot) : A}
          ${this._config.show_details ? this.renderDetails(snapshot, advanced) : A}
        </section>
      </ha-card>
    `;
    }
    renderStatusRail(snapshot, advanced) {
        const inverterTone = this.getStatusTone(snapshot.inverterStatus);
        const deviceTone = this.getStatusTone(snapshot.deviceAlarm, snapshot.deviceFault);
        return b `
      <div class="status-rail">
        <div class=${`badge ${snapshot.gridConnected === false ? 'warn' : 'ok'}`}>
          <span class="badge-dot"></span>
          ${snapshot.gridConnected === null ? 'Stan sieci nieznany' : snapshot.gridConnected ? 'On-grid' : 'Off-grid'}
        </div>
        ${advanced && snapshot.inverterStatus
            ? b `<div class=${`badge info ${inverterTone}`.trim()}>${snapshot.inverterStatus}</div>`
            : A}
        ${advanced ? b `<div class="badge soft">${this.describeBatteryStatus(snapshot)}</div>` : A}
        ${advanced && snapshot.deviceAlarm
            ? b `<div class=${`badge ${deviceTone}`.trim()}>${snapshot.deviceAlarm}</div>`
            : A}
      </div>
    `;
    }
    renderCore(snapshot, advanced) {
        const coreState = this.getCoreState(snapshot);
        const consolePreset = this._config.visual_preset === 'console';
        return b `
      <div class=${`core ${consolePreset ? 'console-core' : ''}`}>
        <span class="flow-anchor core-anchor top-left"></span>
        <span class="flow-anchor core-anchor top-right"></span>
        <span class="flow-anchor core-anchor bottom-left"></span>
        <span class="flow-anchor core-anchor bottom-right"></span>
        <div class="core-shield"></div>
        <div class="core-ring"></div>
        <div class="core-ring pulse"></div>
        ${consolePreset
            ? b `
              <div class="core-content console">
                <span class="core-label">Inwerter / ładowarka</span>
                <strong>${this.describeBatteryStatus(snapshot)}</strong>
                <small>${snapshot.inverterStatus ?? (advanced ? coreState.detail : coreState.shortDetail)}</small>
                <div class="console-core-stats">
                  <span>${coreState.label}</span>
                  <b>${formatPower(coreState.value, this._config.decimals ?? 1)}</b>
                </div>
              </div>
            `
            : b `
              <div class="core-content">
                <span class="core-label">${coreState.label}</span>
                <strong>${formatPower(coreState.value, this._config.decimals ?? 1)}</strong>
                <small>${advanced ? coreState.detail : coreState.shortDetail}</small>
              </div>
            `}
      </div>
    `;
    }
    renderNode(node, position, iconName, entityId, soc, consoleMetrics = [], displayOptions) {
        const consolePreset = this._config.visual_preset === 'console';
        const primaryText = displayOptions?.primaryText ?? formatPower(node.value, this._config.decimals ?? 1);
        const secondaryText = displayOptions?.secondaryText ?? node.secondary;
        const tertiaryText = displayOptions?.tertiaryText ?? (soc === undefined ? null : `Poziom: ${formatEnergy(soc, 0)}`);
        return b `
      <article
        class=${`node ${position} ${entityId ? 'clickable' : ''}`}
        style=${`--accent:${node.accent};`}
        @click=${() => this.handleTap(entityId)}
        @pointerdown=${() => this.handlePointerDown(entityId)}
        @pointerup=${this.handlePointerUp}
        @pointerleave=${this.handlePointerLeave}
        @pointercancel=${this.handlePointerLeave}
      >
        <span class=${`flow-anchor node-anchor ${iconName}`}></span>
        <div class="icon">${this.renderIcon(iconName)}</div>
        <div class="meta">
          <span class="label">${node.label}</span>
          <strong>${primaryText}</strong>
          <small>${secondaryText}</small>
          ${tertiaryText ? b `<small class="soc">${tertiaryText}</small>` : A}
          ${consolePreset && consoleMetrics.length > 0
            ? b `
                <div class="console-metrics">
                  ${consoleMetrics.map((item) => b `
                      <div class="console-metric-row">
                        <span>${item.label}</span>
                        <b>${item.value}</b>
                      </div>
                    `)}
                </div>
              `
            : A}
        </div>
      </article>
    `;
    }
    getNodePosition(iconName) {
        if (this._config.visual_preset !== 'console') {
            return {
                solar: 'top left',
                grid: 'top right',
                battery: 'bottom left',
                home: 'bottom right',
            }[iconName];
        }
        return {
            solar: 'console-panel console-solar',
            grid: 'console-panel console-grid',
            battery: 'console-panel console-battery',
            home: 'console-panel console-home',
        }[iconName];
    }
    getBatteryDisplayOptions(snapshot) {
        const primaryMetric = this._config.battery_primary_metric ?? 'power';
        if (primaryMetric !== 'soc')
            return undefined;
        return {
            primaryText: snapshot.battery.soc === null ? '--' : `${snapshot.battery.soc.toFixed(0)}%`,
            secondaryText: this.describeBatteryStatus(snapshot),
            tertiaryText: `Moc: ${formatPower(snapshot.battery.value, this._config.decimals ?? 1)}`,
        };
    }
    getConsoleNodeMetrics(snapshot, iconName) {
        if (this._config.visual_preset !== 'console')
            return [];
        if (iconName === 'solar') {
            return snapshot.pvBreakdown.slice(0, 3).map((item) => ({
                label: item.label,
                value: formatPower(item.value, this._config.decimals ?? 1),
            }));
        }
        if (iconName === 'grid') {
            return snapshot.gridPhaseBreakdown.slice(0, 3).map((item) => ({
                label: item.label,
                value: formatPower(item.value, this._config.decimals ?? 1),
            }));
        }
        if (iconName === 'home') {
            return snapshot.loadPhaseBreakdown.slice(0, 3).map((item) => ({
                label: item.label,
                value: formatPower(item.value, this._config.decimals ?? 1),
            }));
        }
        const rows = [];
        if (snapshot.batteryStoredKwh !== null) {
            rows.push({ label: 'Energia', value: formatKwh(snapshot.batteryStoredKwh, 1) });
        }
        if (snapshot.batteryTemperature !== null) {
            rows.push({ label: 'Temp.', value: `${snapshot.batteryTemperature.toFixed(0)}°C` });
        }
        return rows.slice(0, 2);
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
        if (!path)
            return A;
        const active = power > 12;
        const width = Math.max(2, Math.min(8, Math.abs(power) < 250 ? 2.6 : Math.abs(power) / 420));
        const animate = this._config.animation_enabled ?? true;
        const glow = Math.max(0.16, Math.min(0.42, Math.abs(power) / 3000));
        const style = this._config.flow_style ?? 'soft';
        const directionClass = direction === 'reverse' ? 'reverse' : 'forward';
        return b `
      <svg
        class="flow"
        viewBox=${`0 0 ${Math.max(1, this._stageSize.width)} ${Math.max(1, this._stageSize.height)}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path class="flow-track" d=${path}></path>
        <path
          class="flow-base"
          style=${`--flow-color:${color}; --flow-width:${Math.max(2, width - 0.3)}px;`}
          d=${path}
        ></path>
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
    scheduleFlowPathUpdate() {
        cancelAnimationFrame(this._flowFrame);
        this._flowFrame = requestAnimationFrame(() => this.updateFlowPaths());
    }
    observeFlowLayout() {
        if (!this._resizeObserver)
            return;
        const nextElements = new Set();
        nextElements.add(this);
        this.renderRoot.querySelectorAll('.stage, .core, .node, .flow-anchor').forEach((element) => {
            nextElements.add(element);
        });
        nextElements.forEach((element) => {
            if (!this._observedFlowElements.has(element)) {
                this._resizeObserver?.observe(element);
            }
        });
        this._observedFlowElements.forEach((element) => {
            if (!nextElements.has(element)) {
                this._resizeObserver?.unobserve(element);
            }
        });
        this._observedFlowElements = nextElements;
    }
    updateFlowPaths() {
        const stage = this._stageEl;
        const core = this._coreEl;
        if (!stage || !core)
            return;
        const stageRect = stage.getBoundingClientRect();
        const nextStageSize = {
            width: Math.round(stageRect.width),
            height: Math.round(stageRect.height),
        };
        const anchors = {
            solar: stage.querySelector('.node-anchor.solar')?.getBoundingClientRect(),
            grid: stage.querySelector('.node-anchor.grid')?.getBoundingClientRect(),
            battery: stage.querySelector('.node-anchor.battery')?.getBoundingClientRect(),
            home: stage.querySelector('.node-anchor.home')?.getBoundingClientRect(),
            coreTopLeft: stage.querySelector('.core-anchor.top-left')?.getBoundingClientRect(),
            coreTopRight: stage.querySelector('.core-anchor.top-right')?.getBoundingClientRect(),
            coreBottomLeft: stage.querySelector('.core-anchor.bottom-left')?.getBoundingClientRect(),
            coreBottomRight: stage.querySelector('.core-anchor.bottom-right')?.getBoundingClientRect(),
        };
        const nextPaths = this._config.visual_preset === 'console'
            ? {
                solar: this.buildAnchoredPath(anchors.solar, anchors.coreBottomLeft, stageRect, 'bottom-left'),
                grid: this.buildAnchoredPath(anchors.grid, anchors.coreTopLeft, stageRect, 'left'),
                battery: this.buildAnchoredPath(anchors.coreBottomRight, anchors.battery, stageRect, 'bottom-right'),
                home: this.buildAnchoredPath(anchors.coreTopRight, anchors.home, stageRect, 'right'),
            }
            : {
                solar: this.buildAnchoredPath(anchors.solar, anchors.coreTopLeft, stageRect, 'left'),
                grid: this.buildAnchoredPath(anchors.grid, anchors.coreTopRight, stageRect, 'right'),
                battery: this.buildAnchoredPath(anchors.battery, anchors.coreBottomLeft, stageRect, 'bottom-left'),
                home: this.buildAnchoredPath(anchors.coreBottomRight, anchors.home, stageRect, 'bottom-right'),
            };
        if (nextStageSize.width !== this._stageSize.width ||
            nextStageSize.height !== this._stageSize.height) {
            this._stageSize = nextStageSize;
        }
        if (nextPaths.solar !== this._flowPaths.solar ||
            nextPaths.grid !== this._flowPaths.grid ||
            nextPaths.battery !== this._flowPaths.battery ||
            nextPaths.home !== this._flowPaths.home) {
            this._flowPaths = nextPaths;
        }
    }
    hasRelevantHassChange(previousHass, nextHass) {
        if (!previousHass || !nextHass)
            return true;
        return this.getRelevantEntityIds().some((entityId) => previousHass.states[entityId] !== nextHass.states[entityId]);
    }
    getRelevantEntityIds() {
        return [
            this._config.solar_entity,
            this._config.grid_entity,
            this._config.battery_power_entity,
            this._config.battery_soc_entity,
            this._config.home_entity,
            this._config.grid_connected_entity,
            this._config.inverter_status_entity,
            this._config.daily_solar_energy_entity,
            this._config.daily_home_energy_entity,
            this._config.daily_grid_import_energy_entity,
            this._config.daily_grid_export_energy_entity,
            this._config.daily_battery_charge_energy_entity,
            this._config.daily_battery_discharge_energy_entity,
            this._config.battery_state_entity,
            this._config.battery_soh_entity,
            this._config.battery_temperature_entity,
            this._config.inverter_temperature_entity,
            this._config.device_alarm_entity,
            this._config.device_fault_entity,
            this._config.battery_alarm_entity,
            this._config.battery_fault_entity,
            this._config.work_mode_entity,
            this._config.energy_pattern_entity,
            this._config.pv1_power_entity,
            this._config.pv2_power_entity,
            this._config.pv3_power_entity,
            this._config.load_l1_power_entity,
            this._config.load_l2_power_entity,
            this._config.load_l3_power_entity,
            this._config.grid_l1_power_entity,
            this._config.grid_l2_power_entity,
            this._config.grid_l3_power_entity,
        ].filter((entityId) => Boolean(entityId));
    }
    buildAnchoredPath(fromRect, toRect, stageRect, anchor) {
        if (!fromRect || !toRect)
            return '';
        const fromPoint = {
            x: fromRect.left - stageRect.left + fromRect.width / 2,
            y: fromRect.top - stageRect.top + fromRect.height / 2,
        };
        const toPoint = {
            x: toRect.left - stageRect.left + toRect.width / 2,
            y: toRect.top - stageRect.top + toRect.height / 2,
        };
        if (this._config.visual_preset === 'console') {
            return this.buildConsoleAnchoredPath(fromPoint, toPoint, anchor);
        }
        const control1 = this.computeControlPoint(fromPoint, toPoint, anchor, true);
        const control2 = this.computeControlPoint(fromPoint, toPoint, anchor, false);
        return `M ${fromPoint.x.toFixed(1)} ${fromPoint.y.toFixed(1)} C ${control1.x.toFixed(1)} ${control1.y.toFixed(1)}, ${control2.x.toFixed(1)} ${control2.y.toFixed(1)}, ${toPoint.x.toFixed(1)} ${toPoint.y.toFixed(1)}`;
    }
    buildConsoleAnchoredPath(from, to, anchor) {
        const horizontalDirection = to.x >= from.x ? 1 : -1;
        const horizontalGap = Math.abs(to.x - from.x);
        const midX = from.x + horizontalDirection * Math.max(34, horizontalGap * 0.52);
        if (anchor === 'left' || anchor === 'right') {
            return this.buildRoundedPolylinePath([
                from,
                { x: midX, y: from.y },
                { x: midX, y: to.y },
                to,
            ], 18);
        }
        if (anchor === 'bottom-left' || anchor === 'bottom-right') {
            const lowerMidX = from.x + horizontalDirection * Math.max(30, horizontalGap * 0.5);
            return this.buildRoundedPolylinePath([
                from,
                { x: lowerMidX, y: from.y },
                { x: lowerMidX, y: to.y },
                to,
            ], 18);
        }
        const fallbackMidX = from.x + horizontalDirection * Math.max(34, horizontalGap * 0.52);
        return this.buildRoundedPolylinePath([
            from,
            { x: fallbackMidX, y: from.y },
            { x: fallbackMidX, y: to.y },
            to,
        ], 18);
    }
    buildRoundedPolylinePath(points, radius) {
        if (points.length < 2)
            return '';
        let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
        for (let index = 1; index < points.length - 1; index += 1) {
            const previous = points[index - 1];
            const current = points[index];
            const next = points[index + 1];
            const incomingLength = Math.hypot(current.x - previous.x, current.y - previous.y);
            const outgoingLength = Math.hypot(next.x - current.x, next.y - current.y);
            const usableRadius = Math.min(radius, incomingLength / 2, outgoingLength / 2);
            const incomingVector = {
                x: (current.x - previous.x) / Math.max(incomingLength, 1),
                y: (current.y - previous.y) / Math.max(incomingLength, 1),
            };
            const outgoingVector = {
                x: (next.x - current.x) / Math.max(outgoingLength, 1),
                y: (next.y - current.y) / Math.max(outgoingLength, 1),
            };
            const entryPoint = {
                x: current.x - incomingVector.x * usableRadius,
                y: current.y - incomingVector.y * usableRadius,
            };
            const exitPoint = {
                x: current.x + outgoingVector.x * usableRadius,
                y: current.y + outgoingVector.y * usableRadius,
            };
            d += ` L ${entryPoint.x.toFixed(1)} ${entryPoint.y.toFixed(1)}`;
            d += ` Q ${current.x.toFixed(1)} ${current.y.toFixed(1)} ${exitPoint.x.toFixed(1)} ${exitPoint.y.toFixed(1)}`;
        }
        const lastPoint = points[points.length - 1];
        d += ` L ${lastPoint.x.toFixed(1)} ${lastPoint.y.toFixed(1)}`;
        return d;
    }
    computeControlPoint(from, to, anchor, first) {
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2;
        if (anchor === 'left') {
            return first ? { x: mx - 34, y: from.y - 8 } : { x: mx + 10, y: to.y - 2 };
        }
        if (anchor === 'right') {
            return first ? { x: mx + 34, y: from.y - 8 } : { x: mx - 10, y: to.y - 2 };
        }
        if (anchor === 'bottom-left') {
            return first ? { x: from.x + 40, y: from.y + 18 } : { x: to.x - 16, y: my + 18 };
        }
        return first ? { x: from.x + 18, y: my + 18 } : { x: to.x - 44, y: to.y + 10 };
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
        <span>Sieć do domu</span>
          <strong>${formatPower(snapshot.gridToHome, this._config.decimals ?? 1)}</strong>
        </div>
        <div class="detail-card">
          <span>Sieć do magazynu</span>
          <strong>${formatPower(snapshot.gridToBattery, this._config.decimals ?? 1)}</strong>
        </div>
        <div class="detail-card">
          <span>Energia w baterii</span>
          <strong>${formatKwh(snapshot.batteryStoredKwh, 1)}</strong>
        </div>
      `;
        if (!advanced) {
            return b `<section class="details simple">${baseCards}</section>`;
        }
        const residualCard = snapshot.residualPower > 0
            ? b `
            <div class="detail-card warn">
              <span>${this.describeResidualLabel(snapshot)}</span>
              <strong>${formatPower(snapshot.residualPower, this._config.decimals ?? 1)}</strong>
            </div>
          `
            : A;
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
        <div class="detail-card">
          <span>Bateria do sieci</span>
          <strong>${formatPower(snapshot.batteryToGrid, this._config.decimals ?? 1)}</strong>
        </div>
        ${residualCard}
        <div class="detail-card metric">
          <span>Dzienna produkcja</span>
          <strong>${formatKwh(snapshot.dailyEnergy.solar, 1)}</strong>
        </div>
        <div class="detail-card metric">
          <span>Dzienne zużycie</span>
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
          <span>Ładowanie baterii dzisiaj</span>
          <strong>${formatKwh(snapshot.dailyEnergy.batteryCharge, 1)}</strong>
        </div>
        <div class="detail-card metric">
          <span>Rozładowanie baterii dzisiaj</span>
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
          <span>Tryb połączenia</span>
          <strong>${snapshot.gridConnected === null ? 'Nieznany' : snapshot.gridConnected ? 'On-grid' : 'Off-grid'}</strong>
          <small>${snapshot.grid.value >= 0 ? 'Import z sieci' : 'Eksport do sieci'}</small>
        </div>
      </section>
    `;
    }
    renderAnalyticsRail(snapshot) {
        return b `
      <section class="analytics-rail">
        <div class="analytics-card kpi">
          <span>Autokonsumpcja dzisiaj</span>
          <strong>${this.formatPercent(snapshot.analytics.selfConsumptionRate)}</strong>
          <small>${snapshot.dailyEnergy.solar === null ? 'Brak energii dziennej PV' : 'Udział energii PV zużytej lokalnie'}</small>
        </div>
        <div class="analytics-card kpi">
          <span>Samowystarczalność dzisiaj</span>
          <strong>${this.formatPercent(snapshot.analytics.selfSufficiencyRate)}</strong>
          <small>${snapshot.dailyEnergy.home === null ? 'Brak energii dziennej domu' : 'Udział zużycia pokrytego bez importu'}</small>
        </div>
        <div class="analytics-card kpi">
          <span>Bufor baterii</span>
          <strong>${this.formatHours(snapshot.analytics.batteryRuntimeHours)}</strong>
          <small>${snapshot.batteryStoredKwh === null ? 'Brak pojemności lub SOC' : 'Szacowany czas pokrycia aktualnego obciążenia'}</small>
        </div>
        <div class="analytics-card kpi">
          <span>Reszta bilansu</span>
          <strong>${this.formatPercent(snapshot.analytics.residualRate)}</strong>
          <small>${this.describeResidualLabel(snapshot)}</small>
        </div>
        <div class="analytics-card mix">
          <span>Aktualny mix zasilania domu</span>
          <div class="mix-bar" aria-hidden="true">
            <div class="mix-segment solar" style=${`width:${snapshot.analytics.currentSourceMix.solar.toFixed(1)}%`}></div>
            <div class="mix-segment battery" style=${`width:${snapshot.analytics.currentSourceMix.battery.toFixed(1)}%`}></div>
            <div class="mix-segment grid" style=${`width:${snapshot.analytics.currentSourceMix.grid.toFixed(1)}%`}></div>
          </div>
          <div class="mix-legend">
            <span>PV ${this.formatPercent(snapshot.analytics.currentSourceMix.solar, 0)}</span>
            <span>Bat ${this.formatPercent(snapshot.analytics.currentSourceMix.battery, 0)}</span>
            <span>Grid ${this.formatPercent(snapshot.analytics.currentSourceMix.grid, 0)}</span>
          </div>
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
        ${showLoadPhases ? this.renderBreakdownCard('Fazy obciążenia', snapshot.loadPhaseBreakdown) : A}
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
        const deviceTone = this.getStatusTone(snapshot.deviceAlarm, snapshot.deviceFault);
        const batteryTone = snapshot.batteryAlarm === false && snapshot.batteryFault === false ? '' : 'warn';
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
        <div class=${`health-card ${deviceTone}`.trim()}>
          <span>Alarm urządzenia</span>
          <strong>${snapshot.deviceAlarm ?? '--'}</strong>
          <small>Fault: ${snapshot.deviceFault ?? '--'}</small>
        </div>
        <div class=${`health-card ${batteryTone}`.trim()}>
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
        if (snapshot.residualPower > 0) {
            return 'Bilans częściowy';
        }
        if (snapshot.solar.value > snapshot.home.value && snapshot.grid.value < 0) {
            return 'Nadwyżka produkcji';
        }
        if (snapshot.grid.value > 0 && snapshot.solar.value < snapshot.home.value) {
            return 'Wsparcie z sieci';
        }
        if (snapshot.battery.mode === 'discharging') {
            return 'Praca z magazynu';
        }
        if (snapshot.battery.mode === 'charging') {
            return 'Ładowanie magazynu';
        }
        return 'Przepływ stabilny';
    }
    describeBatteryStatus(snapshot) {
        if (snapshot.batteryState)
            return prettifyStatus(snapshot.batteryState) ?? snapshot.batteryState;
        if (snapshot.battery.mode === 'charging')
            return 'Ładowanie';
        if (snapshot.battery.mode === 'discharging')
            return 'Rozładowanie';
        return 'Stabilny bufor';
    }
    describeResidualLabel(snapshot) {
        if (snapshot.residualDirection === 'unassigned_source') {
            return 'Inne zużycie / straty';
        }
        if (snapshot.residualDirection === 'unassigned_demand') {
            return 'Brakujące źródło / dane';
        }
        return 'Bilans pozostały';
    }
    getCoreState(snapshot) {
        const candidates = [
            {
                key: 'solar_to_home',
                label: snapshot.gridConnected === false ? 'Zasilanie off-grid' : 'Dom pokryty z PV',
                value: snapshot.solarToHome,
                detail: snapshot.gridConnected === false ? 'energia lokalna zasila odbiory' : 'autokonsumpcja bezpośrednia',
                shortDetail: 'autokonsumpcja',
                priority: 30,
            },
            {
                key: 'grid_to_home',
                label: 'Import z sieci',
                value: snapshot.gridToHome,
                detail: 'sieć wspiera aktualne zużycie domu',
                shortDetail: 'wsparcie domu',
                priority: 90,
            },
            {
                key: 'solar_to_battery',
                label: 'Ładowanie magazynu',
                value: snapshot.solarToBattery,
                detail: 'nadwyżka PV ładuje baterię',
                shortDetail: 'z nadwyżki PV',
                priority: 80,
            },
            {
                key: 'grid_to_battery',
                label: 'Ładowanie magazynu',
                value: snapshot.gridToBattery,
                detail: 'sieć ładuje magazyn energii',
                shortDetail: 'z sieci',
                priority: 100,
            },
            {
                key: 'battery_to_home',
                label: 'Praca z magazynu',
                value: snapshot.batteryToHome,
                detail: 'bateria zasila aktualne odbiory',
                shortDetail: 'wsparcie domu',
                priority: 85,
            },
            {
                key: 'solar_to_grid',
                label: 'Eksport do sieci',
                value: snapshot.solarToGrid,
                detail: 'nadwyżka produkcji oddawana do sieci',
                shortDetail: 'nadwyżka produkcji',
                priority: 95,
            },
            {
                key: 'battery_to_grid',
                label: 'Oddawanie do sieci',
                value: snapshot.batteryToGrid,
                detail: 'energia z baterii trafia do sieci',
                shortDetail: 'z magazynu',
                priority: 92,
            },
        ]
            .filter((candidate) => candidate.value > 0)
            .sort((a, b) => {
            const priorityDelta = b.priority - a.priority;
            if (priorityDelta !== 0)
                return priorityDelta;
            return b.value - a.value;
        });
        const dominant = candidates[0];
        if (dominant)
            return dominant;
        return {
            key: 'idle',
            label: 'Przepływ stabilny',
            value: 0,
            detail: 'brak dominującego przepływu w tej chwili',
            shortDetail: 'stan stabilny',
        };
    }
    formatPercent(value, decimals = 1) {
        if (value === null)
            return '--';
        return `${value.toFixed(decimals)}%`;
    }
    formatHours(value) {
        if (value === null)
            return '--';
        if (value >= 10)
            return `${value.toFixed(0)} h`;
        return `${value.toFixed(1)} h`;
    }
    handleTap(entityId) {
        if (this._holdTriggered) {
            this._holdTriggered = false;
            return;
        }
        this.fireConfiguredAction(this._config.tap_action, entityId);
    }
    handlePointerDown(entityId) {
        this.clearHoldTimer();
        this._holdTriggered = false;
        this._holdTimer = window.setTimeout(() => {
            this._holdTriggered = true;
            this.fireConfiguredAction(this._config.hold_action, entityId);
        }, 450);
    }
    clearHoldTimer() {
        if (this._holdTimer !== undefined) {
            window.clearTimeout(this._holdTimer);
            this._holdTimer = undefined;
        }
    }
    fireConfiguredAction(actionConfig, entityId) {
        const action = actionConfig?.action ?? 'more-info';
        if (action === 'none')
            return;
        if (action === 'navigate' && actionConfig?.navigation_path) {
            window.history.pushState(null, '', actionConfig.navigation_path);
            window.dispatchEvent(new Event('location-changed'));
            return;
        }
        if (action === 'url' && actionConfig?.url_path) {
            window.open(actionConfig.url_path, '_blank', 'noopener');
            return;
        }
        this.showMoreInfo(entityId);
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
    getStatusTone(...values) {
        const normalized = values
            .filter((value) => Boolean(value))
            .map((value) => value.toLowerCase());
        if (normalized.some((value) => value.includes('fault') || value.includes('alarm') || value.includes('error'))) {
            return 'warn';
        }
        if (normalized.some((value) => value.includes('warn') || value.includes('offline'))) {
            return 'caution';
        }
        if (normalized.some((value) => value.includes('normal') || value.includes('ok') || value.includes('idle'))) {
            return 'ok';
        }
        return '';
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

    .badge.caution .badge-dot {
      background: #fcd34d;
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

    .badge.warn {
      border-color: rgba(248, 113, 113, 0.28);
      color: #ffe4e6;
    }

    .badge.caution {
      border-color: rgba(251, 191, 36, 0.28);
      color: #fef3c7;
    }

    .badge.ok {
      border-color: rgba(134, 239, 172, 0.22);
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

    .stage.preset-console {
      --console-cluster-width: 1180px;
      --console-side-offset: max(30px, calc(50% - (var(--console-cluster-width) / 2)));
      --console-home-offset: max(30px, calc(50% - (var(--console-cluster-width) / 2)));
      min-height: 500px;
      background:
        radial-gradient(circle at 50% 12%, rgba(32, 133, 255, 0.12), transparent 28%),
        linear-gradient(180deg, rgba(4, 18, 56, 0.98), rgba(2, 11, 35, 0.98));
      border: 1px solid rgba(63, 169, 255, 0.35);
      box-shadow:
        inset 0 0 0 1px rgba(109, 203, 255, 0.08),
        0 16px 34px rgba(0, 6, 22, 0.3);
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

    .preset-console .ambient {
      opacity: 0.12;
      filter: blur(28px);
    }

    .preset-console .ambient-a,
    .preset-console .ambient-b {
      background: rgba(64, 196, 255, 0.55);
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

    .preset-console .grid-lines {
      opacity: 0.08;
      background-size: 36px 36px;
      mask-image: none;
    }

    .core {
      position: absolute;
      inset: 50% auto auto 50%;
      transform: translate(-50%, -50%);
      width: 168px;
      height: 168px;
      display: grid;
      place-items: center;
      z-index: 4;
      isolation: isolate;
    }

    .flow-anchor {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
    }

    .node-anchor.solar {
      right: 8px;
      top: calc(50% - 4px);
    }

    .node-anchor.grid {
      left: 8px;
      top: calc(50% - 4px);
    }

    .node-anchor.battery {
      right: 8px;
      top: calc(50% - 4px);
    }

    .node-anchor.home {
      left: 8px;
      top: calc(50% - 4px);
    }

    .preset-console .node-anchor.solar,
    .preset-console .node-anchor.grid {
      left: auto;
      right: -2px;
      top: calc(50% - 4px);
    }

    .preset-console .node-anchor.battery {
      left: -2px;
      right: auto;
      top: calc(50% - 4px);
    }

    .preset-console .node-anchor.home {
      left: -2px;
      top: calc(50% - 4px);
    }

    .core-anchor.top-left {
      left: 28px;
      top: 44px;
    }

    .core-anchor.top-right {
      right: 28px;
      top: 44px;
    }

    .core-anchor.bottom-left {
      left: 28px;
      bottom: 44px;
    }

    .core-anchor.bottom-right {
      right: 28px;
      bottom: 44px;
    }

    .preset-console .core-anchor.top-left {
      left: -2px;
      top: 28%;
    }

    .preset-console .core-anchor.top-right {
      right: -2px;
      left: auto;
      top: 28%;
    }

    .preset-console .core-anchor.bottom-left {
      left: -2px;
      bottom: 28%;
    }

    .preset-console .core-anchor.bottom-right {
      right: -2px;
      top: 72%;
    }

    .stage.layout-focus-home .core {
      width: 188px;
      height: 188px;
    }

    .preset-console .core {
      inset: 34% auto auto 50%;
      width: min(37vw, 412px);
      min-width: 324px;
      height: 170px;
      border-radius: 24px;
    }

    .preset-console.stage.layout-focus-home .core {
      width: min(39vw, 430px);
      height: 176px;
    }

    .core-shield {
      position: absolute;
      inset: 10px;
      border-radius: 50%;
      background:
        radial-gradient(circle, color-mix(in srgb, var(--zs-panel) 92%, rgba(255,255,255,0.12)) 0 58%, color-mix(in srgb, var(--zs-panel) 78%, rgba(255,255,255,0.08)) 70%, transparent 78%);
      box-shadow:
        0 12px 30px rgba(0, 0, 0, 0.18),
        inset 0 0 24px rgba(255, 255, 255, 0.05);
      z-index: 0;
      pointer-events: none;
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
      z-index: 1;
    }

    .core-ring.pulse {
      inset: -12px;
      opacity: 0.28;
      animation: pulse 4.8s ease-in-out infinite;
      z-index: 0;
    }

    .preset-console .core-shield {
      inset: 0;
      border-radius: 24px;
      background: linear-gradient(180deg, rgba(9, 49, 122, 0.96), rgba(4, 24, 66, 0.96));
      box-shadow:
        inset 0 0 0 2px rgba(51, 190, 255, 0.68),
        inset 0 0 0 8px rgba(22, 80, 170, 0.16),
        0 0 26px rgba(34, 162, 255, 0.2);
    }

    .preset-console .core-ring {
      inset: 10px;
      border-radius: 20px;
      background: none;
      box-shadow: inset -3px 0 0 rgba(105, 214, 255, 0.22);
      opacity: 0.85;
    }

    .preset-console .core-ring.pulse {
      display: none;
    }

    .core-content {
      position: relative;
      z-index: 2;
      text-align: center;
      padding: 22px;
    }

    .core-content.console {
      position: absolute;
      inset: 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: grid;
      align-content: start;
      gap: 8px;
      text-align: left;
      padding: 26px 32px 22px;
      color: #d7f7ff;
      overflow: hidden;
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

    .core-content.console strong {
      margin: 0;
      font-size: clamp(1.45rem, 2.45vw, 2.45rem);
      line-height: 1.02;
      font-weight: 500;
      letter-spacing: -0.03em;
      color: #d6fff6;
      text-shadow: 0 0 12px rgba(117, 237, 255, 0.22);
    }

    .preset-console .core-label {
      color: rgba(201, 243, 255, 0.9);
      font-size: 0.74rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .core-content.console small {
      color: rgba(194, 240, 255, 0.86);
      font-size: 0.82rem;
      line-height: 1.35;
    }

    .console-core-stats {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: baseline;
      margin-top: auto;
      padding-top: 14px;
      width: 100%;
      box-sizing: border-box;
      border-top: 1px solid rgba(93, 208, 255, 0.18);
      color: rgba(174, 232, 255, 0.84);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .console-core-stats b {
      font-size: 1rem;
      font-weight: 700;
      color: #f0fdff;
      letter-spacing: 0;
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

    .preset-console .node {
      width: 218px;
      padding: 14px 16px;
      border-radius: 18px;
      background: linear-gradient(180deg, rgba(7, 40, 102, 0.92), rgba(3, 22, 62, 0.96));
      border: 1px solid rgba(61, 181, 255, 0.58);
      backdrop-filter: none;
      box-shadow:
        inset 0 0 0 1px rgba(63, 196, 255, 0.16),
        0 0 24px rgba(20, 112, 255, 0.12);
    }

    .preset-console .console-panel {
      z-index: 3;
    }

    .preset-console .console-grid {
      top: 30px;
      left: var(--console-side-offset);
    }

    .preset-console .console-solar {
      left: var(--console-side-offset);
      bottom: 28px;
    }

    .preset-console .console-battery {
      left: auto;
      right: var(--console-home-offset);
      bottom: 30px;
      transform: none;
      width: min(28vw, 250px);
      min-width: 224px;
    }

    .preset-console .console-home {
      top: 30px;
      right: var(--console-home-offset);
      transform: none;
      width: 230px;
    }

    .preset-console .node:hover {
      border-color: rgba(111, 221, 255, 0.82);
      box-shadow:
        inset 0 0 0 1px rgba(111, 221, 255, 0.18),
        0 0 28px rgba(50, 154, 255, 0.18);
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

    .preset-console .icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(18, 123, 255, 0.16);
      box-shadow:
        inset 0 0 0 1px rgba(112, 215, 255, 0.22),
        0 0 14px rgba(60, 183, 255, 0.12);
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

    .console-metrics {
      display: grid;
      gap: 3px;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(123, 215, 255, 0.16);
    }

    .console-metric-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
      font-size: 0.78rem;
    }

    .console-metric-row span {
      color: rgba(190, 240, 255, 0.8);
    }

    .console-metric-row b {
      color: #ecfeff;
      font-size: 0.86rem;
      font-weight: 600;
    }

    .label,
    .meta small {
      color: var(--zs-muted);
    }

    .meta strong {
      font-size: 1.28rem;
      line-height: 1.05;
    }

    .preset-console .bottom.left {
      background: linear-gradient(180deg, rgba(26, 164, 255, 0.94), rgba(23, 200, 255, 0.82));
      border-color: rgba(135, 241, 255, 0.72);
    }

    .preset-console .bottom.left .label,
    .preset-console .bottom.left .meta small,
    .preset-console .bottom.left .meta strong {
      color: rgba(236, 254, 255, 0.98);
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

    .preset-console .flow-track {
      stroke: rgba(81, 188, 255, 0.24);
      stroke-width: 2.2;
    }

    .flow-base {
      fill: none;
      stroke: color-mix(in srgb, var(--flow-color) 26%, rgba(255, 255, 255, 0.05));
      stroke-width: var(--flow-width);
      stroke-linecap: round;
      opacity: 0.72;
      filter: drop-shadow(0 0 8px color-mix(in srgb, var(--flow-color) 16%, transparent));
    }

    .preset-console .flow-base {
      stroke: color-mix(in srgb, var(--flow-color) 62%, rgba(119, 226, 255, 0.42));
      opacity: 0.48;
      filter: drop-shadow(0 0 4px color-mix(in srgb, var(--flow-color) 20%, transparent));
    }

    .flow-aura {
      fill: none;
      stroke: var(--flow-color);
      stroke-width: var(--flow-width);
      stroke-linecap: round;
      opacity: 0;
      filter: blur(8px);
    }

    .preset-console .flow-aura {
      filter: blur(4px);
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

    .preset-console .flow-line {
      stroke-dasharray: 6 16;
      filter: drop-shadow(0 0 8px color-mix(in srgb, var(--flow-color) 60%, transparent));
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
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 12px;
      margin-top: 16px;
    }

    .health-rail {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
      margin-top: 12px;
    }

    .analytics-rail {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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

    .analytics-card {
      padding: 14px 16px;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
        rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
    }

    .analytics-card span,
    .analytics-card small {
      display: block;
      color: var(--zs-muted);
    }

    .analytics-card strong {
      display: block;
      margin: 6px 0 4px;
      font-size: 1.05rem;
    }

    .analytics-card.mix {
      grid-column: span 2;
    }

    .mix-bar {
      margin-top: 10px;
      height: 12px;
      border-radius: 999px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.06);
      display: flex;
    }

    .mix-segment {
      height: 100%;
    }

    .mix-segment.solar {
      background: var(--zs-solar);
    }

    .mix-segment.battery {
      background: var(--zs-battery);
    }

    .mix-segment.grid {
      background: var(--zs-grid);
    }

    .mix-legend {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 10px;
      color: var(--zs-muted);
      font-size: 0.82rem;
    }

    .health-card.warn {
      border-color: rgba(248, 113, 113, 0.3);
      box-shadow: inset 0 0 0 1px rgba(248, 113, 113, 0.08);
    }

    .health-card.caution {
      border-color: rgba(251, 191, 36, 0.3);
      box-shadow: inset 0 0 0 1px rgba(251, 191, 36, 0.08);
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
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .details.advanced {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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

    .detail-card.warn {
      border-color: rgba(251, 191, 36, 0.28);
      box-shadow: inset 0 0 0 1px rgba(251, 191, 36, 0.08);
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

      .advanced-rail,
      .analytics-rail,
      .health-rail,
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

      .preset-console .core {
        width: 360px;
        height: 158px;
      }

      .stage.layout-focus-home .core {
        width: 220px;
        height: 220px;
      }

      .details.simple {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .details.advanced {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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

      .advanced-rail,
      .analytics-rail,
      .health-rail,
      .breakdown-grid {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      }
    }

    @media (max-width: 560px) {
      .shell {
        padding: 16px;
      }

      h2 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 0.88rem;
      }

      .hero {
        margin-bottom: 14px;
      }

      .stage {
        min-height: 720px;
      }

      .stage.preset-console {
        min-height: 760px;
      }

      .top.left,
      .top.right {
        top: 18px;
      }

      .bottom.left,
      .bottom.right {
        bottom: 18px;
      }

      .top.left,
      .bottom.left {
        left: 18px;
      }

      .top.right,
      .bottom.right {
        right: 18px;
      }

      .node {
        width: calc(50% - 40px);
        max-width: 146px;
        min-width: 118px;
        padding: 12px 10px;
        gap: 8px;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border-radius: 20px;
      }

      .preset-console .node {
        width: calc(50% - 36px);
        max-width: 150px;
        min-width: 114px;
      }

      .preset-console .console-grid {
        top: 18px;
        left: 18px;
      }

      .preset-console .console-solar {
        left: 18px;
        bottom: 26px;
      }

      .preset-console .console-home {
        top: 18px;
        right: 18px;
        width: calc(50% - 36px);
        max-width: 150px;
        transform: none;
      }

      .preset-console .console-battery {
        bottom: 18px;
        right: 18px;
        left: auto;
        transform: none;
        width: min(42vw, 180px);
        min-width: 132px;
      }

      .icon {
        width: 42px;
        height: 42px;
        border-radius: 14px;
      }

      .icon svg {
        width: 20px;
        height: 20px;
      }

      .meta {
        width: 100%;
        justify-items: center;
        gap: 3px;
      }

      .label,
      .meta small {
        font-size: 0.74rem;
        line-height: 1.2;
      }

      .meta strong {
        font-size: 1rem;
        line-height: 1.05;
      }

      .soc {
        font-size: 0.72rem;
      }

      .core {
        width: 154px;
        height: 154px;
      }

      .preset-console .core {
        width: min(78vw, 278px);
        min-width: 210px;
        height: 148px;
      }

      .stage.layout-focus-home .core {
        width: 168px;
        height: 168px;
      }

      .preset-console.stage.layout-focus-home .core {
        width: min(82vw, 290px);
        height: 140px;
      }

      .core-content {
        padding: 18px;
      }

      .core-content.console {
        padding: 20px 22px 18px;
      }

      .console-metric-row {
        font-size: 0.7rem;
      }

      .console-metric-row b {
        font-size: 0.76rem;
      }

      .core-content strong {
        font-size: 1.3rem;
      }

      .core-content.console strong {
        font-size: 1.36rem;
      }

      .core-content small {
        font-size: 0.8rem;
        line-height: 1.25;
      }

      .status-rail {
        gap: 6px;
      }

      .badge,
      .status-pill {
        padding: 8px 12px;
        font-size: 0.76rem;
      }

      .details.simple,
      .details.advanced {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 420px) {
      .stage {
        min-height: 740px;
      }

      .node {
        width: calc(50% - 34px);
        max-width: 138px;
        min-width: 108px;
        padding: 11px 8px;
      }

      .meta strong {
        font-size: 0.94rem;
      }

      .label,
      .meta small,
      .soc {
        font-size: 0.7rem;
      }

      .core {
        width: 146px;
        height: 146px;
      }

      .preset-console .core {
        width: min(80vw, 258px);
        min-width: 196px;
        height: 140px;
      }

      .preset-console .console-battery {
        width: min(44vw, 170px);
        min-width: 126px;
      }

      .stage.layout-focus-home .core {
        width: 160px;
        height: 160px;
      }

      .preset-console.stage.layout-focus-home .core {
        width: min(84vw, 268px);
        height: 134px;
      }
    }
  `;
__decorate([
    n({ attribute: false })
], ZsPowerFlowCard.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], ZsPowerFlowCard.prototype, "_config", void 0);
__decorate([
    e('.stage')
], ZsPowerFlowCard.prototype, "_stageEl", void 0);
__decorate([
    e('.core')
], ZsPowerFlowCard.prototype, "_coreEl", void 0);
__decorate([
    r()
], ZsPowerFlowCard.prototype, "_flowPaths", void 0);
__decorate([
    r()
], ZsPowerFlowCard.prototype, "_stageSize", void 0);
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
