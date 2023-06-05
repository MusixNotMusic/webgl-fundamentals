import {c as Ts, g as ko, s as D, a as Vo} from "./index.js";
function Lo(se, x) {
    return x.forEach(function(_) {
        _ && typeof _ != "string" && !Array.isArray(_) && Object.keys(_).forEach(function(N) {
            if (N !== "default" && !(N in se)) {
                var O = Object.getOwnPropertyDescriptor(_, N);
                Object.defineProperty(se, N, O.get ? O : {
                    enumerable: !0,
                    get: function() {
                        return _[N]
                    }
                })
            }
        })
    }),
    Object.freeze(Object.defineProperty(se, Symbol.toStringTag, {
        value: "Module"
    }))
}
var ps = {
    exports: {}
};
/*! Tweakpane 3.0.5 (c) 2016 cocopon, licensed under the MIT license. */
(function(se, x) {
    (function(_, N) {
        N(x)
    }
    )(Ts, function(_) {
        class N {
            constructor(t) {
                const [e,s] = t.split("-")
                  , l = e.split(".");
                this.major = parseInt(l[0], 10),
                this.minor = parseInt(l[1], 10),
                this.patch = parseInt(l[2], 10),
                this.prerelease = s != null ? s : null
            }
            toString() {
                const t = [this.major, this.minor, this.patch].join(".");
                return this.prerelease !== null ? [t, this.prerelease].join("-") : t
            }
        }
        class O {
            constructor(t) {
                this.controller_ = t
            }
            get disabled() {
                return this.controller_.viewProps.get("disabled")
            }
            set disabled(t) {
                this.controller_.viewProps.set("disabled", t)
            }
            get hidden() {
                return this.controller_.viewProps.get("hidden")
            }
            set hidden(t) {
                this.controller_.viewProps.set("hidden", t)
            }
            dispose() {
                this.controller_.viewProps.set("disposed", !0)
            }
        }
        class _t {
            constructor(t) {
                this.target = t
            }
        }
        class nt extends _t {
            constructor(t, e, s, l) {
                super(t),
                this.value = e,
                this.presetKey = s,
                this.last = l != null ? l : !0
            }
        }
        class $ extends _t {
            constructor(t, e, s) {
                super(t),
                this.value = e,
                this.presetKey = s
            }
        }
        class Ee extends _t {
            constructor(t, e) {
                super(t),
                this.expanded = e
            }
        }
        function jt(n) {
            return n
        }
        function w(n) {
            return n == null
        }
        function Hn(n, t) {
            if (n.length !== t.length)
                return !1;
            for (let e = 0; e < n.length; e++)
                if (n[e] !== t[e])
                    return !1;
            return !0
        }
        const z = {
            alreadydisposed: ()=>"View has been already disposed",
            invalidparams: n=>`Invalid parameters for '${n.name}'`,
            nomatchingcontroller: n=>`No matching controller for '${n.key}'`,
            nomatchingview: n=>`No matching view for '${JSON.stringify(n.params)}'`,
            notbindable: ()=>"Value is not bindable",
            propertynotfound: n=>`Property '${n.name}' not found`,
            shouldneverhappen: ()=>"This error should never happen"
        };
        class E {
            constructor(t) {
                var e;
                this.message = (e = z[t.type](t.context)) !== null && e !== void 0 ? e : "Unexpected error",
                this.name = this.constructor.name,
                this.stack = new Error(this.message).stack,
                this.type = t.type
            }
            static alreadyDisposed() {
                return new E({
                    type: "alreadydisposed"
                })
            }
            static notBindable() {
                return new E({
                    type: "notbindable"
                })
            }
            static propertyNotFound(t) {
                return new E({
                    type: "propertynotfound",
                    context: {
                        name: t
                    }
                })
            }
            static shouldNeverHappen() {
                return new E({
                    type: "shouldneverhappen"
                })
            }
        }
        class re {
            constructor(t, e, s) {
                this.obj_ = t,
                this.key_ = e,
                this.presetKey_ = s != null ? s : e
            }
            static isBindable(t) {
                return !(t === null || typeof t != "object")
            }
            get key() {
                return this.key_
            }
            get presetKey() {
                return this.presetKey_
            }
            read() {
                return this.obj_[this.key_]
            }
            write(t) {
                this.obj_[this.key_] = t
            }
            writeProperty(t, e) {
                const s = this.read();
                if (!re.isBindable(s))
                    throw E.notBindable();
                if (!(t in s))
                    throw E.propertyNotFound(t);
                s[t] = e
            }
        }
        class ft extends O {
            get label() {
                return this.controller_.props.get("label")
            }
            set label(t) {
                this.controller_.props.set("label", t)
            }
            get title() {
                var t;
                return (t = this.controller_.valueController.props.get("title")) !== null && t !== void 0 ? t : ""
            }
            set title(t) {
                this.controller_.valueController.props.set("title", t)
            }
            on(t, e) {
                const s = e.bind(this);
                return this.controller_.valueController.emitter.on(t, ()=>{
                    s(new _t(this))
                }
                ),
                this
            }
        }
        class L {
            constructor() {
                this.observers_ = {}
            }
            on(t, e) {
                let s = this.observers_[t];
                return s || (s = this.observers_[t] = []),
                s.push({
                    handler: e
                }),
                this
            }
            off(t, e) {
                const s = this.observers_[t];
                return s && (this.observers_[t] = s.filter(l=>l.handler !== e)),
                this
            }
            emit(t, e) {
                const s = this.observers_[t];
                !s || s.forEach(l=>{
                    l.handler(e)
                }
                )
            }
        }
        const qn = "tp";
        function C(n) {
            return (e,s)=>[qn, "-", n, "v", e ? `_${e}` : "", s ? `-${s}` : ""].join("")
        }
        function Gn(n, t) {
            return e=>t(n(e))
        }
        function Pe(n) {
            return n.rawValue
        }
        function Lt(n, t) {
            n.emitter.on("change", Gn(Pe, t)),
            t(n.rawValue)
        }
        function W(n, t, e) {
            Lt(n.value(t), e)
        }
        function Yn(n, t, e) {
            e ? n.classList.add(t) : n.classList.remove(t)
        }
        function Mt(n, t) {
            return e=>{
                Yn(n, t, e)
            }
        }
        function it(n, t) {
            Lt(n, e=>{
                t.textContent = e != null ? e : ""
            }
            )
        }
        const B = C("btn");
        class Xn {
            constructor(t, e) {
                this.element = t.createElement("div"),
                this.element.classList.add(B()),
                e.viewProps.bindClassModifiers(this.element);
                const s = t.createElement("button");
                s.classList.add(B("b")),
                e.viewProps.bindDisabled(s),
                this.element.appendChild(s),
                this.buttonElement = s;
                const l = t.createElement("div");
                l.classList.add(B("t")),
                it(e.props.value("title"), l),
                this.buttonElement.appendChild(l)
            }
        }
        class hn {
            constructor(t, e) {
                this.emitter = new L,
                this.onClick_ = this.onClick_.bind(this),
                this.props = e.props,
                this.viewProps = e.viewProps,
                this.view = new Xn(t,{
                    props: this.props,
                    viewProps: this.viewProps
                }),
                this.view.buttonElement.addEventListener("click", this.onClick_)
            }
            onClick_() {
                this.emitter.emit("click", {
                    sender: this
                })
            }
        }
        class Wn {
            constructor(t, e) {
                var s;
                this.constraint_ = e == null ? void 0 : e.constraint,
                this.equals_ = (s = e == null ? void 0 : e.equals) !== null && s !== void 0 ? s : (l,d)=>l === d,
                this.emitter = new L,
                this.rawValue_ = t
            }
            get constraint() {
                return this.constraint_
            }
            get rawValue() {
                return this.rawValue_
            }
            set rawValue(t) {
                this.setRawValue(t, {
                    forceEmit: !1,
                    last: !0
                })
            }
            setRawValue(t, e) {
                const s = e != null ? e : {
                    forceEmit: !1,
                    last: !0
                }
                  , l = this.constraint_ ? this.constraint_.constrain(t) : t;
                !!this.equals_(this.rawValue_, l) && !s.forceEmit || (this.emitter.emit("beforechange", {
                    sender: this
                }),
                this.rawValue_ = l,
                this.emitter.emit("change", {
                    options: s,
                    rawValue: l,
                    sender: this
                }))
            }
        }
        class ot {
            constructor(t) {
                this.emitter = new L,
                this.value_ = t
            }
            get rawValue() {
                return this.value_
            }
            set rawValue(t) {
                this.setRawValue(t, {
                    forceEmit: !1,
                    last: !0
                })
            }
            setRawValue(t, e) {
                const s = e != null ? e : {
                    forceEmit: !1,
                    last: !0
                };
                this.value_ === t && !s.forceEmit || (this.emitter.emit("beforechange", {
                    sender: this
                }),
                this.value_ = t,
                this.emitter.emit("change", {
                    options: s,
                    rawValue: this.value_,
                    sender: this
                }))
            }
        }
        function K(n, t) {
            const e = t == null ? void 0 : t.constraint
              , s = t == null ? void 0 : t.equals;
            return !e && !s ? new ot(n) : new Wn(n,t)
        }
        class f {
            constructor(t) {
                this.emitter = new L,
                this.valMap_ = t;
                for (const e in this.valMap_)
                    this.valMap_[e].emitter.on("change", ()=>{
                        this.emitter.emit("change", {
                            key: e,
                            sender: this
                        })
                    }
                    )
            }
            static createCore(t) {
                return Object.keys(t).reduce((s,l)=>Object.assign(s, {
                    [l]: K(t[l])
                }), {})
            }
            static fromObject(t) {
                const e = this.createCore(t);
                return new f(e)
            }
            get(t) {
                return this.valMap_[t].rawValue
            }
            set(t, e) {
                this.valMap_[t].rawValue = e
            }
            value(t) {
                return this.valMap_[t]
            }
        }
        function St(n, t) {
            const s = Object.keys(t).reduce((l,d)=>{
                if (l === void 0)
                    return;
                const h = t[d]
                  , v = h(n[d]);
                return v.succeeded ? Object.assign(Object.assign({}, l), {
                    [d]: v.value
                }) : void 0
            }
            , {});
            return s
        }
        function Jn(n, t) {
            return n.reduce((e,s)=>{
                if (e === void 0)
                    return;
                const l = t(s);
                if (!(!l.succeeded || l.value === void 0))
                    return [...e, l.value]
            }
            , [])
        }
        function Qn(n) {
            return n === null ? !1 : typeof n == "object"
        }
        function st(n) {
            return t=>e=>{
                if (!t && e === void 0)
                    return {
                        succeeded: !1,
                        value: void 0
                    };
                if (t && e === void 0)
                    return {
                        succeeded: !0,
                        value: void 0
                    };
                const s = n(e);
                return s !== void 0 ? {
                    succeeded: !0,
                    value: s
                } : {
                    succeeded: !1,
                    value: void 0
                }
            }
        }
        function ke(n) {
            return {
                custom: t=>st(t)(n),
                boolean: st(t=>typeof t == "boolean" ? t : void 0)(n),
                number: st(t=>typeof t == "number" ? t : void 0)(n),
                string: st(t=>typeof t == "string" ? t : void 0)(n),
                function: st(t=>typeof t == "function" ? t : void 0)(n),
                constant: t=>st(e=>e === t ? t : void 0)(n),
                raw: st(t=>t)(n),
                object: t=>st(e=>{
                    if (!!Qn(e))
                        return St(e, t)
                }
                )(n),
                array: t=>st(e=>{
                    if (!!Array.isArray(e))
                        return Jn(e, t)
                }
                )(n)
            }
        }
        const M = {
            optional: ke(!0),
            required: ke(!1)
        };
        function k(n, t) {
            const e = M.required.object(t)(n);
            return e.succeeded ? e.value : void 0
        }
        function oe(n) {
            return n && n.parentElement && n.parentElement.removeChild(n),
            null
        }
        function Zn() {
            return ["veryfirst", "first", "last", "verylast"]
        }
        const Ve = C("")
          , cn = {
            veryfirst: "vfst",
            first: "fst",
            last: "lst",
            verylast: "vlst"
        };
        class Ut {
            constructor(t) {
                this.parent_ = null,
                this.blade = t.blade,
                this.view = t.view,
                this.viewProps = t.viewProps;
                const e = this.view.element;
                this.blade.value("positions").emitter.on("change", ()=>{
                    Zn().forEach(s=>{
                        e.classList.remove(Ve(void 0, cn[s]))
                    }
                    ),
                    this.blade.get("positions").forEach(s=>{
                        e.classList.add(Ve(void 0, cn[s]))
                    }
                    )
                }
                ),
                this.viewProps.handleDispose(()=>{
                    oe(e)
                }
                )
            }
            get parent() {
                return this.parent_
            }
        }
        const F = "http://www.w3.org/2000/svg";
        function ae(n) {
            n.offsetHeight
        }
        function vn(n, t) {
            const e = n.style.transition;
            n.style.transition = "none",
            t(),
            n.style.transition = e
        }
        function At(n) {
            return n.ontouchstart !== void 0
        }
        function mn() {
            return new Function("return this")()
        }
        function Le() {
            return mn().document
        }
        function ti() {
            return "document"in mn()
        }
        function ei(n) {
            return ti() ? n.getContext("2d") : null
        }
        const bn = {
            check: '<path d="M2 8l4 4l8 -8"/>',
            dropdown: '<path d="M5 7h6l-3 3 z"/>',
            p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
        };
        function le(n, t) {
            const e = n.createElementNS(F, "svg");
            return e.innerHTML = bn[t],
            e
        }
        function Me(n, t, e) {
            n.insertBefore(t, n.children[e])
        }
        function $t(n) {
            n.parentElement && n.parentElement.removeChild(n)
        }
        function _n(n) {
            for (; n.children.length > 0; )
                n.removeChild(n.children[0])
        }
        function fn(n) {
            for (; n.childNodes.length > 0; )
                n.removeChild(n.childNodes[0])
        }
        function gt(n) {
            return n.relatedTarget ? n.relatedTarget : "explicitOriginalTarget"in n ? n.explicitOriginalTarget : null
        }
        const Ft = C("lbl");
        function ni(n, t) {
            const e = n.createDocumentFragment();
            return t.split(`
`).map(l=>n.createTextNode(l)).forEach((l,d)=>{
                d > 0 && e.appendChild(n.createElement("br")),
                e.appendChild(l)
            }
            ),
            e
        }
        class Se {
            constructor(t, e) {
                this.element = t.createElement("div"),
                this.element.classList.add(Ft()),
                e.viewProps.bindClassModifiers(this.element);
                const s = t.createElement("div");
                s.classList.add(Ft("l")),
                W(e.props, "label", d=>{
                    w(d) ? this.element.classList.add(Ft(void 0, "nol")) : (this.element.classList.remove(Ft(void 0, "nol")),
                    fn(s),
                    s.appendChild(ni(t, d)))
                }
                ),
                this.element.appendChild(s),
                this.labelElement = s;
                const l = t.createElement("div");
                l.classList.add(Ft("v")),
                this.element.appendChild(l),
                this.valueElement = l
            }
        }
        class wt extends Ut {
            constructor(t, e) {
                const s = e.valueController.viewProps;
                super(Object.assign(Object.assign({}, e), {
                    view: new Se(t,{
                        props: e.props,
                        viewProps: s
                    }),
                    viewProps: s
                })),
                this.props = e.props,
                this.valueController = e.valueController,
                this.view.valueElement.appendChild(this.valueController.view.element)
            }
        }
        const pe = {
            id: "button",
            type: "blade",
            accept(n) {
                const t = M
                  , e = k(n, {
                    title: t.required.string,
                    view: t.required.constant("button"),
                    label: t.optional.string
                });
                return e ? {
                    params: e
                } : null
            },
            controller(n) {
                return new wt(n.document,{
                    blade: n.blade,
                    props: f.fromObject({
                        label: n.params.label
                    }),
                    valueController: new hn(n.document,{
                        props: f.fromObject({
                            title: n.params.title
                        }),
                        viewProps: n.viewProps
                    })
                })
            },
            api(n) {
                return !(n.controller instanceof wt) || !(n.controller.valueController instanceof hn) ? null : new ft(n.controller)
            }
        };
        class at extends Ut {
            constructor(t) {
                super(t),
                this.value = t.value
            }
        }
        function Tt() {
            return new f({
                positions: K([], {
                    equals: Hn
                })
            })
        }
        class Ht extends f {
            constructor(t) {
                super(t)
            }
            static create(t) {
                const e = {
                    completed: !0,
                    expanded: t,
                    expandedHeight: null,
                    shouldFixHeight: !1,
                    temporaryExpanded: null
                }
                  , s = f.createCore(e);
                return new Ht(s)
            }
            get styleExpanded() {
                var t;
                return (t = this.get("temporaryExpanded")) !== null && t !== void 0 ? t : this.get("expanded")
            }
            get styleHeight() {
                if (!this.styleExpanded)
                    return "0";
                const t = this.get("expandedHeight");
                return this.get("shouldFixHeight") && !w(t) ? `${t}px` : "auto"
            }
            bindExpandedClass(t, e) {
                W(this, "expanded", ()=>{
                    this.styleExpanded ? t.classList.add(e) : t.classList.remove(e)
                }
                )
            }
        }
        function ii(n, t) {
            let e = 0;
            return vn(t, ()=>{
                n.set("expandedHeight", null),
                n.set("temporaryExpanded", !0),
                ae(t),
                e = t.clientHeight,
                n.set("temporaryExpanded", null),
                ae(t)
            }
            ),
            e
        }
        function Ae(n, t) {
            t.style.height = n.styleHeight
        }
        function Te(n, t) {
            n.value("expanded").emitter.on("beforechange", ()=>{
                n.set("completed", !1),
                w(n.get("expandedHeight")) && n.set("expandedHeight", ii(n, t)),
                n.set("shouldFixHeight", !0),
                ae(t)
            }
            ),
            n.emitter.on("change", ()=>{
                Ae(n, t)
            }
            ),
            Ae(n, t),
            t.addEventListener("transitionend", e=>{
                e.propertyName === "height" && (n.set("shouldFixHeight", !1),
                n.set("expandedHeight", null),
                n.set("completed", !0))
            }
            )
        }
        class De extends O {
            constructor(t, e) {
                super(t),
                this.rackApi_ = e
            }
        }
        function si(n, t) {
            return n.addBlade(Object.assign(Object.assign({}, t), {
                view: "button"
            }))
        }
        function ri(n, t) {
            return n.addBlade(Object.assign(Object.assign({}, t), {
                view: "folder"
            }))
        }
        function oi(n, t) {
            const e = t || {};
            return n.addBlade(Object.assign(Object.assign({}, e), {
                view: "separator"
            }))
        }
        function ai(n, t) {
            return n.addBlade(Object.assign(Object.assign({}, t), {
                view: "tab"
            }))
        }
        class Ne {
            constructor(t) {
                this.emitter = new L,
                this.items_ = [],
                this.cache_ = new Set,
                this.onSubListAdd_ = this.onSubListAdd_.bind(this),
                this.onSubListRemove_ = this.onSubListRemove_.bind(this),
                this.extract_ = t
            }
            get items() {
                return this.items_
            }
            allItems() {
                return Array.from(this.cache_)
            }
            find(t) {
                for (const e of this.allItems())
                    if (t(e))
                        return e;
                return null
            }
            includes(t) {
                return this.cache_.has(t)
            }
            add(t, e) {
                if (this.includes(t))
                    throw E.shouldNeverHappen();
                const s = e !== void 0 ? e : this.items_.length;
                this.items_.splice(s, 0, t),
                this.cache_.add(t);
                const l = this.extract_(t);
                l && (l.emitter.on("add", this.onSubListAdd_),
                l.emitter.on("remove", this.onSubListRemove_),
                l.allItems().forEach(d=>{
                    this.cache_.add(d)
                }
                )),
                this.emitter.emit("add", {
                    index: s,
                    item: t,
                    root: this,
                    target: this
                })
            }
            remove(t) {
                const e = this.items_.indexOf(t);
                if (e < 0)
                    return;
                this.items_.splice(e, 1),
                this.cache_.delete(t);
                const s = this.extract_(t);
                s && (s.emitter.off("add", this.onSubListAdd_),
                s.emitter.off("remove", this.onSubListRemove_)),
                this.emitter.emit("remove", {
                    index: e,
                    item: t,
                    root: this,
                    target: this
                })
            }
            onSubListAdd_(t) {
                this.cache_.add(t.item),
                this.emitter.emit("add", {
                    index: t.index,
                    item: t.item,
                    root: this,
                    target: t.target
                })
            }
            onSubListRemove_(t) {
                this.cache_.delete(t.item),
                this.emitter.emit("remove", {
                    index: t.index,
                    item: t.item,
                    root: this,
                    target: t.target
                })
            }
        }
        class qt extends O {
            constructor(t) {
                super(t),
                this.onBindingChange_ = this.onBindingChange_.bind(this),
                this.emitter_ = new L,
                this.controller_.binding.emitter.on("change", this.onBindingChange_)
            }
            get label() {
                return this.controller_.props.get("label")
            }
            set label(t) {
                this.controller_.props.set("label", t)
            }
            on(t, e) {
                const s = e.bind(this);
                return this.emitter_.on(t, l=>{
                    s(l.event)
                }
                ),
                this
            }
            refresh() {
                this.controller_.binding.read()
            }
            onBindingChange_(t) {
                const e = t.sender.target.read();
                this.emitter_.emit("change", {
                    event: new nt(this,e,this.controller_.binding.target.presetKey,t.options.last)
                })
            }
        }
        class H extends wt {
            constructor(t, e) {
                super(t, e),
                this.binding = e.binding
            }
        }
        class ze extends O {
            constructor(t) {
                super(t),
                this.onBindingUpdate_ = this.onBindingUpdate_.bind(this),
                this.emitter_ = new L,
                this.controller_.binding.emitter.on("update", this.onBindingUpdate_)
            }
            get label() {
                return this.controller_.props.get("label")
            }
            set label(t) {
                this.controller_.props.set("label", t)
            }
            on(t, e) {
                const s = e.bind(this);
                return this.emitter_.on(t, l=>{
                    s(l.event)
                }
                ),
                this
            }
            refresh() {
                this.controller_.binding.read()
            }
            onBindingUpdate_(t) {
                const e = t.sender.target.read();
                this.emitter_.emit("update", {
                    event: new $(this,e,this.controller_.binding.target.presetKey)
                })
            }
        }
        class J extends wt {
            constructor(t, e) {
                super(t, e),
                this.binding = e.binding,
                this.viewProps.bindDisabled(this.binding.ticker),
                this.viewProps.handleDispose(()=>{
                    this.binding.dispose()
                }
                )
            }
        }
        function li(n) {
            return n instanceof de ? n.apiSet_ : n instanceof De ? n.rackApi_.apiSet_ : null
        }
        function xt(n, t) {
            const e = n.find(s=>s.controller_ === t);
            if (!e)
                throw E.shouldNeverHappen();
            return e
        }
        function Re(n, t, e) {
            if (!re.isBindable(n))
                throw E.notBindable();
            return new re(n,t,e)
        }
        class de extends O {
            constructor(t, e) {
                super(t),
                this.onRackAdd_ = this.onRackAdd_.bind(this),
                this.onRackRemove_ = this.onRackRemove_.bind(this),
                this.onRackInputChange_ = this.onRackInputChange_.bind(this),
                this.onRackMonitorUpdate_ = this.onRackMonitorUpdate_.bind(this),
                this.emitter_ = new L,
                this.apiSet_ = new Ne(li),
                this.pool_ = e;
                const s = this.controller_.rack;
                s.emitter.on("add", this.onRackAdd_),
                s.emitter.on("remove", this.onRackRemove_),
                s.emitter.on("inputchange", this.onRackInputChange_),
                s.emitter.on("monitorupdate", this.onRackMonitorUpdate_),
                s.children.forEach(l=>{
                    this.setUpApi_(l)
                }
                )
            }
            get children() {
                return this.controller_.rack.children.map(t=>xt(this.apiSet_, t))
            }
            addInput(t, e, s) {
                const l = s || {}
                  , d = this.controller_.view.element.ownerDocument
                  , h = this.pool_.createInput(d, Re(t, e, l.presetKey), l)
                  , v = new qt(h);
                return this.add(v, l.index)
            }
            addMonitor(t, e, s) {
                const l = s || {}
                  , d = this.controller_.view.element.ownerDocument
                  , h = this.pool_.createMonitor(d, Re(t, e), l)
                  , v = new ze(h);
                return this.add(v, l.index)
            }
            addFolder(t) {
                return ri(this, t)
            }
            addButton(t) {
                return si(this, t)
            }
            addSeparator(t) {
                return oi(this, t)
            }
            addTab(t) {
                return ai(this, t)
            }
            add(t, e) {
                this.controller_.rack.add(t.controller_, e);
                const s = this.apiSet_.find(l=>l.controller_ === t.controller_);
                return s && this.apiSet_.remove(s),
                this.apiSet_.add(t),
                t
            }
            remove(t) {
                this.controller_.rack.remove(t.controller_)
            }
            addBlade(t) {
                const e = this.controller_.view.element.ownerDocument
                  , s = this.pool_.createBlade(e, t)
                  , l = this.pool_.createBladeApi(s);
                return this.add(l, t.index)
            }
            on(t, e) {
                const s = e.bind(this);
                return this.emitter_.on(t, l=>{
                    s(l.event)
                }
                ),
                this
            }
            setUpApi_(t) {
                this.apiSet_.find(s=>s.controller_ === t) || this.apiSet_.add(this.pool_.createBladeApi(t))
            }
            onRackAdd_(t) {
                this.setUpApi_(t.bladeController)
            }
            onRackRemove_(t) {
                if (t.isRoot) {
                    const e = xt(this.apiSet_, t.bladeController);
                    this.apiSet_.remove(e)
                }
            }
            onRackInputChange_(t) {
                const e = t.bladeController;
                if (e instanceof H) {
                    const s = xt(this.apiSet_, e)
                      , l = e.binding;
                    this.emitter_.emit("change", {
                        event: new nt(s,l.target.read(),l.target.presetKey,t.options.last)
                    })
                } else if (e instanceof at) {
                    const s = xt(this.apiSet_, e);
                    this.emitter_.emit("change", {
                        event: new nt(s,e.value.rawValue,void 0,t.options.last)
                    })
                }
            }
            onRackMonitorUpdate_(t) {
                if (!(t.bladeController instanceof J))
                    throw E.shouldNeverHappen();
                const e = xt(this.apiSet_, t.bladeController)
                  , s = t.bladeController.binding;
                this.emitter_.emit("update", {
                    event: new $(e,s.target.read(),s.target.presetKey)
                })
            }
        }
        class Be extends De {
            constructor(t, e) {
                super(t, new de(t.rackController,e)),
                this.emitter_ = new L,
                this.controller_.foldable.value("expanded").emitter.on("change", s=>{
                    this.emitter_.emit("fold", {
                        event: new Ee(this,s.sender.rawValue)
                    })
                }
                ),
                this.rackApi_.on("change", s=>{
                    this.emitter_.emit("change", {
                        event: s
                    })
                }
                ),
                this.rackApi_.on("update", s=>{
                    this.emitter_.emit("update", {
                        event: s
                    })
                }
                )
            }
            get expanded() {
                return this.controller_.foldable.get("expanded")
            }
            set expanded(t) {
                this.controller_.foldable.set("expanded", t)
            }
            get title() {
                return this.controller_.props.get("title")
            }
            set title(t) {
                this.controller_.props.set("title", t)
            }
            get children() {
                return this.rackApi_.children
            }
            addInput(t, e, s) {
                return this.rackApi_.addInput(t, e, s)
            }
            addMonitor(t, e, s) {
                return this.rackApi_.addMonitor(t, e, s)
            }
            addFolder(t) {
                return this.rackApi_.addFolder(t)
            }
            addButton(t) {
                return this.rackApi_.addButton(t)
            }
            addSeparator(t) {
                return this.rackApi_.addSeparator(t)
            }
            addTab(t) {
                return this.rackApi_.addTab(t)
            }
            add(t, e) {
                return this.rackApi_.add(t, e)
            }
            remove(t) {
                this.rackApi_.remove(t)
            }
            addBlade(t) {
                return this.rackApi_.addBlade(t)
            }
            on(t, e) {
                const s = e.bind(this);
                return this.emitter_.on(t, l=>{
                    s(l.event)
                }
                ),
                this
            }
        }
        class Oe extends Ut {
            constructor(t) {
                super({
                    blade: t.blade,
                    view: t.view,
                    viewProps: t.rackController.viewProps
                }),
                this.rackController = t.rackController
            }
        }
        class pi {
            constructor(t, e) {
                const s = C(e.viewName);
                this.element = t.createElement("div"),
                this.element.classList.add(s()),
                e.viewProps.bindClassModifiers(this.element)
            }
        }
        function di(n, t) {
            for (let e = 0; e < n.length; e++) {
                const s = n[e];
                if (s instanceof H && s.binding === t)
                    return s
            }
            return null
        }
        function ui(n, t) {
            for (let e = 0; e < n.length; e++) {
                const s = n[e];
                if (s instanceof J && s.binding === t)
                    return s
            }
            return null
        }
        function hi(n, t) {
            for (let e = 0; e < n.length; e++) {
                const s = n[e];
                if (s instanceof at && s.value === t)
                    return s
            }
            return null
        }
        function Ie(n) {
            return n instanceof Gt ? n.rack : n instanceof Oe ? n.rackController.rack : null
        }
        function ci(n) {
            const t = Ie(n);
            return t ? t.bcSet_ : null
        }
        class vi {
            constructor(t) {
                var e;
                this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this),
                this.onSetAdd_ = this.onSetAdd_.bind(this),
                this.onSetRemove_ = this.onSetRemove_.bind(this),
                this.onChildDispose_ = this.onChildDispose_.bind(this),
                this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this),
                this.onChildInputChange_ = this.onChildInputChange_.bind(this),
                this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this),
                this.onChildValueChange_ = this.onChildValueChange_.bind(this),
                this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this),
                this.onDescendantLayout_ = this.onDescendantLayout_.bind(this),
                this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this),
                this.onDescendantMonitorUpdate_ = this.onDescendantMonitorUpdate_.bind(this),
                this.emitter = new L,
                this.blade_ = t != null ? t : null,
                (e = this.blade_) === null || e === void 0 || e.value("positions").emitter.on("change", this.onBladePositionsChange_),
                this.bcSet_ = new Ne(ci),
                this.bcSet_.emitter.on("add", this.onSetAdd_),
                this.bcSet_.emitter.on("remove", this.onSetRemove_)
            }
            get children() {
                return this.bcSet_.items
            }
            add(t, e) {
                t.parent && t.parent.remove(t),
                t.parent_ = this,
                this.bcSet_.add(t, e)
            }
            remove(t) {
                t.parent_ = null,
                this.bcSet_.remove(t)
            }
            find(t) {
                return this.bcSet_.allItems().filter(e=>e instanceof t)
            }
            onSetAdd_(t) {
                this.updatePositions_();
                const e = t.target === t.root;
                if (this.emitter.emit("add", {
                    bladeController: t.item,
                    index: t.index,
                    isRoot: e,
                    sender: this
                }),
                !e)
                    return;
                const s = t.item;
                if (s.viewProps.emitter.on("change", this.onChildViewPropsChange_),
                s.blade.value("positions").emitter.on("change", this.onChildPositionsChange_),
                s.viewProps.handleDispose(this.onChildDispose_),
                s instanceof H)
                    s.binding.emitter.on("change", this.onChildInputChange_);
                else if (s instanceof J)
                    s.binding.emitter.on("update", this.onChildMonitorUpdate_);
                else if (s instanceof at)
                    s.value.emitter.on("change", this.onChildValueChange_);
                else {
                    const l = Ie(s);
                    if (l) {
                        const d = l.emitter;
                        d.on("layout", this.onDescendantLayout_),
                        d.on("inputchange", this.onDescendantInputChange_),
                        d.on("monitorupdate", this.onDescendantMonitorUpdate_)
                    }
                }
            }
            onSetRemove_(t) {
                this.updatePositions_();
                const e = t.target === t.root;
                if (this.emitter.emit("remove", {
                    bladeController: t.item,
                    isRoot: e,
                    sender: this
                }),
                !e)
                    return;
                const s = t.item;
                if (s instanceof H)
                    s.binding.emitter.off("change", this.onChildInputChange_);
                else if (s instanceof J)
                    s.binding.emitter.off("update", this.onChildMonitorUpdate_);
                else if (s instanceof at)
                    s.value.emitter.off("change", this.onChildValueChange_);
                else {
                    const l = Ie(s);
                    if (l) {
                        const d = l.emitter;
                        d.off("layout", this.onDescendantLayout_),
                        d.off("inputchange", this.onDescendantInputChange_),
                        d.off("monitorupdate", this.onDescendantMonitorUpdate_)
                    }
                }
            }
            updatePositions_() {
                const t = this.bcSet_.items.filter(l=>!l.viewProps.get("hidden"))
                  , e = t[0]
                  , s = t[t.length - 1];
                this.bcSet_.items.forEach(l=>{
                    const d = [];
                    l === e && (d.push("first"),
                    (!this.blade_ || this.blade_.get("positions").includes("veryfirst")) && d.push("veryfirst")),
                    l === s && (d.push("last"),
                    (!this.blade_ || this.blade_.get("positions").includes("verylast")) && d.push("verylast")),
                    l.blade.set("positions", d)
                }
                )
            }
            onChildPositionsChange_() {
                this.updatePositions_(),
                this.emitter.emit("layout", {
                    sender: this
                })
            }
            onChildViewPropsChange_(t) {
                this.updatePositions_(),
                this.emitter.emit("layout", {
                    sender: this
                })
            }
            onChildDispose_() {
                this.bcSet_.items.filter(e=>e.viewProps.get("disposed")).forEach(e=>{
                    this.bcSet_.remove(e)
                }
                )
            }
            onChildInputChange_(t) {
                const e = di(this.find(H), t.sender);
                if (!e)
                    throw E.shouldNeverHappen();
                this.emitter.emit("inputchange", {
                    bladeController: e,
                    options: t.options,
                    sender: this
                })
            }
            onChildMonitorUpdate_(t) {
                const e = ui(this.find(J), t.sender);
                if (!e)
                    throw E.shouldNeverHappen();
                this.emitter.emit("monitorupdate", {
                    bladeController: e,
                    sender: this
                })
            }
            onChildValueChange_(t) {
                const e = hi(this.find(at), t.sender);
                if (!e)
                    throw E.shouldNeverHappen();
                this.emitter.emit("inputchange", {
                    bladeController: e,
                    options: t.options,
                    sender: this
                })
            }
            onDescendantLayout_(t) {
                this.updatePositions_(),
                this.emitter.emit("layout", {
                    sender: this
                })
            }
            onDescendantInputChange_(t) {
                this.emitter.emit("inputchange", {
                    bladeController: t.bladeController,
                    options: t.options,
                    sender: this
                })
            }
            onDescendantMonitorUpdate_(t) {
                this.emitter.emit("monitorupdate", {
                    bladeController: t.bladeController,
                    sender: this
                })
            }
            onBladePositionsChange_() {
                this.updatePositions_()
            }
        }
        class Gt extends Ut {
            constructor(t, e) {
                super(Object.assign(Object.assign({}, e), {
                    view: new pi(t,{
                        viewName: "brk",
                        viewProps: e.viewProps
                    })
                })),
                this.onRackAdd_ = this.onRackAdd_.bind(this),
                this.onRackRemove_ = this.onRackRemove_.bind(this);
                const s = new vi(e.root ? void 0 : e.blade);
                s.emitter.on("add", this.onRackAdd_),
                s.emitter.on("remove", this.onRackRemove_),
                this.rack = s,
                this.viewProps.handleDispose(()=>{
                    for (let l = this.rack.children.length - 1; l >= 0; l--)
                        this.rack.children[l].viewProps.set("disposed", !0)
                }
                )
            }
            onRackAdd_(t) {
                !t.isRoot || Me(this.view.element, t.bladeController.view.element, t.index)
            }
            onRackRemove_(t) {
                !t.isRoot || $t(t.bladeController.view.element)
            }
        }
        const gn = C("cnt");
        class mi {
            constructor(t, e) {
                this.className_ = C(e.viewName || "fld"),
                this.element = t.createElement("div"),
                this.element.classList.add(this.className_(), gn()),
                e.viewProps.bindClassModifiers(this.element),
                this.foldable_ = e.foldable,
                this.foldable_.bindExpandedClass(this.element, this.className_(void 0, "expanded")),
                W(this.foldable_, "completed", Mt(this.element, this.className_(void 0, "cpl")));
                const s = t.createElement("button");
                s.classList.add(this.className_("b")),
                W(e.props, "title", v=>{
                    w(v) ? this.element.classList.add(this.className_(void 0, "not")) : this.element.classList.remove(this.className_(void 0, "not"))
                }
                ),
                e.viewProps.bindDisabled(s),
                this.element.appendChild(s),
                this.buttonElement = s;
                const l = t.createElement("div");
                l.classList.add(this.className_("t")),
                it(e.props.value("title"), l),
                this.buttonElement.appendChild(l),
                this.titleElement = l;
                const d = t.createElement("div");
                d.classList.add(this.className_("m")),
                this.buttonElement.appendChild(d);
                const h = e.containerElement;
                h.classList.add(this.className_("c")),
                this.element.appendChild(h),
                this.containerElement = h
            }
        }
        class Ke extends Oe {
            constructor(t, e) {
                var s;
                const l = Ht.create((s = e.expanded) !== null && s !== void 0 ? s : !0)
                  , d = new Gt(t,{
                    blade: e.blade,
                    root: e.root,
                    viewProps: e.viewProps
                });
                super(Object.assign(Object.assign({}, e), {
                    rackController: d,
                    view: new mi(t,{
                        containerElement: d.view.element,
                        foldable: l,
                        props: e.props,
                        viewName: e.root ? "rot" : void 0,
                        viewProps: e.viewProps
                    })
                })),
                this.onTitleClick_ = this.onTitleClick_.bind(this),
                this.props = e.props,
                this.foldable = l,
                Te(this.foldable, this.view.containerElement),
                this.view.buttonElement.addEventListener("click", this.onTitleClick_)
            }
            get document() {
                return this.view.element.ownerDocument
            }
            onTitleClick_() {
                this.foldable.set("expanded", !this.foldable.get("expanded"))
            }
        }
        const bi = {
            id: "folder",
            type: "blade",
            accept(n) {
                const t = M
                  , e = k(n, {
                    title: t.required.string,
                    view: t.required.constant("folder"),
                    expanded: t.optional.boolean
                });
                return e ? {
                    params: e
                } : null
            },
            controller(n) {
                return new Ke(n.document,{
                    blade: n.blade,
                    expanded: n.params.expanded,
                    props: f.fromObject({
                        title: n.params.title
                    }),
                    viewProps: n.viewProps
                })
            },
            api(n) {
                return n.controller instanceof Ke ? new Be(n.controller,n.pool) : null
            }
        };
        class Ct extends at {
            constructor(t, e) {
                const s = e.valueController.viewProps;
                super(Object.assign(Object.assign({}, e), {
                    value: e.valueController.value,
                    view: new Se(t,{
                        props: e.props,
                        viewProps: s
                    }),
                    viewProps: s
                })),
                this.props = e.props,
                this.valueController = e.valueController,
                this.view.valueElement.appendChild(this.valueController.view.element)
            }
        }
        class wn extends O {
        }
        const xn = C("spr");
        class _i {
            constructor(t, e) {
                this.element = t.createElement("div"),
                this.element.classList.add(xn()),
                e.viewProps.bindClassModifiers(this.element);
                const s = t.createElement("hr");
                s.classList.add(xn("r")),
                this.element.appendChild(s)
            }
        }
        class je extends Ut {
            constructor(t, e) {
                super(Object.assign(Object.assign({}, e), {
                    view: new _i(t,{
                        viewProps: e.viewProps
                    })
                }))
            }
        }
        const fi = {
            id: "separator",
            type: "blade",
            accept(n) {
                const e = k(n, {
                    view: M.required.constant("separator")
                });
                return e ? {
                    params: e
                } : null
            },
            controller(n) {
                return new je(n.document,{
                    blade: n.blade,
                    viewProps: n.viewProps
                })
            },
            api(n) {
                return n.controller instanceof je ? new wn(n.controller) : null
            }
        }
          , ue = C("");
        function Cn(n, t) {
            return Mt(n, ue(void 0, t))
        }
        class et extends f {
            constructor(t) {
                super(t)
            }
            static create(t) {
                var e, s;
                const l = t != null ? t : {}
                  , d = {
                    disabled: (e = l.disabled) !== null && e !== void 0 ? e : !1,
                    disposed: !1,
                    hidden: (s = l.hidden) !== null && s !== void 0 ? s : !1
                }
                  , h = f.createCore(d);
                return new et(h)
            }
            bindClassModifiers(t) {
                W(this, "disabled", Cn(t, "disabled")),
                W(this, "hidden", Cn(t, "hidden"))
            }
            bindDisabled(t) {
                W(this, "disabled", e=>{
                    t.disabled = e
                }
                )
            }
            bindTabIndex(t) {
                W(this, "disabled", e=>{
                    t.tabIndex = e ? -1 : 0
                }
                )
            }
            handleDispose(t) {
                this.value("disposed").emitter.on("change", e=>{
                    e && t()
                }
                )
            }
        }
        const Dt = C("tbi");
        class gi {
            constructor(t, e) {
                this.element = t.createElement("div"),
                this.element.classList.add(Dt()),
                e.viewProps.bindClassModifiers(this.element),
                W(e.props, "selected", d=>{
                    d ? this.element.classList.add(Dt(void 0, "sel")) : this.element.classList.remove(Dt(void 0, "sel"))
                }
                );
                const s = t.createElement("button");
                s.classList.add(Dt("b")),
                e.viewProps.bindDisabled(s),
                this.element.appendChild(s),
                this.buttonElement = s;
                const l = t.createElement("div");
                l.classList.add(Dt("t")),
                it(e.props.value("title"), l),
                this.buttonElement.appendChild(l),
                this.titleElement = l
            }
        }
        class wi {
            constructor(t, e) {
                this.emitter = new L,
                this.onClick_ = this.onClick_.bind(this),
                this.props = e.props,
                this.viewProps = e.viewProps,
                this.view = new gi(t,{
                    props: e.props,
                    viewProps: e.viewProps
                }),
                this.view.buttonElement.addEventListener("click", this.onClick_)
            }
            onClick_() {
                this.emitter.emit("click", {
                    sender: this
                })
            }
        }
        class yn {
            constructor(t, e) {
                this.onItemClick_ = this.onItemClick_.bind(this),
                this.ic_ = new wi(t,{
                    props: e.itemProps,
                    viewProps: et.create()
                }),
                this.ic_.emitter.on("click", this.onItemClick_),
                this.cc_ = new Gt(t,{
                    blade: Tt(),
                    viewProps: et.create()
                }),
                this.props = e.props,
                W(this.props, "selected", s=>{
                    this.itemController.props.set("selected", s),
                    this.contentController.viewProps.set("hidden", !s)
                }
                )
            }
            get itemController() {
                return this.ic_
            }
            get contentController() {
                return this.cc_
            }
            onItemClick_() {
                this.props.set("selected", !0)
            }
        }
        class Ue {
            constructor(t, e) {
                this.controller_ = t,
                this.rackApi_ = e
            }
            get title() {
                var t;
                return (t = this.controller_.itemController.props.get("title")) !== null && t !== void 0 ? t : ""
            }
            set title(t) {
                this.controller_.itemController.props.set("title", t)
            }
            get selected() {
                return this.controller_.props.get("selected")
            }
            set selected(t) {
                this.controller_.props.set("selected", t)
            }
            get children() {
                return this.rackApi_.children
            }
            addButton(t) {
                return this.rackApi_.addButton(t)
            }
            addFolder(t) {
                return this.rackApi_.addFolder(t)
            }
            addSeparator(t) {
                return this.rackApi_.addSeparator(t)
            }
            addTab(t) {
                return this.rackApi_.addTab(t)
            }
            add(t, e) {
                this.rackApi_.add(t, e)
            }
            remove(t) {
                this.rackApi_.remove(t)
            }
            addInput(t, e, s) {
                return this.rackApi_.addInput(t, e, s)
            }
            addMonitor(t, e, s) {
                return this.rackApi_.addMonitor(t, e, s)
            }
            addBlade(t) {
                return this.rackApi_.addBlade(t)
            }
        }
        class yt extends De {
            constructor(t, e) {
                super(t, new de(t.rackController,e)),
                this.onPageAdd_ = this.onPageAdd_.bind(this),
                this.onPageRemove_ = this.onPageRemove_.bind(this),
                this.emitter_ = new L,
                this.pageApiMap_ = new Map,
                this.rackApi_.on("change", s=>{
                    this.emitter_.emit("change", {
                        event: s
                    })
                }
                ),
                this.rackApi_.on("update", s=>{
                    this.emitter_.emit("update", {
                        event: s
                    })
                }
                ),
                this.controller_.pageSet.emitter.on("add", this.onPageAdd_),
                this.controller_.pageSet.emitter.on("remove", this.onPageRemove_),
                this.controller_.pageSet.items.forEach(s=>{
                    this.setUpPageApi_(s)
                }
                )
            }
            get pages() {
                return this.controller_.pageSet.items.map(t=>{
                    const e = this.pageApiMap_.get(t);
                    if (!e)
                        throw E.shouldNeverHappen();
                    return e
                }
                )
            }
            addPage(t) {
                const e = this.controller_.view.element.ownerDocument
                  , s = new yn(e,{
                    itemProps: f.fromObject({
                        selected: !1,
                        title: t.title
                    }),
                    props: f.fromObject({
                        selected: !1
                    })
                });
                this.controller_.add(s, t.index);
                const l = this.pageApiMap_.get(s);
                if (!l)
                    throw E.shouldNeverHappen();
                return l
            }
            removePage(t) {
                this.controller_.remove(t)
            }
            on(t, e) {
                const s = e.bind(this);
                return this.emitter_.on(t, l=>{
                    s(l.event)
                }
                ),
                this
            }
            setUpPageApi_(t) {
                const e = this.rackApi_.apiSet_.find(l=>l.controller_ === t.contentController);
                if (!e)
                    throw E.shouldNeverHappen();
                const s = new Ue(t,e);
                this.pageApiMap_.set(t, s)
            }
            onPageAdd_(t) {
                this.setUpPageApi_(t.item)
            }
            onPageRemove_(t) {
                if (!this.pageApiMap_.get(t.item))
                    throw E.shouldNeverHappen();
                this.pageApiMap_.delete(t.item)
            }
        }
        const Et = C("tab");
        class En {
            constructor(t, e) {
                this.element = t.createElement("div"),
                this.element.classList.add(Et(), gn()),
                e.viewProps.bindClassModifiers(this.element),
                Lt(e.empty, Mt(this.element, Et(void 0, "nop")));
                const s = t.createElement("div");
                s.classList.add(Et("i")),
                this.element.appendChild(s),
                this.itemsElement = s;
                const l = e.contentsElement;
                l.classList.add(Et("c")),
                this.element.appendChild(l),
                this.contentsElement = l
            }
        }
        class Pn extends Oe {
            constructor(t, e) {
                const s = new Gt(t,{
                    blade: e.blade,
                    viewProps: e.viewProps
                })
                  , l = K(!0);
                super({
                    blade: e.blade,
                    rackController: s,
                    view: new En(t,{
                        contentsElement: s.view.element,
                        empty: l,
                        viewProps: e.viewProps
                    })
                }),
                this.onPageAdd_ = this.onPageAdd_.bind(this),
                this.onPageRemove_ = this.onPageRemove_.bind(this),
                this.onPageSelectedChange_ = this.onPageSelectedChange_.bind(this),
                this.pageSet_ = new Ne(()=>null),
                this.pageSet_.emitter.on("add", this.onPageAdd_),
                this.pageSet_.emitter.on("remove", this.onPageRemove_),
                this.empty_ = l,
                this.applyPages_()
            }
            get pageSet() {
                return this.pageSet_
            }
            add(t, e) {
                this.pageSet_.add(t, e != null ? e : this.pageSet_.items.length)
            }
            remove(t) {
                this.pageSet_.remove(this.pageSet_.items[t])
            }
            applyPages_() {
                this.keepSelection_(),
                this.empty_.rawValue = this.pageSet_.items.length === 0
            }
            onPageAdd_(t) {
                const e = t.item;
                Me(this.view.itemsElement, e.itemController.view.element, t.index),
                this.rackController.rack.add(e.contentController, t.index),
                e.props.value("selected").emitter.on("change", this.onPageSelectedChange_),
                this.applyPages_()
            }
            onPageRemove_(t) {
                const e = t.item;
                $t(e.itemController.view.element),
                this.rackController.rack.remove(e.contentController),
                e.props.value("selected").emitter.off("change", this.onPageSelectedChange_),
                this.applyPages_()
            }
            keepSelection_() {
                if (this.pageSet_.items.length === 0)
                    return;
                const t = this.pageSet_.items.findIndex(e=>e.props.get("selected"));
                t < 0 ? this.pageSet_.items.forEach((e,s)=>{
                    e.props.set("selected", s === 0)
                }
                ) : this.pageSet_.items.forEach((e,s)=>{
                    e.props.set("selected", s === t)
                }
                )
            }
            onPageSelectedChange_(t) {
                if (t.rawValue) {
                    const e = this.pageSet_.items.findIndex(s=>s.props.value("selected") === t.sender);
                    this.pageSet_.items.forEach((s,l)=>{
                        s.props.set("selected", l === e)
                    }
                    )
                } else
                    this.keepSelection_()
            }
        }
        const $e = {
            id: "tab",
            type: "blade",
            accept(n) {
                const t = M
                  , e = k(n, {
                    pages: t.required.array(t.required.object({
                        title: t.required.string
                    })),
                    view: t.required.constant("tab")
                });
                return !e || e.pages.length === 0 ? null : {
                    params: e
                }
            },
            controller(n) {
                const t = new Pn(n.document,{
                    blade: n.blade,
                    viewProps: n.viewProps
                });
                return n.params.pages.forEach(e=>{
                    const s = new yn(n.document,{
                        itemProps: f.fromObject({
                            selected: !1,
                            title: e.title
                        }),
                        props: f.fromObject({
                            selected: !1
                        })
                    });
                    t.add(s)
                }
                ),
                t
            },
            api(n) {
                return n.controller instanceof Pn ? new yt(n.controller,n.pool) : null
            }
        };
        function Fe(n, t) {
            const e = n.accept(t.params);
            if (!e)
                return null;
            const s = M.optional.boolean(t.params.disabled).value
              , l = M.optional.boolean(t.params.hidden).value;
            return n.controller({
                blade: Tt(),
                document: t.document,
                params: Object.assign(Object.assign({}, e.params), {
                    disabled: s,
                    hidden: l
                }),
                viewProps: et.create({
                    disabled: s,
                    hidden: l
                })
            })
        }
        class he {
            constructor() {
                this.disabled = !1,
                this.emitter = new L
            }
            dispose() {}
            tick() {
                this.disabled || this.emitter.emit("tick", {
                    sender: this
                })
            }
        }
        class R {
            constructor(t, e) {
                this.disabled_ = !1,
                this.timerId_ = null,
                this.onTick_ = this.onTick_.bind(this),
                this.doc_ = t,
                this.emitter = new L,
                this.interval_ = e,
                this.setTimer_()
            }
            get disabled() {
                return this.disabled_
            }
            set disabled(t) {
                this.disabled_ = t,
                this.disabled_ ? this.clearTimer_() : this.setTimer_()
            }
            dispose() {
                this.clearTimer_()
            }
            clearTimer_() {
                if (this.timerId_ === null)
                    return;
                const t = this.doc_.defaultView;
                t && t.clearInterval(this.timerId_),
                this.timerId_ = null
            }
            setTimer_() {
                if (this.clearTimer_(),
                this.interval_ <= 0)
                    return;
                const t = this.doc_.defaultView;
                t && (this.timerId_ = t.setInterval(this.onTick_, this.interval_))
            }
            onTick_() {
                this.disabled_ || this.emitter.emit("tick", {
                    sender: this
                })
            }
        }
        class ut {
            constructor(t) {
                this.constraints = t
            }
            constrain(t) {
                return this.constraints.reduce((e,s)=>s.constrain(e), t)
            }
        }
        function q(n, t) {
            if (n instanceof t)
                return n;
            if (n instanceof ut) {
                const e = n.constraints.reduce((s,l)=>s || (l instanceof t ? l : null), null);
                if (e)
                    return e
            }
            return null
        }
        class I {
            constructor(t) {
                this.options = t
            }
            constrain(t) {
                const e = this.options;
                return e.length === 0 || e.filter(l=>l.value === t).length > 0 ? t : e[0].value
            }
        }
        class Y {
            constructor(t) {
                this.maxValue = t.max,
                this.minValue = t.min
            }
            constrain(t) {
                let e = t;
                return w(this.minValue) || (e = Math.max(e, this.minValue)),
                w(this.maxValue) || (e = Math.min(e, this.maxValue)),
                e
            }
        }
        class Pt {
            constructor(t) {
                this.step = t
            }
            constrain(t) {
                return (t < 0 ? -Math.round(-t / this.step) : Math.round(t / this.step)) * this.step
            }
        }
        const He = C("lst");
        class xi {
            constructor(t, e) {
                this.onValueChange_ = this.onValueChange_.bind(this),
                this.props_ = e.props,
                this.element = t.createElement("div"),
                this.element.classList.add(He()),
                e.viewProps.bindClassModifiers(this.element);
                const s = t.createElement("select");
                s.classList.add(He("s")),
                W(this.props_, "options", d=>{
                    _n(s),
                    d.forEach((h,v)=>{
                        const b = t.createElement("option");
                        b.dataset.index = String(v),
                        b.textContent = h.text,
                        b.value = String(h.value),
                        s.appendChild(b)
                    }
                    )
                }
                ),
                e.viewProps.bindDisabled(s),
                this.element.appendChild(s),
                this.selectElement = s;
                const l = t.createElement("div");
                l.classList.add(He("m")),
                l.appendChild(le(t, "dropdown")),
                this.element.appendChild(l),
                e.value.emitter.on("change", this.onValueChange_),
                this.value_ = e.value,
                this.update_()
            }
            update_() {
                this.selectElement.value = String(this.value_.rawValue)
            }
            onValueChange_() {
                this.update_()
            }
        }
        class Yt {
            constructor(t, e) {
                this.onSelectChange_ = this.onSelectChange_.bind(this),
                this.props = e.props,
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.view = new xi(t,{
                    props: this.props,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.view.selectElement.addEventListener("change", this.onSelectChange_)
            }
            onSelectChange_(t) {
                const s = t.currentTarget.selectedOptions.item(0);
                if (!s)
                    return;
                const l = Number(s.dataset.index);
                this.value.rawValue = this.props.get("options")[l].value
            }
        }
        const qe = C("pop");
        class Ci {
            constructor(t, e) {
                this.element = t.createElement("div"),
                this.element.classList.add(qe()),
                e.viewProps.bindClassModifiers(this.element),
                Lt(e.shows, Mt(this.element, qe(void 0, "v")))
            }
        }
        class kn {
            constructor(t, e) {
                this.shows = K(!1),
                this.viewProps = e.viewProps,
                this.view = new Ci(t,{
                    shows: this.shows,
                    viewProps: this.viewProps
                })
            }
        }
        const Ge = C("txt");
        class yi {
            constructor(t, e) {
                this.onChange_ = this.onChange_.bind(this),
                this.element = t.createElement("div"),
                this.element.classList.add(Ge()),
                e.viewProps.bindClassModifiers(this.element),
                this.props_ = e.props,
                this.props_.emitter.on("change", this.onChange_);
                const s = t.createElement("input");
                s.classList.add(Ge("i")),
                s.type = "text",
                e.viewProps.bindDisabled(s),
                this.element.appendChild(s),
                this.inputElement = s,
                e.value.emitter.on("change", this.onChange_),
                this.value_ = e.value,
                this.refresh()
            }
            refresh() {
                const t = this.props_.get("formatter");
                this.inputElement.value = t(this.value_.rawValue)
            }
            onChange_() {
                this.refresh()
            }
        }
        class ce {
            constructor(t, e) {
                this.onInputChange_ = this.onInputChange_.bind(this),
                this.parser_ = e.parser,
                this.props = e.props,
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.view = new yi(t,{
                    props: e.props,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.view.inputElement.addEventListener("change", this.onInputChange_)
            }
            onInputChange_(t) {
                const s = t.currentTarget.value
                  , l = this.parser_(s);
                w(l) || (this.value.rawValue = l),
                this.view.refresh()
            }
        }
        function Ye(n) {
            return String(n)
        }
        function Vn(n) {
            return n === "false" ? !1 : !!n
        }
        function Ln(n) {
            return Ye(n)
        }
        class Ei {
            constructor(t) {
                this.text = t
            }
            evaluate() {
                return Number(this.text)
            }
            toString() {
                return this.text
            }
        }
        const Pi = {
            "**": (n,t)=>Math.pow(n, t),
            "*": (n,t)=>n * t,
            "/": (n,t)=>n / t,
            "%": (n,t)=>n % t,
            "+": (n,t)=>n + t,
            "-": (n,t)=>n - t,
            "<<": (n,t)=>n << t,
            ">>": (n,t)=>n >> t,
            ">>>": (n,t)=>n >>> t,
            "&": (n,t)=>n & t,
            "^": (n,t)=>n ^ t,
            "|": (n,t)=>n | t
        };
        class ht {
            constructor(t, e, s) {
                this.left = e,
                this.operator = t,
                this.right = s
            }
            evaluate() {
                const t = Pi[this.operator];
                if (!t)
                    throw new Error(`unexpected binary operator: '${this.operator}`);
                return t(this.left.evaluate(), this.right.evaluate())
            }
            toString() {
                return ["b(", this.left.toString(), this.operator, this.right.toString(), ")"].join(" ")
            }
        }
        const ki = {
            "+": n=>n,
            "-": n=>-n,
            "~": n=>~n
        };
        class Vi {
            constructor(t, e) {
                this.operator = t,
                this.expression = e
            }
            evaluate() {
                const t = ki[this.operator];
                if (!t)
                    throw new Error(`unexpected unary operator: '${this.operator}`);
                return t(this.expression.evaluate())
            }
            toString() {
                return ["u(", this.operator, this.expression.toString(), ")"].join(" ")
            }
        }
        function Xe(n) {
            return (t,e)=>{
                for (let s = 0; s < n.length; s++) {
                    const l = n[s](t, e);
                    if (l !== "")
                        return l
                }
                return ""
            }
        }
        function Xt(n, t) {
            var e;
            const s = n.substr(t).match(/^\s+/);
            return (e = s && s[0]) !== null && e !== void 0 ? e : ""
        }
        function Li(n, t) {
            const e = n.substr(t, 1);
            return e.match(/^[1-9]$/) ? e : ""
        }
        function Nt(n, t) {
            var e;
            const s = n.substr(t).match(/^[0-9]+/);
            return (e = s && s[0]) !== null && e !== void 0 ? e : ""
        }
        function Mi(n, t) {
            const e = Nt(n, t);
            if (e !== "")
                return e;
            const s = n.substr(t, 1);
            if (t += 1,
            s !== "-" && s !== "+")
                return "";
            const l = Nt(n, t);
            return l === "" ? "" : s + l
        }
        function We(n, t) {
            const e = n.substr(t, 1);
            if (t += 1,
            e.toLowerCase() !== "e")
                return "";
            const s = Mi(n, t);
            return s === "" ? "" : e + s
        }
        function X(n, t) {
            const e = n.substr(t, 1);
            if (e === "0")
                return e;
            const s = Li(n, t);
            return t += s.length,
            s === "" ? "" : s + Nt(n, t)
        }
        function Si(n, t) {
            const e = X(n, t);
            if (t += e.length,
            e === "")
                return "";
            const s = n.substr(t, 1);
            if (t += s.length,
            s !== ".")
                return "";
            const l = Nt(n, t);
            return t += l.length,
            e + s + l + We(n, t)
        }
        function Ai(n, t) {
            const e = n.substr(t, 1);
            if (t += e.length,
            e !== ".")
                return "";
            const s = Nt(n, t);
            return t += s.length,
            s === "" ? "" : e + s + We(n, t)
        }
        function Je(n, t) {
            const e = X(n, t);
            return t += e.length,
            e === "" ? "" : e + We(n, t)
        }
        const Ti = Xe([Si, Ai, Je]);
        function ct(n, t) {
            var e;
            const s = n.substr(t).match(/^[01]+/);
            return (e = s && s[0]) !== null && e !== void 0 ? e : ""
        }
        function Mn(n, t) {
            const e = n.substr(t, 2);
            if (t += e.length,
            e.toLowerCase() !== "0b")
                return "";
            const s = ct(n, t);
            return s === "" ? "" : e + s
        }
        function Di(n, t) {
            var e;
            const s = n.substr(t).match(/^[0-7]+/);
            return (e = s && s[0]) !== null && e !== void 0 ? e : ""
        }
        function Sn(n, t) {
            const e = n.substr(t, 2);
            if (t += e.length,
            e.toLowerCase() !== "0o")
                return "";
            const s = Di(n, t);
            return s === "" ? "" : e + s
        }
        function Ni(n, t) {
            var e;
            const s = n.substr(t).match(/^[0-9a-f]+/i);
            return (e = s && s[0]) !== null && e !== void 0 ? e : ""
        }
        function kt(n, t) {
            const e = n.substr(t, 2);
            if (t += e.length,
            e.toLowerCase() !== "0x")
                return "";
            const s = Ni(n, t);
            return s === "" ? "" : e + s
        }
        const zi = Xe([Mn, Sn, kt])
          , Qe = Xe([zi, Ti]);
        function Ri(n, t) {
            const e = Qe(n, t);
            return t += e.length,
            e === "" ? null : {
                evaluable: new Ei(e),
                cursor: t
            }
        }
        function An(n, t) {
            const e = n.substr(t, 1);
            if (t += e.length,
            e !== "(")
                return null;
            const s = Ze(n, t);
            if (!s)
                return null;
            t = s.cursor,
            t += Xt(n, t).length;
            const l = n.substr(t, 1);
            return t += l.length,
            l !== ")" ? null : {
                evaluable: s.evaluable,
                cursor: t
            }
        }
        function vt(n, t) {
            return Ri(n, t) || An(n, t)
        }
        function Tn(n, t) {
            const e = vt(n, t);
            if (e)
                return e;
            const s = n.substr(t, 1);
            if (t += s.length,
            s !== "+" && s !== "-" && s !== "~")
                return null;
            const l = Tn(n, t);
            return l ? (t = l.cursor,
            {
                cursor: t,
                evaluable: new Vi(s,l.evaluable)
            }) : null
        }
        function Bi(n, t, e) {
            e += Xt(t, e).length;
            const s = n.filter(l=>t.startsWith(l, e))[0];
            return s ? (e += s.length,
            e += Xt(t, e).length,
            {
                cursor: e,
                operator: s
            }) : null
        }
        function Dn(n, t) {
            return (e,s)=>{
                const l = n(e, s);
                if (!l)
                    return null;
                s = l.cursor;
                let d = l.evaluable;
                for (; ; ) {
                    const h = Bi(t, e, s);
                    if (!h)
                        break;
                    s = h.cursor;
                    const v = n(e, s);
                    if (!v)
                        return null;
                    s = v.cursor,
                    d = new ht(h.operator,d,v.evaluable)
                }
                return d ? {
                    cursor: s,
                    evaluable: d
                } : null
            }
        }
        const Nn = [["**"], ["*", "/", "%"], ["+", "-"], ["<<", ">>>", ">>"], ["&"], ["^"], ["|"]].reduce((n,t)=>Dn(n, t), Tn);
        function Ze(n, t) {
            return t += Xt(n, t).length,
            Nn(n, t)
        }
        function zt(n) {
            const t = Ze(n, 0);
            return !t || t.cursor + Xt(n, t.cursor).length !== n.length ? null : t.evaluable
        }
        function lt(n) {
            var t;
            const e = zt(n);
            return (t = e == null ? void 0 : e.evaluate()) !== null && t !== void 0 ? t : null
        }
        function ve(n) {
            if (typeof n == "number")
                return n;
            if (typeof n == "string") {
                const t = lt(n);
                if (!w(t))
                    return t
            }
            return 0
        }
        function Oi(n) {
            return String(n)
        }
        function G(n) {
            return t=>t.toFixed(Math.max(Math.min(n, 20), 0))
        }
        const Ii = G(0);
        function Wt(n) {
            return Ii(n) + "%"
        }
        function zn(n) {
            return String(n)
        }
        function tn(n) {
            return n
        }
        function Rn(n, t) {
            for (; n.length < t; )
                n.push(void 0)
        }
        function Bn(n) {
            const t = [];
            return Rn(t, n),
            K(t)
        }
        function Ki(n) {
            const t = n.indexOf(void 0);
            return t < 0 ? n : n.slice(0, t)
        }
        function Jt(n, t) {
            const e = [...Ki(n), t];
            return e.length > n.length ? e.splice(0, e.length - n.length) : Rn(e, n.length),
            e
        }
        function Qt({primary: n, secondary: t, forward: e, backward: s}) {
            let l = !1;
            function d(h) {
                l || (l = !0,
                h(),
                l = !1)
            }
            n.emitter.on("change", h=>{
                d(()=>{
                    t.setRawValue(e(n, t), h.options)
                }
                )
            }
            ),
            t.emitter.on("change", h=>{
                d(()=>{
                    n.setRawValue(s(n, t), h.options)
                }
                ),
                d(()=>{
                    t.setRawValue(e(n, t), h.options)
                }
                )
            }
            ),
            d(()=>{
                t.setRawValue(e(n, t), {
                    forceEmit: !1,
                    last: !0
                })
            }
            )
        }
        function j(n, t) {
            const e = n * (t.altKey ? .1 : 1) * (t.shiftKey ? 10 : 1);
            return t.upKey ? +e : t.downKey ? -e : 0
        }
        function Zt(n) {
            return {
                altKey: n.altKey,
                downKey: n.key === "ArrowDown",
                shiftKey: n.shiftKey,
                upKey: n.key === "ArrowUp"
            }
        }
        function pt(n) {
            return {
                altKey: n.altKey,
                downKey: n.key === "ArrowLeft",
                shiftKey: n.shiftKey,
                upKey: n.key === "ArrowRight"
            }
        }
        function Q(n) {
            return n === "ArrowUp" || n === "ArrowDown"
        }
        function en(n) {
            return Q(n) || n === "ArrowLeft" || n === "ArrowRight"
        }
        function me(n, t) {
            const e = t.ownerDocument.defaultView
              , s = t.getBoundingClientRect();
            return {
                x: n.pageX - ((e && e.scrollX || 0) + s.left),
                y: n.pageY - ((e && e.scrollY || 0) + s.top)
            }
        }
        class dt {
            constructor(t) {
                this.lastTouch_ = null,
                this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this),
                this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this),
                this.onMouseDown_ = this.onMouseDown_.bind(this),
                this.onTouchEnd_ = this.onTouchEnd_.bind(this),
                this.onTouchMove_ = this.onTouchMove_.bind(this),
                this.onTouchStart_ = this.onTouchStart_.bind(this),
                this.elem_ = t,
                this.emitter = new L,
                t.addEventListener("touchstart", this.onTouchStart_),
                t.addEventListener("touchmove", this.onTouchMove_),
                t.addEventListener("touchend", this.onTouchEnd_),
                t.addEventListener("mousedown", this.onMouseDown_)
            }
            computePosition_(t) {
                const e = this.elem_.getBoundingClientRect();
                return {
                    bounds: {
                        width: e.width,
                        height: e.height
                    },
                    point: t ? {
                        x: t.x,
                        y: t.y
                    } : null
                }
            }
            onMouseDown_(t) {
                var e;
                t.preventDefault(),
                (e = t.currentTarget) === null || e === void 0 || e.focus();
                const s = this.elem_.ownerDocument;
                s.addEventListener("mousemove", this.onDocumentMouseMove_),
                s.addEventListener("mouseup", this.onDocumentMouseUp_),
                this.emitter.emit("down", {
                    altKey: t.altKey,
                    data: this.computePosition_(me(t, this.elem_)),
                    sender: this,
                    shiftKey: t.shiftKey
                })
            }
            onDocumentMouseMove_(t) {
                this.emitter.emit("move", {
                    altKey: t.altKey,
                    data: this.computePosition_(me(t, this.elem_)),
                    sender: this,
                    shiftKey: t.shiftKey
                })
            }
            onDocumentMouseUp_(t) {
                const e = this.elem_.ownerDocument;
                e.removeEventListener("mousemove", this.onDocumentMouseMove_),
                e.removeEventListener("mouseup", this.onDocumentMouseUp_),
                this.emitter.emit("up", {
                    altKey: t.altKey,
                    data: this.computePosition_(me(t, this.elem_)),
                    sender: this,
                    shiftKey: t.shiftKey
                })
            }
            onTouchStart_(t) {
                t.preventDefault();
                const e = t.targetTouches.item(0)
                  , s = this.elem_.getBoundingClientRect();
                this.emitter.emit("down", {
                    altKey: t.altKey,
                    data: this.computePosition_(e ? {
                        x: e.clientX - s.left,
                        y: e.clientY - s.top
                    } : void 0),
                    sender: this,
                    shiftKey: t.shiftKey
                }),
                this.lastTouch_ = e
            }
            onTouchMove_(t) {
                const e = t.targetTouches.item(0)
                  , s = this.elem_.getBoundingClientRect();
                this.emitter.emit("move", {
                    altKey: t.altKey,
                    data: this.computePosition_(e ? {
                        x: e.clientX - s.left,
                        y: e.clientY - s.top
                    } : void 0),
                    sender: this,
                    shiftKey: t.shiftKey
                }),
                this.lastTouch_ = e
            }
            onTouchEnd_(t) {
                var e;
                const s = (e = t.targetTouches.item(0)) !== null && e !== void 0 ? e : this.lastTouch_
                  , l = this.elem_.getBoundingClientRect();
                this.emitter.emit("up", {
                    altKey: t.altKey,
                    data: this.computePosition_(s ? {
                        x: s.clientX - l.left,
                        y: s.clientY - l.top
                    } : void 0),
                    sender: this,
                    shiftKey: t.shiftKey
                })
            }
        }
        function A(n, t, e, s, l) {
            const d = (n - t) / (e - t);
            return s + d * (l - s)
        }
        function mt(n) {
            return String(n.toFixed(10)).split(".")[1].replace(/0+$/, "").length
        }
        function T(n, t, e) {
            return Math.min(Math.max(n, t), e)
        }
        function nn(n, t) {
            return (n % t + t) % t
        }
        const Z = C("txt");
        class ji {
            constructor(t, e) {
                this.onChange_ = this.onChange_.bind(this),
                this.props_ = e.props,
                this.props_.emitter.on("change", this.onChange_),
                this.element = t.createElement("div"),
                this.element.classList.add(Z(), Z(void 0, "num")),
                e.arrayPosition && this.element.classList.add(Z(void 0, e.arrayPosition)),
                e.viewProps.bindClassModifiers(this.element);
                const s = t.createElement("input");
                s.classList.add(Z("i")),
                s.type = "text",
                e.viewProps.bindDisabled(s),
                this.element.appendChild(s),
                this.inputElement = s,
                this.onDraggingChange_ = this.onDraggingChange_.bind(this),
                this.dragging_ = e.dragging,
                this.dragging_.emitter.on("change", this.onDraggingChange_),
                this.element.classList.add(Z()),
                this.inputElement.classList.add(Z("i"));
                const l = t.createElement("div");
                l.classList.add(Z("k")),
                this.element.appendChild(l),
                this.knobElement = l;
                const d = t.createElementNS(F, "svg");
                d.classList.add(Z("g")),
                this.knobElement.appendChild(d);
                const h = t.createElementNS(F, "path");
                h.classList.add(Z("gb")),
                d.appendChild(h),
                this.guideBodyElem_ = h;
                const v = t.createElementNS(F, "path");
                v.classList.add(Z("gh")),
                d.appendChild(v),
                this.guideHeadElem_ = v;
                const b = t.createElement("div");
                b.classList.add(C("tt")()),
                this.knobElement.appendChild(b),
                this.tooltipElem_ = b,
                e.value.emitter.on("change", this.onChange_),
                this.value = e.value,
                this.refresh()
            }
            onDraggingChange_(t) {
                if (t.rawValue === null) {
                    this.element.classList.remove(Z(void 0, "drg"));
                    return
                }
                this.element.classList.add(Z(void 0, "drg"));
                const e = t.rawValue / this.props_.get("draggingScale")
                  , s = e + (e > 0 ? -1 : e < 0 ? 1 : 0)
                  , l = T(-s, -4, 4);
                this.guideHeadElem_.setAttributeNS(null, "d", [`M ${s + l},0 L ${s},4 L ${s + l},8`, `M ${e},-1 L ${e},9`].join(" ")),
                this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L ${e},4`);
                const d = this.props_.get("formatter");
                this.tooltipElem_.textContent = d(this.value.rawValue),
                this.tooltipElem_.style.left = `${e}px`
            }
            refresh() {
                const t = this.props_.get("formatter");
                this.inputElement.value = t(this.value.rawValue)
            }
            onChange_() {
                this.refresh()
            }
        }
        class te {
            constructor(t, e) {
                this.originRawValue_ = 0,
                this.onInputChange_ = this.onInputChange_.bind(this),
                this.onInputKeyDown_ = this.onInputKeyDown_.bind(this),
                this.onInputKeyUp_ = this.onInputKeyUp_.bind(this),
                this.onPointerDown_ = this.onPointerDown_.bind(this),
                this.onPointerMove_ = this.onPointerMove_.bind(this),
                this.onPointerUp_ = this.onPointerUp_.bind(this),
                this.baseStep_ = e.baseStep,
                this.parser_ = e.parser,
                this.props = e.props,
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.dragging_ = K(null),
                this.view = new ji(t,{
                    arrayPosition: e.arrayPosition,
                    dragging: this.dragging_,
                    props: this.props,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.view.inputElement.addEventListener("change", this.onInputChange_),
                this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_),
                this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
                const s = new dt(this.view.knobElement);
                s.emitter.on("down", this.onPointerDown_),
                s.emitter.on("move", this.onPointerMove_),
                s.emitter.on("up", this.onPointerUp_)
            }
            onInputChange_(t) {
                const s = t.currentTarget.value
                  , l = this.parser_(s);
                w(l) || (this.value.rawValue = l),
                this.view.refresh()
            }
            onInputKeyDown_(t) {
                const e = j(this.baseStep_, Zt(t));
                e !== 0 && this.value.setRawValue(this.value.rawValue + e, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onInputKeyUp_(t) {
                j(this.baseStep_, Zt(t)) !== 0 && this.value.setRawValue(this.value.rawValue, {
                    forceEmit: !0,
                    last: !0
                })
            }
            onPointerDown_() {
                this.originRawValue_ = this.value.rawValue,
                this.dragging_.rawValue = 0
            }
            computeDraggingValue_(t) {
                if (!t.point)
                    return null;
                const e = t.point.x - t.bounds.width / 2;
                return this.originRawValue_ + e * this.props.get("draggingScale")
            }
            onPointerMove_(t) {
                const e = this.computeDraggingValue_(t.data);
                e !== null && (this.value.setRawValue(e, {
                    forceEmit: !1,
                    last: !1
                }),
                this.dragging_.rawValue = this.value.rawValue - this.originRawValue_)
            }
            onPointerUp_(t) {
                const e = this.computeDraggingValue_(t.data);
                e !== null && (this.value.setRawValue(e, {
                    forceEmit: !0,
                    last: !0
                }),
                this.dragging_.rawValue = null)
            }
        }
        const sn = C("sld");
        class Ui {
            constructor(t, e) {
                this.onChange_ = this.onChange_.bind(this),
                this.props_ = e.props,
                this.props_.emitter.on("change", this.onChange_),
                this.element = t.createElement("div"),
                this.element.classList.add(sn()),
                e.viewProps.bindClassModifiers(this.element);
                const s = t.createElement("div");
                s.classList.add(sn("t")),
                e.viewProps.bindTabIndex(s),
                this.element.appendChild(s),
                this.trackElement = s;
                const l = t.createElement("div");
                l.classList.add(sn("k")),
                this.trackElement.appendChild(l),
                this.knobElement = l,
                e.value.emitter.on("change", this.onChange_),
                this.value = e.value,
                this.update_()
            }
            update_() {
                const t = T(A(this.value.rawValue, this.props_.get("minValue"), this.props_.get("maxValue"), 0, 100), 0, 100);
                this.knobElement.style.width = `${t}%`
            }
            onChange_() {
                this.update_()
            }
        }
        class $i {
            constructor(t, e) {
                this.onKeyDown_ = this.onKeyDown_.bind(this),
                this.onKeyUp_ = this.onKeyUp_.bind(this),
                this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this),
                this.onPointerUp_ = this.onPointerUp_.bind(this),
                this.baseStep_ = e.baseStep,
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.props = e.props,
                this.view = new Ui(t,{
                    props: this.props,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.ptHandler_ = new dt(this.view.trackElement),
                this.ptHandler_.emitter.on("down", this.onPointerDownOrMove_),
                this.ptHandler_.emitter.on("move", this.onPointerDownOrMove_),
                this.ptHandler_.emitter.on("up", this.onPointerUp_),
                this.view.trackElement.addEventListener("keydown", this.onKeyDown_),
                this.view.trackElement.addEventListener("keyup", this.onKeyUp_)
            }
            handlePointerEvent_(t, e) {
                !t.point || this.value.setRawValue(A(T(t.point.x, 0, t.bounds.width), 0, t.bounds.width, this.props.get("minValue"), this.props.get("maxValue")), e)
            }
            onPointerDownOrMove_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onPointerUp_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !0,
                    last: !0
                })
            }
            onKeyDown_(t) {
                const e = j(this.baseStep_, pt(t));
                e !== 0 && this.value.setRawValue(this.value.rawValue + e, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onKeyUp_(t) {
                j(this.baseStep_, pt(t)) !== 0 && this.value.setRawValue(this.value.rawValue, {
                    forceEmit: !0,
                    last: !0
                })
            }
        }
        const rn = C("sldtxt");
        class Fi {
            constructor(t, e) {
                this.element = t.createElement("div"),
                this.element.classList.add(rn());
                const s = t.createElement("div");
                s.classList.add(rn("s")),
                this.sliderView_ = e.sliderView,
                s.appendChild(this.sliderView_.element),
                this.element.appendChild(s);
                const l = t.createElement("div");
                l.classList.add(rn("t")),
                this.textView_ = e.textView,
                l.appendChild(this.textView_.element),
                this.element.appendChild(l)
            }
        }
        class Vt {
            constructor(t, e) {
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.sliderC_ = new $i(t,{
                    baseStep: e.baseStep,
                    props: e.sliderProps,
                    value: e.value,
                    viewProps: this.viewProps
                }),
                this.textC_ = new te(t,{
                    baseStep: e.baseStep,
                    parser: e.parser,
                    props: e.textProps,
                    value: e.value,
                    viewProps: e.viewProps
                }),
                this.view = new Fi(t,{
                    sliderView: this.sliderC_.view,
                    textView: this.textC_.view
                })
            }
            get sliderController() {
                return this.sliderC_
            }
            get textController() {
                return this.textC_
            }
        }
        function ee(n, t) {
            n.write(t)
        }
        function be(n) {
            const t = M;
            if (Array.isArray(n))
                return t.required.array(t.required.object({
                    text: t.required.string,
                    value: t.required.raw
                }))(n).value;
            if (typeof n == "object")
                return t.required.raw(n).value
        }
        function _e(n) {
            if (n === "inline" || n === "popup")
                return n
        }
        function bt(n) {
            const t = M;
            return t.required.object({
                max: t.optional.number,
                min: t.optional.number,
                step: t.optional.number
            })(n).value
        }
        function Hi(n) {
            if (Array.isArray(n))
                return n;
            const t = [];
            return Object.keys(n).forEach(e=>{
                t.push({
                    text: e,
                    value: n[e]
                })
            }
            ),
            t
        }
        function on(n) {
            return w(n) ? null : new I(Hi(n))
        }
        function o(n) {
            const t = n ? q(n, I) : null;
            return t ? t.options : null
        }
        function i(n) {
            const t = n ? q(n, Pt) : null;
            return t ? t.step : null
        }
        function r(n, t) {
            const e = n && q(n, Pt);
            return e ? mt(e.step) : Math.max(mt(t), 2)
        }
        function a(n) {
            const t = i(n);
            return t != null ? t : 1
        }
        function p(n, t) {
            var e;
            const s = n && q(n, Pt)
              , l = Math.abs((e = s == null ? void 0 : s.step) !== null && e !== void 0 ? e : t);
            return l === 0 ? .1 : Math.pow(10, Math.floor(Math.log10(l)) - 1)
        }
        const u = C("ckb");
        class c {
            constructor(t, e) {
                this.onValueChange_ = this.onValueChange_.bind(this),
                this.element = t.createElement("div"),
                this.element.classList.add(u()),
                e.viewProps.bindClassModifiers(this.element);
                const s = t.createElement("label");
                s.classList.add(u("l")),
                this.element.appendChild(s);
                const l = t.createElement("input");
                l.classList.add(u("i")),
                l.type = "checkbox",
                s.appendChild(l),
                this.inputElement = l,
                e.viewProps.bindDisabled(this.inputElement);
                const d = t.createElement("div");
                d.classList.add(u("w")),
                s.appendChild(d);
                const h = le(t, "check");
                d.appendChild(h),
                e.value.emitter.on("change", this.onValueChange_),
                this.value = e.value,
                this.update_()
            }
            update_() {
                this.inputElement.checked = this.value.rawValue
            }
            onValueChange_() {
                this.update_()
            }
        }
        class m {
            constructor(t, e) {
                this.onInputChange_ = this.onInputChange_.bind(this),
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.view = new c(t,{
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.view.inputElement.addEventListener("change", this.onInputChange_)
            }
            onInputChange_(t) {
                const e = t.currentTarget;
                this.value.rawValue = e.checked
            }
        }
        function S(n) {
            const t = []
              , e = on(n.options);
            return e && t.push(e),
            new ut(t)
        }
        const tt = {
            id: "input-bool",
            type: "input",
            accept: (n,t)=>{
                if (typeof n != "boolean")
                    return null;
                const s = k(t, {
                    options: M.optional.custom(be)
                });
                return s ? {
                    initialValue: n,
                    params: s
                } : null
            }
            ,
            binding: {
                reader: n=>Vn,
                constraint: n=>S(n.params),
                writer: n=>ee
            },
            controller: n=>{
                var t;
                const e = n.document
                  , s = n.value
                  , l = n.constraint;
                return l && q(l, I) ? new Yt(e,{
                    props: f.fromObject({
                        options: (t = o(l)) !== null && t !== void 0 ? t : []
                    }),
                    value: s,
                    viewProps: n.viewProps
                }) : new m(e,{
                    value: s,
                    viewProps: n.viewProps
                })
            }
        }
          , U = C("col");
        class an {
            constructor(t, e) {
                this.element = t.createElement("div"),
                this.element.classList.add(U()),
                e.foldable.bindExpandedClass(this.element, U(void 0, "expanded")),
                W(e.foldable, "completed", Mt(this.element, U(void 0, "cpl")));
                const s = t.createElement("div");
                s.classList.add(U("h")),
                this.element.appendChild(s);
                const l = t.createElement("div");
                l.classList.add(U("s")),
                s.appendChild(l),
                this.swatchElement = l;
                const d = t.createElement("div");
                if (d.classList.add(U("t")),
                s.appendChild(d),
                this.textElement = d,
                e.pickerLayout === "inline") {
                    const h = t.createElement("div");
                    h.classList.add(U("p")),
                    this.element.appendChild(h),
                    this.pickerElement = h
                } else
                    this.pickerElement = null
            }
        }
        function qi(n, t, e) {
            const s = T(n / 255, 0, 1)
              , l = T(t / 255, 0, 1)
              , d = T(e / 255, 0, 1)
              , h = Math.max(s, l, d)
              , v = Math.min(s, l, d)
              , b = h - v;
            let g = 0
              , P = 0;
            const V = (v + h) / 2;
            return b !== 0 && (P = b / (1 - Math.abs(h + v - 1)),
            s === h ? g = (l - d) / b : l === h ? g = 2 + (d - s) / b : g = 4 + (s - l) / b,
            g = g / 6 + (g < 0 ? 1 : 0)),
            [g * 360, P * 100, V * 100]
        }
        function Gi(n, t, e) {
            const s = (n % 360 + 360) % 360
              , l = T(t / 100, 0, 1)
              , d = T(e / 100, 0, 1)
              , h = (1 - Math.abs(2 * d - 1)) * l
              , v = h * (1 - Math.abs(s / 60 % 2 - 1))
              , b = d - h / 2;
            let g, P, V;
            return s >= 0 && s < 60 ? [g,P,V] = [h, v, 0] : s >= 60 && s < 120 ? [g,P,V] = [v, h, 0] : s >= 120 && s < 180 ? [g,P,V] = [0, h, v] : s >= 180 && s < 240 ? [g,P,V] = [0, v, h] : s >= 240 && s < 300 ? [g,P,V] = [v, 0, h] : [g,P,V] = [h, 0, v],
            [(g + b) * 255, (P + b) * 255, (V + b) * 255]
        }
        function Ds(n, t, e) {
            const s = T(n / 255, 0, 1)
              , l = T(t / 255, 0, 1)
              , d = T(e / 255, 0, 1)
              , h = Math.max(s, l, d)
              , v = Math.min(s, l, d)
              , b = h - v;
            let g;
            b === 0 ? g = 0 : h === s ? g = 60 * (((l - d) / b % 6 + 6) % 6) : h === l ? g = 60 * ((d - s) / b + 2) : g = 60 * ((s - l) / b + 4);
            const P = h === 0 ? 0 : b / h
              , V = h;
            return [g, P * 100, V * 100]
        }
        function ds(n, t, e) {
            const s = nn(n, 360)
              , l = T(t / 100, 0, 1)
              , d = T(e / 100, 0, 1)
              , h = d * l
              , v = h * (1 - Math.abs(s / 60 % 2 - 1))
              , b = d - h;
            let g, P, V;
            return s >= 0 && s < 60 ? [g,P,V] = [h, v, 0] : s >= 60 && s < 120 ? [g,P,V] = [v, h, 0] : s >= 120 && s < 180 ? [g,P,V] = [0, h, v] : s >= 180 && s < 240 ? [g,P,V] = [0, v, h] : s >= 240 && s < 300 ? [g,P,V] = [v, 0, h] : [g,P,V] = [h, 0, v],
            [(g + b) * 255, (P + b) * 255, (V + b) * 255]
        }
        function Ns(n, t, e) {
            const s = e + t * (100 - Math.abs(2 * e - 100)) / 200;
            return [n, s !== 0 ? t * (100 - Math.abs(2 * e - 100)) / s : 0, e + t * (100 - Math.abs(2 * e - 100)) / (2 * 100)]
        }
        function zs(n, t, e) {
            const s = 100 - Math.abs(e * (200 - t) / 100 - 100);
            return [n, s !== 0 ? t * e / s : 0, e * (200 - t) / (2 * 100)]
        }
        function fe(n) {
            return [n[0], n[1], n[2]]
        }
        function us(n, t) {
            return [n[0], n[1], n[2], t]
        }
        const Rs = {
            hsl: {
                hsl: (n,t,e)=>[n, t, e],
                hsv: Ns,
                rgb: Gi
            },
            hsv: {
                hsl: zs,
                hsv: (n,t,e)=>[n, t, e],
                rgb: ds
            },
            rgb: {
                hsl: qi,
                hsv: Ds,
                rgb: (n,t,e)=>[n, t, e]
            }
        };
        function Bs(n, t, e) {
            return Rs[t][e](...n)
        }
        const Os = {
            hsl: n=>{
                var t;
                return [nn(n[0], 360), T(n[1], 0, 100), T(n[2], 0, 100), T((t = n[3]) !== null && t !== void 0 ? t : 1, 0, 1)]
            }
            ,
            hsv: n=>{
                var t;
                return [nn(n[0], 360), T(n[1], 0, 100), T(n[2], 0, 100), T((t = n[3]) !== null && t !== void 0 ? t : 1, 0, 1)]
            }
            ,
            rgb: n=>{
                var t;
                return [T(n[0], 0, 255), T(n[1], 0, 255), T(n[2], 0, 255), T((t = n[3]) !== null && t !== void 0 ? t : 1, 0, 1)]
            }
        };
        function On(n, t) {
            return typeof n != "object" || w(n) ? !1 : t in n && typeof n[t] == "number"
        }
        class y {
            constructor(t, e) {
                this.mode_ = e,
                this.comps_ = Os[e](t)
            }
            static black() {
                return new y([0, 0, 0],"rgb")
            }
            static fromObject(t) {
                const e = "a"in t ? [t.r, t.g, t.b, t.a] : [t.r, t.g, t.b];
                return new y(e,"rgb")
            }
            static toRgbaObject(t) {
                return t.toRgbaObject()
            }
            static isRgbColorObject(t) {
                return On(t, "r") && On(t, "g") && On(t, "b")
            }
            static isRgbaColorObject(t) {
                return this.isRgbColorObject(t) && On(t, "a")
            }
            static isColorObject(t) {
                return this.isRgbColorObject(t)
            }
            static equals(t, e) {
                if (t.mode_ !== e.mode_)
                    return !1;
                const s = t.comps_
                  , l = e.comps_;
                for (let d = 0; d < s.length; d++)
                    if (s[d] !== l[d])
                        return !1;
                return !0
            }
            get mode() {
                return this.mode_
            }
            getComponents(t) {
                return us(Bs(fe(this.comps_), this.mode_, t || this.mode_), this.comps_[3])
            }
            toRgbaObject() {
                const t = this.getComponents("rgb");
                return {
                    r: t[0],
                    g: t[1],
                    b: t[2],
                    a: t[3]
                }
            }
        }
        const Rt = C("colp");
        class Is {
            constructor(t, e) {
                this.alphaViews_ = null,
                this.element = t.createElement("div"),
                this.element.classList.add(Rt());
                const s = t.createElement("div");
                s.classList.add(Rt("hsv"));
                const l = t.createElement("div");
                l.classList.add(Rt("sv")),
                this.svPaletteView_ = e.svPaletteView,
                l.appendChild(this.svPaletteView_.element),
                s.appendChild(l);
                const d = t.createElement("div");
                d.classList.add(Rt("h")),
                this.hPaletteView_ = e.hPaletteView,
                d.appendChild(this.hPaletteView_.element),
                s.appendChild(d),
                this.element.appendChild(s);
                const h = t.createElement("div");
                if (h.classList.add(Rt("rgb")),
                this.textView_ = e.textView,
                h.appendChild(this.textView_.element),
                this.element.appendChild(h),
                e.alphaViews) {
                    this.alphaViews_ = {
                        palette: e.alphaViews.palette,
                        text: e.alphaViews.text
                    };
                    const v = t.createElement("div");
                    v.classList.add(Rt("a"));
                    const b = t.createElement("div");
                    b.classList.add(Rt("ap")),
                    b.appendChild(this.alphaViews_.palette.element),
                    v.appendChild(b);
                    const g = t.createElement("div");
                    g.classList.add(Rt("at")),
                    g.appendChild(this.alphaViews_.text.element),
                    v.appendChild(g),
                    this.element.appendChild(v)
                }
            }
            get allFocusableElements() {
                const t = [this.svPaletteView_.element, this.hPaletteView_.element, this.textView_.modeSelectElement, ...this.textView_.textViews.map(e=>e.inputElement)];
                return this.alphaViews_ && t.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement),
                t
            }
        }
        function Yi(n) {
            const t = M;
            return k(n, {
                alpha: t.optional.boolean,
                expanded: t.optional.boolean,
                picker: t.optional.custom(_e)
            })
        }
        function ne(n) {
            return n ? .1 : 1
        }
        function rt(n, t) {
            const e = n.match(/^(.+)%$/);
            return Math.min(e ? parseFloat(e[1]) * .01 * t : parseFloat(n), t)
        }
        const Ks = {
            deg: n=>n,
            grad: n=>n * 360 / 400,
            rad: n=>n * 360 / (2 * Math.PI),
            turn: n=>n * 360
        };
        function hs(n) {
            const t = n.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
            if (!t)
                return parseFloat(n);
            const e = parseFloat(t[1])
              , s = t[2];
            return Ks[s](e)
        }
        const Xi = {
            "func.rgb": n=>{
                const t = n.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
                if (!t)
                    return null;
                const e = [rt(t[1], 255), rt(t[2], 255), rt(t[3], 255)];
                return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) ? null : new y(e,"rgb")
            }
            ,
            "func.rgba": n=>{
                const t = n.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
                if (!t)
                    return null;
                const e = [rt(t[1], 255), rt(t[2], 255), rt(t[3], 255), rt(t[4], 1)];
                return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) || isNaN(e[3]) ? null : new y(e,"rgb")
            }
            ,
            "func.hsl": n=>{
                const t = n.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
                if (!t)
                    return null;
                const e = [hs(t[1]), rt(t[2], 100), rt(t[3], 100)];
                return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) ? null : new y(e,"hsl")
            }
            ,
            "func.hsla": n=>{
                const t = n.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
                if (!t)
                    return null;
                const e = [hs(t[1]), rt(t[2], 100), rt(t[3], 100), rt(t[4], 1)];
                return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) || isNaN(e[3]) ? null : new y(e,"hsl")
            }
            ,
            "hex.rgb": n=>{
                const t = n.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
                if (t)
                    return new y([parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)],"rgb");
                const e = n.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
                return e ? new y([parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)],"rgb") : null
            }
            ,
            "hex.rgba": n=>{
                const t = n.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
                if (t)
                    return new y([parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16), A(parseInt(t[4] + t[4], 16), 0, 255, 0, 1)],"rgb");
                const e = n.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
                return e ? new y([parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16), A(parseInt(e[4], 16), 0, 255, 0, 1)],"rgb") : null
            }
        };
        function In(n) {
            return Object.keys(Xi).reduce((e,s)=>{
                if (e)
                    return e;
                const l = Xi[s];
                return l(n) ? s : null
            }
            , null)
        }
        const Kn = n=>{
            const t = In(n);
            return t ? Xi[t](n) : null
        }
        ;
        function js(n) {
            return n === "func.hsla" || n === "func.rgba" || n === "hex.rgba"
        }
        function Us(n) {
            if (typeof n == "string") {
                const t = Kn(n);
                if (t)
                    return t
            }
            return y.black()
        }
        function cs(n) {
            const t = T(Math.floor(n), 0, 255).toString(16);
            return t.length === 1 ? `0 ${t}` : t
        }
        function Wi(n, t="#") {
            const e = fe(n.getComponents("rgb")).map(cs).join("");
            return `${t}${e}`
        }
        function jn(n, t="#") {
            const e = n.getComponents("rgb")
              , s = [e[0], e[1], e[2], e[3] * 255].map(cs).join("");
            return `${t}${s}`
        }
        function vs(n) {
            const t = G(0);
            return `rgb(${fe(n.getComponents("rgb")).map(s=>t(s)).join(", ")})`
        }
        function Un(n) {
            const t = G(2)
              , e = G(0);
            return `rgba(${n.getComponents("rgb").map((l,d)=>(d === 3 ? t : e)(l)).join(", ")})`
        }
        function $s(n) {
            const t = [G(0), Wt, Wt];
            return `hsl(${fe(n.getComponents("hsl")).map((s,l)=>t[l](s)).join(", ")})`
        }
        function Fs(n) {
            const t = [G(0), Wt, Wt, G(2)];
            return `hsla(${n.getComponents("hsl").map((s,l)=>t[l](s)).join(", ")})`
        }
        const Hs = {
            "func.hsl": $s,
            "func.hsla": Fs,
            "func.rgb": vs,
            "func.rgba": Un,
            "hex.rgb": Wi,
            "hex.rgba": jn
        };
        function ms(n) {
            return Hs[n]
        }
        const ln = C("apl");
        class qs {
            constructor(t, e) {
                this.onValueChange_ = this.onValueChange_.bind(this),
                this.value = e.value,
                this.value.emitter.on("change", this.onValueChange_),
                this.element = t.createElement("div"),
                this.element.classList.add(ln()),
                e.viewProps.bindTabIndex(this.element);
                const s = t.createElement("div");
                s.classList.add(ln("b")),
                this.element.appendChild(s);
                const l = t.createElement("div");
                l.classList.add(ln("c")),
                s.appendChild(l),
                this.colorElem_ = l;
                const d = t.createElement("div");
                d.classList.add(ln("m")),
                this.element.appendChild(d),
                this.markerElem_ = d;
                const h = t.createElement("div");
                h.classList.add(ln("p")),
                this.markerElem_.appendChild(h),
                this.previewElem_ = h,
                this.update_()
            }
            update_() {
                const t = this.value.rawValue
                  , e = t.getComponents("rgb")
                  , s = new y([e[0], e[1], e[2], 0],"rgb")
                  , l = new y([e[0], e[1], e[2], 255],"rgb")
                  , d = ["to right", Un(s), Un(l)];
                this.colorElem_.style.background = `linear-gradient(${d.join(",")})`,
                this.previewElem_.style.backgroundColor = Un(t);
                const h = A(e[3], 0, 1, 0, 100);
                this.markerElem_.style.left = `${h}%`
            }
            onValueChange_() {
                this.update_()
            }
        }
        class Gs {
            constructor(t, e) {
                this.onKeyDown_ = this.onKeyDown_.bind(this),
                this.onKeyUp_ = this.onKeyUp_.bind(this),
                this.onPointerDown_ = this.onPointerDown_.bind(this),
                this.onPointerMove_ = this.onPointerMove_.bind(this),
                this.onPointerUp_ = this.onPointerUp_.bind(this),
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.view = new qs(t,{
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.ptHandler_ = new dt(this.view.element),
                this.ptHandler_.emitter.on("down", this.onPointerDown_),
                this.ptHandler_.emitter.on("move", this.onPointerMove_),
                this.ptHandler_.emitter.on("up", this.onPointerUp_),
                this.view.element.addEventListener("keydown", this.onKeyDown_),
                this.view.element.addEventListener("keyup", this.onKeyUp_)
            }
            handlePointerEvent_(t, e) {
                if (!t.point)
                    return;
                const s = t.point.x / t.bounds.width
                  , l = this.value.rawValue
                  , [d,h,v] = l.getComponents("hsv");
                this.value.setRawValue(new y([d, h, v, s],"hsv"), e)
            }
            onPointerDown_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onPointerMove_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onPointerUp_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !0,
                    last: !0
                })
            }
            onKeyDown_(t) {
                const e = j(ne(!0), pt(t));
                if (e === 0)
                    return;
                const s = this.value.rawValue
                  , [l,d,h,v] = s.getComponents("hsv");
                this.value.setRawValue(new y([l, d, h, v + e],"hsv"), {
                    forceEmit: !1,
                    last: !1
                })
            }
            onKeyUp_(t) {
                j(ne(!0), pt(t)) !== 0 && this.value.setRawValue(this.value.rawValue, {
                    forceEmit: !0,
                    last: !0
                })
            }
        }
        const ge = C("coltxt");
        function Ys(n) {
            const t = n.createElement("select")
              , e = [{
                text: "RGB",
                value: "rgb"
            }, {
                text: "HSL",
                value: "hsl"
            }, {
                text: "HSV",
                value: "hsv"
            }];
            return t.appendChild(e.reduce((s,l)=>{
                const d = n.createElement("option");
                return d.textContent = l.text,
                d.value = l.value,
                s.appendChild(d),
                s
            }
            , n.createDocumentFragment())),
            t
        }
        class Xs {
            constructor(t, e) {
                this.element = t.createElement("div"),
                this.element.classList.add(ge());
                const s = t.createElement("div");
                s.classList.add(ge("m")),
                this.modeElem_ = Ys(t),
                this.modeElem_.classList.add(ge("ms")),
                s.appendChild(this.modeSelectElement);
                const l = t.createElement("div");
                l.classList.add(ge("mm")),
                l.appendChild(le(t, "dropdown")),
                s.appendChild(l),
                this.element.appendChild(s);
                const d = t.createElement("div");
                d.classList.add(ge("w")),
                this.element.appendChild(d),
                this.textsElem_ = d,
                this.textViews_ = e.textViews,
                this.applyTextViews_(),
                Lt(e.colorMode, h=>{
                    this.modeElem_.value = h
                }
                )
            }
            get modeSelectElement() {
                return this.modeElem_
            }
            get textViews() {
                return this.textViews_
            }
            set textViews(t) {
                this.textViews_ = t,
                this.applyTextViews_()
            }
            applyTextViews_() {
                _n(this.textsElem_);
                const t = this.element.ownerDocument;
                this.textViews_.forEach(e=>{
                    const s = t.createElement("div");
                    s.classList.add(ge("c")),
                    s.appendChild(e.element),
                    this.textsElem_.appendChild(s)
                }
                )
            }
        }
        const Ws = G(0)
          , Js = {
            rgb: ()=>new Y({
                min: 0,
                max: 255
            }),
            hsl: n=>n === 0 ? new Y({
                min: 0,
                max: 360
            }) : new Y({
                min: 0,
                max: 100
            }),
            hsv: n=>n === 0 ? new Y({
                min: 0,
                max: 360
            }) : new Y({
                min: 0,
                max: 100
            })
        };
        function Ji(n, t, e) {
            return new te(n,{
                arrayPosition: e === 0 ? "fst" : e === 3 - 1 ? "lst" : "mid",
                baseStep: ne(!1),
                parser: t.parser,
                props: f.fromObject({
                    draggingScale: 1,
                    formatter: Ws
                }),
                value: K(0, {
                    constraint: Js[t.colorMode](e)
                }),
                viewProps: t.viewProps
            })
        }
        class Qs {
            constructor(t, e) {
                this.onModeSelectChange_ = this.onModeSelectChange_.bind(this),
                this.parser_ = e.parser,
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.colorMode = K(this.value.rawValue.mode),
                this.ccs_ = this.createComponentControllers_(t),
                this.view = new Xs(t,{
                    colorMode: this.colorMode,
                    textViews: [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view]
                }),
                this.view.modeSelectElement.addEventListener("change", this.onModeSelectChange_)
            }
            createComponentControllers_(t) {
                const e = {
                    colorMode: this.colorMode.rawValue,
                    parser: this.parser_,
                    viewProps: this.viewProps
                }
                  , s = [Ji(t, e, 0), Ji(t, e, 1), Ji(t, e, 2)];
                return s.forEach((l,d)=>{
                    Qt({
                        primary: this.value,
                        secondary: l.value,
                        forward: h=>h.rawValue.getComponents(this.colorMode.rawValue)[d],
                        backward: (h,v)=>{
                            const b = this.colorMode.rawValue
                              , g = h.rawValue.getComponents(b);
                            return g[d] = v.rawValue,
                            new y(us(fe(g), g[3]),b)
                        }
                    })
                }
                ),
                s
            }
            onModeSelectChange_(t) {
                const e = t.currentTarget;
                this.colorMode.rawValue = e.value,
                this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument),
                this.view.textViews = [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view]
            }
        }
        const Qi = C("hpl");
        class Zs {
            constructor(t, e) {
                this.onValueChange_ = this.onValueChange_.bind(this),
                this.value = e.value,
                this.value.emitter.on("change", this.onValueChange_),
                this.element = t.createElement("div"),
                this.element.classList.add(Qi()),
                e.viewProps.bindTabIndex(this.element);
                const s = t.createElement("div");
                s.classList.add(Qi("c")),
                this.element.appendChild(s);
                const l = t.createElement("div");
                l.classList.add(Qi("m")),
                this.element.appendChild(l),
                this.markerElem_ = l,
                this.update_()
            }
            update_() {
                const t = this.value.rawValue
                  , [e] = t.getComponents("hsv");
                this.markerElem_.style.backgroundColor = vs(new y([e, 100, 100],"hsv"));
                const s = A(e, 0, 360, 0, 100);
                this.markerElem_.style.left = `${s}%`
            }
            onValueChange_() {
                this.update_()
            }
        }
        class tr {
            constructor(t, e) {
                this.onKeyDown_ = this.onKeyDown_.bind(this),
                this.onKeyUp_ = this.onKeyUp_.bind(this),
                this.onPointerDown_ = this.onPointerDown_.bind(this),
                this.onPointerMove_ = this.onPointerMove_.bind(this),
                this.onPointerUp_ = this.onPointerUp_.bind(this),
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.view = new Zs(t,{
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.ptHandler_ = new dt(this.view.element),
                this.ptHandler_.emitter.on("down", this.onPointerDown_),
                this.ptHandler_.emitter.on("move", this.onPointerMove_),
                this.ptHandler_.emitter.on("up", this.onPointerUp_),
                this.view.element.addEventListener("keydown", this.onKeyDown_),
                this.view.element.addEventListener("keyup", this.onKeyUp_)
            }
            handlePointerEvent_(t, e) {
                if (!t.point)
                    return;
                const s = A(t.point.x, 0, t.bounds.width, 0, 360)
                  , l = this.value.rawValue
                  , [,d,h,v] = l.getComponents("hsv");
                this.value.setRawValue(new y([s, d, h, v],"hsv"), e)
            }
            onPointerDown_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onPointerMove_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onPointerUp_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !0,
                    last: !0
                })
            }
            onKeyDown_(t) {
                const e = j(ne(!1), pt(t));
                if (e === 0)
                    return;
                const s = this.value.rawValue
                  , [l,d,h,v] = s.getComponents("hsv");
                this.value.setRawValue(new y([l + e, d, h, v],"hsv"), {
                    forceEmit: !1,
                    last: !1
                })
            }
            onKeyUp_(t) {
                j(ne(!1), pt(t)) !== 0 && this.value.setRawValue(this.value.rawValue, {
                    forceEmit: !0,
                    last: !0
                })
            }
        }
        const Zi = C("svp")
          , bs = 64;
        class er {
            constructor(t, e) {
                this.onValueChange_ = this.onValueChange_.bind(this),
                this.value = e.value,
                this.value.emitter.on("change", this.onValueChange_),
                this.element = t.createElement("div"),
                this.element.classList.add(Zi()),
                e.viewProps.bindTabIndex(this.element);
                const s = t.createElement("canvas");
                s.height = bs,
                s.width = bs,
                s.classList.add(Zi("c")),
                this.element.appendChild(s),
                this.canvasElement = s;
                const l = t.createElement("div");
                l.classList.add(Zi("m")),
                this.element.appendChild(l),
                this.markerElem_ = l,
                this.update_()
            }
            update_() {
                const t = ei(this.canvasElement);
                if (!t)
                    return;
                const s = this.value.rawValue.getComponents("hsv")
                  , l = this.canvasElement.width
                  , d = this.canvasElement.height
                  , h = t.getImageData(0, 0, l, d)
                  , v = h.data;
                for (let P = 0; P < d; P++)
                    for (let V = 0; V < l; V++) {
                        const ie = A(V, 0, l, 0, 100)
                          , dn = A(P, 0, d, 100, 0)
                          , un = ds(s[0], ie, dn)
                          , ye = (P * l + V) * 4;
                        v[ye] = un[0],
                        v[ye + 1] = un[1],
                        v[ye + 2] = un[2],
                        v[ye + 3] = 255
                    }
                t.putImageData(h, 0, 0);
                const b = A(s[1], 0, 100, 0, 100);
                this.markerElem_.style.left = `${b}%`;
                const g = A(s[2], 0, 100, 100, 0);
                this.markerElem_.style.top = `${g}%`
            }
            onValueChange_() {
                this.update_()
            }
        }
        class nr {
            constructor(t, e) {
                this.onKeyDown_ = this.onKeyDown_.bind(this),
                this.onKeyUp_ = this.onKeyUp_.bind(this),
                this.onPointerDown_ = this.onPointerDown_.bind(this),
                this.onPointerMove_ = this.onPointerMove_.bind(this),
                this.onPointerUp_ = this.onPointerUp_.bind(this),
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.view = new er(t,{
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.ptHandler_ = new dt(this.view.element),
                this.ptHandler_.emitter.on("down", this.onPointerDown_),
                this.ptHandler_.emitter.on("move", this.onPointerMove_),
                this.ptHandler_.emitter.on("up", this.onPointerUp_),
                this.view.element.addEventListener("keydown", this.onKeyDown_),
                this.view.element.addEventListener("keyup", this.onKeyUp_)
            }
            handlePointerEvent_(t, e) {
                if (!t.point)
                    return;
                const s = A(t.point.x, 0, t.bounds.width, 0, 100)
                  , l = A(t.point.y, 0, t.bounds.height, 100, 0)
                  , [d,,,h] = this.value.rawValue.getComponents("hsv");
                this.value.setRawValue(new y([d, s, l, h],"hsv"), e)
            }
            onPointerDown_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onPointerMove_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onPointerUp_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !0,
                    last: !0
                })
            }
            onKeyDown_(t) {
                en(t.key) && t.preventDefault();
                const [e,s,l,d] = this.value.rawValue.getComponents("hsv")
                  , h = ne(!1)
                  , v = j(h, pt(t))
                  , b = j(h, Zt(t));
                v === 0 && b === 0 || this.value.setRawValue(new y([e, s + v, l + b, d],"hsv"), {
                    forceEmit: !1,
                    last: !1
                })
            }
            onKeyUp_(t) {
                const e = ne(!1)
                  , s = j(e, pt(t))
                  , l = j(e, Zt(t));
                s === 0 && l === 0 || this.value.setRawValue(this.value.rawValue, {
                    forceEmit: !0,
                    last: !0
                })
            }
        }
        class ir {
            constructor(t, e) {
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.hPaletteC_ = new tr(t,{
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.svPaletteC_ = new nr(t,{
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.alphaIcs_ = e.supportsAlpha ? {
                    palette: new Gs(t,{
                        value: this.value,
                        viewProps: this.viewProps
                    }),
                    text: new te(t,{
                        parser: lt,
                        baseStep: .1,
                        props: f.fromObject({
                            draggingScale: .01,
                            formatter: G(2)
                        }),
                        value: K(0, {
                            constraint: new Y({
                                min: 0,
                                max: 1
                            })
                        }),
                        viewProps: this.viewProps
                    })
                } : null,
                this.alphaIcs_ && Qt({
                    primary: this.value,
                    secondary: this.alphaIcs_.text.value,
                    forward: s=>s.rawValue.getComponents()[3],
                    backward: (s,l)=>{
                        const d = s.rawValue.getComponents();
                        return d[3] = l.rawValue,
                        new y(d,s.rawValue.mode)
                    }
                }),
                this.textC_ = new Qs(t,{
                    parser: lt,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.view = new Is(t,{
                    alphaViews: this.alphaIcs_ ? {
                        palette: this.alphaIcs_.palette.view,
                        text: this.alphaIcs_.text.view
                    } : null,
                    hPaletteView: this.hPaletteC_.view,
                    supportsAlpha: e.supportsAlpha,
                    svPaletteView: this.svPaletteC_.view,
                    textView: this.textC_.view
                })
            }
            get textController() {
                return this.textC_
            }
        }
        const ts = C("colsw");
        class sr {
            constructor(t, e) {
                this.onValueChange_ = this.onValueChange_.bind(this),
                e.value.emitter.on("change", this.onValueChange_),
                this.value = e.value,
                this.element = t.createElement("div"),
                this.element.classList.add(ts()),
                e.viewProps.bindClassModifiers(this.element);
                const s = t.createElement("div");
                s.classList.add(ts("sw")),
                this.element.appendChild(s),
                this.swatchElem_ = s;
                const l = t.createElement("button");
                l.classList.add(ts("b")),
                e.viewProps.bindDisabled(l),
                this.element.appendChild(l),
                this.buttonElement = l,
                this.update_()
            }
            update_() {
                const t = this.value.rawValue;
                this.swatchElem_.style.backgroundColor = jn(t)
            }
            onValueChange_() {
                this.update_()
            }
        }
        class rr {
            constructor(t, e) {
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.view = new sr(t,{
                    value: this.value,
                    viewProps: this.viewProps
                })
            }
        }
        class es {
            constructor(t, e) {
                this.onButtonBlur_ = this.onButtonBlur_.bind(this),
                this.onButtonClick_ = this.onButtonClick_.bind(this),
                this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this),
                this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this),
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.foldable_ = Ht.create(e.expanded),
                this.swatchC_ = new rr(t,{
                    value: this.value,
                    viewProps: this.viewProps
                });
                const s = this.swatchC_.view.buttonElement;
                s.addEventListener("blur", this.onButtonBlur_),
                s.addEventListener("click", this.onButtonClick_),
                this.textC_ = new ce(t,{
                    parser: e.parser,
                    props: f.fromObject({
                        formatter: e.formatter
                    }),
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.view = new an(t,{
                    foldable: this.foldable_,
                    pickerLayout: e.pickerLayout
                }),
                this.view.swatchElement.appendChild(this.swatchC_.view.element),
                this.view.textElement.appendChild(this.textC_.view.element),
                this.popC_ = e.pickerLayout === "popup" ? new kn(t,{
                    viewProps: this.viewProps
                }) : null;
                const l = new ir(t,{
                    supportsAlpha: e.supportsAlpha,
                    value: this.value,
                    viewProps: this.viewProps
                });
                l.view.allFocusableElements.forEach(d=>{
                    d.addEventListener("blur", this.onPopupChildBlur_),
                    d.addEventListener("keydown", this.onPopupChildKeydown_)
                }
                ),
                this.pickerC_ = l,
                this.popC_ ? (this.view.element.appendChild(this.popC_.view.element),
                this.popC_.view.element.appendChild(l.view.element),
                Qt({
                    primary: this.foldable_.value("expanded"),
                    secondary: this.popC_.shows,
                    forward: d=>d.rawValue,
                    backward: (d,h)=>h.rawValue
                })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element),
                Te(this.foldable_, this.view.pickerElement))
            }
            get textController() {
                return this.textC_
            }
            onButtonBlur_(t) {
                if (!this.popC_)
                    return;
                const e = this.view.element
                  , s = t.relatedTarget;
                (!s || !e.contains(s)) && (this.popC_.shows.rawValue = !1)
            }
            onButtonClick_() {
                this.foldable_.set("expanded", !this.foldable_.get("expanded")),
                this.foldable_.get("expanded") && this.pickerC_.view.allFocusableElements[0].focus()
            }
            onPopupChildBlur_(t) {
                if (!this.popC_)
                    return;
                const e = this.popC_.view.element
                  , s = gt(t);
                s && e.contains(s) || s && s === this.swatchC_.view.buttonElement && !At(e.ownerDocument) || (this.popC_.shows.rawValue = !1)
            }
            onPopupChildKeydown_(t) {
                this.popC_ ? t.key === "Escape" && (this.popC_.shows.rawValue = !1) : this.view.pickerElement && t.key === "Escape" && this.swatchC_.view.buttonElement.focus()
            }
        }
        function or(n) {
            return y.isColorObject(n) ? y.fromObject(n) : y.black()
        }
        function ar(n) {
            return fe(n.getComponents("rgb")).reduce((t,e)=>t << 8 | Math.floor(e) & 255, 0)
        }
        function lr(n) {
            return n.getComponents("rgb").reduce((t,e,s)=>{
                const l = Math.floor(s === 3 ? e * 255 : e) & 255;
                return t << 8 | l
            }
            , 0) >>> 0
        }
        function pr(n) {
            return new y([n >> 16 & 255, n >> 8 & 255, n & 255],"rgb")
        }
        function dr(n) {
            return new y([n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, A(n & 255, 0, 255, 0, 1)],"rgb")
        }
        function ur(n) {
            return typeof n != "number" ? y.black() : pr(n)
        }
        function hr(n) {
            return typeof n != "number" ? y.black() : dr(n)
        }
        function cr(n) {
            const t = ms(n);
            return (e,s)=>{
                ee(e, t(s))
            }
        }
        function vr(n) {
            const t = n ? lr : ar;
            return (e,s)=>{
                ee(e, t(s))
            }
        }
        function mr(n, t) {
            const e = t.toRgbaObject();
            n.writeProperty("r", e.r),
            n.writeProperty("g", e.g),
            n.writeProperty("b", e.b),
            n.writeProperty("a", e.a)
        }
        function br(n, t) {
            const e = t.toRgbaObject();
            n.writeProperty("r", e.r),
            n.writeProperty("g", e.g),
            n.writeProperty("b", e.b)
        }
        function _r(n) {
            return n ? mr : br
        }
        function ns(n) {
            return "alpha"in n && n.alpha === !0
        }
        function fr(n) {
            return n ? t=>jn(t, "0x") : t=>Wi(t, "0x")
        }
        const gr = {
            id: "input-color-number",
            type: "input",
            accept: (n,t)=>{
                if (typeof n != "number" || !("view"in t) || t.view !== "color")
                    return null;
                const e = Yi(t);
                return e ? {
                    initialValue: n,
                    params: e
                } : null
            }
            ,
            binding: {
                reader: n=>ns(n.params) ? hr : ur,
                equals: y.equals,
                writer: n=>vr(ns(n.params))
            },
            controller: n=>{
                const t = ns(n.params)
                  , e = "expanded"in n.params ? n.params.expanded : void 0
                  , s = "picker"in n.params ? n.params.picker : void 0;
                return new es(n.document,{
                    expanded: e != null ? e : !1,
                    formatter: fr(t),
                    parser: Kn,
                    pickerLayout: s != null ? s : "popup",
                    supportsAlpha: t,
                    value: n.value,
                    viewProps: n.viewProps
                })
            }
        };
        function wr(n) {
            return y.isRgbaColorObject(n)
        }
        const xr = {
            id: "input-color-object",
            type: "input",
            accept: (n,t)=>{
                if (!y.isColorObject(n))
                    return null;
                const e = Yi(t);
                return e ? {
                    initialValue: n,
                    params: e
                } : null
            }
            ,
            binding: {
                reader: n=>or,
                equals: y.equals,
                writer: n=>_r(wr(n.initialValue))
            },
            controller: n=>{
                const t = y.isRgbaColorObject(n.initialValue)
                  , e = "expanded"in n.params ? n.params.expanded : void 0
                  , s = "picker"in n.params ? n.params.picker : void 0
                  , l = t ? jn : Wi;
                return new es(n.document,{
                    expanded: e != null ? e : !1,
                    formatter: l,
                    parser: Kn,
                    pickerLayout: s != null ? s : "popup",
                    supportsAlpha: t,
                    value: n.value,
                    viewProps: n.viewProps
                })
            }
        }
          , Cr = {
            id: "input-color-string",
            type: "input",
            accept: (n,t)=>{
                if (typeof n != "string" || "view"in t && t.view === "text" || !In(n))
                    return null;
                const s = Yi(t);
                return s ? {
                    initialValue: n,
                    params: s
                } : null
            }
            ,
            binding: {
                reader: n=>Us,
                equals: y.equals,
                writer: n=>{
                    const t = In(n.initialValue);
                    if (!t)
                        throw E.shouldNeverHappen();
                    return cr(t)
                }
            },
            controller: n=>{
                const t = In(n.initialValue);
                if (!t)
                    throw E.shouldNeverHappen();
                const e = ms(t)
                  , s = "expanded"in n.params ? n.params.expanded : void 0
                  , l = "picker"in n.params ? n.params.picker : void 0;
                return new es(n.document,{
                    expanded: s != null ? s : !1,
                    formatter: e,
                    parser: Kn,
                    pickerLayout: l != null ? l : "popup",
                    supportsAlpha: js(t),
                    value: n.value,
                    viewProps: n.viewProps
                })
            }
        };
        class Bt {
            constructor(t) {
                this.components = t.components,
                this.asm_ = t.assembly
            }
            constrain(t) {
                const e = this.asm_.toComponents(t).map((s,l)=>{
                    var d, h;
                    return (h = (d = this.components[l]) === null || d === void 0 ? void 0 : d.constrain(s)) !== null && h !== void 0 ? h : s
                }
                );
                return this.asm_.fromComponents(e)
            }
        }
        const _s = C("pndtxt");
        class yr {
            constructor(t, e) {
                this.textViews = e.textViews,
                this.element = t.createElement("div"),
                this.element.classList.add(_s()),
                this.textViews.forEach(s=>{
                    const l = t.createElement("div");
                    l.classList.add(_s("a")),
                    l.appendChild(s.element),
                    this.element.appendChild(l)
                }
                )
            }
        }
        function Er(n, t, e) {
            return new te(n,{
                arrayPosition: e === 0 ? "fst" : e === t.axes.length - 1 ? "lst" : "mid",
                baseStep: t.axes[e].baseStep,
                parser: t.parser,
                props: t.axes[e].textProps,
                value: K(0, {
                    constraint: t.axes[e].constraint
                }),
                viewProps: t.viewProps
            })
        }
        class is {
            constructor(t, e) {
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.acs_ = e.axes.map((s,l)=>Er(t, e, l)),
                this.acs_.forEach((s,l)=>{
                    Qt({
                        primary: this.value,
                        secondary: s.value,
                        forward: d=>e.assembly.toComponents(d.rawValue)[l],
                        backward: (d,h)=>{
                            const v = e.assembly.toComponents(d.rawValue);
                            return v[l] = h.rawValue,
                            e.assembly.fromComponents(v)
                        }
                    })
                }
                ),
                this.view = new yr(t,{
                    textViews: this.acs_.map(s=>s.view)
                })
            }
        }
        function Pr(n) {
            return "step"in n && !w(n.step) ? new Pt(n.step) : null
        }
        function kr(n) {
            return "max"in n && !w(n.max) || "min"in n && !w(n.min) ? new Y({
                max: n.max,
                min: n.min
            }) : null
        }
        function Vr(n) {
            const t = []
              , e = Pr(n);
            e && t.push(e);
            const s = kr(n);
            s && t.push(s);
            const l = on(n.options);
            return l && t.push(l),
            new ut(t)
        }
        function Lr(n) {
            const t = n ? q(n, Y) : null;
            return t ? [t.minValue, t.maxValue] : [void 0, void 0]
        }
        function Mr(n) {
            const [t,e] = Lr(n);
            return [t != null ? t : 0, e != null ? e : 100]
        }
        const Sr = {
            id: "input-number",
            type: "input",
            accept: (n,t)=>{
                if (typeof n != "number")
                    return null;
                const e = M
                  , s = k(t, {
                    format: e.optional.function,
                    max: e.optional.number,
                    min: e.optional.number,
                    options: e.optional.custom(be),
                    step: e.optional.number
                });
                return s ? {
                    initialValue: n,
                    params: s
                } : null
            }
            ,
            binding: {
                reader: n=>ve,
                constraint: n=>Vr(n.params),
                writer: n=>ee
            },
            controller: n=>{
                var t, e;
                const s = n.value
                  , l = n.constraint;
                if (l && q(l, I))
                    return new Yt(n.document,{
                        props: f.fromObject({
                            options: (t = o(l)) !== null && t !== void 0 ? t : []
                        }),
                        value: s,
                        viewProps: n.viewProps
                    });
                const d = (e = "format"in n.params ? n.params.format : void 0) !== null && e !== void 0 ? e : G(r(l, s.rawValue));
                if (l && q(l, Y)) {
                    const [h,v] = Mr(l);
                    return new Vt(n.document,{
                        baseStep: a(l),
                        parser: lt,
                        sliderProps: f.fromObject({
                            maxValue: v,
                            minValue: h
                        }),
                        textProps: f.fromObject({
                            draggingScale: p(l, s.rawValue),
                            formatter: d
                        }),
                        value: s,
                        viewProps: n.viewProps
                    })
                }
                return new te(n.document,{
                    baseStep: a(l),
                    parser: lt,
                    props: f.fromObject({
                        draggingScale: p(l, s.rawValue),
                        formatter: d
                    }),
                    value: s,
                    viewProps: n.viewProps
                })
            }
        };
        class Ot {
            constructor(t=0, e=0) {
                this.x = t,
                this.y = e
            }
            getComponents() {
                return [this.x, this.y]
            }
            static isObject(t) {
                if (w(t))
                    return !1;
                const e = t.x
                  , s = t.y;
                return !(typeof e != "number" || typeof s != "number")
            }
            static equals(t, e) {
                return t.x === e.x && t.y === e.y
            }
            toObject() {
                return {
                    x: this.x,
                    y: this.y
                }
            }
        }
        const fs = {
            toComponents: n=>n.getComponents(),
            fromComponents: n=>new Ot(...n)
        }
          , we = C("p2d");
        class Ar {
            constructor(t, e) {
                this.element = t.createElement("div"),
                this.element.classList.add(we()),
                e.viewProps.bindClassModifiers(this.element),
                Lt(e.expanded, Mt(this.element, we(void 0, "expanded")));
                const s = t.createElement("div");
                s.classList.add(we("h")),
                this.element.appendChild(s);
                const l = t.createElement("button");
                l.classList.add(we("b")),
                l.appendChild(le(t, "p2dpad")),
                e.viewProps.bindDisabled(l),
                s.appendChild(l),
                this.buttonElement = l;
                const d = t.createElement("div");
                if (d.classList.add(we("t")),
                s.appendChild(d),
                this.textElement = d,
                e.pickerLayout === "inline") {
                    const h = t.createElement("div");
                    h.classList.add(we("p")),
                    this.element.appendChild(h),
                    this.pickerElement = h
                } else
                    this.pickerElement = null
            }
        }
        const It = C("p2dp");
        class Tr {
            constructor(t, e) {
                this.onFoldableChange_ = this.onFoldableChange_.bind(this),
                this.onValueChange_ = this.onValueChange_.bind(this),
                this.invertsY_ = e.invertsY,
                this.maxValue_ = e.maxValue,
                this.element = t.createElement("div"),
                this.element.classList.add(It()),
                e.layout === "popup" && this.element.classList.add(It(void 0, "p"));
                const s = t.createElement("div");
                s.classList.add(It("p")),
                e.viewProps.bindTabIndex(s),
                this.element.appendChild(s),
                this.padElement = s;
                const l = t.createElementNS(F, "svg");
                l.classList.add(It("g")),
                this.padElement.appendChild(l),
                this.svgElem_ = l;
                const d = t.createElementNS(F, "line");
                d.classList.add(It("ax")),
                d.setAttributeNS(null, "x1", "0"),
                d.setAttributeNS(null, "y1", "50%"),
                d.setAttributeNS(null, "x2", "100%"),
                d.setAttributeNS(null, "y2", "50%"),
                this.svgElem_.appendChild(d);
                const h = t.createElementNS(F, "line");
                h.classList.add(It("ax")),
                h.setAttributeNS(null, "x1", "50%"),
                h.setAttributeNS(null, "y1", "0"),
                h.setAttributeNS(null, "x2", "50%"),
                h.setAttributeNS(null, "y2", "100%"),
                this.svgElem_.appendChild(h);
                const v = t.createElementNS(F, "line");
                v.classList.add(It("l")),
                v.setAttributeNS(null, "x1", "50%"),
                v.setAttributeNS(null, "y1", "50%"),
                this.svgElem_.appendChild(v),
                this.lineElem_ = v;
                const b = t.createElement("div");
                b.classList.add(It("m")),
                this.padElement.appendChild(b),
                this.markerElem_ = b,
                e.value.emitter.on("change", this.onValueChange_),
                this.value = e.value,
                this.update_()
            }
            get allFocusableElements() {
                return [this.padElement]
            }
            update_() {
                const [t,e] = this.value.rawValue.getComponents()
                  , s = this.maxValue_
                  , l = A(t, -s, +s, 0, 100)
                  , d = A(e, -s, +s, 0, 100)
                  , h = this.invertsY_ ? 100 - d : d;
                this.lineElem_.setAttributeNS(null, "x2", `${l}%`),
                this.lineElem_.setAttributeNS(null, "y2", `${h}%`),
                this.markerElem_.style.left = `${l}%`,
                this.markerElem_.style.top = `${h}%`
            }
            onValueChange_() {
                this.update_()
            }
            onFoldableChange_() {
                this.update_()
            }
        }
        function gs(n, t, e) {
            return [j(t[0], pt(n)), j(t[1], Zt(n)) * (e ? 1 : -1)]
        }
        class Dr {
            constructor(t, e) {
                this.onPadKeyDown_ = this.onPadKeyDown_.bind(this),
                this.onPadKeyUp_ = this.onPadKeyUp_.bind(this),
                this.onPointerDown_ = this.onPointerDown_.bind(this),
                this.onPointerMove_ = this.onPointerMove_.bind(this),
                this.onPointerUp_ = this.onPointerUp_.bind(this),
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.baseSteps_ = e.baseSteps,
                this.maxValue_ = e.maxValue,
                this.invertsY_ = e.invertsY,
                this.view = new Tr(t,{
                    invertsY: this.invertsY_,
                    layout: e.layout,
                    maxValue: this.maxValue_,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.ptHandler_ = new dt(this.view.padElement),
                this.ptHandler_.emitter.on("down", this.onPointerDown_),
                this.ptHandler_.emitter.on("move", this.onPointerMove_),
                this.ptHandler_.emitter.on("up", this.onPointerUp_),
                this.view.padElement.addEventListener("keydown", this.onPadKeyDown_),
                this.view.padElement.addEventListener("keyup", this.onPadKeyUp_)
            }
            handlePointerEvent_(t, e) {
                if (!t.point)
                    return;
                const s = this.maxValue_
                  , l = A(t.point.x, 0, t.bounds.width, -s, +s)
                  , d = A(this.invertsY_ ? t.bounds.height - t.point.y : t.point.y, 0, t.bounds.height, -s, +s);
                this.value.setRawValue(new Ot(l,d), e)
            }
            onPointerDown_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onPointerMove_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onPointerUp_(t) {
                this.handlePointerEvent_(t.data, {
                    forceEmit: !0,
                    last: !0
                })
            }
            onPadKeyDown_(t) {
                en(t.key) && t.preventDefault();
                const [e,s] = gs(t, this.baseSteps_, this.invertsY_);
                e === 0 && s === 0 || this.value.setRawValue(new Ot(this.value.rawValue.x + e,this.value.rawValue.y + s), {
                    forceEmit: !1,
                    last: !1
                })
            }
            onPadKeyUp_(t) {
                const [e,s] = gs(t, this.baseSteps_, this.invertsY_);
                e === 0 && s === 0 || this.value.setRawValue(this.value.rawValue, {
                    forceEmit: !0,
                    last: !0
                })
            }
        }
        class Nr {
            constructor(t, e) {
                var s, l;
                this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this),
                this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this),
                this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this),
                this.onPadButtonClick_ = this.onPadButtonClick_.bind(this),
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.foldable_ = Ht.create(e.expanded),
                this.popC_ = e.pickerLayout === "popup" ? new kn(t,{
                    viewProps: this.viewProps
                }) : null;
                const d = new Dr(t,{
                    baseSteps: [e.axes[0].baseStep, e.axes[1].baseStep],
                    invertsY: e.invertsY,
                    layout: e.pickerLayout,
                    maxValue: e.maxValue,
                    value: this.value,
                    viewProps: this.viewProps
                });
                d.view.allFocusableElements.forEach(h=>{
                    h.addEventListener("blur", this.onPopupChildBlur_),
                    h.addEventListener("keydown", this.onPopupChildKeydown_)
                }
                ),
                this.pickerC_ = d,
                this.textC_ = new is(t,{
                    assembly: fs,
                    axes: e.axes,
                    parser: e.parser,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.view = new Ar(t,{
                    expanded: this.foldable_.value("expanded"),
                    pickerLayout: e.pickerLayout,
                    viewProps: this.viewProps
                }),
                this.view.textElement.appendChild(this.textC_.view.element),
                (s = this.view.buttonElement) === null || s === void 0 || s.addEventListener("blur", this.onPadButtonBlur_),
                (l = this.view.buttonElement) === null || l === void 0 || l.addEventListener("click", this.onPadButtonClick_),
                this.popC_ ? (this.view.element.appendChild(this.popC_.view.element),
                this.popC_.view.element.appendChild(this.pickerC_.view.element),
                Qt({
                    primary: this.foldable_.value("expanded"),
                    secondary: this.popC_.shows,
                    forward: h=>h.rawValue,
                    backward: (h,v)=>v.rawValue
                })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element),
                Te(this.foldable_, this.view.pickerElement))
            }
            onPadButtonBlur_(t) {
                if (!this.popC_)
                    return;
                const e = this.view.element
                  , s = t.relatedTarget;
                (!s || !e.contains(s)) && (this.popC_.shows.rawValue = !1)
            }
            onPadButtonClick_() {
                this.foldable_.set("expanded", !this.foldable_.get("expanded")),
                this.foldable_.get("expanded") && this.pickerC_.view.allFocusableElements[0].focus()
            }
            onPopupChildBlur_(t) {
                if (!this.popC_)
                    return;
                const e = this.popC_.view.element
                  , s = gt(t);
                s && e.contains(s) || s && s === this.view.buttonElement && !At(e.ownerDocument) || (this.popC_.shows.rawValue = !1)
            }
            onPopupChildKeydown_(t) {
                this.popC_ ? t.key === "Escape" && (this.popC_.shows.rawValue = !1) : this.view.pickerElement && t.key === "Escape" && this.view.buttonElement.focus()
            }
        }
        function zr(n) {
            return Ot.isObject(n) ? new Ot(n.x,n.y) : new Ot
        }
        function Rr(n, t) {
            n.writeProperty("x", t.x),
            n.writeProperty("y", t.y)
        }
        function ws(n) {
            if (!n)
                return;
            const t = [];
            return w(n.step) || t.push(new Pt(n.step)),
            (!w(n.max) || !w(n.min)) && t.push(new Y({
                max: n.max,
                min: n.min
            })),
            new ut(t)
        }
        function Br(n) {
            return new Bt({
                assembly: fs,
                components: [ws("x"in n ? n.x : void 0), ws("y"in n ? n.y : void 0)]
            })
        }
        function xs(n, t) {
            const e = n && q(n, Y);
            if (e)
                return Math.max(Math.abs(e.minValue || 0), Math.abs(e.maxValue || 0));
            const s = a(n);
            return Math.max(Math.abs(s) * 10, Math.abs(t) * 10)
        }
        function Or(n, t) {
            const e = t instanceof Bt ? t.components[0] : void 0
              , s = t instanceof Bt ? t.components[1] : void 0
              , l = xs(e, n.x)
              , d = xs(s, n.y);
            return Math.max(l, d)
        }
        function Cs(n, t) {
            return {
                baseStep: a(t),
                constraint: t,
                textProps: f.fromObject({
                    draggingScale: p(t, n),
                    formatter: G(r(t, n))
                })
            }
        }
        function Ir(n) {
            if (!("y"in n))
                return !1;
            const t = n.y;
            return t && "inverted"in t ? !!t.inverted : !1
        }
        const Kr = {
            id: "input-point2d",
            type: "input",
            accept: (n,t)=>{
                if (!Ot.isObject(n))
                    return null;
                const e = M
                  , s = k(t, {
                    expanded: e.optional.boolean,
                    picker: e.optional.custom(_e),
                    x: e.optional.custom(bt),
                    y: e.optional.object({
                        inverted: e.optional.boolean,
                        max: e.optional.number,
                        min: e.optional.number,
                        step: e.optional.number
                    })
                });
                return s ? {
                    initialValue: n,
                    params: s
                } : null
            }
            ,
            binding: {
                reader: n=>zr,
                constraint: n=>Br(n.params),
                equals: Ot.equals,
                writer: n=>Rr
            },
            controller: n=>{
                const t = n.document
                  , e = n.value
                  , s = n.constraint;
                if (!(s instanceof Bt))
                    throw E.shouldNeverHappen();
                const l = "expanded"in n.params ? n.params.expanded : void 0
                  , d = "picker"in n.params ? n.params.picker : void 0;
                return new Nr(t,{
                    axes: [Cs(e.rawValue.x, s.components[0]), Cs(e.rawValue.y, s.components[1])],
                    expanded: l != null ? l : !1,
                    invertsY: Ir(n.params),
                    maxValue: Or(e.rawValue, s),
                    parser: lt,
                    pickerLayout: d != null ? d : "popup",
                    value: e,
                    viewProps: n.viewProps
                })
            }
        };
        class xe {
            constructor(t=0, e=0, s=0) {
                this.x = t,
                this.y = e,
                this.z = s
            }
            getComponents() {
                return [this.x, this.y, this.z]
            }
            static isObject(t) {
                if (w(t))
                    return !1;
                const e = t.x
                  , s = t.y
                  , l = t.z;
                return !(typeof e != "number" || typeof s != "number" || typeof l != "number")
            }
            static equals(t, e) {
                return t.x === e.x && t.y === e.y && t.z === e.z
            }
            toObject() {
                return {
                    x: this.x,
                    y: this.y,
                    z: this.z
                }
            }
        }
        const ys = {
            toComponents: n=>n.getComponents(),
            fromComponents: n=>new xe(...n)
        };
        function jr(n) {
            return xe.isObject(n) ? new xe(n.x,n.y,n.z) : new xe
        }
        function Ur(n, t) {
            n.writeProperty("x", t.x),
            n.writeProperty("y", t.y),
            n.writeProperty("z", t.z)
        }
        function ss(n) {
            if (!n)
                return;
            const t = [];
            return w(n.step) || t.push(new Pt(n.step)),
            (!w(n.max) || !w(n.min)) && t.push(new Y({
                max: n.max,
                min: n.min
            })),
            new ut(t)
        }
        function $r(n) {
            return new Bt({
                assembly: ys,
                components: [ss("x"in n ? n.x : void 0), ss("y"in n ? n.y : void 0), ss("z"in n ? n.z : void 0)]
            })
        }
        function rs(n, t) {
            return {
                baseStep: a(t),
                constraint: t,
                textProps: f.fromObject({
                    draggingScale: p(t, n),
                    formatter: G(r(t, n))
                })
            }
        }
        const Fr = {
            id: "input-point3d",
            type: "input",
            accept: (n,t)=>{
                if (!xe.isObject(n))
                    return null;
                const e = M
                  , s = k(t, {
                    x: e.optional.custom(bt),
                    y: e.optional.custom(bt),
                    z: e.optional.custom(bt)
                });
                return s ? {
                    initialValue: n,
                    params: s
                } : null
            }
            ,
            binding: {
                reader: n=>jr,
                constraint: n=>$r(n.params),
                equals: xe.equals,
                writer: n=>Ur
            },
            controller: n=>{
                const t = n.value
                  , e = n.constraint;
                if (!(e instanceof Bt))
                    throw E.shouldNeverHappen();
                return new is(n.document,{
                    assembly: ys,
                    axes: [rs(t.rawValue.x, e.components[0]), rs(t.rawValue.y, e.components[1]), rs(t.rawValue.z, e.components[2])],
                    parser: lt,
                    value: t,
                    viewProps: n.viewProps
                })
            }
        };
        class Ce {
            constructor(t=0, e=0, s=0, l=0) {
                this.x = t,
                this.y = e,
                this.z = s,
                this.w = l
            }
            getComponents() {
                return [this.x, this.y, this.z, this.w]
            }
            static isObject(t) {
                if (w(t))
                    return !1;
                const e = t.x
                  , s = t.y
                  , l = t.z
                  , d = t.w;
                return !(typeof e != "number" || typeof s != "number" || typeof l != "number" || typeof d != "number")
            }
            static equals(t, e) {
                return t.x === e.x && t.y === e.y && t.z === e.z && t.w === e.w
            }
            toObject() {
                return {
                    x: this.x,
                    y: this.y,
                    z: this.z,
                    w: this.w
                }
            }
        }
        const Es = {
            toComponents: n=>n.getComponents(),
            fromComponents: n=>new Ce(...n)
        };
        function Hr(n) {
            return Ce.isObject(n) ? new Ce(n.x,n.y,n.z,n.w) : new Ce
        }
        function qr(n, t) {
            n.writeProperty("x", t.x),
            n.writeProperty("y", t.y),
            n.writeProperty("z", t.z),
            n.writeProperty("w", t.w)
        }
        function $n(n) {
            if (!n)
                return;
            const t = [];
            return w(n.step) || t.push(new Pt(n.step)),
            (!w(n.max) || !w(n.min)) && t.push(new Y({
                max: n.max,
                min: n.min
            })),
            new ut(t)
        }
        function Gr(n) {
            return new Bt({
                assembly: Es,
                components: [$n("x"in n ? n.x : void 0), $n("y"in n ? n.y : void 0), $n("z"in n ? n.z : void 0), $n("w"in n ? n.w : void 0)]
            })
        }
        function Yr(n, t) {
            return {
                baseStep: a(t),
                constraint: t,
                textProps: f.fromObject({
                    draggingScale: p(t, n),
                    formatter: G(r(t, n))
                })
            }
        }
        const Xr = {
            id: "input-point4d",
            type: "input",
            accept: (n,t)=>{
                if (!Ce.isObject(n))
                    return null;
                const e = M
                  , s = k(t, {
                    x: e.optional.custom(bt),
                    y: e.optional.custom(bt),
                    z: e.optional.custom(bt),
                    w: e.optional.custom(bt)
                });
                return s ? {
                    initialValue: n,
                    params: s
                } : null
            }
            ,
            binding: {
                reader: n=>Hr,
                constraint: n=>Gr(n.params),
                equals: Ce.equals,
                writer: n=>qr
            },
            controller: n=>{
                const t = n.value
                  , e = n.constraint;
                if (!(e instanceof Bt))
                    throw E.shouldNeverHappen();
                return new is(n.document,{
                    assembly: Es,
                    axes: t.rawValue.getComponents().map((s,l)=>Yr(s, e.components[l])),
                    parser: lt,
                    value: t,
                    viewProps: n.viewProps
                })
            }
        };
        function Wr(n) {
            const t = []
              , e = on(n.options);
            return e && t.push(e),
            new ut(t)
        }
        const Jr = {
            id: "input-string",
            type: "input",
            accept: (n,t)=>{
                if (typeof n != "string")
                    return null;
                const s = k(t, {
                    options: M.optional.custom(be)
                });
                return s ? {
                    initialValue: n,
                    params: s
                } : null
            }
            ,
            binding: {
                reader: n=>zn,
                constraint: n=>Wr(n.params),
                writer: n=>ee
            },
            controller: n=>{
                var t;
                const e = n.document
                  , s = n.value
                  , l = n.constraint;
                return l && q(l, I) ? new Yt(e,{
                    props: f.fromObject({
                        options: (t = o(l)) !== null && t !== void 0 ? t : []
                    }),
                    value: s,
                    viewProps: n.viewProps
                }) : new ce(e,{
                    parser: d=>d,
                    props: f.fromObject({
                        formatter: tn
                    }),
                    value: s,
                    viewProps: n.viewProps
                })
            }
        }
          , pn = {
            monitor: {
                defaultInterval: 200,
                defaultLineCount: 3
            }
        }
          , Ps = C("mll");
        class Qr {
            constructor(t, e) {
                this.onValueUpdate_ = this.onValueUpdate_.bind(this),
                this.formatter_ = e.formatter,
                this.element = t.createElement("div"),
                this.element.classList.add(Ps()),
                e.viewProps.bindClassModifiers(this.element);
                const s = t.createElement("textarea");
                s.classList.add(Ps("i")),
                s.style.height = `calc(var(--bld-us) * ${e.lineCount})`,
                s.readOnly = !0,
                e.viewProps.bindDisabled(s),
                this.element.appendChild(s),
                this.textareaElem_ = s,
                e.value.emitter.on("change", this.onValueUpdate_),
                this.value = e.value,
                this.update_()
            }
            update_() {
                const t = this.textareaElem_
                  , e = t.scrollTop === t.scrollHeight - t.clientHeight
                  , s = [];
                this.value.rawValue.forEach(l=>{
                    l !== void 0 && s.push(this.formatter_(l))
                }
                ),
                t.textContent = s.join(`
`),
                e && (t.scrollTop = t.scrollHeight)
            }
            onValueUpdate_() {
                this.update_()
            }
        }
        class os {
            constructor(t, e) {
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.view = new Qr(t,{
                    formatter: e.formatter,
                    lineCount: e.lineCount,
                    value: this.value,
                    viewProps: this.viewProps
                })
            }
        }
        const ks = C("sgl");
        class Zr {
            constructor(t, e) {
                this.onValueUpdate_ = this.onValueUpdate_.bind(this),
                this.formatter_ = e.formatter,
                this.element = t.createElement("div"),
                this.element.classList.add(ks()),
                e.viewProps.bindClassModifiers(this.element);
                const s = t.createElement("input");
                s.classList.add(ks("i")),
                s.readOnly = !0,
                s.type = "text",
                e.viewProps.bindDisabled(s),
                this.element.appendChild(s),
                this.inputElement = s,
                e.value.emitter.on("change", this.onValueUpdate_),
                this.value = e.value,
                this.update_()
            }
            update_() {
                const t = this.value.rawValue
                  , e = t[t.length - 1];
                this.inputElement.value = e !== void 0 ? this.formatter_(e) : ""
            }
            onValueUpdate_() {
                this.update_()
            }
        }
        class as {
            constructor(t, e) {
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.view = new Zr(t,{
                    formatter: e.formatter,
                    value: this.value,
                    viewProps: this.viewProps
                })
            }
        }
        const to = {
            id: "monitor-bool",
            type: "monitor",
            accept: (n,t)=>{
                if (typeof n != "boolean")
                    return null;
                const s = k(t, {
                    lineCount: M.optional.number
                });
                return s ? {
                    initialValue: n,
                    params: s
                } : null
            }
            ,
            binding: {
                reader: n=>Vn
            },
            controller: n=>{
                var t;
                return n.value.rawValue.length === 1 ? new as(n.document,{
                    formatter: Ln,
                    value: n.value,
                    viewProps: n.viewProps
                }) : new os(n.document,{
                    formatter: Ln,
                    lineCount: (t = n.params.lineCount) !== null && t !== void 0 ? t : pn.monitor.defaultLineCount,
                    value: n.value,
                    viewProps: n.viewProps
                })
            }
        };
        class eo {
            constructor() {
                this.emitter = new L,
                this.index_ = -1
            }
            get index() {
                return this.index_
            }
            set index(t) {
                this.index_ !== t && (this.index_ = t,
                this.emitter.emit("change", {
                    index: t,
                    sender: this
                }))
            }
        }
        const Kt = C("grl");
        class no {
            constructor(t, e) {
                this.onCursorChange_ = this.onCursorChange_.bind(this),
                this.onValueUpdate_ = this.onValueUpdate_.bind(this),
                this.element = t.createElement("div"),
                this.element.classList.add(Kt()),
                e.viewProps.bindClassModifiers(this.element),
                this.formatter_ = e.formatter,
                this.minValue_ = e.minValue,
                this.maxValue_ = e.maxValue,
                this.cursor_ = e.cursor,
                this.cursor_.emitter.on("change", this.onCursorChange_);
                const s = t.createElementNS(F, "svg");
                s.classList.add(Kt("g")),
                s.style.height = `calc(var(--bld-us) * ${e.lineCount})`,
                this.element.appendChild(s),
                this.svgElem_ = s;
                const l = t.createElementNS(F, "polyline");
                this.svgElem_.appendChild(l),
                this.lineElem_ = l;
                const d = t.createElement("div");
                d.classList.add(Kt("t"), C("tt")()),
                this.element.appendChild(d),
                this.tooltipElem_ = d,
                e.value.emitter.on("change", this.onValueUpdate_),
                this.value = e.value,
                this.update_()
            }
            get graphElement() {
                return this.svgElem_
            }
            update_() {
                const t = this.svgElem_.getBoundingClientRect()
                  , e = this.value.rawValue.length - 1
                  , s = this.minValue_
                  , l = this.maxValue_
                  , d = [];
                this.value.rawValue.forEach((P,V)=>{
                    if (P === void 0)
                        return;
                    const ie = A(V, 0, e, 0, t.width)
                      , dn = A(P, s, l, t.height, 0);
                    d.push([ie, dn].join(","))
                }
                ),
                this.lineElem_.setAttributeNS(null, "points", d.join(" "));
                const h = this.tooltipElem_
                  , v = this.value.rawValue[this.cursor_.index];
                if (v === void 0) {
                    h.classList.remove(Kt("t", "a"));
                    return
                }
                const b = A(this.cursor_.index, 0, e, 0, t.width)
                  , g = A(v, s, l, t.height, 0);
                h.style.left = `${b}px`,
                h.style.top = `${g}px`,
                h.textContent = `${this.formatter_(v)}`,
                h.classList.contains(Kt("t", "a")) || (h.classList.add(Kt("t", "a"), Kt("t", "in")),
                ae(h),
                h.classList.remove(Kt("t", "in")))
            }
            onValueUpdate_() {
                this.update_()
            }
            onCursorChange_() {
                this.update_()
            }
        }
        class io {
            constructor(t, e) {
                if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this),
                this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this),
                this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this),
                this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this),
                this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this),
                this.value = e.value,
                this.viewProps = e.viewProps,
                this.cursor_ = new eo,
                this.view = new no(t,{
                    cursor: this.cursor_,
                    formatter: e.formatter,
                    lineCount: e.lineCount,
                    maxValue: e.maxValue,
                    minValue: e.minValue,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                !At(t))
                    this.view.element.addEventListener("mousemove", this.onGraphMouseMove_),
                    this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
                else {
                    const s = new dt(this.view.element);
                    s.emitter.on("down", this.onGraphPointerDown_),
                    s.emitter.on("move", this.onGraphPointerMove_),
                    s.emitter.on("up", this.onGraphPointerUp_)
                }
            }
            onGraphMouseLeave_() {
                this.cursor_.index = -1
            }
            onGraphMouseMove_(t) {
                const e = this.view.element.getBoundingClientRect();
                this.cursor_.index = Math.floor(A(t.offsetX, 0, e.width, 0, this.value.rawValue.length))
            }
            onGraphPointerDown_(t) {
                this.onGraphPointerMove_(t)
            }
            onGraphPointerMove_(t) {
                if (!t.data.point) {
                    this.cursor_.index = -1;
                    return
                }
                this.cursor_.index = Math.floor(A(t.data.point.x, 0, t.data.bounds.width, 0, this.value.rawValue.length))
            }
            onGraphPointerUp_() {
                this.cursor_.index = -1
            }
        }
        function ls(n) {
            return "format"in n && !w(n.format) ? n.format : G(2)
        }
        function so(n) {
            var t;
            return n.value.rawValue.length === 1 ? new as(n.document,{
                formatter: ls(n.params),
                value: n.value,
                viewProps: n.viewProps
            }) : new os(n.document,{
                formatter: ls(n.params),
                lineCount: (t = n.params.lineCount) !== null && t !== void 0 ? t : pn.monitor.defaultLineCount,
                value: n.value,
                viewProps: n.viewProps
            })
        }
        function ro(n) {
            var t, e, s;
            return new io(n.document,{
                formatter: ls(n.params),
                lineCount: (t = n.params.lineCount) !== null && t !== void 0 ? t : pn.monitor.defaultLineCount,
                maxValue: (e = "max"in n.params ? n.params.max : null) !== null && e !== void 0 ? e : 100,
                minValue: (s = "min"in n.params ? n.params.min : null) !== null && s !== void 0 ? s : 0,
                value: n.value,
                viewProps: n.viewProps
            })
        }
        function Vs(n) {
            return "view"in n && n.view === "graph"
        }
        const oo = {
            id: "monitor-number",
            type: "monitor",
            accept: (n,t)=>{
                if (typeof n != "number")
                    return null;
                const e = M
                  , s = k(t, {
                    format: e.optional.function,
                    lineCount: e.optional.number,
                    max: e.optional.number,
                    min: e.optional.number,
                    view: e.optional.string
                });
                return s ? {
                    initialValue: n,
                    params: s
                } : null
            }
            ,
            binding: {
                defaultBufferSize: n=>Vs(n) ? 64 : 1,
                reader: n=>ve
            },
            controller: n=>Vs(n.params) ? ro(n) : so(n)
        }
          , ao = {
            id: "monitor-string",
            type: "monitor",
            accept: (n,t)=>{
                if (typeof n != "string")
                    return null;
                const e = M
                  , s = k(t, {
                    lineCount: e.optional.number,
                    multiline: e.optional.boolean
                });
                return s ? {
                    initialValue: n,
                    params: s
                } : null
            }
            ,
            binding: {
                reader: n=>zn
            },
            controller: n=>{
                var t;
                const e = n.value;
                return e.rawValue.length > 1 || "multiline"in n.params && n.params.multiline ? new os(n.document,{
                    formatter: tn,
                    lineCount: (t = n.params.lineCount) !== null && t !== void 0 ? t : pn.monitor.defaultLineCount,
                    value: e,
                    viewProps: n.viewProps
                }) : new as(n.document,{
                    formatter: tn,
                    value: e,
                    viewProps: n.viewProps
                })
            }
        };
        class lo {
            constructor(t) {
                this.onValueChange_ = this.onValueChange_.bind(this),
                this.reader = t.reader,
                this.writer = t.writer,
                this.emitter = new L,
                this.value = t.value,
                this.value.emitter.on("change", this.onValueChange_),
                this.target = t.target,
                this.read()
            }
            read() {
                const t = this.target.read();
                t !== void 0 && (this.value.rawValue = this.reader(t))
            }
            write_(t) {
                this.writer(this.target, t)
            }
            onValueChange_(t) {
                this.write_(t.rawValue),
                this.emitter.emit("change", {
                    options: t.options,
                    rawValue: t.rawValue,
                    sender: this
                })
            }
        }
        function po(n, t) {
            const e = n.accept(t.target.read(), t.params);
            if (w(e))
                return null;
            const s = M
              , l = {
                target: t.target,
                initialValue: e.initialValue,
                params: e.params
            }
              , d = n.binding.reader(l)
              , h = n.binding.constraint ? n.binding.constraint(l) : void 0
              , v = K(d(e.initialValue), {
                constraint: h,
                equals: n.binding.equals
            })
              , b = new lo({
                reader: d,
                target: t.target,
                value: v,
                writer: n.binding.writer(l)
            })
              , g = s.optional.boolean(t.params.disabled).value
              , P = s.optional.boolean(t.params.hidden).value
              , V = n.controller({
                constraint: h,
                document: t.document,
                initialValue: e.initialValue,
                params: e.params,
                value: b.value,
                viewProps: et.create({
                    disabled: g,
                    hidden: P
                })
            })
              , ie = s.optional.string(t.params.label).value;
            return new H(t.document,{
                binding: b,
                blade: Tt(),
                props: f.fromObject({
                    label: ie || t.target.key
                }),
                valueController: V
            })
        }
        class uo {
            constructor(t) {
                this.onTick_ = this.onTick_.bind(this),
                this.reader_ = t.reader,
                this.target = t.target,
                this.emitter = new L,
                this.value = t.value,
                this.ticker = t.ticker,
                this.ticker.emitter.on("tick", this.onTick_),
                this.read()
            }
            dispose() {
                this.ticker.dispose()
            }
            read() {
                const t = this.target.read();
                if (t === void 0)
                    return;
                const e = this.value.rawValue
                  , s = this.reader_(t);
                this.value.rawValue = Jt(e, s),
                this.emitter.emit("update", {
                    rawValue: s,
                    sender: this
                })
            }
            onTick_(t) {
                this.read()
            }
        }
        function ho(n, t) {
            return t === 0 ? new he : new R(n,t != null ? t : pn.monitor.defaultInterval)
        }
        function co(n, t) {
            var e, s, l;
            const d = M
              , h = n.accept(t.target.read(), t.params);
            if (w(h))
                return null;
            const v = {
                target: t.target,
                initialValue: h.initialValue,
                params: h.params
            }
              , b = n.binding.reader(v)
              , g = (s = (e = d.optional.number(t.params.bufferSize).value) !== null && e !== void 0 ? e : n.binding.defaultBufferSize && n.binding.defaultBufferSize(h.params)) !== null && s !== void 0 ? s : 1
              , P = d.optional.number(t.params.interval).value
              , V = new uo({
                reader: b,
                target: t.target,
                ticker: ho(t.document, P),
                value: Bn(g)
            })
              , ie = d.optional.boolean(t.params.disabled).value
              , dn = d.optional.boolean(t.params.hidden).value
              , un = n.controller({
                document: t.document,
                params: h.params,
                value: V.value,
                viewProps: et.create({
                    disabled: ie,
                    hidden: dn
                })
            })
              , ye = (l = d.optional.string(t.params.label).value) !== null && l !== void 0 ? l : t.target.key;
            return new J(t.document,{
                binding: V,
                blade: Tt(),
                props: f.fromObject({
                    label: ye
                }),
                valueController: un
            })
        }
        class vo {
            constructor() {
                this.pluginsMap_ = {
                    blades: [],
                    inputs: [],
                    monitors: []
                }
            }
            getAll() {
                return [...this.pluginsMap_.blades, ...this.pluginsMap_.inputs, ...this.pluginsMap_.monitors]
            }
            register(t) {
                t.type === "blade" ? this.pluginsMap_.blades.unshift(t) : t.type === "input" ? this.pluginsMap_.inputs.unshift(t) : t.type === "monitor" && this.pluginsMap_.monitors.unshift(t)
            }
            createInput(t, e, s) {
                const l = e.read();
                if (w(l))
                    throw new E({
                        context: {
                            key: e.key
                        },
                        type: "nomatchingcontroller"
                    });
                const d = this.pluginsMap_.inputs.reduce((h,v)=>h || po(v, {
                    document: t,
                    target: e,
                    params: s
                }), null);
                if (d)
                    return d;
                throw new E({
                    context: {
                        key: e.key
                    },
                    type: "nomatchingcontroller"
                })
            }
            createMonitor(t, e, s) {
                const l = this.pluginsMap_.monitors.reduce((d,h)=>d || co(h, {
                    document: t,
                    params: s,
                    target: e
                }), null);
                if (l)
                    return l;
                throw new E({
                    context: {
                        key: e.key
                    },
                    type: "nomatchingcontroller"
                })
            }
            createBlade(t, e) {
                const s = this.pluginsMap_.blades.reduce((l,d)=>l || Fe(d, {
                    document: t,
                    params: e
                }), null);
                if (!s)
                    throw new E({
                        type: "nomatchingview",
                        context: {
                            params: e
                        }
                    });
                return s
            }
            createBladeApi(t) {
                if (t instanceof H)
                    return new qt(t);
                if (t instanceof J)
                    return new ze(t);
                if (t instanceof Gt)
                    return new de(t,this);
                const e = this.pluginsMap_.blades.reduce((s,l)=>s || l.api({
                    controller: t,
                    pool: this
                }), null);
                if (!e)
                    throw E.shouldNeverHappen();
                return e
            }
        }
        function mo() {
            const n = new vo;
            return [Kr, Fr, Xr, Jr, Sr, Cr, xr, gr, tt, to, ao, oo, pe, bi, fi, $e].forEach(t=>{
                n.register(t)
            }
            ),
            n
        }
        class Ls extends O {
            constructor(t) {
                super(t),
                this.emitter_ = new L,
                this.controller_.valueController.value.emitter.on("change", e=>{
                    this.emitter_.emit("change", {
                        event: new nt(this,e.rawValue)
                    })
                }
                )
            }
            get label() {
                return this.controller_.props.get("label")
            }
            set label(t) {
                this.controller_.props.set("label", t)
            }
            get options() {
                return this.controller_.valueController.props.get("options")
            }
            set options(t) {
                this.controller_.valueController.props.set("options", t)
            }
            get value() {
                return this.controller_.valueController.value.rawValue
            }
            set value(t) {
                this.controller_.valueController.value.rawValue = t
            }
            on(t, e) {
                const s = e.bind(this);
                return this.emitter_.on(t, l=>{
                    s(l.event)
                }
                ),
                this
            }
        }
        class Ms extends O {
            constructor(t) {
                super(t),
                this.emitter_ = new L,
                this.controller_.valueController.value.emitter.on("change", e=>{
                    this.emitter_.emit("change", {
                        event: new nt(this,e.rawValue)
                    })
                }
                )
            }
            get label() {
                return this.controller_.props.get("label")
            }
            set label(t) {
                this.controller_.props.set("label", t)
            }
            get maxValue() {
                return this.controller_.valueController.sliderController.props.get("maxValue")
            }
            set maxValue(t) {
                this.controller_.valueController.sliderController.props.set("maxValue", t)
            }
            get minValue() {
                return this.controller_.valueController.sliderController.props.get("minValue")
            }
            set minValue(t) {
                this.controller_.valueController.sliderController.props.set("minValue", t)
            }
            get value() {
                return this.controller_.valueController.value.rawValue
            }
            set value(t) {
                this.controller_.valueController.value.rawValue = t
            }
            on(t, e) {
                const s = e.bind(this);
                return this.emitter_.on(t, l=>{
                    s(l.event)
                }
                ),
                this
            }
        }
        class Ss extends O {
            constructor(t) {
                super(t),
                this.emitter_ = new L,
                this.controller_.valueController.value.emitter.on("change", e=>{
                    this.emitter_.emit("change", {
                        event: new nt(this,e.rawValue)
                    })
                }
                )
            }
            get label() {
                return this.controller_.props.get("label")
            }
            set label(t) {
                this.controller_.props.set("label", t)
            }
            get formatter() {
                return this.controller_.valueController.props.get("formatter")
            }
            set formatter(t) {
                this.controller_.valueController.props.set("formatter", t)
            }
            get value() {
                return this.controller_.valueController.value.rawValue
            }
            set value(t) {
                this.controller_.valueController.value.rawValue = t
            }
            on(t, e) {
                const s = e.bind(this);
                return this.emitter_.on(t, l=>{
                    s(l.event)
                }
                ),
                this
            }
        }
        const bo = function() {
            return {
                id: "list",
                type: "blade",
                accept(n) {
                    const t = M
                      , e = k(n, {
                        options: t.required.custom(be),
                        value: t.required.raw,
                        view: t.required.constant("list"),
                        label: t.optional.string
                    });
                    return e ? {
                        params: e
                    } : null
                },
                controller(n) {
                    const t = new Yt(n.document,{
                        props: f.fromObject({
                            options: Hi(n.params.options)
                        }),
                        value: K(n.params.value),
                        viewProps: n.viewProps
                    });
                    return new Ct(n.document,{
                        blade: n.blade,
                        props: f.fromObject({
                            label: n.params.label
                        }),
                        valueController: t
                    })
                },
                api(n) {
                    return !(n.controller instanceof Ct) || !(n.controller.valueController instanceof Yt) ? null : new Ls(n.controller)
                }
            }
        }();
        function _o(n) {
            return n.reduce((t,e)=>Object.assign(t, {
                [e.presetKey]: e.read()
            }), {})
        }
        function fo(n, t) {
            n.forEach(e=>{
                const s = t[e.presetKey];
                s !== void 0 && e.write(s)
            }
            )
        }
        class go extends Be {
            constructor(t, e) {
                super(t, e)
            }
            get element() {
                return this.controller_.view.element
            }
            importPreset(t) {
                const e = this.controller_.rackController.rack.find(H).map(s=>s.binding.target);
                fo(e, t),
                this.refresh()
            }
            exportPreset() {
                const t = this.controller_.rackController.rack.find(H).map(e=>e.binding.target);
                return _o(t)
            }
            refresh() {
                this.controller_.rackController.rack.find(H).forEach(t=>{
                    t.binding.read()
                }
                ),
                this.controller_.rackController.rack.find(J).forEach(t=>{
                    t.binding.read()
                }
                )
            }
        }
        class wo extends Ke {
            constructor(t, e) {
                super(t, {
                    expanded: e.expanded,
                    blade: e.blade,
                    props: e.props,
                    root: !0,
                    viewProps: e.viewProps
                })
            }
        }
        const xo = {
            id: "slider",
            type: "blade",
            accept(n) {
                const t = M
                  , e = k(n, {
                    max: t.required.number,
                    min: t.required.number,
                    view: t.required.constant("slider"),
                    format: t.optional.function,
                    label: t.optional.string,
                    value: t.optional.number
                });
                return e ? {
                    params: e
                } : null
            },
            controller(n) {
                var t, e;
                const s = (t = n.params.value) !== null && t !== void 0 ? t : 0
                  , l = new Vt(n.document,{
                    baseStep: 1,
                    parser: lt,
                    sliderProps: f.fromObject({
                        maxValue: n.params.max,
                        minValue: n.params.min
                    }),
                    textProps: f.fromObject({
                        draggingScale: p(void 0, s),
                        formatter: (e = n.params.format) !== null && e !== void 0 ? e : Oi
                    }),
                    value: K(s),
                    viewProps: n.viewProps
                });
                return new Ct(n.document,{
                    blade: n.blade,
                    props: f.fromObject({
                        label: n.params.label
                    }),
                    valueController: l
                })
            },
            api(n) {
                return !(n.controller instanceof Ct) || !(n.controller.valueController instanceof Vt) ? null : new Ms(n.controller)
            }
        }
          , Co = function() {
            return {
                id: "text",
                type: "blade",
                accept(n) {
                    const t = M
                      , e = k(n, {
                        parse: t.required.function,
                        value: t.required.raw,
                        view: t.required.constant("text"),
                        format: t.optional.function,
                        label: t.optional.string
                    });
                    return e ? {
                        params: e
                    } : null
                },
                controller(n) {
                    var t;
                    const e = new ce(n.document,{
                        parser: n.params.parse,
                        props: f.fromObject({
                            formatter: (t = n.params.format) !== null && t !== void 0 ? t : s=>String(s)
                        }),
                        value: K(n.params.value),
                        viewProps: n.viewProps
                    });
                    return new Ct(n.document,{
                        blade: n.blade,
                        props: f.fromObject({
                            label: n.params.label
                        }),
                        valueController: e
                    })
                },
                api(n) {
                    return !(n.controller instanceof Ct) || !(n.controller.valueController instanceof ce) ? null : new Ss(n.controller)
                }
            }
        }();
        function yo(n) {
            const t = n.createElement("div");
            return t.classList.add(C("dfw")()),
            n.body && n.body.appendChild(t),
            t
        }
        function As(n, t, e) {
            if (n.querySelector(`style[data-tp-style=${t}]`))
                return;
            const s = n.createElement("style");
            s.dataset.tpStyle = t,
            s.textContent = e,
            n.head.appendChild(s)
        }
        class Eo extends go {
            constructor(t) {
                var e;
                const s = t || {}
                  , l = (e = s.document) !== null && e !== void 0 ? e : Le()
                  , d = mo()
                  , h = new wo(l,{
                    expanded: s.expanded,
                    blade: Tt(),
                    props: f.fromObject({
                        title: s.title
                    }),
                    viewProps: et.create()
                });
                super(h, d),
                this.pool_ = d,
                this.containerElem_ = s.container || yo(l),
                this.containerElem_.appendChild(this.element),
                this.doc_ = l,
                this.usesDefaultWrapper_ = !s.container,
                this.setUpDefaultPlugins_()
            }
            get document() {
                if (!this.doc_)
                    throw E.alreadyDisposed();
                return this.doc_
            }
            dispose() {
                const t = this.containerElem_;
                if (!t)
                    throw E.alreadyDisposed();
                if (this.usesDefaultWrapper_) {
                    const e = t.parentElement;
                    e && e.removeChild(t)
                }
                this.containerElem_ = null,
                this.doc_ = null,
                super.dispose()
            }
            registerPlugin(t) {
                ("plugin"in t ? [t.plugin] : "plugins"in t ? t.plugins : []).forEach(s=>{
                    this.pool_.register(s),
                    this.embedPluginStyle_(s)
                }
                )
            }
            embedPluginStyle_(t) {
                t.css && As(this.document, `plugin-${t.id}`, t.css)
            }
            setUpDefaultPlugins_() {
                As(this.document, "default", ".tp-lstv_s,.tp-btnv_b,.tp-p2dv_b,.tp-colswv_sw,.tp-p2dpv_p,.tp-txtv_i,.tp-grlv_g,.tp-sglv_i,.tp-mllv_i,.tp-fldv_b,.tp-rotv_b,.tp-ckbv_i,.tp-coltxtv_ms,.tp-tbiv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-lstv_s,.tp-btnv_b,.tp-p2dv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-lstv_s:hover,.tp-btnv_b:hover,.tp-p2dv_b:hover{background-color:var(--btn-bg-h)}.tp-lstv_s:focus,.tp-btnv_b:focus,.tp-p2dv_b:focus{background-color:var(--btn-bg-f)}.tp-lstv_s:active,.tp-btnv_b:active,.tp-p2dv_b:active{background-color:var(--btn-bg-a)}.tp-lstv_s:disabled,.tp-btnv_b:disabled,.tp-p2dv_b:disabled{opacity:0.5}.tp-colswv_sw,.tp-p2dpv_p,.tp-txtv_i{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-colswv_sw:hover,.tp-p2dpv_p:hover,.tp-txtv_i:hover{background-color:var(--in-bg-h)}.tp-colswv_sw:focus,.tp-p2dpv_p:focus,.tp-txtv_i:focus{background-color:var(--in-bg-f)}.tp-colswv_sw:active,.tp-p2dpv_p:active,.tp-txtv_i:active{background-color:var(--in-bg-a)}.tp-colswv_sw:disabled,.tp-p2dpv_p:disabled,.tp-txtv_i:disabled{opacity:0.5}.tp-grlv_g,.tp-sglv_i,.tp-mllv_i{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-us);width:100%}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono,Source Code Pro,Menlo,Courier,monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, #2f3137);--bs-sh: var(--tp-base-shadow-color, rgba(0,0,0,0.2));--btn-bg: var(--tp-button-background-color, #adafb8);--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, #2f3137);--cnt-bg: var(--tp-container-background-color, rgba(187,188,196,0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187,188,196,0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187,188,196,0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187,188,196,0.15));--cnt-fg: var(--tp-container-foreground-color, #bbbcc4);--in-bg: var(--tp-input-background-color, rgba(0,0,0,0.2));--in-bg-a: var(--tp-input-background-color-active, rgba(0,0,0,0.35));--in-bg-f: var(--tp-input-background-color-focus, rgba(0,0,0,0.3));--in-bg-h: var(--tp-input-background-color-hover, rgba(0,0,0,0.25));--in-fg: var(--tp-input-foreground-color, #bbbcc4);--lbl-fg: var(--tp-label-foreground-color, rgba(187,188,196,0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0,0,0,0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187,188,196,0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(0,0,0,0.2))}.tp-fldv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-rotv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1 * var(--cnt-v-p))}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-rotv_c>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-fldv_c>.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv{margin-left:4px}.tp-fldv_c>.tp-fldv>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c .tp-fldv>.tp-fldv_c,.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-tabv>.tp-tabv_i,.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_i{border-top-left-radius:var(--elm-br)}.tp-fldv_c .tp-tabv>.tp-tabv_c,.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-fldv_b,.tp-rotv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);overflow:hidden;padding-left:calc(var(--cnt-h-p) + 8px);padding-right:calc(2px * 2 + var(--bld-us) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-fldv_b:hover,.tp-rotv_b:hover{background-color:var(--cnt-bg-h)}.tp-fldv_b:focus,.tp-rotv_b:focus{background-color:var(--cnt-bg-f)}.tp-fldv_b:active,.tp-rotv_b:active{background-color:var(--cnt-bg-a)}.tp-fldv_b:disabled,.tp-rotv_b:disabled{opacity:0.5}.tp-fldv_m,.tp-rotv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:'';display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px) / 2 - 2px);margin:auto;opacity:0.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m,.tp-rotv.tp-rotv-expanded .tp-rotv_m{transform:none}.tp-fldv_c,.tp-rotv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c,.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c{display:none}.tp-fldv.tp-fldv-expanded>.tp-fldv_c,.tp-rotv.tp-rotv-expanded .tp-rotv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-coltxtv_m,.tp-lstv{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-coltxtv_mm,.tp-lstv_m{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-coltxtv_mm svg,.tp-lstv_m svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-coltxtv_mm svg path,.tp-lstv_m svg path{fill:currentColor}.tp-coltxtv_w,.tp-pndtxtv{display:flex}.tp-coltxtv_c,.tp-pndtxtv_a{width:100%}.tp-coltxtv_c+.tp-coltxtv_c,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-pndtxtv_a{margin-left:2px}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-us);position:relative;width:var(--bld-us)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:0.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-us)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1 * var(--cnt-h-p));right:calc(-1 * var(--cnt-h-p));top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a:before{background-color:var(--grv-fg);content:'';height:2px;left:calc(-1 * var(--cnt-h-p));position:absolute;right:calc(-1 * var(--cnt-h-p));top:0}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-us) * 4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0,0,0,0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,0.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative;width:100%}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,0.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br)}.tp-colswv.tp-v-disabled{opacity:0.5}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;cursor:pointer;display:block;height:var(--bld-us);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-us)}.tp-colswv_b:focus::after{border:rgba(255,255,255,0.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:'';display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-us);line-height:var(--bld-us);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_c{border-left:var(--cnt-bg) solid 4px}.tp-fldv_b:hover+.tp-fldv_c{border-left-color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_c{border-left-color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_c{border-left-color:var(--cnt-bg-a)}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-us) * 3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left 0.05s, top 0.05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:0.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:0.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:0.5}.tp-mllv_i{display:block;height:calc(var(--bld-us) * 3);line-height:var(--bld-us);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:0.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-us);margin-right:4px;position:relative;width:var(--bld-us)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1 * var(--cnt-h-p));right:calc(-1 * var(--cnt-h-p));top:var(--bld-us)}.tp-p2dpv{padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:0.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:0.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sldv.tp-v-disabled{opacity:0.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-us);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:'';display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:'';display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:'';display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv.tp-v-disabled{opacity:0.5}.tp-tabv_i{align-items:flex-end;display:flex;overflow:hidden}.tp-tabv.tp-tabv-nop .tp-tabv_i{height:calc(var(--bld-us) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_i::before{background-color:var(--cnt-bg);bottom:0;content:'';height:2px;left:0;position:absolute;right:0}.tp-tabv_c{border-left:var(--cnt-bg) solid 4px;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p)}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv::before{background-color:var(--cnt-bg);bottom:0;content:'';height:2px;left:-2px;position:absolute;width:2px}.tp-tbiv_b{background-color:var(--cnt-bg);display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);width:100%}.tp-tbiv_b:hover{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active{background-color:var(--cnt-bg-a)}.tp-tbiv_b:disabled{opacity:0.5}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);opacity:0.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:0.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:'';height:calc(var(--bld-us) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:0.1;position:absolute;top:0;transition:border-radius 0.1s, height 0.1s, transform 0.1s, width 0.1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) transparent transparent transparent;border-style:solid;border-width:2px;box-sizing:border-box;content:'';font-size:0.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(2px * 2 + var(--bld-us) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c,.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_i{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}"),
                this.pool_.getAll().forEach(t=>{
                    this.embedPluginStyle_(t)
                }
                ),
                this.registerPlugin({
                    plugins: [xo, bo, $e, Co]
                })
            }
        }
        const Po = new N("3.0.5");
        _.BladeApi = O,
        _.ButtonApi = ft,
        _.FolderApi = Be,
        _.InputBindingApi = qt,
        _.ListApi = Ls,
        _.MonitorBindingApi = ze,
        _.Pane = Eo,
        _.SeparatorApi = wn,
        _.SliderApi = Ms,
        _.TabApi = yt,
        _.TabPageApi = Ue,
        _.TextApi = Ss,
        _.TpChangeEvent = nt,
        _.VERSION = Po,
        Object.defineProperty(_, "__esModule", {
            value: !0
        })
    })
}
)(ps, ps.exports);
var Fn = {
    exports: {}
};
(function(se, x) {
    (function(_, N) {
        N(x)
    }
    )(Ts, function(_) {
        class N {
            constructor(i) {
                this.controller_ = i
            }
            get disabled() {
                return this.controller_.viewProps.get("disabled")
            }
            set disabled(i) {
                this.controller_.viewProps.set("disabled", i)
            }
            get hidden() {
                return this.controller_.viewProps.get("hidden")
            }
            set hidden(i) {
                this.controller_.viewProps.set("hidden", i)
            }
            dispose() {
                this.controller_.viewProps.set("disposed", !0)
            }
        }
        class O {
            constructor(i) {
                this.target = i
            }
        }
        class _t extends O {
            constructor(i, r, a, p) {
                super(i),
                this.value = r,
                this.presetKey = a,
                this.last = p != null ? p : !0
            }
        }
        function nt(o) {
            return o
        }
        function $(o) {
            return o == null
        }
        const Ee = {
            alreadydisposed: ()=>"View has been already disposed",
            invalidparams: o=>`Invalid parameters for '${o.name}'`,
            nomatchingcontroller: o=>`No matching controller for '${o.key}'`,
            nomatchingview: o=>`No matching view for '${JSON.stringify(o.params)}'`,
            notbindable: ()=>"Value is not bindable",
            propertynotfound: o=>`Property '${o.name}' not found`,
            shouldneverhappen: ()=>"This error should never happen"
        };
        class jt {
            constructor(i) {
                var r;
                this.message = (r = Ee[i.type](i.context)) !== null && r !== void 0 ? r : "Unexpected error",
                this.name = this.constructor.name,
                this.stack = new Error(this.message).stack,
                this.type = i.type
            }
            static alreadyDisposed() {
                return new jt({
                    type: "alreadydisposed"
                })
            }
            static notBindable() {
                return new jt({
                    type: "notbindable"
                })
            }
            static propertyNotFound(i) {
                return new jt({
                    type: "propertynotfound",
                    context: {
                        name: i
                    }
                })
            }
            static shouldNeverHappen() {
                return new jt({
                    type: "shouldneverhappen"
                })
            }
        }
        class w {
            constructor() {
                this.observers_ = {}
            }
            on(i, r) {
                let a = this.observers_[i];
                return a || (a = this.observers_[i] = []),
                a.push({
                    handler: r
                }),
                this
            }
            off(i, r) {
                const a = this.observers_[i];
                return a && (this.observers_[i] = a.filter(p=>p.handler !== r)),
                this
            }
            emit(i, r) {
                const a = this.observers_[i];
                !a || a.forEach(p=>{
                    p.handler(r)
                }
                )
            }
        }
        const Hn = "tp";
        function z(o) {
            return (r,a)=>[Hn, "-", o, "v", r ? `_${r}` : "", a ? `-${a}` : ""].join("")
        }
        function E(o, i) {
            return r=>i(o(r))
        }
        function re(o) {
            return o.rawValue
        }
        function ft(o, i) {
            o.emitter.on("change", E(re, i)),
            i(o.rawValue)
        }
        function L(o, i, r) {
            ft(o.value(i), r)
        }
        function qn(o, i, r) {
            r ? o.classList.add(i) : o.classList.remove(i)
        }
        function C(o, i) {
            return r=>{
                qn(o, i, r)
            }
        }
        function Gn(o, i) {
            ft(o, r=>{
                i.textContent = r != null ? r : ""
            }
            )
        }
        const Pe = z("btn");
        class Lt {
            constructor(i, r) {
                this.element = i.createElement("div"),
                this.element.classList.add(Pe()),
                r.viewProps.bindClassModifiers(this.element);
                const a = i.createElement("button");
                a.classList.add(Pe("b")),
                r.viewProps.bindDisabled(a),
                this.element.appendChild(a),
                this.buttonElement = a;
                const p = i.createElement("div");
                p.classList.add(Pe("t")),
                Gn(r.props.value("title"), p),
                this.buttonElement.appendChild(p)
            }
        }
        class W {
            constructor(i, r) {
                this.emitter = new w,
                this.onClick_ = this.onClick_.bind(this),
                this.props = r.props,
                this.viewProps = r.viewProps,
                this.view = new Lt(i,{
                    props: this.props,
                    viewProps: this.viewProps
                }),
                this.view.buttonElement.addEventListener("click", this.onClick_)
            }
            onClick_() {
                this.emitter.emit("click", {
                    sender: this
                })
            }
        }
        class Yn {
            constructor(i, r) {
                var a;
                this.constraint_ = r == null ? void 0 : r.constraint,
                this.equals_ = (a = r == null ? void 0 : r.equals) !== null && a !== void 0 ? a : (p,u)=>p === u,
                this.emitter = new w,
                this.rawValue_ = i
            }
            get constraint() {
                return this.constraint_
            }
            get rawValue() {
                return this.rawValue_
            }
            set rawValue(i) {
                this.setRawValue(i, {
                    forceEmit: !1,
                    last: !0
                })
            }
            setRawValue(i, r) {
                const a = r != null ? r : {
                    forceEmit: !1,
                    last: !0
                }
                  , p = this.constraint_ ? this.constraint_.constrain(i) : i;
                !!this.equals_(this.rawValue_, p) && !a.forceEmit || (this.emitter.emit("beforechange", {
                    sender: this
                }),
                this.rawValue_ = p,
                this.emitter.emit("change", {
                    options: a,
                    rawValue: p,
                    sender: this
                }))
            }
        }
        class Mt {
            constructor(i) {
                this.emitter = new w,
                this.value_ = i
            }
            get rawValue() {
                return this.value_
            }
            set rawValue(i) {
                this.setRawValue(i, {
                    forceEmit: !1,
                    last: !0
                })
            }
            setRawValue(i, r) {
                const a = r != null ? r : {
                    forceEmit: !1,
                    last: !0
                };
                this.value_ === i && !a.forceEmit || (this.emitter.emit("beforechange", {
                    sender: this
                }),
                this.value_ = i,
                this.emitter.emit("change", {
                    options: a,
                    rawValue: this.value_,
                    sender: this
                }))
            }
        }
        function it(o, i) {
            const r = i == null ? void 0 : i.constraint
              , a = i == null ? void 0 : i.equals;
            return !r && !a ? new Mt(o) : new Yn(o,i)
        }
        class B {
            constructor(i) {
                this.emitter = new w,
                this.valMap_ = i;
                for (const r in this.valMap_)
                    this.valMap_[r].emitter.on("change", ()=>{
                        this.emitter.emit("change", {
                            key: r,
                            sender: this
                        })
                    }
                    )
            }
            static createCore(i) {
                return Object.keys(i).reduce((a,p)=>Object.assign(a, {
                    [p]: it(i[p])
                }), {})
            }
            static fromObject(i) {
                const r = this.createCore(i);
                return new B(r)
            }
            get(i) {
                return this.valMap_[i].rawValue
            }
            set(i, r) {
                this.valMap_[i].rawValue = r
            }
            value(i) {
                return this.valMap_[i]
            }
        }
        function Xn(o, i) {
            const a = Object.keys(i).reduce((p,u)=>{
                if (p === void 0)
                    return;
                const c = i[u]
                  , m = c(o[u]);
                return m.succeeded ? Object.assign(Object.assign({}, p), {
                    [u]: m.value
                }) : void 0
            }
            , {});
            return a
        }
        function hn(o, i) {
            return o.reduce((r,a)=>{
                if (r === void 0)
                    return;
                const p = i(a);
                if (!(!p.succeeded || p.value === void 0))
                    return [...r, p.value]
            }
            , [])
        }
        function Wn(o) {
            return o === null ? !1 : typeof o == "object"
        }
        function ot(o) {
            return i=>r=>{
                if (!i && r === void 0)
                    return {
                        succeeded: !1,
                        value: void 0
                    };
                if (i && r === void 0)
                    return {
                        succeeded: !0,
                        value: void 0
                    };
                const a = o(r);
                return a !== void 0 ? {
                    succeeded: !0,
                    value: a
                } : {
                    succeeded: !1,
                    value: void 0
                }
            }
        }
        function K(o) {
            return {
                custom: i=>ot(i)(o),
                boolean: ot(i=>typeof i == "boolean" ? i : void 0)(o),
                number: ot(i=>typeof i == "number" ? i : void 0)(o),
                string: ot(i=>typeof i == "string" ? i : void 0)(o),
                function: ot(i=>typeof i == "function" ? i : void 0)(o),
                constant: i=>ot(r=>r === i ? i : void 0)(o),
                raw: ot(i=>i)(o),
                object: i=>ot(r=>{
                    if (!!Wn(r))
                        return Xn(r, i)
                }
                )(o),
                array: i=>ot(r=>{
                    if (!!Array.isArray(r))
                        return hn(r, i)
                }
                )(o)
            }
        }
        const f = {
            optional: K(!0),
            required: K(!1)
        };
        function St(o, i) {
            const r = f.required.object(i)(o);
            return r.succeeded ? r.value : void 0
        }
        function Jn(o) {
            return o && o.parentElement && o.parentElement.removeChild(o),
            null
        }
        function Qn() {
            return ["veryfirst", "first", "last", "verylast"]
        }
        const st = z("")
          , ke = {
            veryfirst: "vfst",
            first: "fst",
            last: "lst",
            verylast: "vlst"
        };
        class M {
            constructor(i) {
                this.parent_ = null,
                this.blade = i.blade,
                this.view = i.view,
                this.viewProps = i.viewProps;
                const r = this.view.element;
                this.blade.value("positions").emitter.on("change", ()=>{
                    Qn().forEach(a=>{
                        r.classList.remove(st(void 0, ke[a]))
                    }
                    ),
                    this.blade.get("positions").forEach(a=>{
                        r.classList.add(st(void 0, ke[a]))
                    }
                    )
                }
                ),
                this.viewProps.handleDispose(()=>{
                    Jn(r)
                }
                )
            }
            get parent() {
                return this.parent_
            }
        }
        const k = "http://www.w3.org/2000/svg";
        function oe(o) {
            o.offsetHeight
        }
        function Zn(o, i) {
            const r = o.style.transition;
            o.style.transition = "none",
            i(),
            o.style.transition = r
        }
        function Ve(o) {
            return o.ontouchstart !== void 0
        }
        function cn(o) {
            for (; o.childNodes.length > 0; )
                o.removeChild(o.childNodes[0])
        }
        function Ut(o) {
            return o.relatedTarget ? o.relatedTarget : "explicitOriginalTarget"in o ? o.explicitOriginalTarget : null
        }
        const F = z("lbl");
        function ae(o, i) {
            const r = o.createDocumentFragment();
            return i.split(`
`).map(p=>o.createTextNode(p)).forEach((p,u)=>{
                u > 0 && r.appendChild(o.createElement("br")),
                r.appendChild(p)
            }
            ),
            r
        }
        class vn {
            constructor(i, r) {
                this.element = i.createElement("div"),
                this.element.classList.add(F()),
                r.viewProps.bindClassModifiers(this.element);
                const a = i.createElement("div");
                a.classList.add(F("l")),
                L(r.props, "label", u=>{
                    $(u) ? this.element.classList.add(F(void 0, "nol")) : (this.element.classList.remove(F(void 0, "nol")),
                    cn(a),
                    a.appendChild(ae(i, u)))
                }
                ),
                this.element.appendChild(a),
                this.labelElement = a;
                const p = i.createElement("div");
                p.classList.add(F("v")),
                this.element.appendChild(p),
                this.valueElement = p
            }
        }
        class At extends M {
            constructor(i, r) {
                const a = r.valueController.viewProps;
                super(Object.assign(Object.assign({}, r), {
                    view: new vn(i,{
                        props: r.props,
                        viewProps: a
                    }),
                    viewProps: a
                })),
                this.props = r.props,
                this.valueController = r.valueController,
                this.view.valueElement.appendChild(this.valueController.view.element)
            }
        }
        class mn extends M {
            constructor(i) {
                super(i),
                this.value = i.value
            }
        }
        class Le extends B {
            constructor(i) {
                super(i)
            }
            static create(i) {
                const r = {
                    completed: !0,
                    expanded: i,
                    expandedHeight: null,
                    shouldFixHeight: !1,
                    temporaryExpanded: null
                }
                  , a = B.createCore(r);
                return new Le(a)
            }
            get styleExpanded() {
                var i;
                return (i = this.get("temporaryExpanded")) !== null && i !== void 0 ? i : this.get("expanded")
            }
            get styleHeight() {
                if (!this.styleExpanded)
                    return "0";
                const i = this.get("expandedHeight");
                return this.get("shouldFixHeight") && !$(i) ? `${i}px` : "auto"
            }
            bindExpandedClass(i, r) {
                L(this, "expanded", ()=>{
                    this.styleExpanded ? i.classList.add(r) : i.classList.remove(r)
                }
                )
            }
        }
        function ti(o) {
            return Le.create(o)
        }
        function ei(o, i) {
            let r = 0;
            return Zn(i, ()=>{
                o.set("expandedHeight", null),
                o.set("temporaryExpanded", !0),
                oe(i),
                r = i.clientHeight,
                o.set("temporaryExpanded", null),
                oe(i)
            }
            ),
            r
        }
        function bn(o, i) {
            i.style.height = o.styleHeight
        }
        function le(o, i) {
            o.value("expanded").emitter.on("beforechange", ()=>{
                o.set("completed", !1),
                $(o.get("expandedHeight")) && o.set("expandedHeight", ei(o, i)),
                o.set("shouldFixHeight", !0),
                oe(i)
            }
            ),
            o.emitter.on("change", ()=>{
                bn(o, i)
            }
            ),
            bn(o, i),
            i.addEventListener("transitionend", r=>{
                r.propertyName === "height" && (o.set("shouldFixHeight", !1),
                o.set("expandedHeight", null),
                o.set("completed", !0))
            }
            )
        }
        class Me {
            constructor(i, r) {
                const a = z(r.viewName);
                this.element = i.createElement("div"),
                this.element.classList.add(a()),
                r.viewProps.bindClassModifiers(this.element)
            }
        }
        class $t extends mn {
            constructor(i, r) {
                const a = r.valueController.viewProps;
                super(Object.assign(Object.assign({}, r), {
                    value: r.valueController.value,
                    view: new vn(i,{
                        props: r.props,
                        viewProps: a
                    }),
                    viewProps: a
                })),
                this.props = r.props,
                this.valueController = r.valueController,
                this.view.valueElement.appendChild(this.valueController.view.element)
            }
        }
        const _n = z("");
        function fn(o, i) {
            return C(o, _n(void 0, i))
        }
        class gt extends B {
            constructor(i) {
                super(i)
            }
            static create(i) {
                var r, a;
                const p = i != null ? i : {}
                  , u = {
                    disabled: (r = p.disabled) !== null && r !== void 0 ? r : !1,
                    disposed: !1,
                    hidden: (a = p.hidden) !== null && a !== void 0 ? a : !1
                }
                  , c = B.createCore(u);
                return new gt(c)
            }
            bindClassModifiers(i) {
                L(this, "disabled", fn(i, "disabled")),
                L(this, "hidden", fn(i, "hidden"))
            }
            bindDisabled(i) {
                L(this, "disabled", r=>{
                    i.disabled = r
                }
                )
            }
            bindTabIndex(i) {
                L(this, "disabled", r=>{
                    i.tabIndex = r ? -1 : 0
                }
                )
            }
            handleDispose(i) {
                this.value("disposed").emitter.on("change", r=>{
                    r && i()
                }
                )
            }
        }
        class Ft {
            constructor() {
                this.disabled = !1,
                this.emitter = new w
            }
            dispose() {}
            tick() {
                this.disabled || this.emitter.emit("tick", {
                    sender: this
                })
            }
        }
        class ni {
            constructor(i, r) {
                this.disabled_ = !1,
                this.timerId_ = null,
                this.onTick_ = this.onTick_.bind(this),
                this.doc_ = i,
                this.emitter = new w,
                this.interval_ = r,
                this.setTimer_()
            }
            get disabled() {
                return this.disabled_
            }
            set disabled(i) {
                this.disabled_ = i,
                this.disabled_ ? this.clearTimer_() : this.setTimer_()
            }
            dispose() {
                this.clearTimer_()
            }
            clearTimer_() {
                if (this.timerId_ === null)
                    return;
                const i = this.doc_.defaultView;
                i && i.clearInterval(this.timerId_),
                this.timerId_ = null
            }
            setTimer_() {
                if (this.clearTimer_(),
                this.interval_ <= 0)
                    return;
                const i = this.doc_.defaultView;
                i && (this.timerId_ = i.setInterval(this.onTick_, this.interval_))
            }
            onTick_() {
                this.disabled_ || this.emitter.emit("tick", {
                    sender: this
                })
            }
        }
        class Se {
            constructor(i) {
                this.constraints = i
            }
            constrain(i) {
                return this.constraints.reduce((r,a)=>a.constrain(r), i)
            }
        }
        function wt(o, i) {
            if (o instanceof i)
                return o;
            if (o instanceof Se) {
                const r = o.constraints.reduce((a,p)=>a || (p instanceof i ? p : null), null);
                if (r)
                    return r
            }
            return null
        }
        class pe {
            constructor(i) {
                this.maxValue = i.max,
                this.minValue = i.min
            }
            constrain(i) {
                let r = i;
                return $(this.minValue) || (r = Math.max(r, this.minValue)),
                $(this.maxValue) || (r = Math.min(r, this.maxValue)),
                r
            }
        }
        class at {
            constructor(i) {
                this.step = i
            }
            constrain(i) {
                return (i < 0 ? -Math.round(-i / this.step) : Math.round(i / this.step)) * this.step
            }
        }
        const Tt = z("pop");
        class Ht {
            constructor(i, r) {
                this.element = i.createElement("div"),
                this.element.classList.add(Tt()),
                r.viewProps.bindClassModifiers(this.element),
                ft(r.shows, C(this.element, Tt(void 0, "v")))
            }
        }
        class ii {
            constructor(i, r) {
                this.shows = it(!1),
                this.viewProps = r.viewProps,
                this.view = new Ht(i,{
                    shows: this.shows,
                    viewProps: this.viewProps
                })
            }
        }
        const Ae = z("txt");
        class Te {
            constructor(i, r) {
                this.onChange_ = this.onChange_.bind(this),
                this.element = i.createElement("div"),
                this.element.classList.add(Ae()),
                r.viewProps.bindClassModifiers(this.element),
                this.props_ = r.props,
                this.props_.emitter.on("change", this.onChange_);
                const a = i.createElement("input");
                a.classList.add(Ae("i")),
                a.type = "text",
                r.viewProps.bindDisabled(a),
                this.element.appendChild(a),
                this.inputElement = a,
                r.value.emitter.on("change", this.onChange_),
                this.value_ = r.value,
                this.refresh()
            }
            refresh() {
                const i = this.props_.get("formatter");
                this.inputElement.value = i(this.value_.rawValue)
            }
            onChange_() {
                this.refresh()
            }
        }
        class De {
            constructor(i, r) {
                this.onInputChange_ = this.onInputChange_.bind(this),
                this.parser_ = r.parser,
                this.props = r.props,
                this.value = r.value,
                this.viewProps = r.viewProps,
                this.view = new Te(i,{
                    props: r.props,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.view.inputElement.addEventListener("change", this.onInputChange_)
            }
            onInputChange_(i) {
                const a = i.currentTarget.value
                  , p = this.parser_(a);
                $(p) || (this.value.rawValue = p),
                this.view.refresh()
            }
        }
        class si {
            constructor(i) {
                this.text = i
            }
            evaluate() {
                return Number(this.text)
            }
            toString() {
                return this.text
            }
        }
        const ri = {
            "**": (o,i)=>Math.pow(o, i),
            "*": (o,i)=>o * i,
            "/": (o,i)=>o / i,
            "%": (o,i)=>o % i,
            "+": (o,i)=>o + i,
            "-": (o,i)=>o - i,
            "<<": (o,i)=>o << i,
            ">>": (o,i)=>o >> i,
            ">>>": (o,i)=>o >>> i,
            "&": (o,i)=>o & i,
            "^": (o,i)=>o ^ i,
            "|": (o,i)=>o | i
        };
        class oi {
            constructor(i, r, a) {
                this.left = r,
                this.operator = i,
                this.right = a
            }
            evaluate() {
                const i = ri[this.operator];
                if (!i)
                    throw new Error(`unexpected binary operator: '${this.operator}`);
                return i(this.left.evaluate(), this.right.evaluate())
            }
            toString() {
                return ["b(", this.left.toString(), this.operator, this.right.toString(), ")"].join(" ")
            }
        }
        const ai = {
            "+": o=>o,
            "-": o=>-o,
            "~": o=>~o
        };
        class Ne {
            constructor(i, r) {
                this.operator = i,
                this.expression = r
            }
            evaluate() {
                const i = ai[this.operator];
                if (!i)
                    throw new Error(`unexpected unary operator: '${this.operator}`);
                return i(this.expression.evaluate())
            }
            toString() {
                return ["u(", this.operator, this.expression.toString(), ")"].join(" ")
            }
        }
        function qt(o) {
            return (i,r)=>{
                for (let a = 0; a < o.length; a++) {
                    const p = o[a](i, r);
                    if (p !== "")
                        return p
                }
                return ""
            }
        }
        function H(o, i) {
            var r;
            const a = o.substr(i).match(/^\s+/);
            return (r = a && a[0]) !== null && r !== void 0 ? r : ""
        }
        function ze(o, i) {
            const r = o.substr(i, 1);
            return r.match(/^[1-9]$/) ? r : ""
        }
        function J(o, i) {
            var r;
            const a = o.substr(i).match(/^[0-9]+/);
            return (r = a && a[0]) !== null && r !== void 0 ? r : ""
        }
        function li(o, i) {
            const r = J(o, i);
            if (r !== "")
                return r;
            const a = o.substr(i, 1);
            if (i += 1,
            a !== "-" && a !== "+")
                return "";
            const p = J(o, i);
            return p === "" ? "" : a + p
        }
        function xt(o, i) {
            const r = o.substr(i, 1);
            if (i += 1,
            r.toLowerCase() !== "e")
                return "";
            const a = li(o, i);
            return a === "" ? "" : r + a
        }
        function Re(o, i) {
            const r = o.substr(i, 1);
            if (r === "0")
                return r;
            const a = ze(o, i);
            return i += a.length,
            a === "" ? "" : a + J(o, i)
        }
        function de(o, i) {
            const r = Re(o, i);
            if (i += r.length,
            r === "")
                return "";
            const a = o.substr(i, 1);
            if (i += a.length,
            a !== ".")
                return "";
            const p = J(o, i);
            return i += p.length,
            r + a + p + xt(o, i)
        }
        function Be(o, i) {
            const r = o.substr(i, 1);
            if (i += r.length,
            r !== ".")
                return "";
            const a = J(o, i);
            return i += a.length,
            a === "" ? "" : r + a + xt(o, i)
        }
        function Oe(o, i) {
            const r = Re(o, i);
            return i += r.length,
            r === "" ? "" : r + xt(o, i)
        }
        const pi = qt([de, Be, Oe]);
        function di(o, i) {
            var r;
            const a = o.substr(i).match(/^[01]+/);
            return (r = a && a[0]) !== null && r !== void 0 ? r : ""
        }
        function ui(o, i) {
            const r = o.substr(i, 2);
            if (i += r.length,
            r.toLowerCase() !== "0b")
                return "";
            const a = di(o, i);
            return a === "" ? "" : r + a
        }
        function hi(o, i) {
            var r;
            const a = o.substr(i).match(/^[0-7]+/);
            return (r = a && a[0]) !== null && r !== void 0 ? r : ""
        }
        function Ie(o, i) {
            const r = o.substr(i, 2);
            if (i += r.length,
            r.toLowerCase() !== "0o")
                return "";
            const a = hi(o, i);
            return a === "" ? "" : r + a
        }
        function ci(o, i) {
            var r;
            const a = o.substr(i).match(/^[0-9a-f]+/i);
            return (r = a && a[0]) !== null && r !== void 0 ? r : ""
        }
        function vi(o, i) {
            const r = o.substr(i, 2);
            if (i += r.length,
            r.toLowerCase() !== "0x")
                return "";
            const a = ci(o, i);
            return a === "" ? "" : r + a
        }
        const Gt = qt([ui, Ie, vi])
          , gn = qt([Gt, pi]);
        function mi(o, i) {
            const r = gn(o, i);
            return i += r.length,
            r === "" ? null : {
                evaluable: new si(r),
                cursor: i
            }
        }
        function Ke(o, i) {
            const r = o.substr(i, 1);
            if (i += r.length,
            r !== "(")
                return null;
            const a = je(o, i);
            if (!a)
                return null;
            i = a.cursor,
            i += H(o, i).length;
            const p = o.substr(i, 1);
            return i += p.length,
            p !== ")" ? null : {
                evaluable: a.evaluable,
                cursor: i
            }
        }
        function bi(o, i) {
            return mi(o, i) || Ke(o, i)
        }
        function Ct(o, i) {
            const r = bi(o, i);
            if (r)
                return r;
            const a = o.substr(i, 1);
            if (i += a.length,
            a !== "+" && a !== "-" && a !== "~")
                return null;
            const p = Ct(o, i);
            return p ? (i = p.cursor,
            {
                cursor: i,
                evaluable: new Ne(a,p.evaluable)
            }) : null
        }
        function wn(o, i, r) {
            r += H(i, r).length;
            const a = o.filter(p=>i.startsWith(p, r))[0];
            return a ? (r += a.length,
            r += H(i, r).length,
            {
                cursor: r,
                operator: a
            }) : null
        }
        function xn(o, i) {
            return (r,a)=>{
                const p = o(r, a);
                if (!p)
                    return null;
                a = p.cursor;
                let u = p.evaluable;
                for (; ; ) {
                    const c = wn(i, r, a);
                    if (!c)
                        break;
                    a = c.cursor;
                    const m = o(r, a);
                    if (!m)
                        return null;
                    a = m.cursor,
                    u = new oi(c.operator,u,m.evaluable)
                }
                return u ? {
                    cursor: a,
                    evaluable: u
                } : null
            }
        }
        const _i = [["**"], ["*", "/", "%"], ["+", "-"], ["<<", ">>>", ">>"], ["&"], ["^"], ["|"]].reduce((o,i)=>xn(o, i), Ct);
        function je(o, i) {
            return i += H(o, i).length,
            _i(o, i)
        }
        function fi(o) {
            const i = je(o, 0);
            return !i || i.cursor + H(o, i.cursor).length !== o.length ? null : i.evaluable
        }
        function ue(o) {
            var i;
            const r = fi(o);
            return (i = r == null ? void 0 : r.evaluate()) !== null && i !== void 0 ? i : null
        }
        function Cn(o) {
            if (typeof o == "number")
                return o;
            if (typeof o == "string") {
                const i = ue(o);
                if (!$(i))
                    return i
            }
            return 0
        }
        function et(o) {
            return i=>i.toFixed(Math.max(Math.min(o, 20), 0))
        }
        function Dt(o, i) {
            for (; o.length < i; )
                o.push(void 0)
        }
        function gi(o) {
            const i = [];
            return Dt(i, o),
            it(i)
        }
        function wi(o) {
            const i = o.indexOf(void 0);
            return i < 0 ? o : o.slice(0, i)
        }
        function yn(o, i) {
            const r = [...wi(o), i];
            return r.length > o.length ? r.splice(0, r.length - o.length) : Dt(r, o.length),
            r
        }
        function Ue({primary: o, secondary: i, forward: r, backward: a}) {
            let p = !1;
            function u(c) {
                p || (p = !0,
                c(),
                p = !1)
            }
            o.emitter.on("change", c=>{
                u(()=>{
                    i.setRawValue(r(o, i), c.options)
                }
                )
            }
            ),
            i.emitter.on("change", c=>{
                u(()=>{
                    o.setRawValue(a(o, i), c.options)
                }
                ),
                u(()=>{
                    i.setRawValue(r(o, i), c.options)
                }
                )
            }
            ),
            u(()=>{
                i.setRawValue(r(o, i), {
                    forceEmit: !1,
                    last: !0
                })
            }
            )
        }
        function yt(o, i) {
            const r = o * (i.altKey ? .1 : 1) * (i.shiftKey ? 10 : 1);
            return i.upKey ? +r : i.downKey ? -r : 0
        }
        function Et(o) {
            return {
                altKey: o.altKey,
                downKey: o.key === "ArrowDown",
                shiftKey: o.shiftKey,
                upKey: o.key === "ArrowUp"
            }
        }
        function En(o) {
            return {
                altKey: o.altKey,
                downKey: o.key === "ArrowLeft",
                shiftKey: o.shiftKey,
                upKey: o.key === "ArrowRight"
            }
        }
        function Pn(o) {
            return o === "ArrowUp" || o === "ArrowDown"
        }
        function $e(o) {
            return Pn(o) || o === "ArrowLeft" || o === "ArrowRight"
        }
        function Fe(o, i) {
            const r = i.ownerDocument.defaultView
              , a = i.getBoundingClientRect();
            return {
                x: o.pageX - ((r && r.scrollX || 0) + a.left),
                y: o.pageY - ((r && r.scrollY || 0) + a.top)
            }
        }
        class he {
            constructor(i) {
                this.lastTouch_ = null,
                this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this),
                this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this),
                this.onMouseDown_ = this.onMouseDown_.bind(this),
                this.onTouchEnd_ = this.onTouchEnd_.bind(this),
                this.onTouchMove_ = this.onTouchMove_.bind(this),
                this.onTouchStart_ = this.onTouchStart_.bind(this),
                this.elem_ = i,
                this.emitter = new w,
                i.addEventListener("touchstart", this.onTouchStart_),
                i.addEventListener("touchmove", this.onTouchMove_),
                i.addEventListener("touchend", this.onTouchEnd_),
                i.addEventListener("mousedown", this.onMouseDown_)
            }
            computePosition_(i) {
                const r = this.elem_.getBoundingClientRect();
                return {
                    bounds: {
                        width: r.width,
                        height: r.height
                    },
                    point: i ? {
                        x: i.x,
                        y: i.y
                    } : null
                }
            }
            onMouseDown_(i) {
                var r;
                i.preventDefault(),
                (r = i.currentTarget) === null || r === void 0 || r.focus();
                const a = this.elem_.ownerDocument;
                a.addEventListener("mousemove", this.onDocumentMouseMove_),
                a.addEventListener("mouseup", this.onDocumentMouseUp_),
                this.emitter.emit("down", {
                    altKey: i.altKey,
                    data: this.computePosition_(Fe(i, this.elem_)),
                    sender: this,
                    shiftKey: i.shiftKey
                })
            }
            onDocumentMouseMove_(i) {
                this.emitter.emit("move", {
                    altKey: i.altKey,
                    data: this.computePosition_(Fe(i, this.elem_)),
                    sender: this,
                    shiftKey: i.shiftKey
                })
            }
            onDocumentMouseUp_(i) {
                const r = this.elem_.ownerDocument;
                r.removeEventListener("mousemove", this.onDocumentMouseMove_),
                r.removeEventListener("mouseup", this.onDocumentMouseUp_),
                this.emitter.emit("up", {
                    altKey: i.altKey,
                    data: this.computePosition_(Fe(i, this.elem_)),
                    sender: this,
                    shiftKey: i.shiftKey
                })
            }
            onTouchStart_(i) {
                i.preventDefault();
                const r = i.targetTouches.item(0)
                  , a = this.elem_.getBoundingClientRect();
                this.emitter.emit("down", {
                    altKey: i.altKey,
                    data: this.computePosition_(r ? {
                        x: r.clientX - a.left,
                        y: r.clientY - a.top
                    } : void 0),
                    sender: this,
                    shiftKey: i.shiftKey
                }),
                this.lastTouch_ = r
            }
            onTouchMove_(i) {
                const r = i.targetTouches.item(0)
                  , a = this.elem_.getBoundingClientRect();
                this.emitter.emit("move", {
                    altKey: i.altKey,
                    data: this.computePosition_(r ? {
                        x: r.clientX - a.left,
                        y: r.clientY - a.top
                    } : void 0),
                    sender: this,
                    shiftKey: i.shiftKey
                }),
                this.lastTouch_ = r
            }
            onTouchEnd_(i) {
                var r;
                const a = (r = i.targetTouches.item(0)) !== null && r !== void 0 ? r : this.lastTouch_
                  , p = this.elem_.getBoundingClientRect();
                this.emitter.emit("up", {
                    altKey: i.altKey,
                    data: this.computePosition_(a ? {
                        x: a.clientX - p.left,
                        y: a.clientY - p.top
                    } : void 0),
                    sender: this,
                    shiftKey: i.shiftKey
                })
            }
        }
        function R(o, i, r, a, p) {
            const u = (o - i) / (r - i);
            return a + u * (p - a)
        }
        function ut(o) {
            return String(o.toFixed(10)).split(".")[1].replace(/0+$/, "").length
        }
        function q(o, i, r) {
            return Math.min(Math.max(o, i), r)
        }
        const I = z("txt");
        class Y {
            constructor(i, r) {
                this.onChange_ = this.onChange_.bind(this),
                this.props_ = r.props,
                this.props_.emitter.on("change", this.onChange_),
                this.element = i.createElement("div"),
                this.element.classList.add(I(), I(void 0, "num")),
                r.arrayPosition && this.element.classList.add(I(void 0, r.arrayPosition)),
                r.viewProps.bindClassModifiers(this.element);
                const a = i.createElement("input");
                a.classList.add(I("i")),
                a.type = "text",
                r.viewProps.bindDisabled(a),
                this.element.appendChild(a),
                this.inputElement = a,
                this.onDraggingChange_ = this.onDraggingChange_.bind(this),
                this.dragging_ = r.dragging,
                this.dragging_.emitter.on("change", this.onDraggingChange_),
                this.element.classList.add(I()),
                this.inputElement.classList.add(I("i"));
                const p = i.createElement("div");
                p.classList.add(I("k")),
                this.element.appendChild(p),
                this.knobElement = p;
                const u = i.createElementNS(k, "svg");
                u.classList.add(I("g")),
                this.knobElement.appendChild(u);
                const c = i.createElementNS(k, "path");
                c.classList.add(I("gb")),
                u.appendChild(c),
                this.guideBodyElem_ = c;
                const m = i.createElementNS(k, "path");
                m.classList.add(I("gh")),
                u.appendChild(m),
                this.guideHeadElem_ = m;
                const S = i.createElement("div");
                S.classList.add(z("tt")()),
                this.knobElement.appendChild(S),
                this.tooltipElem_ = S,
                r.value.emitter.on("change", this.onChange_),
                this.value = r.value,
                this.refresh()
            }
            onDraggingChange_(i) {
                if (i.rawValue === null) {
                    this.element.classList.remove(I(void 0, "drg"));
                    return
                }
                this.element.classList.add(I(void 0, "drg"));
                const r = i.rawValue / this.props_.get("draggingScale")
                  , a = r + (r > 0 ? -1 : r < 0 ? 1 : 0)
                  , p = q(-a, -4, 4);
                this.guideHeadElem_.setAttributeNS(null, "d", [`M ${a + p},0 L ${a},4 L ${a + p},8`, `M ${r},-1 L ${r},9`].join(" ")),
                this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L ${r},4`);
                const u = this.props_.get("formatter");
                this.tooltipElem_.textContent = u(this.value.rawValue),
                this.tooltipElem_.style.left = `${r}px`
            }
            refresh() {
                const i = this.props_.get("formatter");
                this.inputElement.value = i(this.value.rawValue)
            }
            onChange_() {
                this.refresh()
            }
        }
        class Pt {
            constructor(i, r) {
                this.originRawValue_ = 0,
                this.onInputChange_ = this.onInputChange_.bind(this),
                this.onInputKeyDown_ = this.onInputKeyDown_.bind(this),
                this.onInputKeyUp_ = this.onInputKeyUp_.bind(this),
                this.onPointerDown_ = this.onPointerDown_.bind(this),
                this.onPointerMove_ = this.onPointerMove_.bind(this),
                this.onPointerUp_ = this.onPointerUp_.bind(this),
                this.baseStep_ = r.baseStep,
                this.parser_ = r.parser,
                this.props = r.props,
                this.value = r.value,
                this.viewProps = r.viewProps,
                this.dragging_ = it(null),
                this.view = new Y(i,{
                    arrayPosition: r.arrayPosition,
                    dragging: this.dragging_,
                    props: this.props,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.view.inputElement.addEventListener("change", this.onInputChange_),
                this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_),
                this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
                const a = new he(this.view.knobElement);
                a.emitter.on("down", this.onPointerDown_),
                a.emitter.on("move", this.onPointerMove_),
                a.emitter.on("up", this.onPointerUp_)
            }
            onInputChange_(i) {
                const a = i.currentTarget.value
                  , p = this.parser_(a);
                $(p) || (this.value.rawValue = p),
                this.view.refresh()
            }
            onInputKeyDown_(i) {
                const r = yt(this.baseStep_, Et(i));
                r !== 0 && this.value.setRawValue(this.value.rawValue + r, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onInputKeyUp_(i) {
                yt(this.baseStep_, Et(i)) !== 0 && this.value.setRawValue(this.value.rawValue, {
                    forceEmit: !0,
                    last: !0
                })
            }
            onPointerDown_() {
                this.originRawValue_ = this.value.rawValue,
                this.dragging_.rawValue = 0
            }
            computeDraggingValue_(i) {
                if (!i.point)
                    return null;
                const r = i.point.x - i.bounds.width / 2;
                return this.originRawValue_ + r * this.props.get("draggingScale")
            }
            onPointerMove_(i) {
                const r = this.computeDraggingValue_(i.data);
                r !== null && (this.value.setRawValue(r, {
                    forceEmit: !1,
                    last: !1
                }),
                this.dragging_.rawValue = this.value.rawValue - this.originRawValue_)
            }
            onPointerUp_(i) {
                const r = this.computeDraggingValue_(i.data);
                r !== null && (this.value.setRawValue(r, {
                    forceEmit: !0,
                    last: !0
                }),
                this.dragging_.rawValue = null)
            }
        }
        function He(o, i) {
            o.write(i)
        }
        function xi(o) {
            const i = o ? wt(o, at) : null;
            return i ? i.step : null
        }
        function Yt(o, i) {
            const r = o && wt(o, at);
            return r ? ut(r.step) : Math.max(ut(i), 2)
        }
        function qe(o) {
            const i = xi(o);
            return i != null ? i : 1
        }
        function Ci(o, i) {
            var r;
            const a = o && wt(o, at)
              , p = Math.abs((r = a == null ? void 0 : a.step) !== null && r !== void 0 ? r : i);
            return p === 0 ? .1 : Math.pow(10, Math.floor(Math.log10(p)) - 1)
        }
        class kn {
            constructor(i) {
                this.components = i.components,
                this.asm_ = i.assembly
            }
            constrain(i) {
                const r = this.asm_.toComponents(i).map((a,p)=>{
                    var u, c;
                    return (c = (u = this.components[p]) === null || u === void 0 ? void 0 : u.constrain(a)) !== null && c !== void 0 ? c : a
                }
                );
                return this.asm_.fromComponents(r)
            }
        }
        const Ge = z("pndtxt");
        class yi {
            constructor(i, r) {
                this.textViews = r.textViews,
                this.element = i.createElement("div"),
                this.element.classList.add(Ge()),
                this.textViews.forEach(a=>{
                    const p = i.createElement("div");
                    p.classList.add(Ge("a")),
                    p.appendChild(a.element),
                    this.element.appendChild(p)
                }
                )
            }
        }
        function ce(o, i, r) {
            return new Pt(o,{
                arrayPosition: r === 0 ? "fst" : r === i.axes.length - 1 ? "lst" : "mid",
                baseStep: i.axes[r].baseStep,
                parser: i.parser,
                props: i.axes[r].textProps,
                value: it(0, {
                    constraint: i.axes[r].constraint
                }),
                viewProps: i.viewProps
            })
        }
        class Ye {
            constructor(i, r) {
                this.value = r.value,
                this.viewProps = r.viewProps,
                this.acs_ = r.axes.map((a,p)=>ce(i, r, p)),
                this.acs_.forEach((a,p)=>{
                    Ue({
                        primary: this.value,
                        secondary: a.value,
                        forward: u=>r.assembly.toComponents(u.rawValue)[p],
                        backward: (u,c)=>{
                            const m = r.assembly.toComponents(u.rawValue);
                            return m[p] = c.rawValue,
                            r.assembly.fromComponents(m)
                        }
                    })
                }
                ),
                this.view = new yi(i,{
                    textViews: this.acs_.map(a=>a.view)
                })
            }
        }
        function Vn(o) {
            return "step"in o && !$(o.step) ? new at(o.step) : null
        }
        function Ln(o) {
            return "max"in o && !$(o.max) || "min"in o && !$(o.min) ? new pe({
                max: o.max,
                min: o.min
            }) : null
        }
        const Ei = {
            monitor: {
                defaultInterval: 200,
                defaultLineCount: 3
            }
        };
        class Pi {
            constructor() {
                this.emitter = new w,
                this.index_ = -1
            }
            get index() {
                return this.index_
            }
            set index(i) {
                this.index_ !== i && (this.index_ = i,
                this.emitter.emit("change", {
                    index: i,
                    sender: this
                }))
            }
        }
        const ht = z("grl");
        class ki {
            constructor(i, r) {
                this.onCursorChange_ = this.onCursorChange_.bind(this),
                this.onValueUpdate_ = this.onValueUpdate_.bind(this),
                this.element = i.createElement("div"),
                this.element.classList.add(ht()),
                r.viewProps.bindClassModifiers(this.element),
                this.formatter_ = r.formatter,
                this.minValue_ = r.minValue,
                this.maxValue_ = r.maxValue,
                this.cursor_ = r.cursor,
                this.cursor_.emitter.on("change", this.onCursorChange_);
                const a = i.createElementNS(k, "svg");
                a.classList.add(ht("g")),
                a.style.height = `calc(var(--bld-us) * ${r.lineCount})`,
                this.element.appendChild(a),
                this.svgElem_ = a;
                const p = i.createElementNS(k, "polyline");
                this.svgElem_.appendChild(p),
                this.lineElem_ = p;
                const u = i.createElement("div");
                u.classList.add(ht("t"), z("tt")()),
                this.element.appendChild(u),
                this.tooltipElem_ = u,
                r.value.emitter.on("change", this.onValueUpdate_),
                this.value = r.value,
                this.update_()
            }
            get graphElement() {
                return this.svgElem_
            }
            update_() {
                const i = this.svgElem_.getBoundingClientRect()
                  , r = this.value.rawValue.length - 1
                  , a = this.minValue_
                  , p = this.maxValue_
                  , u = [];
                this.value.rawValue.forEach((U,an)=>{
                    if (U === void 0)
                        return;
                    const qi = R(an, 0, r, 0, i.width)
                      , Gi = R(U, a, p, i.height, 0);
                    u.push([qi, Gi].join(","))
                }
                ),
                this.lineElem_.setAttributeNS(null, "points", u.join(" "));
                const c = this.tooltipElem_
                  , m = this.value.rawValue[this.cursor_.index];
                if (m === void 0) {
                    c.classList.remove(ht("t", "a"));
                    return
                }
                const S = R(this.cursor_.index, 0, r, 0, i.width)
                  , tt = R(m, a, p, i.height, 0);
                c.style.left = `${S}px`,
                c.style.top = `${tt}px`,
                c.textContent = `${this.formatter_(m)}`,
                c.classList.contains(ht("t", "a")) || (c.classList.add(ht("t", "a"), ht("t", "in")),
                oe(c),
                c.classList.remove(ht("t", "in")))
            }
            onValueUpdate_() {
                this.update_()
            }
            onCursorChange_() {
                this.update_()
            }
        }
        class Vi {
            constructor(i, r) {
                if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this),
                this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this),
                this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this),
                this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this),
                this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this),
                this.value = r.value,
                this.viewProps = r.viewProps,
                this.cursor_ = new Pi,
                this.view = new ki(i,{
                    cursor: this.cursor_,
                    formatter: r.formatter,
                    lineCount: r.lineCount,
                    maxValue: r.maxValue,
                    minValue: r.minValue,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                !Ve(i))
                    this.view.element.addEventListener("mousemove", this.onGraphMouseMove_),
                    this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
                else {
                    const a = new he(this.view.element);
                    a.emitter.on("down", this.onGraphPointerDown_),
                    a.emitter.on("move", this.onGraphPointerMove_),
                    a.emitter.on("up", this.onGraphPointerUp_)
                }
            }
            onGraphMouseLeave_() {
                this.cursor_.index = -1
            }
            onGraphMouseMove_(i) {
                const r = this.view.element.getBoundingClientRect();
                this.cursor_.index = Math.floor(R(i.offsetX, 0, r.width, 0, this.value.rawValue.length))
            }
            onGraphPointerDown_(i) {
                this.onGraphPointerMove_(i)
            }
            onGraphPointerMove_(i) {
                if (!i.data.point) {
                    this.cursor_.index = -1;
                    return
                }
                this.cursor_.index = Math.floor(R(i.data.point.x, 0, i.data.bounds.width, 0, this.value.rawValue.length))
            }
            onGraphPointerUp_() {
                this.cursor_.index = -1
            }
        }
        class Xe {
            constructor(i) {
                this.controller_ = i
            }
            get disabled() {
                return this.controller_.viewProps.get("disabled")
            }
            set disabled(i) {
                this.controller_.viewProps.set("disabled", i)
            }
            get title() {
                var i;
                return (i = this.controller_.props.get("title")) !== null && i !== void 0 ? i : ""
            }
            set title(i) {
                this.controller_.props.set("title", i)
            }
            on(i, r) {
                const a = r.bind(this);
                return this.controller_.emitter.on(i, ()=>{
                    a(new O(this))
                }
                ),
                this
            }
        }
        class Xt extends O {
            constructor(i, r, a) {
                super(i),
                this.cell = r,
                this.index = a
            }
        }
        class Li extends N {
            constructor(i) {
                super(i),
                this.cellToApiMap_ = new Map,
                this.emitter_ = new w;
                const r = this.controller_.valueController;
                r.cellControllers.forEach((a,p)=>{
                    const u = new Xe(a);
                    this.cellToApiMap_.set(a, u),
                    a.emitter.on("click", ()=>{
                        const c = p % r.size[0]
                          , m = Math.floor(p / r.size[0]);
                        this.emitter_.emit("click", {
                            event: new Xt(this,u,[c, m])
                        })
                    }
                    )
                }
                )
            }
            cell(i, r) {
                const a = this.controller_.valueController
                  , p = a.cellControllers[r * a.size[0] + i];
                return this.cellToApiMap_.get(p)
            }
            on(i, r) {
                const a = r.bind(this);
                return this.emitter_.on(i, p=>{
                    a(p.event)
                }
                ),
                this
            }
        }
        class Nt {
            constructor(i, r) {
                this.size = r.size;
                const [a,p] = this.size
                  , u = [];
                for (let c = 0; c < p; c++)
                    for (let m = 0; m < a; m++) {
                        const S = new W(i,{
                            props: B.fromObject(Object.assign({}, r.cellConfig(m, c))),
                            viewProps: gt.create()
                        });
                        u.push(S)
                    }
                this.cellCs_ = u,
                this.viewProps = gt.create(),
                this.viewProps.handleDispose(()=>{
                    this.cellCs_.forEach(c=>{
                        c.viewProps.set("disposed", !0)
                    }
                    )
                }
                ),
                this.view = new Me(i,{
                    viewProps: this.viewProps,
                    viewName: "btngrid"
                }),
                this.view.element.style.gridTemplateColumns = `repeat(${a}, 1fr)`,
                this.cellCs_.forEach(c=>{
                    this.view.element.appendChild(c.view.element)
                }
                )
            }
            get cellControllers() {
                return this.cellCs_
            }
        }
        const Mi = {
            id: "buttongrid",
            type: "blade",
            css: ".tp-cbzv_b,.tp-rslv_k,.tp-radv_b,.tp-cbzgv{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-cbzv_b,.tp-rslv_k,.tp-radv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-cbzv_b:hover,.tp-rslv_k:hover,.tp-radv_b:hover{background-color:var(--btn-bg-h)}.tp-cbzv_b:focus,.tp-rslv_k:focus,.tp-radv_b:focus{background-color:var(--btn-bg-f)}.tp-cbzv_b:active,.tp-rslv_k:active,.tp-radv_b:active{background-color:var(--btn-bg-a)}.tp-cbzv_b:disabled,.tp-rslv_k:disabled,.tp-radv_b:disabled{opacity:0.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:0.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:0.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:0.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1 * var(--cnt-h-p));position:absolute;right:calc(-1 * var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:0.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us) * 5);width:100%}.tp-cbzgv_u{opacity:0.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:transparent;stroke:var(--in-fg)}.tp-cbzgv_v{opacity:0.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:0.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity 0.2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:0.2em;opacity:0.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:0.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:'';height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:'';height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px) / -2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:0.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:0.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:0.5}.tp-radgridv .tp-radv_b{border-radius:0}",
            accept(o) {
                const i = f
                  , r = St(o, {
                    cells: i.required.function,
                    size: i.required.array(i.required.number),
                    view: i.required.constant("buttongrid"),
                    label: i.optional.string
                });
                return r ? {
                    params: r
                } : null
            },
            controller(o) {
                return new At(o.document,{
                    blade: o.blade,
                    props: B.fromObject({
                        label: o.params.label
                    }),
                    valueController: new Nt(o.document,{
                        cellConfig: o.params.cells,
                        size: o.params.size
                    })
                })
            },
            api(o) {
                return !(o.controller instanceof At) || !(o.controller.valueController instanceof Nt) ? null : new Li(o.controller)
            }
        };
        class We extends N {
            get label() {
                return this.controller_.props.get("label")
            }
            set label(i) {
                this.controller_.props.set("label", i)
            }
            get value() {
                return this.controller_.valueController.value.rawValue
            }
            set value(i) {
                this.controller_.valueController.value.rawValue = i
            }
            on(i, r) {
                const a = r.bind(this);
                return this.controller_.valueController.value.emitter.on(i, p=>{
                    a(new _t(this,p.rawValue,void 0,p.options.last))
                }
                ),
                this
            }
        }
        function X(o, i, r) {
            return o * (1 - r) + i * r
        }
        const Si = 20
          , Ai = .001
          , Je = 100;
        function Ti(o, i) {
            let r = .25
              , a = .5
              , p = -1;
            for (let u = 0; u < Si; u++) {
                const [c,m] = o.curve(a);
                if (a += r * (c < i ? 1 : -1),
                p = m,
                r *= .5,
                Math.abs(i - c) < Ai)
                    break
            }
            return p
        }
        class ct {
            constructor(i=0, r=0, a=1, p=1) {
                this.cache_ = [],
                this.comps_ = [i, r, a, p]
            }
            get x1() {
                return this.comps_[0]
            }
            get y1() {
                return this.comps_[1]
            }
            get x2() {
                return this.comps_[2]
            }
            get y2() {
                return this.comps_[3]
            }
            static isObject(i) {
                return $(i) || !Array.isArray(i) ? !1 : typeof i[0] == "number" && typeof i[1] == "number" && typeof i[2] == "number" && typeof i[3] == "number"
            }
            static equals(i, r) {
                return i.x1 === r.x1 && i.y1 === r.y1 && i.x2 === r.x2 && i.y2 === r.y2
            }
            curve(i) {
                const r = X(0, this.x1, i)
                  , a = X(0, this.y1, i)
                  , p = X(this.x1, this.x2, i)
                  , u = X(this.y1, this.y2, i)
                  , c = X(this.x2, 1, i)
                  , m = X(this.y2, 1, i)
                  , S = X(r, p, i)
                  , tt = X(a, u, i)
                  , U = X(p, c, i)
                  , an = X(u, m, i);
                return [X(S, U, i), X(tt, an, i)]
            }
            y(i) {
                if (this.cache_.length === 0) {
                    const r = [];
                    for (let a = 0; a < Je; a++)
                        r.push(Ti(this, R(a, 0, Je - 1, 0, 1)));
                    this.cache_ = r
                }
                return this.cache_[Math.round(R(q(i, 0, 1), 0, 1, 0, Je - 1))]
            }
            toObject() {
                return [this.comps_[0], this.comps_[1], this.comps_[2], this.comps_[3]]
            }
        }
        const Mn = {
            toComponents: o=>o.toObject(),
            fromComponents: o=>new ct(...o)
        };
        function Di(o) {
            const i = et(2);
            return `cubic-bezier(${o.toObject().map(a=>i(a)).join(", ")})`
        }
        const Sn = [0, .5, .5, 1];
        function Ni(o) {
            const i = o.match(/^cubic-bezier\s*\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\)$/);
            if (!i)
                return new ct(...Sn);
            const r = [i[1], i[2], i[3], i[4]].reduce((a,p)=>{
                if (!a)
                    return null;
                const u = Number(p);
                return isNaN(u) ? null : [...a, u]
            }
            , []);
            return new ct(...r != null ? r : Sn)
        }
        const kt = z("cbz");
        class zi {
            constructor(i, r) {
                this.element = i.createElement("div"),
                this.element.classList.add(kt()),
                r.viewProps.bindClassModifiers(this.element),
                r.foldable.bindExpandedClass(this.element, kt(void 0, "expanded")),
                L(r.foldable, "completed", C(this.element, kt(void 0, "cpl")));
                const a = i.createElement("div");
                a.classList.add(kt("h")),
                this.element.appendChild(a);
                const p = i.createElement("button");
                p.classList.add(kt("b")),
                r.viewProps.bindDisabled(p);
                const u = i.createElementNS(k, "svg");
                u.innerHTML = '<path d="M2 13C8 13 8 3 14 3"/>',
                p.appendChild(u),
                a.appendChild(p),
                this.buttonElement = p;
                const c = i.createElement("div");
                if (c.classList.add(kt("t")),
                a.appendChild(c),
                this.textElement = c,
                r.pickerLayout === "inline") {
                    const m = i.createElement("div");
                    m.classList.add(kt("p")),
                    this.element.appendChild(m),
                    this.pickerElement = m
                } else
                    this.pickerElement = null
            }
        }
        const Qe = z("cbzp");
        class Ri {
            constructor(i, r) {
                this.element = i.createElement("div"),
                this.element.classList.add(Qe()),
                r.viewProps.bindClassModifiers(this.element);
                const a = i.createElement("div");
                a.classList.add(Qe("g")),
                this.element.appendChild(a),
                this.graphElement = a;
                const p = i.createElement("div");
                p.classList.add(Qe("t")),
                this.element.appendChild(p),
                this.textElement = p
            }
        }
        function An(o, i) {
            const r = new MutationObserver(p=>{
                for (const u of p)
                    u.type === "childList" && u.addedNodes.forEach(c=>{
                        !c.contains(c) || (i(),
                        r.disconnect())
                    }
                    )
            }
            )
              , a = o.ownerDocument;
            r.observe(a.body, {
                attributes: !0,
                childList: !0,
                subtree: !0
            })
        }
        const vt = z("cbzg");
        function Tn(o, i) {
            return r=>i(o(r))
        }
        class Bi {
            constructor(i, r) {
                this.element = i.createElement("div"),
                this.element.classList.add(vt()),
                r.viewProps.bindClassModifiers(this.element),
                r.viewProps.bindTabIndex(this.element);
                const a = i.createElement("div");
                a.classList.add(vt("p")),
                this.element.appendChild(a),
                this.previewElement = a;
                const p = i.createElementNS(k, "svg");
                p.classList.add(vt("g")),
                this.element.appendChild(p),
                this.svgElem_ = p;
                const u = i.createElementNS(k, "path");
                u.classList.add(vt("u")),
                this.svgElem_.appendChild(u),
                this.guideElem_ = u;
                const c = i.createElementNS(k, "polyline");
                c.classList.add(vt("l")),
                this.svgElem_.appendChild(c),
                this.lineElem_ = c,
                this.handleElems_ = [i.createElement("div"), i.createElement("div")],
                this.handleElems_.forEach(m=>{
                    m.classList.add(vt("h")),
                    this.element.appendChild(m)
                }
                ),
                this.vectorElems_ = [i.createElementNS(k, "line"), i.createElementNS(k, "line")],
                this.vectorElems_.forEach(m=>{
                    m.classList.add(vt("v")),
                    this.svgElem_.appendChild(m)
                }
                ),
                this.value_ = r.value,
                this.value_.emitter.on("change", this.onValueChange_.bind(this)),
                this.sel_ = r.selection,
                this.handleElems_.forEach((m,S)=>{
                    ft(this.sel_, Tn(tt=>tt === S, C(m, vt("h", "sel"))))
                }
                ),
                An(this.element, ()=>{
                    this.refresh()
                }
                )
            }
            getVertMargin_(i) {
                return i * .25
            }
            valueToPosition(i, r) {
                const a = this.element.getBoundingClientRect()
                  , p = a.width
                  , u = a.height
                  , c = this.getVertMargin_(u);
                return {
                    x: R(i, 0, 1, 0, p),
                    y: R(r, 0, 1, u - c, c)
                }
            }
            positionToValue(i, r) {
                const a = this.element.getBoundingClientRect()
                  , p = a.width
                  , u = a.height
                  , c = this.getVertMargin_(u);
                return {
                    x: q(R(i, 0, p, 0, 1), 0, 1),
                    y: R(r, u - c, c, 0, 1)
                }
            }
            refresh() {
                this.guideElem_.setAttributeNS(null, "d", [0, 1].map(u=>{
                    const c = this.valueToPosition(0, u)
                      , m = this.valueToPosition(1, u);
                    return [`M ${c.x},${c.y}`, `L ${m.x},${m.y}`].join(" ")
                }
                ).join(" "));
                const i = this.value_.rawValue
                  , r = [];
                let a = 0;
                for (; ; ) {
                    const u = this.valueToPosition(...i.curve(a));
                    if (r.push([u.x, u.y].join(",")),
                    a >= 1)
                        break;
                    a = Math.min(a + .05, 1)
                }
                this.lineElem_.setAttributeNS(null, "points", r.join(" "));
                const p = i.toObject();
                [0, 1].forEach(u=>{
                    const c = this.valueToPosition(u, u)
                      , m = this.valueToPosition(p[u * 2], p[u * 2 + 1])
                      , S = this.vectorElems_[u];
                    S.setAttributeNS(null, "x1", String(c.x)),
                    S.setAttributeNS(null, "y1", String(c.y)),
                    S.setAttributeNS(null, "x2", String(m.x)),
                    S.setAttributeNS(null, "y2", String(m.y));
                    const tt = this.handleElems_[u];
                    tt.style.left = `${m.x}px`,
                    tt.style.top = `${m.y}px`
                }
                )
            }
            onValueChange_() {
                this.refresh()
            }
        }
        const Dn = 24
          , Nn = 400
          , Ze = 1e3
          , zt = z("cbzprv");
        class lt {
            constructor(i, r) {
                this.stopped_ = !0,
                this.startTime_ = -1,
                this.onDispose_ = this.onDispose_.bind(this),
                this.onTimer_ = this.onTimer_.bind(this),
                this.onValueChange_ = this.onValueChange_.bind(this),
                this.element = i.createElement("div"),
                this.element.classList.add(zt()),
                r.viewProps.bindClassModifiers(this.element);
                const a = i.createElementNS(k, "svg");
                a.classList.add(zt("g")),
                this.element.appendChild(a),
                this.svgElem_ = a;
                const p = i.createElementNS(k, "path");
                p.classList.add(zt("t")),
                this.svgElem_.appendChild(p),
                this.ticksElem_ = p;
                const u = i.createElement("div");
                u.classList.add(zt("m")),
                this.element.appendChild(u),
                this.markerElem_ = u,
                this.value_ = r.value,
                this.value_.emitter.on("change", this.onValueChange_),
                r.viewProps.handleDispose(this.onDispose_),
                An(this.element, ()=>{
                    this.refresh()
                }
                )
            }
            play() {
                this.stop(),
                this.updateMarker_(0),
                this.markerElem_.classList.add(zt("m", "a")),
                this.startTime_ = new Date().getTime() + Nn,
                this.stopped_ = !1,
                requestAnimationFrame(this.onTimer_)
            }
            stop() {
                this.stopped_ = !0,
                this.markerElem_.classList.remove(zt("m", "a"))
            }
            onDispose_() {
                this.stop()
            }
            updateMarker_(i) {
                const r = this.value_.rawValue.y(q(i, 0, 1));
                this.markerElem_.style.left = `${r * 100}%`
            }
            refresh() {
                const i = this.svgElem_.getBoundingClientRect()
                  , r = i.width
                  , a = i.height
                  , p = []
                  , u = this.value_.rawValue;
                for (let c = 0; c < Dn; c++) {
                    const m = R(c, 0, Dn - 1, 0, 1)
                      , S = R(u.y(m), 0, 1, 0, r);
                    p.push(`M ${S},0 v ${a}`)
                }
                this.ticksElem_.setAttributeNS(null, "d", p.join(" "))
            }
            onTimer_() {
                if (this.startTime_ === null)
                    return;
                const i = new Date().getTime() - this.startTime_
                  , r = i / Ze;
                this.updateMarker_(r),
                i > Ze + Nn && this.stop(),
                this.stopped_ || requestAnimationFrame(this.onTimer_)
            }
            onValueChange_() {
                this.refresh(),
                this.play()
            }
        }
        function ve(o, i, r, a) {
            const p = r - o
              , u = a - i;
            return Math.sqrt(p * p + u * u)
        }
        function Oi(o, i, r, a) {
            const p = ve(o, i, r, a)
              , u = Math.atan2(a - i, r - o)
              , c = Math.round(u / (Math.PI / 4)) * Math.PI / 4;
            return {
                x: o + Math.cos(c) * p,
                y: i + Math.sin(c) * p
            }
        }
        class G {
            constructor(i, r) {
                this.onKeyDown_ = this.onKeyDown_.bind(this),
                this.onKeyUp_ = this.onKeyUp_.bind(this),
                this.onPointerDown_ = this.onPointerDown_.bind(this),
                this.onPointerMove_ = this.onPointerMove_.bind(this),
                this.onPointerUp_ = this.onPointerUp_.bind(this),
                this.baseStep_ = r.baseStep,
                this.value = r.value,
                this.sel_ = it(0),
                this.viewProps = r.viewProps,
                this.view = new Bi(i,{
                    selection: this.sel_,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.view.element.addEventListener("keydown", this.onKeyDown_),
                this.view.element.addEventListener("keyup", this.onKeyUp_),
                this.prevView_ = new lt(i,{
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.prevView_.element.addEventListener("mousedown", p=>{
                    p.stopImmediatePropagation(),
                    p.preventDefault(),
                    this.prevView_.play()
                }
                ),
                this.view.previewElement.appendChild(this.prevView_.element);
                const a = new he(this.view.element);
                a.emitter.on("down", this.onPointerDown_),
                a.emitter.on("move", this.onPointerMove_),
                a.emitter.on("up", this.onPointerUp_)
            }
            refresh() {
                this.view.refresh(),
                this.prevView_.refresh(),
                this.prevView_.play()
            }
            updateValue_(i, r, a) {
                const p = this.sel_.rawValue
                  , u = this.value.rawValue.toObject()
                  , c = this.view.positionToValue(i.x, i.y)
                  , m = r ? Oi(p, p, c.x, c.y) : c;
                u[p * 2] = m.x,
                u[p * 2 + 1] = m.y,
                this.value.setRawValue(new ct(...u), a)
            }
            onPointerDown_(i) {
                const r = i.data;
                if (!r.point)
                    return;
                const a = this.value.rawValue
                  , p = this.view.valueToPosition(a.x1, a.y1)
                  , u = ve(r.point.x, r.point.y, p.x, p.y)
                  , c = this.view.valueToPosition(a.x2, a.y2)
                  , m = ve(r.point.x, r.point.y, c.x, c.y);
                this.sel_.rawValue = u <= m ? 0 : 1,
                this.updateValue_(r.point, i.shiftKey, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onPointerMove_(i) {
                const r = i.data;
                !r.point || this.updateValue_(r.point, i.shiftKey, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onPointerUp_(i) {
                const r = i.data;
                !r.point || this.updateValue_(r.point, i.shiftKey, {
                    forceEmit: !0,
                    last: !0
                })
            }
            onKeyDown_(i) {
                $e(i.key) && i.preventDefault();
                const r = this.sel_.rawValue
                  , a = this.value.rawValue.toObject();
                a[r * 2] += yt(this.baseStep_, En(i)),
                a[r * 2 + 1] += yt(this.baseStep_, Et(i)),
                this.value.setRawValue(new ct(...a), {
                    forceEmit: !1,
                    last: !1
                })
            }
            onKeyUp_(i) {
                $e(i.key) && i.preventDefault();
                const r = yt(this.baseStep_, En(i))
                  , a = yt(this.baseStep_, Et(i));
                r === 0 && a === 0 || this.value.setRawValue(this.value.rawValue, {
                    forceEmit: !0,
                    last: !0
                })
            }
        }
        class Ii {
            constructor(i, r) {
                this.value = r.value,
                this.viewProps = r.viewProps,
                this.view = new Ri(i,{
                    viewProps: this.viewProps
                }),
                this.gc_ = new G(i,{
                    baseStep: r.axis.baseStep,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.view.graphElement.appendChild(this.gc_.view.element);
                const a = Object.assign(Object.assign({}, r.axis), {
                    constraint: new pe({
                        max: 1,
                        min: 0
                    })
                })
                  , p = Object.assign(Object.assign({}, r.axis), {
                    constraint: void 0
                });
                this.tc_ = new Ye(i,{
                    assembly: Mn,
                    axes: [a, p, a, p],
                    parser: ue,
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.view.textElement.appendChild(this.tc_.view.element)
            }
            get allFocusableElements() {
                return [this.gc_.view.element, ...this.tc_.view.textViews.map(i=>i.inputElement)]
            }
            refresh() {
                this.gc_.refresh()
            }
        }
        class Wt {
            constructor(i, r) {
                this.onButtonBlur_ = this.onButtonBlur_.bind(this),
                this.onButtonClick_ = this.onButtonClick_.bind(this),
                this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this),
                this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this),
                this.value = r.value,
                this.viewProps = r.viewProps,
                this.foldable_ = ti(r.expanded),
                this.view = new zi(i,{
                    foldable: this.foldable_,
                    pickerLayout: r.pickerLayout,
                    viewProps: this.viewProps
                }),
                this.view.buttonElement.addEventListener("blur", this.onButtonBlur_),
                this.view.buttonElement.addEventListener("click", this.onButtonClick_),
                this.tc_ = new De(i,{
                    parser: Ni,
                    props: B.fromObject({
                        formatter: Di
                    }),
                    value: this.value,
                    viewProps: this.viewProps
                }),
                this.view.textElement.appendChild(this.tc_.view.element),
                this.popC_ = r.pickerLayout === "popup" ? new ii(i,{
                    viewProps: this.viewProps
                }) : null;
                const a = new Ii(i,{
                    axis: r.axis,
                    value: this.value,
                    viewProps: this.viewProps
                });
                a.allFocusableElements.forEach(p=>{
                    p.addEventListener("blur", this.onPopupChildBlur_),
                    p.addEventListener("keydown", this.onPopupChildKeydown_)
                }
                ),
                this.pickerC_ = a,
                this.popC_ ? (this.view.element.appendChild(this.popC_.view.element),
                this.popC_.view.element.appendChild(this.pickerC_.view.element),
                ft(this.popC_.shows, p=>{
                    p && a.refresh()
                }
                ),
                Ue({
                    primary: this.foldable_.value("expanded"),
                    secondary: this.popC_.shows,
                    forward: p=>p.rawValue,
                    backward: (p,u)=>u.rawValue
                })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element),
                le(this.foldable_, this.view.pickerElement))
            }
            onButtonBlur_(i) {
                if (!this.popC_)
                    return;
                const r = i.relatedTarget;
                (!r || !this.popC_.view.element.contains(r)) && (this.popC_.shows.rawValue = !1)
            }
            onButtonClick_() {
                this.foldable_.set("expanded", !this.foldable_.get("expanded")),
                this.foldable_.get("expanded") && this.pickerC_.allFocusableElements[0].focus()
            }
            onPopupChildBlur_(i) {
                if (!this.popC_)
                    return;
                const r = this.popC_.view.element
                  , a = Ut(i);
                a && r.contains(a) || a && a === this.view.buttonElement && !Ve(r.ownerDocument) || (this.popC_.shows.rawValue = !1)
            }
            onPopupChildKeydown_(i) {
                !this.popC_ || i.key === "Escape" && (this.popC_.shows.rawValue = !1)
            }
        }
        function zn() {
            return new kn({
                assembly: Mn,
                components: [0, 1, 2, 3].map(o=>o % 2 === 0 ? new pe({
                    min: 0,
                    max: 1
                }) : void 0)
            })
        }
        const tn = {
            id: "cubic-bezier",
            type: "blade",
            css: ".tp-cbzv_b,.tp-rslv_k,.tp-radv_b,.tp-cbzgv{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-cbzv_b,.tp-rslv_k,.tp-radv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-cbzv_b:hover,.tp-rslv_k:hover,.tp-radv_b:hover{background-color:var(--btn-bg-h)}.tp-cbzv_b:focus,.tp-rslv_k:focus,.tp-radv_b:focus{background-color:var(--btn-bg-f)}.tp-cbzv_b:active,.tp-rslv_k:active,.tp-radv_b:active{background-color:var(--btn-bg-a)}.tp-cbzv_b:disabled,.tp-rslv_k:disabled,.tp-radv_b:disabled{opacity:0.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:0.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:0.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:0.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1 * var(--cnt-h-p));position:absolute;right:calc(-1 * var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:0.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us) * 5);width:100%}.tp-cbzgv_u{opacity:0.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:transparent;stroke:var(--in-fg)}.tp-cbzgv_v{opacity:0.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:0.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity 0.2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:0.2em;opacity:0.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:0.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:'';height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:'';height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px) / -2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:0.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:0.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:0.5}.tp-radgridv .tp-radv_b{border-radius:0}",
            accept(o) {
                const i = f
                  , r = St(o, {
                    value: i.required.array(i.required.number),
                    view: i.required.constant("cubicbezier"),
                    expanded: i.optional.boolean,
                    label: i.optional.string,
                    picker: i.optional.custom(a=>a === "inline" || a === "popup" ? a : void 0)
                });
                return r ? {
                    params: r
                } : null
            },
            controller(o) {
                var i, r;
                const a = new ct(...o.params.value)
                  , p = it(a, {
                    constraint: zn(),
                    equals: ct.equals
                })
                  , u = new Wt(o.document,{
                    axis: {
                        baseStep: .1,
                        textProps: B.fromObject({
                            draggingScale: .01,
                            formatter: et(2)
                        })
                    },
                    expanded: (i = o.params.expanded) !== null && i !== void 0 ? i : !1,
                    pickerLayout: (r = o.params.picker) !== null && r !== void 0 ? r : "popup",
                    value: p,
                    viewProps: o.viewProps
                });
                return new $t(o.document,{
                    blade: o.blade,
                    props: B.fromObject({
                        label: o.params.label
                    }),
                    valueController: u
                })
            },
            api(o) {
                return !(o.controller instanceof $t) || !(o.controller.valueController instanceof Wt) ? null : new We(o.controller)
            }
        };
        class Rn extends N {
            begin() {
                this.controller_.valueController.begin()
            }
            end() {
                this.controller_.valueController.end()
            }
        }
        const Bn = 20;
        class Ki {
            constructor() {
                this.start_ = null,
                this.duration_ = 0,
                this.fps_ = null,
                this.frameCount_ = 0,
                this.timestamps_ = []
            }
            get duration() {
                return this.duration_
            }
            get fps() {
                return this.fps_
            }
            begin(i) {
                this.start_ = i.getTime()
            }
            calculateFps_(i) {
                if (this.timestamps_.length === 0)
                    return null;
                const r = this.timestamps_[0];
                return 1e3 * (this.frameCount_ - r.frameCount) / (i - r.time)
            }
            compactTimestamps_() {
                if (this.timestamps_.length <= Bn)
                    return;
                const i = this.timestamps_.length - Bn;
                this.timestamps_.splice(0, i);
                const r = this.timestamps_[0].frameCount;
                this.timestamps_.forEach(a=>{
                    a.frameCount -= r
                }
                ),
                this.frameCount_ -= r
            }
            end(i) {
                if (this.start_ === null)
                    return;
                const r = i.getTime();
                this.duration_ = r - this.start_,
                this.start_ = null,
                this.fps_ = this.calculateFps_(r),
                this.timestamps_.push({
                    frameCount: this.frameCount_,
                    time: r
                }),
                ++this.frameCount_,
                this.compactTimestamps_()
            }
        }
        const Jt = z("fps");
        class Qt {
            constructor(i, r) {
                this.element = i.createElement("div"),
                this.element.classList.add(Jt()),
                r.viewProps.bindClassModifiers(this.element),
                this.graphElement = i.createElement("div"),
                this.graphElement.classList.add(Jt("g")),
                this.element.appendChild(this.graphElement);
                const a = i.createElement("div");
                a.classList.add(Jt("l")),
                this.element.appendChild(a);
                const p = i.createElement("span");
                p.classList.add(Jt("v")),
                p.textContent = "--",
                a.appendChild(p),
                this.valueElement = p;
                const u = i.createElement("span");
                u.classList.add(Jt("u")),
                u.textContent = "FPS",
                a.appendChild(u)
            }
        }
        class j {
            constructor(i, r) {
                this.stopwatch_ = new Ki,
                this.onTick_ = this.onTick_.bind(this),
                this.ticker_ = r.ticker,
                this.ticker_.emitter.on("tick", this.onTick_),
                this.value_ = r.value,
                this.viewProps = r.viewProps,
                this.view = new Qt(i,{
                    viewProps: this.viewProps
                }),
                this.graphC_ = new Vi(i,{
                    formatter: et(0),
                    lineCount: r.lineCount,
                    maxValue: r.maxValue,
                    minValue: r.minValue,
                    value: this.value_,
                    viewProps: this.viewProps
                }),
                this.view.graphElement.appendChild(this.graphC_.view.element),
                this.viewProps.handleDispose(()=>{
                    this.graphC_.viewProps.set("disposed", !0),
                    this.ticker_.dispose()
                }
                )
            }
            begin() {
                this.stopwatch_.begin(new Date)
            }
            end() {
                this.stopwatch_.end(new Date)
            }
            onTick_() {
                const i = this.stopwatch_.fps;
                if (i !== null) {
                    const r = this.value_.rawValue;
                    this.value_.rawValue = yn(r, i),
                    this.view.valueElement.textContent = i.toFixed(0)
                }
            }
        }
        function Zt(o, i) {
            return i === 0 ? new Ft : new ni(o,i != null ? i : Ei.monitor.defaultInterval)
        }
        const pt = {
            id: "fpsgraph",
            type: "blade",
            accept(o) {
                const i = f
                  , r = St(o, {
                    view: i.required.constant("fpsgraph"),
                    interval: i.optional.number,
                    label: i.optional.string,
                    lineCount: i.optional.number,
                    max: i.optional.number,
                    min: i.optional.number
                });
                return r ? {
                    params: r
                } : null
            },
            controller(o) {
                var i, r, a, p;
                const u = (i = o.params.interval) !== null && i !== void 0 ? i : 500;
                return new At(o.document,{
                    blade: o.blade,
                    props: B.fromObject({
                        label: o.params.label
                    }),
                    valueController: new j(o.document,{
                        lineCount: (r = o.params.lineCount) !== null && r !== void 0 ? r : 2,
                        maxValue: (a = o.params.max) !== null && a !== void 0 ? a : 90,
                        minValue: (p = o.params.min) !== null && p !== void 0 ? p : 0,
                        ticker: Zt(o.document, u),
                        value: gi(80),
                        viewProps: o.viewProps
                    })
                })
            },
            api(o) {
                return !(o.controller instanceof At) || !(o.controller.valueController instanceof j) ? null : new Rn(o.controller)
            }
        };
        class Q {
            constructor(i, r) {
                this.min = i,
                this.max = r
            }
            static isObject(i) {
                if (typeof i != "object" || i === null)
                    return !1;
                const r = i.min
                  , a = i.max;
                return !(typeof r != "number" || typeof a != "number")
            }
            static equals(i, r) {
                return i.min === r.min && i.max === r.max
            }
            get length() {
                return this.max - this.min
            }
            toObject() {
                return {
                    min: this.min,
                    max: this.max
                }
            }
        }
        const en = {
            fromComponents: o=>new Q(o[0],o[1]),
            toComponents: o=>[o.min, o.max]
        };
        class me {
            constructor(i) {
                this.edge = i
            }
            constrain(i) {
                var r, a, p, u, c, m, S, tt;
                if (i.min <= i.max)
                    return new Q((a = (r = this.edge) === null || r === void 0 ? void 0 : r.constrain(i.min)) !== null && a !== void 0 ? a : i.min,(u = (p = this.edge) === null || p === void 0 ? void 0 : p.constrain(i.max)) !== null && u !== void 0 ? u : i.max);
                const U = (i.min + i.max) / 2;
                return new Q((m = (c = this.edge) === null || c === void 0 ? void 0 : c.constrain(U)) !== null && m !== void 0 ? m : U,(tt = (S = this.edge) === null || S === void 0 ? void 0 : S.constrain(U)) !== null && tt !== void 0 ? tt : U)
            }
        }
        const dt = z("rsltxt");
        class A {
            constructor(i, r) {
                this.sliderView_ = r.sliderView,
                this.textView_ = r.textView,
                this.element = i.createElement("div"),
                this.element.classList.add(dt());
                const a = i.createElement("div");
                a.classList.add(dt("s")),
                a.appendChild(this.sliderView_.element),
                this.element.appendChild(a);
                const p = i.createElement("div");
                p.classList.add(dt("t")),
                p.appendChild(this.textView_.element),
                this.element.appendChild(p)
            }
        }
        const mt = z("rsl");
        class T {
            constructor(i, r) {
                this.maxValue_ = r.maxValue,
                this.minValue_ = r.minValue,
                this.element = i.createElement("div"),
                this.element.classList.add(mt()),
                r.viewProps.bindClassModifiers(this.element),
                this.value_ = r.value,
                this.value_.emitter.on("change", this.onValueChange_.bind(this));
                const a = i.createElement("div");
                a.classList.add(mt("t")),
                this.element.appendChild(a),
                this.trackElement = a;
                const p = i.createElement("div");
                p.classList.add(mt("b")),
                a.appendChild(p),
                this.barElement = p;
                const u = ["min", "max"].map(c=>{
                    const m = i.createElement("div");
                    return m.classList.add(mt("k"), mt("k", c)),
                    a.appendChild(m),
                    m
                }
                );
                this.knobElements = [u[0], u[1]],
                this.update()
            }
            valueToX_(i) {
                return q(R(i, this.minValue_, this.maxValue_, 0, 1), 0, 1) * 100
            }
            update() {
                const i = this.value_.rawValue;
                i.length === 0 ? this.element.classList.add(mt(void 0, "zero")) : this.element.classList.remove(mt(void 0, "zero"));
                const r = [this.valueToX_(i.min), this.valueToX_(i.max)];
                this.barElement.style.left = `${r[0]}%`,
                this.barElement.style.right = `${100 - r[1]}%`,
                this.knobElements.forEach((a,p)=>{
                    a.style.left = `${r[p]}%`
                }
                )
            }
            onValueChange_() {
                this.update()
            }
        }
        class nn {
            constructor(i, r) {
                this.grabbing_ = null,
                this.grabOffset_ = 0,
                this.onPointerDown_ = this.onPointerDown_.bind(this),
                this.onPointerMove_ = this.onPointerMove_.bind(this),
                this.onPointerUp_ = this.onPointerUp_.bind(this),
                this.maxValue_ = r.maxValue,
                this.minValue_ = r.minValue,
                this.viewProps = r.viewProps,
                this.value = r.value,
                this.view = new T(i,{
                    maxValue: r.maxValue,
                    minValue: r.minValue,
                    value: this.value,
                    viewProps: r.viewProps
                });
                const a = new he(this.view.trackElement);
                a.emitter.on("down", this.onPointerDown_),
                a.emitter.on("move", this.onPointerMove_),
                a.emitter.on("up", this.onPointerUp_)
            }
            ofs_() {
                return this.grabbing_ === "min" ? this.view.knobElements[0].getBoundingClientRect().width / 2 : this.grabbing_ === "max" ? -this.view.knobElements[1].getBoundingClientRect().width / 2 : 0
            }
            valueFromData_(i) {
                if (!i.point)
                    return null;
                const r = (i.point.x + this.ofs_()) / i.bounds.width;
                return R(r, 0, 1, this.minValue_, this.maxValue_)
            }
            onPointerDown_(i) {
                if (!i.data.point)
                    return;
                const r = i.data.point.x / i.data.bounds.width
                  , a = this.value.rawValue
                  , p = R(a.min, this.minValue_, this.maxValue_, 0, 1)
                  , u = R(a.max, this.minValue_, this.maxValue_, 0, 1);
                Math.abs(u - r) <= .025 ? this.grabbing_ = "max" : Math.abs(p - r) <= .025 ? this.grabbing_ = "min" : r >= p && r <= u ? (this.grabbing_ = "length",
                this.grabOffset_ = R(r - p, 0, 1, 0, this.maxValue_ - this.minValue_)) : r < p ? (this.grabbing_ = "min",
                this.onPointerMove_(i)) : r > u && (this.grabbing_ = "max",
                this.onPointerMove_(i))
            }
            applyPointToValue_(i, r) {
                const a = this.valueFromData_(i);
                if (a !== null) {
                    if (this.grabbing_ === "min")
                        this.value.setRawValue(new Q(a,this.value.rawValue.max), r);
                    else if (this.grabbing_ === "max")
                        this.value.setRawValue(new Q(this.value.rawValue.min,a), r);
                    else if (this.grabbing_ === "length") {
                        const p = this.value.rawValue.length;
                        let u = a - this.grabOffset_
                          , c = u + p;
                        u < this.minValue_ ? (u = this.minValue_,
                        c = this.minValue_ + p) : c > this.maxValue_ && (u = this.maxValue_ - p,
                        c = this.maxValue_),
                        this.value.setRawValue(new Q(u,c), r)
                    }
                }
            }
            onPointerMove_(i) {
                this.applyPointToValue_(i.data, {
                    forceEmit: !1,
                    last: !1
                })
            }
            onPointerUp_(i) {
                this.applyPointToValue_(i.data, {
                    forceEmit: !0,
                    last: !0
                }),
                this.grabbing_ = null
            }
        }
        class Z {
            constructor(i, r) {
                this.value = r.value,
                this.viewProps = r.viewProps,
                this.sc_ = new nn(i,r);
                const a = {
                    baseStep: r.baseStep,
                    constraint: r.constraint,
                    textProps: B.fromObject({
                        draggingScale: r.draggingScale,
                        formatter: r.formatter
                    })
                };
                this.tc_ = new Ye(i,{
                    assembly: en,
                    axes: [a, a],
                    parser: r.parser,
                    value: this.value,
                    viewProps: r.viewProps
                }),
                this.view = new A(i,{
                    sliderView: this.sc_.view,
                    textView: this.tc_.view
                })
            }
            get textController() {
                return this.tc_
            }
        }
        function ji(o) {
            return Q.isObject(o) ? new Q(o.min,o.max) : new Q(0,0)
        }
        function te(o, i) {
            o.writeProperty("max", i.max),
            o.writeProperty("min", i.min)
        }
        function sn(o) {
            const i = []
              , r = Ln(o);
            r && i.push(r);
            const a = Vn(o);
            return a && i.push(a),
            new me(new Se(i))
        }
        const Ui = {
            id: "input-interval",
            type: "input",
            css: ".tp-cbzv_b,.tp-rslv_k,.tp-radv_b,.tp-cbzgv{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-cbzv_b,.tp-rslv_k,.tp-radv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-cbzv_b:hover,.tp-rslv_k:hover,.tp-radv_b:hover{background-color:var(--btn-bg-h)}.tp-cbzv_b:focus,.tp-rslv_k:focus,.tp-radv_b:focus{background-color:var(--btn-bg-f)}.tp-cbzv_b:active,.tp-rslv_k:active,.tp-radv_b:active{background-color:var(--btn-bg-a)}.tp-cbzv_b:disabled,.tp-rslv_k:disabled,.tp-radv_b:disabled{opacity:0.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:0.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:0.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:0.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1 * var(--cnt-h-p));position:absolute;right:calc(-1 * var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:0.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us) * 5);width:100%}.tp-cbzgv_u{opacity:0.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:transparent;stroke:var(--in-fg)}.tp-cbzgv_v{opacity:0.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:0.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity 0.2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:0.2em;opacity:0.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:0.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:'';height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:'';height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px) / -2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:0.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:0.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:0.5}.tp-radgridv .tp-radv_b{border-radius:0}",
            accept: (o,i)=>{
                if (!Q.isObject(o))
                    return null;
                const r = f
                  , a = St(i, {
                    format: r.optional.function,
                    max: r.optional.number,
                    min: r.optional.number,
                    step: r.optional.number
                });
                return a ? {
                    initialValue: new Q(o.min,o.max),
                    params: a
                } : null
            }
            ,
            binding: {
                reader: o=>ji,
                constraint: o=>sn(o.params),
                equals: Q.equals,
                writer: o=>te
            },
            controller(o) {
                var i;
                const r = o.value
                  , a = o.constraint;
                if (!(a instanceof me))
                    throw jt.shouldNeverHappen();
                const p = (r.rawValue.min + r.rawValue.max) / 2
                  , u = (i = o.params.format) !== null && i !== void 0 ? i : et(Yt(a.edge, p))
                  , c = a.edge && wt(a.edge, pe);
                if ((c == null ? void 0 : c.minValue) !== void 0 && (c == null ? void 0 : c.maxValue) !== void 0)
                    return new Z(o.document,{
                        baseStep: qe(a.edge),
                        constraint: a.edge,
                        draggingScale: Ci(c, p),
                        formatter: u,
                        maxValue: c.maxValue,
                        minValue: c.minValue,
                        parser: ue,
                        value: r,
                        viewProps: o.viewProps
                    });
                const m = {
                    baseStep: qe(a.edge),
                    constraint: a.edge,
                    textProps: B.fromObject({
                        draggingScale: p,
                        formatter: u
                    })
                };
                return new Ye(o.document,{
                    assembly: en,
                    axes: [m, m],
                    parser: ue,
                    value: r,
                    viewProps: o.viewProps
                })
            }
        };
        class $i {
            constructor(i) {
                this.controller_ = i
            }
            get disabled() {
                return this.controller_.viewProps.get("disabled")
            }
            set disabled(i) {
                this.controller_.viewProps.set("disabled", i)
            }
            get title() {
                var i;
                return (i = this.controller_.props.get("title")) !== null && i !== void 0 ? i : ""
            }
            set title(i) {
                this.controller_.props.set("title", i)
            }
        }
        class rn extends _t {
            constructor(i, r, a, p, u) {
                super(i, p, u),
                this.cell = r,
                this.index = a
            }
        }
        class Fi extends N {
            constructor(i) {
                super(i),
                this.cellToApiMap_ = new Map,
                this.controller_.valueController.cellControllers.forEach(a=>{
                    const p = new $i(a);
                    this.cellToApiMap_.set(a, p)
                }
                )
            }
            get value() {
                return this.controller_.value
            }
            cell(i, r) {
                const a = this.controller_.valueController
                  , p = a.cellControllers[r * a.size[0] + i];
                return this.cellToApiMap_.get(p)
            }
            on(i, r) {
                const a = r.bind(this);
                this.controller_.value.emitter.on(i, p=>{
                    const u = this.controller_.valueController
                      , c = u.findCellByValue(p.rawValue);
                    if (!c)
                        return;
                    const m = this.cellToApiMap_.get(c);
                    if (!m)
                        return;
                    const S = u.cellControllers.indexOf(c);
                    a(new rn(this,m,[S % u.size[0], Math.floor(S / u.size[0])],p.rawValue,void 0))
                }
                )
            }
        }
        const Vt = z("rad");
        class ee {
            constructor(i, r) {
                this.element = i.createElement("div"),
                this.element.classList.add(Vt()),
                r.viewProps.bindClassModifiers(this.element);
                const a = i.createElement("label");
                a.classList.add(Vt("l")),
                this.element.appendChild(a);
                const p = i.createElement("input");
                p.classList.add(Vt("i")),
                p.name = r.name,
                p.type = "radio",
                r.viewProps.bindDisabled(p),
                a.appendChild(p),
                this.inputElement = p;
                const u = i.createElement("div");
                u.classList.add(Vt("b")),
                a.appendChild(u);
                const c = i.createElement("div");
                c.classList.add(Vt("t")),
                u.appendChild(c),
                L(r.props, "title", m=>{
                    c.textContent = m
                }
                )
            }
        }
        class be {
            constructor(i, r) {
                this.props = r.props,
                this.viewProps = r.viewProps,
                this.view = new ee(i,{
                    name: r.name,
                    props: this.props,
                    viewProps: this.viewProps
                })
            }
        }
        class _e {
            constructor(i, r) {
                this.cellCs_ = [],
                this.cellValues_ = [],
                this.onCellInputChange_ = this.onCellInputChange_.bind(this),
                this.size = r.size;
                const [a,p] = this.size;
                for (let u = 0; u < p; u++)
                    for (let c = 0; c < a; c++) {
                        const m = new be(i,{
                            name: r.groupName,
                            props: B.fromObject(Object.assign({}, r.cellConfig(c, u))),
                            viewProps: gt.create()
                        });
                        this.cellCs_.push(m),
                        this.cellValues_.push(r.cellConfig(c, u).value)
                    }
                this.value = r.value,
                ft(this.value, u=>{
                    const c = this.findCellByValue(u);
                    !c || (c.view.inputElement.checked = !0)
                }
                ),
                this.viewProps = gt.create(),
                this.view = new Me(i,{
                    viewProps: this.viewProps,
                    viewName: "radgrid"
                }),
                this.view.element.style.gridTemplateColumns = `repeat(${a}, 1fr)`,
                this.cellCs_.forEach(u=>{
                    u.view.inputElement.addEventListener("change", this.onCellInputChange_),
                    this.view.element.appendChild(u.view.element)
                }
                )
            }
            get cellControllers() {
                return this.cellCs_
            }
            findCellByValue(i) {
                const r = this.cellValues_.findIndex(a=>a === i);
                return r < 0 ? null : this.cellCs_[r]
            }
            onCellInputChange_(i) {
                const r = i.currentTarget
                  , a = this.cellCs_.findIndex(p=>p.view.inputElement === r);
                a < 0 || (this.value.rawValue = this.cellValues_[a])
            }
        }
        const bt = function() {
            return {
                id: "radiogrid",
                type: "blade",
                accept(o) {
                    const i = f
                      , r = St(o, {
                        cells: i.required.function,
                        groupName: i.required.string,
                        size: i.required.array(i.required.number),
                        value: i.required.raw,
                        view: i.required.constant("radiogrid"),
                        label: i.optional.string
                    });
                    return r ? {
                        params: r
                    } : null
                },
                controller(o) {
                    return new $t(o.document,{
                        blade: o.blade,
                        props: B.fromObject({
                            label: o.params.label
                        }),
                        valueController: new _e(o.document,{
                            groupName: o.params.groupName,
                            cellConfig: o.params.cells,
                            size: o.params.size,
                            value: it(o.params.value)
                        })
                    })
                },
                api(o) {
                    return !(o.controller instanceof $t) || !(o.controller.valueController instanceof _e) ? null : new Fi(o.controller)
                }
            }
        }()
          , on = [Mi, tn, pt, Ui, bt, {
            id: "input-radiogrid",
            type: "input",
            accept(o, i) {
                if (typeof o != "number")
                    return null;
                const r = f
                  , a = St(i, {
                    cells: r.required.function,
                    groupName: r.required.string,
                    size: r.required.array(r.required.number),
                    view: r.required.constant("radiogrid")
                });
                return a ? {
                    initialValue: o,
                    params: a
                } : null
            },
            binding: {
                reader: o=>Cn,
                writer: o=>He
            },
            controller: o=>new _e(o.document,{
                cellConfig: o.params.cells,
                groupName: o.params.groupName,
                size: o.params.size,
                value: o.value
            })
        }];
        _.CubicBezier = ct,
        _.plugins = on,
        Object.defineProperty(_, "__esModule", {
            value: !0
        })
    })
}
)(Fn, Fn.exports);
var Mo = ko(Fn.exports)
  , So = Lo({
    __proto__: null,
    default: Mo
}, [Fn.exports]);
class To extends ps.exports.Pane {
    constructor() {
        super({
            title: "Options",
            expanded: !1
        }),
        this.containerElem_.style.width = "300px",
        this.containerElem_.style.position = "fixed",
        this.containerElem_.style.maxHeight = "98vh",
        this.containerElem_.style.overflowY = "auto",
        this.containerElem_.style.zIndex = "9999999",
        this.containerElem_.firstChild.style.overflow = "hidden",
        this.containerElem_.addEventListener("wheel", x=>{
            x.stopPropagation()
        }
        ),
        this.containerElem_.style.opacity = "0",
        this.registerPlugin(So),
        this.options = {},
        this.addFps(),
        this.addSceneStats(),
        this.addRain(),
        this.addReflectiveFloors(),
        this.addU(),
        this.addPostFX()
    }
    addRain() {
        const x = this.addFolder({
            title: "rain"
        });
        x.addInput(D.MainScene.meshes.rain, "count", {
            label: "drop count",
            min: 0,
            max: D.MainScene.meshes.rain.instanceMatrix.count,
            step: 1
        }).on("change", _=>{
            D.MainScene.meshes.floor.material.uniforms.uRainCount.value = _.value
        }
        ),
        x.addInput(D.MainScene.meshes.rain.material.uniforms.uBaseBrightness, "value", {
            label: "base brightness",
            min: 0,
            max: .5
        }),
        x.addInput(D.MainScene.meshes.rain.material.uniforms.uRefraction, "value", {
            label: "refraction",
            min: 0,
            max: .1,
            step: 1e-4
        }),
        x.addInput(D.MainScene.meshes.rain, "rotation", {
            label: "rotation",
            step: .01
        })
    }
    addReflectiveFloors() {
        const x = this.addFolder({
            title: "reflective floor",
            expanded: !0
        });
        x.addInput(D.MainScene.meshes.floor.material.uniforms.uDistortionAmount, "value", {
            label: "distortion",
            min: 0,
            max: .2,
            step: 1e-4
        }),
        x.addInput(D.MainScene.meshes.floor.material.uniforms.uBlurStrength, "value", {
            label: "blur strength",
            min: 0,
            max: 10,
            step: .01
        }),
        x.addInput(D.MainScene.meshes.floor.material.uniforms.uTexScale, "value", {
            label: "texture scale",
            x: {
                step: .01
            },
            y: {
                step: .01
            }
        })
    }
    addU() {
        const x = this.addFolder({
            title: "u shape",
            expanded: !0
        });
        this.addColor(x, D.MainScene.options, "color", "color", !1, [D.MainScene.meshes.u.material, D.MainScene.lights.pLight1])
    }
    addRectLights() {
        const x = this.addFolder({
            title: "door light",
            expanded: !0
        });
        x.addInput(D.MainScene.lights.rLight1, "position", {
            x: {
                step: .001
            },
            y: {
                step: .001
            },
            z: {
                step: .001
            }
        }),
        x.addInput(D.MainScene.lights.rLight1, "rotation"),
        x.addInput(D.MainScene.lights.rLight1, "width", {
            step: .01
        }),
        x.addInput(D.MainScene.lights.rLight1, "height", {
            step: .01
        }),
        x.addInput(D.MainScene.lights.rLight1, "intensity", {
            step: 1
        }),
        this.addColor(x, D.MainScene.lights.rLight1, "color", "color", !1)
    }
    addPostFX() {
        const _ = this.addFolder({
            title: "post fx",
            expanded: !0
        }).addFolder({
            title: "bloom",
            expanded: !0
        });
        _.addInput(D.MainScene.bloomPass, "enabled"),
        _.addInput(D.MainScene.bloomPass, "threshold", {
            min: 0,
            max: 1,
            step: .001
        }),
        _.addInput(D.MainScene.bloomPass, "strength", {
            min: 0,
            max: 5,
            step: .001
        }),
        _.addInput(D.MainScene.bloomPass, "radius", {
            min: 0,
            max: 2,
            step: .001
        })
    }
    addSceneStats() {
        const x = this.addFolder({
            title: "Scene Stats",
            expanded: !1
        });
        x.addMonitor(D.WebGL.renderer.info.render, "calls", {
            label: "draw calls",
            interval: 500
        }),
        x.addMonitor(D.WebGL.renderer.info.render, "triangles", {
            interval: 500
        }),
        x.addMonitor(D.WebGL.renderer.info.memory, "geometries", {
            interval: 1e4
        })
    }
    addColor(x, _, N, O, _t, nt=[]) {
        _t ? this.setupColorUniform(_) : _.guiValue = "#" + _[`${N}`].getHexString(),
        x.addInput(_, "guiValue", {
            label: O,
            picker: "inline"
        }).on("change", $=>{
            if (_[N].set(_.guiValue),
            nt && nt.length > 0)
                for (const Ee of nt)
                    Ee[N].set(_.guiValue)
        }
        )
    }
    setupColorUniform(x) {
        x.guiValue = "#" + x.value.getHexString()
    }
    addFps() {
        this.fps = this.addBlade({
            view: "fpsgraph"
        }),
        Vo.ticker.fps(999);
        const x = document.createElement("div");
        x.classList.add("force-unlocked-fps"),
        this.containerElem_.appendChild(x);
        const _ = document.createElement("style")
          , N = `
		.force-unlocked-fps {
			animation-name: forceUnlockedFps;
			animation-duration: 4s;
			animation-iteration-count: infinite;
		}
		
		@keyframes forceUnlockedFps {
			from { transform: translateX(-1%) }
			to { transform: translateX(0%) }
		}
		`;
        _.innerHTML = N,
        this.containerElem_.appendChild(_)
    }
}
export {To as Gui};