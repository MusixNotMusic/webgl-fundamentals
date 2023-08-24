import * as THREE from 'three';
import E from '@unseenco/e'
import gsap from "gsap";

var _defineProperty = Object.defineProperty;
var _setProperty = (ctx, key, value) => key in ctx ? _defineProperty(ctx, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: value
}) : ctx[key] = value;
var setProperty = (ctx, key, value)=>( _setProperty(ctx, typeof key != "symbol" ? key + "" : key, value), value );


const H = {
    html: document.documentElement,
    body: document.body,
    window: {
        w: window.innerWidth,
        h: window.innerHeight,
        dpr: window.devicePixelRatio
    },
    isTouch: false,
    isSafari: !!navigator.userAgent.match(/Safari/i) && !navigator.userAgent.match(/Chrome/i),
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    pointer: {
        default: new THREE.Vector2(),
        gl: new THREE.Vector2(),
        glNormalized: new THREE.Vector2(),
        isDragging: false
    },
    urlParams: new URLSearchParams(window.location.search),
    AssetLoader: null,
    GlobalEvents: null,
    WebGL: null
};

const Events = class {
    static enablePointerEvents() {
        typeof Events.enabled.pointerEvents == "undefined" && (Events.enabled.pointerEvents = true,
        E("mousemove touchmove", window, Events.handleMousemove, {
            passive: true
        }),
        E("mousedown touchstart", window, Events.handleMousedown),
        E("mouseup touchend", window, Events.handleMouseup))
    }
    static enableResize(e=false) {
        typeof Events.enabled.resize == "undefined" && (Events.enabled.resize = true,
        e ? E("resize", window, Bh(t=>Events.handleResize(t), e)) : E("resize", window, Events.handleResize))
    }
    static enableRAF(e=null) {
        typeof Events.enabled.raf == "undefined" && (Events.enabled.raf = true,
        e ? (Events.currentRafId = null,
        e.ticker.add(Events.handleRaf)) : Events.currentRafId = window.requestAnimationFrame(Events.handleRaf))
    }
    static enableDrag() {
        typeof Events.enabled.drag == "undefined" && (Events.enabled.drag = true)
    }
    static handleMousemove(e) {
        if (H.pointer.default.x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
        H.pointer.default.y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY,
        H.pointer.gl.set(H.pointer.default.x - H.window.w / 2, -H.pointer.default.y + H.window.h / 2),
        H.pointer.glNormalized.set(H.pointer.default.x / H.window.w * 2 - 1, -(H.pointer.default.y / H.window.h) * 2 + 1),
        e.changedTouches ? E(Events.TOUCHMOVE, e) : E(Events.MOUSEMOVE, e),
        H.pointer.isDragging) {
            const t = {
                deltaX: H.pointer.default.x - Events.dragInfo.px,
                deltaY: H.pointer.default.y - Events.dragInfo.py,
                startX: Events.dragInfo.x,
                startY: Events.dragInfo.y,
                totalX: H.pointer.default.x - Events.dragInfo.x,
                totalY: H.pointer.default.y - Events.dragInfo.y
            };
            E(e.changedTouches ? Events.TOUCHDRAG : Events.MOUSEDRAG, e, t),
            Events.dragInfo.px = H.pointer.default.x,
            Events.dragInfo.py = H.pointer.default.y
        }
    }
    static handleMousedown(e) {
        if (e.type === "touchstart")
            this.stopMouseDown = true;
        else {
            if (this.stopMouseDown) {
                this.stopMouseDown = false;
                return
            }
            this.stopMouseDown = false
        }
        Events.handleMousemove(e),
        Events.enabled.drag && (H.pointer.isDragging = true,
        Events.dragInfo.x = Events.dragInfo.px = H.pointer.default.x,
        Events.dragInfo.y = Events.dragInfo.py = H.pointer.default.y),
        E(Events.POINTERDOWN, e)
    }
    static handleMouseup(e) {
        if (H.pointer.isDragging = false,
        e.type === "touchend")
            this.stopMouseUp = true;
        else {
            if (this.stopMouseUp) {
                this.stopMouseUp = false;
                return
            }
            this.stopMouseUp = false
        }
        this.stopMouseDown = false,
        Events.handleMousemove(e),
        Events.dragInfo = {
            x: 0,
            y: 0,
            px: 0,
            py: 0
        },
        E(Events.POINTERUP, e)
    }
    static handleResize(e) {
        H.window.w = window.innerWidth,
        H.window.h = window.innerHeight,
        E(Events.RESIZE, e)
    }
    static handleRaf(e) {
        H.Gui && H.Gui.fps.begin(),
        E(Events.RAF, e),
        Events.currentRafId !== null && (Events.currentRafId = window.requestAnimationFrame(Events.handleRaf)),
        H.Gui && H.Gui.fps.end()
    }
    static detectTouchDevice() {
        "ontouchstart"in document.documentElement && (H.isTouch = true,
        H.html.classList.add("is-touch"))
    }
}
;
let H0 = Events;
setProperty(H0, "MOUSEMOVE", "global:mousemove"),
setProperty(H0, "TOUCHMOVE", "global:touchmove"),
setProperty(H0, "MOUSEDRAG", "global:mousedrag"),
setProperty(H0, "TOUCHDRAG", "global:touchdrag"),
setProperty(H0, "POINTERMOVE", `${Events.MOUSEMOVE} ${Events.TOUCHMOVE}`),
setProperty(H0, "POINTERDRAG", `${Events.TOUCHDRAG} ${Events.MOUSEDRAG}`),
setProperty(H0, "POINTERDOWN", "global:pointerdown"),
setProperty(H0, "POINTERUP", "global:pointerup"),
setProperty(H0, "RAF", "global:raf"),
setProperty(H0, "RESIZE", "global:resize"),
setProperty(H0, "currentRafId", null),
setProperty(H0, "enabled", {}),
setProperty(H0, "dragInfo", {
    x: 0,
    y: 0,
    px: 0,
    py: 0
}),
setProperty(H0, "stopMouseDown", false),
setProperty(H0, "stopMouseUp", false);
class kh {
    constructor() {
        setProperty(this, "fire", e=>{
            let t = 0;
            const n = this.callbacks.length;
            for (t; t < n; t++)
                this.callbacks[t].cb(e)
        }
        );
        this.callbacks = [],
        E(H0.RAF, this.fire)
    }
    add(e, t) {
        this.callbacks.push({
            index: t,
            cb: e
        }),
        this.callbacks.sort(this.sort)
    }
    remove(e) {
        for (let t = 0; t < this.callbacks.length; t++)
            this.callbacks[t].cb === e && this.callbacks.splice(t, 1)
    }
    sort(e, t) {
        return e.index > t.index ? 1 : -1
    }
}
function no(l, e=document) {
    return e.querySelector(l)
}
function Bh(l, e) {
    let t = null;
    return function() {
        clearTimeout(t);
        const n = arguments
          , i = this;
        t = setTimeout(function() {
            l.apply(i, n)
        }, e)
    }
}
function L3(...l) {
    const e = t=>t && typeof t == "object";
    return l.reduce((t,n)=>(Object.keys(n).forEach(i=>{
        const r = t[i]
          , s = n[i];
        Array.isArray(r) && Array.isArray(s) ? t[i] = r.concat(...s) : e(r) && e(s) ? t[i] = L3(r, s) : t[i] = s
    }
    ),
    t), {})
}
function Ma(l) {
    return l.replace(/#define\sGLSLIFY\s./, "")
}
class Vh {
    constructor() {
        setProperty(this, "onAssetsProgress", ({percent: e})=>{
            this.percent !== e && (this.percent = e,
            window.requestIdleCallback ? requestIdleCallback(()=>{
                gsap.set(this.dom.progress, {
                    xPercent: this.percent
                })
            }
            ) : gsap.set(this.dom.progress, {
                xPercent: this.percent
            }))
        }
        );
        setProperty(this, "onAssetsLoaded", ()=>{
            this.onAssetsProgress({
                percent: 100
            }),
            setTimeout(()=>{
                this.hide()
            }
            , 1e3)
        }
        );
        this.dom = {
            loader: no(".js-loader"),
            progress: no(".js-progress")
        },
        this.hidden = false,
        this.percent = 0,
        this.throttledProgressFunc = this.throttle(this.onAssetsProgress, 50),
        E("AssetsProgress", this.throttledProgressFunc),
        E("AssetLoader:completed", this.onAssetsLoaded),
        this.hiddenPromise = new Promise(e=>{
            this.hiddenResolve = e
        })
    }
    hide() {
        this.removeEvents(),
        this.hidden = true;
        const e = gsap.timeline({
            defaults: {
                ease: "expo.inOut"
            }
        }).to(this.dom.loader, {
            duration: 1,
            autoAlpha: 0
        }, 0).call(()=>{
            this.hiddenResolve(),
            gsap.to(H.MainScene.options, {
                cameraTranslateZ: 0,
                duration: 3,
                ease: "power4.out"
            })
        }
        , null, .3);
        return H.Gui && e.to(H.Gui.containerElem_, {
            opacity: 1,
            duration: 1
        }, 2),
        this.hiddenPromise
    }
    throttle(e, t) {
        let n = false;
        return function() {
            n || (e.apply(this, arguments),
            n = true,
            setTimeout(function() {
                n = false
            }, t))
        }
    }
    removeEvents() {
        E("AssetsProgress", this.throttledProgressFunc),
        E("AssetLoader:completed", this.onAssetsLoaded)
    }
}
const G9 = {
    type: "change"
}
  , Sa = {
    type: "start"
}
  , H9 = {
    type: "end"
};
class Gh extends Vn {
    constructor(e, t) {
        super(),
        t === void 0 && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),
        t === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),
        this.object = e,
        this.domElement = t,
        this.domElement.style.touchAction = "none",
        this.enabled = true,
        this.target = new R,
        this.minDistance = 0,
        this.maxDistance = 1 / 0,
        this.minZoom = 0,
        this.maxZoom = 1 / 0,
        this.minPolarAngle = 0,
        this.maxPolarAngle = Math.PI,
        this.minAzimuthAngle = -1 / 0,
        this.maxAzimuthAngle = 1 / 0,
        this.enableDamping = false,
        this.dampingFactor = .05,
        this.enableZoom = true,
        this.zoomSpeed = 1,
        this.enableRotate = true,
        this.rotateSpeed = 1,
        this.enablePan = true,
        this.panSpeed = 1,
        this.screenSpacePanning = true,
        this.keyPanSpeed = 7,
        this.autoRotate = false,
        this.autoRotateSpeed = 2,
        this.keys = {
            LEFT: "ArrowLeft",
            UP: "ArrowUp",
            RIGHT: "ArrowRight",
            BOTTOM: "ArrowDown"
        },
        this.mouseButtons = {
            LEFT: jn.ROTATE,
            MIDDLE: jn.DOLLY,
            RIGHT: jn.PAN
        },
        this.touches = {
            ONE: Xn.ROTATE,
            TWO: Xn.DOLLY_PAN
        },
        this.target0 = this.target.clone(),
        this.position0 = this.object.position.clone(),
        this.zoom0 = this.object.zoom,
        this._domElementKeyEvents = null,
        this.getPolarAngle = function() {
            return a.phi
        }
        ,
        this.getAzimuthalAngle = function() {
            return a.theta
        }
        ,
        this.getDistance = function() {
            return this.object.position.distanceTo(this.target)
        }
        ,
        this.listenToKeyEvents = function(T) {
            T.addEventListener("keydown", $e),
            this._domElementKeyEvents = T
        }
        ,
        this.saveState = function() {
            n.target0.copy(n.target),
            n.position0.copy(n.object.position),
            n.zoom0 = n.object.zoom
        }
        ,
        this.reset = function() {
            n.target.copy(n.target0),
            n.object.position.copy(n.position0),
            n.object.zoom = n.zoom0,
            n.object.updateProjectionMatrix(),
            n.dispatchEvent(G9),
            n.update(),
            r = i.NONE
        }
        ,
        this.update = function() {
            const T = new R
              , $ = new ot().setFromUnitVectors(e.up, new R(0,1,0))
              , a0 = $.clone().invert()
              , n0 = new R
              , P = new ot
              , i0 = 2 * Math.PI;
            return function() {
                const _0 = n.object.position;
                T.copy(_0).sub(n.target),
                T.applyQuaternion($),
                a.setFromVector3(T),
                n.autoRotate && r === i.NONE && S(C()),
                n.enableDamping ? (a.theta += c.theta * n.dampingFactor,
                a.phi += c.phi * n.dampingFactor) : (a.theta += c.theta,
                a.phi += c.phi);
                let l0 = n.minAzimuthAngle
                  , p0 = n.maxAzimuthAngle;
                return isFinite(l0) && isFinite(p0) && (l0 < -Math.PI ? l0 += i0 : l0 > Math.PI && (l0 -= i0),
                p0 < -Math.PI ? p0 += i0 : p0 > Math.PI && (p0 -= i0),
                l0 <= p0 ? a.theta = Math.max(l0, Math.min(p0, a.theta)) : a.theta = a.theta > (l0 + p0) / 2 ? Math.max(l0, a.theta) : Math.min(p0, a.theta)),
                a.phi = Math.max(n.minPolarAngle, Math.min(n.maxPolarAngle, a.phi)),
                a.makeSafe(),
                a.radius *= u,
                a.radius = Math.max(n.minDistance, Math.min(n.maxDistance, a.radius)),
                n.enableDamping === true ? n.target.addScaledVector(f, n.dampingFactor) : n.target.add(f),
                T.setFromSpherical(a),
                T.applyQuaternion(a0),
                _0.copy(n.target).add(T),
                n.object.lookAt(n.target),
                n.enableDamping === true ? (c.theta *= 1 - n.dampingFactor,
                c.phi *= 1 - n.dampingFactor,
                f.multiplyScalar(1 - n.dampingFactor)) : (c.set(0, 0, 0),
                f.set(0, 0, 0)),
                u = 1,
                o || n0.distanceToSquared(n.object.position) > s || 8 * (1 - P.dot(n.object.quaternion)) > s ? (n.dispatchEvent(G9),
                n0.copy(n.object.position),
                P.copy(n.object.quaternion),
                o = false,
                true) : false
            }
        }(),
        this.dispose = function() {
            n.domElement.removeEventListener("contextmenu", q),
            n.domElement.removeEventListener("pointerdown", ce),
            n.domElement.removeEventListener("pointercancel", Ge),
            n.domElement.removeEventListener("wheel", Ze),
            n.domElement.removeEventListener("pointermove", de),
            n.domElement.removeEventListener("pointerup", ge),
            n._domElementKeyEvents !== null && n._domElementKeyEvents.removeEventListener("keydown", $e)
        }
        ;
        const n = this
          , i = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_PAN: 4,
            TOUCH_DOLLY_PAN: 5,
            TOUCH_DOLLY_ROTATE: 6
        };
        let r = i.NONE;
        const s = 1e-6
          , a = new L9
          , c = new L9;
        let u = 1;
        const f = new R;
        let o = false;
        const h = new THREE.Vector2()
          , d = new THREE.Vector2()
          , g = new THREE.Vector2()
          , p = new THREE.Vector2()
          , m = new THREE.Vector2()
          , _ = new THREE.Vector2()
          , x = new THREE.Vector2()
          , M = new THREE.Vector2()
          , y = new THREE.Vector2()
          , b = []
          , E = {};
        function C() {
            return 2 * Math.PI / 60 / 60 * n.autoRotateSpeed
        }
        function v() {
            return Math.pow(.95, n.zoomSpeed)
        }
        function S(T) {
            c.theta -= T
        }
        function F(T) {
            c.phi -= T
        }
        const I = function() {
            const T = new R;
            return function(a0, n0) {
                T.setFromMatrixColumn(n0, 0),
                T.multiplyScalar(-a0),
                f.add(T)
            }
        }()
          , X = function() {
            const T = new R;
            return function(a0, n0) {
                n.screenSpacePanning === true ? T.setFromMatrixColumn(n0, 1) : (T.setFromMatrixColumn(n0, 0),
                T.crossVectors(n.object.up, T)),
                T.multiplyScalar(a0),
                f.add(T)
            }
        }()
          , Y = function() {
            const T = new R;
            return function(a0, n0) {
                const P = n.domElement;
                if (n.object.isPerspectiveCamera) {
                    const i0 = n.object.position;
                    T.copy(i0).sub(n.target);
                    let e0 = T.length();
                    e0 *= Math.tan(n.object.fov / 2 * Math.PI / 180),
                    I(2 * a0 * e0 / P.clientHeight, n.object.matrix),
                    X(2 * n0 * e0 / P.clientHeight, n.object.matrix)
                } else
                    n.object.isOrthographicCamera ? (I(a0 * (n.object.right - n.object.left) / n.object.zoom / P.clientWidth, n.object.matrix),
                    X(n0 * (n.object.top - n.object.bottom) / n.object.zoom / P.clientHeight, n.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),
                    n.enablePan = false)
            }
        }();
        function D(T) {
            n.object.isPerspectiveCamera ? u /= T : n.object.isOrthographicCamera ? (n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom * T)),
            n.object.updateProjectionMatrix(),
            o = true) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),
            n.enableZoom = false)
        }
        function U(T) {
            n.object.isPerspectiveCamera ? u *= T : n.object.isOrthographicCamera ? (n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / T)),
            n.object.updateProjectionMatrix(),
            o = true) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),
            n.enableZoom = false)
        }
        function N(T) {
            h.set(T.clientX, T.clientY)
        }
        function G(T) {
            x.set(T.clientX, T.clientY)
        }
        function W(T) {
            p.set(T.clientX, T.clientY)
        }
        function k(T) {
            d.set(T.clientX, T.clientY),
            g.subVectors(d, h).multiplyScalar(n.rotateSpeed);
            const $ = n.domElement;
            S(2 * Math.PI * g.x / $.clientHeight),
            F(2 * Math.PI * g.y / $.clientHeight),
            h.copy(d),
            n.update()
        }
        function B(T) {
            M.set(T.clientX, T.clientY),
            y.subVectors(M, x),
            y.y > 0 ? D(v()) : y.y < 0 && U(v()),
            x.copy(M),
            n.update()
        }
        function J(T) {
            m.set(T.clientX, T.clientY),
            _.subVectors(m, p).multiplyScalar(n.panSpeed),
            Y(_.x, _.y),
            p.copy(m),
            n.update()
        }
        function Z(T) {
            T.deltaY < 0 ? U(v()) : T.deltaY > 0 && D(v()),
            n.update()
        }
        function o0(T) {
            let $ = false;
            switch (T.code) {
            case n.keys.UP:
                Y(0, n.keyPanSpeed),
                $ = true;
                break;
            case n.keys.BOTTOM:
                Y(0, -n.keyPanSpeed),
                $ = true;
                break;
            case n.keys.LEFT:
                Y(n.keyPanSpeed, 0),
                $ = true;
                break;
            case n.keys.RIGHT:
                Y(-n.keyPanSpeed, 0),
                $ = true;
                break
            }
            $ && (T.preventDefault(),
            n.update())
        }
        function c0() {
            if (b.length === 1)
                h.set(b[0].pageX, b[0].pageY);
            else {
                const T = .5 * (b[0].pageX + b[1].pageX)
                  , $ = .5 * (b[0].pageY + b[1].pageY);
                h.set(T, $)
            }
        }
        function d0() {
            if (b.length === 1)
                p.set(b[0].pageX, b[0].pageY);
            else {
                const T = .5 * (b[0].pageX + b[1].pageX)
                  , $ = .5 * (b[0].pageY + b[1].pageY);
                p.set(T, $)
            }
        }
        function j() {
            const T = b[0].pageX - b[1].pageX
              , $ = b[0].pageY - b[1].pageY
              , a0 = Math.sqrt(T * T + $ * $);
            x.set(0, a0)
        }
        function se() {
            n.enableZoom && j(),
            n.enablePan && d0()
        }
        function A0() {
            n.enableZoom && j(),
            n.enableRotate && c0()
        }
        function M0(T) {
            if (b.length == 1)
                d.set(T.pageX, T.pageY);
            else {
                const a0 = v0(T)
                  , n0 = .5 * (T.pageX + a0.x)
                  , P = .5 * (T.pageY + a0.y);
                d.set(n0, P)
            }
            g.subVectors(d, h).multiplyScalar(n.rotateSpeed);
            const $ = n.domElement;
            S(2 * Math.PI * g.x / $.clientHeight),
            F(2 * Math.PI * g.y / $.clientHeight),
            h.copy(d)
        }
        function f0(T) {
            if (b.length === 1)
                m.set(T.pageX, T.pageY);
            else {
                const $ = v0(T)
                  , a0 = .5 * (T.pageX + $.x)
                  , n0 = .5 * (T.pageY + $.y);
                m.set(a0, n0)
            }
            _.subVectors(m, p).multiplyScalar(n.panSpeed),
            Y(_.x, _.y),
            p.copy(m)
        }
        function O0(T) {
            const $ = v0(T)
              , a0 = T.pageX - $.x
              , n0 = T.pageY - $.y
              , P = Math.sqrt(a0 * a0 + n0 * n0);
            M.set(0, P),
            y.set(0, Math.pow(M.y / x.y, n.zoomSpeed)),
            D(y.y),
            x.copy(M)
        }
        function L0(T) {
            n.enableZoom && O0(T),
            n.enablePan && f0(T)
        }
        function x0(T) {
            n.enableZoom && O0(T),
            n.enableRotate && M0(T)
        }
        function ce(T) {
            n.enabled !== false && (b.length === 0 && (n.domElement.setPointerCapture(T.pointerId),
            n.domElement.addEventListener("pointermove", de),
            n.domElement.addEventListener("pointerup", ge)),
            Q(T),
            T.pointerType === "touch" ? L(T) : ue(T))
        }
        function de(T) {
            n.enabled !== false && (T.pointerType === "touch" ? w(T) : z0(T))
        }
        function ge(T) {
            s0(T),
            b.length === 0 && (n.domElement.releasePointerCapture(T.pointerId),
            n.domElement.removeEventListener("pointermove", de),
            n.domElement.removeEventListener("pointerup", ge)),
            n.dispatchEvent(H9),
            r = i.NONE
        }
        function Ge(T) {
            s0(T)
        }
        function ue(T) {
            let $;
            switch (T.button) {
            case 0:
                $ = n.mouseButtons.LEFT;
                break;
            case 1:
                $ = n.mouseButtons.MIDDLE;
                break;
            case 2:
                $ = n.mouseButtons.RIGHT;
                break;
            default:
                $ = -1
            }
            switch ($) {
            case jn.DOLLY:
                if (n.enableZoom === false)
                    return;
                G(T),
                r = i.DOLLY;
                break;
            case jn.ROTATE:
                if (T.ctrlKey || T.metaKey || T.shiftKey) {
                    if (n.enablePan === false)
                        return;
                    W(T),
                    r = i.PAN
                } else {
                    if (n.enableRotate === false)
                        return;
                    N(T),
                    r = i.ROTATE
                }
                break;
            case jn.PAN:
                if (T.ctrlKey || T.metaKey || T.shiftKey) {
                    if (n.enableRotate === false)
                        return;
                    N(T),
                    r = i.ROTATE
                } else {
                    if (n.enablePan === false)
                        return;
                    W(T),
                    r = i.PAN
                }
                break;
            default:
                r = i.NONE
            }
            r !== i.NONE && n.dispatchEvent(Sa)
        }
        function z0(T) {
            if (n.enabled !== false)
                switch (r) {
                case i.ROTATE:
                    if (n.enableRotate === false)
                        return;
                    k(T);
                    break;
                case i.DOLLY:
                    if (n.enableZoom === false)
                        return;
                    B(T);
                    break;
                case i.PAN:
                    if (n.enablePan === false)
                        return;
                    J(T);
                    break
                }
        }
        function Ze(T) {
            n.enabled === false || n.enableZoom === false || r !== i.NONE || (T.preventDefault(),
            n.dispatchEvent(Sa),
            Z(T),
            n.dispatchEvent(H9))
        }
        function $e(T) {
            n.enabled === false || n.enablePan === false || o0(T)
        }
        function L(T) {
            switch (u0(T),
            b.length) {
            case 1:
                switch (n.touches.ONE) {
                case Xn.ROTATE:
                    if (n.enableRotate === false)
                        return;
                    c0(),
                    r = i.TOUCH_ROTATE;
                    break;
                case Xn.PAN:
                    if (n.enablePan === false)
                        return;
                    d0(),
                    r = i.TOUCH_PAN;
                    break;
                default:
                    r = i.NONE
                }
                break;
            case 2:
                switch (n.touches.TWO) {
                case Xn.DOLLY_PAN:
                    if (n.enableZoom === false && n.enablePan === false)
                        return;
                    se(),
                    r = i.TOUCH_DOLLY_PAN;
                    break;
                case Xn.DOLLY_ROTATE:
                    if (n.enableZoom === false && n.enableRotate === false)
                        return;
                    A0(),
                    r = i.TOUCH_DOLLY_ROTATE;
                    break;
                default:
                    r = i.NONE
                }
                break;
            default:
                r = i.NONE
            }
            r !== i.NONE && n.dispatchEvent(Sa)
        }
        function w(T) {
            switch (u0(T),
            r) {
            case i.TOUCH_ROTATE:
                if (n.enableRotate === false)
                    return;
                M0(T),
                n.update();
                break;
            case i.TOUCH_PAN:
                if (n.enablePan === false)
                    return;
                f0(T),
                n.update();
                break;
            case i.TOUCH_DOLLY_PAN:
                if (n.enableZoom === false && n.enablePan === false)
                    return;
                L0(T),
                n.update();
                break;
            case i.TOUCH_DOLLY_ROTATE:
                if (n.enableZoom === false && n.enableRotate === false)
                    return;
                x0(T),
                n.update();
                break;
            default:
                r = i.NONE
            }
        }
        function q(T) {
            n.enabled !== false && T.preventDefault()
        }
        function Q(T) {
            b.push(T)
        }
        function s0(T) {
            delete E[T.pointerId];
            for (let $ = 0; $ < b.length; $++)
                if (b[$].pointerId == T.pointerId) {
                    b.splice($, 1);
                    return
                }
        }
        function u0(T) {
            let $ = E[T.pointerId];
            $ === void 0 && ($ = new THREE.Vector2(),
            E[T.pointerId] = $),
            $.set(T.pageX, T.pageY)
        }
        function v0(T) {
            const $ = T.pointerId === b[0].pointerId ? b[1] : b[0];
            return E[$.pointerId]
        }
        n.domElement.addEventListener("contextmenu", q),
        n.domElement.addEventListener("pointerdown", ce),
        n.domElement.addEventListener("pointercancel", Ge),
        n.domElement.addEventListener("wheel", Ze, {
            passive: false
        }),
        this.update()
    }
}
const xs = {
    uniforms: {
        tDiffuse: {
            value: null
        },
        opacity: {
            value: 1
        }
    },
    vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
    fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;


		}`
};
class Ar {
    constructor() {
        this.enabled = true,
        this.needsSwap = true,
        this.clear = false,
        this.renderToScreen = false
    }
    setSize() {}
    render() {
        console.error("THREE.Pass: .render() must be implemented in derived pass.")
    }
}
const Hh = new THREE.OrthographicCamera(-1,1,1,-1,0,1)
  , Io = new Ve;
Io.setAttribute("position", new Pe([-1, 3, 0, -1, -1, 0, 3, -1, 0],3));
Io.setAttribute("uv", new Pe([0, 2, 0, 0, 2, 0],2));
class C3 {
    constructor(e) {
        this._mesh = new K0(Io,e)
    }
    dispose() {
        this._mesh.geometry.dispose()
    }
    render(e) {
        e.render(this._mesh, Hh)
    }
    get material() {
        return this._mesh.material
    }
    set material(e) {
        this._mesh.material = e
    }
}
class io extends Ar {
    constructor(e, t) {
        super(),
        this.textureID = t !== void 0 ? t : "tDiffuse",
        e instanceof ve ? (this.uniforms = e.uniforms,
        this.material = e) : e && (this.uniforms = gs.clone(e.uniforms),
        this.material = new ve({
            defines: Object.assign({}, e.defines),
            uniforms: this.uniforms,
            vertexShader: e.vertexShader,
            fragmentShader: e.fragmentShader
        })),
        this.fsQuad = new C3(this.material)
    }
    render(e, t, n) {
        this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture),
        this.fsQuad.material = this.material,
        this.renderToScreen ? (e.setRenderTarget(null),
        this.fsQuad.render(e)) : (e.setRenderTarget(t),
        this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
        this.fsQuad.render(e))
    }
}
class W9 extends Ar {
    constructor(e, t) {
        super(),
        this.scene = e,
        this.camera = t,
        this.clear = true,
        this.needsSwap = false,
        this.inverse = false
    }
    render(e, t, n) {
        const i = e.getContext()
          , r = e.state;
        r.buffers.color.setMask(false),
        r.buffers.depth.setMask(false),
        r.buffers.color.setLocked(true),
        r.buffers.depth.setLocked(true);
        let s, a;
        this.inverse ? (s = 0,
        a = 1) : (s = 1,
        a = 0),
        r.buffers.stencil.setTest(true),
        r.buffers.stencil.setOp(i.REPLACE, i.REPLACE, i.REPLACE),
        r.buffers.stencil.setFunc(i.ALWAYS, s, 4294967295),
        r.buffers.stencil.setClear(a),
        r.buffers.stencil.setLocked(true),
        e.setRenderTarget(n),
        this.clear && e.clear(),
        e.render(this.scene, this.camera),
        e.setRenderTarget(t),
        this.clear && e.clear(),
        e.render(this.scene, this.camera),
        r.buffers.color.setLocked(false),
        r.buffers.depth.setLocked(false),
        r.buffers.stencil.setLocked(false),
        r.buffers.stencil.setFunc(i.EQUAL, 1, 4294967295),
        r.buffers.stencil.setOp(i.KEEP, i.KEEP, i.KEEP),
        r.buffers.stencil.setLocked(true)
    }
}
class Wh extends Ar {
    constructor() {
        super(),
        this.needsSwap = false
    }
    render(e) {
        e.state.buffers.stencil.setLocked(false),
        e.state.buffers.stencil.setTest(false)
    }
}
class qh {
    constructor(e, t) {
        if (this.renderer = e,
        t === void 0) {
            const n = e.getSize(new THREE.Vector2());
            this._pixelRatio = e.getPixelRatio(),
            this._width = n.width,
            this._height = n.height,
            t = new ke(this._width * this._pixelRatio,this._height * this._pixelRatio),
            t.texture.name = "EffectComposer.rt1"
        } else
            this._pixelRatio = 1,
            this._width = t.width,
            this._height = t.height;
        this.renderTarget1 = t,
        this.renderTarget2 = t.clone(),
        this.renderTarget2.texture.name = "EffectComposer.rt2",
        this.writeBuffer = this.renderTarget1,
        this.readBuffer = this.renderTarget2,
        this.renderToScreen = true,
        this.passes = [],
        xs === void 0 && console.error("THREE.EffectComposer relies on CopyShader"),
        io === void 0 && console.error("THREE.EffectComposer relies on ShaderPass"),
        this.copyPass = new io(xs),
        this.clock = new y3
    }
    swapBuffers() {
        const e = this.readBuffer;
        this.readBuffer = this.writeBuffer,
        this.writeBuffer = e
    }
    addPass(e) {
        this.passes.push(e),
        e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
    }
    insertPass(e, t) {
        this.passes.splice(t, 0, e),
        e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
    }
    removePass(e) {
        const t = this.passes.indexOf(e);
        t !== -1 && this.passes.splice(t, 1)
    }
    isLastEnabledPass(e) {
        for (let t = e + 1; t < this.passes.length; t++)
            if (this.passes[t].enabled)
                return false;
        return true
    }
    render(e) {
        e === void 0 && (e = this.clock.getDelta());
        const t = this.renderer.getRenderTarget();
        let n = false;
        for (let i = 0, r = this.passes.length; i < r; i++) {
            const s = this.passes[i];
            if (s.enabled !== false) {
                if (s.renderToScreen = this.renderToScreen && this.isLastEnabledPass(i),
                s.render(this.renderer, this.writeBuffer, this.readBuffer, e, n),
                s.needsSwap) {
                    if (n) {
                        const a = this.renderer.getContext()
                          , c = this.renderer.state.buffers.stencil;
                        c.setFunc(a.NOTEQUAL, 1, 4294967295),
                        this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e),
                        c.setFunc(a.EQUAL, 1, 4294967295)
                    }
                    this.swapBuffers()
                }
                W9 !== void 0 && (s instanceof W9 ? n = true : s instanceof Wh && (n = false))
            }
        }
        this.renderer.setRenderTarget(t)
    }
    reset(e) {
        if (e === void 0) {
            const t = this.renderer.getSize(new THREE.Vector2());
            this._pixelRatio = this.renderer.getPixelRatio(),
            this._width = t.width,
            this._height = t.height,
            e = this.renderTarget1.clone(),
            e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
        }
        this.renderTarget1.dispose(),
        this.renderTarget2.dispose(),
        this.renderTarget1 = e,
        this.renderTarget2 = e.clone(),
        this.writeBuffer = this.renderTarget1,
        this.readBuffer = this.renderTarget2
    }
    setSize(e, t) {
        this._width = e,
        this._height = t;
        const n = this._width * this._pixelRatio
          , i = this._height * this._pixelRatio;
        this.renderTarget1.setSize(n, i),
        this.renderTarget2.setSize(n, i);
        for (let r = 0; r < this.passes.length; r++)
            this.passes[r].setSize(n, i)
    }
    setPixelRatio(e) {
        this._pixelRatio = e,
        this.setSize(this._width, this._height)
    }
}
new THREE.OrthographicCamera(-1,1,1,-1,0,1);
const P3 = new Ve;
P3.setAttribute("position", new Pe([-1, 3, 0, -1, -1, 0, 3, -1, 0],3));
P3.setAttribute("uv", new Pe([0, 2, 0, 0, 2, 0],2));
class jh extends Ar {
    constructor(e, t, n, i, r) {
        super(),
        this.scene = e,
        this.camera = t,
        this.overrideMaterial = n,
        this.clearColor = i,
        this.clearAlpha = r !== void 0 ? r : 0,
        this.clear = true,
        this.clearDepth = false,
        this.needsSwap = false,
        this._oldClearColor = new m0
    }
    render(e, t, n) {
        const i = e.autoClear;
        e.autoClear = false;
        let r, s;
        this.overrideMaterial !== void 0 && (s = this.scene.overrideMaterial,
        this.scene.overrideMaterial = this.overrideMaterial),
        this.clearColor && (e.getClearColor(this._oldClearColor),
        r = e.getClearAlpha(),
        e.setClearColor(this.clearColor, this.clearAlpha)),
        this.clearDepth && e.clearDepth(),
        e.setRenderTarget(this.renderToScreen ? null : n),
        this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
        e.render(this.scene, this.camera),
        this.clearColor && e.setClearColor(this._oldClearColor, r),
        this.overrideMaterial !== void 0 && (this.scene.overrideMaterial = s),
        e.autoClear = i
    }
}
const q9 = {
    shaderID: "luminosityHighPass",
    uniforms: {
        tDiffuse: {
            value: null
        },
        luminosityThreshold: {
            value: 1
        },
        smoothWidth: {
            value: 1
        },
        defaultColor: {
            value: new m0(0)
        },
        defaultOpacity: {
            value: 0
        }
    },
    vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
    fragmentShader: `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`
};
class Di extends Ar {
    constructor(e, t, n, i) {
        super(),
        this.strength = t !== void 0 ? t : 1,
        this.radius = n,
        this.threshold = i,
        this.resolution = e !== void 0 ? new THREE.Vector2(e.x,e.y) : new THREE.Vector2(256,256),
        this.clearColor = new m0(0,0,0),
        this.renderTargetsHorizontal = [],
        this.renderTargetsVertical = [],
        this.nMips = 5;
        let r = Math.round(this.resolution.x / 2)
          , s = Math.round(this.resolution.y / 2);
        this.renderTargetBright = new ke(r,s),
        this.renderTargetBright.texture.name = "UnrealBloomPass.bright",
        this.renderTargetBright.texture.generateMipmaps = false;
        for (let o = 0; o < this.nMips; o++) {
            const h = new ke(r,s);
            h.texture.name = "UnrealBloomPass.h" + o,
            h.texture.generateMipmaps = false,
            this.renderTargetsHorizontal.push(h);
            const d = new ke(r,s);
            d.texture.name = "UnrealBloomPass.v" + o,
            d.texture.generateMipmaps = false,
            this.renderTargetsVertical.push(d),
            r = Math.round(r / 2),
            s = Math.round(s / 2)
        }
        q9 === void 0 && console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");
        const a = q9;
        this.highPassUniforms = gs.clone(a.uniforms),
        this.highPassUniforms.luminosityThreshold.value = i,
        this.highPassUniforms.smoothWidth.value = .01,
        this.materialHighPassFilter = new ve({
            uniforms: this.highPassUniforms,
            vertexShader: a.vertexShader,
            fragmentShader: a.fragmentShader,
            defines: {}
        }),
        this.separableBlurMaterials = [];
        const c = [3, 5, 7, 9, 11];
        r = Math.round(this.resolution.x / 2),
        s = Math.round(this.resolution.y / 2);
        for (let o = 0; o < this.nMips; o++)
            this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[o])),
            this.separableBlurMaterials[o].uniforms.texSize.value = new THREE.Vector2(r,s),
            r = Math.round(r / 2),
            s = Math.round(s / 2);
        this.compositeMaterial = this.getCompositeMaterial(this.nMips),
        this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture,
        this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture,
        this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture,
        this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture,
        this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture,
        this.compositeMaterial.uniforms.bloomStrength.value = t,
        this.compositeMaterial.uniforms.bloomRadius.value = .1,
        this.compositeMaterial.needsUpdate = true;
        const u = [1, .8, .6, .4, .2];
        this.compositeMaterial.uniforms.bloomFactors.value = u,
        this.bloomTintColors = [new R(1,1,1), new R(1,1,1), new R(1,1,1), new R(1,1,1), new R(1,1,1)],
        this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors,
        xs === void 0 && console.error("THREE.UnrealBloomPass relies on CopyShader");
        const f = xs;
        this.copyUniforms = gs.clone(f.uniforms),
        this.copyUniforms.opacity.value = 1,
        this.materialCopy = new ve({
            uniforms: this.copyUniforms,
            vertexShader: f.vertexShader,
            fragmentShader: f.fragmentShader,
            blending: ka,
            depthTest: false,
            depthWrite: false,
            transparent: true
        }),
        this.enabled = true,
        this.needsSwap = false,
        this._oldClearColor = new m0,
        this.oldClearAlpha = 1,
        this.basic = new wt,
        this.fsQuad = new C3(null)
    }
    dispose() {
        for (let e = 0; e < this.renderTargetsHorizontal.length; e++)
            this.renderTargetsHorizontal[e].dispose();
        for (let e = 0; e < this.renderTargetsVertical.length; e++)
            this.renderTargetsVertical[e].dispose();
        this.renderTargetBright.dispose()
    }
    setSize(e, t) {
        let n = Math.round(e / 2)
          , i = Math.round(t / 2);
        this.renderTargetBright.setSize(n, i);
        for (let r = 0; r < this.nMips; r++)
            this.renderTargetsHorizontal[r].setSize(n, i),
            this.renderTargetsVertical[r].setSize(n, i),
            this.separableBlurMaterials[r].uniforms.texSize.value = new THREE.Vector2(n,i),
            n = Math.round(n / 2),
            i = Math.round(i / 2)
    }
    render(e, t, n, i, r) {
        e.getClearColor(this._oldClearColor),
        this.oldClearAlpha = e.getClearAlpha();
        const s = e.autoClear;
        e.autoClear = false,
        e.setClearColor(this.clearColor, 0),
        r && e.state.buffers.stencil.setTest(false),
        this.renderToScreen && (this.fsQuad.material = this.basic,
        this.basic.map = n.texture,
        e.setRenderTarget(null),
        e.clear(),
        this.fsQuad.render(e)),
        this.highPassUniforms.tDiffuse.value = n.texture,
        this.highPassUniforms.luminosityThreshold.value = this.threshold,
        this.fsQuad.material = this.materialHighPassFilter,
        e.setRenderTarget(this.renderTargetBright),
        e.clear(),
        this.fsQuad.render(e);
        let a = this.renderTargetBright;
        for (let c = 0; c < this.nMips; c++)
            this.fsQuad.material = this.separableBlurMaterials[c],
            this.separableBlurMaterials[c].uniforms.colorTexture.value = a.texture,
            this.separableBlurMaterials[c].uniforms.direction.value = Di.BlurDirectionX,
            e.setRenderTarget(this.renderTargetsHorizontal[c]),
            e.clear(),
            this.fsQuad.render(e),
            this.separableBlurMaterials[c].uniforms.colorTexture.value = this.renderTargetsHorizontal[c].texture,
            this.separableBlurMaterials[c].uniforms.direction.value = Di.BlurDirectionY,
            e.setRenderTarget(this.renderTargetsVertical[c]),
            e.clear(),
            this.fsQuad.render(e),
            a = this.renderTargetsVertical[c];
        this.fsQuad.material = this.compositeMaterial,
        this.compositeMaterial.uniforms.bloomStrength.value = this.strength,
        this.compositeMaterial.uniforms.bloomRadius.value = this.radius,
        this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors,
        e.setRenderTarget(this.renderTargetsHorizontal[0]),
        e.clear(),
        this.fsQuad.render(e),
        this.fsQuad.material = this.materialCopy,
        this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture,
        r && e.state.buffers.stencil.setTest(true),
        this.renderToScreen ? (e.setRenderTarget(null),
        this.fsQuad.render(e)) : (e.setRenderTarget(n),
        this.fsQuad.render(e)),
        e.setClearColor(this._oldClearColor, this.oldClearAlpha),
        e.autoClear = s
    }
    getSeperableBlurMaterial(e) {
        return new ve({
            defines: {
                KERNEL_RADIUS: e,
                SIGMA: e
            },
            uniforms: {
                colorTexture: {
                    value: null
                },
                texSize: {
                    value: new THREE.Vector2(.5,.5)
                },
                direction: {
                    value: new THREE.Vector2(.5,.5)
                }
            },
            vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
            fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`
        })
    }
    getCompositeMaterial(e) {
        return new ve({
            defines: {
                NUM_MIPS: e
            },
            uniforms: {
                blurTexture1: {
                    value: null
                },
                blurTexture2: {
                    value: null
                },
                blurTexture3: {
                    value: null
                },
                blurTexture4: {
                    value: null
                },
                blurTexture5: {
                    value: null
                },
                bloomStrength: {
                    value: 1
                },
                bloomFactors: {
                    value: null
                },
                bloomTintColors: {
                    value: null
                },
                bloomRadius: {
                    value: 0
                }
            },
            vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
            fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`
        })
    }
}
Di.BlurDirectionX = new THREE.Vector2(1,0);
Di.BlurDirectionY = new THREE.Vector2(0,1);
const Xh = {
    uniforms: {
        tDiffuse: {
            value: null
        },
        resolution: {
            value: new THREE.Vector2(1 / 1024,1 / 512)
        }
    },
    vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
    fragmentShader: `
	precision highp float;

	uniform sampler2D tDiffuse;

	uniform vec2 resolution;

	varying vec2 vUv;

	// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)

	//----------------------------------------------------------------------------------
	// File:        es3-keplerFXAAassetsshaders/FXAA_DefaultES.frag
	// SDK Version: v3.00
	// Email:       gameworks@nvidia.com
	// Site:        http://developer.nvidia.com/
	//
	// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.
	//
	// Redistribution and use in source and binary forms, with or without
	// modification, are permitted provided that the following conditions
	// are met:
	//  * Redistributions of source code must retain the above copyright
	//    notice, this list of conditions and the following disclaimer.
	//  * Redistributions in binary form must reproduce the above copyright
	//    notice, this list of conditions and the following disclaimer in the
	//    documentation and/or other materials provided with the distribution.
	//  * Neither the name of NVIDIA CORPORATION nor the names of its
	//    contributors may be used to endorse or promote products derived
	//    from this software without specific prior written permission.
	//
	// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ''AS IS'' AND ANY
	// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
	// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
	// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
	// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
	// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
	// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	//
	//----------------------------------------------------------------------------------

	#ifndef FXAA_DISCARD
			//
			// Only valid for PC OpenGL currently.
			// Probably will not work when FXAA_GREEN_AS_LUMA = 1.
			//
			// 1 = Use discard on pixels which don't need AA.
			//     For APIs which enable concurrent TEX+ROP from same surface.
			// 0 = Return unchanged color on pixels which don't need AA.
			//
			#define FXAA_DISCARD 0
	#endif

	/*--------------------------------------------------------------------------*/
	#define FxaaTexTop(t, p) texture2D(t, p, -100.0)
	#define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), -100.0)
	/*--------------------------------------------------------------------------*/

	#define NUM_SAMPLES 5

	// assumes colors have premultipliedAlpha, so that the calculated color contrast is scaled by alpha
	float contrast( vec4 a, vec4 b ) {
			vec4 diff = abs( a - b );
			return max( max( max( diff.r, diff.g ), diff.b ), diff.a );
	}

	/*============================================================================

									FXAA3 QUALITY - PC

	============================================================================*/

	/*--------------------------------------------------------------------------*/
	vec4 FxaaPixelShader(
			vec2 posM,
			sampler2D tex,
			vec2 fxaaQualityRcpFrame,
			float fxaaQualityEdgeThreshold,
			float fxaaQualityinvEdgeThreshold
	) {
			vec4 rgbaM = FxaaTexTop(tex, posM);
			vec4 rgbaS = FxaaTexOff(tex, posM, vec2( 0.0, 1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaE = FxaaTexOff(tex, posM, vec2( 1.0, 0.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaN = FxaaTexOff(tex, posM, vec2( 0.0,-1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaW = FxaaTexOff(tex, posM, vec2(-1.0, 0.0), fxaaQualityRcpFrame.xy);
			// . S .
			// W M E
			// . N .

			bool earlyExit = max( max( max(
					contrast( rgbaM, rgbaN ),
					contrast( rgbaM, rgbaS ) ),
					contrast( rgbaM, rgbaE ) ),
					contrast( rgbaM, rgbaW ) )
					< fxaaQualityEdgeThreshold;
			// . 0 .
			// 0 0 0
			// . 0 .

			#if (FXAA_DISCARD == 1)
					if(earlyExit) FxaaDiscard;
			#else
					if(earlyExit) return rgbaM;
			#endif

			float contrastN = contrast( rgbaM, rgbaN );
			float contrastS = contrast( rgbaM, rgbaS );
			float contrastE = contrast( rgbaM, rgbaE );
			float contrastW = contrast( rgbaM, rgbaW );

			float relativeVContrast = ( contrastN + contrastS ) - ( contrastE + contrastW );
			relativeVContrast *= fxaaQualityinvEdgeThreshold;

			bool horzSpan = relativeVContrast > 0.;
			// . 1 .
			// 0 0 0
			// . 1 .

			// 45 deg edge detection and corners of objects, aka V/H contrast is too similar
			if( abs( relativeVContrast ) < .3 ) {
					// locate the edge
					vec2 dirToEdge;
					dirToEdge.x = contrastE > contrastW ? 1. : -1.;
					dirToEdge.y = contrastS > contrastN ? 1. : -1.;
					// . 2 .      . 1 .
					// 1 0 2  ~=  0 0 1
					// . 1 .      . 0 .

					// tap 2 pixels and see which ones are "outside" the edge, to
					// determine if the edge is vertical or horizontal

					vec4 rgbaAlongH = FxaaTexOff(tex, posM, vec2( dirToEdge.x, -dirToEdge.y ), fxaaQualityRcpFrame.xy);
					float matchAlongH = contrast( rgbaM, rgbaAlongH );
					// . 1 .
					// 0 0 1
					// . 0 H

					vec4 rgbaAlongV = FxaaTexOff(tex, posM, vec2( -dirToEdge.x, dirToEdge.y ), fxaaQualityRcpFrame.xy);
					float matchAlongV = contrast( rgbaM, rgbaAlongV );
					// V 1 .
					// 0 0 1
					// . 0 .

					relativeVContrast = matchAlongV - matchAlongH;
					relativeVContrast *= fxaaQualityinvEdgeThreshold;

					if( abs( relativeVContrast ) < .3 ) { // 45 deg edge
							// 1 1 .
							// 0 0 1
							// . 0 1

							// do a simple blur
							return mix(
									rgbaM,
									(rgbaN + rgbaS + rgbaE + rgbaW) * .25,
									.4
							);
					}

					horzSpan = relativeVContrast > 0.;
			}

			if(!horzSpan) rgbaN = rgbaW;
			if(!horzSpan) rgbaS = rgbaE;
			// . 0 .      1
			// 1 0 1  ->  0
			// . 0 .      1

			bool pairN = contrast( rgbaM, rgbaN ) > contrast( rgbaM, rgbaS );
			if(!pairN) rgbaN = rgbaS;

			vec2 offNP;
			offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;
			offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;

			bool doneN = false;
			bool doneP = false;

			float nDist = 0.;
			float pDist = 0.;

			vec2 posN = posM;
			vec2 posP = posM;

			int iterationsUsed = 0;
			int iterationsUsedN = 0;
			int iterationsUsedP = 0;
			for( int i = 0; i < NUM_SAMPLES; i++ ) {
					iterationsUsed = i;

					float increment = float(i + 1);

					if(!doneN) {
							nDist += increment;
							posN = posM + offNP * nDist;
							vec4 rgbaEndN = FxaaTexTop(tex, posN.xy);
							doneN = contrast( rgbaEndN, rgbaM ) > contrast( rgbaEndN, rgbaN );
							iterationsUsedN = i;
					}

					if(!doneP) {
							pDist += increment;
							posP = posM - offNP * pDist;
							vec4 rgbaEndP = FxaaTexTop(tex, posP.xy);
							doneP = contrast( rgbaEndP, rgbaM ) > contrast( rgbaEndP, rgbaN );
							iterationsUsedP = i;
					}

					if(doneN || doneP) break;
			}


			if ( !doneP && !doneN ) return rgbaM; // failed to find end of edge

			float dist = min(
					doneN ? float( iterationsUsedN ) / float( NUM_SAMPLES - 1 ) : 1.,
					doneP ? float( iterationsUsedP ) / float( NUM_SAMPLES - 1 ) : 1.
			);

			// hacky way of reduces blurriness of mostly diagonal edges
			// but reduces AA quality
			dist = pow(dist, .5);

			dist = 1. - dist;

			return mix(
					rgbaM,
					rgbaN,
					dist * .5
			);
	}

	void main() {
			const float edgeDetectionQuality = .2;
			const float invEdgeDetectionQuality = 1. / edgeDetectionQuality;

			gl_FragColor = FxaaPixelShader(
					vUv,
					tDiffuse,
					resolution,
					edgeDetectionQuality, // [0,1] contrast needed, otherwise early discard
					invEdgeDetectionQuality
			);

	}
	`
};
class Yh extends Ts {
    constructor(e, t) {
        const n = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0]
          , i = new Ve;
        i.setAttribute("position", new Pe(n,3)),
        i.computeBoundingSphere();
        const r = new Co({
            fog: false
        });
        super(i, r),
        this.light = e,
        this.color = t,
        this.type = "RectAreaLightHelper";
        const s = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0]
          , a = new Ve;
        a.setAttribute("position", new Pe(s,3)),
        a.computeBoundingSphere(),
        this.add(new K0(a,new wt({
            side: st,
            fog: false
        })))
    }
    updateMatrixWorld() {
        if (this.scale.set(.5 * this.light.width, .5 * this.light.height, 1),
        this.color !== void 0)
            this.material.color.set(this.color),
            this.children[0].material.color.set(this.color);
        else {
            this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
            const e = this.material.color
              , t = Math.max(e.r, e.g, e.b);
            t > 1 && e.multiplyScalar(1 / t),
            this.children[0].material.color.copy(this.material.color)
        }
        this.matrixWorld.extractRotation(this.light.matrixWorld).scale(this.scale).copyPosition(this.light.matrixWorld),
        this.children[0].matrixWorld.copy(this.matrixWorld)
    }
    dispose() {
        this.geometry.dispose(),
        this.material.dispose(),
        this.children[0].geometry.dispose(),
        this.children[0].material.dispose()
    }
}
class Kh {
    static init() {
        const e = [1, 0, 0, 2e-5, 1, 0, 0, 503905e-9, 1, 0, 0, .00201562, 1, 0, 0, .00453516, 1, 0, 0, .00806253, 1, 0, 0, .0125978, 1, 0, 0, .018141, 1, 0, 0, .0246924, 1, 0, 0, .0322525, 1, 0, 0, .0408213, 1, 0, 0, .0503999, 1, 0, 0, .0609894, 1, 0, 0, .0725906, 1, 0, 0, .0852058, 1, 0, 0, .0988363, 1, 0, 0, .113484, 1, 0, 0, .129153, 1, 0, 0, .145839, 1, 0, 0, .163548, 1, 0, 0, .182266, 1, 0, 0, .201942, 1, 0, 0, .222314, 1, 0, 0, .241906, 1, 0, 0, .262314, 1, 0, 0, .285754, 1, 0, 0, .310159, 1, 0, 0, .335426, 1, 0, 0, .361341, 1, 0, 0, .387445, 1, 0, 0, .412784, 1, 0, 0, .438197, 1, 0, 0, .466966, 1, 0, 0, .49559, 1, 0, 0, .523448, 1, 0, 0, .549938, 1, 0, 0, .57979, 1, 0, 0, .608746, 1, 0, 0, .636185, 1, 0, 0, .664748, 1, 0, 0, .69313, 1, 0, 0, .71966, 1, 0, 0, .747662, 1, 0, 0, .774023, 1, 0, 0, .799775, 1, 0, 0, .825274, 1, 0, 0, .849156, 1, 0, 0, .873248, 1, 0, 0, .89532, 1, 0, 0, .917565, 1, 0, 0, .937863, 1, 0, 0, .958139, 1, 0, 0, .976563, 1, 0, 0, .994658, 1, 0, 0, 1.0112, 1, 0, 0, 1.02712, 1, 0, 0, 1.04189, 1, 0, 0, 1.05568, 1, 0, 0, 1.06877, 1, 0, 0, 1.08058, 1, 0, 0, 1.09194, 1, 0, 0, 1.10191, 1, 0, 0, 1.11161, 1, 0, 0, 1.1199, 1, 0, 0, 1.12813, .999547, -448815e-12, .0224417, 199902e-10, .999495, -113079e-10, .0224406, 503651e-9, .999496, -452317e-10, .0224406, .00201461, .999496, -101772e-9, .0224406, .00453287, .999495, -180928e-9, .0224406, .00805845, .999497, -282702e-9, .0224406, .0125914, .999496, -407096e-9, .0224406, .0181319, .999498, -554114e-9, .0224406, .02468, .999499, -723768e-9, .0224406, .0322363, .999495, -916058e-9, .0224405, .0408009, .999499, -.00113101, .0224408, .050375, .999494, -.00136863, .0224405, .0609586, .999489, -.00162896, .0224401, .0725537, .999489, -.00191201, .0224414, .0851619, .999498, -.00221787, .0224413, .0987867, .999492, -.00254642, .0224409, .113426, .999507, -.00289779, .0224417, .129088, .999494, -.0032716, .0224386, .145767, .999546, -.0036673, .0224424, .163472, .999543, -.00408166, .0224387, .182182, .999499, -.00450056, .0224338, .201843, .999503, -.00483661, .0224203, .222198, .999546, -.00452928, .022315, .241714, .999508, -.00587403, .0224329, .262184, .999509, -.00638806, .0224271, .285609, .999501, -.00691028, .0224166, .309998, .999539, -.00741979, .0223989, .335262, .999454, -.00786282, .0223675, .361154, .999529, -.00811928, .0222828, .387224, .999503, -.00799941, .0221063, .41252, .999561, -.00952753, .0223057, .438006, .999557, -.0099134, .0222065, .466735, .999541, -.0100935, .0220402, .495332, .999562, -.00996821, .0218067, .523197, .999556, -.0105031, .0217096, .550223, .999561, -.0114191, .0217215, .579498, .999588, -.0111818, .0213357, .608416, .999633, -.0107725, .0208689, .635965, .999527, -.0121671, .0210149, .664476, .999508, -.0116005, .020431, .692786, .999568, -.0115604, .0199791, .719709, .999671, -.0121117, .0197415, .74737, .999688, -.0110769, .0188846, .773692, .99962, -.0122368, .0188452, .799534, .999823, -.0110325, .0178001, .825046, .999599, -.0114923, .0174221, .849075, .999619, -.0105923, .0164345, .872999, .999613, -.0105988, .0158227, .895371, .99964, -.00979861, .0148131, .917364, .99977, -.00967238, .0140721, .938002, .999726, -.00869175, .0129543, .957917, .99973, -.00866872, .0122329, .976557, .999773, -.00731956, .0108958, .994459, .999811, -.00756027, .0102715, 1.01118, .999862, -.00583732, .00878781, 1.02701, .999835, -.00631438, .00827529, 1.04186, .999871, -.00450785, .00674583, 1.05569, .999867, -.00486079, .00621041, 1.06861, .999939, -.00322072, .00478301, 1.08064, .999918, -.00318199, .00406395, 1.09181, 1.00003, -.00193348, .00280682, 1.10207, .999928, -.00153729, .00198741, 1.11152, .999933, -623666e-9, 917714e-9, 1.12009, 1, -102387e-11, 907581e-12, 1.12813, .997866, -896716e-12, .0448334, 199584e-10, .997987, -225945e-10, .0448389, 502891e-9, .997987, -903781e-10, .0448388, .00201156, .997985, -203351e-9, .0448388, .00452602, .997986, -361514e-9, .0448388, .00804629, .997987, -56487e-8, .0448389, .0125724, .997988, -813423e-9, .0448389, .0181045, .997984, -.00110718, .0448387, .0246427, .997985, -.00144616, .0448388, .0321875, .997987, -.00183038, .044839, .0407392, .997983, -.00225987, .0448387, .0502986, .997991, -.00273467, .0448389, .0608667, .997984, -.00325481, .0448384, .0724444, .998002, -.00382043, .044839, .0850348, .997997, -.00443145, .0448396, .0986372, .998007, -.00508796, .0448397, .113255, .998008, -.00578985, .04484, .128891, .998003, -.00653683, .0448384, .145548, .997983, -.00732713, .0448358, .163221, .997985, -.00815454, .0448358, .181899, .998005, -.00898985, .0448286, .201533, .998026, -.00964404, .0447934, .221821, .998055, -.00922677, .044611, .241282, .99804, -.0117361, .0448245, .261791, .998048, -.0127628, .0448159, .285181, .998088, -.0138055, .0447996, .30954, .998058, -.0148206, .0447669, .334751, .998099, -.0156998, .044697, .36061, .998116, -.0161976, .0445122, .386603, .998195, -.015945, .0441711, .411844, .998168, -.0183947, .0444255, .43773, .998184, -.0197913, .0443809, .466009, .998251, -.0201426, .0440689, .494574, .998305, -.0198847, .0435632, .522405, .998273, -.0210577, .043414, .549967, .998254, -.0227901, .0433943, .578655, .998349, -.0223108, .0426529, .60758, .99843, -.0223088, .042, .635524, .998373, -.0241141, .0418987, .663621, .998425, -.0231446, .0408118, .691906, .998504, -.0233684, .0400565, .719339, .998443, -.0241652, .0394634, .74643, .99848, -.0228715, .0380002, .773086, .998569, -.023519, .0372322, .798988, .998619, -.0223108, .0356468, .824249, .998594, -.0223105, .034523, .848808, .998622, -.0213426, .0328887, .87227, .998669, -.0207912, .0314374, .895157, .998705, -.0198416, .0296925, .916769, .998786, -.0189168, .0279634, .937773, .998888, -.0178811, .0261597, .957431, .99906, -.0166845, .0242159, .976495, .999038, -.0155464, .0222638, .994169, .999237, -.0141349, .0201967, 1.01112, .999378, -.0129324, .0181744, 1.02692, .999433, -.0113192, .0159898, 1.04174, .999439, -.0101244, .0140385, 1.05559, .999614, -.00837456, .0117826, 1.06852, .999722, -.00721769, .00983745, 1.08069, .999817, -.00554067, .00769002, 1.09176, .99983, -.00426961, .005782, 1.10211, .999964, -.00273904, .00374503, 1.11152, 1.00001, -.00136739, .00187176, 1.12031, .999946, 393227e-10, -28919e-9, 1.12804, .995847, -13435e-10, .0671785, 19916e-9, .995464, -338387e-10, .0671527, 501622e-9, .99547, -135355e-9, .0671531, .00200649, .995471, -30455e-8, .0671532, .00451461, .99547, -541423e-9, .0671531, .008026, .995471, -84598e-8, .0671531, .0125407, .99547, -.00121823, .0671531, .0180589, .99547, -.00165817, .0671531, .0245806, .995463, -.00216583, .0671526, .0321062, .995468, -.00274127, .0671527, .0406366, .995474, -.00338447, .0671534, .0501717, .995473, -.00409554, .0671533, .0607131, .995478, -.00487451, .0671531, .0722618, .995476, -.00572148, .0671532, .0848191, .995477, -.00663658, .0671539, .0983882, .995498, -.00761986, .0671541, .112972, .995509, -.00867094, .0671542, .128568, .995509, -.00978951, .0671531, .145183, .995503, -.0109725, .0671491, .162808, .995501, -.012211, .0671465, .181441, .99553, -.0134565, .0671371, .201015, .99555, -.014391, .0670831, .221206, .99558, -.014351, .0668883, .240813, .995577, -.0173997, .0671055, .261257, .995602, -.0191111, .0671178, .284467, .995623, -.0206705, .0670946, .308765, .995658, -.022184, .0670472, .333905, .995705, -.0234832, .0669417, .359677, .995719, -.0241933, .0666714, .385554, .995786, -.0243539, .066266, .410951, .995887, -.0271866, .0664367, .437163, .995944, -.0296012, .0664931, .464842, .996004, -.0301045, .0660105, .49332, .996128, -.0298311, .0652694, .521131, .996253, -.0316426, .0650739, .549167, .996244, -.0339043, .0649433, .57737, .996309, -.033329, .0638926, .606073, .996417, -.0338935, .0630849, .634527, .996372, -.0353104, .0625083, .66256, .996542, -.0348942, .0611986, .690516, .996568, -.0351614, .060069, .718317, .996711, -.0354317, .0588522, .74528, .996671, -.0349513, .0571902, .772061, .996865, -.0345622, .0555321, .798089, .996802, -.0342566, .0537816, .823178, .996992, -.0330862, .0516095, .847949, .996944, -.0324666, .0495537, .871431, .997146, -.0309544, .0470302, .894357, .997189, -.0299372, .0446043, .916142, .997471, -.0281389, .0418812, .937193, .997515, -.0268702, .0391823, .957, .997812, -.0247166, .0361338, .975936, .998027, -.0233525, .0333945, .99391, .998233, -.0209839, .0301917, 1.01075, .998481, -.0194309, .027271, 1.02669, .998859, -.0169728, .0240162, 1.04173, .99894, -.0152322, .0210517, 1.05551, .999132, -.0127497, .0178632, 1.06856, .999369, -.0108282, .014787, 1.08054, .999549, -.00845886, .0116185, 1.09185, .999805, -.0063937, .00867209, 1.10207, .99985, -.00414582, .00566823, 1.1117, .999912, -.00207443, .00277562, 1.12022, 1.00001, 870226e-10, -53766e-9, 1.12832, .991943, -178672e-11, .0893382, 198384e-10, .991952, -450183e-10, .089339, 499849e-9, .991956, -180074e-9, .0893394, .0019994, .991955, -405167e-9, .0893393, .00449867, .991953, -720298e-9, .0893391, .00799764, .991955, -.00112548, .0893393, .0124964, .991957, -.0016207, .0893395, .0179951, .991958, -.00220601, .0893396, .0244939, .991947, -.00288137, .0893385, .0319929, .991962, -.00364693, .0893399, .0404933, .991965, -.00450264, .0893399, .049995, .99198, -.00544862, .0893411, .0604995, .99197, -.00648491, .0893397, .0720074, .991976, -.00761164, .089341, .0845207, .99198, -.00882891, .0893405, .0980413, .991982, -.0101367, .0893396, .112571, .992008, -.011535, .0893415, .128115, .992026, -.0130228, .0893414, .144672, .992064, -.0145966, .0893418, .162241, .992041, -.0162421, .0893359, .180801, .992086, -.0178888, .0893214, .200302, .992157, -.0190368, .0892401, .220332, .992181, -.0195584, .0890525, .240144, .992175, -.0227257, .0892153, .260728, .99221, -.0254195, .089304, .283473, .99222, -.0274883, .0892703, .307673, .992317, -.0294905, .0892027, .332729, .992374, -.0311861, .0890577, .358387, .992505, -.0320656, .0886994, .384102, .992568, -.0329715, .0883198, .409767, .992675, -.036006, .0883602, .436145, .992746, -.0392897, .0884591, .463217, .992873, -.0399337, .0878287, .491557, .992934, -.040231, .0870108, .519516, .993091, -.0422013, .0865857, .547741, .993259, -.0443503, .0861937, .575792, .993455, -.0446368, .0851187, .604233, .993497, -.0454299, .0840576, .632925, .993694, -.0463296, .0829671, .660985, .993718, -.0470619, .0817185, .688714, .993973, -.0468838, .0800294, .716743, .994207, -.046705, .0781286, .74377, .994168, -.0469698, .0763337, .77042, .9945, -.0456816, .0738184, .796659, .994356, -.0455518, .0715545, .821868, .994747, -.0439488, .0686085, .846572, .994937, -.0430056, .065869, .870435, .995142, -.0413414, .0626446, .893272, .995451, -.0396521, .05929, .915376, .995445, -.0378453, .0558503, .936196, .995967, -.0355219, .0520949, .956376, .996094, -.0335146, .048377, .975327, .996622, -.030682, .0442575, .993471, .996938, -.0285504, .0404693, 1.01052, .997383, -.0253399, .0360903, 1.02637, .997714, -.0231651, .0322176, 1.04139, .998249, -.0198138, .0278433, 1.05542, .998596, -.0174337, .0238759, 1.06846, .998946, -.0141349, .0195944, 1.08056, .99928, -.0115603, .0156279, 1.09181, .999507, -.00839065, .0114607, 1.10213, .999697, -.005666, .00763325, 1.11169, .999869, -.00269902, .00364946, 1.12042, 1.00001, 623836e-10, -319288e-10, 1.12832, .987221, -222675e-11, .111332, 197456e-10, .98739, -561116e-10, .111351, 497563e-9, .987448, -224453e-9, .111357, .00199031, .987441, -505019e-9, .111357, .0044782, .987442, -897816e-9, .111357, .00796129, .987442, -.00140284, .111357, .0124396, .987444, -.00202012, .111357, .0179132, .987442, -.00274964, .111357, .0243824, .987446, -.00359147, .111357, .0318474, .987435, -.00454562, .111356, .0403086, .987461, -.00561225, .111358, .0497678, .987458, -.00679125, .111358, .0602239, .987443, -.0080828, .111356, .0716792, .987476, -.0094872, .111358, .0841364, .98749, -.0110044, .111361, .097597, .987508, -.0126344, .111362, .112062, .987494, -.0143767, .111357, .127533, .987526, -.0162307, .111359, .144015, .987558, -.0181912, .111361, .161502, .987602, -.0202393, .111355, .179979, .987692, -.022273, .111346, .199386, .987702, -.0235306, .111215, .219183, .987789, -.0247628, .111061, .239202, .987776, -.0280668, .111171, .259957, .987856, -.0316751, .111327, .282198, .987912, -.0342468, .111282, .306294, .988, -.0367205, .111198, .331219, .988055, -.0387766, .110994, .356708, .988241, -.0397722, .110547, .382234, .988399, -.0416076, .110198, .408227, .988539, -.0448192, .110137, .434662, .988661, -.0483793, .110143, .461442, .988967, -.0495895, .109453, .489318, .989073, -.0506797, .108628, .517516, .989274, -.0526953, .108003, .545844, .989528, -.054578, .107255, .573823, .989709, -.0561503, .106294, .601944, .989991, -.056866, .104896, .630855, .990392, -.0572914, .103336, .658925, .990374, -.0586224, .10189, .686661, .990747, -.0584764, .099783, .714548, .991041, -.0582662, .0974309, .74186, .991236, -.0584118, .0951678, .768422, .991585, -.0573055, .0921581, .794817, .991984, -.0564241, .0891167, .820336, .9921, -.0553608, .085805, .84493, .992749, -.0533816, .0820354, .868961, .99288, -.0518661, .0782181, .891931, .993511, -.0492492, .0738935, .914186, .993617, -.0471956, .0696402, .93532, .99411, -.044216, .0649659, .95543, .994595, -.0416654, .0603177, .974685, .994976, -.0384314, .0553493, .992807, .995579, -.0353491, .0503942, 1.00996, .996069, -.0319787, .0452123, 1.02606, .996718, -.028472, .0400112, 1.04114, .997173, -.0250789, .0349456, 1.05517, .997818, -.0213326, .029653, 1.0683, .998318, -.0178509, .024549, 1.0805, .998853, -.0141118, .0194197, 1.09177, .999218, -.0105914, .0143869, 1.1022, .999594, -.00693474, .00943517, 1.11175, .99975, -.00340478, .00464051, 1.12056, 1.00001, 109172e-9, -112821e-9, 1.12853, .983383, -266524e-11, .133358, 196534e-10, .981942, -671009e-10, .133162, 494804e-9, .981946, -268405e-9, .133163, .00197923, .981944, -603912e-9, .133163, .00445326, .981941, -.00107362, .133162, .00791693, .981946, -.00167755, .133163, .0123703, .981944, -.00241569, .133162, .0178135, .981945, -.00328807, .133163, .0242466, .981945, -.00429472, .133162, .03167, .981955, -.00543573, .133164, .0400846, .981951, -.00671105, .133163, .0494901, .981968, -.00812092, .133165, .0598886, .981979, -.00966541, .133166, .0712811, .981996, -.0113446, .133168, .083669, .982014, -.0131585, .133169, .0970533, .982011, -.0151073, .133167, .111438, .982062, -.0171906, .133172, .126826, .9821, -.0194067, .133175, .143215, .982149, -.0217502, .133176, .160609, .982163, -.0241945, .133173, .178981, .982247, -.0265907, .133148, .198249, .982291, -.027916, .132974, .217795, .982396, -.0299663, .132868, .238042, .982456, -.0334544, .132934, .258901, .982499, -.0378636, .133137, .280639, .982617, -.0409274, .133085, .304604, .98274, -.0438523, .132985, .329376, .982944, -.0462288, .132728, .354697, .98308, -.0475995, .132228, .380102, .983391, -.0501901, .131924, .406256, .983514, -.0535899, .131737, .432735, .98373, -.0571858, .131567, .459359, .984056, -.0592353, .130932, .486637, .984234, -.0610488, .130092, .51509, .984748, -.0630758, .12923, .543461, .985073, -.0647398, .128174, .571376, .985195, -.0671941, .127133, .599414, .985734, -.0681345, .125576, .628134, .986241, -.0686089, .123639, .656399, .986356, -.0698511, .121834, .684258, .986894, -.0700931, .119454, .711818, .987382, -.0698321, .116718, .739511, .988109, -.0693975, .113699, .766267, .988363, -.0689584, .110454, .792456, .989112, -.0672353, .106602, .81813, .989241, -.0662034, .10267, .842889, .990333, -.0638938, .0981381, .867204, .990591, -.0618534, .0935388, .89038, .991106, -.0593117, .088553, .912576, .991919, -.0562676, .0832187, .934118, .992111, -.0534085, .0778302, .954254, .992997, -.0495459, .0720453, .973722, .993317, -.0463707, .0663458, .991949, .994133, -.0421245, .0601883, 1.00936, .994705, -.0384977, .0542501, 1.02559, .995495, -.0340956, .0479862, 1.04083, .996206, -.030105, .041887, 1.05497, .996971, -.0256095, .0355355, 1.06824, .997796, -.0213932, .0293655, 1.08056, .998272, -.0169612, .0232926, 1.09182, .998857, -.0126756, .0172786, 1.10219, .99939, -.00832486, .0113156, 1.11192, .999752, -.00410826, .00557892, 1.12075, 1, 150957e-9, -119101e-9, 1.12885, .975169, -309397e-11, .154669, 195073e-10, .975439, -779608e-10, .154712, 491534e-9, .975464, -311847e-9, .154716, .00196617, .975464, -701656e-9, .154716, .00442387, .975462, -.0012474, .154715, .0078647, .975461, -.00194906, .154715, .0122886, .975464, -.00280667, .154715, .0176959, .975468, -.00382025, .154716, .0240867, .975471, -.00498985, .154716, .0314612, .975472, -.00631541, .154717, .0398199, .975486, -.00779719, .154718, .0491639, .975489, -.00943505, .154718, .0594932, .975509, -.0112295, .154721, .0708113, .97554, -.0131802, .154724, .0831176, .975557, -.0152876, .154726, .096415, .975585, -.0175512, .154728, .110705, .975605, -.0199713, .154729, .125992, .975645, -.0225447, .154729, .142272, .975711, -.0252649, .154735, .159549, .975788, -.0280986, .154736, .177805, .975872, -.0308232, .154704, .196911, .975968, -.0324841, .154525, .216324, .976063, -.0351281, .154432, .236628, .976157, -.0388618, .15446, .257539, .976204, -.0437704, .154665, .278975, .976358, -.047514, .154652, .302606, .976571, -.0508638, .154535, .327204, .976725, -.0534995, .154221, .352276, .977013, -.0555547, .153737, .377696, .977294, -.0586728, .153403, .403855, .977602, -.0622715, .15312, .430333, .977932, -.0658166, .152755, .456855, .978241, -.0689877, .152233, .483668, .978602, -.0712805, .15132, .512097, .979234, -.0732775, .150235, .540455, .97977, -.075163, .148978, .568486, .979995, -.0778026, .147755, .596524, .98078, -.0791854, .146019, .624825, .981628, -.0799666, .143906, .653403, .982067, -.0808532, .141561, .681445, .98271, -.0816024, .139025, .708918, .983734, -.0812511, .135764, .736594, .98431, -.0806201, .132152, .763576, .985071, -.0801605, .12846, .789797, .98618, -.0784208, .124084, .815804, .986886, -.0766643, .1193, .840869, .987485, -.0747744, .114236, .864952, .988431, -.0716701, .108654, .888431, .988886, -.0691609, .102994, .910963, .990024, -.0654048, .0967278, .932629, .990401, -.0619765, .090384, .95313, .991093, -.0579296, .0837885, .972587, .992018, -.0536576, .0770171, .991184, .992536, -.0493719, .0701486, 1.00863, .993421, -.0444813, .062953, 1.02494, .993928, -.040008, .0560455, 1.04017, .994994, -.0347982, .04856, 1.05463, .995866, -.0301017, .0416152, 1.06807, .996916, -.0248225, .0342597, 1.08039, .997766, -.0199229, .0271668, 1.09177, .998479, -.0147422, .0201387, 1.10235, .99921, -.00980173, .0131944, 1.11206, .999652, -.0047426, .00640712, 1.12104, .999998, 891673e-10, -10379e-8, 1.12906, .967868, -351885e-11, .175947, 193569e-10, .968001, -886733e-10, .175972, 487782e-9, .96801, -354697e-9, .175973, .00195115, .968012, -798063e-9, .175974, .00439006, .968011, -.00141879, .175973, .00780461, .968011, -.00221686, .175973, .0121948, .968016, -.00319231, .175974, .0175607, .968019, -.00434515, .175974, .0239027, .968018, -.00567538, .175974, .0312208, .968033, -.00718308, .175977, .0395158, .968049, -.00886836, .175979, .0487885, .968047, -.0107312, .175978, .0590394, .968072, -.0127719, .175981, .0702705, .968108, -.0149905, .175986, .0824836, .968112, -.0173866, .175985, .0956783, .968173, -.0199611, .175993, .109862, .96827, -.0227128, .176008, .125033, .968292, -.025639, .17601, .141193, .968339, -.0287299, .176007, .158336, .968389, -.0319399, .176001, .176441, .968501, -.034941, .175962, .195359, .968646, -.0370812, .175793, .214686, .968789, -.0402329, .175708, .234973, .96886, -.0442601, .1757, .255871, .969013, -.049398, .175876, .277238, .969242, -.0539932, .17594, .300326, .969419, -.0577299, .175781, .324702, .969763, -.0605643, .175432, .349527, .970093, -.0634488, .174992, .374976, .970361, -.0670589, .174611, .401097, .970825, -.0708246, .174226, .427496, .971214, -.0742871, .173684, .453858, .971622, -.0782608, .173186, .480637, .972175, -.0813151, .172288, .508655, .972944, -.0832678, .170979, .536973, .973595, -.0855964, .169573, .565138, .974345, -.0882163, .168152, .593222, .975233, -.0901671, .166314, .621201, .976239, -.0912111, .163931, .649919, .977289, -.0916959, .161106, .678011, .978076, -.0927061, .158272, .705717, .979533, -.0925562, .15475, .733228, .980335, -.0918159, .150638, .760454, .981808, -.0908508, .146201, .786918, .983061, -.0896172, .141386, .812953, .984148, -.0871588, .135837, .838281, .985047, -.0850624, .130135, .862594, .986219, -.0818541, .123882, .88633, .987043, -.0784523, .117126, .908952, .988107, -.0749601, .110341, .930744, .988955, -.0703548, .102885, .951728, .989426, -.0662798, .0954167, .971166, .990421, -.0610834, .0876331, .989984, .991032, -.0562936, .0797785, 1.00765, .992041, -.0508154, .0718166, 1.02434, .992794, -.0454045, .0637125, 1.03976, .993691, -.0398194, .0555338, 1.05418, .994778, -.0341482, .0473388, 1.06772, .995915, -.028428, .0391016, 1.08028, .997109, -.022642, .0309953, 1.09185, .998095, -.0168738, .0230288, 1.10247, .998985, -.0111274, .0150722, 1.11229, .999581, -.00543881, .00740605, 1.12131, 1.00003, 162239e-9, -105549e-9, 1.12946, .959505, -393734e-11, .196876, 191893e-10, .959599, -992157e-10, .196895, 483544e-9, .959641, -396868e-9, .196903, .0019342, .959599, -892948e-9, .196895, .00435193, .959603, -.00158747, .196896, .0077368, .959604, -.00248042, .196896, .0120888, .959605, -.00357184, .196896, .0174082, .959605, -.00486169, .196896, .0236949, .959613, -.00635008, .196897, .0309497, .959619, -.00803696, .196898, .0391725, .959636, -.00992255, .196901, .0483649, .959634, -.0120067, .1969, .0585266, .959675, -.0142898, .196906, .0696609, .959712, -.0167717, .196911, .0817678, .959752, -.0194524, .196918, .0948494, .959807, -.0223321, .196925, .10891, .959828, -.0254091, .196924, .123947, .959906, -.0286815, .196934, .139968, .960005, -.0321371, .196944, .156968, .960071, -.0357114, .196936, .17491, .960237, -.0389064, .196882, .193597, .960367, -.041623, .196731, .21285, .960562, -.0452655, .196654, .233075, .960735, -.0496207, .196643, .253941, .960913, -.0549379, .196774, .275278, .961121, -.0603414, .196893, .297733, .96139, -.0644244, .196717, .321877, .961818, -.067556, .196314, .346476, .962175, -.0712709, .195917, .371907, .96255, -.0752848, .1955, .397916, .963164, -.0792073, .195026, .424229, .963782, -.0828225, .194424, .450637, .964306, -.0873119, .193831, .477288, .964923, -.0911051, .192973, .504716, .966048, -.093251, .19151, .533053, .967024, -.0958983, .190013, .561366, .968038, -.09835, .188253, .589464, .969152, -.100754, .186257, .617433, .970557, -.102239, .183775, .645801, .972104, -.102767, .180645, .674278, .973203, -.103492, .177242, .702004, .975123, -.103793, .17345, .729529, .97641, -.102839, .168886, .756712, .978313, -.101687, .163892, .783801, .980036, -.100314, .158439, .809671, .981339, -.097836, .152211, .835402, .982794, -.0950006, .145679, .860081, .984123, -.0920994, .138949, .883757, .984918, -.0878641, .131283, .90685, .985999, -.083939, .123464, .928786, .987151, -.0791234, .115324, .94983, .987827, -.0739332, .106854, .96962, .988806, -.0688088, .0982691, .98861, .989588, -.0628962, .0893456, 1.00667, .990438, -.0573146, .0805392, 1.02344, .991506, -.0509433, .0713725, 1.03933, .992492, -.0448724, .0623732, 1.05378, .993663, -.0383497, .0530838, 1.06747, .994956, -.0319593, .0439512, 1.08007, .99634, -.025401, .0347803, 1.09182, .99761, -.0189687, .0257954, 1.1025, .99863, -.0124441, .0169893, 1.11247, .99947, -.00614003, .00829498, 1.12151, 1.00008, 216624e-9, -146107e-9, 1.12993, .950129, -434955e-11, .217413, 190081e-10, .950264, -10957e-8, .217444, 47884e-8, .9503, -438299e-9, .217451, .00191543, .950246, -986124e-9, .21744, .00430951, .950246, -.00175311, .21744, .00766137, .950245, -.00273923, .21744, .011971, .950253, -.00394453, .217441, .0172385, .950258, -.00536897, .217442, .0234641, .950267, -.00701262, .217444, .030648, .950277, -.00887551, .217446, .038791, .950284, -.0109576, .217446, .0478931, .950312, -.0132591, .217451, .0579568, .950334, -.01578, .217454, .0689821, .950378, -.0185204, .217462, .0809714, .950417, -.0214803, .217467, .0939265, .950488, -.0246594, .217479, .10785, .950534, -.0280565, .217483, .122743, .950633, -.0316685, .217498, .138611, .950698, -.0354787, .217499, .155442, .950844, -.0394003, .217507, .173208, .950999, -.0426812, .217419, .191605, .951221, -.0461302, .217317, .21084, .951412, -.0502131, .217238, .230945, .951623, -.0549183, .21722, .251745, .951867, -.0604493, .217306, .273001, .952069, -.0665189, .217466, .294874, .952459, -.0709179, .217266, .318732, .952996, -.0746112, .216891, .34318, .953425, -.0789252, .216503, .36849, .953885, -.0833293, .216042, .394373, .954617, -.087371, .215469, .420505, .955429, -.0914054, .214802, .446907, .956068, -.0961671, .214146, .473522, .957094, -.10048, .213286, .50052, .958372, -.103248, .211796, .528715, .959654, -.106033, .21016, .557065, .961305, -.108384, .208149, .585286, .962785, -.111122, .206024, .613334, .964848, -.112981, .203442, .641334, .966498, -.113717, .19996, .669955, .968678, -.114121, .196105, .698094, .970489, -.114524, .191906, .725643, .972903, -.113792, .186963, .752856, .974701, -.112406, .181343, .780013, .976718, -.110685, .175185, .806268, .978905, -.108468, .168535, .832073, .980267, -.105061, .161106, .857149, .981967, -.101675, .153387, .881145, .983063, -.0974492, .145199, .904255, .984432, -.0925815, .136527, .926686, .985734, -.0877983, .127584, .947901, .986228, -.081884, .118125, .968111, .98719, -.0761208, .108594, .98719, .988228, -.0698196, .0989996, 1.00559, .989046, -.0632739, .0890074, 1.02246, .990242, -.056522, .0790832, 1.03841, .991252, -.0495272, .0689182, 1.05347, .992542, -.0425373, .0588592, 1.06724, .994096, -.0353198, .0486833, 1.08009, .995593, -.028235, .0385977, 1.09177, .99711, -.0209511, .0286457, 1.10274, .998263, -.0139289, .0188497, 1.11262, .999254, -.0067359, .009208, 1.12191, .999967, 141846e-9, -657764e-10, 1.13024, .935608, -474692e-11, .236466, 187817e-10, .93996, -11971e-8, .237568, 473646e-9, .939959, -478845e-9, .237567, .0018946, .939954, -.0010774, .237566, .00426284, .939956, -.00191538, .237566, .00757842, .939954, -.00299277, .237566, .0118413, .93996, -.00430961, .237567, .0170518, .939969, -.00586589, .237569, .02321, .939982, -.00766166, .237572, .0303164, .939987, -.00969686, .237572, .0383711, .939997, -.0119715, .237574, .0473751, .940031, -.0144858, .237581, .0573298, .940073, -.0172399, .237589, .0682366, .94012, -.0202335, .237598, .080097, .940162, -.0234663, .237604, .0929116, .940237, -.0269387, .237615, .106686, .940328, -.0306489, .237632, .121421, .940419, -.0345917, .237645, .137115, .940522, -.0387481, .237654, .153766, .940702, -.0429906, .237661, .17133, .940871, -.0465089, .237561, .189502, .941103, -.050531, .23748, .208616, .941369, -.0550657, .237423, .228595, .941641, -.0601337, .237399, .249287, .941903, -.0658804, .237443, .270467, .942224, -.0722674, .237597, .292024, .942633, -.0771788, .237419, .315272, .943172, -.0815623, .237068, .339579, .943691, -.0863973, .236682, .364717, .944382, -.0911536, .236213, .390435, .945392, -.0952967, .235562, .416425, .946185, -.0998948, .234832, .442772, .947212, -.104796, .234114, .469347, .948778, -.10928, .233222, .496162, .950149, -.113081, .231845, .523978, .951989, -.115893, .230005, .552295, .953921, -.11846, .227862, .580569, .955624, -.12115, .225439, .608698, .958234, -.123373, .222635, .636696, .960593, -.124519, .219093, .665208, .963201, -.124736, .214749, .693557, .965642, -.125012, .210059, .721334, .968765, -.124661, .204935, .748613, .971753, -.122996, .198661, .776224, .973751, -.120998, .191823, .802461, .976709, -.118583, .184359, .828399, .977956, -.115102, .176437, .853693, .979672, -.111077, .167681, .877962, .981816, -.10688, .158872, .901564, .98238, -.101469, .149398, .924057, .983964, -.0960013, .139436, .945751, .984933, -.0899626, .12943, .966272, .985694, -.0832973, .11894, .985741, .986822, -.0767082, .108349, 1.00407, .987725, -.0693614, .0976026, 1.02154, .98877, -.06211, .086652, 1.03757, .990129, -.0544143, .0756182, 1.05296, .991337, -.046744, .0645753, 1.06683, .992978, -.0387931, .0534683, 1.0798, .994676, -.030973, .0424137, 1.09181, .99645, -.0230311, .0314035, 1.10286, .997967, -.0152065, .0206869, 1.11291, .99922, -.00744837, .010155, 1.12237, 1.00002, 240209e-9, -752767e-10, 1.13089, .922948, -515351e-11, .255626, 186069e-10, .928785, -129623e-9, .257244, 468009e-9, .928761, -51849e-8, .257237, .00187202, .928751, -.0011666, .257235, .00421204, .928751, -.00207395, .257234, .0074881, .928754, -.00324055, .257235, .0117002, .92876, -.00466639, .257236, .0168486, .928763, -.00635149, .257237, .0229334, .928774, -.00829584, .257239, .029955, .928791, -.0104995, .257243, .0379139, .928804, -.0129623, .257245, .0468108, .928847, -.0156846, .257255, .0566473, .92889, -.0186661, .257263, .0674246, .928924, -.0219067, .257268, .0791433, .928989, -.0254066, .257282, .0918076, .92909, -.0291651, .257301, .105419, .92918, -.0331801, .257316, .119978, .92929, -.0374469, .257332, .135491, .929453, -.041939, .257357, .151948, .929586, -.0464612, .257347, .169275, .929858, -.0503426, .257269, .187257, .930125, -.0548409, .257199, .206204, .930403, -.0598063, .257149, .22601, .930726, -.0652437, .257122, .246561, .931098, -.0712376, .257153, .267618, .931396, -.0777506, .257237, .288993, .931947, -.0832374, .257124, .311527, .932579, -.0883955, .25683, .335697, .933194, -.0937037, .256444, .360634, .934013, -.0987292, .255939, .386126, .935307, -.103215, .255282, .412018, .936374, -.108234, .254538, .438292, .93776, -.113234, .253728, .464805, .939599, -.118013, .25275, .491464, .941036, -.122661, .251404, .518751, .94337, -.125477, .249435, .547133, .945318, -.128374, .247113, .575456, .947995, -.130996, .244441, .60372, .950818, -.133438, .241352, .63174, .954378, -.135004, .237849, .659971, .957151, -.135313, .233188, .688478, .960743, -.13521, .228001, .716767, .964352, -.135007, .222249, .744349, .967273, -.133523, .21542, .771786, .969767, -.131155, .208039, .798639, .973195, -.128492, .200076, .824774, .975557, -.125094, .191451, .850222, .977692, -.120578, .18184, .874761, .98026, -.115882, .172102, .898497, .981394, -.110372, .161859, .921636, .982386, -.10415, .15108, .943467, .983783, -.0978128, .140407, .964045, .98422, -.0906171, .129058, .98398, .985447, -.0832921, .117614, 1.00276, .986682, -.0754412, .10585, 1.02047, .987326, -.0673885, .0940943, 1.03678, .988707, -.0592565, .0822093, 1.05218, .990185, -.050717, .070192, 1.06652, .991866, -.0423486, .0582081, 1.07965, .993897, -.0336118, .0460985, 1.09188, .995841, -.0252178, .0342737, 1.10307, .997605, -.0164893, .0224829, 1.11324, .999037, -.00817112, .0110647, 1.12262, 1.00003, 291686e-9, -168673e-9, 1.13139, .915304, -552675e-11, .275999, 183285e-10, .91668, -139285e-9, .276414, 461914e-9, .916664, -55713e-8, .276409, .00184763, .916653, -.00125354, .276406, .00415715, .916651, -.00222851, .276405, .00739053, .916655, -.00348205, .276406, .0115478, .916653, -.00501414, .276405, .0166291, .916667, -.00682478, .276409, .0226346, .91668, -.00891398, .276412, .0295648, .91669, -.0112817, .276413, .0374199, .916727, -.013928, .276422, .0462016, .916759, -.0168528, .276429, .0559101, .916793, -.0200558, .276436, .0665466, .916849, -.0235373, .276448, .0781139, .916964, -.0272973, .276474, .0906156, .917047, -.0313344, .276491, .104051, .917152, -.0356465, .276511, .118424, .917286, -.0402271, .276533, .133736, .917469, -.0450408, .276564, .149978, .917686, -.0497872, .276563, .167057, .917953, -.0540937, .276493, .184846, .918228, -.0590709, .276437, .203614, .918572, -.0644277, .276398, .223212, .918918, -.0702326, .276362, .243584, .919356, -.076484, .276383, .264465, .919842, -.0830808, .276434, .285701, .920451, -.0892972, .276407, .307559, .921113, -.095016, .276128, .331501, .921881, -.100771, .275754, .356207, .923027, -.106029, .275254, .381477, .924364, -.111029, .274595, .40722, .925818, -.116345, .273841, .433385, .92746, -.121424, .272913, .459848, .929167, -.12657, .271837, .486493, .931426, -.131581, .270575, .513432, .934001, -.135038, .268512, .541502, .936296, -.138039, .266135, .569658, .939985, -.140687, .263271, .598375, .943516, -.143247, .260058, .626563, .94782, -.145135, .256138, .654711, .951023, -.145733, .251154, .683285, .955338, -.145554, .245562, .711831, .959629, -.145008, .239265, .739573, .963123, -.144003, .232064, .767027, .966742, -.141289, .224036, .794359, .969991, -.138247, .215305, .820361, .973403, -.134786, .206051, .846548, .975317, -.129966, .195914, .871541, .977647, -.12471, .185184, .895313, .980137, -.119086, .174161, .918398, .981031, -.112297, .162792, .940679, .982037, -.105372, .150952, .961991, .983164, -.097821, .138921, .981913, .983757, -.0897245, .126611, 1.00109, .985036, -.0815974, .114228, 1.01902, .986289, -.0727725, .101389, 1.03604, .987329, -.0639323, .0886476, 1.05149, .989193, -.0548109, .0756837, 1.06619, .990716, -.045687, .0627581, 1.07948, .992769, -.0364315, .0498337, 1.09172, .99524, -.0271761, .0370305, 1.1033, .997154, -.0179609, .0243959, 1.11353, .998845, -.00878063, .0119567, 1.12319, 1.00002, 259038e-9, -108146e-9, 1.13177, .903945, -591681e-11, .295126, 181226e-10, .903668, -148672e-9, .295037, 455367e-9, .903677, -594683e-9, .29504, .00182145, .903673, -.00133805, .295039, .00409831, .903666, -.00237872, .295036, .00728584, .903668, -.00371676, .295037, .0113842, .903679, -.00535212, .29504, .0163936, .903684, -.00728479, .295041, .0223141, .903698, -.00951473, .295044, .0291462, .903718, -.0120419, .295049, .0368904, .903754, -.0148664, .295058, .0455477, .903801, -.017988, .29507, .0551194, .903851, -.0214064, .295082, .0656058, .903921, -.0251219, .295097, .0770109, .904002, -.0291337, .295116, .0893354, .904111, -.033441, .29514, .102583, .904246, -.0380415, .295169, .116755, .904408, -.0429258, .295202, .131853, .904637, -.0480468, .295245, .147869, .904821, -.0529208, .295214, .164658, .905163, -.0577748, .295185, .182274, .905469, -.0631763, .295143, .200828, .905851, -.068917, .295112, .2202, .906322, -.0750861, .295104, .240372, .906761, -.0815855, .295086, .261082, .90735, -.0882138, .295095, .282123, .908087, -.095082, .295139, .303563, .908826, -.101488, .29492, .327028, .909832, -.107577, .294577, .351464, .911393, -.113033, .294115, .376497, .912804, -.118629, .293446, .402115, .914081, -.124232, .292581, .428111, .91637, -.129399, .29166, .454442, .91814, -.134892, .290422, .481024, .921179, -.140069, .289194, .507924, .924544, -.144431, .287421, .535557, .927995, -.147498, .284867, .563984, .931556, -.150197, .281722, .5923, .935777, -.152711, .278207, .620832, .940869, -.154836, .274148, .649069, .945994, -.155912, .269057, .677746, .949634, -.155641, .262799, .706293, .955032, -.154809, .256097, .734278, .95917, -.153678, .248618, .761751, .962931, -.151253, .239794, .789032, .966045, -.147625, .230281, .815422, .96971, -.143964, .220382, .841787, .972747, -.139464, .209846, .867446, .975545, -.133459, .198189, .892004, .978381, -.127424, .186362, .915458, .979935, -.120506, .173964, .937948, .980948, -.11282, .161429, .959732, .982234, -.104941, .148557, .980118, .982767, -.0962905, .135508, .999463, .983544, -.0873625, .122338, 1.01756, .984965, -.0783447, .108669, 1.03492, .986233, -.0684798, .0949911, 1.05087, .987796, -.0590867, .0811386, 1.0656, .989885, -.0489145, .0673099, 1.0794, .991821, -.0391, .0535665, 1.09174, .99448, -.029087, .0397529, 1.10341, .996769, -.019114, .0261463, 1.11383, .998641, -.00947007, .0128731, 1.1237, .999978, 446316e-9, -169093e-9, 1.13253, .888362, -627064e-11, .312578, 178215e-10, .889988, -157791e-9, .313148, 448451e-9, .889825, -631076e-9, .313092, .00179356, .88984, -.00141994, .313097, .00403554, .889828, -.0025243, .313092, .00717429, .889831, -.00394421, .313093, .0112099, .889831, -.00567962, .313093, .0161425, .889844, -.00773051, .313096, .0219724, .889858, -.0100968, .3131, .0286999, .889882, -.0127786, .313106, .0363256, .889918, -.0157757, .313116, .0448509, .889967, -.0190878, .313129, .0542758, .89003, -.022715, .313145, .0646032, .890108, -.0266566, .313165, .0758339, .890218, -.0309131, .313193, .0879729, .890351, -.0354819, .313226, .101019, .89051, -.0403613, .313263, .114979, .890672, -.0455385, .313294, .129848, .890882, -.0509444, .313333, .145616, .891189, -.0559657, .313324, .162122, .891457, -.0613123, .313281, .179524, .891856, -.0671488, .313281, .197855, .892312, -.0732732, .313268, .216991, .892819, -.0797865, .313263, .236924, .893369, -.0865269, .313247, .257433, .894045, -.0931592, .313205, .278215, .894884, -.100532, .313276, .299467, .895832, -.107716, .313205, .322276, .897043, -.114099, .312873, .34642, .898515, -.119941, .312331, .371187, .900191, -.126044, .311731, .396656, .90188, -.131808, .310859, .422488, .904359, -.137289, .309857, .448744, .906923, -.142991, .308714, .475239, .910634, -.148253, .307465, .501983, .914502, -.153332, .305774, .529254, .919046, -.156646, .303156, .557709, .923194, -.159612, .299928, .586267, .928858, -.162027, .296245, .614925, .934464, -.164203, .291832, .643187, .939824, -.165602, .286565, .671601, .944582, -.165383, .280073, .700213, .949257, -.164439, .272891, .728432, .954389, -.162953, .264771, .756082, .958595, -.161007, .255927, .78369, .962138, -.157243, .245769, .810769, .966979, -.152872, .235127, .836999, .969566, -.148209, .22347, .862684, .972372, -.142211, .211147, .887847, .975916, -.135458, .198606, .911843, .978026, -.128398, .185498, .934795, .979686, -.120313, .17171, .956787, .980748, -.11166, .158159, .978046, .981622, -.103035, .144399, .997693, .982356, -.0930328, .13001, 1.01642, .983308, -.0834627, .115778, 1.03366, .985037, -.0732249, .101327, 1.05014, .986493, -.0628145, .086554, 1.06507, .988484, -.0526556, .0720413, 1.07907, .991051, -.0415744, .0571151, 1.09189, .993523, -.0314275, .0426643, 1.10369, .99628, -.0203603, .0279325, 1.11423, .998344, -.0102446, .0138182, 1.12421, .999997, 42612e-8, -193628e-9, 1.1333, .871555, -660007e-11, .329176, 174749e-10, .875255, -166579e-9, .330571, 441051e-9, .875644, -666394e-9, .330718, .00176441, .875159, -.00149903, .330536, .00396899, .87516, -.00266493, .330536, .007056, .875158, -.00416393, .330535, .0110251, .87516, -.00599598, .330535, .0158764, .875163, -.00816108, .330536, .0216101, .875174, -.0106591, .330538, .0282266, .875199, -.0134899, .330545, .0357266, .875257, -.0166538, .330563, .0441117, .875304, -.0201501, .330575, .0533821, .875373, -.0239785, .330595, .0635395, .875464, -.0281389, .330619, .0745872, .875565, -.0326301, .330645, .0865255, .875691, -.0374516, .330676, .0993599, .875897, -.0425993, .330733, .113093, .876091, -.0480576, .330776, .127722, .876353, -.0537216, .330826, .143227, .876649, -.0589807, .330809, .159462, .877034, -.0647865, .330819, .176642, .877443, -.0709789, .330817, .194702, .877956, -.0774782, .330832, .213577, .878499, -.0843175, .330822, .233246, .879144, -.0912714, .330804, .253512, .879982, -.0980824, .330766, .274137, .88097, -.105823, .330864, .295209, .882051, -.113671, .330896, .317226, .883397, -.120303, .330545, .341068, .884987, -.12667, .330068, .365613, .886789, -.133118, .329418, .390807, .889311, -.139024, .328683, .416494, .891995, -.144971, .327729, .442618, .895106, -.150747, .326521, .469131, .899527, -.156283, .325229, .495921, .90504, -.161707, .32378, .523162, .909875, -.165661, .32122, .55092, .91561, -.168755, .317942, .579928, .921225, -.171193, .313983, .608539, .927308, -.17319, .309636, .636854, .933077, -.174819, .304262, .66523, .938766, -.175002, .297563, .693609, .943667, -.173946, .289613, .722157, .949033, -.172221, .281227, .750021, .953765, -.169869, .271545, .777466, .95804, -.166578, .261034, .804853, .962302, -.161761, .249434, .831569, .966544, -.156636, .237484, .857779, .969372, -.150784, .224395, .883051, .972486, -.143672, .210786, .907864, .975853, -.135772, .196556, .931223, .977975, -.127942, .182307, .954061, .979122, -.118347, .167607, .97531, .980719, -.109112, .152739, .995666, .981223, -.0991789, .137932, 1.01475, .98216, -.0883553, .122692, 1.03253, .983379, -.0780825, .107493, 1.04917, .985434, -.0665646, .0917791, 1.06464, .987332, -.0557714, .0764949, 1.07896, .990004, -.0442805, .060721, 1.09199, .992975, -.0331676, .0452284, 1.10393, .995811, -.0219547, .0297934, 1.11476, .9982, -.0107613, .0146415, 1.12484, 1.00002, 248678e-9, -14555e-8, 1.13413, .859519, -693595e-11, .347264, 171673e-10, .859843, -17503e-8, .347394, 433219e-9, .859656, -700076e-9, .347319, .00173277, .859671, -.00157517, .347325, .00389875, .859669, -.00280028, .347324, .00693112, .85967, -.0043754, .347324, .01083, .859665, -.00630049, .347321, .0155954, .859685, -.0085755, .347328, .0212278, .859694, -.0112003, .347329, .0277273, .859718, -.0141747, .347336, .0350946, .85976, -.0174988, .347348, .0433314, .85982, -.0211722, .347366, .0524384, .859892, -.0251941, .347387, .0624168, .860006, -.0295649, .347422, .0732708, .860122, -.0342825, .347453, .0849999, .860282, -.0393462, .347499, .0976102, .860482, -.0447513, .347554, .111104, .860719, -.0504775, .347614, .125479, .860998, -.0563577, .347666, .140703, .861322, -.0619473, .347662, .156681, .861724, -.0681277, .347684, .173597, .862198, -.0746567, .347709, .191371, .862733, -.0815234, .347727, .209976, .863371, -.0886643, .347744, .229351, .86414, -.0957908, .347734, .24934, .865138, -.102912, .34772, .269797, .866182, -.110924, .3478, .290654, .867436, -.119223, .347911, .312074, .869087, -.126197, .347649, .335438, .870859, -.133145, .347222, .359732, .872997, -.139869, .346645, .38467, .875939, -.146089, .345935, .41019, .879012, -.152334, .345012, .436218, .883353, -.15821, .343924, .462641, .888362, -.164097, .342636, .489449, .895026, -.169528, .341351, .516629, .900753, -.174408, .339115, .544109, .906814, -.17751, .335809, .572857, .912855, -.180101, .331597, .601554, .919438, -.182116, .32698, .630198, .925962, -.183494, .321449, .658404, .931734, -.184159, .314595, .686625, .93762, -.18304, .306462, .71531, .943858, -.181323, .297514, .744272, .948662, -.178683, .287447, .771462, .953299, -.175379, .276166, .798593, .957346, -.170395, .263758, .8256, .962565, -.165042, .251019, .852575, .966075, -.158655, .237011, .878316, .969048, -.151707, .222518, .90329, .972423, -.143271, .207848, .927745, .975833, -.134824, .192463, .950859, .977629, -.125444, .1768, .972947, .978995, -.114949, .161033, .993263, .980533, -.104936, .145523, 1.01337, .980745, -.0935577, .129799, 1.03128, .981814, -.0822956, .113486, 1.04825, .983943, -.0710082, .0972925, 1.06405, .986141, -.0587931, .0808138, 1.0785, .988878, -.0472755, .0644915, 1.09204, .992132, -.0349128, .0478128, 1.10413, .9953, -.0232407, .031621, 1.11527, .998117, -.0112713, .0154935, 1.12551, 1.00003, 339743e-9, -195763e-9, 1.13504, .845441, -729126e-11, .364305, 169208e-10, .843588, -183164e-9, .363506, 425067e-9, .843412, -73253e-8, .36343, .00169999, .843401, -.00164818, .363426, .00382495, .843399, -.00293008, .363425, .00679993, .843401, -.00457822, .363425, .010625, .843394, -.00659249, .363421, .0153002, .843398, -.00897282, .363421, .0208258, .843415, -.0117191, .363426, .0272024, .843438, -.0148312, .363432, .0344305, .843483, -.018309, .363447, .0425116, .84356, -.0221521, .363472, .0514471, .843646, -.0263597, .363499, .061238, .843743, -.0309315, .363527, .0718873, .84388, -.0358658, .363569, .0833969, .844079, -.0411624, .363631, .0957742, .844279, -.0468128, .363688, .109015, .844549, -.0527923, .363761, .123124, .844858, -.0588204, .363817, .138044, .84522, -.0647573, .36383, .153755, .845669, -.0713181, .363879, .170394, .846155, -.0781697, .363908, .187861, .846789, -.0853913, .363969, .206176, .847502, -.0928086, .363999, .225244, .8484, -.10005, .363997, .244926, .849461, -.107615, .364008, .265188, .850562, -.115814, .364055, .28587, .851962, -.124334, .364179, .306926, .854326, -.131995, .364233, .329605, .856295, -.139338, .363856, .35359, .858857, -.146346, .363347, .37831, .862428, -.152994, .362807, .403722, .866203, -.159463, .361963, .429537, .871629, -.165623, .36112, .456, .877365, -.171649, .359917, .482773, .883744, -.177151, .35848, .509705, .890693, -.182381, .356523, .537215, .897278, -.186076, .3533, .565493, .903958, -.188602, .349095, .594293, .910908, -.190755, .344215, .623165, .918117, -.192063, .338606, .651573, .924644, -.192758, .331544, .679869, .931054, -.192238, .323163, .708668, .937303, -.190035, .313529, .737201, .943387, -.187162, .303152, .764977, .948494, -.183876, .29146, .792683, .952546, -.178901, .277917, .819228, .958077, -.173173, .264753, .846559, .962462, -.16645, .25002, .872962, .966569, -.159452, .234873, .898729, .969108, -.15074, .218752, .923126, .973072, -.141523, .202673, .947278, .975452, -.132075, .186326, .969938, .977784, -.121257, .169396, .991325, .97899, -.110182, .153044, 1.01123, .979777, -.0989634, .136485, 1.0299, .980865, -.0865894, .119343, 1.04727, .982432, -.0746115, .102452, 1.06341, .984935, -.0621822, .0852423, 1.07834, .987776, -.0495694, .0678546, 1.092, .99103, -.0372386, .0506917, 1.1043, .99474, -.0244353, .0333316, 1.11576, .997768, -.0121448, .0164348, 1.12617, 1.00003, 31774e-8, -169504e-9, 1.13598, .825551, -756799e-11, .378425, 165099e-10, .82664, -190922e-9, .378923, 416504e-9, .826323, -763495e-9, .378779, .0016656, .826359, -.00171789, .378795, .00374768, .82636, -.00305402, .378795, .00666259, .826368, -.00477185, .378798, .0104104, .826364, -.00687131, .378795, .0149912, .826368, -.00935232, .378795, .0204054, .826376, -.0122146, .378797, .0266532, .826399, -.0154581, .378803, .0337355, .82646, -.0190825, .378824, .0416537, .826525, -.0230873, .378846, .0504091, .826614, -.0274719, .378876, .0600032, .82674, -.0322355, .378917, .0704393, .826888, -.0373766, .378964, .0817195, .827078, -.0428936, .379024, .0938492, .827318, -.0487778, .379099, .106828, .82764, -.0549935, .379199, .120659, .827926, -.0611058, .379227, .13526, .828325, -.0675054, .379275, .150713, .828801, -.0743455, .379332, .167034, .8294, -.0815523, .379415, .184209, .830094, -.0890779, .379495, .202203, .8309, -.096736, .379555, .220945, .831943, -.104135, .379577, .240306, .833037, -.112106, .379604, .260317, .834278, -.120554, .379668, .2808, .836192, -.129128, .3799, .301654, .838671, -.137541, .380109, .323502, .840939, -.14523, .379809, .347176, .844575, -.15248, .379593, .371706, .848379, -.159607, .37909, .39688, .853616, -.166267, .378617, .422702, .858921, -.172698, .377746, .448919, .865324, -.178823, .376749, .475661, .872207, -.184542, .375363, .502599, .880018, -.189836, .373657, .529914, .88694, -.194294, .370673, .557683, .894779, -.197022, .36662, .586848, .902242, -.199108, .36138, .615831, .909914, -.200398, .355434, .644478, .917088, -.20094, .348173, .672905, .923888, -.200671, .339482, .701327, .930495, -.198773, .32956, .730101, .937247, -.195394, .318363, .758383, .943108, -.191956, .306323, .786539, .948296, -.187227, .292576, .813637, .953472, -.181165, .278234, .840793, .958485, -.174119, .263054, .867712, .962714, -.166564, .246756, .893635, .966185, -.158181, .229945, .919028, .970146, -.148275, .212633, .943413, .973491, -.138157, .195229, .966627, .975741, -.127574, .178048, .988817, .977238, -.11554, .160312, 1.00924, .978411, -.10364, .142857, 1.02845, .979811, -.0913122, .125317, 1.04648, .98116, -.0782558, .107627, 1.06284, .983543, -.0655957, .0895862, 1.07798, .986789, -.0520411, .0713756, 1.092, .990292, -.0389727, .053228, 1.10484, .994187, -.025808, .0351945, 1.11642, .997499, -.0126071, .0173198, 1.12703, .999999, 275604e-9, -148602e-9, 1.13674, .81075, -78735e-10, .394456, 161829e-10, .808692, -198293e-9, .393453, 407564e-9, .80846, -792877e-9, .39334, .00162965, .808595, -.00178416, .393407, .00366711, .808597, -.00317182, .393408, .00651934, .808598, -.00495589, .393408, .0101866, .808591, -.00713627, .393403, .0146689, .808592, -.00971285, .393402, .0199667, .80861, -.0126855, .393407, .0260803, .808633, -.0160538, .393413, .0330107, .80868, -.0198175, .393429, .0407589, .808748, -.0239758, .393453, .0493264, .808854, -.0285286, .39349, .0587161, .808992, -.0334748, .39354, .0689304, .809141, -.0388116, .393588, .0799707, .809352, -.0445375, .39366, .0918432, .809608, -.0506427, .393742, .104549, .809915, -.0570708, .393834, .118085, .810253, -.0633526, .393885, .132377, .810687, -.0700966, .393953, .147537, .811233, -.0772274, .394047, .163543, .811865, -.0847629, .394148, .180394, .812648, -.0925663, .394265, .198051, .813583, -.100416, .394363, .216443, .814683, -.108119, .394402, .235502, .815948, -.11644, .394489, .255242, .817278, -.125036, .394542, .275441, .819605, -.133655, .39486, .296094, .822256, -.142682, .395248, .317309, .825349, -.150756, .395241, .340516, .829605, -.158392, .395285, .364819, .83391, -.165801, .394922, .389736, .839808, -.172677, .394691, .415409, .845708, -.179448, .394006, .441546, .853025, -.185746, .393279, .46832, .859666, -.191684, .391655, .495302, .86789, -.197146, .390068, .52262, .875845, -.201904, .38727, .550336, .882634, -.205023, .382688, .578825, .891076, -.207098, .377543, .608103, .900589, -.208474, .371752, .63723, .90791, -.209068, .364016, .665769, .915971, -.208655, .355593, .694428, .923455, -.20729, .345439, .723224, .931514, -.203821, .334099, .751925, .937885, -.19986, .321069, .780249, .943136, -.194993, .306571, .8077, .948818, -.189132, .291556, .83497, .954433, -.181617, .275745, .86188, .959078, -.173595, .258695, .888562, .962705, -.164855, .240825, .914008, .966753, -.155129, .22268, .939145, .970704, -.144241, .204542, .963393, .973367, -.133188, .185927, .985983, .975984, -.121146, .167743, 1.00704, .976994, -.108366, .149218, 1.02715, .978485, -.0956746, .13131, 1.0455, .980074, -.0820733, .112513, 1.06221, .98225, -.0684061, .0938323, 1.07782, .98553, -.0549503, .0749508, 1.09199, .989529, -.0407857, .055848, 1.10508, .993536, -.0271978, .0368581, 1.11684, .997247, -.0132716, .0181845, 1.12789, 1, 431817e-9, -198809e-9, 1.13792, .785886, -812608e-11, .405036, 157669e-10, .790388, -205278e-9, .407355, 398297e-9, .790145, -820824e-9, .407231, .00159263, .790135, -.00184681, .407226, .00358336, .790119, -.00328316, .407218, .00637039, .790126, -.00512988, .40722, .0099539, .79013, -.00738684, .407221, .0143339, .790135, -.0100538, .407221, .0195107, .790134, -.0131306, .407217, .0254848, .79016, -.0166169, .407224, .0322572, .790197, -.020512, .407236, .0398284, .790273, -.0248157, .407263, .0482014, .790381, -.029527, .407304, .0573777, .790521, -.0346446, .407355, .0673602, .790704, -.0401665, .40742, .0781522, .790925, -.0460896, .407499, .0897582, .791195, -.0524017, .407589, .10218, .791522, -.0590121, .407691, .11541, .791878, -.0654876, .407748, .12939, .792361, -.0725207, .407849, .144237, .792942, -.0799844, .407963, .159924, .79362, -.0877896, .408087, .176425, .794529, -.0958451, .408259, .193733, .795521, -.103827, .408362, .211756, .796778, -.111937, .408482, .230524, .798027, -.120521, .408547, .249967, .799813, -.129242, .408721, .269926, .802387, -.138048, .409148, .290338, .805279, -.147301, .409641, .311193, .809251, -.155895, .410154, .333611, .813733, -.163942, .410297, .357615, .819081, -.171666, .410373, .382339, .825427, -.178905, .410348, .407828, .83172, -.185812, .409486, .434034, .83877, -.192318, .408776, .460493, .845817, -.198249, .407176, .487346, .854664, -.204034, .405719, .514832, .863495, -.208908, .403282, .542401, .871883, -.212765, .399293, .570683, .88065, -.214911, .393803, .599947, .89004, -.216214, .387536, .62932, .898476, -.216745, .379846, .658319, .906738, -.216387, .370625, .687138, .914844, -.215053, .360139, .71601, .923877, -.212007, .348849, .745124, .931925, -.207481, .335639, .773366, .938054, -.202418, .320798, .801636, .943895, -.196507, .304772, .829055, .949468, -.189009, .288033, .856097, .955152, -.180539, .270532, .88301, .959403, -.171437, .251639, .909296, .963309, -.161661, .232563, .934868, .967399, -.150425, .213231, .959662, .972009, -.138659, .194247, .98302, .97433, -.126595, .174718, 1.00517, .975823, -.113205, .155518, 1.02566, .976371, -.0996096, .136709, 1.04418, .978705, -.0860754, .117571, 1.06146, .981477, -.0714438, .0980046, 1.07777, .984263, -.0572304, .0782181, 1.09214, .988423, -.0428875, .0584052, 1.10553, .993, -.0282442, .038522, 1.11758, .99704, -.0140183, .0190148, 1.12864, .999913, 369494e-9, -145203e-9, 1.13901, .777662, -84153e-10, .423844, 154403e-10, .770458, -211714e-9, .419915, 38845e-8, .770716, -846888e-9, .420055, .00155386, .770982, -.00190567, .420202, .00349653, .770981, -.00338782, .420201, .00621606, .77098, -.00529338, .4202, .00971274, .770983, -.00762223, .4202, .0139867, .770985, -.0103741, .420198, .0190381, .770996, -.0135489, .4202, .0248677, .771029, -.0171461, .420212, .0314764, .771052, -.0211647, .420215, .0388648, .771131, -.0256048, .420245, .047036, .771235, -.0304647, .420284, .0559911, .771383, -.0357436, .420341, .0657346, .771591, -.0414392, .420423, .0762694, .771819, -.0475462, .420506, .0875984, .772123, -.0540506, .420617, .099727, .772464, -.060797, .42072, .112637, .772855, -.0675393, .420799, .126313, .773317, -.0748323, .420893, .140824, .773981, -.0825681, .421058, .15617, .774746, -.0906307, .421226, .172322, .77566, -.0988982, .421397, .189253, .776837, -.106994, .421569, .206912, .778097, -.115528, .421704, .225359, .779588, -.124317, .421849, .24447, .781574, -.133139, .422097, .264156, .784451, -.142179, .422615, .284318, .787682, -.15165, .423269, .304902, .792433, -.160771, .424396, .3265, .797359, -.169166, .424772, .35014, .803986, -.177149, .425475, .374768, .809504, -.184745, .424996, .399928, .815885, -.19173, .424247, .425796, .823513, -.198525, .423515, .452287, .832549, -.204709, .422787, .479321, .841653, -.210447, .421187, .506718, .850401, -.215501, .418519, .53432, .859854, -.219752, .414715, .56242, .869364, -.222305, .409462, .591558, .878837, -.223744, .402926, .621074, .888636, -.224065, .395043, .650538, .898132, -.223742, .38564, .679538, .907181, -.222308, .375378, .708674, .915621, -.219837, .363212, .737714, .9239, -.215233, .349313, .767014, .931644, -.209592, .334162, .795133, .938887, -.203644, .317943, .823228, .945282, -.196349, .300581, .850822, .950758, -.18742, .282195, .877594, .956146, -.177879, .262481, .904564, .960355, -.167643, .242487, .930741, .965256, -.156671, .222668, .955868, .968029, -.144123, .201907, .979869, .97251, -.131305, .18202, 1.00291, .974925, -.118335, .161909, 1.02392, .975402, -.103714, .142129, 1.0433, .976987, -.089415, .122447, 1.06089, .979677, -.0748858, .102248, 1.07713, .983184, -.0596086, .0814851, 1.09218, .987466, -.0447671, .0609484, 1.10585, .992348, -.0295217, .0401835, 1.11829, .996674, -.0143917, .0198163, 1.12966, 1.00003, 321364e-9, -149983e-9, 1.1402, .757901, -869074e-11, .436176, 151011e-10, .751195, -217848e-9, .432317, 378533e-9, .751178, -871373e-9, .432307, .0015141, .751195, -.00196061, .432317, .0034068, .751198, -.00348552, .432318, .00605659, .751195, -.00544599, .432315, .00946353, .751207, -.00784203, .43232, .013628, .751213, -.0106732, .43232, .0185499, .751221, -.0139393, .432319, .0242302, .751244, -.0176398, .432325, .0306694, .7513, -.0217743, .432348, .0378698, .751358, -.0263412, .432367, .0458321, .751458, -.0313396, .432404, .0545587, .751608, -.0367682, .432464, .0640543, .7518, -.0426246, .43254, .0743222, .752065, -.0489031, .432645, .0853668, .752376, -.0555828, .432762, .0971911, .752715, -.0623861, .432859, .109768, .753137, -.069415, .432958, .123126, .753676, -.0770039, .433099, .137308, .754345, -.084971, .433272, .15229, .755235, -.0932681, .433504, .168075, .756186, -.10171, .433693, .184625, .757363, -.110019, .433857, .201897, .75884, -.11887, .434102, .220014, .760467, -.127881, .434306, .238778, .762969, -.136766, .434751, .258172, .765823, -.14612, .43529, .278062, .769676, -.15566, .436236, .298437, .774909, -.165177, .437754, .319532, .77994, -.17402, .438343, .342505, .785757, -.182201, .438609, .366693, .792487, -.190104, .438762, .391668, .80038, -.197438, .438795, .417494, .808494, -.204365, .438226, .443933, .817695, -.210714, .437283, .470929, .828111, -.216651, .436087, .498569, .837901, -.221804, .433717, .526165, .847813, -.226318, .430133, .554155, .858314, -.229297, .425213, .582822, .868891, -.230999, .418576, .612847, .878941, -.231155, .410405, .642445, .888809, -.230935, .400544, .672024, .898089, -.229343, .389613, .701366, .908081, -.226886, .377197, .730763, .916819, -.222676, .363397, .759642, .924968, -.216835, .347437, .788775, .932906, -.210245, .32995, .817135, .940025, -.202992, .312262, .844912, .946101, -.19436, .293313, .872164, .952835, -.184125, .273638, .899443, .957347, -.173657, .252385, .926389, .961434, -.162204, .231038, .951947, .965522, -.14979, .209834, .976751, .969412, -.136307, .188821, 1.00022, .973902, -.122527, .168013, 1.02229, .974045, -.108213, .147634, 1.04199, .975775, -.0927397, .12705, 1.06019, .978383, -.0778212, .106309, 1.07711, .98211, -.0621216, .0849279, 1.09245, .986517, -.0463847, .0633519, 1.10651, .991696, -.0309353, .0419698, 1.11903, .996349, -.0150914, .0206272, 1.13073, 1.00003, 442449e-9, -231396e-9, 1.14146, .727498, -885074e-11, .441528, 145832e-10, .730897, -223525e-9, .443589, 368298e-9, .730796, -893996e-9, .443528, .00147303, .730805, -.00201149, .443533, .00331433, .730814, -.00357596, .443538, .00589222, .730815, -.00558734, .443538, .00920678, .730822, -.00804544, .44354, .0132582, .730836, -.0109501, .443545, .0180468, .730848, -.0143008, .443546, .0235732, .730871, -.0180969, .443552, .0298382, .730915, -.022338, .443567, .0368438, .730982, -.0270225, .443591, .044591, .731076, -.0321491, .443627, .0530831, .731245, -.0377166, .443699, .0623243, .73144, -.0437216, .443777, .0723181, .7317, -.0501576, .443881, .0830691, .732034, -.0569942, .444014, .0945809, .732388, -.0638756, .444113, .106825, .732853, -.071203, .444247, .119859, .733473, -.0790076, .444442, .13369, .734195, -.0871937, .444645, .148304, .735069, -.095696, .444877, .163702, .736169, -.10426, .445133, .179861, .73747, -.112853, .44537, .196778, .738991, -.12199, .445651, .214496, .740865, -.131153, .445958, .232913, .743637, -.140245, .446548, .251977, .746797, -.149722, .447246, .271551, .751517, -.159341, .448656, .291774, .756156, -.169106, .449866, .312455, .761519, -.178436, .450919, .334552, .768295, -.186904, .451776, .358491, .776613, -.195117, .452832, .383446, .783966, -.202695, .45249, .408945, .793542, -.20985, .452587, .435364, .803192, -.216403, .451852, .462336, .813892, -.22251, .450708, .48987, .824968, -.227676, .4486, .517697, .835859, -.232443, .445156, .545975, .846825, -.235775, .440351, .574483, .858085, -.237897, .433641, .604246, .868825, -.238074, .425354, .634101, .879638, -.237661, .415383, .664201, .889966, -.236186, .404136, .693918, .899479, -.233599, .390917, .723481, .908769, -.229737, .376352, .75258, .917966, -.223836, .360372, .781764, .926304, -.217067, .342551, .811139, .934626, -.209309, .324238, .839585, .941841, -.20071, .304484, .867044, .94789, -.190602, .283607, .894579, .954196, -.179253, .262205, .921743, .958383, -.167646, .239847, .948026, .963119, -.155073, .218078, .973296, .966941, -.141426, .195899, .998135, .970836, -.126849, .174121, 1.02021, .973301, -.112296, .153052, 1.04085, .97448, -.0964965, .131733, 1.05946, .977045, -.080489, .10997, 1.07693, .980751, -.064844, .0881657, 1.09254, .985475, -.0481938, .0657987, 1.10697, .991089, -.0319185, .0435215, 1.12004, .996122, -.0158088, .0214779, 1.13173, 1.00001, 372455e-9, -200295e-9, 1.14291, .708622, -907597e-11, .45304, 141962e-10, .711162, -228911e-9, .454662, 358052e-9, .709812, -914446e-9, .453797, .00143034, .709865, -.00205819, .453834, .00321935, .709864, -.00365894, .453833, .00572331, .709855, -.00571692, .453826, .00894278, .709862, -.00823201, .453828, .012878, .709875, -.011204, .453832, .0175295, .709896, -.0146323, .453839, .0228978, .709925, -.0185163, .453847, .0289839, .709974, -.0228551, .453866, .0357894, .710045, -.0276473, .453892, .0433161, .710133, -.032891, .453924, .0515665, .710292, -.0385851, .453992, .0605458, .710485, -.0447254, .45407, .0702574, .710769, -.0513051, .454192, .0807077, .711106, -.0582733, .454329, .091896, .711516, -.0652866, .45446, .103814, .712071, -.0728426, .454653, .116508, .712676, -.0808307, .45484, .129968, .713476, -.0892216, .455096, .144206, .714377, -.0979047, .455346, .159212, .715579, -.106531, .455647, .174973, .716977, -.115492, .455961, .191504, .71862, -.124821, .456315, .208835, .72084, -.134079, .4568, .226869, .723786, -.143427, .457521, .245582, .727464, -.153061, .458475, .264957, .732771, -.162768, .460239, .284948, .736515, -.172627, .460899, .30522, .743519, -.182487, .463225, .326717, .750041, -.191295, .464027, .350113, .758589, -.199746, .465227, .374782, .767703, -.207584, .465877, .400226, .777484, -.214973, .465996, .426442, .788792, -.221796, .466019, .453688, .800194, -.228038, .465083, .481246, .811234, -.233346, .462506, .509086, .822859, -.238073, .459257, .537338, .835082, -.241764, .454863, .566108, .846332, -.244241, .448163, .595126, .858355, -.244736, .439709, .625574, .87034, -.244278, .429837, .65617, .881027, -.24255, .418002, .686029, .891007, -.239912, .404325, .716039, .900874, -.236133, .389222, .745518, .911072, -.230672, .373269, .775026, .920359, -.22356, .355083, .804521, .928604, -.215591, .335533, .834045, .937175, -.206503, .315278, .861612, .942825, -.196684, .293653, .889131, .949805, -.185116, .271503, .916853, .955535, -.172703, .248821, .943541, .959843, -.159978, .225591, .970132, .964393, -.146375, .202719, .994709, .968008, -.131269, .179928, 1.0186, .971013, -.11569, .158007, 1.03928, .973334, -.1003, .13624, 1.05887, .975775, -.0833352, .1138, 1.07652, .979579, -.0668981, .0913141, 1.09297, .984323, -.0500902, .0683051, 1.10734, .990351, -.0332377, .0451771, 1.12084, .995823, -.0161491, .0221705, 1.13296, 1.0001, 234083e-9, -108712e-9, 1.14441, .683895, -924677e-11, .46015, 137429e-10, .68833, -233383e-9, .463134, 346865e-9, .688368, -933547e-9, .463159, .00138748, .688367, -.00210049, .463159, .00312187, .688369, -.00373415, .463159, .00555004, .688377, -.00583449, .463163, .00867216, .688386, -.00840128, .463166, .0124884, .688398, -.0114343, .463169, .0169993, .688418, -.0149329, .463175, .0222054, .688453, -.0188964, .463188, .028108, .688515, -.0233239, .463214, .0347085, .68857, -.0282136, .463231, .0420091, .688679, -.033564, .463276, .0500132, .688854, -.0393733, .463356, .0587255, .689038, -.0456354, .46343, .0681476, .689321, -.0523433, .463553, .0782897, .689662, -.059412, .463693, .0891501, .690188, -.0665736, .4639, .100735, .690755, -.0743106, .464107, .113074, .691405, -.0824722, .464329, .126161, .692198, -.0910484, .464585, .140007, .693196, -.0998778, .464893, .154612, .69454, -.108651, .465285, .169984, .695921, -.117855, .465596, .186106, .697749, -.12734, .466056, .203034, .700375, -.136714, .466771, .220703, .703395, -.146386, .467579, .239062, .707904, -.156096, .469067, .258188, .711673, -.165904, .469851, .277759, .717489, -.175812, .471815, .297935, .724051, -.185931, .47389, .318916, .731965, -.195238, .47587, .341591, .741151, -.204021, .477523, .366062, .751416, -.212113, .478881, .391396, .761848, -.21979, .479226, .417599, .771886, -.2267, .478495, .444401, .783998, -.232991, .477622, .472084, .796523, -.238645, .475833, .500193, .808851, -.243396, .472568, .52865, .821191, -.247226, .467857, .557362, .834261, -.250102, .461871, .586768, .846762, -.251056, .453543, .617085, .859867, -.250604, .443494, .647659, .871948, -.248783, .431711, .678119, .882967, -.245855, .417911, .708399, .892826, -.242168, .401993, .738256, .90332, -.237062, .385371, .767999, .913633, -.22997, .366837, .798191, .922774, -.221687, .346372, .827756, .931371, -.212345, .325682, .856425, .938929, -.20206, .303665, .884299, .944821, -.190981, .280786, .912023, .951792, -.178065, .2573, .939669, .957712, -.164634, .233448, .96655, .961912, -.150863, .209504, .992366, .966382, -.13577, .18597, 1.01633, .969588, -.119593, .162905, 1.03843, .971777, -.103203, .14053, 1.05841, .97433, -.0865888, .117909, 1.07632, .978686, -.0690829, .0944101, 1.09326, .983281, -.0516568, .0705671, 1.10796, .989562, -.034558, .0468592, 1.12182, .995465, -.0167808, .0229846, 1.1342, .999991, 373016e-9, -235606e-9, 1.1459, .662251, -939016e-11, .468575, 132714e-10, .666634, -237624e-9, .471675, 335842e-9, .666411, -950385e-9, .471516, .00134321, .666399, -.00213833, .471509, .00302221, .666386, -.0038014, .471499, .00537283, .666405, -.00593958, .471511, .00839533, .666406, -.00855253, .471508, .0120898, .666428, -.0116401, .471519, .0164569, .666444, -.0152015, .471522, .0214971, .66649, -.0192362, .471543, .027212, .666537, -.0237428, .471558, .033603, .666617, -.0287198, .471591, .0406728, .666718, -.0341647, .471631, .0484238, .666889, -.0400759, .47171, .0568621, .667104, -.0464479, .471805, .0659915, .667374, -.0532677, .471923, .0758178, .667772, -.0603805, .472098, .0863425, .668371, -.0677392, .472363, .0975917, .668971, -.0756028, .472596, .109567, .669696, -.0839293, .472869, .122272, .670481, -.0926683, .473126, .135718, .6715, -.1016, .473442, .149914, .672911, -.110566, .47389, .164882, .674512, -.119984, .474354, .180602, .67651, -.129574, .474922, .19711, .679292, -.139106, .475764, .214371, .682798, -.148993, .476886, .232405, .686955, -.158737, .478179, .251153, .691406, -.168754, .479432, .270436, .697438, -.178703, .481481, .290374, .704761, -.188955, .484143, .311044, .713599, -.198814, .487007, .333003, .723194, -.207869, .488962, .357144, .732601, -.216189, .489815, .382169, .744193, -.22398, .490888, .408227, .754907, -.231156, .490355, .434928, .767403, -.23747, .489548, .462599, .78107, -.243503, .488274, .490908, .793893, -.248114, .484843, .519421, .807296, -.25222, .4803, .548561, .820529, -.255265, .474097, .577772, .833716, -.256741, .466041, .607782, .848403, -.25637, .456547, .638807, .860755, -.254804, .443946, .670058, .874012, -.251834, .430852, .700749, .885619, -.247867, .414903, .731446, .896069, -.242634, .397276, .761191, .906266, -.236093, .378535, .791053, .916759, -.227543, .358038, .821298, .92523, -.21783, .335705, .850747, .93436, -.207534, .313797, .879258, .941631, -.195983, .289671, .907734, .947564, -.183567, .265319, .935206, .953681, -.169345, .240815, .962739, .960008, -.154909, .216119, .989227, .964145, -.140161, .192096, 1.01465, .968171, -.123411, .167855, 1.03737, .969859, -.106525, .144817, 1.05767, .972666, -.0891023, .12149, 1.0761, .977055, -.0718094, .0975306, 1.09336, .982527, -.0534213, .0730217, 1.10878, .989001, -.0355579, .0483366, 1.12285, .99512, -.0176383, .023938, 1.13548, 1.00007, 368831e-9, -211581e-9, 1.14744, .651047, -960845e-11, .484101, 12922e-9, .644145, -241347e-9, .478968, 324578e-9, .64396, -965142e-9, .478831, .00129798, .64396, -.00217154, .47883, .00292046, .643968, -.00386049, .478835, .00519202, .643974, -.00603186, .478838, .0081128, .643977, -.0086854, .478836, .011683, .643982, -.0118207, .478834, .0159031, .644024, -.0154374, .478856, .0207743, .644059, -.0195343, .478868, .0262975, .644122, -.0241103, .478896, .0324747, .644207, -.0291638, .478933, .039309, .64432, -.0346919, .478981, .0468029, .644481, -.0406919, .479053, .0549614, .644722, -.047159, .479169, .0637909, .645013, -.0540748, .479302, .0732974, .645503, -.0612001, .479541, .0834898, .646117, -.0687303, .479829, .0943873, .646707, -.0767846, .480061, .105991, .647431, -.0852465, .480343, .11831, .64831, -.0940719, .48066, .131348, .649486, -.103056, .481083, .14514, .650864, -.112261, .481528, .159676, .652604, -.121852, .482102, .174979, .654825, -.131505, .482813, .191079, .657876, -.141189, .483876, .207927, .661339, -.151239, .48499, .225586, .665463, -.161091, .486279, .243947, .670542, -.171235, .487968, .262957, .677361, -.181347, .49053, .282781, .685672, -.191679, .493862, .303311, .694551, -.201781, .49699, .324607, .703753, -.211164, .498884, .347916, .713703, -.219675, .500086, .372628, .725911, -.227836, .501554, .398694, .73862, -.23533, .502193, .425529, .752118, -.241786, .501811, .453209, .76579, -.247865, .500185, .481381, .779568, -.252696, .497159, .51011, .793991, -.256802, .492765, .539322, .808182, -.259942, .486827, .569078, .821698, -.261703, .478386, .598818, .836009, -.262006, .468772, .629762, .849824, -.260333, .456352, .661366, .863888, -.257398, .442533, .69295, .876585, -.253264, .426573, .723608, .888665, -.248026, .408964, .754378, .899537, -.241487, .389677, .784761, .9094, -.233463, .368516, .814688, .920166, -.223397, .346624, .845009, .928899, -.21255, .322717, .874431, .937156, -.200869, .298698, .902922, .943861, -.188387, .273491, .931356, .949557, -.174341, .247866, .958854, .955862, -.158994, .222496, .986098, .961721, -.143664, .197522, 1.01229, .965976, -.127412, .17302, 1.03571, .968652, -.109798, .148954, 1.05699, .971084, -.0916787, .125044, 1.07587, .975584, -.0739634, .100577, 1.09372, .98122, -.055322, .0753666, 1.10948, .988253, -.0366825, .0498899, 1.12394, .99482, -.0180389, .024611, 1.13694, 1.00001, 229839e-9, -188283e-9, 1.14919, .613867, -964198e-11, .479449, 123452e-10, .621485, -244534e-9, .485399, 313091e-9, .621429, -978202e-9, .485353, .00125245, .62112, -.00220004, .485114, .00281687, .621119, -.0039111, .485112, .00500783, .621122, -.00611091, .485112, .00782498, .621133, -.00879922, .485117, .0112687, .621152, -.0119756, .485125, .0153394, .621183, -.0156396, .485139, .0200382, .621227, -.0197898, .485158, .0253663, .621298, -.0244253, .485192, .0313261, .621388, -.0295441, .485233, .0379204, .621507, -.0351432, .485286, .0451523, .621693, -.0412198, .485378, .0530277, .621933, -.0477673, .485495, .0615522, .622232, -.0547574, .485635, .0707316, .622809, -.0619417, .485943, .0805883, .623407, -.069625, .486232, .0911267, .62406, -.077796, .486516, .102354, .624835, -.0863731, .486838, .114279, .625758, -.095251, .487188, .126902, .627043, -.104299, .487695, .140285, .628438, -.113724, .488163, .154397, .630325, -.123417, .488858, .169267, .632801, -.133137, .489754, .184941, .635784, -.143052, .490815, .20136, .639406, -.153132, .492048, .218643, .643872, -.163143, .49363, .236615, .6499, -.17333, .496009, .255449, .657201, -.183622, .498994, .275006, .666221, -.194019, .502888, .295354, .674419, -.204192, .505459, .316244, .683729, -.21406, .507771, .33849, .695584, -.222854, .510245, .363166, .708583, -.231315, .512293, .389071, .721233, -.238911, .512747, .415737, .735134, -.245657, .512482, .443331, .750179, -.251879, .511526, .471891, .765073, -.256911, .508935, .500892, .779794, -.261144, .504341, .530294, .794801, -.264316, .498515, .560144, .810339, -.266276, .491015, .590213, .824818, -.266981, .481126, .620865, .839375, -.265778, .468685, .652687, .853043, -.262748, .453925, .684759, .867335, -.258474, .437912, .716209, .88037, -.253187, .419648, .747508, .891711, -.246476, .39982, .77797, .902896, -.238735, .37879, .808586, .913601, -.22885, .355891, .838843, .923019, -.217656, .331773, .869014, .933432, -.205539, .307356, .898512, .939691, -.192595, .281321, .9269, .946938, -.178945, .255441, .955297, .952372, -.163587, .229013, .983231, .95909, -.147214, .203179, 1.00971, .963675, -.13064, .17792, 1.03438, .968247, -.113121, .152898, 1.05625, .97001, -.0945824, .128712, 1.07598, .974458, -.0755648, .103349, 1.094, .980168, -.0571998, .0776731, 1.1104, .987295, -.0377994, .0514445, 1.12491, .994432, -.0186417, .025429, 1.13851, .999975, 542714e-9, -282356e-9, 1.15108, .592656, -980249e-11, .486018, 119532e-10, .598467, -247275e-9, .490781, 301531e-9, .597934, -988317e-9, .490343, .00120517, .597903, -.00222366, .490319, .0027116, .597913, -.00395315, .490327, .00482077, .597919, -.00617653, .490329, .00753264, .597936, -.00889375, .490339, .0108478, .597956, -.0121043, .490347, .0147668, .597992, -.0158073, .490365, .0192905, .598032, -.0200017, .490382, .0244204, .598109, -.0246865, .49042, .0301593, .598215, -.0298594, .490474, .03651, .59833, -.0355167, .490524, .0434757, .598525, -.0416559, .490624, .0510629, .598778, -.0482692, .490753, .0592781, .599135, -.0553114, .49094, .0681304, .599802, -.062542, .491328, .0776467, .600361, -.0703638, .491598, .0878184, .60101, -.0786256, .491882, .0986573, .601811, -.0872962, .492232, .11018, .602861, -.0962284, .492684, .1224, .604167, -.10538, .493213, .135354, .605693, -.114896, .493799, .149034, .607682, -.124654, .494576, .163469, .610672, -.13456, .4959, .178747, .613313, -.144581, .496713, .194723, .617603, -.154703, .498499, .211617, .622174, -.16489, .500188, .229183, .628855, -.175164, .503072, .247786, .636963, -.185565, .506798, .267116, .644866, -.195911, .509719, .28702, .653741, -.206104, .512776, .307763, .664942, -.216447, .516812, .329631, .67633, -.22552, .519181, .353515, .690012, -.234316, .521681, .379226, .704243, -.242032, .523129, .405901, .719396, -.249172, .523768, .433585, .734471, -.255543, .522541, .462085, .750539, -.260697, .520217, .491233, .766365, -.26501, .516293, .521094, .781677, -.268409, .509708, .551014, .797132, -.270399, .501944, .581463, .812655, -.271247, .492025, .612402, .828592, -.270708, .480424, .643798, .844044, -.268085, .465955, .67682, .857305, -.263459, .448425, .708496, .87114, -.258151, .430243, .74046, .884936, -.251171, .410578, .771583, .895772, -.243305, .38862, .802234, .906961, -.234037, .365214, .833179, .917775, -.222714, .34116, .86353, .927883, -.210175, .31572, .893557, .936617, -.196925, .289159, .922976, .943384, -.182788, .261996, .951606, .949713, -.167965, .235324, .979958, .955818, -.151109, .208408, 1.00765, .961344, -.133834, .182591, 1.03329, .965469, -.115987, .156958, 1.0557, .968693, -.09746, .132239, 1.07583, .973165, -.0778514, .106195, 1.09451, .979387, -.0585067, .0797669, 1.11137, .98671, -.0390409, .0530263, 1.12643, .994093, -.019408, .0263163, 1.14016, 1.00002, 540029e-9, -194487e-9, 1.15299, .574483, -989066e-11, .494533, 114896e-10, .574478, -249127e-9, .494528, 289403e-9, .574607, -996811e-9, .494637, .00115797, .574396, -.00224241, .494458, .00260498, .574377, -.00398632, .49444, .00463102, .574386, -.00622836, .494445, .00723623, .574401, -.0089683, .494453, .010421, .574419, -.0122056, .49446, .0141859, .574459, -.0159396, .494481, .0185322, .574525, -.0201692, .49452, .0234617, .574587, -.0248924, .494547, .0289762, .574697, -.0301074, .494604, .0350797, .574853, -.0358114, .494688, .0417767, .575027, -.041999, .494772, .0490718, .575294, -.0486618, .494915, .0569728, .575733, -.0557148, .495173, .0654955, .576356, -.0630489, .495537, .0746612, .576944, -.0709285, .495836, .0844615, .57765, -.0792723, .496177, .0949142, .578491, -.0880167, .496563, .10603, .579639, -.0969462, .497096, .117841, .580989, -.10622, .497684, .130367, .582587, -.115861, .498337, .143609, .584951, -.125605, .499414, .157625, .587602, -.135608, .500518, .172413, .59076, -.145742, .501767, .187999, .594992, -.155934, .503542, .20445, .600656, -.166303, .506135, .221764, .607816, -.176681, .509542, .24002, .61522, -.187071, .51263, .258992, .623702, -.197465, .516021, .278773, .634192, -.207816, .520422, .299377, .644936, -.218183, .524073, .320802, .657888, -.2278, .528049, .34384, .670666, -.236747, .52986, .36916, .685626, -.24484, .531892, .395867, .701304, -.252071, .532727, .423488, .717727, -.258714, .532146, .452201, .733914, -.264211, .529883, .481579, .750529, -.26859, .5259, .511558, .76747, -.272046, .51999, .542042, .785189, -.274225, .513083, .572799, .800954, -.275189, .502936, .603816, .816962, -.274946, .490921, .635461, .83336, -.272695, .47684, .6676, .848143, -.268223, .459405, .70051, .861818, -.262768, .440319, .732902, .876828, -.255872, .420123, .765084, .889312, -.247703, .398379, .796391, .900412, -.238381, .374496, .827333, .912251, -.227783, .349874, .858385, .921792, -.214832, .323181, .888652, .931273, -.200949, .296624, .917763, .940295, -.186537, .269211, .947878, .946812, -.171538, .241447, .977016, .953588, -.155254, .213829, 1.00501, .958841, -.137156, .186807, 1.03179, .963746, -.118699, .160706, 1.05502, .966468, -.0998358, .135504, 1.07568, .971178, -.0805186, .109131, 1.09479, .97831, -.0599348, .0818293, 1.1123, .985886, -.0399661, .0545872, 1.12771, .994021, -.0198682, .0269405, 1.14186, 1.00009, 271022e-9, -12989e-8, 1.15514, .538716, -990918e-11, .486732, 109675e-10, .550656, -250642e-9, .497518, 277412e-9, .55057, -.00100265, .497441, .00110974, .550903, -.00225672, .497733, .00249779, .550568, -.00401046, .497438, .00443906, .550574, -.00626613, .49744, .00693637, .550591, -.0090226, .497449, .00998921, .550623, -.0122795, .497469, .0135984, .550667, -.0160361, .497495, .0177654, .550724, -.0202908, .497526, .0224915, .550792, -.0250421, .497557, .0277795, .550918, -.0302878, .49763, .0336334, .551058, -.0360241, .497701, .0400573, .551276, -.0422473, .497824, .0470585, .551551, -.0489441, .497977, .0546433, .552074, -.0559596, .498312, .0628367, .552681, -.0633978, .498679, .071646, .553324, -.0713176, .499031, .0810746, .554011, -.0797268, .499365, .091129, .55488, -.0885238, .499779, .101837, .556171, -.0974417, .500444, .113239, .557498, -.106841, .501025, .125316, .559299, -.116533, .501864, .138128, .561647, -.126298, .502967, .151695, .564347, -.136388, .504129, .16604, .567863, -.146576, .505713, .181207, .572569, -.156832, .507953, .197259, .578919, -.167323, .511186, .214258, .585387, -.177712, .514042, .232038, .593134, -.188184, .517484, .250733, .603295, -.198717, .522345, .270454, .613854, -.209177, .526751, .290807, .626092, -.219644, .531595, .312202, .637868, -.229494, .534721, .334435, .652458, -.238718, .538304, .359184, .666985, -.247061, .539875, .385637, .683301, -.254652, .541042, .41328, .69998, -.261376, .540735, .441903, .717824, -.267085, .539139, .471609, .734617, -.271465, .534958, .501446, .753663, -.27528, .53032, .532571, .770512, -.277617, .522134, .563641, .787356, -.278525, .51206, .595067, .806252, -.278512, .50119, .627226, .822061, -.277023, .486791, .659402, .838959, -.273175, .470467, .692874, .85379, -.267238, .450688, .725702, .868268, -.260327, .429741, .75832, .881994, -.251946, .407223, .790189, .893885, -.242432, .383214, .821625, .905118, -.231904, .357297, .853011, .916045, -.219545, .330733, .883773, .927614, -.205378, .303916, .914435, .936005, -.190388, .275941, .944502, .944533, -.1749, .247493, .974439, .950758, -.158588, .218996, 1.00286, .957078, -.141027, .191559, 1.0304, .962448, -.121507, .164457, 1.05466, .964993, -.102068, .138636, 1.0761, .970017, -.0822598, .111861, 1.09541, .97661, -.062033, .0843438, 1.11317, .985073, -.0409832, .0558496, 1.12911, .993515, -.020146, .0275331, 1.1438, 1.00006, 27329e-8, -107883e-9, 1.15736, .525324, -999341e-11, .498153, 105385e-10, .526513, -251605e-9, .499277, 265329e-9, .526517, -.00100641, .499282, .0010613, .526588, -.00226466, .499337, .00238823, .526539, -.0040255, .499302, .00424535, .526547, -.00628954, .499306, .00663364, .526561, -.00905628, .499313, .00955337, .526593, -.0123253, .499334, .0130054, .526642, -.0160957, .499365, .0169911, .5267, -.0203661, .499396, .0215122, .526792, -.0251347, .499451, .0265718, .526904, -.0303985, .499511, .0321732, .527079, -.0361554, .499617, .0383231, .527285, -.0423982, .499731, .045026, .527602, -.0491121, .499924, .0522936, .528166, -.0561127, .500306, .0601528, .52879, -.0635988, .5007, .0686059, .529421, -.071581, .501048, .0776518, .530144, -.0799854, .501421, .0873148, .531062, -.0888032, .501884, .0976084, .532374, -.0977643, .50259, .108588, .533828, -.107197, .50329, .120234, .53581, -.116887, .504312, .132602, .538063, -.126755, .505365, .145721, .5409, -.136819, .506668, .159617, .544882, -.147117, .508731, .174369, .550238, -.157446, .511601, .190028, .556038, -.167988, .514431, .206587, .563031, -.178364, .517808, .224046, .571543, -.189007, .521937, .242503, .582255, -.199546, .527415, .261977, .59272, -.210084, .531682, .282162, .605648, -.220448, .537123, .303426, .61785, -.230593, .540664, .325323, .632223, -.240238, .544467, .348993, .648819, -.24887, .547594, .375462, .665825, -.256657, .54912, .403024, .683389, -.263711, .549294, .431773, .701495, -.269666, .547649, .461494, .719197, -.274169, .543786, .491623, .737906, -.278124, .538644, .522994, .756652, -.280632, .531057, .554775, .775279, -.281741, .521972, .586441, .792688, -.281652, .509613, .618596, .811894, -.280345, .496497, .651462, .827938, -.277128, .47968, .684023, .844837, -.271646, .460688, .718024, .859239, -.264397, .438872, .751207, .874088, -.256144, .41577, .784232, .887693, -.246311, .391369, .816191, .899402, -.235497, .365872, .847828, .910973, -.223631, .338618, .87934, .92204, -.209874, .310803, .910325, .930987, -.194265, .281802, .940695, .94, -.178125, .252836, .970958, .948018, -.161479, .224239, 1.00078, .955141, -.144038, .195857, 1.0288, .960513, -.124915, .168487, 1.05371, .963964, -.104284, .141495, 1.07596, .968713, -.0838732, .114437, 1.09628, .975524, -.0635579, .0863105, 1.11448, .98431, -.042291, .0574774, 1.13069, .992916, -.0209131, .0284343, 1.14568, .999926, 743097e-9, -379265e-9, 1.15955, .501042, -998428e-11, .498726, 100306e-10, .502992, -252112e-9, .500665, 253283e-9, .502417, -.00100791, .500092, .00101259, .502965, -.00226919, .500621, .00227978, .502318, -.00403109, .499994, .00405011, .502333, -.00629832, .500005, .00632868, .502362, -.00906907, .500027, .00911446, .502369, -.0123423, .500023, .0124078, .50243, -.0161178, .500066, .016211, .502493, -.0203937, .500103, .0205256, .502592, -.0251684, .500166, .0253548, .502707, -.0304389, .50023, .0307029, .502881, -.0362015, .500335, .0365753, .503124, -.0424507, .500488, .0429798, .503443, -.0491582, .500686, .0499268, .504083, -.0561476, .501155, .0574541, .504668, -.0636846, .501524, .0655408, .505319, -.0716834, .501904, .0742072, .50609, -.0800925, .502321, .0834699, .507122, -.0888425, .502896, .0933603, .508414, -.097855, .503603, .10391, .509955, -.107304, .504416, .115113, .512061, -.116921, .505565, .127054, .514419, -.12689, .506732, .139709, .517529, -.136934, .508338, .153173, .522085, -.147327, .510987, .167528, .526986, -.157612, .513527, .182708, .533122, -.168213, .516717, .198881, .540807, -.178688, .520832, .215986, .550687, -.189511, .52632, .234335, .560567, -.199998, .531009, .253375, .571698, -.210652, .535839, .273499, .584364, -.220917, .541091, .294355, .599066, -.23137, .546875, .316525, .614148, -.241206, .551306, .339671, .631157, -.250379, .555187, .36531, .647919, -.258397, .556595, .392767, .666112, -.265528, .556949, .421397, .686158, -.271827, .556617, .451433, .704838, -.27674, .552975, .482131, .723957, -.280733, .547814, .513458, .74262, -.283359, .53997, .545446, .762009, -.284541, .530422, .57775, .781314, -.284507, .518546, .610434, .799116, -.283309, .504178, .643178, .817604, -.280378, .48843, .676248, .83459, -.275619, .469457, .709698, .850974, -.26856, .447698, .744245, .866747, -.260094, .424791, .777695, .881412, -.249929, .399913, .810392, .8936, -.239137, .37308, .842872, .905943, -.226818, .345705, .874677, .916408, -.213699, .31706, .906257, .927215, -.198428, .288444, .936881, .935625, -.181643, .258329, .96795, .944076, -.164386, .228488, .998216, .951229, -.146339, .199763, 1.02689, .958793, -.127709, .172153, 1.0535, .963219, -.107244, .144989, 1.07646, .967562, -.0857764, .11685, 1.09675, .974866, -.0645377, .0880571, 1.11576, .983353, -.0431732, .0587352, 1.13227, .992503, -.0218356, .0294181, 1.1478, 1.00003, 605203e-9, -231013e-9, 1.16207, .482935, -101177e-10, .504695, 968142e-11, .477554, -251521e-9, .499071, 240676e-9, .477904, -.00100683, .499436, 96342e-8, .478368, -.00226636, .499899, .0021687, .477977, -.00402719, .499513, .00385384, .477993, -.00629226, .499525, .0060221, .478011, -.00906011, .499536, .00867289, .478051, -.0123305, .499566, .0118074, .478089, -.016102, .499587, .0154269, .478171, -.0203736, .499645, .0195341, .478254, -.025143, .499692, .0241318, .47839, -.0304071, .499779, .0292247, .478588, -.0361631, .499911, .0348196, .478812, -.0424023, .500046, .0409231, .479208, -.0490724, .500326, .047552, .479841, -.0560722, .500805, .0547377, .480392, -.0636125, .501152, .0624607, .481068, -.0716134, .501561, .0707473, .481898, -.0800062, .502054, .0796118, .483022, -.0886568, .502728, .0890974, .484332, -.0977553, .503479, .0992099, .486126, -.107173, .504546, .10999, .488066, -.11677, .50557, .121476, .490521, -.126725, .506849, .133672, .494232, -.136793, .50911, .146731, .498302, -.147116, .511345, .160577, .503565, -.157446, .514344, .175335, .510902, -.168121, .518824, .191207, .519263, -.178799, .523666, .208058, .528204, -.189407, .528296, .225875, .538854, -.200145, .533724, .244782, .551278, -.210701, .539833, .264753, .565222, -.221303, .546131, .285745, .579403, -.231688, .551496, .307592, .595469, -.241718, .556809, .330582, .610929, -.250992, .559641, .354995, .629433, -.259602, .562379, .382471, .648504, -.267038, .563676, .411126, .66756, -.273388, .562092, .440924, .689143, -.278788, .560807, .472118, .709056, -.282783, .555701, .503774, .729855, -.285836, .548698, .536364, .748954, -.287078, .538544, .56895, .768373, -.287133, .526711, .601991, .78827, -.285839, .512511, .635403, .807465, -.283238, .496323, .668797, .825194, -.27906, .477638, .702584, .842203, -.272286, .456253, .736393, .857749, -.263854, .432412, .77096, .874799, -.253943, .407806, .80489, .887497, -.24237, .38033, .83771, .89966, -.230278, .352446, .870376, .911753, -.21646, .323268, .902256, .923011, -.202071, .294314, .933306, .932375, -.185519, .264104, .965177, .940537, -.167604, .234035, .996303, .948904, -.149068, .20412, 1.0261, .955263, -.129539, .175431, 1.05304, .960303, -.109932, .148116, 1.07617, .965512, -.0880572, .119693, 1.09742, .973466, -.0660548, .0901619, 1.11721, .98284, -.0439228, .0599875, 1.13436, .992216, -.0219588, .0298975, 1.15006, .999946, 119402e-9, -208547e-10, 1.16471, .447827, -100414e-10, .491543, 914833e-11, .454778, -251257e-9, .499172, 22891e-8, .453519, -.00100342, .497787, 914184e-9, .45357, -.00225776, .497847, .00205701, .453578, -.00401371, .497855, .00365705, .45357, -.00627107, .497841, .00571453, .453598, -.00902968, .497864, .00823019, .453627, -.0122888, .497882, .0112049, .453684, -.0160475, .497923, .0146405, .453764, -.0203044, .49798, .0185394, .453866, -.0250576, .498049, .0229054, .453996, -.0303028, .49813, .0277424, .454196, -.0360379, .498267, .0330587, .454457, -.0422521, .498445, .0388613, .454926, -.0488393, .498812, .0451767, .455525, -.0558653, .499272, .0520153, .456074, -.0633772, .499625, .0593754, .456752, -.0713606, .500049, .0672751, .457648, -.07971, .500615, .0757447, .458849, -.0883032, .501399, .0848231, .46029, -.0974095, .502293, .0945135, .462, -.106729, .503301, .104848, .464121, -.116354, .504533, .115884, .466889, -.126214, .506172, .127652, .470744, -.136324, .508667, .14024, .47488, -.146595, .510995, .153673, .480845, -.157027, .514832, .168053, .488262, -.167658, .519506, .183508, .496547, -.178343, .524347, .199948, .506254, -.188916, .52983, .217503, .517961, -.199975, .536357, .236272, .531484, -.210624, .543641, .256096, .545496, -.221227, .550048, .277085, .559497, -.231568, .555076, .298615, .575752, -.241698, .560541, .321547, .591999, -.251172, .564156, .345602, .610654, -.260178, .567607, .371851, .630484, -.268094, .56923, .40076, .651807, -.274661, .569779, .430801, .67239, -.280331, .566791, .461939, .693024, -.284501, .562007, .493854, .715473, -.287852, .555791, .526992, .736323, -.28929, .546345, .560102, .755771, -.289405, .534, .593543, .775424, -.2881, .519114, .627256, .795447, -.285562, .502543, .661464, .815319, -.281416, .484773, .695206, .831769, -.275523, .463445, .729044, .849464, -.267516, .440269, .764069, .866775, -.257584, .415049, .799089, .881252, -.245817, .388049, .831948, .894209, -.233127, .35889, .865526, .906922, -.219579, .329915, .89818, .919686, -.204491, .300441, .930013, .929044, -.188962, .269445, .962061, .938393, -.171079, .238402, .994214, .94661, -.15199, .208204, 1.02533, .953095, -.131953, .178653, 1.0529, .958644, -.111233, .150684, 1.0771, .963925, -.0903098, .122359, 1.09855, .971995, -.0680505, .0923342, 1.11874, .981658, -.0448512, .0614195, 1.13635, .991649, -.0221931, .0303582, 1.15238, .999985, 393403e-9, -111086e-9, 1.16772, .396806, -971563e-11, .457671, 842355e-11, .429186, -249421e-9, .495017, 21625e-8, .429324, -998052e-9, .495173, 865322e-9, .429175, -.00224487, .494999, .00194637, .429129, -.00399041, .494952, .00346004, .429153, -.00623476, .494974, .00540684, .429168, -.0089773, .494983, .00778714, .429207, -.0122175, .495012, .0106022, .429257, -.0159542, .495047, .0138535, .429338, -.0201864, .495106, .0175443, .429431, -.0249104, .495165, .0216774, .429587, -.0301252, .495279, .0262594, .429796, -.0358249, .495432, .0312968, .430065, -.0419972, .495621, .0367985, .430588, -.0485144, .496061, .042798, .43113, -.0555028, .496472, .0492914, .431743, -.0629852, .496904, .0562907, .432448, -.0709256, .497369, .0638056, .433414, -.0791942, .498032, .071885, .434638, -.0877346, .498854, .0805517, .43611, -.0968056, .499812, .0898047, .437859, -.106002, .500891, .0997142, .440017, -.115648, .502198, .110289, .443236, -.125427, .504389, .121644, .44697, -.135492, .506809, .133769, .451689, -.145746, .509858, .146787, .45811, -.156219, .514247, .160793, .465305, -.166834, .518816, .175791, .474085, -.177546, .524331, .191906, .484808, -.188262, .53104, .209199, .49732, -.199346, .538511, .227825, .509693, -.209951, .544554, .247269, .524367, -.220533, .551616, .267978, .539228, -.231082, .557368, .289672, .55644, -.241342, .563782, .31268, .574204, -.250964, .568851, .33651, .593388, -.260306, .57312, .362219, .613358, -.268667, .574916, .390322, .634512, -.275591, .575053, .420478, .65563, -.281328, .572404, .451614, .678265, -.285948, .568893, .484112, .70011, -.289408, .561878, .517348, .723005, -.291328, .55359, .551355, .743744, -.291418, .541099, .585109, .763949, -.290252, .526489, .619487, .784186, -.287648, .509496, .65404, .804304, -.283782, .491484, .688649, .823629, -.278067, .470517, .723133, .84094, -.270588, .44705, .757163, .857852, -.261188, .421252, .792816, .874934, -.249313, .394191, .827248, .888709, -.236492, .365359, .861074, .902589, -.222185, .336016, .894417, .914201, -.207314, .30527, .926825, .925978, -.191146, .274532, .9595, .93512, -.174135, .243393, .991583, .943656, -.155231, .212414, 1.02356, .951719, -.134403, .182005, 1.05239, .957164, -.113023, .153043, 1.07754, .962656, -.0914493, .124186, 1.09984, .970695, -.0694179, .0941654, 1.12, .980749, -.0466199, .0629671, 1.13849, .991205, -.0227032, .0311146, 1.15494, .999884, 632388e-9, -254483e-9, 1.1706, .379821, -957289e-11, .460637, 789337e-11, .405188, -247483e-9, .491396, 204064e-9, .404796, -989434e-9, .490914, 815853e-9, .40483, -.00222607, .490949, .00183559, .40473, -.00395723, .49084, .00326332, .404731, -.00618287, .490836, .00509945, .404768, -.00890258, .490871, .00734463, .404791, -.0121156, .490883, .00999992, .404857, -.0158214, .490938, .0130676, .404943, -.0200178, .491004, .0165503, .405059, -.0247027, .491093, .0204521, .405213, -.0298729, .491205, .0247788, .405399, -.0355226, .491333, .0295373, .405731, -.0416352, .491604, .034741, .406303, -.0480807, .492116, .0404255, .406814, -.0550458, .492506, .0465732, .407404, -.0624652, .492926, .0532058, .408149, -.0702958, .493442, .0603442, .409128, -.0784623, .494136, .0680297, .410408, -.087007, .495054, .0762786, .411813, -.0959639, .495962, .0851046, .413735, -.105075, .497257, .0945878, .416137, -.114646, .498882, .104725, .41934, -.124394, .501132, .11563, .423326, -.134328, .503883, .127325, .428419, -.14458, .50747, .139911, .43484, -.154979, .511964, .153481, .442641, -.165628, .517328, .168114, .452511, -.176365, .524258, .183995, .463473, -.187298, .531248, .200953, .475564, -.198244, .538367, .219176, .488664, -.208938, .545175, .238514, .504073, -.219599, .553227, .259129, .520832, -.230378, .560653, .280997, .538455, -.240703, .567523, .303821, .55709, -.250548, .573287, .327948, .576646, -.259964, .577795, .353362, .596705, -.268721, .580077, .380336, .618053, -.276054, .58018, .4101, .640303, -.282176, .578747, .44161, .662365, -.286931, .574294, .474106, .684542, -.290521, .567035, .507549, .707984, -.292672, .558687, .541853, .730913, -.293189, .547606, .576581, .752948, -.292199, .533471, .61172, .773452, -.289508, .516395, .646339, .794715, -.285716, .497873, .682131, .814251, -.280051, .476845, .716396, .833057, -.272873, .453449, .751503, .84959, -.263982, .427857, .786085, .867022, -.252745, .400335, .821355, .882277, -.239655, .371304, .85646, .895375, -.225386, .340397, .890828, .909347, -.209587, .310005, .923532, .921885, -.193433, .2796, .956419, .932127, -.176135, .247276, .989445, .941869, -.157872, .216186, 1.02221, .949735, -.137577, .185602, 1.05195, .956617, -.115285, .155767, 1.07822, .961974, -.0928418, .126103, 1.10149, .96972, -.0700592, .0956758, 1.12207, .98012, -.0474671, .0643269, 1.1408, .990825, -.0238113, .0320863, 1.1577, .999876, 381574e-9, -812203e-10, 1.17403, .367636, -961342e-11, .469176, 753287e-11, .380377, -244772e-9, .485434, 191797e-9, .380416, -978857e-9, .485475, 767015e-9, .380376, -.00220165, .485435, .00172522, .380419, -.00391408, .485487, .00306734, .380438, -.00611549, .485505, .00479332, .380462, -.00880558, .485525, .00690391, .380496, -.0119837, .485551, .00940039, .38056, -.0156487, .485605, .0122848, .38064, -.0197988, .485666, .0155601, .380767, -.0244324, .48577, .0192313, .380909, -.0295444, .485871, .0233032, .381142, -.0351321, .48606, .0277861, .381472, -.0411535, .486336, .0326939, .382015, -.0475408, .486833, .0380565, .382523, -.0544395, .487231, .0438615, .383129, -.061784, .487683, .0501332, .383952, -.0695085, .488313, .0568996, .38498, -.0775819, .489077, .0641952, .386331, -.0860443, .490113, .0720324, .387788, -.0948406, .491099, .0804379, .389808, -.103899, .492566, .0894899, .39252, -.113313, .494601, .0992098, .395493, -.123007, .496619, .109641, .399826, -.132859, .499912, .120919, .405341, -.143077, .504061, .133107, .411932, -.153465, .508905, .146263, .420591, -.164108, .515482, .160544, .43101, -.174893, .523191, .176123, .441881, -.185839, .53026, .192757, .453919, -.196633, .537295, .210535, .468715, -.207611, .546156, .229886, .485182, -.218517, .555173, .250543, .501926, -.229249, .562728, .27221, .51785, -.239481, .567494, .294892, .536947, -.249395, .573889, .318987, .557115, -.259, .578831, .344348, .577966, -.268075, .582055, .371223, .599489, -.276115, .583307, .399834, .62479, -.282523, .583902, .431415, .647504, -.287663, .57953, .464301, .670601, -.291538, .573103, .498123, .693539, -.293842, .563731, .532662, .717385, -.294681, .553169, .567925, .741533, -.293717, .539908, .603502, .762142, -.291156, .521902, .639074, .783014, -.28719, .502815, .674439, .805158, -.281773, .482598, .710497, .823646, -.274682, .458949, .7456, .841879, -.266184, .433129, .781085, .859515, -.255682, .406064, .816, .875335, -.242849, .376509, .851074, .890147, -.228329, .345502, .886473, .903144, -.212491, .31428, .920751, .916618, -.195695, .282994, .954606, .927953, -.178267, .251091, .988402, .937414, -.159549, .219107, 1.02141, .946823, -.140022, .18896, 1.05167, .954651, -.118154, .158667, 1.07819, .959955, -.0946636, .128808, 1.1025, .96858, -.0711792, .0973787, 1.12391, .97938, -.0475046, .0650965, 1.14322, .990498, -.024059, .0326267, 1.16077, .999844, -512408e-10, 112444e-9, 1.17727, .316912, -934977e-11, .425996, 695559e-11, .356423, -241372e-9, .479108, 179562e-9, .356272, -965292e-9, .478897, 71811e-8, .356262, -.00217182, .478894, .00161574, .356265, -.00386092, .478895, .00287261, .356278, -.0060324, .478905, .00448907, .356293, -.00868565, .478914, .00646572, .356346, -.0118207, .478965, .00880438, .356395, -.0154355, .479001, .0115066, .356484, -.019529, .479075, .0145762, .356609, -.0240991, .47918, .018018, .356766, -.0291413, .479305, .0218379, .357009, -.0346498, .479512, .0260454, .357424, -.0405462, .479909, .0306657, .357899, -.0468825, .480337, .0357054, .358424, -.0536887, .480771, .0411728, .359041, -.0609416, .481242, .0470841, .359903, -.0685239, .481943, .0534831, .360932, -.0764883, .482741, .0603795, .362196, -.0848364, .483688, .0678028, .363847, -.0935002, .484947, .0758086, .365972, -.102471, .486588, .0844173, .368741, -.111751, .488787, .0937199, .372146, -.121334, .491405, .103732, .377114, -.131147, .495604, .114608, .38226, -.141213, .499436, .126345, .389609, -.151632, .505334, .139116, .397925, -.162073, .51168, .152995, .407824, -.172819, .518876, .168071, .420014, -.183929, .527639, .184495, .434266, -.195032, .537588, .20232, .447352, -.205792, .544379, .221189, .463726, -.216704, .553422, .241616, .481406, -.227531, .562074, .263298, .498707, -.238017, .568227, .286116, .518039, -.247936, .574473, .3101, .538277, -.257437, .579191, .335401, .561166, -.266829, .584807, .362246, .583189, -.275329, .586476, .390609, .606024, -.28234, .585578, .420998, .632419, -.287924, .584496, .454357, .656128, -.291972, .577766, .488233, .679953, -.29456, .56875, .523248, .704654, -.295816, .558388, .559168, .729016, -.295157, .544826, .595326, .752062, -.292779, .528273, .631864, .773138, -.288681, .508482, .667793, .794869, -.283358, .487341, .704035, .815101, -.27608, .46354, .739925, .834212, -.26767, .438672, .775539, .852368, -.257397, .411239, .810895, .870207, -.245689, .3829, .846472, .884063, -.231452, .351496, .881788, .898284, -.215561, .31895, .917438, .912964, -.198208, .287367, .952422, .924666, -.180426, .254487, .987551, .934429, -.161525, .222226, 1.02142, .943485, -.141197, .191143, 1.05218, .9521, -.120085, .161112, 1.07937, .957876, -.0975881, .130982, 1.10403, .966943, -.0726842, .0990553, 1.12616, .978313, -.0483705, .0662818, 1.14619, .990048, -.0239072, .0329243, 1.16413, .999984, 461885e-9, -772859e-10, 1.18099, .321287, -935049e-11, .455413, 659662e-11, .332595, -237513e-9, .471437, 167562e-9, .332729, -949964e-9, .471618, 670192e-9, .332305, -.00213618, .471028, .00150712, .332326, -.00379765, .471055, .00267959, .332344, -.00593353, .471072, .00418751, .332356, -.00854349, .471077, .00603172, .332403, -.0116268, .471121, .00821362, .332461, -.0151824, .47117, .0107357, .332552, -.0192088, .471251, .0136014, .332657, -.0237024, .47133, .0168152, .332835, -.0286615, .471487, .0203853, .333083, -.0340765, .471708, .0243212, .333547, -.0398563, .47219, .0286518, .333989, -.0460916, .472587, .0333763, .334532, -.0527897, .473054, .0385084, .335167, -.0599284, .473568, .0440638, .33608, -.0673514, .474362, .0500962, .337146, -.0752237, .475231, .0566022, .338462, -.083418, .476282, .0636272, .34014, -.0919382, .477615, .0712153, .342341, -.100741, .479404, .079417, .345088, -.109905, .481618, .0882631, .349049, -.119369, .485081, .0978851, .353939, -.129033, .489317, .108336, .359893, -.139038, .494309, .119698, .366945, -.149411, .499983, .132024, .375814, -.159843, .507185, .145558, .387112, -.170664, .516392, .160433, .40023, -.181897, .526519, .176648, .412555, -.192785, .53423, .193922, .427023, -.203663, .542741, .212662, .443685, -.214695, .552066, .232944, .461499, -.225561, .560762, .254495, .480975, -.236257, .569421, .277531, .501, -.24639, .576101, .301724, .521691, -.256101, .581493, .327112, .543478, -.265289, .585221, .353917, .566094, -.273938, .587614, .381941, .589578, -.281679, .587991, .41172, .614583, -.287655, .585928, .444148, .641813, -.292228, .582092, .478617, .666189, -.295172, .57398, .51397, .690475, -.29648, .561676, .550118, .715543, -.296203, .548758, .586933, .740405, -.293999, .532792, .62384, .762183, -.28998, .512735, .660723, .786069, -.28478, .492402, .69807, .806812, -.277568, .469058, .734422, .826987, -.268951, .443017, .770946, .844588, -.259049, .415501, .80699, .863725, -.2471, .387328, .842107, .879137, -.234157, .356108, .878078, .894634, -.218719, .324315, .914058, .909162, -.201293, .291813, .949922, .92072, -.18267, .258474, .985337, .93158, -.163212, .225593, 1.0205, .941238, -.142771, .193986, 1.05273, .949293, -.120956, .163392, 1.08075, .956226, -.0985743, .132934, 1.10559, .96546, -.075118, .101255, 1.12823, .977403, -.0497921, .0675441, 1.149, .989648, -.0241574, .0334681, 1.16765, 1.00001, 5762e-7, -184807e-9, 1.18519, .303474, -916603e-11, .4542, 61243e-10, .308894, -232869e-9, .462306, 155592e-9, .309426, -931661e-9, .463093, 622499e-9, .308643, -.0020949, .461933, .00139979, .308651, -.0037242, .461941, .00248874, .308662, -.00581873, .46195, .00388933, .308687, -.00837818, .461974, .00560247, .308728, -.0114016, .462011, .00762948, .308789, -.0148884, .462067, .00997326, .308882, -.0188369, .462151, .0126375, .309007, -.0232436, .462263, .0156271, .30918, -.0281054, .462417, .0189498, .309442, -.0334065, .462667, .0226167, .309901, -.0390589, .463162, .0266614, .310331, -.0452042, .463555, .0310715, .310858, -.0517735, .464019, .0358698, .311576, -.0587359, .464669, .0410848, .312436, -.0660383, .465406, .0467453, .313526, -.0737266, .466339, .0528718, .314903, -.0817574, .467504, .0595039, .316814, -.090167, .469226, .0666888, .318965, -.0987555, .470981, .0744658, .322077, -.107792, .473814, .082912, .325947, -.117098, .477241, .0920846, .331008, -.126602, .48184, .102137, .337893, -.136619, .488334, .113135, .345106, -.146838, .494415, .12511, .355111, -.157357, .503275, .138356, .365095, -.167955, .510966, .152686, .378344, -.179157, .521508, .16856, .391599, -.190143, .530455, .18561, .407786, -.20123, .541275, .204308, .425294, -.212456, .551784, .224623, .444021, -.223568, .561493, .246172, .463418, -.234154, .569886, .268979, .484077, -.244546, .577116, .293411, .505513, -.254301, .582914, .318936, .527672, -.263564, .587208, .345856, .550565, -.272332, .589277, .374054, .573656, -.280011, .588426, .403276, .59827, -.286924, .587504, .43474, .624731, -.291994, .583401, .468767, .652396, -.295159, .576997, .504411, .67732, -.296954, .565863, .54114, .703147, -.296877, .552316, .57816, .728715, -.295147, .536773, .616124, .752448, -.291275, .51771, .653885, .775169, -.285905, .496087, .691537, .799307, -.279064, .474232, .729251, .819482, -.270294, .447676, .766267, .837659, -.260032, .419656, .802616, .856903, -.248497, .391328, .838583, .873325, -.235252, .360285, .874711, .889788, -.221126, .329215, .91077, .904486, -.204304, .296392, .94653, .917711, -.185562, .262159, .983828, .928969, -.165635, .229142, 1.01955, .939707, -.14442, .19673, 1.05317, .948167, -.122147, .165095, 1.0823, .955222, -.099098, .13451, 1.10791, .964401, -.0755332, .102476, 1.1312, .976605, -.0513817, .0689667, 1.15218, .989085, -.0258499, .034506, 1.17129, .999908, 617773e-9, -271268e-9, 1.18961, .285803, -905752e-11, .452348, 572272e-11, .284689, -22732e-8, .450581, 143626e-9, .285263, -910214e-9, .451482, 575099e-9, .285302, -.00204784, .451553, .00129395, .285318, -.00364057, .451574, .0023006, .28533, -.00568813, .451585, .00359547, .285361, -.00819001, .451618, .00517934, .285397, -.0111458, .45165, .007054, .285447, -.0145536, .451688, .00922167, .285527, -.0184127, .451758, .0116869, .285688, -.0227207, .451929, .0144555, .28584, -.0274712, .452055, .0175341, .286136, -.0326278, .452369, .0209406, .286574, -.0381792, .452853, .0246965, .287012, -.0441879, .453272, .0287996, .287542, -.0506096, .453752, .033268, .288299, -.0573634, .454488, .0381504, .289186, -.0645458, .455294, .0434447, .290302, -.0720405, .456301, .0491973, .291776, -.0799046, .457648, .0554453, .29372, -.088117, .459483, .0622311, .296052, -.0965328, .461571, .0695992, .299563, -.105409, .465085, .077658, .30335, -.114553, .468506, .0864176, .309167, -.123917, .474423, .0961078, .31529, -.13381, .47995, .106643, .324163, -.144021, .488592, .118322, .333272, -.154382, .496461, .131133, .344224, -.165015, .50562, .145208, .357733, -.176168, .516719, .16073, .373046, -.187468, .528513, .177807, .38788, -.198488, .537713, .196072, .405133, -.209545, .547999, .21605, .423845, -.220724, .55759, .237484, .443777, -.231518, .566246, .26039, .464824, -.242035, .574326, .284835, .486635, -.251898, .58037, .310518, .51012, -.261304, .58568, .337678, .535301, -.270384, .590197, .366242, .559193, -.27841, .590569, .395873, .583544, -.285325, .588161, .426857, .608834, -.291113, .584249, .459477, .635753, -.294882, .57763, .494734, .664367, -.297088, .569479, .532023, .689688, -.297364, .555064, .569629, .715732, -.295949, .539522, .608124, .741307, -.292259, .521613, .646231, .764949, -.287063, .49969, .684938, .788599, -.28012, .476747, .723548, .81048, -.27153, .45116, .761135, .831372, -.261289, .424101, .798916, .850092, -.249559, .39443, .835952, .867777, -.236348, .363849, .871606, .884632, -.221569, .332477, .907843, .90047, -.20618, .300667, .944187, .914524, -.188771, .266552, .981371, .926892, -.168362, .232349, 1.01841, .937951, -.146761, .199359, 1.05308, .947236, -.123813, .1675, 1.0839, .954367, -.099984, .136166, 1.11047, .963907, -.0759278, .103808, 1.13414, .976218, -.0511367, .0697061, 1.15575, .988772, -.0267415, .0352529, 1.17531, .999888, -520778e-9, 289926e-9, 1.19389, .263546, -883274e-11, .441896, 526783e-11, .262352, -221849e-9, .439889, 132311e-9, .262325, -886683e-9, .439848, 528824e-9, .26228, -.00199476, .439765, .00118975, .262372, -.00354671, .439922, .00211568, .26239, -.00554141, .439941, .00330652, .262412, -.00797888, .439961, .00476346, .262453, -.0108584, .440002, .00648818, .262528, -.0141788, .440085, .0084835, .262615, -.017938, .440166, .0107533, .262744, -.0221346, .440291, .0133044, .262939, -.026762, .440493, .0161445, .263277, -.0317573, .440889, .0192974, .26368, -.0371832, .441338, .0227699, .264106, -.0430371, .441753, .0265698, .264624, -.0493035, .442227, .0307178, .265378, -.0558669, .442985, .0352616, .266253, -.0628718, .443795, .0401968, .267478, -.0701569, .445008, .04559, .269062, -.077845, .446599, .0514539, .270926, -.0857941, .448349, .0578382, .273693, -.0940773, .451221, .0648363, .276746, -.102704, .454097, .0724389, .281693, -.111735, .459517, .0808744, .287335, -.121004, .46531, .0901551, .29448, -.130734, .472605, .100371, .30257, -.140777, .480251, .111644, .312465, -.15111, .489444, .124111, .324856, -.16189, .500919, .137979, .33774, -.172946, .511317, .153163, .35255, -.184152, .522684, .169817, .367786, -.19522, .53248, .187886, .385474, -.20632, .543326, .207634, .404976, -.217744, .554109, .229165, .425203, -.228691, .563395, .252068, .446704, -.239299, .571565, .276471, .468951, -.249348, .577935, .302323, .493487, -.258933, .584309, .329882, .517861, -.268009, .58773, .358525, .543309, -.276238, .589612, .388585, .569704, -.28356, .589294, .419787, .594871, -.289497, .585137, .452114, .622555, -.294452, .580356, .486466, .651167, -.296918, .57185, .523079, .677332, -.297647, .558428, .5611, .703718, -.296321, .542232, .599592, .730262, -.293339, .524541, .639138, .754304, -.288036, .502691, .677978, .778051, -.281018, .479212, .716537, .801557, -.272414, .454071, .75586, .822559, -.262419, .425952, .794477, .843051, -.250702, .397313, .832664, .86232, -.237264, .366534, .869876, .879044, -.222716, .334816, .906973, .896362, -.206827, .303143, .943558, .910342, -.189659, .269699, .979759, .924119, -.171108, .236411, 1.01718, .935374, -.149579, .202224, 1.05289, .944295, -.126295, .16989, 1.08496, .952227, -.101511, .138089, 1.11256, .962041, -.0766392, .105053, 1.1375, .97528, -.0511967, .070329, 1.15983, .988476, -.025463, .0351268, 1.17987, .999962, 286808e-10, 145564e-10, 1.19901, .227089, -841413e-11, .404216, 472707e-11, .239725, -215083e-9, .426708, 120833e-9, .239904, -860718e-9, .427028, 483555e-9, .239911, -.00193661, .427039, .00108806, .239914, -.00344276, .42704, .00193457, .239933, -.00537907, .427064, .00302363, .239944, -.00774482, .427065, .00435604, .239993, -.01054, .427122, .00593398, .240052, -.0137626, .427179, .00775987, .240148, -.0174115, .427279, .00983854, .240278, -.021484, .42741, .0121763, .240472, -.0259729, .427618, .0147827, .240839, -.0308131, .428086, .0176837, .241201, -.0360893, .428482, .0208775, .241626, -.0417723, .428907, .0243821, .242207, -.0478337, .42952, .0282228, .24298, -.0542199, .430332, .0324333, .243881, -.0610015, .431222, .0370252, .245123, -.0680874, .432512, .0420535, .24667, -.0755482, .434088, .0475414, .248779, -.0832873, .436323, .0535542, .251665, -.0913546, .439509, .0601716, .255305, -.0998489, .443478, .0674282, .260049, -.108576, .448713, .0754673, .266192, -.117754, .455524, .084339, .273158, -.127294, .4627, .0941683, .282131, -.137311, .472068, .10515, .293332, -.147736, .483565, .117402, .304667, -.158357, .493702, .130824, .317785, -.169274, .504708, .145724, .333245, -.180595, .517107, .16215, .349843, -.191892, .528849, .180149, .367944, -.203168, .540301, .199746, .387579, -.214443, .551514, .221047, .408247, -.225624, .560906, .243981, .43014, -.236422, .56959, .268513, .452669, -.24654, .576098, .294409, .476196, -.256157, .580925, .322002, .501157, -.265289, .584839, .351052, .527632, -.273671, .587614, .3812, .555754, -.281254, .589119, .412994, .581682, -.287448, .585204, .445498, .608196, -.292614, .579006, .479505, .635661, -.296068, .571297, .514643, .664999, -.297395, .560855, .552213, .691039, -.296645, .544525, .591365, .7179, -.293785, .526535, .630883, .744059, -.289089, .50545, .670932, .76863, -.282239, .482514, .710904, .793273, -.273688, .457246, .750259, .814731, -.26328, .428872, .78948, .835603, -.251526, .399384, .828597, .85489, -.238339, .368811, .866892, .872828, -.223607, .336617, .90563, .889462, -.207538, .303997, .943538, .904929, -.190297, .270812, .980591, .919101, -.172034, .237453, 1.01935, .930536, -.152058, .204431, 1.05498, .941223, -.129515, .172495, 1.08717, .94982, -.104263, .140175, 1.11551, .960592, -.0781944, .106465, 1.14098, .974629, -.051688, .0711592, 1.16418, .98811, -.0253929, .0354432, 1.18465, 1.00004, 804378e-9, -330876e-9, 1.20462, .214668, -821282e-11, .406619, 433582e-11, .218053, -208144e-9, .413025, 109887e-9, .217987, -832212e-9, .412901, 439362e-9, .217971, -.00187246, .412876, 988623e-9, .217968, -.00332855, .41286, .00175772, .217985, -.00520055, .412882, .00274729, .218014, -.00748814, .412916, .00395842, .218054, -.0101901, .412957, .00539274, .218106, -.0133057, .413005, .00705348, .218217, -.0168342, .413139, .00894581, .218338, -.0207707, .413258, .0110754, .21855, -.0251001, .413509, .0134551, .218913, -.0297861, .413992, .0161081, .219265, -.0348956, .414383, .0190307, .219696, -.0403909, .414839, .0222458, .220329, -.0462003, .415567, .025792, .220989, -.0524208, .41621, .0296637, .222027, -.058948, .417385, .0339323, .223301, -.0658208, .418779, .0386055, .224988, -.0730347, .420665, .0437355, .227211, -.0805274, .423198, .0493844, .230131, -.088395, .426566, .0556135, .233908, -.0966208, .43091, .0624829, .239092, -.105223, .437148, .0701636, .245315, -.11424, .444302, .0786949, .253166, -.12368, .453262, .0882382, .262374, -.133569, .463211, .0988682, .273145, -.143836, .474271, .110727, .285512, -.154577, .4863, .123945, .299512, -.165501, .498817, .138581, .314287, -.176698, .510341, .154676, .331083, -.188066, .522583, .172459, .349615, -.199597, .534879, .191979, .369318, -.210843, .546083, .21309, .390377, -.222068, .5562, .235998, .412411, -.233059, .564704, .260518, .435715, -.24357, .572314, .286795, .461196, -.253356, .579395, .314559, .485587, -.262362, .581985, .343581, .511908, -.270895, .584347, .374367, .539798, -.278452, .58505, .406015, .567974, -.284877, .583344, .439168, .594303, -.290124, .577348, .473005, .622951, -.294183, .570751, .508534, .652404, -.296389, .561541, .544764, .679291, -.296605, .546426, .582927, .706437, -.294095, .528599, .622681, .734485, -.28978, .508676, .663567, .758841, -.283363, .484768, .704092, .78537, -.275015, .460434, .745101, .807315, -.264689, .432166, .784712, .8271, -.252597, .401807, .824241, .849191, -.239154, .371458, .863803, .867046, -.224451, .338873, .903063, .8852, -.208342, .306175, .942763, .901771, -.190684, .272759, .981559, .915958, -.172105, .239306, 1.02048, .928046, -.152214, .206071, 1.05765, .939961, -.130247, .17367, 1.08999, .948711, -.10672, .142201, 1.11829, .959305, -.0808688, .108454, 1.14467, .973009, -.0539145, .0728109, 1.16839, .987631, -.0262947, .0360625, 1.19004, .999978, .00132758, -559424e-9, 1.21058, .193925, -793421e-11, .391974, 392537e-11, .196746, -200315e-9, .397675, 991033e-10, .19667, -801099e-9, .397521, 396342e-9, .196633, -.00180246, .397445, 891829e-9, .196654, -.00320443, .397482, .00158582, .196659, -.00500647, .39748, .00247867, .196683, -.0072086, .397506, .00357167, .196728, -.00981001, .397562, .00486675, .196792, -.0128096, .397633, .00636707, .19689, -.0162055, .397746, .00807752, .197017, -.0199943, .397884, .0100052, .19729, -.024139, .39827, .0121691, .197583, -.0286671, .398639, .0145755, .197927, -.0335858, .399034, .0172355, .198383, -.0388806, .399554, .0201718, .199002, -.0444736, .400289, .0234194, .199739, -.0504583, .401111, .026984, .200784, -.056729, .402349, .0309217, .202075, -.0633643, .403841, .0352496, .203898, -.0703247, .406076, .0400313, .206199, -.0775565, .408841, .0453282, .209252, -.085184, .41259, .0511794, .213638, -.0931994, .418288, .0577459, .21881, -.101617, .424681, .0650508, .225642, -.11052, .433429, .0732759, .233717, -.119772, .442897, .0824683, .242823, -.129505, .452888, .0927484, .254772, -.139906, .466407, .104417, .266603, -.150402, .477413, .117211, .28073, -.161395, .490519, .131598, .295399, -.172465, .50201, .147407, .312705, -.183982, .515311, .165031, .331335, -.195532, .52786, .184336, .351037, -.206971, .5392, .205361, .372175, -.218117, .54941, .228043, .394548, -.229327, .558642, .25267, .419598, -.240052, .567861, .279071, .443922, -.249937, .573332, .306882, .471495, -.259407, .58013, .33661, .496769, -.267749, .580564, .367328, .524951, -.275524, .581696, .399753, .55318, -.282148, .579885, .433134, .581577, -.287533, .575471, .467534, .609231, -.291612, .567445, .502943, .637478, -.293911, .557657, .53871, .667795, -.295096, .546535, .576568, .694272, -.294073, .529561, .614929, .722937, -.290386, .510561, .655909, .749682, -.284481, .487846, .697663, .774754, -.276188, .462487, .738515, .799301, -.266215, .43481, .779802, .820762, -.254116, .404879, .820045, .843231, -.240393, .374559, .860294, .861857, -.225503, .341582, .900965, .880815, -.209382, .308778, .941727, .89766, -.19155, .275232, .980916, .912926, -.172346, .240938, 1.02162, .926391, -.151799, .207223, 1.0597, .938429, -.129968, .17484, 1.09291, .947834, -.10651, .142984, 1.12248, .958432, -.0824098, .109902, 1.149, .972402, -.0565242, .0744454, 1.1733, .987191, -.028427, .0373794, 1.19538, .999975, 385685e-10, -4203e-8, 1.21676, .178114, -766075e-11, .385418, 354027e-11, .176074, -191966e-9, .381002, 887135e-10, .17601, -767549e-9, .380861, 354715e-9, .17598, -.00172696, .380798, 798168e-9, .175994, -.00307012, .380824, .00141928, .176017, -.00479684, .380858, .00221859, .176019, -.00690648, .380839, .00319714, .176072, -.00939888, .380913, .0043572, .176131, -.0122726, .380979, .005702, .176239, -.0155264, .38112, .00723689, .176371, -.0191551, .381272, .00896907, .176638, -.023117, .381669, .0109194, .176912, -.0274633, .382015, .0130903, .177279, -.032173, .382476, .0154949, .17774, -.0372219, .383041, .0181669, .178344, -.0426132, .38378, .0211209, .179153, -.0483309, .384773, .0243899, .180197, -.0543447, .386076, .0280062, .181581, -.0607122, .387809, .032004, .18344, -.0673855, .390205, .036453, .186139, -.0743989, .393944, .0414162, .189432, -.0817731, .39832, .0469394, .193795, -.0895464, .404188, .0531442, .199641, -.0978264, .4121, .0601374, .206679, -.106499, .421425, .0680078, .214865, -.115654, .431504, .076919, .224406, -.125268, .442526, .0868835, .235876, -.135475, .455465, .0981875, .248335, -.146023, .4681, .110759, .262868, -.157016, .482069, .124885, .278962, -.168245, .496182, .140645, .295082, -.17958, .507401, .157838, .313738, -.191227, .520252, .17695, .333573, -.202718, .531708, .197817, .356433, -.214424, .544509, .220785, .378853, -.225492, .55373, .245306, .402717, -.236236, .561348, .271593, .428375, -.246568, .568538, .299776, .454724, -.255941, .573462, .329433, .482291, -.264511, .576356, .360598, .509706, -.272129, .576446, .393204, .538805, -.278979, .575298, .427227, .568919, -.284528, .572154, .462157, .596804, -.288801, .564691, .497997, .625987, -.291334, .555134, .534467, .656414, -.292722, .545051, .571736, .683916, -.292185, .528813, .610158, .711809, -.290043, .51106, .649061, .739547, -.285246, .490103, .690081, .766914, -.277647, .465523, .732554, .791375, -.267603, .437718, .773982, .814772, -.256109, .40882, .81609, .836691, -.242281, .377823, .856849, .856984, -.227155, .34496, .898363, .876332, -.210395, .311335, .939471, .894988, -.192612, .277703, .980799, .911113, -.173236, .243019, 1.02215, .924092, -.152258, .209037, 1.06139, .936828, -.129575, .175909, 1.09635, .946869, -.10594, .143852, 1.12707, .958284, -.081318, .110289, 1.15419, .972325, -.0556133, .0747232, 1.17909, .986878, -.0297899, .0383149, 1.20163, .999936, -.00197169, 912402e-9, 1.22338, .151174, -720365e-11, .351531, 309789e-11, .155594, -18279e-8, .361806, 78608e-9, .156099, -731569e-9, .362982, 314615e-9, .156053, -.00164578, .362869, 707845e-9, .156093, -.0029261, .362961, .00125884, .156099, -.00457155, .362959, .00196783, .15612, -.00658224, .362982, .00283622, .156168, -.00895774, .363048, .00386625, .156221, -.0116962, .363101, .00506109, .156324, -.0147973, .363241, .00642675, .156476, -.0182503, .363448, .00797175, .156731, -.0220266, .36384, .00971484, .156994, -.026176, .364179, .0116575, .157341, -.0306701, .36462, .0138207, .157867, -.0354591, .365364, .0162356, .15846, -.0406141, .366111, .0189092, .159308, -.0460519, .367248, .021885, .160426, -.0518096, .368767, .0252004, .161877, -.0578906, .370745, .0288825, .163995, -.0642812, .373831, .0330139, .16655, -.0710067, .377366, .0376283, .170237, -.0781522, .382799, .0428493, .175096, -.0857172, .389915, .0487324, .181069, -.0938025, .398487, .0554214, .188487, -.102363, .408799, .0630189, .197029, -.111343, .419991, .071634, .206684, -.120812, .431455, .0812797, .218698, -.131033, .445746, .0923651, .230726, -.141373, .457471, .104545, .245516, -.152387, .472388, .118449, .261551, -.163628, .486671, .133923, .277437, -.174814, .49762, .150849, .296662, -.186713, .51162, .169924, .31795, -.198513, .525435, .190848, .339422, -.210119, .536267, .213504, .362143, -.221354, .545982, .237947, .387198, -.23224, .555364, .264427, .412349, -.24257, .561489, .292519, .439274, -.252284, .566903, .322561, .466779, -.261023, .569614, .353952, .496011, -.26899, .571589, .387278, .524964, -.275498, .570325, .421356, .556518, -.281449, .568792, .457314, .584363, -.285526, .560268, .493199, .614214, -.28844, .55205, .530276, .645684, -.289777, .541906, .56855, .673446, -.289722, .526464, .606927, .701924, -.287792, .509872, .645945, .73037, -.284315, .490649, .685564, .757405, -.278804, .467964, .726511, .784025, -.269543, .441468, .768601, .808255, -.258117, .41216, .811321, .830739, -.244728, .380606, .853496, .851914, -.229428, .348111, .895374, .872586, -.212508, .314732, .937674, .891581, -.194025, .280338, .979869, .907641, -.174711, .245203, 1.02253, .922233, -.153509, .21077, 1.06371, .935878, -.130418, .177399, 1.09972, .946338, -.105558, .144507, 1.13124, .957265, -.080059, .110508, 1.15973, .971668, -.0539766, .0742311, 1.18515, .9866, -.0277101, .0375224, 1.20858, 1.00021, -515531e-9, 135226e-9, 1.23135, .137468, -686011e-11, .345041, 273315e-11, .13703, -173378e-9, .343936, 690761e-10, .136986, -693048e-9, .34383, 276126e-9, .136964, -.00155931, .343761, 621337e-9, .137003, -.00277211, .343863, .00110494, .137012, -.00433103, .343868, .00172744, .137043, -.00623606, .343916, .00249022, .13709, -.0084868, .343986, .00339559, .137145, -.0110814, .344045, .00444687, .137242, -.0140187, .344177, .00565007, .137431, -.0172713, .344491, .00701868, .137644, -.0208605, .344805, .00856042, .13791, -.024792, .345172, .0102863, .138295, -.0290461, .345734, .0122185, .138764, -.0335957, .346371, .0143771, .139415, -.038467, .347298, .0167894, .140272, -.0436176, .348527, .0194895, .141457, -.0491016, .350276, .0225043, .14303, -.0548764, .352646, .0258962, .145289, -.0610096, .356206, .0297168, .148502, -.0674777, .361488, .0340562, .152188, -.074345, .367103, .0389534, .157359, -.0817442, .375247, .0445541, .16379, -.0896334, .385064, .0509535, .171376, -.098005, .396082, .0582611, .179901, -.106817, .407418, .06654, .189892, -.116239, .420031, .075994, .201838, -.12627, .434321, .0867239, .214311, -.136701, .447631, .0987517, .228902, -.147616, .462046, .112353, .245107, -.158871, .476942, .127605, .262292, -.170261, .490285, .144469, .281215, -.182017, .503783, .163282, .301058, -.193729, .515505, .183873, .322752, -.205512, .52682, .206466, .347547, -.217214, .539473, .231194, .370969, -.227966, .546625, .257288, .397533, -.238555, .55472, .285789, .42398, -.248278, .559468, .315746, .452928, -.257422, .564095, .347724, .482121, -.265306, .565426, .380922, .510438, -.272043, .563205, .415639, .541188, -.277614, .561087, .451702, .571667, -.281927, .554922, .48845, .602432, -.285015, .546838, .526442, .634126, -.286512, .537415, .564896, .662816, -.286388, .522906, .604037, .692411, -.284734, .507003, .643795, .720946, -.281297, .488398, .68298, .748293, -.276262, .466353, .723466, .776931, -.269978, .443573, .764565, .801065, -.260305, .415279, .805838, .825843, -.247426, .384773, .849985, .84807, -.232437, .352555, .893174, .869122, -.215806, .318642, .936564, .888963, -.197307, .28381, .980253, .905547, -.177203, .247888, 1.02463, .918554, -.155542, .212904, 1.06714, .931395, -.131948, .1787, 1.10451, .941749, -.106723, .145902, 1.13694, .954551, -.0804939, .111193, 1.1666, .970279, -.0534239, .0744697, 1.19249, .986117, -.0257452, .0368788, 1.21665, .999938, .00190634, -.0010291, 1.23981, .118493, -647439e-11, .32272, 23772e-10, .118765, -163023e-9, .323456, 598573e-10, .118772, -65212e-8, .323477, 239447e-9, .118843, -.00146741, .323657, 538881e-9, .118804, -.00260846, .323553, 95826e-8, .118826, -.00407576, .323595, .00149845, .118846, -.00586826, .323617, .00216047, .118886, -.00798578, .32367, .00294679, .118947, -.0104273, .323753, .00386124, .119055, -.0131909, .323922, .00490999, .119241, -.0162444, .324251, .00610804, .11944, -.0196339, .324544, .00745805, .119739, -.0233378, .325026, .00897805, .12011, -.0273179, .325586, .0106895, .120571, -.0316143, .326231, .0126073, .12124, -.0361939, .327264, .0147654, .122162, -.0410511, .328733, .0172001, .123378, -.0462233, .330659, .0199375, .125183, -.0517109, .333754, .0230498, .127832, -.0575652, .338507, .026597, .130909, -.0637441, .343666, .0306345, .135221, -.0704302, .351063, .035273, .14082, -.0776364, .360604, .0406137, .146781, -.0852293, .369638, .0466788, .155121, -.0935351, .3827, .0537628, .16398, -.102234, .39522, .0617985, .173926, -.111465, .40793, .07097, .185137, -.121296, .42105, .0813426, .19826, -.13169, .435735, .0931596, .212938, -.142614, .450932, .106547, .229046, -.153884, .465726, .121575, .246246, -.165382, .479461, .138286, .264637, -.176806, .492106, .15666, .284959, -.188793, .504774, .17728, .308157, -.200763, .518805, .19988, .330951, -.21239, .528231, .224293, .3549, -.223521, .536376, .250541, .381502, -.234169, .544846, .278902, .409529, -.244077, .551717, .309227, .437523, -.253363, .55517, .341426, .467624, -.261659, .557772, .37518, .497268, -.268498, .556442, .41007, .528294, -.274018, .553915, .446445, .559053, -.278169, .549153, .483779, .589329, -.281229, .539878, .522249, .622503, -.282902, .53162, .561754, .652382, -.282815, .518119, .601544, .681847, -.281247, .502187, .641574, .712285, -.277986, .484824, .682633, .740094, -.273017, .463483, .723426, .768478, -.266692, .441299, .763747, .794556, -.258358, .415238, .805565, .819408, -.248807, .386912, .847254, .843411, -.236214, .356165, .891091, .862397, -.219794, .320562, .936174, .883113, -.201768, .285322, .982562, .90023, -.181672, .249713, 1.02862, .915192, -.159279, .214546, 1.07163, .928458, -.134725, .180285, 1.10995, .94069, -.10913, .147119, 1.14354, .953409, -.0821315, .112492, 1.17372, .969537, -.0542677, .0752014, 1.20043, .985612, -.0259096, .0370361, 1.22528, .999835, .00298198, -.00151801, 1.24959, .10097, -602574e-11, .300277, 202619e-11, .101577, -152164e-9, .302077, 511662e-10, .101572, -608889e-9, .302066, 204751e-9, .101566, -.00136997, .302047, 460753e-9, .101592, -.00243557, .302114, 819497e-9, .101608, -.0038053, .30214, .00128154, .101627, -.00547906, .30216, .0018483, .101669, -.00745647, .302224, .00252223, .101732, -.00973615, .302318, .00330716, .101844, -.0123097, .302513, .00421061, .102025, -.0151681, .30285, .00524481, .102224, -.0183334, .303166, .0064154, .102515, -.0217819, .303654, .00774063, .102886, -.0255067, .304243, .0092398, .103395, -.029514, .305089, .0109339, .104109, -.0337912, .306301, .0128561, .105074, -.0383565, .30798, .0150338, .10654, -.0432132, .310726, .0175228, .108478, -.0484244, .314351, .0203648, .111015, -.0539339, .319032, .0236325, .114682, -.0598885, .32605, .0274188, .11911, -.0663375, .334109, .0317905, .124736, -.0733011, .344013, .0368502, .131479, -.0807744, .355358, .0427104, .139283, -.0888204, .367614, .0494788, .148054, -.0973394, .380072, .0572367, .159037, -.10665, .395678, .0662704, .169794, -.116221, .40795, .0763192, .18314, -.126632, .423546, .087956, .197515, -.137383, .438213, .101042, .213514, -.148641, .453248, .115827, .23065, -.160117, .46688, .132283, .249148, -.171807, .479962, .150644, .270219, -.183695, .494618, .171073, .292338, -.195574, .506937, .193378, .314999, -.207205, .516463, .217585, .340991, -.218955, .528123, .24428, .367982, -.229917, .537025, .272784, .39432, -.239737, .541627, .302742, .423364, -.249048, .546466, .335112, .453751, -.257329, .549466, .369032, .48416, -.264623, .549503, .404577, .515262, -.270411, .547008, .441337, .547036, -.274581, .542249, .479162, .576614, -.277266, .533015, .517904, .611143, -.279144, .525512, .558508, .640989, -.279001, .51154, .598995, .671182, -.277324, .495641, .639935, .700848, -.273908, .477526, .681017, .729862, -.269063, .457955, .722764, .758273, -.262282, .434846, .764349, .784121, -.254281, .409203, .806206, .809798, -.24505, .382694, .848617, .834953, -.233861, .354034, .892445, .856817, -.221308, .321764, .936263, .877609, -.205996, .288118, .982401, .897489, -.186702, .253277, 1.02975, .913792, -.164618, .217963, 1.07488, .92785, -.140023, .183221, 1.11487, .940378, -.11328, .149385, 1.14947, .95273, -.0853958, .114152, 1.1807, .969059, -.0568698, .0769845, 1.20912, .985574, -.0276502, .0381186, 1.23498, .999943, .00239052, -.00126861, 1.25987, .0852715, -560067e-11, .279021, 171162e-11, .0854143, -140871e-9, .279483, 430516e-10, .0854191, -563385e-9, .2795, 172184e-9, .0854188, -.00126753, .279493, 387464e-9, .0854229, -.00225337, .279501, 68918e-8, .0854443, -.00352086, .279549, .00107803, .0854697, -.00506962, .279591, .00155536, .0855093, -.00689873, .279652, .00212354, .0855724, -.00900821, .279752, .00278703, .0856991, -.0113799, .280011, .0035551, .085855, -.0140314, .280297, .00443449, .0860682, -.016963, .280682, .00543636, .086344, -.0201438, .281159, .0065788, .0867426, -.0235999, .281886, .00787977, .087239, -.0273069, .282745, .0093606, .0879815, -.031269, .284139, .011056, .0891258, -.035531, .28647, .0130065, .0906909, -.0400947, .289708, .0152495, .0927624, -.0449638, .293904, .0178454, .0958376, -.0502427, .300471, .0208915, .0995827, -.0559514, .30806, .0244247, .104526, -.0622152, .317874, .0285721, .110532, -.0690046, .329332, .0334227, .117385, -.0763068, .341217, .0390466, .12522, -.084184, .353968, .0455786, .134037, -.0925248, .366797, .0530773, .144014, -.101487, .380209, .0617424, .156013, -.111273, .395956, .071777, .168872, -.121431, .41053, .0830905, .183089, -.132105, .425073, .0959341, .198763, -.143286, .439833, .110448, .216159, -.154841, .454507, .126769, .234859, -.166588, .468368, .14495, .255879, -.178626, .482846, .165233, .27677, -.190218, .493489, .187217, .301184, -.202227, .506549, .211659, .325852, -.213764, .5158, .237922, .352824, -.22487, .525442, .26632, .380882, -.235246, .532487, .296691, .410137, -.244847, .537703, .329179, .439787, -.253122, .540361, .363135, .472291, -.260517, .542734, .399222, .501856, -.266519, .538826, .436352, .534816, -.270905, .535152, .474505, .565069, -.273826, .525979, .513988, .597154, -.275333, .516394, .554852, .630473, -.275314, .506206, .596592, .660574, -.273323, .489769, .638117, .692015, -.270008, .472578, .680457, .720647, -.265001, .452134, .723008, .750528, -.258311, .430344, .765954, .777568, -.250046, .405624, .809012, .80387, -.240114, .378339, .852425, .828439, -.228737, .349877, .895346, .851472, -.216632, .318968, .940695, .873906, -.202782, .287489, .987235, .89467, -.187059, .254394, 1.03348, .912281, -.168818, .221294, 1.07812, .927358, -.146494, .18675, 1.11928, .940385, -.120009, .152322, 1.15609, .952672, -.0917183, .117514, 1.18875, .968496, -.0620321, .0797405, 1.21821, .985236, -.0314945, .0402383, 1.24523, .99998, -575153e-9, 110644e-9, 1.27133, .0702429, -512222e-11, .255273, 140947e-11, .0702981, -128826e-9, .255469, 354488e-10, .0703691, -515562e-9, .255727, 141874e-9, .0703805, -.00116, .255754, 31929e-8, .0703961, -.00206224, .255813, 567999e-9, .0704102, -.00322223, .255839, 88871e-8, .0704298, -.00463928, .255863, .00128272, .0704759, -.00631375, .255953, .00175283, .0705434, -.00824317, .256079, .00230342, .0706693, -.010412, .25636, .0029443, .0708189, -.0128439, .256647, .00368031, .0710364, -.0155177, .257084, .00452614, .0713223, -.0184374, .257637, .00549706, .0717182, -.0216002, .258416, .00661246, .072321, -.0249966, .259699, .00790147, .0731446, -.0286566, .261475, .0093884, .0743352, -.0325888, .264132, .0111186, .0760676, -.036843, .26815, .013145, .078454, -.0414292, .273636, .0155251, .0818618, -.0464634, .281653, .0183525, .0857382, -.0519478, .289992, .0216642, .0908131, -.0579836, .30066, .0255956, .0967512, -.0645124, .312204, .0301954, .103717, -.0716505, .325001, .0356017, .111596, -.0793232, .338129, .041896, .120933, -.087645, .352853, .0492447, .130787, -.096492, .366192, .0576749, .142311, -.105973, .380864, .0673969, .155344, -.116182, .396575, .0785899, .169535, -.126815, .411443, .0912377, .185173, -.138015, .426256, .105607, .201755, -.149325, .439607, .121551, .221334, -.161207, .455467, .139608, .241461, -.173162, .469096, .159591, .26294, -.18504, .481014, .18156, .286776, -.196881, .493291, .205781, .311596, -.208311, .503556, .231819, .338667, -.219671, .513268, .260274, .366021, -.230451, .519414, .290862, .395875, -.240131, .526766, .323196, .425564, -.248566, .52905, .357071, .457094, -.256195, .530796, .393262, .488286, -.262331, .528703, .430797, .522291, -.267141, .52727, .470231, .554172, -.270411, .519848, .510477, .586427, -.271986, .510307, .551594, .619638, -.27192, .499158, .593849, .650656, -.269817, .483852, .636314, .68284, -.266267, .467515, .679679, .714356, -.26113, .44931, .723884, .742717, -.254067, .425789, .767245, .770894, -.245652, .401144, .811819, .797358, -.235554, .374224, .856315, .823377, -.223896, .346167, .901077, .847456, -.210865, .316056, .946502, .870697, -.196574, .284503, .993711, .891068, -.180814, .251628, 1.04134, .909267, -.163314, .219065, 1.08609, .925653, -.143304, .186446, 1.12702, .940017, -.121322, .153416, 1.16371, .952398, -.0973872, .120334, 1.19712, .967568, -.0698785, .08352, 1.22791, .984772, -.0390031, .0439209, 1.25672, 1.00026, -.0070087, .00315668, 1.28428, .0556653, -459654e-11, .227325, 112556e-11, .0565238, -116382e-9, .230826, 284985e-10, .0565717, -465666e-9, .231026, 114036e-9, .0565859, -.00104773, .231079, 256656e-9, .0565761, -.00186255, .231025, 45663e-8, .0565913, -.00291002, .231058, 714664e-9, .0566108, -.00418998, .231085, .00103224, .0566532, -.00570206, .231169, .00141202, .0567473, -.00743666, .231417, .00186018, .0568567, -.00940298, .231661, .00238264, .0569859, -.0115991, .231895, .00298699, .0572221, -.0140096, .232456, .00368957, .057519, -.0166508, .233096, .00450303, .0579534, -.01951, .234094, .00544945, .0585922, -.0225991, .235629, .00655564, .0595647, -.0259416, .238106, .00785724, .0609109, -.0295661, .241557, .00939127, .0628751, -.0335126, .246652, .0112198, .0656908, -.0378604, .254091, .0134168, .0691347, -.0426543, .262666, .0160374, .0732165, -.0478967, .272029, .0191514, .0782863, -.0536716, .283007, .0228597, .0843973, -.0600683, .295732, .0272829, .0913598, -.0670095, .308779, .032484, .0994407, -.0745516, .322886, .0385886, .108189, -.082712, .336408, .0457133, .118574, -.0914927, .351692, .0539832, .129989, -.100854, .366502, .0635162, .142722, -.110837, .381675, .0744386, .156654, -.121353, .3963, .0868483, .172151, -.132414, .411477, .100963, .188712, -.143809, .42508, .116795, .208093, -.155765, .441328, .134715, .227936, -.167608, .454328, .154396, .249495, -.179579, .467235, .176179, .27362, -.191488, .480248, .200193, .296371, -.202618, .487886, .225775, .324234, -.214133, .499632, .25441, .353049, -.225212, .509532, .285077, .381785, -.234875, .514265, .317047, .414038, -.244205, .521282, .351874, .445251, -.252145, .522931, .388279, .476819, -.258433, .520947, .425825, .509209, -.263411, .517669, .465104, .542759, -.266732, .512841, .505741, .574822, -.268263, .503317, .547611, .609324, -.268489, .493035, .590953, .641772, -.266941, .478816, .63488, .674049, -.263297, .462863, .679072, .705071, -.257618, .442931, .723487, .734709, -.250625, .421299, .768708, .763704, -.24179, .397085, .814375, .791818, -.231115, .370577, .859907, .817439, -.21922, .34232, .906715, .843202, -.205658, .312627, .953943, .866639, -.190563, .280933, 1.00185, .888129, -.173978, .248393, 1.05105, .907239, -.155485, .216007, 1.09704, .923893, -.134782, .183233, 1.13857, .938882, -.11249, .150376, 1.17539, .952464, -.0890706, .117177, 1.20924, .968529, -.0646523, .0813095, 1.24055, .984763, -.038606, .0439378, 1.27018, 1.00053, -.01238, .00598668, 1.29873, .0437928, -409594e-11, .204012, 879224e-12, .0440166, -103395e-9, .205049, 221946e-10, .0440529, -413633e-9, .205225, 887981e-10, .0440493, -930594e-9, .2052, 199858e-9, .0439884, -.00165352, .204901, 355495e-9, .0440716, -.0025849, .205255, 556983e-9, .0440968, -.00372222, .205311, 805326e-9, .0441359, -.00506478, .205391, .00110333, .0442231, -.00660384, .205638, .00145768, .0443254, -.00835246, .205877, .00187275, .0444832, -.0102992, .20627, .00235938, .0447001, -.0124449, .206796, .0029299, .0450168, -.0147935, .207593, .0036005, .0454816, -.017336, .208819, .00439246, .0462446, -.0201156, .211036, .00533864, .0473694, -.0231568, .214388, .00646984, .0490191, -.0264941, .219357, .00783856, .0512776, -.030184, .226061, .00950182, .0541279, -.0342661, .234094, .0115156, .0578989, -.0388539, .244297, .0139687, .0620835, -.0438735, .254457, .0169015, .0673497, -.04951, .266706, .0204554, .0731759, -.0556263, .278753, .0246606, .0803937, -.0624585, .29309, .0297126, .0879287, -.0697556, .305856, .0355868, .0970669, -.0778795, .321059, .0425768, .106508, -.0863541, .333873, .05056, .11776, -.0955935, .349008, .0598972, .130081, -.105438, .363776, .0706314, .144454, -.115899, .380112, .0828822, .1596, -.126827, .394843, .0967611, .176097, -.138161, .409033, .112381, .194726, -.149904, .424257, .129952, .213944, -.161675, .436945, .149333, .235516, -.173659, .450176, .170892, .260564, -.185963, .466305, .194984, .285183, -.197582, .477328, .220805, .311095, -.208697, .486566, .248694, .338924, -.219519, .494811, .279015, .369757, -.229766, .504065, .311725, .3996, -.238879, .507909, .345844, .430484, -.246802, .509805, .381749, .46413, -.253924, .511436, .420251, .497077, -.259319, .508787, .459957, .530434, -.263297, .50394, .501356, .565725, -.265619, .49804, .544252, .599254, -.265842, .487346, .587856, .631251, -.263978, .472975, .631969, .663972, -.26043, .457135, .677471, .697724, -.255358, .439844, .723744, .727725, -.248308, .417872, .770653, .756417, -.239181, .39273, .817357, .785419, -.22814, .367839, .864221, .81266, -.215681, .339449, .912701, .839391, -.201623, .309279, .962419, .86366, -.185624, .278029, 1.0122, .885028, -.16797, .245294, 1.06186, .904639, -.148336, .212689, 1.10934, .922048, -.12637, .179616, 1.15063, .936952, -.102928, .146749, 1.18885, .951895, -.0785268, .112733, 1.22352, .967198, -.0530153, .0760056, 1.25681, .984405, -.02649, .0383183, 1.28762, 1.00021, 70019e-8, -20039e-8, 1.31656, .0325964, -355447e-11, .176706, 655682e-12, .0329333, -899174e-10, .178527, 165869e-10, .0329181, -359637e-9, .178453, 663498e-10, .0329085, -808991e-9, .178383, 149332e-9, .0329181, -.00143826, .178394, 265873e-9, .0329425, -.00224678, .178517, 416597e-9, .0329511, -.00323575, .17849, 603299e-9, .033011, -.00439875, .178695, 829422e-9, .0330733, -.00574059, .178843, .00109908, .0331857, -.00725896, .179176, .00141933, .0333445, -.00895289, .179618, .0017999, .0335674, -.0108219, .180238, .00225316, .033939, -.0128687, .181417, .00279765, .0345239, -.015114, .183395, .0034564, .0354458, -.017596, .186616, .00425864, .0368313, -.0203524, .191547, .00524936, .0386115, -.0234105, .197508, .00647033, .0410303, -.0268509, .205395, .00798121, .0442245, -.0307481, .215365, .0098557, .0478659, -.0350863, .225595, .0121417, .0522416, -.0399506, .236946, .0149385, .0574513, -.045357, .249442, .0183189, .0631208, -.0512863, .261222, .0223644, .0701124, -.0579273, .275418, .0272418, .0777331, -.0650652, .288989, .0329458, .0862709, -.0728813, .302546, .0396819, .096103, -.081363, .317164, .04757, .106976, -.0904463, .331733, .0567012, .119175, -.100105, .34661, .067202, .132919, -.110375, .362249, .0792588, .147727, -.121115, .376978, .0928672, .163618, -.132299, .390681, .108228, .182234, -.143887, .406571, .125502, .201809, -.155827, .42042, .144836, .225041, -.168357, .438411, .166706, .247621, -.18004, .450368, .189909, .27097, -.191536, .460083, .215251, .296658, -.203024, .469765, .243164, .325892, -.214056, .481837, .273388, .35406, -.224104, .487474, .305344, .384372, -.233489, .492773, .339741, .41749, -.241874, .498451, .376287, .45013, -.248834, .499632, .414195, .481285, -.254658, .495233, .454077, .519183, -.259367, .496401, .496352, .551544, -.261818, .487686, .538798, .587349, -.262964, .479453, .583626, .621679, -.262128, .467709, .629451, .654991, -.258998, .452123, .67566, .686873, -.254119, .433495, .723248, .719801, -.246946, .413657, .771156, .750355, -.237709, .390366, .81989, .780033, -.226549, .364947, .868601, .809254, -.214186, .337256, .920034, .836576, -.199639, .307395, .971706, .861774, -.183169, .275431, 1.02479, .885707, -.165111, .243431, 1.07837, .904742, -.144363, .210921, 1.12783, .915604, -.121305, .17647, 1.17254, .930959, -.0962119, .143106, 1.21012, .948404, -.069969, .108112, 1.24474, .967012, -.0427586, .0708478, 1.27718, .984183, -.0147043, .032335, 1.3083, .999577, .0142165, -.00726867, 1.3382, .0229227, -299799e-11, .148623, 462391e-12, .0232194, -758796e-10, .15054, 117033e-10, .0232315, -303636e-9, .15063, 468397e-10, .0232354, -683189e-9, .150624, 105472e-9, .0232092, -.0012136, .150445, 187744e-9, .0232523, -.00189765, .150679, 294847e-9, .0232828, -.00273247, .150789, 428013e-9, .0233371, -.00371287, .150995, 591134e-9, .0234015, -.00484794, .15118, 787642e-9, .023514, -.00612877, .151562, .00102547, .023679, -.00756125, .152116, .00131351, .0239559, -.00914651, .153162, .00166594, .0244334, -.010904, .155133, .00210182, .025139, -.0128615, .158035, .00264406, .0262598, -.0150628, .162751, .00332923, .0277875, -.0175532, .168944, .00419773, .0298472, -.0203981, .176835, .00530034, .0325444, -.023655, .186686, .00669777, .0355581, -.0272982, .196248, .00842661, .0392841, -.0314457, .207352, .0105854, .0436815, -.0361157, .219279, .0132458, .0485272, -.0412932, .230728, .0164736, .0541574, -.0470337, .242994, .0203715, .0609479, -.0535002, .257042, .0250953, .0685228, -.0605409, .27102, .0306856, .0768042, -.0680553, .28406, .037193, .0864844, -.0765011, .299186, .0449795, .0969415, -.0852674, .3132, .0538316, .108478, -.0947333, .327138, .0641149, .121705, -.10481, .342345, .0759185, .136743, -.115474, .358472, .0894116, .152986, -.126536, .374067, .104562, .170397, -.138061, .388267, .121632, .191392, -.150203, .406467, .140996, .211566, -.161751, .418641, .161696, .233567, -.173407, .430418, .184557, .257769, -.185397, .44277, .210092, .28531, -.197048, .457191, .237827, .311726, -.20784, .464712, .267253, .340537, -.218345, .472539, .299332, .372921, -.228306, .482331, .333988, .402924, -.236665, .484378, .369722, .434475, -.244097, .484717, .407836, .469736, -.250547, .487093, .448465, .505045, -.25511, .485575, .490263, .540262, -.258444, .481225, .534495, .576347, -.259903, .473481, .579451, .608656, -.259572, .4603, .625604, .646679, -.257908, .450341, .674511, .679902, -.253663, .431561, .723269, .714159, -.247419, .412684, .773263, .745345, -.239122, .389388, .824182, .778248, -.228837, .365361, .876634, .807208, -.216197, .337667, .92945, .835019, -.201772, .307197, .985261, .860261, -.185291, .274205, 1.04299, .877601, -.165809, .240178, 1.09816, .898211, -.143897, .207571, 1.14694, .915789, -.119513, .174904, 1.19008, .931831, -.0932919, .141423, 1.2297, .949244, -.0656528, .105603, 1.26553, .967527, -.0370262, .0679551, 1.29986, .984139, -.00730117, .0283133, 1.33252, .999713, .0234648, -.0121785, 1.36397, .0152135, -245447e-11, .122795, 304092e-12, .0151652, -615778e-10, .122399, 76292e-10, .0151181, -245948e-9, .122023, 304802e-10, .0151203, -553394e-9, .12203, 686634e-10, .015125, -983841e-9, .122037, 122463e-9, .0151427, -.00153774, .12214, 192706e-9, .0151708, -.0022103, .122237, 281219e-9, .0152115, -.00300741, .12238, 390804e-9, .0152877, -.00392494, .1227, 526317e-9, .015412, -.00496597, .123244, 69443e-8, .0156201, -.00613314, .124228, 90547e-8, .0159658, -.00744113, .125945, .0011732, .0165674, -.00892546, .129098, .00151888, .017487, -.010627, .133865, .00197007, .018839, -.0126043, .140682, .0025637, .020554, -.0148814, .148534, .00333637, .0226727, -.0175123, .157381, .00433738, .0251879, -.0205266, .166685, .00561664, .0283635, -.0240319, .177796, .00725563, .0318694, -.0279432, .188251, .00928811, .0361044, -.0324313, .200038, .011835, .0406656, -.0373527, .210685, .0149146, .0463846, -.0430132, .224182, .0187254, .0525696, -.0491013, .23634, .0232283, .0598083, -.0559175, .250013, .0286521, .0679437, -.0633657, .263981, .0350634, .0771181, -.0714602, .278072, .0425882, .0881273, -.0803502, .29511, .0514487, .0996628, -.0896903, .309976, .0615766, .112702, -.099644, .325611, .0732139, .126488, -.109829, .339321, .0862324, .142625, -.120859, .35574, .101275, .15953, -.131956, .369845, .117892, .176991, -.143145, .38146, .136205, .199715, -.155292, .40052, .157252, .220787, -.167066, .412055, .179966, .243697, -.178396, .423133, .204418, .272106, -.190433, .439524, .232141, .297637, -.201265, .447041, .261109, .325273, -.211834, .454488, .292627, .357219, -.221889, .465004, .326669, .387362, -.230729, .468527, .362426, .423131, -.23924, .475836, .401533, .45543, -.246067, .475017, .441902, .493393, -.251557, .478017, .484239, .526253, -.255571, .4709, .528586, .560554, -.257752, .463167, .574346, .599306, -.258076, .456452, .621655, .634541, -.256471, .443725, .670492, .668907, -.253283, .428719, .721943, .705619, -.247562, .411348, .772477, .739034, -.240626, .388939, .8264, .771408, -.231493, .36425, .881702, .803312, -.220125, .337321, .9385, .828457, -.206645, .305364, .997437, .854819, -.190664, .273715, 1.05693, .878666, -.171429, .242218, 1.11251, .898404, -.149235, .209556, 1.16398, .917416, -.12435, .176863, 1.21014, .933133, -.0972703, .142775, 1.25178, .95066, -.0683607, .106735, 1.29028, .968589, -.0378724, .0681609, 1.32703, .984776, -.00605712, .0273966, 1.36158, .99994, .0263276, -.0138124, 1.3943, .00867437, -186005e-11, .0928979, 173682e-12, .00864003, -466389e-10, .0925237, 435505e-11, .00864593, -186594e-9, .0925806, 174322e-10, .00864095, -419639e-9, .0924903, 392862e-10, .00863851, -746272e-9, .0924589, 702598e-10, .00868531, -.00116456, .0929, 111188e-9, .00869667, -.00167711, .0928529, 163867e-9, .00874332, -.00228051, .0930914, 23104e-8, .00882709, -.00297864, .0935679, 31741e-8, .00898874, -.00377557, .0946165, 430186e-9, .00929346, -.00469247, .0967406, 580383e-9, .00978271, -.00575491, .100084, 783529e-9, .0105746, -.00701514, .105447, .00106304, .0116949, -.00851797, .112494, .00144685, .0130419, -.0102757, .119876, .00196439, .0148375, -.012381, .129034, .00266433, .0168725, -.01482, .137812, .00358364, .0193689, -.0176563, .147696, .00478132, .0222691, -.0209211, .157795, .00631721, .0256891, -.0246655, .168431, .00826346, .0294686, -.0288597, .178587, .0106714, .0340412, -.0336441, .190251, .0136629, .0393918, -.039033, .202999, .0173272, .0453947, -.0450087, .215655, .0217448, .0521936, -.0515461, .228686, .0269941, .0600279, -.058817, .242838, .033272, .0692398, -.0667228, .258145, .0406457, .0793832, -.0752401, .273565, .0492239, .0902297, -.0841851, .287735, .0590105, .102014, -.0936479, .301161, .0702021, .116054, -.103967, .317438, .0832001, .13191, -.114622, .334166, .0977951, .148239, -.125452, .348192, .113985, .165809, -.136453, .361094, .131928, .184616, -.147648, .373534, .151811, .207491, -.159607, .39101, .174476, .230106, -.171119, .402504, .198798, .257036, -.182906, .418032, .225796, .281172, -.193605, .425468, .254027, .312034, -.204771, .440379, .285713, .340402, -.214988, .445406, .319196, .370231, -.224711, .44968, .35537, .407105, -.233516, .460747, .393838, .439037, -.240801, .460624, .433747, .47781, -.24762, .465957, .477234, .510655, -.251823, .460054, .52044, .550584, -.255552, .459172, .567853, .585872, -.257036, .450311, .615943, .620466, -.257535, .437763, .667693, .660496, -.255248, .426639, .718988, .695578, -.251141, .409185, .772503, .732176, -.244718, .39015, .827023, .760782, -.236782, .362594, .885651, .79422, -.225923, .33711, .943756, .824521, -.213855, .308272, 1.00874, .854964, -.197723, .278529, 1.06764, .878065, -.179209, .246208, 1.12836, .899834, -.157569, .21329, 1.18318, .918815, -.133206, .181038, 1.23161, .934934, -.106545, .146993, 1.27644, .952115, -.0780574, .111175, 1.31842, .96906, -.0478279, .0728553, 1.35839, .985178, -.0160014, .032579, 1.39697, 1.00039, .0173126, -.0095256, 1.43312, .00384146, -124311e-11, .0613583, 778271e-13, .00390023, -314043e-10, .0622919, 196626e-11, .00389971, -125622e-9, .0622632, 787379e-11, .00389491, -282352e-9, .0620659, 1778e-8, .00391618, -502512e-9, .0624687, 320918e-10, .00392662, -784458e-9, .0625113, 515573e-10, .00396053, -.00112907, .0628175, 778668e-10, .00401911, -.00153821, .0633286, 113811e-9, .00414994, -.0020208, .0646443, 16445e-8, .00441223, -.00260007, .0673886, 237734e-9, .00484427, -.0033097, .0716528, 345929e-9, .00549109, -.00418966, .0774998, 505987e-9, .00636293, -.00527331, .0844758, 739208e-9, .00746566, -.00660428, .0921325, .00107347, .00876625, -.00818826, .0997067, .00153691, .0103125, -.0100811, .107433, .00217153, .0123309, -.0123643, .117088, .00303427, .0146274, -.0150007, .126438, .00416018, .0172295, -.0180531, .135672, .00561513, .0204248, -.0215962, .146244, .007478, .0241597, -.0256234, .157481, .00981046, .0284693, -.0302209, .169125, .0127148, .033445, -.0353333, .181659, .0162453, .0391251, -.0410845, .1944, .0205417, .0454721, -.0473451, .207082, .0256333, .0530983, -.0542858, .221656, .0317036, .0615356, -.0618384, .236036, .0388319, .0703363, -.0697631, .248398, .046974, .0810391, -.0784757, .263611, .0565246, .0920144, -.0873488, .275857, .0671724, .105584, -.0973652, .292555, .0798105, .119506, -.107271, .306333, .0935945, .134434, -.117608, .318888, .109106, .153399, -.128938, .337552, .127074, .171258, -.139944, .349955, .14643, .191059, -.151288, .361545, .168, .215069, -.163018, .378421, .192082, .237838, -.174226, .38879, .217838, .266965, -.186063, .405857, .246931, .292827, -.196909, .414146, .277505, .324352, -.207473, .426955, .310711, .354427, -.217713, .433429, .346794, .389854, -.227183, .443966, .385237, .420749, -.235131, .44471, .424955, .459597, -.242786, .451729, .468446, .495316, -.248767, .45072, .513422, .534903, -.253351, .450924, .560618, .572369, -.256277, .445266, .609677, .612383, -.2576, .438798, .660995, .644037, -.256931, .421693, .713807, .686749, -.254036, .4109, .767616, .719814, -.249785, .390151, .82533, .754719, -.244283, .367847, .888311, .792022, -.235076, .345013, .948177, .822404, -.225061, .316193, 1.01661, .853084, -.211113, .287013, 1.08075, .879871, -.19449, .255424, 1.14501, .901655, -.174023, .222879, 1.20203, .919957, -.1509, .18989, 1.25698, .938412, -.124923, .15606, 1.30588, .953471, -.0968139, .120512, 1.3529, .970451, -.066734, .0828515, 1.3986, .985522, -.034734, .0424458, 1.44148, 1.00099, -.00102222, 678929e-9, 1.48398, 965494e-9, -627338e-12, .0306409, 197672e-13, 99168e-8, -158573e-10, .0314638, 499803e-12, 991068e-9, -634012e-10, .031363, 200682e-11, 974567e-9, -14144e-8, .03036, 457312e-11, 998079e-9, -252812e-9, .031496, 860131e-11, .00102243, -396506e-9, .0319955, 148288e-10, .00107877, -577593e-9, .0331376, 249141e-10, .00121622, -816816e-9, .0359396, 423011e-10, .0014455, -.00113761, .0399652, 724613e-10, .00178791, -.00156959, .0450556, 123929e-9, .00225668, -.00214064, .0508025, 208531e-9, .00285627, -.00287655, .0568443, 341969e-9, .0035991, -.00380271, .0630892, 544158e-9, .00455524, -.00496264, .0702204, 842423e-9, .00569143, -.0063793, .0773426, .00126704, .00716928, -.00813531, .0860839, .00186642, .00885307, -.0101946, .0944079, .00267014, .0109316, -.0126386, .103951, .00374033, .0133704, -.0154876, .113786, .0051304, .0161525, -.0187317, .123477, .00688858, .0194267, -.0224652, .133986, .00910557, .0230967, -.0265976, .143979, .0118074, .0273627, -.0312848, .154645, .0151266, .0323898, -.0365949, .166765, .0191791, .0379225, -.0422914, .177932, .0239236, .0447501, -.0487469, .19167, .0296568, .0519391, -.0556398, .203224, .0362924, .0599464, -.0631646, .215652, .0440585, .0702427, -.0714308, .232089, .0531619, .0806902, -.0800605, .245258, .0634564, .0923194, -.0892815, .258609, .0752481, .106938, -.09931, .276654, .0888914, .121238, -.109575, .289847, .104055, .138817, -.120461, .307566, .121266, .15595, -.131209, .320117, .139944, .178418, -.143049, .339677, .161591, .197875, -.154074, .349886, .184303, .224368, -.166307, .369352, .210669, .252213, -.178051, .386242, .238895, .277321, -.189335, .395294, .269182, .310332, -.200683, .412148, .302508, .338809, -.210856, .418266, .337264, .372678, -.220655, .428723, .374881, .405632, -.230053, .433887, .415656, .442293, -.237993, .439911, .457982, .477256, -.244897, .440175, .502831, .515592, -.250657, .441079, .550277, .550969, -.255459, .435219, .601102, .592883, -.257696, .432882, .651785, .629092, -.259894, .421054, .708961, .672033, -.258592, .41177, .763806, .709147, -.256525, .395267, .824249, .745367, -.254677, .375013, .8951, .784715, -.247892, .353906, .959317, .818107, -.240162, .327801, 1.03153, .847895, -.229741, .298821, 1.10601, .879603, -.213084, .269115, 1.164, .902605, -.195242, .236606, 1.22854, .922788, -.174505, .203442, 1.29017, .944831, -.150169, .169594, 1.34157, .959656, -.124099, .135909, 1.3956, .972399, -.0960626, .0990563, 1.45128, .986549, -.0657097, .0602348, 1.50312, 1.00013, -.0333558, .0186694, 1.55364, 619747e-11, -1e-7, .00778326, 796756e-16, 237499e-13, -999999e-13, 282592e-10, 114596e-15, 100292e-11, -166369e-11, 250354e-9, 677492e-14, 350752e-11, -637769e-11, 357289e-9, 631655e-13, 826445e-11, -174689e-10, 516179e-9, 31851e-11, 242481e-10, -450868e-10, .0010223, 130577e-11, 455631e-10, -89044e-9, .00144302, 374587e-11, 971222e-10, -178311e-9, .00241912, 102584e-10, 171403e-9, -313976e-9, .00354938, 236481e-10, 292747e-9, -520026e-9, .00513765, 496014e-10, 789827e-9, -.00118187, .0238621, 139056e-9, .00114093, -.00171827, .0286691, 244093e-9, .00176119, -.00249667, .0368565, 420623e-9, .0022233, -.00333742, .0400469, 65673e-8, .00343382, -.00481976, .0535751, .00109323, .00427602, -.00600755, .057099, .00155268, .00461435, -.00737637, .0551084, .00215031, .00695698, -.00971401, .0715767, .00316529, .00867619, -.0120943, .0793314, .00436995, .0106694, -.0148202, .0869391, .0058959, .0140351, -.0183501, .101572, .00798757, .0168939, -.022006, .11018, .0104233, .020197, -.0261568, .119041, .0134167, .0254702, -.0312778, .135404, .0173009, .0298384, -.0362469, .1437, .0215428, .035159, -.042237, .15512, .0268882, .0427685, -.0488711, .17128, .033235, .0494848, -.0557997, .181813, .0404443, .0592394, -.0635578, .198745, .0490043, .0681463, -.071838, .210497, .0588239, .0804753, -.0809297, .228864, .0702835, .0942205, -.0906488, .247008, .0834012, .106777, -.100216, .258812, .0975952, .124471, -.110827, .278617, .114162, .138389, -.121193, .287049, .131983, .159543, -.13253, .307151, .152541, .176432, -.143611, .31564, .174673, .201723, -.15548, .33538, .199842, .229721, -.167166, .355256, .227097, .250206, -.178238, .360047, .256014, .282118, -.189905, .378761, .28855, .312821, -.201033, .39181, .323348, .341482, -.211584, .397716, .360564, .377368, -.221314, .410141, .400004, .418229, -.230474, .423485, .442371, .444881, -.239443, .418874, .488796, .488899, -.245987, .427545, .535012, .520317, -.253948, .422147, .589678, .568566, -.256616, .42719, .637683, .599607, -.26376, .415114, .703363, .64222, -.268687, .408715, .771363, .685698, -.2694, .399722, .83574, .732327, -.266642, .388651, .897764, .769873, -.267712, .369198, .983312, .806733, -.263479, .346802, 1.06222, .843466, -.254575, .321368, 1.13477, .873008, -.242749, .29211, 1.20712, .908438, -.22725, .262143, 1.27465, .936321, -.207621, .228876, 1.33203, .950353, -.187932, .19484, 1.40439, .96442, -.165154, .163178, 1.4732, .979856, -.139302, .127531, 1.53574, .982561, -.11134, .0903457, 1.59982, .996389, -.0808124, .0489007, 1.6577]
          , t = [1, 0, 0, 0, 1, 791421e-36, 0, 0, 1, 104392e-29, 0, 0, 1, 349405e-26, 0, 0, 1, 109923e-23, 0, 0, 1, 947414e-22, 0, 0, 1, 359627e-20, 0, 0, 1, 772053e-19, 0, 0, 1, 108799e-17, 0, 0, 1, 110655e-16, 0, 0, 1, 865818e-16, 0, 0, .999998, 545037e-15, 0, 0, .999994, 285095e-14, 0, 0, .999989, 126931e-13, 0, 0, .999973, 489938e-13, 0, 0, .999947, 166347e-12, 0, 0, .999894, 502694e-12, 0, 0, .999798, 136532e-11, 0, 0, .999617, 335898e-11, 0, 0, .999234, 752126e-11, 0, 0, .998258, 152586e-10, 0, 0, .99504, 266207e-10, 0, 0, .980816, 236802e-10, 0, 0, .967553, 207684e-11, 0, 0, .966877, 403733e-11, 0, 0, .965752, 741174e-11, 0, 0, .96382, 127746e-10, 0, 0, .960306, 202792e-10, 0, 0, .953619, 280232e-10, 0, 0, .941103, 278816e-10, 0, 0, .926619, 160221e-10, 0, 0, .920983, 235164e-10, 0, 0, .912293, 311924e-10, 0, .0158731, .899277, 348118e-10, 0, .0476191, .880884, 26041e-9, 0, .0793651, .870399, 338726e-10, 0, .111111, .856138, 392906e-10, 0, .142857, .837436, 372874e-10, 0, .174603, .820973, 392558e-10, 0, .206349, .803583, 434658e-10, 0, .238095, .782168, 40256e-9, 0, .269841, .764107, 448159e-10, 0, .301587, .743092, 457627e-10, 0, .333333, .721626, 455314e-10, 0, .365079, .700375, 477335e-10, 0, .396825, .677334, 461072e-10, 0, .428571, .655702, 484393e-10, 0, .460317, .632059, 464583e-10, 0, .492064, .610125, 483923e-10, 0, .52381, .58653, 464342e-10, 0, .555556, .564508, 477033e-10, 0, .587302, .541405, 459263e-10, 0, .619048, .519556, 46412e-9, 0, .650794, .497292, 448913e-10, 0, .68254, .475898, 445789e-10, 0, .714286, .454722, 433496e-10, 0, .746032, .434042, 423054e-10, 0, .777778, .414126, 413737e-10, 0, .809524, .394387, 397265e-10, 0, .84127, .375841, 390709e-10, 0, .873016, .357219, 369938e-10, 0, .904762, .340084, 365618e-10, 0, .936508, .322714, 342533e-10, 0, .968254, .306974, 339596e-10, 0, 1, 1, 101524e-23, 0, 0, 1, 10292e-22, 0, 0, 1, 130908e-23, 0, 0, 1, 473331e-23, 0, 0, 1, 625319e-22, 0, 0, 1, 107932e-20, 0, 0, 1, 163779e-19, 0, 0, 1, 203198e-18, 0, 0, 1, 204717e-17, 0, 0, .999999, 168995e-16, 0, 0, .999998, 115855e-15, 0, 0, .999996, 66947e-14, 0, 0, .999991, 330863e-14, 0, 0, .999983, 141737e-13, 0, 0, .999968, 532626e-13, 0, 0, .99994, 177431e-12, 0, 0, .999891, 528835e-12, 0, 0, .999797, 142169e-11, 0, 0, .999617, 347057e-11, 0, 0, .999227, 77231e-10, 0, 0, .998239, 155753e-10, 0, 0, .994937, 268495e-10, 0, 0, .980225, 213742e-10, 0, 0, .967549, 21631e-10, 0, 0, .966865, 417989e-11, 0, 0, .965739, 763341e-11, 0, 0, .963794, 130892e-10, 0, 0, .960244, 206456e-10, 0, 0, .953495, 282016e-10, 0, 148105e-9, .940876, 271581e-10, 0, .002454, .926569, 164159e-10, 0, .00867491, .920905, 239521e-10, 0, .01956, .912169, 315127e-10, 0, .035433, .899095, 346626e-10, 0, .056294, .882209, 290223e-10, 0, .0818191, .870272, 342992e-10, 0, .111259, .855977, 394164e-10, 0, .142857, .837431, 372343e-10, 0, .174603, .820826, 396691e-10, 0, .206349, .803408, 435395e-10, 0, .238095, .782838, 419579e-10, 0, .269841, .763941, 450953e-10, 0, .301587, .742904, 455847e-10, 0, .333333, .721463, 458833e-10, 0, .365079, .700197, 477159e-10, 0, .396825, .677501, 470641e-10, 0, .428571, .655527, 484732e-10, 0, .460317, .6324, 476834e-10, 0, .492064, .609964, 484213e-10, 0, .52381, .586839, 475541e-10, 0, .555556, .564353, 476951e-10, 0, .587302, .541589, 467611e-10, 0, .619048, .519413, 463493e-10, 0, .650794, .497337, 453994e-10, 0, .68254, .475797, 445308e-10, 0, .714286, .454659, 435787e-10, 0, .746032, .434065, 424839e-10, 0, .777778, .414018, 41436e-9, 0, .809524, .39455, 401902e-10, 0, .84127, .375742, 390813e-10, 0, .873016, .357501, 377116e-10, 0, .904762, .339996, 36535e-9, 0, .936508, .323069, 351265e-10, 0, .968254, .306897, 339112e-10, 0, 1, 1, 10396e-19, 0, 0, 1, 104326e-20, 0, 0, 1, 110153e-20, 0, 0, 1, 144668e-20, 0, 0, 1, 34528e-19, 0, 0, 1, 175958e-19, 0, 0, 1, 12627e-17, 0, 0, 1, 936074e-18, 0, 0, 1, 645742e-17, 0, 0, .999998, 401228e-16, 0, 0, .999997, 222338e-15, 0, 0, .999995, 10967e-13, 0, 0, .999991, 482132e-14, 0, 0, .999981, 189434e-13, 0, 0, .999967, 667716e-13, 0, 0, .999938, 212066e-12, 0, 0, .999886, 60977e-11, 0, 0, .999792, 159504e-11, 0, 0, .999608, 381191e-11, 0, 0, .999209, 833727e-11, 0, 0, .998179, 165288e-10, 0, 0, .994605, 274387e-10, 0, 0, .979468, 167316e-10, 0, 0, .967529, 242877e-11, 0, 0, .966836, 461696e-11, 0, 0, .96569, 830977e-11, 0, 0, .963706, 140427e-10, 0, 244659e-11, .960063, 217353e-10, 0, 760774e-9, .953113, 286606e-10, 0, .00367261, .940192, 247691e-10, 0, .00940263, .927731, 195814e-10, 0, .018333, .920669, 252531e-10, 0, .0306825, .911799, 324277e-10, 0, .0465556, .89857, 340982e-10, 0, .0659521, .883283, 319622e-10, 0, .0887677, .86989, 35548e-9, 0, .114784, .855483, 397143e-10, 0, .143618, .837987, 391665e-10, 0, .174606, .820546, 411306e-10, 0, .206349, .802878, 436753e-10, 0, .238095, .783402, 444e-7, 0, .269841, .763439, 458726e-10, 0, .301587, .742925, 467097e-10, 0, .333333, .721633, 478887e-10, 0, .365079, .69985, 481251e-10, 0, .396825, .67783, 491811e-10, 0, .428571, .655126, 488199e-10, 0, .460318, .632697, 496025e-10, 0, .492064, .609613, 48829e-9, 0, .52381, .587098, 492754e-10, 0, .555556, .564119, 482625e-10, 0, .587302, .541813, 482807e-10, 0, .619048, .519342, 471552e-10, 0, .650794, .497514, 466765e-10, 0, .68254, .475879, 455582e-10, 0, .714286, .454789, 446007e-10, 0, .746032, .434217, 435382e-10, 0, .777778, .414086, 421753e-10, 0, .809524, .394744, 412093e-10, 0, .84127, .375782, 396634e-10, 0, .873016, .357707, 386419e-10, 0, .904762, .340038, 370345e-10, 0, .936508, .323284, 359725e-10, 0, .968254, .306954, 3436e-8, 0, 1, 1, 599567e-19, 0, 0, 1, 600497e-19, 0, 0, 1, 614839e-19, 0, 0, 1, 686641e-19, 0, 0, 1, 972658e-19, 0, 0, 1, 221271e-18, 0, 0, 1, 833195e-18, 0, 0, 1, 403601e-17, 0, 0, .999999, 206001e-16, 0, 0, .999998, 101739e-15, 0, 0, .999997, 470132e-15, 0, 0, .999993, 200436e-14, 0, 0, .999988, 783682e-14, 0, 0, .999979, 280338e-13, 0, 0, .999962, 917033e-13, 0, 0, .999933, 274514e-12, 0, 0, .999881, 753201e-12, 0, 0, .999783, 189826e-11, 0, 0, .999594, 440279e-11, 0, 0, .999178, 93898e-10, 0, 0, .998073, 181265e-10, 0, 0, .993993, 280487e-10, 0, 0, .979982, 149422e-10, 0, 0, .968145, 378481e-11, 0, 0, .966786, 53771e-10, 0, 0, .965611, 947508e-11, 0, 388934e-10, .963557, 156616e-10, 0, 9693e-7, .959752, 235144e-10, 0, .00370329, .952461, 291568e-10, 0, .00868428, .940193, 240102e-10, 0, .0161889, .929042, 231235e-10, 0, .0263948, .920266, 273968e-10, 0, .0394088, .911178, 337915e-10, 0, .0552818, .897873, 333629e-10, 0, .0740138, .884053, 351405e-10, 0, .0955539, .869455, 378034e-10, 0, .119795, .854655, 399378e-10, 0, .14656, .838347, 419108e-10, 0, .175573, .820693, 440831e-10, 0, .206388, .802277, 445599e-10, 0, .238095, .783634, 472691e-10, 0, .269841, .763159, 476984e-10, 0, .301587, .742914, 491487e-10, 0, .333333, .721662, 502312e-10, 0, .365079, .699668, 502817e-10, 0, .396825, .677839, 51406e-9, 0, .428571, .655091, 511095e-10, 0, .460317, .632665, 516067e-10, 0, .492064, .609734, 512255e-10, 0, .52381, .587043, 510263e-10, 0, .555556, .564298, 50565e-9, 0, .587302, .541769, 497951e-10, 0, .619048, .519529, 492698e-10, 0, .650794, .497574, 482066e-10, 0, .68254, .476028, 473689e-10, 0, .714286, .454961, 461941e-10, 0, .746032, .434341, 450618e-10, 0, .777778, .414364, 438355e-10, 0, .809524, .394832, 424196e-10, 0, .84127, .376109, 412563e-10, 0, .873016, .35779, 396226e-10, 0, .904762, .340379, 384886e-10, 0, .936508, .323385, 368214e-10, 0, .968254, .307295, 356636e-10, 0, 1, 1, 106465e-17, 0, 0, 1, 106555e-17, 0, 0, 1, 107966e-17, 0, 0, 1, 114601e-17, 0, 0, 1, 137123e-17, 0, 0, 1, 21243e-16, 0, 0, .999999, 489653e-17, 0, 0, .999999, 160283e-16, 0, 0, .999998, 62269e-15, 0, 0, .999997, 251859e-15, 0, 0, .999996, 996192e-15, 0, 0, .999992, 374531e-14, 0, 0, .999986, 132022e-13, 0, 0, .999975, 433315e-13, 0, 0, .999959, 131956e-12, 0, 0, .999927, 372249e-12, 0, 0, .999871, 972461e-12, 0, 0, .999771, 235343e-11, 0, 0, .999572, 52768e-10, 0, 0, .999133, 109237e-10, 0, 0, .997912, 203675e-10, 0, 0, .993008, 279396e-10, 0, 0, .980645, 139604e-10, 0, 0, .970057, 646596e-11, 0, 0, .966717, 65089e-10, 0, 474145e-10, .965497, 111863e-10, 0, 89544e-8, .96334, 179857e-10, 0, .0032647, .959294, 259045e-10, 0, .0075144, .951519, 292327e-10, 0, .0138734, .940517, 249769e-10, 0, .0224952, .93014, 26803e-9, 0, .0334828, .91972, 303656e-10, 0, .0468973, .910294, 353323e-10, 0, .0627703, .897701, 351002e-10, 0, .0811019, .884522, 388104e-10, 0, .10186, .869489, 412932e-10, 0, .124985, .853983, 415781e-10, 0, .150372, .838425, 454066e-10, 0, .177868, .820656, 471624e-10, 0, .207245, .801875, 475243e-10, 0, .238143, .783521, 505621e-10, 0, .269841, .763131, 50721e-9, 0, .301587, .74261, 523293e-10, 0, .333333, .72148, 528699e-10, 0, .365079, .699696, 538677e-10, 0, .396825, .677592, 539255e-10, 0, .428571, .65525, 546367e-10, 0, .460317, .632452, 541348e-10, 0, .492064, .609903, 544976e-10, 0, .52381, .586928, 536201e-10, 0, .555556, .564464, 535185e-10, 0, .587302, .541801, 524949e-10, 0, .619048, .519681, 51812e-9, 0, .650794, .497685, 507687e-10, 0, .68254, .47622, 496243e-10, 0, .714286, .455135, 485714e-10, 0, .746032, .4346, 471847e-10, 0, .777778, .414564, 459294e-10, 0, .809524, .395165, 444705e-10, 0, .84127, .376333, 430772e-10, 0, .873016, .358197, 416229e-10, 0, .904762, .34064, 401019e-10, 0, .936508, .323816, 386623e-10, 0, .968254, .307581, 370933e-10, 0, 1, 1, 991541e-17, 0, 0, 1, 992077e-17, 0, 0, 1, 100041e-16, 0, 0, 1, 10385e-15, 0, 0, 1, 115777e-16, 0, 0, 1, 150215e-16, 0, 0, .999999, 254738e-16, 0, 0, .999999, 598822e-16, 0, 0, .999998, 179597e-15, 0, 0, .999997, 602367e-15, 0, 0, .999994, 206835e-14, 0, 0, .99999, 694952e-14, 0, 0, .999984, 223363e-13, 0, 0, .999972, 678578e-13, 0, 0, .999952, 193571e-12, 0, 0, .999919, 516594e-12, 0, 0, .99986, 128739e-11, 0, 0, .999753, 299298e-11, 0, 0, .999546, 648258e-11, 0, 0, .999074, 129985e-10, 0, 0, .997671, 232176e-10, 0, 0, .991504, 256701e-10, 0, 0, .981148, 131141e-10, 0, 0, .971965, 869048e-11, 0, 280182e-10, .966624, 808301e-11, 0, 695475e-9, .965344, 135235e-10, 0, .00265522, .963048, 210592e-10, 0, .00622975, .958673, 287473e-10, 0, .0116234, .950262, 281379e-10, 0, .018976, .940836, 271089e-10, 0, .0283844, .930996, 30926e-9, 0, .0399151, .919848, 348359e-10, 0, .0536063, .909136, 366092e-10, 0, .0694793, .897554, 384162e-10, 0, .0875342, .884691, 430971e-10, 0, .107749, .869414, 447803e-10, 0, .130087, .853462, 452858e-10, 0, .154481, .838187, 495769e-10, 0, .180833, .820381, 502709e-10, 0, .209005, .801844, 522713e-10, 0, .238791, .783061, 541505e-10, 0, .269869, .763205, 553712e-10, 0, .301587, .742362, 564909e-10, 0, .333333, .721393, 572646e-10, 0, .365079, .699676, 581012e-10, 0, .396825, .677395, 58096e-9, 0, .428571, .655208, 585766e-10, 0, .460317, .632451, 583602e-10, 0, .492064, .609839, 580234e-10, 0, .52381, .587093, 577161e-10, 0, .555556, .564467, 568447e-10, 0, .587302, .542043, 563166e-10, 0, .619048, .519826, 55156e-9, 0, .650794, .497952, 541682e-10, 0, .68254, .476477, 528971e-10, 0, .714286, .455412, 514952e-10, 0, .746032, .434926, 502222e-10, 0, .777778, .4149, 485779e-10, 0, .809524, .395552, 472242e-10, 0, .84127, .376712, 454891e-10, 0, .873016, .358622, 440924e-10, 0, .904762, .341048, 422984e-10, 0, .936508, .324262, 408582e-10, 0, .968254, .308013, 390839e-10, 0, 1, 1, 613913e-16, 0, 0, 1, 614145e-16, 0, 0, 1, 617708e-16, 0, 0, 1, 633717e-16, 0, 0, 1, 681648e-16, 0, 0, 1, 808291e-16, 0, 0, 1, 114608e-15, 0, 0, .999998, 210507e-15, 0, 0, .999997, 499595e-15, 0, 0, .999995, 139897e-14, 0, 0, .999994, 419818e-14, 0, 0, .999988, 127042e-13, 0, 0, .999979, 375153e-13, 0, 0, .999965, 106206e-12, 0, 0, .999945, 285381e-12, 0, 0, .999908, 723611e-12, 0, 0, .999846, 17255e-10, 0, 0, .999733, 386104e-11, 0, 0, .999511, 808493e-11, 0, 0, .998993, 156884e-10, 0, 0, .997326, 265538e-10, 0, 0, .989706, 206466e-10, 0, 0, .981713, 130756e-10, 0, 70005e-10, .973636, 106473e-10, 0, 464797e-9, .966509, 10194e-9, 0, .00201743, .965149, 165881e-10, 0, .00497549, .962669, 249147e-10, 0, .00953262, .95786, 317449e-10, 0, .0158211, .949334, 281045e-10, 0, .0239343, .941041, 303263e-10, 0, .0339372, .931575, 356754e-10, 0, .0458738, .920102, 397075e-10, 0, .059772, .908002, 384886e-10, 0, .075645, .897269, 43027e-9, 0, .0934929, .884559, 479925e-10, 0, .113302, .869161, 48246e-9, 0, .135045, .853342, 509505e-10, 0, .158678, .837633, 542846e-10, 0, .184136, .820252, 554139e-10, 0, .211325, .801872, 581412e-10, 0, .240113, .782418, 585535e-10, 0, .270306, .7631, 610923e-10, 0, .301594, .742183, 613678e-10, 0, .333333, .721098, 627275e-10, 0, .365079, .699512, 629413e-10, 0, .396825, .677372, 636351e-10, 0, .428571, .655059, 633555e-10, 0, .460317, .632567, 636513e-10, 0, .492064, .609784, 628965e-10, 0, .52381, .587237, 625546e-10, 0, .555556, .564525, 615825e-10, 0, .587302, .542181, 605048e-10, 0, .619048, .520017, 596329e-10, 0, .650794, .498204, 581516e-10, 0, .68254, .476742, 569186e-10, 0, .714286, .455803, 553833e-10, 0, .746032, .435251, 537807e-10, 0, .777778, .415374, 522025e-10, 0, .809524, .395921, 503421e-10, 0, .84127, .377253, 488211e-10, 0, .873016, .359021, 468234e-10, 0, .904762, .341637, 453269e-10, 0, .936508, .3247, 433014e-10, 0, .968254, .308625, 418007e-10, 0, 1, 1, 286798e-15, 0, 0, 1, 286877e-15, 0, 0, 1, 288094e-15, 0, 0, 1, 293506e-15, 0, 0, 1, 309262e-15, 0, 0, .999999, 348593e-15, 0, 0, .999999, 444582e-15, 0, 0, .999998, 688591e-15, 0, 0, .999996, 134391e-14, 0, 0, .999993, 317438e-14, 0, 0, .999989, 835609e-14, 0, 0, .999983, 228677e-13, 0, 0, .999974, 623361e-13, 0, 0, .999959, 165225e-12, 0, 0, .999936, 419983e-12, 0, 0, .999896, 101546e-11, 0, 0, .99983, 232376e-11, 0, 0, .999709, 50156e-10, 0, 0, .999469, 10167e-9, 0, 0, .998886, 190775e-10, 0, 0, .996819, 300511e-10, 0, 0, .988837, 185092e-10, 0, 168222e-12, .982178, 134622e-10, 0, 259622e-9, .975017, 125961e-10, 0, .00142595, .967101, 13507e-9, 0, .00382273, .964905, 205003e-10, 0, .00764164, .96218, 29546e-9, 0, .0130121, .956821, 343738e-10, 0, .0200253, .948829, 305063e-10, 0, .0287452, .941092, 346487e-10, 0, .039218, .931883, 412061e-10, 0, .0514748, .920211, 444651e-10, 0, .0655351, .907307, 431252e-10, 0, .0814082, .89684, 490382e-10, 0, .0990939, .884119, 53334e-9, 0, .118583, .869148, 54114e-9, 0, .139856, .853377, 578536e-10, 0, .162882, .836753, 592285e-10, 0, .187615, .820063, 622787e-10, 0, .213991, .801694, 645492e-10, 0, .241918, .782116, 65353e-9, 0, .271267, .762673, 674344e-10, 0, .301847, .742133, 682788e-10, 0, .333333, .720779, 691959e-10, 0, .365079, .699386, 696817e-10, 0, .396826, .67732, 699583e-10, 0, .428572, .654888, 698447e-10, 0, .460318, .632499, 694063e-10, 0, .492064, .609825, 691612e-10, 0, .52381, .587287, 681576e-10, 0, .555556, .564743, 674138e-10, 0, .587302, .542409, 661617e-10, 0, .619048, .520282, 647785e-10, 0, .650794, .498506, 633836e-10, 0, .68254, .477102, 615905e-10, 0, .714286, .456167, 601013e-10, 0, .746032, .435728, 581457e-10, 0, .777778, .415809, 564215e-10, 0, .809524, .396517, 544997e-10, 0, .84127, .377737, 525061e-10, 0, .873016, .359698, 506831e-10, 0, .904762, .342164, 48568e-9, 0, .936508, .325417, 467826e-10, 0, .968254, .309186, 446736e-10, 0, 1, 1, 109018e-14, 0, 0, 1, 10904e-13, 0, 0, 1, 109393e-14, 0, 0, 1, 11095e-13, 0, 0, 1, 1154e-12, 0, 0, 1, 126089e-14, 0, 0, .999999, 15059e-13, 0, 0, .999997, 207899e-14, 0, 0, .999994, 348164e-14, 0, 0, .999993, 705728e-14, 0, 0, .999987, 163692e-13, 0, 0, .999981, 406033e-13, 0, 0, .999969, 10245e-11, 0, 0, .999953, 255023e-12, 0, 0, .999925, 61511e-11, 0, 0, .999881, 142218e-11, 0, 0, .99981, 313086e-11, 0, 0, .99968, 653119e-11, 0, 0, .999418, 12832e-9, 0, 0, .998748, 232497e-10, 0, 0, .996066, 329522e-10, 0, 0, .988379, 179613e-10, 0, 108799e-9, .982567, 143715e-10, 0, 921302e-9, .976097, 148096e-10, 0, .00280738, .968475, 178905e-10, 0, .00596622, .964606, 253921e-10, 0, .0105284, .961564, 348623e-10, 0, .0165848, .955517, 357612e-10, 0, .0242, .948381, 343493e-10, 0, .03342, .941095, 405849e-10, 0, .0442777, .931923, 475394e-10, 0, .0567958, .91996, 484328e-10, 0, .0709879, .907419, 502146e-10, 0, .086861, .89618, 561654e-10, 0, .104415, .88337, 587612e-10, 0, .123643, .869046, 618057e-10, 0, .144531, .853278, 657392e-10, 0, .167057, .836091, 66303e-9, 0, .191188, .819644, 704445e-10, 0, .216878, .801246, 714071e-10, 0, .244062, .782031, 740093e-10, 0, .272649, .762066, 74685e-9, 0, .302509, .741964, 766647e-10, 0, .333442, .720554, 766328e-10, 0, .365079, .699098, 777857e-10, 0, .396826, .677189, 774633e-10, 0, .428572, .65484, 776235e-10, 0, .460318, .632496, 770316e-10, 0, .492064, .609908, 762669e-10, 0, .52381, .587312, 753972e-10, 0, .555556, .564938, 739994e-10, 0, .587302, .542577, 728382e-10, 0, .619048, .52062, 71112e-9, 0, .650794, .498819, 694004e-10, 0, .68254, .477555, 675575e-10, 0, .714286, .456568, 653449e-10, 0, .746032, .436278, 636068e-10, 0, .777778, .41637, 613466e-10, 0, .809524, .397144, 594177e-10, 0, .84127, .378412, 570987e-10, 0, .873016, .360376, 550419e-10, 0, .904762, .342906, 527422e-10, 0, .936508, .326136, 506544e-10, 0, .968254, .30997, 484307e-10, 0, 1, 1, 354014e-14, 0, 0, 1, 354073e-14, 0, 0, 1, 354972e-14, 0, 0, 1, 358929e-14, 0, 0, 1, 370093e-14, 0, 0, .999999, 396194e-14, 0, 0, .999998, 453352e-14, 0, 0, .999997, 578828e-14, 0, 0, .999994, 863812e-14, 0, 0, .999991, 153622e-13, 0, 0, .999985, 316356e-13, 0, 0, .999977, 712781e-13, 0, 0, .999964, 166725e-12, 0, 0, .999945, 390501e-12, 0, 0, .999912, 895622e-12, 0, 0, .999866, 198428e-11, 0, 0, .999786, 421038e-11, 0, 0, .999647, 850239e-11, 0, 0, .999356, 162059e-10, 0, 0, .998563, 282652e-10, 0, 0, .994928, 336309e-10, 0, 244244e-10, .987999, 178458e-10, 0, 523891e-9, .982893, 159162e-10, 0, .00194729, .977044, 178056e-10, 0, .00451099, .969972, 230624e-10, 0, .00835132, .964237, 313922e-10, 0, .013561, .960791, 406145e-10, 0, .0202056, .954292, 372796e-10, 0, .0283321, .948052, 403199e-10, 0, .0379739, .940938, 479537e-10, 0, .0491551, .931689, 545292e-10, 0, .0618918, .91987, 54038e-9, 0, .0761941, .907665, 589909e-10, 0, .0920672, .895281, 642651e-10, 0, .109511, .882621, 659707e-10, 0, .12852, .86873, 709973e-10, 0, .149085, .853008, 742221e-10, 0, .171189, .835944, 761754e-10, 0, .194809, .818949, 797052e-10, 0, .21991, .800951, 812434e-10, 0, .246447, .781847, 838075e-10, 0, .274352, .761649, 84501e-9, 0, .303535, .74152, 860258e-10, 0, .333857, .720495, 866233e-10, 0, .365104, .698742, 868326e-10, 0, .396826, .677096, 87133e-9, 0, .428572, .654782, 863497e-10, 0, .460318, .632335, 860206e-10, 0, .492064, .610031, 849337e-10, 0, .52381, .587457, 838279e-10, 0, .555556, .56513, 82309e-9, 0, .587302, .542877, 803542e-10, 0, .619048, .5209, 786928e-10, 0, .650794, .499291, 765171e-10, 0, .68254, .477971, 744753e-10, 0, .714286, .457221, 72209e-9, 0, .746032, .436803, 697448e-10, 0, .777778, .417083, 675333e-10, 0, .809524, .397749, 648058e-10, 0, .84127, .379177, 625759e-10, 0, .873016, .361061, 598584e-10, 0, .904762, .343713, 575797e-10, 0, .936508, .326894, 549999e-10, 0, .968254, .310816, 527482e-10, 0, 1, 1, 10153e-12, 0, 0, 1, 101544e-13, 0, 0, 1, 101751e-13, 0, 0, 1, 102662e-13, 0, 0, 1, 10521e-12, 0, 0, .999999, 111049e-13, 0, 0, .999999, 123408e-13, 0, 0, .999996, 14924e-12, 0, 0, .999992, 204471e-13, 0, 0, .999989, 326539e-13, 0, 0, .99998, 603559e-13, 0, 0, .999971, 123936e-12, 0, 0, .999955, 269058e-12, 0, 0, .999933, 593604e-12, 0, 0, .999901, 129633e-11, 0, 0, .999847, 275621e-11, 0, 0, .999761, 564494e-11, 0, 0, .999607, 110485e-10, 0, 0, .999282, 204388e-10, 0, 0, .99831, 341084e-10, 0, 22038e-11, .993288, 294949e-10, 0, 242388e-9, .987855, 192736e-10, 0, .0012503, .983167, 182383e-10, 0, .0032745, .977908, 218633e-10, 0, .00646321, .971194, 290662e-10, 0, .0109133, .963867, 386401e-10, 0, .0166927, .95982, 462827e-10, 0, .0238494, .953497, 420705e-10, 0, .0324178, .947621, 477743e-10, 0, .0424225, .940611, 568258e-10, 0, .0538808, .931174, 618061e-10, 0, .0668047, .919919, 627098e-10, 0, .0812014, .907856, 694714e-10, 0, .0970745, .894509, 735008e-10, 0, .114424, .881954, 763369e-10, 0, .133246, .868309, 821896e-10, 0, .153534, .852511, 83769e-9, 0, .175275, .835821, 881615e-10, 0, .198453, .817981, 896368e-10, 0, .223042, .800504, 930906e-10, 0, .249009, .78141, 945056e-10, 0, .276304, .761427, 963605e-10, 0, .304862, .74094, 968088e-10, 0, .334584, .720233, 981481e-10, 0, .365322, .698592, 979122e-10, 0, .396826, .676763, 981057e-10, 0, .428571, .654808, 973956e-10, 0, .460318, .632326, 962619e-10, 0, .492064, .610049, 952996e-10, 0, .52381, .58763, 933334e-10, 0, .555556, .565261, 917573e-10, 0, .587302, .543244, 896636e-10, 0, .619048, .521273, 873304e-10, 0, .650794, .499818, 852648e-10, 0, .68254, .478536, 823961e-10, 0, .714286, .457826, 79939e-9, 0, .746032, .437549, 77126e-9, 0, .777778, .41776, 743043e-10, 0, .809524, .39863, 716426e-10, 0, .84127, .379954, 686456e-10, 0, .873016, .362025, 660514e-10, 0, .904762, .344581, 630755e-10, 0, .936508, .327909, 605439e-10, 0, .968254, .311736, 576345e-10, 0, 1, 1, 263344e-13, 0, 0, 1, 263373e-13, 0, 0, 1, 263815e-13, 0, 0, 1, 265753e-13, 0, 0, 1, 271132e-13, 0, 0, .999999, 283279e-13, 0, 0, .999997, 30833e-12, 0, 0, .999995, 358711e-13, 0, 0, .999992, 461266e-13, 0, 0, .999985, 67574e-12, 0, 0, .999977, 11358e-11, 0, 0, .999966, 213657e-12, 0, 0, .999948, 431151e-12, 0, 0, .999923, 896656e-12, 0, 0, .999884, 186603e-11, 0, 0, .999826, 381115e-11, 0, 0, .999732, 754184e-11, 0, 0, .999561, 143192e-10, 0, 0, .999191, 257061e-10, 0, 0, .997955, 405724e-10, 0, 744132e-10, .992228, 276537e-10, 0, 716477e-9, .987638, 208885e-10, 0, .0022524, .983395, 215226e-10, 0, .00484816, .978614, 270795e-10, 0, .00860962, .972389, 365282e-10, 0, .0136083, .964392, 474747e-10, 0, .0198941, .95861, 509141e-10, 0, .0275023, .952806, 48963e-9, 0, .0364584, .94712, 571119e-10, 0, .04678, .940104, 671704e-10, 0, .0584799, .930398, 687586e-10, 0, .0715665, .919866, 738161e-10, 0, .086045, .907853, 813235e-10, 0, .101918, .894078, 834582e-10, 0, .119186, .881177, 892093e-10, 0, .137845, .867575, 944548e-10, 0, .157891, .852107, 969607e-10, 0, .179316, .835502, 101456e-9, 0, .202106, .81756, 103256e-9, 0, .226243, .79984, 106954e-9, 0, .251704, .780998, 108066e-9, 0, .278451, .761132, 110111e-9, 0, .306436, .740429, 110459e-9, 0, .335586, .719836, 111219e-9, 0, .365796, .698467, 11145e-8, 0, .3969, .676446, 110393e-9, 0, .428571, .654635, 110035e-9, 0, .460318, .632411, 108548e-9, 0, .492064, .609986, 106963e-9, 0, .52381, .587872, 105238e-9, 0, .555556, .565528, 102665e-9, 0, .587302, .543563, 100543e-9, 0, .619048, .52176, 976182e-10, 0, .650794, .500188, 947099e-10, 0, .68254, .479204, 919929e-10, 0, .714286, .458413, 886139e-10, 0, .746032, .438314, 857839e-10, 0, .777778, .418573, 82411e-9, 0, .809524, .39947, 792211e-10, 0, .84127, .380892, 759546e-10, 0, .873016, .362953, 727571e-10, 0, .904762, .345601, 695738e-10, 0, .936508, .328895, 664907e-10, 0, .968254, .312808, 634277e-10, 0, 1, 1, 628647e-13, 0, 0, 1, 628705e-13, 0, 0, 1, 629587e-13, 0, 0, 1, 633441e-13, 0, 0, .999999, 644087e-13, 0, 0, .999998, 667856e-13, 0, 0, .999997, 715889e-13, 0, 0, .999995, 809577e-13, 0, 0, .999989, 992764e-13, 0, 0, .999983, 135834e-12, 0, 0, .999974, 210482e-12, 0, 0, .999959, 365215e-12, 0, 0, .999939, 686693e-12, 0, 0, .999911, 13472e-10, 0, 0, .999868, 26731e-10, 0, 0, .999804, 524756e-11, 0, 0, .9997, 100403e-10, 0, 0, .99951, 185019e-10, 0, 0, .999078, 322036e-10, 0, 620676e-11, .997428, 470002e-10, 0, 341552e-9, .99162, 287123e-10, 0, .00143727, .987479, 234706e-10, 0, .00349201, .983582, 260083e-10, 0, .0066242, .979186, 337927e-10, 0, .0109113, .97325, 454689e-10, 0, .0164064, .965221, 573759e-10, 0, .0231463, .957262, 544114e-10, 0, .0311571, .952211, 587006e-10, 0, .0404572, .946631, 692256e-10, 0, .0510592, .939391, 787819e-10, 0, .0629723, .929795, 792368e-10, 0, .0762025, .91965, 875075e-10, 0, .090753, .907737, 950903e-10, 0, .106626, .893899, 972963e-10, 0, .123822, .880239, 10459e-8, 0, .142337, .866562, 107689e-9, 0, .16217, .85164, 113081e-9, 0, .183314, .835021, 116636e-9, 0, .20576, .817311, 120074e-9, 0, .229496, .798845, 121921e-9, 0, .254502, .780479, 12475e-8, 0, .280753, .760694, 125255e-9, 0, .308212, .740142, 126719e-9, 0, .336825, .719248, 12636e-8, 0, .366517, .698209, 126712e-9, 0, .397167, .676398, 125769e-9, 0, .428578, .654378, 124432e-9, 0, .460318, .632484, 123272e-9, 0, .492064, .610113, 12085e-8, 0, .52381, .587931, 118411e-9, 0, .555556, .565872, 11569e-8, 0, .587302, .543814, 112521e-9, 0, .619048, .522265, 109737e-9, 0, .650794, .500835, 106228e-9, 0, .68254, .479818, 102591e-9, 0, .714286, .459258, 991288e-10, 0, .746032, .439061, 952325e-10, 0, .777778, .419552, 91895e-9, 0, .809524, .400399, 879051e-10, 0, .84127, .381976, 844775e-10, 0, .873016, .364009, 806316e-10, 0, .904762, .346761, 771848e-10, 0, .936508, .330049, 735429e-10, 0, .968254, .314018, 702103e-10, 0, 1, 1, 139968e-12, 0, 0, 1, 139979e-12, 0, 0, 1, 140145e-12, 0, 0, 1, 14087e-11, 0, 0, .999999, 142865e-12, 0, 0, .999998, 147279e-12, 0, 0, .999997, 156057e-12, 0, 0, .999992, 17276e-11, 0, 0, .999989, 204352e-12, 0, 0, .99998, 26494e-11, 0, 0, .999969, 383435e-12, 0, 0, .999953, 618641e-12, 0, 0, .999929, 108755e-11, 0, 0, .999898, 201497e-11, 0, 0, .999849, 381346e-11, 0, 0, .999778, 719815e-11, 0, 0, .999661, 133215e-10, 0, 0, .999451, 238313e-10, 0, 0, .998936, 401343e-10, 0, 113724e-9, .99662, 517346e-10, 0, 820171e-9, .991094, 304323e-10, 0, .00238143, .987487, 281757e-10, 0, .00493527, .983731, 320048e-10, 0, .00856859, .979647, 423905e-10, 0, .0133393, .973837, 562935e-10, 0, .0192863, .96584, 677442e-10, 0, .0264369, .956309, 623073e-10, 0, .03481, .951523, 704131e-10, 0, .0444184, .946003, 836594e-10, 0, .0552713, .938454, 911736e-10, 0, .0673749, .929279, 938264e-10, 0, .0807329, .919239, 103754e-9, 0, .0953479, .907293, 109928e-9, 0, .111221, .893936, 115257e-9, 0, .128352, .879674, 122265e-9, 0, .14674, .865668, 125733e-9, 0, .166382, .850998, 132305e-9, 0, .187276, .834498, 134844e-9, 0, .209413, .816903, 139276e-9, 0, .232786, .798235, 140984e-9, 0, .257382, .779724, 14378e-8, 0, .283181, .760251, 144623e-9, 0, .310156, .739808, 145228e-9, 0, .338269, .718762, 14539e-8, 0, .367461, .697815, 144432e-9, 0, .397646, .67631, 143893e-9, 0, .428685, .654278, 141846e-9, 0, .460318, .632347, 13935e-8, 0, .492064, .610296, 137138e-9, 0, .52381, .588039, 133806e-9, 0, .555556, .566218, 130755e-9, 0, .587302, .544346, 127128e-9, 0, .619048, .522701, 123002e-9, 0, .650794, .501542, 119443e-9, 0, .68254, .480508, 115055e-9, 0, .714286, .460092, 111032e-9, 0, .746032, .440021, 106635e-9, 0, .777778, .420446, 102162e-9, 0, .809524, .401512, 98184e-9, 0, .84127, .38299, 936497e-10, 0, .873016, .365232, 89813e-9, 0, .904762, .347865, 853073e-10, 0, .936508, .331342, 817068e-10, 0, .968254, .315202, 773818e-10, 0, 1, 1, 29368e-11, 0, 0, 1, 2937e-10, 0, 0, 1, 293998e-12, 0, 0, 1, 295298e-12, 0, 0, .999999, 298865e-12, 0, 0, .999998, 3067e-10, 0, 0, .999995, 322082e-12, 0, 0, .999992, 350767e-12, 0, 0, .999986, 403538e-12, 0, 0, .999976, 501372e-12, 0, 0, .999964, 68562e-11, 0, 0, .999945, 10374e-10, 0, 0, .999919, 171269e-11, 0, 0, .999882, 300175e-11, 0, 0, .999829, 542144e-11, 0, 0, .999749, 984182e-11, 0, 0, .99962, 176213e-10, 0, 0, .999382, 305995e-10, 0, 138418e-10, .998751, 496686e-10, 0, 389844e-9, .995344, 510733e-10, 0, .00150343, .990768, 345829e-10, 0, .00352451, .987464, 342841e-10, 0, .00655379, .983846, 399072e-10, 0, .0106554, .980007, 533219e-10, 0, .0158723, .974494, 696992e-10, 0, .0222333, .96622, 776754e-10, 0, .029758, .956273, 747718e-10, 0, .0384596, .950952, 864611e-10, 0, .0483473, .945215, 100464e-9, 0, .0594266, .937287, 103729e-9, 0, .0717019, .928649, 111665e-9, 0, .0851752, .918791, 12353e-8, 0, .0998479, .906685, 127115e-9, 0, .115721, .893706, 13628e-8, 0, .132794, .879248, 142427e-9, 0, .151067, .864685, 148091e-9, 0, .170538, .850032, 153517e-9, 0, .191204, .833853, 157322e-9, 0, .213063, .816353, 161086e-9, 0, .236107, .797834, 164111e-9, 0, .260329, .778831, 165446e-9, 0, .285714, .759756, 167492e-9, 0, .312243, .739419, 166928e-9, 0, .339887, .718491, 167e-6, 0, .368604, .697392, 165674e-9, 0, .398329, .676102, 163815e-9, 0, .428961, .654243, 162003e-9, 0, .460331, .632176, 158831e-9, 0, .492064, .610407, 155463e-9, 0, .52381, .588394, 152062e-9, 0, .555556, .56645, 147665e-9, 0, .587302, .5449, 14375e-8, 0, .619048, .523276, 138905e-9, 0, .650794, .502179, 134189e-9, 0, .68254, .481359, 129392e-9, 0, .714286, .46092, 124556e-9, 0, .746032, .441084, 11957e-8, 0, .777778, .421517, 114652e-9, 0, .809524, .402721, 109688e-9, 0, .84127, .384222, 104667e-9, 0, .873016, .366534, 999633e-10, 0, .904762, .349205, 950177e-10, 0, .936508, .332702, 907301e-10, 0, .968254, .316599, 859769e-10, 0, 1, 1, 585473e-12, 0, 0, 1, 585507e-12, 0, 0, 1, 58602e-11, 0, 0, .999999, 588259e-12, 0, 0, .999999, 594381e-12, 0, 0, .999998, 607754e-12, 0, 0, .999995, 633729e-12, 0, 0, .99999, 68137e-11, 0, 0, .999984, 767003e-12, 0, 0, .999973, 921212e-12, 0, 0, .999959, 120218e-11, 0, 0, .999936, 172024e-11, 0, 0, .999907, 268088e-11, 0, 0, .999866, 445512e-11, 0, 0, .999806, 768481e-11, 0, 0, .999716, 1342e-8, 0, 0, .999576, 232473e-10, 0, 0, .9993, 391694e-10, 0, 129917e-9, .998498, 608429e-10, 0, 845035e-9, .994132, 489743e-10, 0, .00237616, .99031, 384644e-10, 0, .00484456, .987409, 421768e-10, 0, .00832472, .983981, 504854e-10, 0, .0128643, .980268, 671028e-10, 0, .0184947, .974875, 852749e-10, 0, .025237, .966063, 85531e-9, 0, .0331046, .956779, 900588e-10, 0, .0421067, .950259, 10577e-8, 0, .0522487, .944239, 119458e-9, 0, .0635343, .936341, 122164e-9, 0, .0759654, .928047, 134929e-9, 0, .0895434, .918065, 145544e-9, 0, .104269, .906267, 150531e-9, 0, .120142, .893419, 161652e-9, 0, .137163, .878758, 16593e-8, 0, .15533, .863699, 174014e-9, 0, .174645, .848876, 177877e-9, 0, .195106, .833032, 184049e-9, 0, .21671, .815557, 186088e-9, 0, .239454, .797323, 19054e-8, 0, .263332, .778124, 191765e-9, 0, .288336, .758929, 192535e-9, 0, .314451, .738979, 192688e-9, 0, .341658, .718213, 191522e-9, 0, .369924, .696947, 190491e-9, 0, .399202, .675807, 187913e-9, 0, .429416, .654147, 184451e-9, 0, .460447, .63229, 181442e-9, 0, .492064, .610499, 177139e-9, 0, .523809, .588747, 172596e-9, 0, .555555, .566783, 167457e-9, 0, .587301, .545359, 162518e-9, 0, .619048, .523984, 156818e-9, 0, .650794, .502917, 151884e-9, 0, .68254, .482294, 145514e-9, 0, .714286, .461945, 140199e-9, 0, .746032, .442133, 134101e-9, 0, .777778, .422705, 128374e-9, 0, .809524, .403916, 122996e-9, 0, .84127, .38554, 116808e-9, 0, .873016, .367909, 111973e-9, 0, .904762, .350651, 105938e-9, 0, .936508, .334208, 101355e-9, 0, .968254, .318123, 957629e-10, 0, 1, 1, 111633e-11, 0, 0, 1, 111639e-11, 0, 0, 1, 111725e-11, 0, 0, 1, 112096e-11, 0, 0, .999999, 11311e-10, 0, 0, .999997, 115315e-11, 0, 0, .999995, 11956e-10, 0, 0, .999989, 127239e-11, 0, 0, .999981, 140772e-11, 0, 0, .999969, 164541e-11, 0, 0, .999952, 206607e-11, 0, 0, .999928, 281783e-11, 0, 0, .999895, 416835e-11, 0, 0, .999848, 658728e-11, 0, 0, .999781, 108648e-10, 0, 0, .999682, 182579e-10, 0, 0, .999523, 306003e-10, 0, 159122e-10, .999205, 499862e-10, 0, 391184e-9, .998131, 73306e-9, 0, .00147534, .993334, 513229e-10, 0, .0034227, .99016, 467783e-10, 0, .00632232, .987321, 523413e-10, 0, .0102295, .984099, 64267e-9, 0, .0151794, .980432, 843042e-10, 0, .0211947, .974976, 102819e-9, 0, .0282899, .966429, 996234e-10, 0, .0364739, .957633, 111074e-9, 0, .0457522, .949422, 128644e-9, 0, .0561278, .943045, 140076e-9, 0, .0676023, .935448, 146349e-9, 0, .0801762, .927225, 161854e-9, 0, .0938499, .917033, 169135e-9, 0, .108623, .905762, 179987e-9, 0, .124496, .892879, 189832e-9, 0, .141469, .878435, 195881e-9, 0, .159541, .863114, 20466e-8, 0, .178713, .84776, 209473e-9, 0, .198985, .832084, 214861e-9, 0, .220355, .814915, 217695e-9, 0, .242823, .796711, 220313e-9, 0, .266385, .777603, 22313e-8, 0, .291036, .757991, 222471e-9, 0, .316767, .738371, 222869e-9, 0, .343563, .717872, 221243e-9, 0, .371402, .696619, 218089e-9, 0, .400248, .675379, 21562e-8, 0, .430047, .65411, 21169e-8, 0, .460709, .63241, 206947e-9, 0, .492079, .61046, 201709e-9, 0, .52381, .58903, 196753e-9, 0, .555556, .567267, 189637e-9, 0, .587302, .545886, 184735e-9, 0, .619048, .524714, 177257e-9, 0, .650794, .503789, 171424e-9, 0, .68254, .483204, 164688e-9, 0, .714286, .462976, 157172e-9, 0, .746032, .443294, 151341e-9, 0, .777778, .423988, 143737e-9, 0, .809524, .405325, 138098e-9, 0, .84127, .386981, 130698e-9, 0, .873016, .369436, 125276e-9, 0, .904762, .35219, 118349e-9, 0, .936508, .335804, 11312e-8, 0, .968254, .319749, 106687e-9, 0, 1, 1, 204685e-11, 0, 0, 1, 204694e-11, 0, 0, 1, 204831e-11, 0, 0, .999999, 205428e-11, 0, 0, .999999, 207056e-11, 0, 0, .999997, 210581e-11, 0, 0, .999993, 21732e-10, 0, 0, .999987, 229365e-11, 0, 0, .999979, 250243e-11, 0, 0, .999965, 286127e-11, 0, 0, .999947, 348028e-11, 0, 0, .999918, 455588e-11, 0, 0, .999881, 643303e-11, 0, 0, .999828, 970064e-11, 0, 0, .999753, 153233e-10, 0, 0, .999642, 24793e-9, 0, 0, .999464, 402032e-10, 0, 122947e-9, .999089, 635852e-10, 0, 807414e-9, .997567, 857026e-10, 0, .00227206, .992903, 594912e-10, 0, .00462812, .990011, 578515e-10, 0, .00794162, .987192, 65399e-9, 0, .0122534, .98418, 819675e-10, 0, .0175888, .980491, 105514e-9, 0, .0239635, .974779, 121532e-9, 0, .031387, .96675, 119144e-9, 0, .0398644, .958248, 136125e-9, 0, .0493982, .948884, 155408e-9, 0, .0599896, .941673, 162281e-9, 0, .0716382, .934521, 176754e-9, 0, .0843437, .926205, 192873e-9, 0, .0981056, .916089, 200038e-9, 0, .112923, .904963, 213624e-9, 0, .128796, .892089, 221834e-9, 0, .145725, .878028, 232619e-9, 0, .163709, .86249, 238632e-9, 0, .182749, .846587, 247002e-9, 0, .202847, .830988, 250702e-9, 0, .224001, .814165, 255562e-9, 0, .246214, .796135, 257505e-9, 0, .269482, .777052, 258625e-9, 0, .293805, .757201, 258398e-9, 0, .319176, .737655, 256714e-9, 0, .345587, .717477, 255187e-9, 0, .373021, .696433, 251792e-9, 0, .401454, .675084, 247223e-9, 0, .430844, .653907, 242213e-9, 0, .461125, .632561, 237397e-9, 0, .492187, .610658, 229313e-9, 0, .52381, .589322, 224402e-9, 0, .555556, .567857, 216116e-9, 0, .587302, .54652, 209124e-9, 0, .619048, .525433, 201601e-9, 0, .650794, .504679, 192957e-9, 0, .68254, .484203, 186052e-9, 0, .714286, .464203, 177672e-9, 0, .746032, .444549, 170005e-9, 0, .777778, .425346, 162401e-9, 0, .809524, .406706, 1544e-7, 0, .84127, .388576, 147437e-9, 0, .873016, .37094, 139493e-9, 0, .904762, .353996, 133219e-9, 0, .936508, .337391, 125573e-9, 0, .968254, .321648, 119867e-9, 0, 1, 1, 362511e-11, 0, 0, 1, 362525e-11, 0, 0, 1, 362739e-11, 0, 0, .999999, 363673e-11, 0, 0, .999998, 366214e-11, 0, 0, .999996, 371698e-11, 0, 0, .999992, 382116e-11, 0, 0, .999986, 400554e-11, 0, 0, .999976, 432058e-11, 0, 0, .999961, 485194e-11, 0, 0, .999938, 574808e-11, 0, 0, .999908, 726643e-11, 0, 0, .999865, 984707e-11, 0, 0, .999807, 142217e-10, 0, 0, .999723, 215581e-10, 0, 0, .999602, 336114e-10, 0, 119113e-10, .999398, 527353e-10, 0, 355813e-9, .998946, 805809e-10, 0, .00137768, .996647, 942908e-10, 0, .00322469, .992298, 668733e-10, 0, .00597897, .989802, 716564e-10, 0, .00968903, .987019, 821355e-10, 0, .0143845, .984219, 104555e-9, 0, .0200831, .980425, 131245e-9, 0, .0267948, .974241, 139613e-9, 0, .034525, .967006, 145931e-9, 0, .0432757, .95893, 167153e-9, 0, .0530471, .949157, 188146e-9, 0, .0638386, .94062, 194625e-9, 0, .0756487, .933509, 213721e-9, 0, .0884762, .925088, 229616e-9, 0, .10232, .915178, 239638e-9, 0, .117178, .904093, 254814e-9, 0, .133051, .891337, 263685e-9, 0, .149939, .877326, 274789e-9, 0, .167841, .861794, 280534e-9, 0, .18676, .845758, 289534e-9, 0, .206696, .829792, 294446e-9, 0, .22765, .813037, 296877e-9, 0, .249625, .795285, 300217e-9, 0, .27262, .776323, 299826e-9, 0, .296636, .756673, 299787e-9, 0, .321671, .736856, 297867e-9, 0, .347718, .716883, 294052e-9, 0, .374768, .696089, 289462e-9, 0, .402804, .67505, 285212e-9, 0, .431796, .653509, 27653e-8, 0, .461695, .63258, 271759e-9, 0, .49242, .61104, 262811e-9, 0, .523822, .589567, 255151e-9, 0, .555556, .568322, 246434e-9, 0, .587302, .547235, 237061e-9, 0, .619048, .52616, 228343e-9, 0, .650794, .505716, 219236e-9, 0, .68254, .485274, 209595e-9, 0, .714286, .465411, 201011e-9, 0, .746032, .445854, 19109e-8, 0, .777778, .426911, 182897e-9, 0, .809524, .408222, 173569e-9, 0, .84127, .390307, 165496e-9, 0, .873016, .372624, 156799e-9, 0, .904762, .355804, 14917e-8, 0, .936508, .33924, 140907e-9, 0, .968254, .323534, 134062e-9, 0, 1, 1, 622487e-11, 0, 0, 1, 62251e-10, 0, 0, 1, 622837e-11, 0, 0, .999999, 624259e-11, 0, 0, .999998, 628127e-11, 0, 0, .999996, 636451e-11, 0, 0, .999991, 65218e-10, 0, 0, .999984, 679782e-11, 0, 0, .999973, 726361e-11, 0, 0, .999955, 803644e-11, 0, 0, .999931, 931397e-11, 0, 0, .999896, 114299e-10, 0, 0, .999847, 149402e-10, 0, 0, .999784, 207461e-10, 0, 0, .999692, 302493e-10, 0, 0, .999554, 454957e-10, 0, 997275e-10, .999326, 690762e-10, 0, 724813e-9, .998757, 101605e-9, 0, .0020972, .995367, 958745e-10, 0, .00432324, .99209, 832808e-10, 0, .00746347, .989517, 887601e-10, 0, .0115534, .987008, 10564e-8, 0, .0166134, .98421, 133179e-9, 0, .0226552, .98021, 161746e-9, 0, .0296838, .973676, 161821e-9, 0, .0377016, .967052, 178635e-9, 0, .0467079, .959385, 206765e-9, 0, .0567013, .949461, 22476e-8, 0, .0676796, .939578, 23574e-8, 0, .0796403, .932416, 25893e-8, 0, .0925812, .923759, 271228e-9, 0, .106501, .914223, 289165e-9, 0, .121397, .902942, 301156e-9, 0, .13727, .890419, 313852e-9, 0, .15412, .876639, 324408e-9, 0, .171946, .861316, 33249e-8, 0, .190751, .84496, 338497e-9, 0, .210537, .828427, 345861e-9, 0, .231305, .811871, 347863e-9, 0, .253057, .794397, 350225e-9, 0, .275797, .775726, 349915e-9, 0, .299525, .75617, 347297e-9, 0, .324242, .736091, 344232e-9, 0, .349947, .716213, 340835e-9, 0, .376633, .695736, 332369e-9, 0, .404289, .674961, 327943e-9, 0, .432895, .653518, 318533e-9, 0, .462415, .632574, 310391e-9, 0, .492788, .61134, 300755e-9, 0, .523909, .590017, 290506e-9, 0, .555556, .568752, 280446e-9, 0, .587302, .548061, 269902e-9, 0, .619048, .52711, 258815e-9, 0, .650794, .506682, 248481e-9, 0, .68254, .486524, 237141e-9, 0, .714286, .466812, 226872e-9, 0, .746032, .44732, 216037e-9, 0, .777778, .428473, 205629e-9, 0, .809524, .409921, 195691e-9, 0, .84127, .392028, 185457e-9, 0, .873016, .374606, 176436e-9, 0, .904762, .357601, 166508e-9, 0, .936508, .341348, 158385e-9, 0, .968254, .32542, 149203e-9, 0, 1, 1, 103967e-10, 0, 0, 1, 10397e-9, 0, 0, 1, 104019e-10, 0, 0, .999999, 104231e-10, 0, 0, .999998, 104806e-10, 0, 0, .999995, 106042e-10, 0, 0, .999991, 108366e-10, 0, 0, .999982, 112415e-10, 0, 0, .999968, 119174e-10, 0, 0, .99995, 130227e-10, 0, 0, .999922, 148176e-10, 0, 0, .999884, 177303e-10, 0, 0, .99983, 224564e-10, 0, 0, .999758, 300966e-10, 0, 0, .999654, 423193e-10, 0, 549083e-11, .999503, 614848e-10, 0, 296087e-9, .999237, 903576e-10, 0, .00123144, .998491, 1271e-7, 0, .00295954, .994594, 107754e-9, 0, .00555829, .99178, 103025e-9, 0, .00907209, .989265, 11154e-8, 0, .0135257, .986998, 136296e-9, 0, .0189327, .984137, 169154e-9, 0, .0252993, .979798, 196671e-9, 0, .0326272, .97337, 196678e-9, 0, .0409157, .967239, 223121e-9, 0, .0501623, .959543, 253809e-9, 0, .0603638, .949466, 265972e-9, 0, .0715171, .939074, 288372e-9, 0, .0836187, .931118, 310983e-9, 0, .0966657, .922525, 325561e-9, 0, .110656, .912983, 345725e-9, 0, .125588, .901617, 3556e-7, 0, .141461, .889487, 374012e-9, 0, .158275, .875787, 383445e-9, 0, .176031, .860654, 393972e-9, 0, .19473, .844417, 400311e-9, 0, .214374, .82741, 405004e-9, 0, .234967, .810545, 407378e-9, 0, .256512, .793312, 407351e-9, 0, .279011, .774847, 406563e-9, 0, .302468, .755621, 404903e-9, 0, .326887, .735511, 397486e-9, 0, .352266, .715435, 39357e-8, 0, .378605, .695403, 384739e-9, 0, .405897, .674681, 376108e-9, 0, .43413, .65359, 365997e-9, 0, .463277, .632471, 354957e-9, 0, .493295, .61151, 343593e-9, 0, .524106, .59064, 331841e-9, 0, .555561, .569386, 318891e-9, 0, .587302, .548785, 3072e-7, 0, .619048, .528146, 29361e-8, 0, .650794, .507872, 281709e-9, 0, .68254, .487805, 268627e-9, 0, .714286, .468196, 255887e-9, 0, .746032, .448922, 243997e-9, 0, .777778, .430093, 231662e-9, 0, .809524, .411845, 220339e-9, 0, .84127, .393808, 208694e-9, 0, .873016, .376615, 198045e-9, 0, .904762, .359655, 187375e-9, 0, .936508, .343452, 177371e-9, 0, .968254, .32765, 167525e-9, 0, 1, 1, 169351e-10, 0, 0, 1, 169356e-10, 0, 0, 1, 169427e-10, 0, 0, .999999, 169736e-10, 0, 0, .999998, 170575e-10, 0, 0, .999995, 172372e-10, 0, 0, .99999, 175739e-10, 0, 0, .999979, 181568e-10, 0, 0, .999966, 191206e-10, 0, 0, .999944, 20677e-9, 0, 0, .999912, 231644e-10, 0, 0, .999869, 271268e-10, 0, 0, .999811, 334272e-10, 0, 0, .99973, 433979e-10, 0, 0, .999617, 590083e-10, 0, 680315e-10, .999445, 829497e-10, 0, 612796e-9, .999138, 118019e-9, 0, .00187408, .998095, 156712e-9, 0, .00395791, .993919, 125054e-9, 0, .00692144, .991333, 126091e-9, 0, .0107962, .989226, 144912e-9, 0, .0155986, .986954, 175737e-9, 0, .0213364, .983982, 213883e-9, 0, .0280114, .979128, 234526e-9, 0, .0356226, .973327, 243725e-9, 0, .0441668, .967416, 2773e-7, 0, .0536399, .959729, 308799e-9, 0, .0640376, .949758, 322447e-9, 0, .0753554, .939173, 350021e-9, 0, .0875893, .9296, 370089e-9, 0, .100736, .921181, 391365e-9, 0, .114793, .91164, 413636e-9, 0, .129759, .900435, 427068e-9, 0, .145632, .888183, 441046e-9, 0, .162412, .874772, 454968e-9, 0, .180101, .859566, 461882e-9, 0, .1987, .843579, 471556e-9, 0, .218213, .826453, 474335e-9, 0, .238641, .809164, 477078e-9, 0, .259989, .792179, 47755e-8, 0, .282262, .773866, 472573e-9, 0, .305464, .754944, 469765e-9, 0, .329599, .735133, 462371e-9, 0, .35467, .714858, 453674e-9, 0, .380678, .694829, 443888e-9, 0, .407622, .674453, 432052e-9, 0, .435493, .653685, 420315e-9, 0, .464275, .632666, 406829e-9, 0, .493938, .611676, 392234e-9, 0, .524422, .591193, 379208e-9, 0, .555624, .570145, 36319e-8, 0, .587302, .549566, 349111e-9, 0, .619048, .529278, 334166e-9, 0, .650794, .509026, 318456e-9, 0, .68254, .489186, 30449e-8, 0, .714286, .469662, 289051e-9, 0, .746032, .450691, 275494e-9, 0, .777778, .431841, 261437e-9, 0, .809524, .413752, 247846e-9, 0, .84127, .395951, 235085e-9, 0, .873016, .378633, 222245e-9, 0, .904762, .36194, 210533e-9, 0, .936508, .345599, 198494e-9, 0, .968254, .329999, 188133e-9, 0, 1, 1, 269663e-10, 0, 0, 1, 26967e-9, 0, 0, 1, 269772e-10, 0, 0, .999999, 270214e-10, 0, 0, .999998, 271415e-10, 0, 0, .999994, 27398e-9, 0, 0, .999988, 278771e-10, 0, 0, .999977, 287019e-10, 0, 0, .999961, 300544e-10, 0, 0, .999937, 322138e-10, 0, 0, .999904, 356163e-10, 0, 0, .999854, 409465e-10, 0, 0, .99979, 492651e-10, 0, 0, .999699, 621722e-10, 0, 88288e-11, .999572, 819715e-10, 0, 223369e-9, .999381, 111689e-9, 0, .00105414, .999016, 153862e-9, 0, .0026493, .997437, 187667e-9, 0, .00508608, .993545, 155672e-9, 0, .00840554, .991135, 161455e-9, 0, .012629, .989157, 188241e-9, 0, .0177661, .986874, 226229e-9, 0, .0238198, .983714, 268668e-9, 0, .0307887, .978301, 277109e-9, 0, .0386688, .973227, 303446e-9, 0, .0474554, .967317, 341851e-9, 0, .0571428, .959477, 370885e-9, 0, .0677256, .950012, 392753e-9, 0, .0791988, .939484, 42781e-8, 0, .0915576, .928135, 443866e-9, 0, .104798, .919819, 472959e-9, 0, .118918, .910049, 491551e-9, 0, .133915, .899181, 512616e-9, 0, .149788, .886881, 523563e-9, 0, .166537, .87359, 540183e-9, 0, .184164, .858613, 547386e-9, 0, .202669, .842809, 554809e-9, 0, .222056, .825727, 558316e-9, 0, .242329, .808086, 557824e-9, 0, .263492, .790728, 556346e-9, 0, .285551, .772987, 552672e-9, 0, .30851, .7541, 543738e-9, 0, .332376, .734669, 536107e-9, 0, .357153, .714411, 523342e-9, 0, .382845, .694196, 512238e-9, 0, .409454, .674252, 497465e-9, 0, .436977, .65357, 481096e-9, 0, .465404, .632999, 467054e-9, 0, .494713, .611994, 448771e-9, 0, .524864, .591604, 431889e-9, 0, .555779, .571134, 415238e-9, 0, .587302, .550528, 396369e-9, 0, .619048, .530292, 379477e-9, 0, .650794, .510364, 361488e-9, 0, .68254, .490749, 343787e-9, 0, .714286, .471266, 327822e-9, 0, .746032, .452462, 310626e-9, 0, .777778, .433907, 295352e-9, 0, .809524, .415659, 279179e-9, 0, .84127, .398138, 264685e-9, 0, .873016, .380833, 249905e-9, 0, .904762, .364247, 236282e-9, 0, .936508, .348041, 222905e-9, 0, .968254, .332389, 210522e-9, 0, 1, 1, 420604e-10, 0, 0, 1, 420614e-10, 0, 0, 1, 420757e-10, 0, 0, .999999, 42138e-9, 0, 0, .999997, 423067e-10, 0, 0, .999993, 426668e-10, 0, 0, .999986, 433372e-10, 0, 0, .999974, 444857e-10, 0, 0, .999956, 463554e-10, 0, 0, .99993, 493105e-10, 0, 0, .999892, 539077e-10, 0, 0, .999838, 610005e-10, 0, 0, .999767, 718822e-10, 0, 0, .999666, 884581e-10, 0, 365471e-10, .999525, 113398e-9, 0, 485623e-9, .999311, 150043e-9, 0, .00162096, .998865, 200063e-9, 0, .00355319, .996278, 211014e-9, 0, .00633818, .992956, 189672e-9, 0, .0100043, .991017, 210262e-9, 0, .0145648, .989055, 244292e-9, 0, .0200237, .986741, 290481e-9, 0, .0263798, .983288, 334303e-9, 0, .033629, .977784, 340307e-9, 0, .0417652, .973037, 377864e-9, 0, .0507821, .967181, 4239e-7, 0, .060673, .958971, 443854e-9, 0, .0714314, .950093, 483039e-9, 0, .0830518, .939552, 517934e-9, 0, .0955288, .927678, 539449e-9, 0, .108859, .918278, 568604e-9, 0, .123038, .908449, 588505e-9, 0, .138065, .897713, 612473e-9, 0, .153938, .885533, 625575e-9, 0, .170657, .872131, 63854e-8, 0, .188224, .857517, 647034e-9, 0, .20664, .841796, 65209e-8, 0, .225909, .824726, 6544e-7, 0, .246035, .807297, 655744e-9, 0, .267022, .789058, 646716e-9, 0, .288878, .77189, 643898e-9, 0, .311607, .753082, 629973e-9, 0, .335216, .7341, 621564e-9, 0, .359713, .714094, 605171e-9, 0, .385103, .693839, 588752e-9, 0, .41139, .673891, 573294e-9, 0, .438576, .653565, 552682e-9, 0, .466656, .633326, 533446e-9, 0, .495617, .612582, 514635e-9, 0, .525431, .59205, 49303e-8, 0, .556041, .571918, 471842e-9, 0, .587338, .551572, 451713e-9, 0, .619048, .531553, 430049e-9, 0, .650794, .51175, 410445e-9, 0, .68254, .49238, 390098e-9, 0, .714286, .473143, 370033e-9, 0, .746032, .45423, 351205e-9, 0, .777778, .435963, 332049e-9, 0, .809524, .41787, 315021e-9, 0, .84127, .400387, 297315e-9, 0, .873016, .383332, 281385e-9, 0, .904762, .366665, 265397e-9, 0, .936508, .350633, 250601e-9, 0, .968254, .334964, 23589e-8, 0, 1, 1, 643736e-10, 0, 0, 1, 64375e-9, 0, 0, 1, 643947e-10, 0, 0, .999999, 64481e-9, 0, 0, .999997, 647143e-10, 0, 0, .999994, 652119e-10, 0, 0, .999985, 661359e-10, 0, 0, .999972, 677116e-10, 0, 0, .999952, 702599e-10, 0, 0, .999922, 742517e-10, 0, 0, .99988, 803906e-10, 0, 0, .99982, 897315e-10, 0, 0, .999741, 103838e-9, 0, 0, .999629, 12496e-8, 0, 149024e-9, .999474, 156161e-9, 0, 861027e-9, .999229, 201034e-9, 0, .00231198, .998662, 259069e-9, 0, .00458147, .995299, 245439e-9, 0, .00770895, .992732, 24498e-8, 0, .0117126, .990847, 273211e-9, 0, .0165989, .988911, 316492e-9, 0, .0223674, .98654, 37161e-8, 0, .0290135, .982636, 410352e-9, 0, .0365309, .977346, 421756e-9, 0, .0449117, .972909, 475578e-9, 0, .0541481, .966821, 522482e-9, 0, .0642326, .958686, 545008e-9, 0, .075158, .949754, 589286e-9, 0, .0869181, .939184, 619995e-9, 0, .0995074, .927505, 654266e-9, 0, .112922, .916606, 682362e-9, 0, .127157, .906707, 704286e-9, 0, .142212, .895937, 725909e-9, 0, .158085, .883913, 743939e-9, 0, .174776, .870642, 755157e-9, 0, .192287, .856241, 764387e-9, 0, .210619, .84069, 771032e-9, 0, .229775, .823728, 765906e-9, 0, .249761, .806481, 767604e-9, 0, .270582, .787924, 754385e-9, 0, .292243, .770588, 749668e-9, 0, .314753, .751991, 731613e-9, 0, .338118, .733407, 717655e-9, 0, .362347, .713688, 700604e-9, 0, .387447, .693595, 678765e-9, 0, .413424, .673426, 657042e-9, 0, .440284, .65359, 635892e-9, 0, .468027, .633576, 611569e-9, 0, .496645, .613144, 586011e-9, 0, .526122, .592711, 563111e-9, 0, .556417, .572722, 537699e-9, 0, .587451, .552762, 512556e-9, 0, .619048, .532985, 489757e-9, 0, .650794, .513219, 464139e-9, 0, .68254, .493992, 442193e-9, 0, .714286, .47509, 418629e-9, 0, .746032, .456287, 397045e-9, 0, .777778, .438152, 375504e-9, 0, .809524, .420294, 35492e-8, 0, .84127, .402749, 335327e-9, 0, .873016, .385879, 316422e-9, 0, .904762, .369352, 298333e-9, 0, .936508, .353301, 281417e-9, 0, .968254, .337781, 265203e-9, 0, 1, 1, 968267e-10, 0, 0, 1, 968284e-10, 0, 0, 1, 968556e-10, 0, 0, .999999, 969733e-10, 0, 0, .999997, 972913e-10, 0, 0, .999993, 979688e-10, 0, 0, .999984, 992239e-10, 0, 0, .999969, 101356e-9, 0, 0, .999946, 104784e-9, 0, 0, .999913, 110111e-9, 0, 0, .999868, 118217e-9, 0, 0, .999801, 130396e-9, 0, 0, .999712, 148523e-9, 0, 124907e-10, .999589, 175233e-9, 0, 355405e-9, .999416, 213999e-9, 0, .0013528, .999136, 268529e-9, 0, .00312557, .998367, 333088e-9, 0, .00573045, .994701, 304757e-9, 0, .00919397, .992497, 318031e-9, 0, .0135261, .990608, 353863e-9, 0, .0187278, .988715, 409044e-9, 0, .0247947, .986241, 472967e-9, 0, .0317196, .981696, 495104e-9, 0, .039494, .977097, 532873e-9, 0, .0481087, .972583, 594447e-9, 0, .0575549, .966142, 636867e-9, 0, .0678242, .95823, 669899e-9, 0, .0789089, .949677, 719499e-9, 0, .0908023, .939226, 750584e-9, 0, .103499, .927501, 793183e-9, 0, .116993, .915199, 81995e-8, 0, .131282, .90498, 847654e-9, 0, .146364, .894243, 868929e-9, 0, .162237, .882154, 884278e-9, 0, .178902, .869161, 898108e-9, 0, .196358, .854751, 901254e-9, 0, .21461, .839368, 90679e-8, 0, .23366, .822874, 901541e-9, 0, .253512, .805514, 897297e-9, 0, .274174, .78716, 881856e-9, 0, .29565, .769061, 870032e-9, 0, .31795, .751, 851719e-9, 0, .341081, .732614, 830671e-9, 0, .365053, .713171, 806569e-9, 0, .389874, .693472, 78338e-8, 0, .415553, .673528, 756404e-9, 0, .442098, .653397, 726872e-9, 0, .469512, .633781, 700494e-9, 0, .497794, .613877, 67105e-8, 0, .526935, .593506, 640361e-9, 0, .556908, .573667, 613502e-9, 0, .587657, .553932, 583177e-9, 0, .61906, .534345, 554375e-9, 0, .650794, .515042, 527811e-9, 0, .68254, .495674, 499367e-9, 0, .714286, .477132, 47429e-8, 0, .746032, .458609, 447726e-9, 0, .777778, .440354, 424205e-9, 0, .809524, .422765, 399549e-9, 0, .84127, .405472, 378315e-9, 0, .873016, .388482, 355327e-9, 0, .904762, .372191, 336122e-9, 0, .936508, .356099, 315247e-9, 0, .968254, .340737, 29794e-8, 0, 1, 1, 143327e-9, 0, 0, 1, 14333e-8, 0, 0, 1, 143366e-9, 0, 0, .999999, 143524e-9, 0, 0, .999996, 143952e-9, 0, 0, .999991, 144862e-9, 0, 0, .999981, 146544e-9, 0, 0, .999966, 149391e-9, 0, 0, .999941, 153946e-9, 0, 0, .999905, 160971e-9, 0, 0, .999852, 171562e-9, 0, 0, .99978, 18729e-8, 0, 0, .999681, 210386e-9, 0, 826239e-10, .999546, 243906e-9, 0, 664807e-9, .999352, 291739e-9, 0, .00196192, .999027, 357419e-9, 0, .00405941, .997886, 422349e-9, 0, .00699664, .99419, 385008e-9, 0, .0107896, .99214, 409775e-9, 0, .0154415, .990274, 456418e-9, 0, .0209488, .988455, 527008e-9, 0, .0273037, .985804, 597685e-9, 0, .0344969, .98103, 613124e-9, 0, .0425183, .976674, 668321e-9, 0, .0513575, .972021, 736985e-9, 0, .0610046, .965274, 773789e-9, 0, .0714508, .958046, 830852e-9, 0, .0826877, .949333, 875766e-9, 0, .0947085, .939135, 917088e-9, 0, .107507, .927119, 952244e-9, 0, .121078, .91469, 990626e-9, 0, .135419, .903006, .00101304, 0, .150526, .892368, .00103834, 0, .166399, .880231, .00105002, 0, .183038, .867432, .00106331, 0, .200443, .853208, .00106783, 0, .218618, .837956, .00106458, 0, .237566, .821772, .00105945, 0, .257291, .804328, .00104685, 0, .2778, .786465, .00103178, 0, .2991, .768004, .00101077, 0, .321199, .74972, 985504e-9, 0, .344106, .731682, 962893e-9, 0, .36783, .712813, 932146e-9, 0, .392383, .693139, 89871e-8, 0, .417774, .673566, 869678e-9, 0, .444013, .653483, 835525e-9, 0, .471107, .633891, 799853e-9, 0, .49906, .614433, 766838e-9, 0, .527869, .594586, 732227e-9, 0, .557517, .574769, 696442e-9, 0, .587966, .555149, 663935e-9, 0, .61913, .535898, 629826e-9, 0, .650794, .516753, 596486e-9, 0, .68254, .497816, 567078e-9, 0, .714286, .479034, 534399e-9, 0, .746032, .460975, 507013e-9, 0, .777778, .442935, 477421e-9, 0, .809524, .425263, 451101e-9, 0, .84127, .408248, 424964e-9, 0, .873016, .391339, 39993e-8, 0, .904762, .37513, 377619e-9, 0, .936508, .359172, 354418e-9, 0, .968254, .343876, 334823e-9, 0, 1, 1, 209042e-9, 0, 0, 1, 209045e-9, 0, 0, 1, 209093e-9, 0, 0, .999999, 209304e-9, 0, 0, .999996, 209871e-9, 0, 0, .999991, 211078e-9, 0, 0, .999979, 213304e-9, 0, 0, .999963, 217061e-9, 0, 0, .999933, 223042e-9, 0, 0, .999894, 232206e-9, 0, 0, .999837, 245901e-9, 0, 0, .999756, 266023e-9, 0, 102927e-11, .999648, 295204e-9, 0, 233468e-9, .999499, 336958e-9, 0, .00108237, .999283, 395563e-9, 0, .00268832, .998896, 473785e-9, 0, .00511138, .997006, 520008e-9, 0, .00837705, .993819, 497261e-9, 0, .0124928, .991632, 523722e-9, 0, .0174561, .989875, 587258e-9, 0, .0232596, .988109, 676329e-9, 0, .0298932, .985155, 747701e-9, 0, .0373453, .980479, 768803e-9, 0, .0456045, .976271, 841054e-9, 0, .0546593, .971347, 911469e-9, 0, .0644994, .964528, 953057e-9, 0, .0751152, .957632, .00102221, 0, .0864981, .948681, .00106122, 0, .0986407, .938716, .00111857, 0, .111537, .926629, .00114762, 0, .125182, .914025, .00118995, 0, .139571, .901026, .00121228, 0, .154703, .890358, .00123946, 0, .170576, .878283, .0012527, 0, .18719, .865459, .00125536, 0, .204547, .851407, .00126134, 0, .222648, .836276, .00124759, 0, .241498, .820436, .00124443, 0, .261101, .803253, .00122071, 0, .281465, .785562, .00120107, 0, .302595, .76718, .00117762, 0, .324501, .748551, .00114289, 0, .347192, .730564, .00110872, 0, .370679, .712253, .00107636, 0, .394973, .692867, .00103646, 0, .420085, .673695, 996793e-9, 0, .446027, .653912, 95675e-8, 0, .47281, .634129, 916739e-9, 0, .500441, .615004, 874401e-9, 0, .528921, .595587, 833411e-9, 0, .558244, .575965, 794556e-9, 0, .588384, .5566, 75196e-8, 0, .619281, .537428, 716381e-9, 0, .650795, .518623, 676558e-9, 0, .68254, .499964, 64074e-8, 0, .714286, .481356, 605984e-9, 0, .746032, .463279, 570256e-9, 0, .777778, .445673, 540138e-9, 0, .809524, .428032, 507299e-9, 0, .84127, .411112, 479553e-9, 0, .873016, .394444, 450737e-9, 0, .904762, .378247, 424269e-9, 0, .936508, .362415, 399111e-9, 0, .968254, .347103, 375274e-9, 0, 1, 1, 300729e-9, 0, 0, 1, 300733e-9, 0, 0, 1, 300797e-9, 0, 0, .999998, 301072e-9, 0, 0, .999996, 301817e-9, 0, 0, .999989, 303398e-9, 0, 0, .999977, 306309e-9, 0, 0, .999958, 311209e-9, 0, 0, .999927, 318975e-9, 0, 0, .999884, 330804e-9, 0, 0, .99982, 34834e-8, 0, 0, .999733, 373854e-9, 0, 326995e-10, .999613, 410424e-9, 0, 477174e-9, .999447, 462047e-9, 0, .00161099, .999204, 533322e-9, 0, .00353153, .998725, 624964e-9, 0, .00627965, .995871, 631786e-9, 0, .0098693, .993194, 632017e-9, 0, .0143011, .991541, 68923e-8, 0, .019568, .989773, 766892e-9, 0, .0256593, .987647, 863668e-9, 0, .0325625, .984193, 922089e-9, 0, .0402647, .980016, 970749e-9, 0, .0487532, .975859, .00106027, 0, .058016, .970514, .00112239, 0, .0680419, .963625, .00117212, 0, .0788208, .956959, .00125211, 0, .0903439, .947956, .00129411, 0, .102604, .93809, .00135879, 0, .115594, .92659, .00139309, 0, .129309, .913829, .00143253, 0, .143745, .90005, .00145809, 0, .158901, .888129, .0014748, 0, .174774, .87607, .00148756, 0, .191365, .863461, .00148714, 0, .208674, .849594, .00148892, 0, .226705, .834531, .00146496, 0, .245461, .81903, .0014579, 0, .264947, .802122, .00143039, 0, .28517, .78445, .00139717, 0, .306137, .766434, .00136312, 0, .327857, .747816, .00132597, 0, .350341, .729519, .00128323, 0, .373598, .711454, .00123803, 0, .397642, .692699, .00119097, 0, .422485, .673723, .00114565, 0, .448139, .654386, .00109552, 0, .474619, .634673, .00104553, 0, .501933, .615554, 99985e-8, 0, .530089, .596462, 948207e-9, 0, .559087, .577385, 902299e-9, 0, .588913, .558257, 856448e-9, 0, .619525, .5392, 810395e-9, 0, .650826, .520543, 768558e-9, 0, .68254, .502206, 7239e-7, 0, .714286, .48402, 685794e-9, 0, .746032, .465779, 64471e-8, 0, .777778, .448455, 609583e-9, 0, .809524, .431091, 57227e-8, 0, .84127, .414147, 54042e-8, 0, .873016, .39765, 506545e-9, 0, .904762, .381576, 477635e-9, 0, .936508, .365881, 448446e-9, 0, .968254, .350582, 421424e-9, 0, 1, 1, 427144e-9, 0, 0, 1, 427151e-9, 0, 0, 1, 427232e-9, 0, 0, .999998, 42759e-8, 0, 0, .999995, 428555e-9, 0, 0, .999988, 430603e-9, 0, 0, .999976, 434368e-9, 0, 0, .999952, 440688e-9, 0, 0, .999919, 450667e-9, 0, 0, .999871, 46578e-8, 0, 0, .999801, 488024e-9, 0, 0, .999704, 520092e-9, 0, 129791e-9, .999572, 565553e-9, 0, 821056e-9, .999389, 628906e-9, 0, .00225241, .999114, 714911e-9, 0, .00449109, .998488, 819218e-9, 0, .00756249, .995234, 80415e-8, 0, .0114716, .993021, 830181e-9, 0, .0162131, .991407, 902645e-9, 0, .021776, .989625, 996934e-9, 0, .0281471, .987064, .00109707, 0, .0353118, .983265, .00114353, 0, .0432562, .979535, .0012272, 0, .0519665, .975224, .00132642, 0, .0614298, .969574, .00138092, 0, .0716348, .963021, .00145896, 0, .0825709, .956046, .00152834, 0, .094229, .947136, .00158217, 0, .106602, .937313, .0016347, 0, .119682, .926073, .00168383, 0, .133465, .913121, .00171627, 0, .147947, .899165, .00174229, 0, .163125, .885891, .00176137, 0, .178998, .873783, .00176406, 0, .195566, .861331, .00176156, 0, .21283, .847569, .00175346, 0, .230793, .832785, .00172753, 0, .249459, .817442, .00170204, 0, .268832, .800613, .00166576, 0, .28892, .783597, .00162909, 0, .30973, .76571, .0015826, 0, .331271, .747021, .00153106, 0, .353554, .728593, .00148036, 0, .37659, .710661, .00142808, 0, .400391, .692426, .00136906, 0, .424973, .673623, .00131066, 0, .450347, .65494, .00125569, 0, .476531, .635448, .00119517, 0, .503535, .616221, .00113828, 0, .531372, .597531, .0010816, 0, .560047, .578795, .00102673, 0, .589554, .559892, 970985e-9, 0, .619869, .541307, 919773e-9, 0, .650923, .522608, 868479e-9, 0, .68254, .504484, 82137e-8, 0, .714286, .486603, 772916e-9, 0, .746032, .468802, 730353e-9, 0, .777778, .451172, 684955e-9, 0, .809524, .434348, 647565e-9, 0, .84127, .417445, 605863e-9, 0, .873016, .401077, 571885e-9, 0, .904762, .385039, 536034e-9, 0, .936508, .369483, 504227e-9, 0, .968254, .354272, 473165e-9, 0, 1, 1, 599525e-9, 0, 0, 1, 599533e-9, 0, 0, 1, 599639e-9, 0, 0, .999998, 600097e-9, 0, 0, .999994, 601336e-9, 0, 0, .999987, 603958e-9, 0, 0, .999972, 608775e-9, 0, 0, .999949, 616842e-9, 0, 0, .999912, 629534e-9, 0, 0, .999857, 648658e-9, 0, 0, .999781, 676615e-9, 0, 538873e-11, .999674, 716574e-9, 0, 308602e-9, .999528, 772641e-9, 0, .00127003, .999326, 849806e-9, 0, .00300783, .999009, 952682e-9, 0, .00556637, .998112, .00106394, 0, .00895889, .994496, .00102228, 0, .0131827, .992806, .00108586, 0, .0182277, .991211, .0011759, 0, .0240795, .989415, .00128955, 0, .030723, .986499, .00139038, 0, .0381418, .982679, .00144539, 0, .046321, .978839, .00153954, 0, .0552459, .974295, .00164417, 0, .0649034, .968784, .00171517, 0, .0752814, .962324, .00180282, 0, .0863693, .954956, .00186387, 0, .0981578, .94624, .00193817, 0, .110639, .936517, .00198156, 0, .123806, .925186, .00203042, 0, .137655, .91252, .0020664, 0, .15218, .898441, .00207822, 0, .16738, .884394, .0020992, 0, .183253, .871273, .00208748, 0, .199799, .859057, .00208686, 0, .21702, .845243, .00205519, 0, .234918, .830723, .00202868, 0, .253496, .815801, .00199501, 0, .272761, .79914, .00194193, 0, .292719, .782372, .00188824, 0, .313377, .76482, .00183695, 0, .334745, .746586, .00177418, 0, .356833, .7281, .00170628, 0, .379654, .709842, .00164063, 0, .403221, .692019, .00157355, 0, .427548, .67364, .00150262, 0, .452651, .655277, .00143473, 0, .478545, .636438, .00136371, 0, .505246, .617364, .00129911, 0, .532768, .598603, .00123014, 0, .561122, .580195, .00116587, 0, .590309, .561786, .00110398, 0, .620318, .543377, .00104148, 0, .651102, .525093, 983984e-9, 0, .682545, .506791, 92667e-8, 0, .714286, .489291, 874326e-9, 0, .746032, .471811, 821734e-9, 0, .777778, .454435, 774698e-9, 0, .809524, .437493, 727302e-9, 0, .84127, .420977, 684039e-9, 0, .873016, .404729, 64373e-8, 0, .904762, .388756, 60285e-8, 0, .936508, .373344, 56765e-8, 0, .968254, .358191, 531929e-9, 0, 1, 1, 832169e-9, 0, 0, 1, 832178e-9, 0, 0, 1, 83231e-8, 0, 0, .999998, 832893e-9, 0, 0, .999995, 834465e-9, 0, 0, .999985, 837791e-9, 0, 0, .999969, 843893e-9, 0, 0, .999944, 854086e-9, 0, 0, .999903, 870071e-9, 0, 0, .999843, 894042e-9, 0, 0, .999759, 928865e-9, 0, 531805e-10, .999643, 978242e-9, 0, 579365e-9, .99948, .00104684, 0, .00182774, .999255, .00114012, 0, .00387804, .998885, .00126188, 0, .00675709, .997405, .00135888, 0, .010468, .99424, .00133626, 0, .0150018, .992458, .00140905, 0, .0203443, .990929, .00152305, 0, .0264786, .989116, .00165882, 0, .0333875, .985624, .00174128, 0, .0410536, .982003, .00182108, 0, .0494609, .978336, .00194498, 0, .0585941, .973184, .00202708, 0, .0684396, .9678, .00212166, 0, .0789851, .961348, .00221366, 0, .0902199, .953841, .00228219, 0, .102134, .94534, .00235662, 0, .114721, .935552, .00240572, 0, .127972, .924064, .00244405, 0, .141884, .911827, .00247557, 0, .156451, .897731, .00248374, 0, .171672, .883409, .00249863, 0, .187545, .868625, .00246688, 0, .20407, .856529, .00246523, 0, .221249, .842999, .00242368, 0, .239083, .828505, .00237354, 0, .257578, .813825, .00232588, 0, .276738, .797813, .00226731, 0, .296569, .781097, .00219704, 0, .31708, .764038, .00212394, 0, .338281, .746067, .00204786, 0, .360181, .727687, .00196728, 0, .382794, .709571, .00188779, 0, .406133, .691503, .00180532, 0, .430213, .673673, .00171849, 0, .45505, .655732, .00164147, 0, .480662, .637399, .00155858, 0, .507065, .618616, .00147641, 0, .534278, .60005, .00140125, 0, .562313, .581713, .00132441, 0, .59118, .563546, .00125014, 0, .620875, .545605, .00118249, 0, .651373, .527559, .0011116, 0, .682593, .509764, .00104979, 0, .714286, .49193, 985977e-9, 0, .746032, .475011, 928592e-9, 0, .777778, .457878, 873466e-9, 0, .809524, .440979, 819585e-9, 0, .84127, .424613, 772365e-9, 0, .873016, .408549, 722195e-9, 0, .904762, .392771, 680014e-9, 0, .936508, .377317, 636797e-9, 0, .968254, .362352, 598318e-9, 0, 1, 1, .00114313, 0, 0, 1, .00114314, 0, 0, .999999, .00114331, 0, 0, .999998, .00114404, 0, 0, .999994, .00114601, 0, 0, .999984, .00115019, 0, 0, .999967, .00115784, 0, 0, .999937, .0011706, 0, 0, .999894, .00119054, 0, 0, .999828, .00122031, 0, 0, .999735, .00126331, 0, 169263e-9, .999606, .00132382, 0, 949167e-9, .999426, .0014071, 0, .00249668, .999173, .00151895, 0, .00486392, .99873, .00166102, 0, .00806323, .996243, .0017023, 0, .0120895, .993779, .00172782, 0, .0169288, .9919, .0018108, 0, .0225633, .990524, .00196028, 0, .028974, .98868, .00212014, 0, .036142, .984663, .00217598, 0, .044049, .981457, .00230563, 0, .0526781, .977608, .00243966, 0, .0620137, .972215, .00251336, 0, .0720418, .966798, .0026285, 0, .0827499, .960241, .00271409, 0, .0941271, .952489, .00278381, 0, .106164, .944127, .00285399, 0, .118852, .934282, .00290994, 0, .132185, .923271, .00294558, 0, .146157, .910803, .00296269, 0, .160766, .896705, .00296803, 0, .176007, .88238, .00296637, 0, .19188, .867116, .00293163, 0, .208385, .853636, .00289418, 0, .225523, .840469, .00284663, 0, .243296, .82639, .00278594, 0, .261709, .811759, .00271618, 0, .280767, .796113, .00263187, 0, .300476, .779518, .00254589, 0, .320845, .763142, .00246003, 0, .341883, .745464, .00236529, 0, .363601, .727491, .00226536, 0, .386011, .709414, .00216375, 0, .409128, .691396, .00207127, 0, .432967, .67368, .00197106, 0, .457545, .656049, .00187022, 0, .482881, .638188, .00177605, 0, .508992, .620177, .00168482, 0, .535899, .601506, .00158909, 0, .563619, .58362, .00150583, 0, .592165, .565496, .00141791, 0, .621544, .54789, .00133693, 0, .651743, .530323, .00126038, 0, .682709, .512795, .00118556, 0, .714286, .495199, .00111527, 0, .746032, .478101, .0010489, 0, .777778, .461511, 984264e-9, 0, .809524, .444879, 92591e-8, 0, .84127, .428424, 866582e-9, 0, .873016, .412495, 814463e-9, 0, .904762, .396975, 764498e-9, 0, .936508, .381614, 715967e-9, 0, .968254, .366732, 672483e-9, 0, 1, 1, .00155501, 0, 0, 1, .00155503, 0, 0, 1, .00155524, 0, 0, .999998, .00155615, 0, 0, .999994, .0015586, 0, 0, .999983, .00156379, 0, 0, .999963, .0015733, 0, 0, .999932, .00158911, 0, 0, .999882, .00161376, 0, 0, .99981, .00165041, 0, 100875e-10, .999708, .00170304, 0, 367658e-9, .999565, .00177658, 0, .0014234, .999368, .00187688, 0, .00327939, .999081, .00200989, 0, .00596629, .99852, .00217177, 0, .0094852, .99549, .0021745, 0, .013824, .993252, .00222357, 0, .0189642, .991727, .00235022, 0, .0248856, .989951, .00250561, 0, .0315669, .988029, .00268829, 0, .0389882, .984029, .0027496, 0, .0471302, .980683, .00289793, 0, .0559754, .976554, .00303315, 0, .0655081, .97139, .00313257, 0, .0757138, .965544, .00323656, 0, .08658, .95912, .00333432, 0, .0980954, .951183, .0034039, 0, .110251, .942974, .00347515, 0, .123038, .932642, .00350381, 0, .13645, .922158, .00354519, 0, .150482, .909404, .00353851, 0, .165129, .896071, .0035435, 0, .18039, .881206, .00349936, 0, .196263, .866077, .00347256, 0, .212748, .85093, .003415, 0, .229847, .837703, .00333367, 0, .247561, .823878, .003249, 0, .265895, .809449, .00316347, 0, .284854, .794379, .00306351, 0, .304445, .778138, .0029499, 0, .324675, .761997, .00284099, 0, .345555, .744938, .00272104, 0, .367095, .727212, .00260715, 0, .389309, .709549, .00248855, 0, .41221, .691704, .00236783, 0, .435814, .673689, .00225178, 0, .460138, .656453, .00213765, 0, .485203, .639128, .00202178, 0, .511028, .621512, .00191443, 0, .537634, .603598, .00180977, 0, .565041, .58559, .00170456, 0, .593268, .567852, .00160927, 0, .622327, .5503, .00151395, 0, .652217, .533033, .00142499, 0, .682907, .515942, .00133955, 0, .714296, .498814, .0012602, 0, .746032, .481595, .00118188, 0, .777778, .465117, .00111171, 0, .809524, .448865, .00104091, 0, .84127, .432711, 976618e-9, 0, .873016, .416822, 91859e-8, 0, .904762, .401272, 857704e-9, 0, .936508, .386226, 807172e-9, 0, .968254, .371321, 75464e-8, 0, 1, 1, .00209596, 0, 0, 1, .00209598, 0, 0, 1, .00209624, 0, 0, .999997, .00209736, 0, 0, .999991, .00210039, 0, 0, .999979, .00210678, 0, 0, .999959, .00211847, 0, 0, .999925, .0021379, 0, 0, .99987, .00216809, 0, 0, .999791, .00221281, 0, 681487e-10, .999677, .00227669, 0, 658161e-9, .999521, .00236533, 0, .00200635, .999301, .00248514, 0, .0041779, .998977, .00264185, 0, .00718648, .998191, .00281695, 0, .0110239, .994801, .00278518, 0, .015672, .993091, .00288774, 0, .0211091, .991571, .00303931, 0, .0273123, .9897, .00321643, 0, .034259, .987023, .00337332, 0, .0419282, .983289, .00346146, 0, .0502998, .979892, .00363704, 0, .0593562, .975111, .00373601, 0, .069081, .970351, .0038842, 0, .0794598, .964131, .00397053, 0, .0904798, .957747, .00408078, 0, .10213, .949536, .00413533, 0, .1144, .941372, .00420305, 0, .127284, .931049, .00422815, 0, .140772, .920647, .00425048, 0, .154862, .908033, .0042281, 0, .169548, .895028, .00422026, 0, .184828, .879968, .00415042, 0, .200701, .864875, .00408821, 0, .217167, .84918, .00400909, 0, .234227, .834934, .00391178, 0, .251884, .821397, .00380066, 0, .270141, .807135, .00367974, 0, .289004, .792363, .00355172, 0, .308479, .776661, .003411, 0, .328575, .760705, .00328123, 0, .349301, .744408, .00314003, 0, .370668, .726994, .0029906, 0, .392689, .709598, .00285034, 0, .415379, .692112, .00271179, 0, .438754, .674435, .00257185, 0, .46283, .65676, .00243425, 0, .48763, .639982, .00230351, 0, .513173, .622983, .0021777, 0, .539482, .605471, .00204991, 0, .566579, .58796, .00193759, 0, .594488, .570463, .00181976, 0, .623226, .553058, .00171497, 0, .6528, .535894, .00161109, 0, .683198, .519089, .00151394, 0, .714354, .502454, .00142122, 0, .746032, .485681, .00133488, 0, .777778, .468935, .00124975, 0, .809524, .452951, .00117309, 0, .84127, .437139, .00110155, 0, .873016, .421446, .00103124, 0, .904762, .405951, 966387e-9, 0, .936508, .391003, 908119e-9, 0, .968254, .376198, 848057e-9, 0, 1, 1, .00280076, 0, 0, 1, .00280078, 0, 0, .999999, .00280109, 0, 0, .999997, .00280246, 0, 0, .999992, .00280616, 0, 0, .999979, .00281396, 0, 0, .999956, .00282822, 0, 0, .999916, .00285186, 0, 0, .999857, .0028885, 0, 0, .999768, .00294259, 0, 196026e-9, .999645, .00301946, 0, .00104842, .99947, .00312541, 0, .00270199, .999229, .00326733, 0, .00519449, .998852, .00344992, 0, .00852602, .997558, .00361052, 0, .0126804, .994417, .0035898, 0, .017635, .992824, .00372393, 0, .023365, .991344, .00390695, 0, .0298456, .989337, .00410392, 0, .0370529, .985811, .00420987, 0, .0449651, .982772, .00437488, 0, .0535615, .979001, .00455069, 0, .0628243, .974102, .00464462, 0, .0727368, .969197, .00480577, 0, .0832844, .962759, .00487818, 0, .0944545, .956207, .00498176, 0, .106236, .947909, .00503392, 0, .118619, .939596, .00507474, 0, .131595, .929642, .00509798, 0, .145159, .918807, .00508476, 0, .159305, .906921, .00505634, 0, .174028, .893312, .00498845, 0, .189327, .878933, .0049133, 0, .2052, .863986, .0048259, 0, .221647, .847936, .00470848, 0, .23867, .832253, .00456889, 0, .25627, .818619, .00442726, 0, .274453, .804788, .00427677, 0, .293222, .790241, .00411906, 0, .312585, .775162, .00394833, 0, .33255, .759463, .00377366, 0, .353126, .743598, .00361026, 0, .374324, .72697, .00343627, 0, .396158, .709646, .00326422, 0, .418641, .69277, .00309717, 0, .44179, .675371, .0029356, 0, .465624, .657863, .00277712, 0, .490163, .640772, .00261738, 0, .515429, .624441, .0024737, 0, .541445, .607497, .00233125, 0, .568236, .590438, .00218994, 0, .595828, .573224, .0020664, 0, .624242, .556168, .00193526, 0, .653496, .539232, .00182463, 0, .683588, .522352, .00170735, 0, .714482, .506172, .00160555, 0, .746032, .489842, .00150451, 0, .777778, .473463, .00140938, 0, .809524, .457266, .00132568, 0, .84127, .441609, .0012376, 0, .873016, .426348, .00116265, 0, .904762, .411002, .00108935, 0, .936508, .396045, .00101946, 0, .968254, .381448, 955665e-9, 0, 1, 1, .0037121, 0, 0, 1, .00371213, 0, 0, 1, .00371251, 0, 0, .999997, .00371417, 0, 0, .99999, .00371863, 0, 0, .999977, .00372807, 0, 0, .99995, .00374529, 0, 0, .999908, .0037738, 0, 0, .999843, .00381789, 0, 123596e-10, .999745, .00388273, 0, 407442e-9, .999608, .00397443, 0, .0015447, .999415, .00409998, 0, .00351385, .999143, .00426662, 0, .0063316, .9987, .00447625, 0, .00998679, .996363, .00455323, 0, .0144569, .994021, .00461052, 0, .0197151, .992372, .00476359, 0, .0257344, .991007, .00499101, 0, .0324882, .988767, .0051972, 0, .0399517, .984872, .00528407, 0, .0481022, .982004, .00548926, 0, .0569191, .977714, .00564385, 0, .0663839, .973076, .0057693, 0, .0764801, .967565, .0058924, 0, .0871928, .961384, .00599629, 0, .0985095, .954435, .00605998, 0, .110419, .946303, .0061133, 0, .122912, .937662, .00612028, 0, .13598, .927867, .00612209, 0, .149617, .916475, .00604813, 0, .163817, .90541, .00603088, 0, .178577, .891591, .00592218, 0, .193894, .877573, .00578854, 0, .209767, .862511, .00566648, 0, .226196, .846861, .00551481, 0, .243182, .83068, .00533754, 0, .260728, .815725, .00515487, 0, .278837, .802321, .0049655, 0, .297515, .787826, .00475421, 0, .316768, .773454, .00456002, 0, .336605, .758224, .00434727, 0, .357034, .74265, .00414444, 0, .378067, .726729, .00393738, 0, .399717, .710155, .00373575, 0, .421998, .693312, .00353736, 0, .444928, .67653, .00334368, 0, .468523, .659444, .00315981, 0, .492806, .642051, .00297809, 0, .517798, .625758, .00280592, 0, .543525, .609615, .00264254, 0, .570012, .592919, .00248459, 0, .597288, .576298, .00233327, 0, .625379, .559489, .00219519, 0, .654307, .542891, .00205441, 0, .684084, .526255, .00193385, 0, .714693, .509853, .00180745, 0, .746044, .494131, .00169817, 0, .777778, .478114, .0015913, 0, .809524, .462274, .00148981, 0, .84127, .446412, .00139537, 0, .873016, .431274, .00130984, 0, .904762, .41635, .00122403, 0, .936508, .401476, .00114809, 0, .968254, .386993, .00107563, 0, 1, 1, .00488216, 0, 0, 1, .0048822, 0, 0, 1, .00488265, 0, 0, .999997, .00488463, 0, 0, .999988, .00488999, 0, 0, .999974, .00490129, 0, 0, .999946, .00492191, 0, 0, .999897, .00495598, 0, 0, .999825, .00500855, 0, 744791e-10, .999718, .00508559, 0, 712744e-9, .999565, .005194, 0, .00215249, .999352, .00534147, 0, .00444576, .999046, .00553523, 0, .00759218, .998492, .00577016, 0, .0115714, .995564, .00578487, 0, .0163557, .993339, .00586414, 0, .021915, .991834, .00606002, 0, .0282201, .990496, .00633312, 0, .0352433, .987826, .00651941, 0, .042959, .98383, .00660842, 0, .0513439, .98109, .00685523, 0, .0603772, .976131, .00695778, 0, .0700402, .971922, .00714236, 0, .0803163, .965901, .00721437, 0, .0911908, .959606, .00732017, 0, .102651, .952504, .00735788, 0, .114686, .944365, .00738493, 0, .127286, .935652, .00737969, 0, .140443, .925813, .00733612, 0, .154151, .914397, .00723094, 0, .168405, .903257, .00714002, 0, .183201, .890015, .00700149, 0, .198536, .876014, .00682813, 0, .214409, .861436, .00665567, 0, .23082, .845752, .00644526, 0, .24777, .829169, .00621635, 0, .265263, .813435, .00597789, 0, .283301, .799701, .00575694, 0, .301889, .785726, .00549866, 0, .321035, .77152, .0052503, 0, .340746, .75683, .00499619, 0, .361032, .741951, .0047543, 0, .381904, .726367, .0045084, 0, .403374, .710537, .00426784, 0, .425457, .693965, .00403487, 0, .448169, .677724, .0038075, 0, .47153, .66117, .00359431, 0, .495561, .644274, .00338354, 0, .520284, .627449, .00318163, 0, .545725, .611645, .00299672, 0, .571911, .595614, .00281016, 0, .598873, .579426, .00264252, 0, .62664, .563016, .00247509, 0, .655239, .546728, .00232647, 0, .684692, .530539, .00217803, 0, .714999, .514164, .00204216, 0, .746106, .498344, .00191403, 0, .777778, .482957, .00179203, 0, .809524, .467336, .00167695, 0, .84127, .451994, .00157567, 0, .873016, .436514, .00147113, 0, .904762, .42178, .00138034, 0, .936508, .407271, .00129219, 0, .968254, .392822, .0012098, 0, 1, 1, .00637427, 0, 0, 1, .00637431, 0, 0, .999999, .00637485, 0, 0, .999996, .00637721, 0, 0, .999987, .00638357, 0, 0, .999971, .006397, 0, 0, .999939, .00642142, 0, 0, .999888, .00646177, 0, 0, .999807, .00652387, 0, 207916e-9, .999689, .00661454, 0, .00112051, .99952, .00674155, 0, .00287719, .999283, .00691313, 0, .00550145, .998936, .00713598, 0, .00897928, .998165, .00738501, 0, .0132829, .994847, .00734388, 0, .01838, .993182, .00749991, 0, .0242381, .991665, .0077246, 0, .030826, .989708, .00797579, 0, .0381152, .986663, .00813011, 0, .0460794, .983288, .00830365, 0, .0546951, .980104, .00853496, 0, .0639411, .974855, .00861045, 0, .0737988, .97045, .00879133, 0, .0842516, .964509, .00886377, 0, .0952848, .957594, .00890346, 0, .106886, .950546, .00893289, 0, .119044, .942225, .00890074, 0, .131749, .933365, .00886826, 0, .144994, .923202, .0087316, 0, .158772, .912605, .00863082, 0, .173078, .901099, .00847403, 0, .187908, .888177, .00825838, 0, .203261, .873955, .00801834, 0, .219134, .860091, .00779026, 0, .235527, .84434, .00752478, 0, .252443, .828517, .00724074, 0, .269883, .81239, .00693769, 0, .287851, .79721, .00664817, 0, .306352, .783489, .00634763, 0, .325393, .769514, .00604221, 0, .344981, .755419, .00573568, 0, .365126, .741083, .00544359, 0, .385839, .726059, .00515515, 0, .407132, .710809, .00487139, 0, .42902, .695052, .00459846, 0, .45152, .678886, .00433412, 0, .474651, .663042, .00407981, 0, .498433, .646634, .00384264, 0, .52289, .630117, .00360897, 0, .548048, .613804, .00338863, 0, .573936, .598338, .00318486, 0, .600584, .582687, .00298377, 0, .628027, .566809, .00280082, 0, .656295, .550817, .00262255, 0, .685417, .534937, .00245835, 0, .715406, .519151, .00230574, 0, .74624, .503118, .0021549, 0, .777778, .487723, .00202008, 0, .809524, .472725, .00189355, 0, .84127, .457599, .00177108, 0, .873016, .442558, .00165843, 0, .904762, .427624, .00155494, 0, .936508, .413171, .00145273, 0, .968254, .399122, .00136454, 0, 1, 1, .00826496, 0, 0, 1, .00826499, 0, 0, 1, .00826564, 0, 0, .999996, .00826842, 0, 0, .999987, .00827589, 0, 0, .999967, .00829167, 0, 0, .999933, .00832037, 0, 0, .999876, .00836768, 0, 109338e-10, .999786, .00844031, 0, 427145e-9, .999655, .00854603, 0, .0016384, .999468, .00869337, 0, .00372392, .999203, .008891, 0, .00668513, .998803, .00914387, 0, .0104968, .99748, .00935838, 0, .015125, .994446, .00933309, 0, .0205338, .99292, .00953084, 0, .0266884, .991414, .0097893, 0, .0335565, .989049, .0100228, 0, .0411086, .98582, .0101664, 0, .0493181, .982441, .0103582, 0, .0581613, .978595, .0105292, 0, .0676169, .973495, .0106274, 0, .0776661, .968405, .0107261, 0, .0882926, .962717, .0108234, 0, .0994817, .955478, .0108102, 0, .111221, .948275, .0107914, 0, .123499, .940006, .0107161, 0, .136308, .930831, .0106309, 0, .149639, .920648, .0104083, 0, .163485, .910205, .0102312, 0, .177843, .898445, .0100051, 0, .192707, .885986, .00971928, 0, .208077, .872204, .00940747, 0, .22395, .858436, .0091085, 0, .240326, .843454, .00876595, 0, .257208, .827437, .00839794, 0, .274596, .811488, .00803692, 0, .292496, .796039, .00767352, 0, .310911, .781083, .0073097, 0, .329849, .767642, .00694032, 0, .349316, .753901, .00657476, 0, .369323, .740131, .00622699, 0, .38988, .725845, .0058838, 0, .410999, .710991, .00555586, 0, .432696, .696002, .00523089, 0, .454987, .680461, .00492494, 0, .47789, .664875, .00463464, 0, .501426, .649273, .00435422, 0, .52562, .63302, .0040875, 0, .550498, .61705, .00384075, 0, .576089, .601154, .00359557, 0, .602427, .586008, .00337636, 0, .629544, .570699, .00316019, 0, .657479, .555166, .00296033, 0, .686264, .539645, .00277552, 0, .715924, .524159, .00259499, 0, .746459, .508682, .00243257, 0, .777789, .493163, .00227851, 0, .809524, .478004, .00213083, 0, .84127, .46347, .00199502, 0, .873016, .448778, .00186967, 0, .904762, .434105, .00174732, 0, .936508, .419576, .00163861, 0, .968254, .405541, .00153341, 0, 1, 1, .0106462, 0, 0, 1, .0106462, 0, 0, .999999, .010647, 0, 0, .999995, .0106502, 0, 0, .999985, .0106589, 0, 0, .999964, .0106773, 0, 0, .999925, .0107106, 0, 0, .999861, .0107655, 0, 712986e-10, .999763, .0108497, 0, 743959e-9, .999616, .0109716, 0, .00227361, .999408, .0111408, 0, .0046983, .999112, .0113659, 0, .00800158, .998637, .0116475, 0, .0121493, .996223, .0117231, 0, .0171023, .994006, .0118064, 0, .0228218, .992444, .0120254, 0, .0292711, .991028, .0123314, 0, .036417, .98803, .0124954, 0, .0442295, .984816, .0126538, 0, .0526815, .981399, .0128537, 0, .0617492, .977085, .0129694, 0, .0714114, .972154, .013091, 0, .0816495, .966617, .0131166, 0, .0924472, .960628, .0131583, 0, .10379, .953295, .0131094, 0, .115665, .94575, .0129966, 0, .128062, .937654, .0128796, 0, .140972, .927716, .0126477, 0, .154387, .917932, .0123889, 0, .168301, .907719, .012131, 0, .182709, .89584, .0118013, 0, .197608, .883526, .0114145, 0, .212994, .870301, .0110075, 0, .228867, .856272, .0106019, 0, .245227, .842251, .0101938, 0, .262074, .826466, .00973254, 0, .279412, .810859, .0092846, 0, .297244, .795051, .00883304, 0, .315575, .780053, .00840272, 0, .334412, .76575, .00796438, 0, .35376, .752298, .00752526, 0, .373631, .739153, .00711486, 0, .394034, .725514, .00670361, 0, .414983, .711473, .00632656, 0, .436491, .696936, .00595206, 0, .458575, .682126, .00559191, 0, .481253, .667027, .00525362, 0, .504547, .651875, .00493805, 0, .528481, .636463, .00462848, 0, .553081, .620641, .00433936, 0, .578377, .604931, .00407, 0, .604404, .589549, .00380864, 0, .631197, .574712, .00357049, 0, .658795, .559775, .00334466, 0, .687238, .544514, .00312505, 0, .716559, .529555, .00293199, 0, .746776, .514402, .00274204, 0, .777849, .499302, .00256647, 0, .809524, .484114, .00239901, 0, .84127, .469308, .00225148, 0, .873016, .455133, .00210178, 0, .904762, .440939, .0019727, 0, .936508, .426627, .00184382, 0, .968254, .412509, .00172548, 0, 1, 1, .013628, 0, 0, 1, .0136281, 0, 0, .999999, .0136289, 0, 0, .999995, .0136327, 0, 0, .999983, .0136427, 0, 0, .99996, .0136638, 0, 0, .999917, .0137022, 0, 0, .999846, .0137652, 0, 204597e-9, .999736, .0138615, 0, .00116837, .999573, .0140007, 0, .00303325, .99934, .0141927, 0, .00580613, .999004, .0144457, 0, .00945626, .998407, .0147489, 0, .0139421, .995464, .014731, 0, .0192202, .993328, .0148283, 0, .0252495, .991799, .0150797, 0, .0319921, .990397, .0154316, 0, .0394138, .986835, .0155005, 0, .0474843, .983938, .0157308, 0, .0561763, .980154, .0158753, 0, .0654661, .975659, .0159581, 0, .0753326, .970171, .0159832, 0, .0857571, .964803, .0160084, 0, .0967236, .958366, .0159484, 0, .108218, .950613, .0158001, 0, .120227, .942874, .0155845, 0, .132741, .935005, .0154292, 0, .145751, .924991, .0150742, 0, .159249, .914814, .0146757, 0, .17323, .904743, .0143097, 0, .187687, .893216, .0138695, 0, .202619, .880769, .0133706, 0, .218021, .868136, .0128606, 0, .233894, .85469, .0123403, 0, .250238, .840593, .0118091, 0, .267052, .825808, .011253, 0, .284341, .81009, .0107099, 0, .302106, .79504, .0101636, 0, .320354, .779757, .00964041, 0, .33909, .764697, .00911896, 0, .358322, .750913, .00859533, 0, .378059, .738175, .00811592, 0, .398311, .725242, .00764504, 0, .41909, .711864, .00718885, 0, .440412, .698009, .00675843, 0, .462292, .683841, .00634984, 0, .484748, .669391, .00595502, 0, .507802, .654731, .00558671, 0, .531477, .639805, .00523578, 0, .555802, .624789, .00490834, 0, .580805, .609325, .00459448, 0, .606522, .593975, .00430342, 0, .63299, .578983, .00403019, 0, .66025, .564442, .0037707, 0, .688346, .549835, .0035316, 0, .717319, .535039, .00330255, 0, .7472, .520403, .00308932, 0, .777982, .505687, .00289335, 0, .809524, .490939, .00270818, 0, .84127, .476233, .0025343, 0, .873016, .461624, .00237097, 0, .904762, .447833, .00222065, 0, .936508, .433992, .00207561, 0, .968254, .420147, .00194955, 0, 1, 1, .0173415, 0, 0, 1, .0173416, 0, 0, .999999, .0173426, 0, 0, .999995, .0173468, 0, 0, .999983, .0173582, 0, 0, .999954, .0173822, 0, 0, .999908, .0174258, 0, 669501e-11, .999828, .0174973, 0, 427399e-9, .999705, .0176063, 0, .00171019, .999524, .0177631, 0, .0039248, .999263, .0179781, 0, .00705382, .998878, .018258, 0, .0110552, .998012, .0185551, 0, .0158812, .994614, .0184264, 0, .0214852, .993132, .0186385, 0, .0278239, .991563, .0189067, 0, .0348585, .989298, .0191577, 0, .0425544, .986036, .0192522, 0, .050881, .982558, .0194063, 0, .059811, .978531, .019486, 0, .0693209, .974198, .0195847, 0, .0793895, .968148, .0194749, 0, .0899984, .962565, .0194277, 0, .101132, .956041, .0192991, 0, .112775, .947749, .0189893, 0, .124917, .94018, .018704, 0, .137547, .93165, .0183458, 0, .150655, .921798, .0178775, 0, .164236, .911573, .0173618, 0, .178281, .901569, .0168482, 0, .192788, .890341, .016265, 0, .207752, .877835, .0156199, 0, .223171, .865472, .0149516, 0, .239044, .852905, .0143274, 0, .255371, .838906, .0136643, 0, .272153, .824888, .0129903, 0, .289393, .809977, .0123218, 0, .307093, .794697, .0116572, 0, .325259, .780028, .0110307, 0, .343896, .765124, .0104236, 0, .363012, .750411, .0098219, 0, .382617, .737264, .00924397, 0, .402719, .724799, .00868719, 0, .423332, .712253, .00816476, 0, .444469, .699267, .00767262, 0, .466146, .685618, .00719746, 0, .488383, .671736, .00673916, 0, .511199, .657777, .00631937, 0, .534618, .643497, .00592411, 0, .558668, .62889, .00553928, 0, .58338, .614299, .0051934, 0, .608787, .599197, .00485985, 0, .634929, .584175, .00454357, 0, .661849, .569541, .00425787, 0, .689594, .555193, .00397905, 0, .718211, .540947, .00372364, 0, .747742, .526593, .00348599, 0, .778205, .512335, .00326103, 0, .80953, .498017, .00305137, 0, .84127, .483609, .00285485, 0, .873016, .469368, .00267472, 0, .904762, .455037, .00249945, 0, .936508, .441493, .00234792, 0, .968254, .428147, .00219936, 0, 1, 1, .0219422, 0, 0, 1, .0219423, 0, 0, .999998, .0219434, 0, 0, .999993, .0219481, 0, 0, .999981, .021961, 0, 0, .999949, .0219879, 0, 0, .999896, .0220367, 0, 593194e-10, .999808, .0221167, 0, 75364e-8, .99967, .0222383, 0, .00237884, .999466, .0224125, 0, .00495612, .999174, .0226495, 0, .00844887, .998725, .0229525, 0, .0128058, .996979, .0231123, 0, .0179742, .994317, .0230742, 0, .0239047, .992781, .0232895, 0, .0305526, .991191, .0235734, 0, .0378786, .987787, .0236152, 0, .0458475, .985092, .0237994, 0, .0544287, .981121, .0238553, 0, .0635952, .976924, .0238706, 0, .0733233, .97218, .0238704, 0, .0835922, .965956, .0236598, 0, .0943839, .959998, .0234735, 0, .105682, .953245, .0232277, 0, .117474, .944445, .0226973, 0, .129747, .937087, .0223527, 0, .142491, .928341, .0218144, 0, .155697, .9184, .0211516, 0, .169358, .907959, .0204553, 0, .183469, .89808, .0197673, 0, .198024, .887047, .0189915, 0, .21302, .875221, .0182082, 0, .228455, .86269, .0173584, 0, .244329, .850735, .0165718, 0, .260639, .837545, .0157524, 0, .277389, .823639, .0149482, 0, .29458, .809699, .0141431, 0, .312216, .794797, .0133527, 0, .3303, .780578, .0126193, 0, .34884, .766019, .0118914, 0, .367842, .751447, .0111839, 0, .387315, .737275, .010514, 0, .40727, .724545, .00987277, 0, .427717, .712644, .00926569, 0, .448671, .700432, .00869029, 0, .470149, .687664, .00814691, 0, .492167, .674288, .00763012, 0, .514746, .660966, .00714437, 0, .537911, .647264, .00668457, 0, .561688, .633431, .00626581, 0, .586108, .619133, .00585593, 0, .611206, .604935, .00548188, 0, .637022, .590236, .00513288, 0, .663599, .575473, .0047906, 0, .690989, .561228, .00448895, 0, .719242, .547054, .00420233, 0, .748411, .533175, .00392869, 0, .778531, .519163, .00367445, 0, .809583, .505328, .00344097, 0, .84127, .491446, .00322003, 0, .873016, .477356, .00301283, 0, .904762, .46356, .00282592, 0, .936508, .449623, .00264956, 0, .968254, .436068, .00246956, 0, 1, 1, .0276135, 0, 0, 1, .0276136, 0, 0, .999998, .0276148, 0, 0, .999993, .0276201, 0, 0, .999976, .0276342, 0, 0, .999945, .027664, 0, 0, .999884, .0277179, 0, 18679e-8, .999784, .027806, 0, .00119607, .99963, .0279394, 0, .00318407, .999401, .0281295, 0, .00613601, .999066, .0283858, 0, .00999963, .998524, .0287027, 0, .0147164, .995702, .0286256, 0, .0202295, .993593, .0286733, 0, .0264876, .992067, .0288989, 0, .0334452, .990548, .0292135, 0, .0410621, .986775, .0291296, 0, .0493032, .984054, .0293099, 0, .0581381, .979481, .0291881, 0, .0675397, .975297, .0291598, 0, .0774848, .96981, .028954, 0, .0879528, .963524, .028628, 0, .0989258, .957398, .0283135, 0, .110388, .950088, .0278469, 0, .122327, .941538, .0271798, 0, .134729, .933332, .0265388, 0, .147587, .924392, .0257776, 0, .160889, .914581, .024916, 0, .174631, .904347, .0240242, 0, .188806, .894324, .0231229, 0, .203409, .883724, .022153, 0, .218437, .872207, .0211355, 0, .233888, .859927, .0201048, 0, .249761, .848373, .0191263, 0, .266056, .836023, .0181306, 0, .282774, .82289, .0171718, 0, .299917, .809324, .0162196, 0, .317488, .795361, .0152622, 0, .335493, .781253, .01439, 0, .353936, .767338, .013533, 0, .372825, .753156, .0127244, 0, .392168, .739122, .0119454, 0, .411976, .725358, .0112054, 0, .432259, .712949, .010487, 0, .453032, .701621, .00984032, 0, .47431, .689703, .00921495, 0, .496111, .677216, .00862492, 0, .518456, .664217, .00806882, 0, .541367, .65137, .00755922, 0, .564872, .638, .00705705, 0, .589001, .62453, .00661266, 0, .613789, .610601, .00618432, 0, .639277, .59676, .00578033, 0, .66551, .582433, .00540927, 0, .692539, .568026, .00506104, 0, .720422, .55414, .0047353, 0, .749216, .540178, .00442889, 0, .778974, .526513, .00414363, 0, .809711, .512954, .00388237, 0, .84127, .499403, .00362875, 0, .873016, .486026, .00340827, 0, .904762, .472345, .00318598, 0, .936508, .458828, .00297635, 0, .968254, .445379, .00279447, 0, 1, 1, .0345716, 0, 0, 1, .0345717, 0, 0, .999999, .034573, 0, 0, .999991, .0345787, 0, 0, .999974, .0345941, 0, 0, .999937, .0346263, 0, 188589e-11, .999869, .0346847, 0, 409238e-9, .999757, .0347798, 0, .0017674, .999582, .0349233, 0, .00413658, .999322, .0351265, 0, .00747408, .998939, .0353967, 0, .0117157, .998219, .0357018, 0, .0167966, .994974, .0354726, 0, .0226572, .993201, .0355621, 0, .0292445, .991573, .0357641, 0, .0365123, .989301, .0359252, 0, .0444203, .985712, .0358017, 0, .0529334, .982411, .0358353, 0, .0620214, .977827, .035617, 0, .0716574, .973278, .0354398, 0, .0818186, .967397, .0350483, 0, .0924846, .960696, .0344795, 0, .103638, .954349, .0339861, 0, .115263, .946066, .0331323, 0, .127348, .938012, .032359, 0, .13988, .929413, .0314413, 0, .152849, .920355, .0304103, 0, .166248, .910586, .0292785, 0, .18007, .900609, .0281391, 0, .194308, .890093, .0269103, 0, .208958, .880013, .0257269, 0, .224018, .869001, .0244671, 0, .239485, .85751, .0232252, 0, .255359, .84582, .0220117, 0, .271638, .834383, .0208274, 0, .288324, .822158, .0196628, 0, .305419, .809056, .0185306, 0, .322927, .795832, .0174174, 0, .340851, .782547, .0163758, 0, .359199, .7689, .015391, 0, .377975, .755526, .0144488, 0, .397189, .741681, .0135372, 0, .416851, .728178, .0126957, 0, .436971, .714642, .0118812, 0, .457564, .702756, .0111165, 0, .478644, .69175, .0104145, 0, .500229, .680159, .00974439, 0, .522339, .668073, .00911926, 0, .544997, .655405, .00851393, 0, .56823, .642921, .00797637, 0, .592068, .629993, .00745119, 0, .616546, .616828, .00696972, 0, .641705, .603305, .00652425, 0, .66759, .589833, .00610188, 0, .694255, .575945, .00570834, 0, .72176, .561745, .00533384, 0, .750168, .548277, .00500001, 0, .779545, .534467, .00467582, 0, .809933, .521032, .00438092, 0, .841272, .507877, .00410348, 0, .873016, .494654, .00383618, 0, .904762, .481592, .00358699, 0, .936508, .468509, .00337281, 0, .968254, .455293, .00316196, 0, 1, 1, .0430698, 0, 0, 1, .0430699, 0, 0, .999998, .0430713, 0, 0, .999991, .0430773, 0, 0, .99997, .0430936, 0, 0, .999928, .0431277, 0, 406396e-10, .999852, .0431893, 0, 744376e-9, .999724, .0432895, 0, .0024806, .999527, .0434397, 0, .00524779, .99923, .0436507, 0, .00898164, .998783, .0439255, 0, .0136083, .997507, .0441104, 0, .0190582, .994418, .0438225, 0, .0252694, .992864, .0439396, 0, .0321879, .991127, .0440962, 0, .039767, .987331, .0438408, 0, .0479667, .984819, .0438991, 0, .056752, .980384, .0435906, 0, .0660929, .975846, .0432543, 0, .075963, .970748, .0428293, 0, .0863398, .964303, .042153, 0, .0972035, .95772, .0414111, 0, .108537, .950747, .0405893, 0, .120325, .942533, .0394887, 0, .132554, .934045, .0383544, 0, .145215, .924942, .037057, 0, .158296, .915811, .0356993, 0, .17179, .90612, .0342401, 0, .185691, .896434, .0328078, 0, .199993, .886021, .031288, 0, .214691, .876081, .0297776, 0, .229782, .865608, .0282334, 0, .245265, .854924, .026749, 0, .261138, .843607, .02526, 0, .277401, .832456, .0238214, 0, .294056, .821342, .0224682, 0, .311104, .809303, .0211297, 0, .328548, .796468, .0198387, 0, .346394, .784046, .0186227, 0, .364645, .771262, .0174561, 0, .38331, .758118, .0163806, 0, .402396, .745075, .0153287, 0, .421912, .731926, .0143647, 0, .44187, .71863, .0134363, 0, .462283, .705414, .0125603, 0, .483165, .693792, .0117508, 0, .504535, .683108, .0110016, 0, .52641, .67183, .0102757, 0, .548816, .66015, .00962044, 0, .571776, .647907, .00898031, 0, .595323, .635734, .00840811, 0, .619489, .623208, .00786211, 0, .644317, .610438, .00734953, 0, .669852, .597345, .00687688, 0, .696148, .584138, .00643469, 0, .723267, .5707, .00602236, 0, .75128, .556966, .0056324, 0, .780258, .543607, .00528277, 0, .810268, .530213, .00493999, 0, .841311, .516912, .00462265, 0, .873016, .503916, .0043307, 0, .904762, .491146, .00406858, 0, .936508, .478439, .00381436, 0, .968254, .465834, .00358003, 0, 1, 1, .0534039, 0, 0, 1, .053404, 0, 0, .999998, .0534055, 0, 0, .999989, .0534116, 0, 0, .999968, .0534283, 0, 0, .999918, .0534633, 0, 155895e-9, .99983, .0535262, 0, .00120914, .999685, .0536281, 0, .00334944, .999461, .0537799, 0, .00653077, .999119, .0539902, 0, .0106718, .998582, .0542524, 0, .0156907, .995919, .0540318, 0, .0215147, .993735, .0538914, 0, .0280801, .992126, .0539557, 0, .0353323, .990266, .0540401, 0, .0432247, .986317, .0536064, 0, .0517172, .983213, .0534425, 0, .0607754, .978303, .0528622, 0, .0703698, .973665, .0523363, 0, .0804742, .968091, .0516165, 0, .0910667, .961026, .0505434, 0, .102128, .954333, .049523, 0, .113641, .946372, .0481698, 0, .125591, .938254, .0467674, 0, .137965, .929516, .0452341, 0, .150754, .920106, .0435083, 0, .163947, .910899, .0417399, 0, .177537, .901532, .0399389, 0, .191516, .891919, .0380901, 0, .205881, .882006, .0362341, 0, .220626, .871965, .0343444, 0, .235749, .862145, .0324832, 0, .251248, .852058, .0306681, 0, .267121, .84161, .0289097, 0, .283368, .830806, .0272079, 0, .299992, .820476, .0256089, 0, .316992, .809514, .0240394, 0, .334374, .797865, .0225379, 0, .35214, .785621, .0211235, 0, .370296, .773765, .0197908, 0, .388849, .761629, .0185235, 0, .407807, .748891, .0173358, 0, .427178, .736437, .0162305, 0, .446974, .723707, .0151778, 0, .467207, .710606, .0141791, 0, .487892, .698019, .0132592, 0, .509046, .686203, .0123887, 0, .530687, .675692, .0115976, 0, .552839, .664826, .0108325, 0, .575527, .65349, .0101348, 0, .59878, .641774, .00947756, 0, .622634, .629794, .00886058, 0, .647128, .617647, .00828526, 0, .672308, .60534, .00775312, 0, .698231, .592718, .00726033, 0, .724958, .579746, .00679731, 0, .752563, .566763, .00636111, 0, .781127, .553515, .00595228, 0, .810733, .540118, .00556876, 0, .841426, .527325, .00523051, 0, .873016, .514265, .00490712, 0, .904762, .501406, .00460297, 0, .936508, .488922, .00431247, 0, .968254, .476541, .0040472, 0, 1, 1, .0659184, 0, 0, 1, .0659185, 0, 0, .999998, .06592, 0, 0, .999988, .0659259, 0, 0, .999963, .0659423, 0, 0, .999907, .0659764, 0, 374198e-9, .999806, .0660376, 0, .00182071, .999639, .0661361, 0, .0043894, .999378, .0662814, 0, .00800055, .998985, .0664779, 0, .0125594, .998285, .0666914, 0, .0179786, .995071, .0661989, 0, .0241822, .993172, .0660454, 0, .031106, .991438, .0660105, 0, .0386952, .988428, .0656875, 0, .0469032, .985218, .0652913, 0, .0556905, .981128, .0647107, 0, .065023, .976015, .0638491, 0, .0748717, .97097, .062993, 0, .0852112, .964582, .0617927, 0, .0960199, .957383, .0603626, 0, .107279, .949969, .0588128, 0, .118971, .941843, .0570274, 0, .131084, .933624, .0551885, 0, .143604, .924543, .053122, 0, .156521, .914919, .0508897, 0, .169825, .905773, .0486418, 0, .18351, .896434, .0463364, 0, .197569, .887195, .0440623, 0, .211997, .877706, .0417799, 0, .226789, .867719, .03945, 0, .241944, .858587, .037243, 0, .257458, .849317, .0350956, 0, .273331, .839585, .0329852, 0, .289563, .829856, .0310028, 0, .306154, .819589, .0290953, 0, .323108, .809714, .0272738, 0, .340426, .79934, .0255631, 0, .358113, .788224, .0239175, 0, .376175, .776619, .0223831, 0, .394616, .76521, .0209298, 0, .413445, .753716, .0195786, 0, .432671, .741564, .0183001, 0, .452305, .729413, .0171259, 0, .472358, .717146, .0159933, 0, .492845, .70436, .0149495, 0, .513783, .69219, .0139681, 0, .535189, .680289, .0130577, 0, .557087, .669611, .0122198, 0, .5795, .659113, .0114174, 0, .602459, .648148, .0106729, 0, .625997, .636905, .00998997, 0, .650154, .625154, .00934313, 0, .674976, .613481, .00874839, 0, .700518, .60154, .00818265, 0, .726845, .58943, .00766889, 0, .754032, .576828, .00717153, 0, .782167, .564194, .00672696, 0, .811344, .551501, .00630863, 0, .841644, .538635, .00592177, 0, .873016, .525724, .00554888, 0, .904762, .513209, .00520225, 0, .936508, .500457, .00488231, 0, .968254, .48799, .00457153, 0, 1, 1, .0810131, 0, 0, 1, .0810133, 0, 0, .999997, .0810145, 0, 0, .999985, .08102, 0, 0, .999956, .0810347, 0, 195026e-10, .999893, .0810656, 0, 719316e-9, .999777, .0811205, 0, .00259774, .999583, .081208, 0, .00561807, .999281, .0813343, 0, .00967472, .998813, .0814969, 0, .0146627, .997597, .0815217, 0, .0204902, .994379, .0808502, 0, .0270802, .992744, .0806792, 0, .0343674, .990745, .0804589, 0, .0422974, .986646, .0796107, 0, .0508242, .983611, .0790913, 0, .0599087, .978869, .0780746, 0, .0695175, .973475, .0768218, 0, .0796223, .967845, .0754926, 0, .0901983, .960778, .0737063, 0, .101224, .953333, .0718052, 0, .112682, .945274, .0695946, 0, .124555, .936955, .0672492, 0, .136831, .928319, .0647732, 0, .149496, .919075, .0620947, 0, .162542, .909114, .0591816, 0, .175958, .900137, .0563917, 0, .189739, .891069, .0535392, 0, .203877, .882262, .0507642, 0, .218368, .873232, .0479793, 0, .233208, .864042, .045226, 0, .248393, .855002, .0425413, 0, .263923, .846569, .0400126, 0, .279796, .837714, .0375269, 0, .296012, .828918, .0352027, 0, .312573, .819783, .0330011, 0, .329479, .810129, .0308908, 0, .346734, .800866, .0289112, 0, .364342, .79093, .0270255, 0, .382307, .780593, .0252758, 0, .400637, .769511, .0236178, 0, .419337, .758558, .0220652, 0, .438418, .747632, .0206289, 0, .457889, .736146, .0192873, 0, .477761, .724093, .0180333, 0, .49805, .71234, .0168264, 0, .51877, .700201, .015746, 0, .53994, .687949, .0147027, 0, .561581, .676163, .0137512, 0, .583718, .665001, .0128655, 0, .60638, .65472, .0120366, 0, .629599, .644213, .0112604, 0, .653415, .633382, .0105413, 0, .677874, .62212, .00986498, 0, .70303, .610631, .00923308, 0, .728948, .599078, .00864206, 0, .755706, .587519, .00811784, 0, .783396, .575505, .00761237, 0, .812121, .563148, .00713949, 0, .841989, .550828, .00668379, 0, .873035, .538458, .00627715, 0, .904762, .525905, .00588336, 0, .936508, .513517, .00552687, 0, .968254, .501395, .00519681, 0, 1, 1, .0991506, 0, 0, 1, .0991504, 0, 0, .999996, .0991515, 0, 0, .999984, .0991558, 0, 0, .999947, .0991672, 0, 114389e-9, .999874, .0991912, 0, .00121503, .999739, .0992331, 0, .00356108, .999514, .0992983, 0, .00705578, .999159, .0993877, 0, .011574, .998586, .0994837, 0, .017003, .995731, .0988425, 0, .0232484, .993384, .098276, 0, .0302318, .991615, .0979269, 0, .0378884, .989029, .0973432, 0, .0461641, .985373, .0963539, 0, .0550136, .981278, .0952306, 0, .0643988, .975777, .0936233, 0, .0742868, .970526, .0920219, 0, .0846501, .963755, .0898912, 0, .0954644, .956676, .0876064, 0, .106709, .948099, .0847751, 0, .118367, .939718, .0818638, 0, .130423, .931305, .078857, 0, .142862, .922342, .0756127, 0, .155674, .912842, .0721473, 0, .168849, .903304, .0686195, 0, .182378, .89411, .0650589, 0, .196255, .885512, .0616022, 0, .210473, .877193, .0582434, 0, .225027, .86877, .0548979, 0, .239915, .860267, .0516095, 0, .255132, .851915, .048468, 0, .270678, .843912, .0454447, 0, .286551, .83604, .0425612, 0, .302751, .828245, .0398752, 0, .31928, .820159, .0373198, 0, .336138, .81167, .034916, 0, .35333, .802659, .0326402, 0, .370858, .793921, .0304901, 0, .388728, .784713, .0284857, 0, .406944, .774946, .0266186, 0, .425515, .76448, .0248593, 0, .444449, .753793, .0232114, 0, .463756, .743506, .0217039, 0, .483447, .732555, .0202841, 0, .503535, .720965, .0189648, 0, .524036, .709422, .0177189, 0, .544968, .697756, .0165626, 0, .56635, .685565, .015483, 0, .588208, .673987, .0144892, 0, .610569, .66244, .0135607, 0, .633466, .651675, .0126956, 0, .656936, .641598, .0118788, 0, .681025, .63121, .0111261, 0, .705788, .620514, .010437, 0, .731289, .609366, .00978747, 0, .757606, .598137, .00917257, 0, .784834, .586966, .00859778, 0, .813085, .575549, .00806803, 0, .842485, .563797, .00757294, 0, .87313, .551758, .00710592, 0, .904762, .539894, .0066841, 0, .936508, .527901, .00627901, 0, .968254, .515819, .00590506, 0, 1, 1, .120864, 0, 0, 1, .120864, 0, 0, .999996, .120864, 0, 0, .99998, .120867, 0, 0, .99994, .120872, 0, 323781e-9, .999852, .120884, 0, .00188693, .999693, .120903, 0, .00473489, .999426, .120929, 0, .00872704, .999002, .120955, 0, .0137237, .998235, .120918, 0, .0196068, .994608, .119764, 0, .0262803, .992997, .119265, 0, .0336657, .990968, .11863, 0, .0416987, .987002, .117261, 0, .0503261, .983524, .116009, 0, .0595035, .97875, .114252, 0, .0691935, .972652, .11193, 0, .0793645, .966613, .109555, 0, .0899894, .959275, .106612, 0, .101045, .951272, .103375, 0, .112512, .942323, .0996594, 0, .124372, .933679, .0958841, 0, .136611, .924822, .0919265, 0, .149216, .915742, .0878061, 0, .162176, .906348, .0834894, 0, .175482, .896883, .079085, 0, .189125, .88774, .0746745, 0, .203098, .87986, .0705773, 0, .217396, .871998, .0665005, 0, .232015, .864325, .0625413, 0, .24695, .856685, .0586781, 0, .2622, .84925, .0550063, 0, .277761, .841719, .0514727, 0, .293634, .834755, .0481398, 0, .309819, .827853, .0450172, 0, .326315, .820888, .0420969, 0, .343126, .813616, .0393702, 0, .360254, .805767, .0367771, 0, .377701, .797338, .0343274, 0, .395474, .789122, .0320529, 0, .413577, .780601, .0299485, 0, .432018, .771424, .0279812, 0, .450804, .761502, .0261054, 0, .469944, .751166, .0243942, 0, .489451, .741276, .0228087, 0, .509337, .730898, .0213265, 0, .529617, .719878, .0199307, 0, .550307, .708379, .0186574, 0, .571428, .697165, .0174446, 0, .593003, .685554, .0163144, 0, .615059, .673631, .015276, 0, .637628, .662385, .0143003, 0, .660746, .651059, .0134112, 0, .68446, .640451, .0125794, 0, .70882, .630536, .011793, 0, .733893, .620316, .0110547, 0, .759756, .609722, .0103668, 0, .786505, .598804, .00973009, 0, .814259, .587871, .00912812, 0, .843157, .577121, .00858916, 0, .87334, .566019, .00807333, 0, .904762, .554664, .00759687, 0, .936508, .543101, .00714759, 0, .968254, .531558, .00673418, 0, 1, 1, .146767, 0, 0, 1, .146767, 0, 0, .999997, .146767, 0, 0, .999977, .146765, 0, 320658e-11, .999929, .146762, 0, 682576e-9, .999823, .146753, 0, .00276402, .999633, .146735, 0, .00614771, .999314, .146699, 0, .0106613, .998796, .14662, 0, .0161546, .997124, .146107, 0, .0225063, .994062, .144857, 0, .0296198, .992154, .144011, 0, .037417, .989186, .142712, 0, .0458348, .985279, .140926, 0, .0548211, .980826, .13885, 0, .0643326, .975056, .136168, 0, .074333, .969005, .133217, 0, .0847917, .961554, .12959, 0, .0956828, .954206, .125886, 0, .106984, .945046, .121335, 0, .118675, .935678, .116492, 0, .130741, .926748, .111635, 0, .143166, .917764, .106625, 0, .155939, .908358, .101325, 0, .169049, .899219, .0960249, 0, .182487, .890089, .0906527, 0, .196245, .881488, .0853905, 0, .210317, .874031, .0804177, 0, .224697, .866932, .0756005, 0, .23938, .859976, .0709019, 0, .254364, .853375, .0664391, 0, .269646, .846971, .0622012, 0, .285223, .840483, .058129, 0, .301096, .833969, .0542762, 0, .317265, .82806, .0507042, 0, .333729, .822128, .047368, 0, .350491, .815989, .044272, 0, .367554, .809336, .0413444, 0, .38492, .802177, .038601, 0, .402594, .79441, .0360227, 0, .420582, .786573, .0336383, 0, .438891, .778619, .0314321, 0, .457527, .77, .029362, 0, .476499, .760698, .0274102, 0, .49582, .750932, .0256146, 0, .5155, .740993, .023974, 0, .535555, .731159, .0224182, 0, .556, .720836, .0209889, 0, .576855, .709913, .0196411, 0, .598143, .698415, .0183824, 0, .619888, .68745, .0172222, 0, .642123, .676154, .0161509, 0, .664883, .664383, .0151397, 0, .688211, .6533, .0141873, 0, .71216, .642072, .0133105, 0, .736792, .631412, .0124932, 0, .762186, .621622, .0117408, 0, .788439, .611681, .0110358, 0, .815672, .60142, .0103775, 0, .844034, .59083, .00975623, 0, .873699, .580254, .00918084, 0, .904765, .569841, .00864721, 0, .936508, .559224, .00815731, 0, .968254, .548315, .00767924, 0, 1, 1, .177563, 0, 0, 1, .177563, 0, 0, .999994, .177562, 0, 0, .999972, .177555, 0, 664171e-10, .999914, .177536, 0, .0012276, .999787, .177496, 0, .00388025, .999556, .17742, 0, .00783463, .999165, .177285, 0, .0128953, .9985, .177037, 0, .0189053, .995388, .175634, 0, .025742, .993102, .174375, 0, .033309, .990992, .173121, 0, .0415298, .986932, .170896, 0, .0503425, .982786, .16847, 0, .0596964, .977592, .165455, 0, .0695498, .971075, .161676, 0, .0798676, .963967, .157458, 0, .0906201, .956397, .152836, 0, .101783, .947489, .147467, 0, .113333, .937564, .14145, 0, .125254, .928182, .135383, 0, .137529, .919027, .129212, 0, .150144, .909618, .12276, 0, .163088, .900492, .116273, 0, .176351, .891671, .1098, 0, .189924, .883146, .103362, 0, .203799, .875151, .0970799, 0, .21797, .868338, .0911732, 0, .232433, .862033, .0854966, 0, .247182, .856107, .0800691, 0, .262216, .850644, .0749618, 0, .27753, .845261, .070079, 0, .293124, .839885, .0654321, 0, .308997, .834609, .0610975, 0, .325149, .829083, .0569741, 0, .341581, .82404, .0531736, 0, .358294, .818968, .049665, 0, .37529, .813496, .0463856, 0, .392573, .807533, .0433217, 0, .410148, .80099, .0404402, 0, .428019, .793891, .0377578, 0, .446192, .786281, .0352616, 0, .464676, .778773, .0329577, 0, .483478, .770737, .030808, 0, .502608, .762094, .0287964, 0, .522079, .752898, .0269254, 0, .541905, .743306, .0251926, 0, .5621, .733416, .023595, 0, .582684, .723742, .0221155, 0, .603677, .713542, .0207435, 0, .625106, .702755, .019434, 0, .646998, .691484, .0182046, 0, .66939, .680531, .0170771, 0, .692324, .66953, .0160339, 0, .715849, .658126, .0150677, 0, .740028, .646933, .0141551, 0, .764937, .636107, .0133179, 0, .790673, .625271, .0125284, 0, .817358, .615225, .0117937, 0, .84515, .605678, .0111181, 0, .874244, .59583, .0104759, 0, .904828, .585704, .00986672, 0, .936508, .575413, .00929712, 0, .968254, .565373, .00876713, 0, 1, 1, .214058, 0, 0, .999999, .214058, 0, 0, .999994, .214055, 0, 0, .999966, .214039, 0, 259642e-9, .999893, .213998, 0, .00200075, .999737, .21391, 0, .00527775, .999449, .213745, 0, .00983959, .99896, .213458, 0, .0154755, .9979, .212855, 0, .0220249, .994278, .210779, 0, .0293654, .992254, .20926, 0, .0374021, .98881, .206908, 0, .0460604, .984715, .204009, 0, .0552802, .979738, .200471, 0, .0650127, .972884, .195813, 0, .0752175, .965996, .190856, 0, .0858612, .957974, .185077, 0, .0969155, .949155, .17868, 0, .108356, .939288, .171513, 0, .120163, .928996, .163838, 0, .132319, .919563, .156246, 0, .144808, .910004, .148359, 0, .157618, .900791, .140417, 0, .170737, .892135, .132569, 0, .184155, .883803, .124741, 0, .197866, .876034, .117091, 0, .211861, .869219, .109835, 0, .226134, .863062, .102859, 0, .240682, .857795, .0962928, 0, .255499, .853009, .0900725, 0, .270583, .848603, .0842101, 0, .285931, .844335, .0786527, 0, .301542, .840208, .0734397, 0, .317415, .836035, .0685334, 0, .33355, .83172, .0639275, 0, .349948, .827135, .0595909, 0, .36661, .822797, .0556204, 0, .383539, .818387, .0519394, 0, .400738, .813565, .0485317, 0, .41821, .808142, .0453138, 0, .435961, .802212, .0423354, 0, .453997, .79573, .0395553, 0, .472324, .788741, .036988, 0, .490951, .781093, .0345688, 0, .509887, .773597, .0323297, 0, .529144, .765622, .0302719, 0, .548735, .757083, .0283477, 0, .568674, .747992, .0265562, 0, .588979, .738591, .0248844, 0, .609671, .728719, .0233342, 0, .630773, .719146, .0219081, 0, .652314, .709165, .0205711, 0, .674328, .69875, .0193248, 0, .696854, .687884, .0181582, 0, .719942, .676818, .0170746, 0, .743651, .666247, .0160718, 0, .768057, .655284, .0151262, 0, .793253, .64401, .0142561, 0, .819363, .633353, .0134327, 0, .846547, .622674, .012653, 0, .875017, .612265, .0119354, 0, .905021, .602455, .0112533, 0, .936508, .593147, .0106234, 0, .968254, .583592, .0100213, 0, 1, 1, .25717, 0, 0, 1, .25717, 0, 0, .999992, .257164, 0, 0, .999958, .257135, 0, 641715e-9, .999864, .25706, 0, .00305314, .999666, .256897, 0, .00700975, .999302, .256596, 0, .0122194, .998663, .25607, 0, .0184622, .995607, .254123, 0, .0255773, .993094, .252081, 0, .0334439, .9907, .249867, 0, .0419696, .98594, .246118, 0, .0510823, .981214, .242049, 0, .0607242, .974966, .236869, 0, .0708486, .967589, .230724, 0, .081417, .95915, .223635, 0, .0923974, .950257, .21596, 0, .103763, .940165, .207296, 0, .115491, .929396, .197901, 0, .127562, .919288, .188437, 0, .13996, .909428, .178762, 0, .15267, .900105, .169072, 0, .165679, .891418, .159478, 0, .178979, .883347, .15002, 0, .192558, .875992, .140813, 0, .20641, .869466, .13196, 0, .220529, .863699, .123501, 0, .234907, .858553, .115436, 0, .249542, .854379, .107901, 0, .264428, .850894, .10088, 0, .279564, .847632, .0942296, 0, .294947, .844571, .0879861, 0, .310575, .84163, .0821534, 0, .326448, .838542, .0766409, 0, .342566, .835412, .0715322, 0, .358929, .831899, .0666883, 0, .37554, .828177, .0622175, 0, .392399, .82416, .0580452, 0, .409511, .820393, .054267, 0, .426878, .816068, .0507172, 0, .444506, .811201, .0474041, 0, .4624, .805785, .0443174, 0, .480566, .799878, .0414562, 0, .499013, .793469, .0388147, 0, .517749, .786473, .0363453, 0, .536785, .778874, .0340225, 0, .556134, .771277, .0318599, 0, .575809, .763426, .0298859, 0, .595827, .755044, .0280357, 0, .616207, .746161, .0262979, 0, .636973, .737124, .0247295, 0, .65815, .72761, .0232514, 0, .679772, .717822, .0218755, 0, .701876, .708279, .0205942, 0, .724509, .698333, .0193947, 0, .74773, .68802, .0182717, 0, .771609, .677321, .0172044, 0, .79624, .666504, .0162122, 0, .821743, .656184, .0152924, 0, .84828, .64556, .0144326, 0, .876069, .634636, .0136157, 0, .905404, .624124, .0128612, 0, .936508, .613914, .0121435, 0, .968254, .603589, .0114887, 0, 1, 1, .307946, 0, 0, .999999, .307945, 0, 0, .999988, .307934, 0, 204479e-10, .999944, .307886, 0, .00127833, .999824, .307756, 0, .00445047, .999565, .30748, 0, .00914673, .999085, .306966, 0, .0150498, .998103, .306004, 0, .0219367, .994249, .303028, 0, .0296485, .991807, .300435, 0, .038068, .987773, .296554, 0, .0471062, .982673, .2916, 0, .0566942, .976623, .285641, 0, .0667768, .968757, .27815, 0, .0773099, .959849, .269529, 0, .088257, .950663, .260248, 0, .0995879, .940129, .249704, 0, .111277, .92895, .238291, 0, .123304, .917996, .226501, 0, .13565, .907813, .214669, 0, .148299, .898305, .202835, 0, .161237, .889626, .191158, 0, .174455, .88175, .179695, 0, .187941, .874715, .168548, 0, .201687, .868746, .15792, 0, .215687, .863703, .147807, 0, .229933, .859315, .138149, 0, .24442, .855538, .128993, 0, .259145, .852428, .120414, 0, .274103, .850168, .112498, 0, .289293, .848132, .105054, 0, .304711, .846291, .0981087, 0, .320357, .844431, .0915942, 0, .33623, .842493, .0855056, 0, .35233, .840368, .0798204, 0, .368658, .83798, .0745097, 0, .385214, .83523, .0695424, 0, .402002, .832091, .0649092, 0, .419023, .828667, .0606291, 0, .436282, .824805, .0566523, 0, .453782, .820988, .0530229, 0, .471529, .816635, .0496364, 0, .489528, .811725, .0464658, 0, .507788, .806316, .0435082, 0, .526317, .800469, .0407873, 0, .545124, .794107, .038255, 0, .564221, .787218, .0358825, 0, .583621, .779872, .0336785, 0, .603341, .772097, .0316379, 0, .623397, .764484, .0297379, 0, .643812, .756428, .0279581, 0, .664611, .748022, .0263153, 0, .685824, .739268, .0247799, 0, .707488, .73024, .0233385, 0, .729646, .720893, .0220035, 0, .752354, .71119, .0207555, 0, .77568, .701791, .0195843, 0, .799715, .692184, .0184891, 0, .824574, .682258, .0174541, 0, .850417, .67206, .0164873, 0, .877466, .661717, .0155959, 0, .90604, .651462, .0147519, 0, .936528, .641467, .0139727, 0, .968254, .631229, .0132363, 0, 1, 1, .367573, 0, 0, .999999, .367571, 0, 0, .999984, .367553, 0, 183382e-9, .999925, .367473, 0, .00225254, .999759, .367259, 0, .00628165, .99941, .366801, 0, .0117858, .998739, .365946, 0, .0184359, .995529, .363191, 0, .0260114, .992875, .360171, 0, .0343581, .989135, .355981, 0, .0433637, .984166, .350401, 0, .0529438, .977871, .343348, 0, .0630334, .96951, .334341, 0, .0735805, .959964, .323862, 0, .0845437, .950162, .312521, 0, .095889, .938882, .299577, 0, .107588, .926992, .285573, 0, .119617, .915589, .271212, 0, .131957, .904791, .256611, 0, .144591, .895177, .242224, 0, .157503, .886403, .227952, 0, .170682, .878957, .214192, 0, .184117, .872418, .200795, 0, .197799, .867029, .188015, 0, .21172, .862835, .175975, 0, .225873, .859411, .164526, 0, .240253, .856655, .153693, 0, .254854, .854519, .14352, 0, .269673, .852828, .13397, 0, .284707, .851412, .124984, 0, .299953, .850609, .116748, 0, .315408, .849855, .10905, 0, .331073, .849017, .101839, 0, .346946, .848079, .0951359, 0, .363028, .846911, .0888774, 0, .379318, .845445, .0830375, 0, .395818, .84362, .0775844, 0, .41253, .841411, .0725054, 0, .429457, .838768, .0677691, 0, .446602, .835801, .0634016, 0, .463968, .832341, .0593095, 0, .481561, .828424, .0555121, 0, .499386, .824312, .052024, 0, .51745, .819918, .0487865, 0, .535761, .815072, .0457801, 0, .554328, .809863, .0430184, 0, .573162, .804164, .0404245, 0, .592275, .798034, .0380146, 0, .611681, .791436, .0357436, 0, .631398, .784498, .0336475, 0, .651445, .777125, .0316666, 0, .671845, .769365, .0298122, 0, .692628, .761579, .0281001, 0, .713827, .753746, .0265049, 0, .735484, .745573, .0250067, 0, .75765, .737083, .0236026, 0, .78039, .728545, .0223302, 0, .803789, .719691, .0211243, 0, .82796, .710569, .0199983, 0, .853056, .701216, .0189569, 0, .879298, .692094, .0179702, 0, .907014, .682909, .0170418, 0, .936691, .673509, .0161732, 0, .968254, .663863, .0153406, 0, 1, 1, .437395, 0, 0, .999998, .437394, 0, 0, .99998, .437363, 0, 616704e-9, .999891, .437232, 0, .00367925, .999656, .436877, 0, .00867446, .999148, .436121, 0, .0150679, .997959, .434564, 0, .022531, .993464, .430134, 0, .0308507, .990606, .426077, 0, .0398805, .985027, .419397, 0, .0495148, .978491, .41118, 0, .0596749, .969643, .40048, 0, .0703001, .959189, .38769, 0, .0813427, .948223, .373575, 0, .0927641, .935955, .357622, 0, .104533, .923237, .34043, 0, .116624, .911074, .322735, 0, .129015, .899724, .30479, 0, .141687, .890189, .287392, 0, .154626, .881796, .270248, 0, .167818, .874781, .253659, 0, .181252, .869166, .237786, 0, .194918, .864725, .222618, 0, .208807, .861565, .208356, 0, .222913, .859284, .194867, 0, .237229, .857677, .18212, 0, .25175, .856714, .17018, 0, .266473, .856155, .158969, 0, .281392, .8558, .148413, 0, .296505, .855672, .138578, 0, .311811, .855538, .129345, 0, .327306, .855689, .120861, 0, .342991, .855767, .112969, 0, .358864, .855618, .105593, 0, .374925, .85525, .0987451, 0, .391176, .854583, .0923727, 0, .407616, .853534, .0864143, 0, .424249, .852061, .0808338, 0, .441076, .850253, .0756771, 0, .4581, .848004, .0708612, 0, .475324, .845333, .0663784, 0, .492754, .842376, .0622631, 0, .510394, .838956, .0584112, 0, .528251, .835121, .0548328, 0, .546331, .830842, .0514838, 0, .564644, .826212, .048355, 0, .583198, .821522, .0454714, 0, .602005, .816551, .0428263, 0, .621078, .811211, .0403612, 0, .640434, .805479, .038039, 0, .660089, .799409, .0358739, 0, .680066, .79306, .0338727, 0, .70039, .786395, .0319985, 0, .721094, .779416, .030241, 0, .742215, .77214, .0285951, 0, .7638, .764636, .0270747, 0, .785912, .756836, .0256354, 0, .808628, .749315, .0243027, 0, .832055, .741561, .0230497, 0, .856338, .733589, .0218801, 0, .88169, .725479, .020784, 0, .908441, .717255, .0197702, 0, .937125, .708829, .0188168, 0, .968254, .700191, .0179113, 0, 1, 1, .518937, 0, 0, .999998, .518933, 0, 0, .999967, .518883, 0, .00147741, .999832, .51866, 0, .00573221, .999466, .518057, 0, .011826, .998644, .516752, 0, .0192116, .994458, .512347, 0, .027573, .991223, .507675, 0, .0367099, .985515, .500188, 0, .046487, .978308, .490408, 0, .0568071, .968359, .477357, 0, .0675984, .95682, .461752, 0, .0788059, .943929, .443796, 0, .090386, .930224, .423893, 0, .102304, .916514, .402682, 0, .114532, .903653, .380914, 0, .127047, .892315, .359212, 0, .139828, .882942, .338102, 0, .152861, .875438, .31773, 0, .16613, .869642, .298186, 0, .179624, .865304, .279491, 0, .193332, .862382, .261804, 0, .207247, .860666, .245146, 0, .22136, .859788, .229406, 0, .235666, .859608, .214605, 0, .250158, .859912, .200691, 0, .264832, .86053, .187623, 0, .279684, .861368, .17539, 0, .294711, .862237, .163901, 0, .309911, .863127, .153175, 0, .32528, .863923, .143147, 0, .340819, .864567, .133781, 0, .356524, .865013, .125042, 0, .372397, .86539, .116952, 0, .388438, .865591, .109476, 0, .404645, .865517, .102542, 0, .421022, .865084, .0960688, 0, .437569, .864309, .0900499, 0, .454287, .863151, .0844328, 0, .471181, .861649, .0792218, 0, .488253, .859742, .0743482, 0, .505507, .857446, .0697963, 0, .522947, .854757, .0655364, 0, .54058, .851783, .061608, 0, .558412, .848516, .0579701, 0, .576449, .844897, .0545742, 0, .594701, .840956, .0514167, 0, .613178, .836676, .0484598, 0, .631892, .832075, .0456934, 0, .650856, .827191, .0431178, 0, .670088, .822295, .0407718, 0, .689606, .817294, .0386032, 0, .709434, .812013, .0365675, 0, .7296, .806465, .0346547, 0, .750138, .800691, .0328717, 0, .771093, .794709, .031211, 0, .792519, .788493, .0296504, 0, .814488, .782049, .0281782, 0, .837097, .775403, .0267965, 0, .860481, .76857, .0255002, 0, .884842, .761536, .0242759, 0, .910494, .754303, .0231142, 0, .937985, .74692, .0220305, 0, .968254, .739745, .0210192, 0, 1, 1, .613914, 0, 0, .999996, .613907, 0, 963597e-10, .999942, .613814, 0, .00301247, .999704, .613407, 0, .00870385, .999046, .612302, 0, .0160714, .995516, .608266, 0, .0245899, .991726, .602863, 0, .0339681, .985157, .593956, 0, .0440254, .97642, .581748, 0, .0546409, .964404, .565183, 0, .0657284, .950601, .545273, 0, .0772246, .935158, .522129, 0, .0890812, .919364, .496782, 0, .10126, .904754, .470571, 0, .113731, .89176, .444037, 0, .126469, .881492, .418322, 0, .139454, .873656, .393522, 0, .15267, .868053, .369795, 0, .166101, .864336, .347171, 0, .179736, .862259, .325737, 0, .193565, .861556, .305532, 0, .207578, .861776, .286416, 0, .221769, .862661, .268355, 0, .23613, .864015, .251334, 0, .250656, .865711, .235352, 0, .265343, .867519, .220302, 0, .280187, .869351, .206161, 0, .295183, .871144, .192908, 0, .31033, .872839, .180505, 0, .325624, .874307, .168848, 0, .341065, .875667, .158021, 0, .35665, .876758, .147877, 0, .37238, .87764, .138441, 0, .388253, .878237, .129627, 0, .404269, .878563, .121415, 0, .42043, .878572, .113741, 0, .436735, .87842, .106652, 0, .453187, .878057, .100097, 0, .469786, .877413, .0940128, 0, .486536, .87646, .0883462, 0, .503439, .875233, .0830924, 0, .520498, .8737, .0781975, 0, .537717, .871873, .07364, 0, .555102, .86978, .0694103, 0, .572657, .867405, .0654696, 0, .59039, .864751, .0617914, 0, .608307, .861818, .0583491, 0, .626419, .858645, .0551443, 0, .644733, .855307, .0521894, 0, .663264, .851736, .0494334, 0, .682025, .847927, .0468504, 0, .701032, .843888, .0444261, 0, .720308, .839629, .0421497, 0, .739875, .835158, .0400082, 0, .759764, .830509, .0380076, 0, .780014, .825714, .0361488, 0, .800673, .820729, .0343956, 0, .821803, .815751, .0327781, 0, .843492, .810752, .031275, 0, .86586, .805587, .0298542, 0, .889087, .800317, .0285397, 0, .913466, .79489, .0272948, 0, .93952, .789314, .0261139, 0, .96835, .783593, .0249938, 0, 1, 1, .724258, 0, 0, .999992, .724243, 0, 726889e-9, .99987, .724044, 0, .00569574, .999336, .72317, 0, .0131702, .996271, .719432, 0, .0220738, .991159, .712576, 0, .0319405, .982465, .700927, 0, .0425202, .97049, .684297, 0, .0536599, .953973, .661244, 0, .065258, .935546, .633804, 0, .0772427, .916596, .603071, 0, .0895616, .899353, .57105, 0, .102175, .885216, .539206, 0, .11505, .875076, .508714, 0, .128164, .868334, .479571, 0, .141495, .864414, .451796, 0, .155026, .862678, .425328, 0, .168745, .862835, .400352, 0, .182639, .864067, .376532, 0, .196699, .866086, .35391, 0, .210915, .868557, .332424, 0, .225282, .871271, .312053, 0, .239792, .874058, .292764, 0, .25444, .8768, .27453, 0, .269223, .87939, .257297, 0, .284135, .8819, .24114, 0, .299174, .884187, .225934, 0, .314337, .886262, .211669, 0, .329622, .888119, .198311, 0, .345026, .889709, .185783, 0, .360549, .891054, .174063, 0, .376189, .892196, .163143, 0, .391946, .893101, .152952, 0, .407819, .893803, .143475, 0, .423808, .894277, .134647, 0, .439914, .894532, .126434, 0, .456137, .894576, .1188, 0, .472479, .894393, .111694, 0, .48894, .893976, .105069, 0, .505523, .893346, .0989077, 0, .52223, .892502, .0931724, 0, .539064, .891441, .0878276, 0, .556028, .890276, .082903, 0, .573125, .888972, .0783505, 0, .590361, .887469, .0741083, 0, .607741, .885785, .0701633, 0, .62527, .883914, .0664835, 0, .642957, .881872, .0630567, 0, .660809, .879651, .0598527, 0, .678836, .877267, .0568615, 0, .69705, .874717, .05406, 0, .715465, .872012, .0514378, 0, .734098, .869157, .0489805, 0, .752968, .866155, .0466727, 0, .772101, .863014, .0445056, 0, .791529, .859748, .0424733, 0, .81129, .856416, .0405957, 0, .831438, .852958, .0388273, 0, .852044, .849382, .0371619, 0, .87321, .845694, .0355959, 0, .89509, .841893, .0341155, 0, .917932, .837981, .0327141, 0, .942204, .833963, .0313856, 0, .968981, .829847, .0301275, 0, 1, 1, .85214, 0, 0, .999969, .852095, 0, .00279627, .999483, .851408, 0, .0107635, .994545, .84579, 0, .0206454, .986188, .835231, 0, .0315756, .969847, .814687, 0, .0432021, .945951, .783735, 0, .0553396, .91917, .746074, 0, .0678766, .895488, .706938, 0, .0807395, .878232, .669534, 0, .0938767, .868252, .635168, 0, .10725, .863873, .603069, 0, .120832, .863369, .572514, 0, .134598, .86545, .543169, 0, .148533, .868803, .514578, 0, .16262, .872794, .486762, 0, .176849, .87702, .459811, 0, .19121, .881054, .433654, 0, .205694, .884974, .408574, 0, .220294, .888587, .384525, 0, .235005, .891877, .36156, 0, .24982, .894793, .339661, 0, .264737, .89743, .318913, 0, .279751, .899796, .299302, 0, .294859, .901943, .280843, 0, .310058, .903858, .263481, 0, .325346, .905574, .247197, 0, .340721, .907069, .231915, 0, .356181, .908379, .217614, 0, .371725, .90952, .20425, 0, .387353, .910483, .191758, 0, .403063, .91128, .180092, 0, .418854, .911936, .169222, 0, .434727, .912454, .159098, 0, .450682, .912835, .149668, 0, .466718, .913078, .140884, 0, .482837, .913192, .132709, 0, .499038, .913175, .125095, 0, .515324, .91304, .118012, 0, .531695, .912781, .111417, 0, .548153, .91241, .105281, 0, .5647, .911924, .0995691, 0, .581338, .911331, .0942531, 0, .59807, .910637, .0893076, 0, .6149, .90984, .0846998, 0, .63183, .908941, .0804044, 0, .648865, .907944, .0763984, 0, .666011, .906857, .0726638, 0, .683273, .90568, .0691783, 0, .700659, .904416, .0659222, 0, .718176, .903067, .0628782, 0, .735834, .901637, .0600307, 0, .753646, .900128, .0573647, 0, .771625, .898544, .0548668, 0, .78979, .89689, .052527, 0, .808162, .895165, .0503306, 0, .826771, .893371, .0482668, 0, .845654, .891572, .0463605, 0, .864863, .889763, .0445998, 0, .884472, .887894, .0429451, 0, .904592, .885967, .0413884, 0, .925407, .883984, .0399225, 0, .947271, .881945, .0385405, 0, .97105, .879854, .0372362, 0, 1, .999804, .995833, 0, 0, .938155, .933611, 0, .0158731, .864755, .854311, 0, .0317461, .888594, .865264, 0, .0476191, .905575, .863922, 0, .0634921, .915125, .850558, 0, .0793651, .920665, .829254, 0, .0952381, .924073, .802578, 0, .111111, .926304, .772211, 0, .126984, .927829, .739366, 0, .142857, .928924, .705033, 0, .15873, .92973, .670019, 0, .174603, .930339, .634993, 0, .190476, .930811, .600485, 0, .206349, .931191, .566897, 0, .222222, .93149, .534485, 0, .238095, .931737, .503429, 0, .253968, .931939, .473811, 0, .269841, .932108, .445668, 0, .285714, .93225, .418993, 0, .301587, .932371, .393762, 0, .31746, .932474, .369939, 0, .333333, .932562, .347479, 0, .349206, .932638, .326336, 0, .365079, .932703, .306462, 0, .380952, .93276, .287805, 0, .396825, .932809, .270313, 0, .412698, .932851, .253933, 0, .428571, .932887, .23861, 0, .444444, .932917, .224289, 0, .460317, .932943, .210917, 0, .47619, .932965, .19844, 0, .492063, .932982, .186807, 0, .507937, .932995, .175966, 0, .52381, .933005, .165869, 0, .539683, .933011, .156468, 0, .555556, .933013, .147719, 0, .571429, .933013, .139579, 0, .587302, .93301, .132007, 0, .603175, .933004, .124965, 0, .619048, .932994, .118416, 0, .634921, .932982, .112326, 0, .650794, .932968, .106663, 0, .666667, .93295, .101397, 0, .68254, .932931, .0964993, 0, .698413, .932908, .0919438, 0, .714286, .932883, .0877057, 0, .730159, .932856, .0837623, 0, .746032, .932827, .0800921, 0, .761905, .932796, .0766754, 0, .777778, .932762, .0734936, 0, .793651, .932727, .0705296, 0, .809524, .932689, .0677676, 0, .825397, .93265, .0651929, 0, .84127, .932609, .0627917, 0, .857143, .932565, .0605515, 0, .873016, .932521, .0584606, 0, .888889, .932474, .0565082, 0, .904762, .932427, .0546841, 0, .920635, .932377, .0529793, 0, .936508, .932326, .0513851, 0, .952381, .932274, .0498936, 0, .968254, .93222, .0484975, 0, .984127, .932164, .0471899, 0, 1]
          , n = new Float32Array(e)
          , i = new Float32Array(t);
        t0.LTC_FLOAT_1 = new ir(n,64,64,Ce,St,wn,ne,ne,ie,$0,1),
        t0.LTC_FLOAT_2 = new ir(i,64,64,Ce,St,wn,ne,ne,ie,$0,1),
        t0.LTC_FLOAT_1.needsUpdate = true,
        t0.LTC_FLOAT_2.needsUpdate = true;
        const r = new Uint16Array(e.length);
        e.forEach(function(a, c) {
            r[c] = C9.toHalfFloat(a)
        });
        const s = new Uint16Array(t.length);
        t.forEach(function(a, c) {
            s[c] = C9.toHalfFloat(a)
        }),
        t0.LTC_HALF_1 = new ir(r,64,64,Ce,Nn,wn,ne,ne,ie,$0,1),
        t0.LTC_HALF_2 = new ir(s,64,64,Ce,Nn,wn,ne,ne,ie,$0,1),
        t0.LTC_HALF_1.needsUpdate = true,
        t0.LTC_HALF_2.needsUpdate = true
    }
}
var Zh = `precision highp float;
precision highp int;
#define GLSLIFY 1

uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec4 color;`
  , $h = `precision highp float;
precision highp int;
#define GLSLIFY 1
`
  , Qh = `#define GLSLIFY 1
vec3 objectNormal = vec3( normal );
vec3 transformedNormal = objectNormal;

#ifdef USE_INSTANCING
    mat3 m = mat3( instanceMatrix );
    transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
    transformedNormal = m * transformedNormal;
#endif

transformedNormal = normalMatrix * transformedNormal;

vNormal = normalize( transformedNormal );`;
var Jh = `#define GLSLIFY 1
attribute float aProgress;
attribute float aSpeed;

varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vPosition;
varying vec2 vScreenSpace;
varying vec3 vViewPosition;

uniform float uTime;
uniform float uSpeed;
uniform float uHeightRange;

void main()	{
    vUv = uv;

    vec3 transformed = vec3( position );

    vec3 up = vec3(modelViewMatrix[0][1], modelViewMatrix[1][1], modelViewMatrix[2][1]);
    vec3 right = vec3(modelViewMatrix[0][0], modelViewMatrix[1][0], modelViewMatrix[2][0]);
    vec3 billboardPos = right * position.x + up * position.y;

    vec4 mvPosition = vec4( billboardPos, 1.0 );

    float yPos = mod(aProgress - uTime * aSpeed * 0.25, 1.) * uHeightRange - (uHeightRange * 0.5);
    // float yPos = mod(aProgress, 1.) * 20. - 10.;

    vec4 worldPosition = vec4( transformed, 1.0 );
    #ifdef USE_INSTANCING
        worldPosition = instanceMatrix * worldPosition;
    #endif
    worldPosition.y += yPos;
    worldPosition = modelMatrix * worldPosition;
    vWorldPosition = worldPosition.xyz;

    vPosition = transformed;

    #ifdef USE_INSTANCING
        mvPosition = instanceMatrix * mvPosition;
    #endif

    mvPosition.y += yPos;

    vec4 earlyProjection = projectionMatrix * modelViewMatrix * mvPosition;
    vScreenSpace = earlyProjection.xy / earlyProjection.w * 0.5 + vec2(0.5);

    mvPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * mvPosition;

    vViewPosition = -mvPosition.xyz;
}`
  , ef = `#define GLSLIFY 1
varying vec3 vNormal;
varying vec2 vUv;
varying vec2 vScreenSpace;
varying vec3 vViewPosition;

uniform sampler2D uBgTexture;
uniform sampler2D uNormalTexture;
uniform float uBaseBrightness;
uniform float uRefraction;

void main() {
    vec4 normalColor = texture2D(uNormalTexture, vUv);

    if (normalColor.a < 0.5) discard;

    vec3 normal = normalize(normalColor.rgb * 2. - 1.);

    vec2 uv = vUv;
    uv = normal.xy;
    uv = vec2(vScreenSpace.x, vScreenSpace.y) + uv * uRefraction;

    vec4 bgColor = texture2D(uBgTexture, uv);

    // vec3 rainColor = vec3(0.89, 0.92, 1.);
    // gl_FragColor = vec4(rainColor, 1.);
    gl_FragColor = vec4(bgColor.rgb + uBaseBrightness * pow(normal.b, 10.), 1.);
    // gl_FragColor = vec4(normal.rgb, 1.);
}`;
class tf extends ve {
    constructor(e={}) {
        super({
            vertexShader: Jh,
            fragmentShader: ef,
            uniforms: {
                uTime: {
                    value: 0
                },
                uBgTexture: {
                    value: e.renderTarget.texture
                },
                uNormalTexture: {
                    value: e.normalMap
                },
                uHeightRange: {
                    value: e.heightRange
                },
                uBaseBrightness: {
                    value: .07
                },
                uRefraction: {
                    value: .05
                }
            }
        })
    }
}
var nf = `#define GLSLIFY 1
attribute vec2 uv2;

varying vec4 vMirrorCoord;
varying vec2 vUv;
varying vec2 vUv2;
varying vec3 vWorldPosition;

uniform mat4 uTextureMatrix;

void main () {
	vec3 transformedPosition = position;

	vUv = uv;
	vUv2 = uv2;

	vWorldPosition = (modelMatrix * vec4(position, 1.)).xyz;

	vMirrorCoord = uTextureMatrix * vec4( transformedPosition, 1.0 );

	vec4 mvPosition = vec4( transformedPosition, 1.0 );
	mvPosition = modelViewMatrix * mvPosition;

	gl_Position = projectionMatrix * mvPosition;
}`
  , rf = `#define GLSLIFY 1
float blendSoftLight(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

vec3 blendSoftLight(vec3 base, vec3 blend) {
	return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));
}

vec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {
	return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
}

float blendLinearDodge(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}

vec3 blendLinearDodge(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}

vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
	return (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));
}

float blendLinearBurn(float base, float blend) {
	// Note : Same implementation as BlendSubtractf
	return max(base+blend-1.0,0.0);
}

vec3 blendLinearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubtract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {
	return (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));
}

float blendLinearLight(float base, float blend) {
	return blend<0.5?blendLinearBurn(base,(2.0*blend)):blendLinearDodge(base,(2.0*(blend-0.5)));
}

vec3 blendLinearLight(vec3 base, vec3 blend) {
	return vec3(blendLinearLight(base.r,blend.r),blendLinearLight(base.g,blend.g),blendLinearLight(base.b,blend.b));
}

vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
	return (blendLinearLight(base, blend) * opacity + base * (1.0 - opacity));
}

varying vec4 vMirrorCoord;
varying vec2 vUv;
varying vec2 vUv2;
varying vec3 vWorldPosition;

uniform sampler2D uRoughnessTexture;
uniform sampler2D uNormalTexture;
uniform sampler2D uOpacityTexture;
uniform vec2 uTexScale;
uniform sampler2D uTexture;
uniform vec2 uMipmapTextureSize;
uniform float uDistortionAmount;
uniform float uBlurStrength;
uniform float uTime;
uniform float uRainCount;

vec4 cubic(float v) {
    vec4 n = vec4(1.0, 2.0, 3.0, 4.0) - v;
    vec4 s = n * n * n;
    float x = s.x;
    float y = s.y - 4.0 * s.x;
    float z = s.z - 4.0 * s.y + 6.0 * s.x;
    float w = 6.0 - x - y - z;
    return vec4(x, y, z, w);
}

// https://stackoverflow.com/questions/13501081/efficient-bicubic-filtering-code-in-glsl
vec4 textureBicubic(sampler2D t, vec2 texCoords, vec2 textureSize) {
    vec2 invTexSize = 1.0 / textureSize;
    texCoords = texCoords * textureSize - 0.5;

    vec2 fxy = fract(texCoords);
    texCoords -= fxy;
    vec4 xcubic = cubic(fxy.x);
    vec4 ycubic = cubic(fxy.y);

    vec4 c = texCoords.xxyy + vec2(-0.5, 1.5).xyxy;

    vec4 s = vec4(xcubic.xz + xcubic.yw, ycubic.xz + ycubic.yw);
    vec4 offset = c + vec4(xcubic.yw, ycubic.yw) / s;

    offset *= invTexSize.xxyy;

    vec4 sample0 = texture2D(t, offset.xz);
    vec4 sample1 = texture2D(t, offset.yz);
    vec4 sample2 = texture2D(t, offset.xw);
    vec4 sample3 = texture2D(t, offset.yw);

    float sx = s.x / (s.x + s.y);
    float sy = s.z / (s.z + s.w);

    return mix(mix(sample3, sample2, sx), mix(sample1, sample0, sx), sy);
}

// With original size argument
vec4 packedTexture2DLOD(sampler2D tex, vec2 uv, int level, vec2 originalPixelSize) {
    float floatLevel = float(level);
    vec2 atlasSize;
    atlasSize.x = floor(originalPixelSize.x * 1.5);
    atlasSize.y = originalPixelSize.y;

    // we stop making mip maps when one dimension == 1

    float maxLevel = min(floor(log2(originalPixelSize.x)), floor(log2(originalPixelSize.y)));
    floatLevel = min(floatLevel, maxLevel);

    // use inverse pow of 2 to simulate right bit shift operator

    vec2 currentPixelDimensions = floor(originalPixelSize / pow(2.0, floatLevel));
    vec2 pixelOffset = vec2(floatLevel > 0.0 ? originalPixelSize.x : 0.0, floatLevel > 0.0 ? currentPixelDimensions.y : 0.0);

    // "minPixel / atlasSize" samples the top left piece of the first pixel
    // "maxPixel / atlasSize" samples the bottom right piece of the last pixel
    vec2 minPixel = pixelOffset;
    vec2 maxPixel = pixelOffset + currentPixelDimensions;
    vec2 samplePoint = mix(minPixel, maxPixel, uv);
    samplePoint /= atlasSize;
    vec2 halfPixelSize = 1.0 / (2.0 * atlasSize);
    samplePoint = min(samplePoint, maxPixel / atlasSize - halfPixelSize);
    samplePoint = max(samplePoint, minPixel / atlasSize + halfPixelSize);
    return textureBicubic(tex, samplePoint, originalPixelSize);
}

vec4 packedTexture2DLOD(sampler2D tex, vec2 uv, float level, vec2 originalPixelSize) {
    float ratio = mod(level, 1.0);
    int minLevel = int(floor(level));
    int maxLevel = int(ceil(level));
    vec4 minValue = packedTexture2DLOD(tex, uv, minLevel, originalPixelSize);
    vec4 maxValue = packedTexture2DLOD(tex, uv, maxLevel, originalPixelSize);
    return mix(minValue, maxValue, ratio);
}

// Rain drop shader from https://www.shadertoy.com/view/ldfyzl Ctrl-Alt-Test (http://www.ctrl-alt-test.fr)
// Maximum number of cells a ripple can cross.
#define MAX_RADIUS 1

// Hash functions shamefully stolen from:
// https://www.shadertoy.com/view/4djSRW
#define HASHSCALE1 .1031
#define HASHSCALE3 vec3(.1031, .1030, .0973)

float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * HASHSCALE1);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * HASHSCALE3);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.xx + p3.yz) * p3.zy);

}

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
    vec2 texUv = vUv * uTexScale;
    float floorOpacity = texture2D(uOpacityTexture, texUv).r;
    vec3 floorNormal = texture2D(uNormalTexture, texUv).rgb * 2. - 1.;
    floorNormal = normalize(floorNormal);
    float roughness = texture2D(uRoughnessTexture, texUv).r;

    vec2 reflectionUv = vMirrorCoord.xy / vMirrorCoord.w;

    vec2 rippleUv = 75. * vUv * uTexScale;

    vec2 p0 = floor(rippleUv);

    float rainStrength = map(uRainCount, 0., 10000., 3., 0.5);
    if(rainStrength == 3.) {
        rainStrength = 50.;
    }

    vec2 circles = vec2(0.);
    for(int j = -MAX_RADIUS; j <= MAX_RADIUS; ++j) {
        for(int i = -MAX_RADIUS; i <= MAX_RADIUS; ++i) {
            vec2 pi = p0 + vec2(i, j);
            vec2 hsh = pi;
            vec2 p = pi + hash22(hsh);

            float t = fract(0.8 * uTime + hash12(hsh));
            vec2 v = p - rippleUv;
            float d = length(v) - (float(MAX_RADIUS) + 1.) * t + (rainStrength * 0.1 * t);

            float h = 1e-3;
            float d1 = d - h;
            float d2 = d + h;
            float p1 = sin(31. * d1) * smoothstep(-0.6, -0.3, d1) * smoothstep(0., -0.3, d1);
            float p2 = sin(31. * d2) * smoothstep(-0.6, -0.3, d2) * smoothstep(0., -0.3, d2);
            circles += 0.5 * normalize(v) * ((p2 - p1) / (2. * h) * pow(1. - t, rainStrength));
        }
    }
    circles /= float((MAX_RADIUS * 2 + 1) * (MAX_RADIUS * 2 + 1));

    float intensity = 0.05 * floorOpacity;
    vec3 n = vec3(circles, sqrt(1. - dot(circles, circles)));

    vec3 color = packedTexture2DLOD(uTexture, reflectionUv + floorNormal.xy * uDistortionAmount - intensity * n.xy, roughness * uBlurStrength, uMipmapTextureSize).rgb;

    gl_FragColor = vec4(color, 1.0);
}`;
class sf extends ve {
    constructor(e={}) {
        e = L3({
            uniforms: {
                uDiffuse: {
                    value: null
                },
                uDistortionAmount: {
                    value: .1065
                },
                uBlurStrength: {
                    value: 6.3
                },
                uRoughnessTexture: {
                    value: null
                },
                uOpacityTexture: {
                    value: null
                },
                uNormalTexture: {
                    value: null
                },
                uTexScale: {
                    value: new THREE.Vector2(1.38,4.07)
                },
                uTime: {
                    value: 0
                },
                uRainCount: {
                    value: 0
                }
            }
        }, e),
        super({
            vertexShader: nf,
            fragmentShader: rf,
            uniforms: e.uniforms
        })
    }
}
function af() {
    w0.defaultVert = Ma(Zh),
    w0.defaultFrag = Ma($h),
    w0.normalsVert = Ma(Qh)
}
class j9 {
    get camera() {
        return this._camera
    }
    get material() {
        return this._mesh.material
    }
    set material(e) {
        this._mesh.material = e
    }
    constructor(e) {
        const t = new THREE.OrthographicCamera(-1,1,1,-1,0,1)
          , n = new Sr(2,2);
        this._mesh = new K0(n,e),
        this._camera = t
    }
    dispose() {
        this._mesh.geometry.dispose()
    }
    render(e) {
        e.render(this._mesh, this._camera)
    }
}
var of = `precision highp float;
precision highp int;
#define GLSLIFY 1

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0 );
}`
  , lf = `precision highp float;
precision highp int;
#define GLSLIFY 1

uniform sampler2D uTexture;

varying vec2 vUv;

void main () {
    gl_FragColor = texture2D(uTexture, vUv);
}
`
  , cf = `#define GLSLIFY 1
varying vec2 vUv;

void main() {
    #include <begin_vertex>
    #include <project_vertex>
    vUv = uv;
}`
  , uf = `#define GLSLIFY 1
varying vec2 vUv;

uniform sampler2D map;
uniform int parentLevel;
uniform vec2 parentMapSize;
uniform vec2 originalMapSize;

// With original size argument
vec4 packedTexture2DLOD( sampler2D tex, vec2 uv, int level, vec2 originalPixelSize ) {

    float floatLevel = float( level );
    vec2 atlasSize;
    atlasSize.x = floor( originalPixelSize.x * 1.5 );
    atlasSize.y = originalPixelSize.y;

    // we stop making mip maps when one dimension == 1
    float maxLevel = min( floor( log2( originalPixelSize.x ) ), floor( log2( originalPixelSize.y ) ) );
    floatLevel = min( floatLevel, maxLevel );

    // use inverse pow of 2 to simulate right bit shift operator
    vec2 currentPixelDimensions = floor( originalPixelSize / pow( 2.0, floatLevel ) );
    vec2 pixelOffset = vec2(
        floatLevel > 0.0 ? originalPixelSize.x : 0.0,
        floatLevel > 0.0 ? currentPixelDimensions.y : 0.0
    );

    // "minPixel / atlasSize" samples the top left piece of the first pixel
    // "maxPixel / atlasSize" samples the bottom right piece of the last pixel
    vec2 minPixel = pixelOffset;
    vec2 maxPixel = pixelOffset + currentPixelDimensions;
    vec2 samplePoint = mix( minPixel, maxPixel, uv );
    samplePoint /= atlasSize;

    vec2 halfPixelSize = 1.0 / ( 2.0 * atlasSize );
    samplePoint = min( samplePoint, maxPixel / atlasSize - halfPixelSize );
    samplePoint = max( samplePoint, minPixel / atlasSize + halfPixelSize );

    return texture2D( tex, samplePoint );

}

#define SAMPLES 6

vec4 sampleAt( vec2 uv ) {
    return packedTexture2DLOD( map, uv, parentLevel, originalMapSize );
}

void main() {

    vec2 childMapSize = parentMapSize / 2.0;
    vec2 childPixelPos = floor( vUv * childMapSize );

    vec2 parentPixelSize = 1.0 / parentMapSize;
    vec2 halfParentPixelSize = parentPixelSize / 2.0;
    vec2 parentPixelPos = childPixelPos * 2.0;

    vec2 baseUv = ( parentPixelPos / parentMapSize ) + halfParentPixelSize;

    vec4 samples[ SAMPLES ];
    float weights[ SAMPLES ];

    float xden = 2.0 * parentMapSize.x + 1.0;
    float wx0 = ( parentMapSize.x - parentPixelPos.x ) / xden;
    float wx1 = ( parentMapSize.x ) / xden;
    float wx2 = ( parentPixelPos.x + 1.0 ) / xden;

    float yden = 2.0 * parentMapSize.y + 1.0;
    float wy0 = ( parentMapSize.y - parentPixelPos.y ) / yden;
    float wy1 = ( parentMapSize.y ) / yden;
    float wy2 = ( parentPixelPos.y + 1.0 ) / yden;

    samples[ 0 ] = sampleAt( baseUv );
    samples[ 1 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 0.0 ) );
    samples[ 2 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, 0.0 ) );

    samples[ 3 ] = sampleAt( baseUv + vec2( 0.0, parentPixelSize.y ) );
    samples[ 4 ] = sampleAt( baseUv + vec2( parentPixelSize.x, parentPixelSize.y ) );
    samples[ 5 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, parentPixelSize.y ) );

    // samples[ 6 ] = sampleAt( baseUv + vec2( 0.0, 2.0 * parentPixelSize.y ) );
    // samples[ 7 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 2.0 * parentPixelSize.y ) );
    // samples[ 8 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, 2.0 * parentPixelSize.y ) );

    weights[ 0 ] = wx0 * wy0;
    weights[ 1 ] = wx1 * wy0;
    weights[ 2 ] = wx2 * wy0;

    weights[ 3 ] = wx0 * wy1;
    weights[ 4 ] = wx1 * wy1;
    weights[ 5 ] = wx2 * wy1;

    // weights[ 6 ] = wx0 * wy2;
    // weights[ 7 ] = wx1 * wy2;
    // weights[ 8 ] = wx2 * wy2;

    #pragma unroll_loop
    for ( int i = 0; i < SAMPLES; i ++ ) {
        gl_FragColor += samples[ i ] * weights[ i ];
    }
}`;
class hf {
    constructor() {
        this.material = new ve({
            vertexShader: cf,
            fragmentShader: uf,
            uniforms: {
                map: {
                    value: null
                },
                originalMapSize: {
                    value: new THREE.Vector2()
                },
                parentMapSize: {
                    value: new THREE.Vector2()
                },
                parentLevel: {
                    value: 0
                }
            }
        }),
        this.swapTarget = new ke,
        this.swapTarget.texture.minFilter = $0,
        this.swapTarget.texture.magFilter = $0,
        this.copyQuad = new j9(new xu({
            vertexShader: of,
            fragmentShader: lf,
            uniforms: {
                uTexture: {
                    value: null
                }
            },
            depthTest: false,
            depthWrite: false,
            blending: Vt
        })),
        this.mipQuad = new j9(this.material),
        this.size = new THREE.Vector2(),
        this.targetSize = new THREE.Vector2(),
        this.maxMipMapLevel = 1
    }
    resize(e, t) {
        const n = Math.floor(e.x)
          , i = Math.floor(e.y);
        this.size.set(n, i),
        this.targetSize.set(Math.floor(this.size.x * 1.5), this.size.y),
        t.setSize(this.targetSize.x, this.targetSize.y),
        this.swapTarget.setSize(this.targetSize.x, this.targetSize.y)
    }
    update(e, t, n) {
        const i = n.autoClear
          , r = n.getRenderTarget();
        n.autoClear = false,
        this.copyQuad.material.uniforms.uTexture.value = e,
        n.setRenderTarget(this.swapTarget),
        this.copyQuad.render(n);
        let s = this.size.x
          , a = this.size.y
          , c = 0;
        for (; s > this.maxMipMapLevel && a > this.maxMipMapLevel; ) {
            this.material.uniforms.map.value = this.swapTarget.texture,
            this.material.uniforms.parentLevel.value = c,
            this.material.uniforms.parentMapSize.value.set(s, a),
            this.material.uniforms.originalMapSize.value.set(this.size.x, this.size.y),
            s = Math.floor(s / 2),
            a = Math.floor(a / 2);
            const u = this.targetSize.y - 2 * a;
            n.setRenderTarget(t),
            this.mipQuad.camera.setViewOffset(s, a, -this.size.x, -u, this.targetSize.x, this.targetSize.y),
            this.mipQuad.render(n),
            n.setRenderTarget(this.swapTarget),
            this.material.uniforms.map.value = t.texture,
            this.mipQuad.render(n),
            c++
        }
        n.setRenderTarget(r),
        n.autoClear = i
    }
    dispose() {
        this.swapTarget.dispose(),
        this.mipQuad.dispose(),
        this.copyQuad.dispose()
    }
}
class ff extends K0 {
    constructor(t, n, i) {
        super(t, n);
        setProperty(this, "onResize", ()=>{
            this.textureSize.set(H.window.w * .5, H.window.h * .5),
            this.mipmapper.resize(this.textureSize, this.renderTarget)
        }
        );
        this.name = i,
        this.ignoreObjects = [],
        this.renderReflection = true,
        this.camera = null,
        this.scene = null,
        this.sceneCamera = null,
        this.enabled = true,
        this.reflectorPlane = new tn,
        this.normal = new R,
        this.reflectorWorldPosition = new R,
        this.cameraWorldPosition = new R,
        this.rotationMatrix = new R0,
        this.lookAtPosition = new R(0,0,-1),
        this.clipPlane = new U0,
        this.view = new R,
        this.target = new R,
        this.q = new U0,
        this.textureSize = new THREE.Vector2(H.window.w * .5,H.window.h * .5),
        this.textureMatrix = new R0,
        this.renderTarget = new ke(this.textureSize.x,this.textureSize.y,{
            minFilter: ie
        }),
        this.mipmapper = new hf,
        this.mipmapper.resize(this.textureSize, this.renderTarget),
        this.material.uniforms.uTextureMatrix = {
            value: this.textureMatrix
        },
        this.material.uniforms.uTexture = {
            value: this.renderTarget.texture
        },
        this.material.uniforms.uMipmapTextureSize = {
            value: this.mipmapper.targetSize
        },
        this.matrixAutoUpdate = false,
        this.renderCount = 0,
        E(H0.RESIZE, this.onResize)
    }
    onBeforeRender() {
        if (!this.enabled || (this.renderCount++,
        this.reflectorWorldPosition.setFromMatrixPosition(this.matrixWorld),
        this.cameraWorldPosition.setFromMatrixPosition(this.sceneCamera.matrixWorld),
        this.rotationMatrix.extractRotation(this.matrixWorld),
        this.rotationMatrix.makeRotationX(en.degToRad(-90)),
        this.normal.set(0, 0, 1),
        this.normal.applyMatrix4(this.rotationMatrix),
        this.view.subVectors(this.reflectorWorldPosition, this.cameraWorldPosition),
        this.view.dot(this.normal) > 0))
            return;
        this.view.reflect(this.normal).negate(),
        this.view.add(this.reflectorWorldPosition),
        this.rotationMatrix.extractRotation(this.sceneCamera.matrixWorld),
        this.lookAtPosition.set(0, 0, -1),
        this.lookAtPosition.applyMatrix4(this.rotationMatrix),
        this.lookAtPosition.add(this.cameraWorldPosition),
        this.target.subVectors(this.reflectorWorldPosition, this.lookAtPosition),
        this.target.reflect(this.normal).negate(),
        this.target.add(this.reflectorWorldPosition),
        this.camera.position.copy(this.view),
        this.camera.up.set(0, 1, 0),
        this.camera.up.applyMatrix4(this.rotationMatrix),
        this.camera.up.reflect(this.normal),
        this.camera.lookAt(this.target),
        this.camera.far = this.sceneCamera.far,
        this.camera.updateMatrixWorld(),
        this.camera.projectionMatrix.copy(this.sceneCamera.projectionMatrix),
        this.textureMatrix.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1),
        this.textureMatrix.multiply(this.camera.projectionMatrix),
        this.textureMatrix.multiply(this.camera.matrixWorldInverse),
        this.textureMatrix.multiply(this.matrixWorld),
        this.reflectorPlane.setFromNormalAndCoplanarPoint(this.normal, this.reflectorWorldPosition),
        this.reflectorPlane.applyMatrix4(this.camera.matrixWorldInverse),
        this.clipPlane.set(this.reflectorPlane.normal.x, this.reflectorPlane.normal.y, this.reflectorPlane.normal.z, this.reflectorPlane.constant);
        const t = this.camera.projectionMatrix;
        if (this.q.x = (Math.sign(this.clipPlane.x) + t.elements[8]) / t.elements[0],
        this.q.y = (Math.sign(this.clipPlane.y) + t.elements[9]) / t.elements[5],
        this.q.z = -1,
        this.q.w = (1 + t.elements[10]) / t.elements[14],
        this.clipPlane.multiplyScalar(2 / this.clipPlane.dot(this.q)),
        t.elements[2] = this.clipPlane.x,
        t.elements[6] = this.clipPlane.y,
        t.elements[10] = this.clipPlane.z + 1 - .003,
        t.elements[14] = this.clipPlane.w,
        this.renderCount % 2 !== 0) {
            this.visible = false;
            for (let n = 0; n < this.ignoreObjects.length; n++)
                this.ignoreObjects[n].visible = false;
            if (this.renderReflection) {
                const n = H.WebGL.renderer.getRenderTarget();
                H.WebGL.renderer.setRenderTarget(this.renderTarget),
                H.WebGL.renderer.setViewport(0, 0, this.textureSize.x / H.WebGL.renderer.getPixelRatio(), this.textureSize.y / H.WebGL.renderer.getPixelRatio()),
                H.WebGL.renderer.setScissor(0, 0, this.textureSize.x, this.textureSize.y),
                H.WebGL.renderer.setScissorTest(true),
                H.WebGL.renderer.clear(true),
                H.WebGL.renderer.render(this.scene, this.camera),
                H.WebGL.renderer.setRenderTarget(null),
                H.WebGL.renderer.setViewport(0, 0, H.window.w, H.window.h),
                H.WebGL.renderer.setScissor(0, 0, H.window.w, H.window.h),
                H.WebGL.renderer.setRenderTarget(n),
                this.mipmapper.update(this.renderTarget.texture, this.renderTarget, H.WebGL.renderer)
            }
            this.visible = true;
            for (let n = 0; n < this.ignoreObjects.length; n++)
                this.ignoreObjects[n].visible = true
        }
    }
    updateCameraScene(t, n) {
        this.sceneCamera = t,
        this.camera = t.clone(),
        this.scene = n
    }
    clearIgnoreObjects() {
        this.ignoreObjects = []
    }
    destroy() {
        this.renderTarget.dispose(),
        this.geometry.dispose(),
        this.material.dispose(),
        E(H0.RESIZE, this.onResize)
    }
}
class df extends ff {
    constructor(e, t, n, i, r, s, a) {
        super(e.clone(), new sf(a), s),
        this.material.uniforms.uRoughnessTexture.value = t,
        this.material.uniforms.uNormalTexture.value = n,
        this.material.uniforms.uOpacityTexture.value = i,
        this.material.uniforms.uRainCount.value = r,
        this.geometry.computeBoundingBox(),
        this.geometry.computeBoundingSphere(),
        this.updateMatrix(),
        this.updateMatrixWorld(),
        this.updateCameraScene(H.MainScene.controls.enabled ? H.MainScene.devCamera : H.MainScene.camera, H.MainScene)
    }
}
class pf extends cu {
    constructor() {
        super();
        setProperty(this, "onRaf", ()=>{
            this.renderCount++,
            this.controls.update(),
            this.smoothMouse[0].lerp(H.pointer.glNormalized, .03),
            this.smoothMouse[1].lerp(H.pointer.glNormalized, .07),
            this.updateCamera(),
            this.meshes.rain.material.uniforms.uTime.value += H.WebGL.clockDelta * this.meshes.rain.speed,
            this.meshes.floor.material.uniforms.uTime.value += H.WebGL.clockDelta * this.meshes.rain.speed,
            this.renderCount % 2 !== 0 && (this.meshes.rain.visible = false,
            this.meshes.floor.enabled = false,
            H.WebGL.renderer.setRenderTarget(this.rainBgRt),
            H.WebGL.renderer.render(this, this.controls.enabled ? this.devCamera : this.camera),
            H.WebGL.renderer.setRenderTarget(null),
            this.meshes.rain.visible = true,
            this.meshes.floor.enabled = true),
            this.controls.enabled ? H.WebGL.renderer.render(this, this.devCamera) : this.composer.render()
        }
        );
        setProperty(this, "onPointerDown", t=>{
            t.target === document.body && (H.Audio.lerpSpeed("rain", .2, 500),
            H.Audio.filterTo({
                key: "rain",
                duration: 500,
                type: "lowpass",
                from: {
                    frequency: 12e3
                },
                to: {
                    frequency: 500
                }
            }),
            gsap.timeline({
                defaults: {
                    duration: 2,
                    ease: "power2.out",
                    overwrite: true
                }
            }).to(this.meshes.rain, {
                speed: .02
            }, "<").to(this.options, {
                cameraTranslateZ: -3
            }, "<"))
        }
        );
        setProperty(this, "onPointerUp", t=>{
            t.target === document.body && (H.Audio.lerpSpeed("rain", 1, 750),
            H.Audio.filterTo({
                key: "rain",
                duration: 750,
                type: "lowpass",
                to: {
                    frequency: 12e3
                },
                from: {
                    frequency: 500
                }
            }),
            gsap.timeline({
                defaults: {
                    duration: 1,
                    ease: "power2.inOut",
                    overwrite: true
                }
            }).to(this.meshes.rain, {
                speed: 1
            }, "<").to(this.options, {
                cameraTranslateZ: 0
            }, "<"))
        }
        );
        setProperty(this, "onResize", ()=>{
            this.camera.aspect = H.window.w / H.window.h,
            this.camera.updateProjectionMatrix(),
            this.composer.setSize(H.window.w, H.window.h),
            this.fxaaPass.material.uniforms.resolution.value.x = 1 / (H.window.w * H.WebGL.renderer.getPixelRatio()),
            this.fxaaPass.material.uniforms.resolution.value.y = 1 / (H.window.h * H.WebGL.renderer.getPixelRatio())
        }
        );
        this.options = {
            color: new m0(16735964),
            bloomEnabled: true,
            controls: H.urlParams.has("controls"),
            mouseMoveAngle: new THREE.Vector2(.5,.08),
            cameraZOffset: 10,
            cameraTranslateZ: 10
        },
        this.camera = new Me(70,H.window.w / H.window.h,.5,1e3),
        this.cameraPosition = new R(0,2,9),
        this.camera.position.copy(this.cameraPosition),
        this.cameraLookAt = new R(0,2,0),
        this.devCamera = new Me(70,H.window.w / H.window.h,.1,1e3),
        this.devCamera.position.set(0, 4, 10),
        this.background = new m0(0),
        this.controls = new Gh(this.devCamera,H.WebGL.renderer.domElement),
        this.controls.enabled = this.options.controls,
        this.controls.enableDamping = true,
        this.controls.target = this.cameraLookAt,
        this.dummyObject = new re,
        this._quaternion = new ot,
        this._euler = new Oi,
        this.smoothMouse = [new THREE.Vector2(), new THREE.Vector2()],
        this.renderCount = 1,
        Kh.init(),
        this.composer = new qh(H.WebGL.renderer),
        this.load(),
        E("App:start", ()=>{
            this.build(),
            this.addEvents(),
            setTimeout(()=>{
                E(H0.POINTERDOWN, this.onPointerDown),
                E(H0.POINTERUP, this.onPointerUp)
            }
            , 2500)
        }
        )
    }
    build() {
        this.meshes = {},
        this.buildRain(),
        this.buildFloor(),
        this.meshes.u = new K0(this.assets.models.u,new wt({
            color: this.options.color
        })),
        this.add(this.meshes.u),
        this.meshes.power = new K0(this.assets.models.power,new Jr({
            color: 3092271,
            shininess: 150
        })),
        this.add(this.meshes.power),
        this.meshes.cable = new K0(this.assets.models.cable,new Jr({
            color: 3092271,
            shininess: 150
        })),
        this.add(this.meshes.cable),
        this.meshes.stand = new K0(this.assets.models.stand,new Jr({
            color: 3092271,
            shininess: 50
        })),
        this.add(this.meshes.stand),
        this.meshes.walls = new K0(this.assets.models.walls,new Jr({
            color: 1118481,
            normalMap: this.assets.textures.brickNormal,
            normalScale: new THREE.Vector2(.5,.5),
            shininess: 50
        })),
        this.add(this.meshes.walls),
        this.meshes.door = new on,
        this.meshes.door.shutter = new K0(this.assets.models.shutter,new At({
            map: this.assets.textures.shutterDiffuse,
            roughnessMap: this.assets.textures.shutterGlossiness,
            normalMap: this.assets.textures.shutterNormal,
            reflectivity: .8,
            roughness: .5,
            metalness: .3,
            specularIntensity: .5
        })),
        this.meshes.door.sideCover = new K0(this.assets.models.sideCover,new At({
            map: this.assets.textures.sideCoverDiffuse,
            reflectivity: .7,
            roughness: .5,
            metalness: .2,
            specularIntensity: .5
        })),
        this.meshes.door.topCover = new K0(this.assets.models.topCover,new At({
            map: this.assets.textures.topCoverDiffuse,
            reflectivity: .7,
            roughness: .5,
            metalness: .2,
            specularIntensity: .5
        })),
        this.meshes.door.add(this.meshes.door.shutter),
        this.meshes.door.add(this.meshes.door.sideCover),
        this.meshes.door.add(this.meshes.door.topCover),
        this.add(this.meshes.door),
        this.lights = {},
        this.lights.pLight1 = new Za(this.options.color,.4,17,.8),
        this.lights.pLight1.position.y = 2.3,
        this.add(this.lights.pLight1),
        this.lights.pLight2 = new Za(8505586,2,30),
        this.lights.pLight2.position.y = 30,
        this.lights.pLight2.position.z = 0,
        this.add(this.lights.pLight2),
        this.lights.rLight1 = new Fu(9033727,66),
        this.lights.rLight1.position.set(0, 8.066, -9.8),
        this.lights.rLight1.rotation.set(en.degToRad(90), en.degToRad(180), 0),
        this.lights.rLight1.width = 19.1,
        this.lights.rLight1.height = .2,
        this.add(this.lights.rLight1),
        this.lights.rLight1Helper = new Yh(this.lights.rLight1),
        this.add(this.lights.rLight1Helper),
        this.startFlicker(),
        this.buildPasses()
    }
    buildRain() {
        this.rainBgRt = new ke(H.window.w * .1,H.window.h * .1);
        const t = 1e4;
        this.meshes.rain = new pu(new Sr,new tf({
            renderTarget: this.rainBgRt,
            normalMap: this.assets.textures.rainNormal,
            heightRange: 20
        }),t);
        const n = []
          , i = [];
        for (let r = 0; r < t; r++)
            this.dummyObject.position.set(en.randFloat(-10, 10), 0, en.randFloat(-20, 10)),
            this.dummyObject.scale.set(.03, en.randFloat(.3, .5), .03),
            this.dummyObject.updateMatrix(),
            this.meshes.rain.setMatrixAt(r, this.dummyObject.matrix),
            n.push(Math.random()),
            i.push(this.dummyObject.scale.y * 10);
        this.meshes.rain.geometry.setAttribute("aProgress", new _s(new Float32Array(n),1)),
        this.meshes.rain.geometry.setAttribute("aSpeed", new _s(new Float32Array(i),1)),
        this.meshes.rain.rotation.set(-.1, 0, .1),
        this.meshes.rain.position.y = 9,
        this.meshes.rain.position.z = 9,
        this.meshes.rain.count = 2e3,
        this.meshes.rain.speed = 1,
        this.add(this.meshes.rain)
    }
    buildFloor() {
        this.meshes.floor = new df(this.assets.models.floor,this.assets.textures.floorRoughness,this.assets.textures.floorNormal,this.assets.textures.floorOpacity,this.meshes.rain.count),
        this.meshes.floor.ignoreObjects.push(this.meshes.rain),
        this.add(this.meshes.floor)
    }
    buildPasses() {
        this.renderScene = new jh(this,this.camera),
        this.fxaaPass = new io(Xh),
        this.fxaaPass.material.uniforms.resolution.value.x = 1 / (H.window.w * H.WebGL.renderer.getPixelRatio()),
        this.fxaaPass.material.uniforms.resolution.value.y = 1 / (H.window.h * H.WebGL.renderer.getPixelRatio()),
        this.bloomPass = new Di(new THREE.Vector2(H.window.w,H.window.h),2.011,.935,.424),
        this.bloomPass.enabled = this.options.bloomEnabled,
        this.composer.addPass(this.renderScene),
        this.composer.addPass(this.fxaaPass),
        this.composer.addPass(this.bloomPass)
    }
    startFlicker() {
        let t;
        setInterval(()=>{
            Math.random() < .5 && (clearTimeout(t),
            this.turnLightOff(),
            t = setTimeout(()=>{
                this.turnLightOn(),
                t = setTimeout(()=>{
                    this.turnLightOff(),
                    t = setTimeout(()=>{
                        this.turnLightOn()
                    }
                    , 200 * Math.random())
                }
                , 200 * Math.random())
            }
            , 200 * Math.random()))
        }
        , 3e3)
    }
    turnLightOff() {
        this.meshes.u.material.color.set(0),
        this.lights.pLight1.color.set(0)
    }
    turnLightOn() {
        this.meshes.u.material.color.copy(this.options.color),
        this.lights.pLight1.color.copy(this.options.color)
    }
    updateCamera() {
        this.camera.position.copy(this.cameraPosition),
        this.camera.lookAt(this.cameraLookAt),
        !this.controls.enabled && (this.camera.translateZ(-this.options.cameraZOffset),
        this._euler.set(this.smoothMouse[0].y * this.options.mouseMoveAngle.y, -this.smoothMouse[0].x * this.options.mouseMoveAngle.x, 0),
        this._quaternion.setFromEuler(this._euler),
        this.camera.quaternion.multiply(this._quaternion),
        this._euler.set(0, 0, (this.smoothMouse[0].x - this.smoothMouse[1].x) * -.1),
        this._quaternion.setFromEuler(this._euler),
        this.camera.quaternion.multiply(this._quaternion),
        this.camera.translateZ(this.options.cameraTranslateZ),
        this.camera.translateZ(this.options.cameraZOffset),
        this.camera.updateMatrixWorld())
    }
    addEvents() {
        E(H0.RESIZE, this.onResize),
        H.RAFCollection.add(this.onRaf, 3)
    }
    load() {
        this.assets = {
            textures: {},
            models: {}
        },
        H.AssetLoader.loadTexture("./images/rain-normal.png", {
            flipY: false
        }).then(n=>{
            this.assets.textures.rainNormal = n
        }
        ),
        H.AssetLoader.loadTexture("./images/brick-normal2.jpg", {
            wrapping: Mt
        }).then(n=>{
            n.rotation = en.degToRad(90),
            n.repeat.set(5, 8),
            this.assets.textures.brickNormal = n
        }
        ),
        H.AssetLoader.loadTexture("./images/roughness.jpg", {
            wrapping: Mt
        }).then(n=>{
            this.assets.textures.floorRoughness = n
        }
        ),
        H.AssetLoader.loadTexture("./images/opacity.jpg", {
            wrapping: Mt
        }).then(n=>{
            this.assets.textures.floorOpacity = n
        }
        ),
        H.AssetLoader.loadTexture("./images/normal.png", {
            wrapping: Mt
        }).then(n=>{
            n.anisotropy = H.WebGL.renderer.capabilities.getMaxAnisotropy(),
            n.needsUpdate = true,
            this.assets.textures.floorNormal = n
        }
        );
        const t = {
            shutterDiffuse: "shutter-Diffuse",
            shutterGlossiness: "shutter-Glossiness",
            shutterNormal: "shutter-Normal",
            sideCoverDiffuse: "side-cover-Diffuse",
            topCoverDiffuse: "top-cover-Diffuse"
        };
        for (const n in t)
            H.AssetLoader.loadTexture(`./images/${t[n]}.png`, {
                flipY: false
            }).then(i=>{
                this.assets.textures[n] = i
            }
            );
        H.AssetLoader.loadGltf("./models/scene.glb").then(n=>{
            this.assets.models.u = n.scene.getObjectByName("u-neon").geometry,
            this.assets.models.power = n.scene.getObjectByName("power").geometry,
            this.assets.models.cable = n.scene.getObjectByName("cable").geometry,
            this.assets.models.stand = n.scene.getObjectByName("stand").geometry,
            this.assets.models.floor = n.scene.getObjectByName("floor").geometry,
            this.assets.models.walls = n.scene.getObjectByName("walls").geometry,
            this.assets.models.shutter = n.scene.getObjectByName("shutter").geometry,
            this.assets.models.sideCover = n.scene.getObjectByName("side-cover").geometry,
            this.assets.models.topCover = n.scene.getObjectByName("top-cover").geometry
        }
        )
    }
}
class mf {
    constructor() {
        setProperty(this, "start", ()=>{
            this.addEvents()
        }
        );
        setProperty(this, "onRaf", e=>{
            this.clockDelta = this.clock.getDelta(),
            this.globalUniforms.uDelta.value = this.clockDelta > .016 ? .016 : this.clockDelta,
            this.globalUniforms.uTime.value = e,
            this.renderer.info.reset()
        }
        );
        setProperty(this, "onResize", ()=>{
            this.renderer.setSize(H.window.w, H.window.h)
        }
        );
        this.dom = {
            canvas: no("canvas")
        },
        this.setup(),
        E("App:start", this.start)
    }
    setup() {
        this.renderer = new p3({
            alpha: false,
            antialias: true,
            canvas: this.dom.canvas,
            powerPreference: "high-performance",
            stencil: false
        }),
        this.renderer.setPixelRatio(H.window.dpr >= 2 ? 2 : H.window.dpr),
        this.renderer.setSize(H.window.w, H.window.h),
        this.renderer.info.autoReset = false,
        this.clock = new y3,
        this.globalUniforms = {
            uDelta: {
                value: 0
            },
            uTime: {
                value: 0
            }
        },
        af()
    }
    addEvents() {
        E(H0.RESIZE, this.onResize),
        H.RAFCollection.add(this.onRaf, 0)
    }
    generateTexture(e, t={}, n=false) {
        return e instanceof HTMLImageElement && (e = new Te(e)),
        e.minFilter = t.minFilter || (n ? ie : Bn),
        e.magFilter = t.magFilter || ie,
        e.wrapS = e.wrapT = t.wrapping || ne,
        e.flipY = t.flipY !== void 0 ? t.flipY : true,
        e.mapping = t.mapping !== void 0 ? t.mapping : wn,
        this.renderer.initTexture(e),
        e
    }
}
H0.detectTouchDevice();
H0.enableRAF(an);
H0.enableResize();
H0.enablePointerEvents();
H0.enableDrag();
H.PageLoader = new Vh;
H.RAFCollection = new kh;
H.AssetLoader = new zh;
H.WebGL = new mf;
H.MainScene = new pf;
H.Audio = new Ju;
window.store = H;
H.AssetLoader.load().then(()=>{
    E("App:start"),
    H.Audio.play({
        key: "rain"
    }),
    H.urlParams.has("nogui") || V3(()=>import("./gui.js"), []).then(({Gui: l})=>{
        H.Gui = new l
    }
    )
}
);
export {an as a, Hi as c, _f as g, H as s};
