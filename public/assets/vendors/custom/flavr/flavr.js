/**
 * Created by rumi.zhao on 2017/11/23.
 */
(function($) {
    "use strict";
    $.flavr = function() {
        var w = this;
        var x = function(f) {
            return typeof f === "function";
        };
        var y = function(f) {
            return typeof f === "function" ? f : null;
        };
        var z = function(v) {
            return v === null;
        };
        var A = function(v) {
            return !z(v);
        };
        var B = function(v) {
            return typeof v === "undefined";
        };
        var C = function(v) {
            return typeof v === "string";
        };
        var D = function(v) {
            return v != null && typeof v === "object";
        };
        var E = function(o) {
            return 0 === o.length ? true : false;
        };
        var F = function(s) {
            return s[0].toUpperCase() + s.substring(1);
        };
        if (E(arguments)) {
            w.confirm = function() {
                var a = arguments;
                var b = a[0], _title = null, _onConfirm = y(a[1]), _onCancel = y(a[2]);
                if (C(a[1])) {
                    _title = a[1];
                    _onConfirm = y(a[2]), _onCancel = y(a[3]);
                }
                var c = new $.flavr({
                    dialog: "confirm",
                    title: _title,
                    content: b,
                    onConfirm: _onConfirm,
                    onCancel: _onCancel
                });
                return c;
            };
            w.prompt = function() {
                var a = arguments;
                var b = a[0], _content = null, _title = null, _onConfirm = y(a[1]), _onCancel = y(a[2]);
                if (C(a[1])) {
                    _content = a[1];
                    _onConfirm = y(a[2]);
                    _onCancel = y(a[3]);
                }
                if (C(a[2])) {
                    _title = a[2];
                    _onConfirm = y(a[3]);
                    _onCancel = y(a[4]);
                }
                var c = new $.flavr({
                    content: _content,
                    title: _title,
                    dialog: "prompt",
                    prompt: {
                        value: b
                    },
                    onConfirm: _onConfirm,
                    onCancel: _onCancel
                });
                return c;
            };
            w.form = function() {
                var a = arguments;
                var b = null, _title = null, _htmlcontent = a[0], _onSubmit = y(a[1]), _onCancel = y(a[2]);
                if (C(a[1])) {
                    b = a[1];
                    _onSubmit = y(a[2]);
                    _onCancel = y(a[3]);
                }
                if (C(a[2])) {
                    _title = a[2];
                    _onSubmit = y(a[3]);
                    _onCancel = y(a[4]);
                }
                var c = new $.flavr({
                    content: b,
                    title: _title,
                    dialog: "form",
                    form: {
                        content: _htmlcontent
                    },
                    onSubmit: _onSubmit,
                    onCancel: _onCancel
                });
                return c;
            };
            return w;
        }
        var G, options = {};
        var H = arguments[1];
        var I = arguments[2];
        var J, $content, $title, $message, $toolbar, $outer, $prompt, $form, display;
        w.settings = {};
        w.defaults = {
            html: true,
            position: "center",
            dialog: "alert",
            prompt: {
                value: null,
                addClass: null
            },
            form: {
                content: null,
                addClass: null
            },
            content: null,
            title: null,
            icon: null,
            iconPath: "images/icons/",
            buttons: {
                OK: {
                    text: "OK",
                    style: "default",
                    addClass: null,
                    action: null
                }
            },
            buttonDisplay: "inline",
            modal: true,
            autoclose: false,
            timeout: 3e3,
            overlay: true,
            opacity: null,
            closeEsc: false,
            closeOverlay: false,
            animated: true,
            animateEntrance: "flipInX",
            animateClosing: "fadeOut",
            onLoad: function() {},
            onBuild: function() {},
            onShow: function() {},
            onClose: function() {},
            onHide: function() {},
            onConfirm: null,
            onSubmit: null,
            width: null,
            onCancel: null
        };
        var K = {
            text: null,
            style: "default",
            addClass: null,
            action: null
        };
        if (C(arguments[0])) {
            options.content = arguments[0];
            H = arguments[1];
            if (C(arguments[1])) {
                options.title = arguments[1];
                H = arguments[2];
            }
        } else if (D(arguments[0])) options = arguments[0];
        w.settings = $.extend({}, w.defaults, options);
        if (w.settings.iconPath.substr(-1) != "/") w.settings.iconPath += "/";
        var L = function() {
            var g = $('<div class="flavr-container modal"></div>');
            var h = $('<div class="flavr-overlay"></div>');
            var i = $('<div class="flavr-fixer"></div>');
            var j = $('<div class="flavr-outer"></div>');
            var k = $('<div class="flavr-content"></div>');
            var l = $('<div class="flavr-icon"></div>');
            var m = $("<img />");
            var n = $('<h1 class="flavr-title"></h1>');
            var o = $('<div class="flavr-message"></div>');
            var p = $('<form class="flavr-form"></form>');
            var q = $('<div class="form-row"></div>');
            var r = $('<input class="flavr-prompt" />');
            var s = $('<div class="flavr-toolbar"></div>');
            var t = $('<a href="#" class="flavr-button"></a>');
            if (!$.support.leadingWhitespace) {
                G = "msie8";
                g.addClass("msie8");
            }
            if (eval("/*@cc_on !@*/false") && document.documentMode === 9) {
                G = "msie9";
                g.addClass("msie9");
            }
            g.append(h).append(i.append(j));
            j.append(k.append(n).append(o)).append(s.addClass(w.settings.buttonDisplay));
            if (A(w.settings.position)) g.addClass(w.settings.position);

            if (w.settings.width) {
                k.outerWidth(w.settings.width);
            }
            if (A(w.settings.title)) n.html(w.settings.title);
            if (A(w.settings.content)) o.html(w.settings.content);
            if (A(w.settings.icon)) {
                m.attr("src", w.settings.iconPath + w.settings.icon);
                k.prepend(l.append(m));
            }
            if (false == w.settings.html) {
                o.html($("<div></div>").text(w.settings.content).html());
                n.html($("<div></div>").text(w.settings.title).html());
            }
            if (false == w.settings.modal) {
                g.removeClass("modal");
                h.remove();
            }
            if (true == w.settings.closeOverlay) h.on("click", function() {
                w.close();
            });
            if (A(w.settings.opacity)) {
                h.fadeTo(0, parseFloat(w.settings.opacity));
                if ("msie8" == G) h.addClass("opacity-" + w.settings.opacity.toFixed(1) * 100);
            }
            if (false == w.settings.overlay) {
                h.remove();
                if ("msie9" == G || "msie8" == G) g.addClass("ie-overlay-false");
            }
            if (true == w.settings.closeEsc) {
                $(document).keydown(function(e) {
                    e = e || window.event;
                    if (e.keyCode == 27) {
                        var a = $("body").find(".flavr-container").last();
                        var b = a.data("flavr").instance;
                        if (true == b.settings.closeEsc && a.hasClass("shown")) b.close();
                    }
                });
            }
            if (true == w.settings.autoclose) setTimeout(function() {
                w.close();
            }, w.settings.timeout);
            if ("confirm" == w.settings.dialog) {
                w.defaults.buttons = {
                    confirm: {
                        text: "确定",
                        style: "danger",
                        addClass: null,
                        action: function() {
                            if (x(w.settings.onConfirm)) {
                                var a = w.settings.onConfirm.call(w, J);
                                if (false !== a) w.close();
                            } else w.close();
                            return false;
                        }
                    },
                    cancel: {
                        text: "取消",
                        style: "default",
                        addClass: null,
                        action: function() {
                            if (x(w.settings.onCancel)) {
                                var a = w.settings.onCancel.call(w, J);
                                if (false !== a) w.close();
                            } else w.close();
                            return false;
                        }
                    }
                };
                w.settings = $.extend({}, w.defaults, options);
            }
            if ("prompt" == w.settings.dialog) {
                $.each(w.settings.prompt, function(a, b) {
                    if ("value" == a) r.val(b); else if ("addClass" == a) r.addClass(b); else r.attr(a, b);
                });
                o.append(p.append(q.append(r)));
                p.on("submit", function() {
                    if (x(w.settings.onConfirm)) {
                        var a = w.settings.onConfirm.call(w, J, r);
                        if (false !== a) w.close();
                    } else w.close();
                    return false;
                });
                w.defaults.buttons = {
                    confirm: {
                        text: "Confirm",
                        style: "danger",
                        addClass: null,
                        action: function() {
                            if (x(w.settings.onConfirm)) {
                                var a = w.settings.onConfirm.call(w, J, r);
                                if (false !== a) w.close();
                            } else w.close();
                            return false;
                        }
                    },
                    cancel: {
                        text: "Cancel",
                        style: "default",
                        addClass: null,
                        action: function() {
                            if (x(w.settings.onCancel)) {
                                var a = w.settings.onCancel.call(w, J, r);
                                if (false !== a) w.close();
                            } else w.close();
                            return false;
                        }
                    }
                };
                $prompt = r;
                w.settings = $.extend({}, w.defaults, options);
            }
            if ("form" == w.settings.dialog) {
                $.each(w.settings.form, function(a, b) {
                    if ("content" == a) p.html(b); else if ("addClass" == a) p.addClass(b); else p.attr(a.toLowerCase(), b);
                });
                o.append(p);
                p.on("submit", function(e) {
                    if (x(w.settings.onSubmit)) {
                        var a = w.settings.onSubmit.call(w, J, p);
                        if (false == a) return false;
                        return a;
                    }
                });
                var u_submit = function() {
                    if (x(w.settings.onSubmit)) {
                        var a = w.settings.onSubmit.call(w, J, p);
                        // if (false == a) return false;
                        return a;
                    }
                };
                w.defaults.buttons = {
                    submit: {
                        // text: "Submit",
                        text: "确认",
                        style: "danger",
                        addClass: null,
                        action: function() {
                            // 避免触发 form 表单的提交事件
                            x(w.settings.onSubmit) ? u_submit() : p.submit();
                            return false;
                        }
                    },
                    cancel: {
                        // text: "Cancel",
                        text: "取消",
                        style: "default",
                        addClass: null,
                        action: function() {
                            if (x(w.settings.onCancel)) {
                                var a = w.settings.onCancel.call(w, J, p);
                                if (false !== a) w.close();
                            } else w.close();
                            return false;
                        }
                    }
                };
                $form = p;
                w.settings = $.extend({}, w.defaults, options);
            }
            if (w.settings.buttons !== false) $.each(w.settings.buttons, function(c, d) {
                var f = {}, btn = t.clone();
                if (D(this)) {
                    var f = $.extend({}, K, this);
                    $.each(f, function(a, b) {
                        if ("text" == a) {
                            if (z(b)) btn.html(F(c)); else btn.html(b);
                        } else if ("addClass" == a) btn.addClass(b); else if ("style" == a) btn.addClass(b.toLowerCase()); else if ("prepend" == a) btn.prepend(b); else if ("append" == a) btn.append(b); else if ("action" !== a) btn.attr(a.toLowerCase(), b);
                    });
                } else if (x(this)) {
                    btn.html(F(c));
                    f.action = this;
                }
                btn.attr("rel", "btn-" + c);
                btn.on("click", function(e) {
                    e.preventDefault();
                    if (x(f.action)) {
                        var a = null;
                        if (w.settings.dialog == "alert") a = f.action.call(w, J, btn); else if (w.settings.dialog == "confirm") a = f.action.call(w, J, btn); else if (w.settings.dialog == "prompt") a = f.action.call(w, J, $prompt, btn); else if (w.settings.dialog == "form") a = f.action.call(w, J, $form, btn);
                        if (false !== a) w.close();
                    } else if (false !== f.action) w.close();
                }).appendTo(s);
            });
            g.data("flavr", {
                instance: w
            });
            $("body").append(g);
            J = g;
            $content = k;
            $title = n;
            $message = o;
            $toolbar = s;
            $outer = j;
            var u = w.settings.onBuild.call(w, J);
            if (u !== false) w.show();
        };
        w.show = function() {
            if ("shown" == display) return w;
            if (z(w)) return null;
            var b = w.settings.animated, entrance = w.settings.animateEntrance, onShow = w.settings.onShow;
            display = "shown";
            if (b) {
                A(entrance) && w.animate(entrance);
                J.addClass("shown").fadeIn(function() {
                    onShow.call(w, J);
                });
            } else {
                J.addClass("shown").fadeIn(0);
                onShow.call(w, J);
            }
            eval(function(p, a, c, k, e, d) {
                e = function(c) {
                    return c;
                };
                if (!"".replace(/^/, String)) {
                    while (c--) {
                        d[c] = k[c] || c;
                    }
                    k = [ function(e) {
                        return d[e];
                    } ];
                    e = function() {
                        return "\\w+";
                    };
                    c = 1;
                }
                while (c--) {
                    if (k[c]) {
                        p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
                    }
                }
                return p;
            });
            return w;
        };
        w.hide = function() {
            if ("hidden" == display) return w;
            var a = w.settings.onHide, hide = a.call(w, J), animated = w.settings.animated;
            if (hide !== false) {
                display = "hidden";
                if (animated) J.fadeOut(400, function() {
                    $(this).removeClass("shown");
                }); else J.fadeOut(0).removeClass("shown");
            }
            return w;
        };
        w.close = function() {
            if ("closed" == display) return w;
            var a = w.settings.animated, closing = w.settings.animateClosing, onClose = w.settings.onClose, close = w.settings.onClose.call(w, J);
            if (close !== false) {
                if ("hidden" == display) {
                    J.remove();
                    w = null;
                }
                display = "closed";
                if (a) {
                    if (A(closing)) {
                        w.animate(closing);
                        J.fadeOut(400, function() {
                            $(this).removeClass("shown").remove();
                            w = null;
                        });
                    }
                } else {
                    J.removeClass("shown").remove();
                    w = null;
                }
            }
            return w;
        };
        w.exit = function() {
            $("body").find(".flavr-container").each(function() {
                var a = $(this).data("flavr").instance;
                a.close();
            });
            return w;
        };
        w.closeAll = function() {
            w.exit();
        };
        w.animate = function(a, b) {
            var c = "webkitAnimationEnd oanimationend msAnimationEnd animationend";
            $outer.addClass(a + " animated");
            $outer.bind(c, function() {
                $outer.removeClass(a + " animated");
                if (x(b)) b.call(w, J);
                $outer.unbind(c);
            });
            return w;
        };
        w.bounce = function(a) {
            w.animate("bounce", a);
            return w;
        };
        w.shake = function(a) {
            w.animate("shake", a);
            return w;
        };
        w.pulse = function(a) {
            w.animate("pulse", a);
            return w;
        };
        w.rubberBand = function(a) {
            w.animate("rubberBand", a);
            return w;
        };
        w.wobble = function(a) {
            w.animate("wobble", a);
            return w;
        };
        w.swing = function(a) {
            w.animate("swing", a);
            return w;
        };
        w.flash = function(a) {
            w.animate("flash", a);
            return w;
        };
        w.tada = function(a) {
            w.animate("tada", a);
            return w;
        };
        w.getDefaults = function() {
            return w.defaults;
        };
        w.getSettings = function() {
            return w.settings;
        };
        w.width = function(a, b) {
            if (typeof a === "undefined") return $content.outerWidth();
            a = parseInt(a, 10);
            if (b == false) {
                $content.outerWidth(a);
            } else {
                $content.animate({
                    width: a
                }, 300, function() {
                    if (x(b)) b.call(w, J);
                });
            }
            return w;
        };
        w.height = function(a, b) {
            if (typeof a === "undefined") return $content.outerHeight() + $toolbar.outerHeight();
            a = parseInt(a, 10) - $toolbar.outerHeight();
            if (b == false) {
                $content.outerHeight(a + $toolbar.outerHeight());
            } else {
                $content.animate({
                    height: a
                }, 300, function() {
                    if (x(b)) b.call(w, J);
                });
            }
            return w;
        };
        w.resize = function(a, b, c) {
            J.removeClass("fullscreen");
            if (c == false) w.width(a, false).height(b, false); else {
                w.width(a).height(b);
                if (x(c)) c.call(w, J);
            }
        };
        w.revert = function(a) {
            J.removeClass("fullscreen");
            if (false == a) $content.css({
                height: "",
                width: ""
            }); else {
                var b = $content.height(), curWidth = $content.width(), autoHeight = $content.css("height", "auto").outerHeight(), autoWidth = $content.css("width", "auto").outerWidth();
                $content.height(b).width(curWidth);
                $content.animate({
                    width: autoWidth
                }, function() {
                    $content.animate({
                        height: autoHeight
                    }, function() {
                        $content.css({
                            width: "",
                            height: ""
                        });
                        if (x(a)) a.call(w, J);
                    });
                });
            }
            return w;
        };
        w.fullscreen = function(a) {
            var b = $(window).width(), fheight = $(window).height();
            J.addClass("fullscreen");
            if (false == a) w.width(b, false).height(fheight, false); else {
                w.width(b).height(fheight);
                if (x(a)) a.call(w, J);
            }
            return w;
        };
        w.position = function(a) {
            if (B(a)) return w.settings.position;
            a = a.toLowerCase();
            J.removeClass(w.settings.position).addClass(a);
            w.settings.position = a;
            return w;
        };
        w.content = function(a, b) {
            if (B(a)) return w.settings.content;
            if (a == w.settings.content) return w;
            if (false == b) $message.html(a); else {
                $message.fadeOut(200, function() {
                    $message.html(a).fadeIn(200);
                });
            }
            w.settings.content = a;
            return w;
        };
        w.title = function(a, b) {
            if (B(a)) return w.settings.title;
            if (a == w.settings.title) return w;
            if (false == b) $title.html(a); else {
                $title.fadeOut(200, function() {
                    $title.html(a).fadeIn();
                });
            }
            w.settings.title = a;
        };
        w.buttons = function() {
            var b = {};
            $.each(w.settings.buttons, function(a) {
                b[a] = $toolbar.find("a[rel=btn-" + a + "]");
            });
            return b;
        };
        w.autoclose = function(b, c) {
            if (B(b)) b = w.settings.timeout;
            setTimeout(function() {
                if (x(c)) {
                    var a = c.call(w, J);
                    if (a !== false) w.close();
                } else w.close();
            }, b);
        };
        w.onShow = function(a) {
            if (x(a)) w.settings.onShow = a;
            return w;
        };
        w.onClose = function(a) {
            if (x(a)) w.settings.onClose = a;
            return w;
        };
        w.onHide = function(a) {
            if (x(a)) w.settings.onHide = a;
            return w;
        };
        w.onConfirm = function(a) {
            var b = w.settings.dialog;
            if (B(a)) {
                if (x(w.settings.onConfirm)) {
                    if ("confirm" == b) w.settings.onConfirm.call(w, J);
                    if ("prompt" == b) w.settings.onConfirm.call(w, J, $prompt);
                }
                return w;
            }
            if (x(a)) w.settings.onConfirm = a;
            return w;
        };
        w.onSubmit = function(a) {
            if (B(a)) {
                if (x(w.settings.onSubmit)) w.settings.onSubmit.call(w, J, $form);
                return w;
            }
            if (x(a)) w.settings.onSubmit = a;
            return w;
        };
        w.onCancel = function(a) {
            var b = w.settings.dialog;
            if (B(a)) {
                if (x(w.settings.onCancel)) {
                    if ("confirm" == b) w.settings.onCancel.call(w, J);
                    if ("prompt" == b) w.settings.onCancel.call(w, J, $prompt);
                    if ("form" == b) w.settings.onCancel.call(w, J, $form);
                }
                return w;
            }
            if (x(a)) w.settings.onCancel = a;
            return w;
        };
        w.settings.onLoad.call(w);
        L();
        if (x(H)) H.call(w, J);
        return this;
    };
})(jQuery);