// https://d3js.org/d3-zoom/ v1.7.3 Copyright 2018 Mike Bostock
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("d3-selection"),require("d3-dispatch"),require("d3-drag"),require("d3-interpolate"),require("d3-transition")):"function"==typeof define&&define.amd?define(["exports","d3-selection","d3-dispatch","d3-drag","d3-interpolate","d3-transition"],n):n(t.d3=t.d3||{},t.d3,t.d3,t.d3,t.d3,t.d3)}(this,function(t,n,e,o,i,r){"use strict";function u(t){return function(){return t}}function h(t,n,e){this.target=t,this.type=n,this.transform=e}function s(t,n,e){this.k=t,this.x=n,this.y=e}s.prototype={constructor:s,scale:function(t){return 1===t?this:new s(this.k*t,this.x,this.y)},translate:function(t,n){return 0===t&0===n?this:new s(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var c=new s(1,0,0);function a(t){return t.__zoom||c}function f(){n.event.stopImmediatePropagation()}function l(){n.event.preventDefault(),n.event.stopImmediatePropagation()}function m(){return!n.event.button}function p(){var t,n,e=this;return e instanceof SVGElement?(t=(e=e.ownerSVGElement||e).width.baseVal.value,n=e.height.baseVal.value):(t=e.clientWidth,n=e.clientHeight),[[0,0],[t,n]]}function d(){return this.__zoom||c}function v(){return-n.event.deltaY*(n.event.deltaMode?120:1)/500}function y(){return"ontouchstart"in this}function z(t,n,e){var o=t.invertX(n[0][0])-e[0][0],i=t.invertX(n[1][0])-e[1][0],r=t.invertY(n[0][1])-e[0][1],u=t.invertY(n[1][1])-e[1][1];return t.translate(i>o?(o+i)/2:Math.min(0,o)||Math.max(0,i),u>r?(r+u)/2:Math.min(0,r)||Math.max(0,u))}a.prototype=s.prototype,t.zoom=function(){var t,a,_=m,g=p,k=z,x=v,w=y,M=[0,1/0],T=[[-1/0,-1/0],[1/0,1/0]],b=250,Y=i.interpolateZoom,X=[],q=e.dispatch("start","zoom","end"),E=500,D=150,V=0;function I(t){t.property("__zoom",d).on("wheel.zoom",K).on("mousedown.zoom",O).on("dblclick.zoom",W).filter(w).on("touchstart.zoom",Z).on("touchmove.zoom",A).on("touchend.zoom touchcancel.zoom",C).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function P(t,n){return(n=Math.max(M[0],Math.min(M[1],n)))===t.k?t:new s(n,t.x,t.y)}function S(t,n,e){var o=n[0]-e[0]*t.k,i=n[1]-e[1]*t.k;return o===t.x&&i===t.y?t:new s(t.k,o,i)}function j(t){return[(+t[0][0]+ +t[1][0])/2,(+t[0][1]+ +t[1][1])/2]}function B(t,n,e){t.on("start.zoom",function(){G(this,arguments).start()}).on("interrupt.zoom end.zoom",function(){G(this,arguments).end()}).tween("zoom",function(){var t=arguments,o=G(this,t),i=g.apply(this,t),r=e||j(i),u=Math.max(i[1][0]-i[0][0],i[1][1]-i[0][1]),h=this.__zoom,c="function"==typeof n?n.apply(this,t):n,a=Y(h.invert(r).concat(u/h.k),c.invert(r).concat(u/c.k));return function(t){if(1===t)t=c;else{var n=a(t),e=u/n[2];t=new s(e,r[0]-n[0]*e,r[1]-n[1]*e)}o.zoom(null,t)}})}function G(t,n){for(var e,o=0,i=X.length;o<i;++o)if((e=X[o]).that===t)return e;return new H(t,n)}function H(t,n){this.that=t,this.args=n,this.index=-1,this.active=0,this.extent=g.apply(t,n)}function K(){if(_.apply(this,arguments)){var t=G(this,arguments),e=this.__zoom,o=Math.max(M[0],Math.min(M[1],e.k*Math.pow(2,x.apply(this,arguments)))),i=n.mouse(this);if(t.wheel)t.mouse[0][0]===i[0]&&t.mouse[0][1]===i[1]||(t.mouse[1]=e.invert(t.mouse[0]=i)),clearTimeout(t.wheel);else{if(e.k===o)return;t.mouse=[i,e.invert(i)],r.interrupt(this),t.start()}l(),t.wheel=setTimeout(function(){t.wheel=null,t.end()},D),t.zoom("mouse",k(S(P(e,o),t.mouse[0],t.mouse[1]),t.extent,T))}}function O(){if(!a&&_.apply(this,arguments)){var t=G(this,arguments),e=n.select(n.event.view).on("mousemove.zoom",function(){if(l(),!t.moved){var e=n.event.clientX-u,o=n.event.clientY-h;t.moved=e*e+o*o>V}t.zoom("mouse",k(S(t.that.__zoom,t.mouse[0]=n.mouse(t.that),t.mouse[1]),t.extent,T))},!0).on("mouseup.zoom",function(){e.on("mousemove.zoom mouseup.zoom",null),o.dragEnable(n.event.view,t.moved),l(),t.end()},!0),i=n.mouse(this),u=n.event.clientX,h=n.event.clientY;o.dragDisable(n.event.view),f(),t.mouse=[i,this.__zoom.invert(i)],r.interrupt(this),t.start()}}function W(){if(_.apply(this,arguments)){var t=this.__zoom,e=n.mouse(this),o=t.invert(e),i=t.k*(n.event.shiftKey?.5:2),r=k(S(P(t,i),e,o),g.apply(this,arguments),T);l(),b>0?n.select(this).transition().duration(b).call(B,r,e):n.select(this).call(I.transform,r)}}function Z(){if(_.apply(this,arguments)){var e,o,i,u,h=G(this,arguments),s=n.event.changedTouches,c=s.length;for(f(),o=0;o<c;++o)i=s[o],u=[u=n.touch(this,s,i.identifier),this.__zoom.invert(u),i.identifier],h.touch0?h.touch1||(h.touch1=u):(h.touch0=u,e=!0);if(t&&(t=clearTimeout(t),!h.touch1))return h.end(),void((u=n.select(this).on("dblclick.zoom"))&&u.apply(this,arguments));e&&(t=setTimeout(function(){t=null},E),r.interrupt(this),h.start())}}function A(){var e,o,i,r,u=G(this,arguments),h=n.event.changedTouches,s=h.length;for(l(),t&&(t=clearTimeout(t)),e=0;e<s;++e)o=h[e],i=n.touch(this,h,o.identifier),u.touch0&&u.touch0[2]===o.identifier?u.touch0[0]=i:u.touch1&&u.touch1[2]===o.identifier&&(u.touch1[0]=i);if(o=u.that.__zoom,u.touch1){var c=u.touch0[0],a=u.touch0[1],f=u.touch1[0],m=u.touch1[1],p=(p=f[0]-c[0])*p+(p=f[1]-c[1])*p,d=(d=m[0]-a[0])*d+(d=m[1]-a[1])*d;o=P(o,Math.sqrt(p/d)),i=[(c[0]+f[0])/2,(c[1]+f[1])/2],r=[(a[0]+m[0])/2,(a[1]+m[1])/2]}else{if(!u.touch0)return;i=u.touch0[0],r=u.touch0[1]}u.zoom("touch",k(S(o,i,r),u.extent,T))}function C(){var t,e,o=G(this,arguments),i=n.event.changedTouches,r=i.length;for(f(),a&&clearTimeout(a),a=setTimeout(function(){a=null},E),t=0;t<r;++t)e=i[t],o.touch0&&o.touch0[2]===e.identifier?delete o.touch0:o.touch1&&o.touch1[2]===e.identifier&&delete o.touch1;o.touch1&&!o.touch0&&(o.touch0=o.touch1,delete o.touch1),o.touch0?o.touch0[1]=this.__zoom.invert(o.touch0[0]):o.end()}return I.transform=function(t,n){var e=t.selection?t.selection():t;e.property("__zoom",d),t!==e?B(t,n):e.interrupt().each(function(){G(this,arguments).start().zoom(null,"function"==typeof n?n.apply(this,arguments):n).end()})},I.scaleBy=function(t,n){I.scaleTo(t,function(){return this.__zoom.k*("function"==typeof n?n.apply(this,arguments):n)})},I.scaleTo=function(t,n){I.transform(t,function(){var t=g.apply(this,arguments),e=this.__zoom,o=j(t),i=e.invert(o),r="function"==typeof n?n.apply(this,arguments):n;return k(S(P(e,r),o,i),t,T)})},I.translateBy=function(t,n,e){I.transform(t,function(){return k(this.__zoom.translate("function"==typeof n?n.apply(this,arguments):n,"function"==typeof e?e.apply(this,arguments):e),g.apply(this,arguments),T)})},I.translateTo=function(t,n,e){I.transform(t,function(){var t=g.apply(this,arguments),o=this.__zoom,i=j(t);return k(c.translate(i[0],i[1]).scale(o.k).translate("function"==typeof n?-n.apply(this,arguments):-n,"function"==typeof e?-e.apply(this,arguments):-e),t,T)})},H.prototype={start:function(){return 1==++this.active&&(this.index=X.push(this)-1,this.emit("start")),this},zoom:function(t,n){return this.mouse&&"mouse"!==t&&(this.mouse[1]=n.invert(this.mouse[0])),this.touch0&&"touch"!==t&&(this.touch0[1]=n.invert(this.touch0[0])),this.touch1&&"touch"!==t&&(this.touch1[1]=n.invert(this.touch1[0])),this.that.__zoom=n,this.emit("zoom"),this},end:function(){return 0==--this.active&&(X.splice(this.index,1),this.index=-1,this.emit("end")),this},emit:function(t){n.customEvent(new h(I,t,this.that.__zoom),q.apply,q,[t,this.that,this.args])}},I.wheelDelta=function(t){return arguments.length?(x="function"==typeof t?t:u(+t),I):x},I.filter=function(t){return arguments.length?(_="function"==typeof t?t:u(!!t),I):_},I.touchable=function(t){return arguments.length?(w="function"==typeof t?t:u(!!t),I):w},I.extent=function(t){return arguments.length?(g="function"==typeof t?t:u([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),I):g},I.scaleExtent=function(t){return arguments.length?(M[0]=+t[0],M[1]=+t[1],I):[M[0],M[1]]},I.translateExtent=function(t){return arguments.length?(T[0][0]=+t[0][0],T[1][0]=+t[1][0],T[0][1]=+t[0][1],T[1][1]=+t[1][1],I):[[T[0][0],T[0][1]],[T[1][0],T[1][1]]]},I.constrain=function(t){return arguments.length?(k=t,I):k},I.duration=function(t){return arguments.length?(b=+t,I):b},I.interpolate=function(t){return arguments.length?(Y=t,I):Y},I.on=function(){var t=q.on.apply(q,arguments);return t===q?I:t},I.clickDistance=function(t){return arguments.length?(V=(t=+t)*t,I):Math.sqrt(V)},I},t.zoomTransform=a,t.zoomIdentity=c,Object.defineProperty(t,"__esModule",{value:!0})});