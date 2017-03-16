/**
 * blooming-menu - A configurable and animated radial menu for the web
 *
 * @version v1.1.0
 * @link https://github.com/caiogondim/blooming-menu
 * @author Caio Gondim <me@caiogondim.com> (http://caiogondim.com)
 * @license ISC
 */
! function() {
    "use strict";

    function e(n) {
        return this instanceof e ? (this.props = {}, t.call(this, n), void(this.state = {
            isOpen: !1,
            isBeingAnimated: !1
        })) : new e(n)
    }

    function t(e) {
        if (e = e || {}, void 0 === e.itemsNum) throw new Error("`opts.itemsNum` must be declared");
        this.props.itemsNum = e.itemsNum, this.props.injectBaseCSS = void 0 === e.injectBaseCSS ? !0 : !1, this.props.startAngle = void 0 === e.startAngle ? 90 : e.startAngle, this.props.endAngle = void 0 === e.endAngle ? 0 : e.endAngle, this.props.radius = e.radius || 80, this.props.itemAnimationDelay = e.itemAnimationDelay || .04, this.props.animationDuration = e.animationDuration || .4, this.props.fatherElement = e.fatherElement || document.body, this.props.elements = {}, this.props.itemWidth = e.itemWidth || 50, this.props.mainContent = e.mainContent || "+", this.props.CSSClassPrefix = e.CSSClassPrefix || "blooming-menu__"
    }

    function n(e) {
        var t = e.CSSClassPrefix;
        e.elements.styleSheet = document.createElement("style"), document.head.appendChild(e.elements.styleSheet), e.elements.container = document.createElement("div"), e.elements.container.classList.add(t + u), e.elements.mainContainer = document.createElement("div"), e.elements.mainContainer.classList.add(t + f), e.elements.main = document.createElement("button"), e.elements.main.classList.add(t + h), e.elements.mainContent = document.createElement("span"), e.elements.mainContent.classList.add(t + b), e.elements.mainContent.innerHTML = e.mainContent, e.elements.mainContainer.appendChild(e.elements.main), e.elements.main.appendChild(e.elements.mainContent), e.elements.container.appendChild(e.elements.mainContainer), e.elements.items = [], e.elements.itemsContainer = document.createElement("ul"), e.elements.itemsContainer.classList.add(t + x), e.elements.container.appendChild(e.elements.itemsContainer);
        for (var n = 0; n < e.itemsNum; n++) {
            var i = document.createElement("li");
            i.classList.add(t + k), i.style.opacity = 0;
            var a = document.createElement("div");
            a.classList.add(t + w);
            var s = document.createElement("button");
            s.classList.add(t + y), a.appendChild(s), i.appendChild(a), e.elements.itemsContainer.appendChild(i), e.elements.items.push(i)
        }
        e.fatherElement.appendChild(e.elements.container), setTimeout(function() {
            e.elements.items.forEach(function(e) {
                e.style.opacity = 1
            })
        }, 1e3 * (e.itemAnimationDelay * e.itemsNum + e.animationDuration))
    }

    function i(e) {
        var t = e.CSSClassPrefix,
            n = "";
        return n += "." + t + u + ",." + t + u + " * {  box-sizing: border-box;  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);  outline: none;  margin: 0;  padding: 0;}", n += "." + t + u + " { position: absolute;  left: 50%;  top: 50%;  -webkit-transform: translate(-50%, -50%);  transform: translate(-50%, -50%);  width: 50px;  height: 50px;  border-radius: 50%;  -webkit-user-select: none;  -moz-user-select: none;  -ms-user-select: none;  user-select: none;}", n += "." + t + u + " {  transition: box-shadow .28s cubic-bezier(.4,0,.2,1);  box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);  width: 50px;  height: 50px;  border-radius: 50%;}", n += "." + t + h + " {  border-radius: 50%;  width: 50px;  height: 50px;  position: absolute;  z-index: 1;  cursor: pointer;  transition: all .28s cubic-bezier(.4,0,.2,1);  border: none;  background-color: #A974A2;  color: white;}", n += "." + t + h + ":hover {  box-shadow: 0 8px 17px 0 rgba(0,0,0,.2);}", n += "." + t + h + ".is-active {  -webkit-transform: rotate(45deg);  transform: rotate(45deg);}", n += "." + t + b + " {  font-size: 32px;  line-height: 60%;  position: relative;}", n += "." + t + h + ".is-active ." + t + b + " {  -webkit-transform: rotate(45deg);  transform: rotate(45deg);}", n += "." + t + k + " {  position: absolute;  bottom: 5px;  left: 5px;  transition:    -webkit-transform .28s cubic-bezier(.4,0,.2,1),    box-shadow .28s cubic-bezier(.4,0,.2,1),    opacity .28s cubic-bezier(.4,0,.2,1)  ;  transition:    transform .28s cubic-bezier(.4,0,.2,1),    box-shadow .28s cubic-bezier(.4,0,.2,1),    opacity .28s cubic-bezier(.4,0,.2,1)  ;  width: 40px;  height: 40px;  border-radius: 50%;}", n += "." + t + k + ":hover {  box-shadow: 0 8px 17px 0 rgba(0,0,0,.2);}", n += "." + t + k + ".is-selected:hover {  box-shadow: 0 0 0 0;  transition: box-shadow 0s;}", n += "." + t + x + " {  list-style-type: none;}", n += "." + t + w + " {  width: 100%;  height: 100%;  background-color: #6B9EB8;  border-radius: 50%;}", n += "." + t + y + " {  cursor: pointer;  border-radius: 50%;  border: none;  background-color: transparent;  width: 100%;  height: 100%;  box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);  transition:    box-shadow .28s cubic-bezier(.4,0,.2,1),    opacity .28s cubic-bezier(.4,0,.2,1)  ;  background-size: 50%;  background-position: center center;  background-repeat: no-repeat;  opacity: 0.8;}"
    }

    function a(e, t) {
        t.innerHTML += e
    }

    function s(e) {
        var t = (e.endAngle - e.startAngle) / (e.itemsNum - 1),
            n = e.startAngle,
            i = "",
            a = e.CSSClassPrefix;
        e.elements.items.forEach(function(s, r) {
            var m = e.radius * Math.cos(o(n)),
                l = e.radius * Math.sin(o(n)),
                c = Number(m.toFixed(2)),
                p = Number(l.toFixed(2)),
                d = 1.2 * c,
                u = 1.2 * p,
                f = 0,
                h = 0;
            i += "@keyframes " + a + "expand-item-" + r + " {0% {transform: translate(" + f + "px, " + h + "px)}70% {transform: translate(" + d + "px, " + u + "px)}100% {transform: translate(" + c + "px, " + p + "px)}}@-webkit-keyframes " + a + "expand-item-" + r + " {0% {-webkit-transform: translate(" + f + "px, " + h + "px)}70% {-webkit-transform: translate(" + d + "px, " + u + "px)}100% {-webkit-transform: translate(" + c + "px, " + p + "px)}}", i += "@keyframes " + a + "contract-item-" + r + " {100% {transform: translate(" + f + "px, " + h + "px)}30% {transform: translate(" + d + "px, " + u + "px)}0% {transform: translate(" + c + "px, " + p + "px)}}@-webkit-keyframes " + a + "contract-item-" + r + " {100% {-webkit-transform: translate(" + f + "px, " + h + "px)}30% {-webkit-transform: translate(" + d + "px, " + u + "px)}0% {-webkit-transform: translate(" + c + "px, " + p + "px)}}", i += "." + a + k + ":nth-of-type(" + (r + 1) + ") {animation-delay: " + r * e.itemAnimationDelay + "s;animation-duration: " + e.animationDuration + "s;animation-timing-function: ease-out;animation-name: " + a + "contract-item-" + r + ";animation-fill-mode: backwards;}." + a + k + ":nth-of-type(" + (r + 1) + ") {-webkit-animation-delay: " + r * e.itemAnimationDelay + "s;-webkit-animation-duration: " + e.animationDuration + "s;-webkit-animation-timing-function: ease-out;-webkit-animation-name: " + a + "contract-item-" + r + ";-webkit-animation-fill-mode: backwards;}", i += "." + a + k + ".is-active:nth-of-type(" + (r + 1) + ") {animation-name: " + a + "expand-item-" + r + ";animation-fill-mode: forwards;}." + a + k + ".is-active:nth-of-type(" + (r + 1) + ") {-webkit-animation-name: " + a + "expand-item-" + r + ";-webkit-animation-fill-mode: forwards;}", i += "." + a + k + ":nth-of-type(" + (r + 1) + ").is-selected ." + a + w + " {animation-name: " + a + "select-item;animation-fill-mode: forwards;animation-duration: " + e.animationDuration + "s;animation-timing-function: ease-out;}." + a + k + ":nth-of-type(" + (r + 1) + ").is-selected ." + a + w + " {-webkit-animation-name: " + a + "select-item;-webkit-animation-fill-mode: forwards;-webkit-animation-duration: " + e.animationDuration + "s;-webkit-animation-timing-function: ease-out;}", i += "." + a + k + ":nth-of-type(" + (r + 1) + ").is-not-selected ." + a + w + " {animation-name: " + a + "not-select-item;animation-fill-mode: forwards;animation-duration: " + e.animationDuration + "s;animation-timing-function: ease-out;}." + a + k + ":nth-of-type(" + (r + 1) + ").is-not-selected ." + a + w + " {-webkit-animation-name: " + a + "not-select-item;-webkit-animation-fill-mode: forwards;-webkit-animation-duration: " + e.animationDuration + "s;-webkit-animation-timing-function: ease-out;}", n += t
        }), i += "@keyframes " + a + "select-item {0% {transform: scale(1);opacity: 1;}100% {transform: scale(2);opacity: 0;}}@-webkit-keyframes " + a + "select-item {0% {-webkit-transform: scale(1);opacity: 1;}100% {-webkit-transform: scale(2);opacity: 0;}}", i += "@keyframes " + a + "not-select-item {0% {transform: scale(1);opacity: 1;}100% {transform: scale(0);opacity: 0;}}@-webkit-keyframes " + a + "not-select-item {0% {-webkit-transform: scale(1);opacity: 1;}100% {-webkit-transform: scale(0);opacity: 0;}}", e.elements.styleSheet.innerHTML += i
    }

    function o(e) {
        return e * (Math.PI / 180)
    }

    function r(e) {
        e.props.elements.container.parentNode.removeChild(e.props.elements.container)
    }

    function m() {
        var e, t = document.createElement("fakeelement"),
            n = {
                animation: "animationend",
                webkitAnimation: "webkitAnimationEnd"
            };
        for (e in n)
            if (void 0 !== t.style[e]) return n[e]
    }

    function l() {
        this.state.isOpen ? this.close() : this.open()
    }

    function c(e, t) {
        return function() {
            e.selectItem(t)
        }
    }

    function p(e) {
        e._handlers = {}, e._handlers.menuClick = l.bind(e), e.props.elements.main.addEventListener("click", e._handlers.menuClick), e.props.elements.items.forEach(function(t, n) {
            var i;
            e._handlers["item" + n] = i = c(e, n), t.addEventListener("click", i)
        })
    }

    function d(e) {
        e.props.elements.main.removeEventListener("click", e._handlers.menuClick), e.props.elements.items.forEach(function(t, n) {
            t.removeEventListener("click", e._handlers["item" + n])
        })
    }
    var u = "container",
        f = "main-container",
        h = "main",
        b = "main-content",
        x = "items",
        w = "item-btn-wrapper",
        k = "item",
        y = "item-btn";
    e.prototype.render = function() {
        var e = "";
        return n(this.props), this.props.injectBaseCSS && (e = i(this.props), a(e, this.props.elements.styleSheet)), s(this.props), p(this), this
    }, e.prototype.remove = function() {
        return d(this), r(this), this
    }, e.prototype.open = function() {
        return this.props.elements.main.classList.add("is-active"), this.props.elements.items.forEach(function(e) {
            e.style.display = "block", e.classList.remove("is-selected"), e.classList.add("is-active")
        }), this.state.isOpen = !0, this
    }, e.prototype.close = function() {
        return this.props.elements.main.classList.remove("is-active"), this.props.elements.main.classList.add("is-inactive"), this.props.elements.items.forEach(function(e) {
            e.classList.remove("is-active"), e.classList.remove("is-selected"), e.classList.remove("is-not-selected")
        }), this.state.isOpen = !1, this
    }, e.prototype.selectItem = function(e) {
        var t = this,
            n = document.querySelector("." + t.props.CSSClassPrefix + w),
            i = function() {
                t.close(), t.props.elements.items.forEach(function(e) {
                    e.style.display = "none"
                }), document.querySelector("." + t.props.CSSClassPrefix + w).removeEventListener(m(), i)
            };
        return n.addEventListener(m(), i), this.props.elements.items.forEach(function(t, n) {
            t.classList.add(n !== e ? "is-not-selected" : "is-selected")
        }), this.props.elements.main.classList.remove("is-active"), this
    }, "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = e : "undefined" != typeof window && (window.BloomingMenu = e)
}();
