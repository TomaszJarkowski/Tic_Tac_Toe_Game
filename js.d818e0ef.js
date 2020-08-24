// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/scss/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/js/Modal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modal = /*#__PURE__*/function () {
  function Modal() {
    _classCallCheck(this, Modal);

    var body = document.querySelector("body");
    this.div = document.createElement("div");
    this.h1 = document.createElement("h1");
    this.div.classList.add("modalDiv");
    this.h1.classList.add("modalH1");
    body.appendChild(this.div);
    this.div.appendChild(this.h1);
    this.time = 3000;
  }

  _createClass(Modal, [{
    key: "displayModal",
    value: function displayModal(winner) {
      var _this = this;

      if (winner == "-") {
        this.h1.textContent = "Hard game! Draw";
      } else {
        this.h1.textContent = "Congratulations!!! Player won: ".concat(winner);
      }

      this.div.style.display = "flex";
      setTimeout(function () {
        _this.div.style.display = "none";
      }, this.time);
    }
  }]);

  return Modal;
}();

exports.Modal = Modal;
},{}],"src/js/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var _Modal = require("./Modal.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function Game() {
  var _this = this;

  _classCallCheck(this, Game);

  this.pick = function (_ref) {
    var target = _ref.target;
    var _target$dataset = target.dataset,
        row = _target$dataset.row,
        column = _target$dataset.column;

    if (_this.round % 2 == 0) {
      if (target.innerHTML == _this.playerO || target.innerHTML == _this.playerX || target.parentNode.innerHTML == _this.playerO || target.parentNode.innerHTML == _this.playerX) {
        return;
      } else {
        _this.nextPlayer.textContent = "O";
        target.innerHTML = _this.playerX;
        _this.turn = "X";
      }
    } else {
      if (target.innerHTML == _this.playerO || target.innerHTML == _this.playerX || target.parentNode.innerHTML == _this.playerO || target.parentNode.innerHTML == _this.playerX) {
        return;
      } else {
        _this.nextPlayer.textContent = "X";
        target.innerHTML = _this.playerO;
        _this.turn = "O";
      }
    }

    _this.round++;
    _this.board[row][column] = _this.turn;

    _this.check();
  };

  this.check = function () {
    var result = _this.board.reduce(function (total, row) {
      return total.concat(row);
    });

    if (result[8] == "O" && result[7] == "O" && result[6] == "O" || result[3] == "O" && result[4] == "O" && result[5] == "O" || result[0] == "O" && result[1] == "O" && result[2] == "O" || result[0] == "O" && result[3] == "O" && result[6] == "O" || result[1] == "O" && result[4] == "O" && result[7] == "O" || result[2] == "O" && result[5] == "O" && result[8] == "O" || result[6] == "O" && result[4] == "O" && result[2] == "O" || result[0] == "O" && result[4] == "O" && result[8] == "O") {
      _this.displayResult("O");
    } else if (result[8] == "X" && result[7] == "X" && result[6] == "X" || result[3] == "X" && result[4] == "X" && result[5] == "X" || result[0] == "X" && result[1] == "X" && result[2] == "X" || result[0] == "X" && result[3] == "X" && result[6] == "X" || result[1] == "X" && result[4] == "X" && result[7] == "X" || result[2] == "X" && result[5] == "X" && result[8] == "X" || result[6] == "X" && result[4] == "X" && result[2] == "X" || result[0] == "X" && result[4] == "X" && result[8] == "X") {
      _this.displayResult("X");
    } else if (result[0] !== "" && result[1] !== "" && result[2] !== "" && result[3] !== "" && result[4] !== "" && result[5] !== "" && result[6] !== "" && result[7] !== "" && result[8] !== "") {
      _this.displayResult("-");
    } else {
      return;
    }
  };

  this.displayResult = function (lastWin) {
    _this.modal.displayModal(lastWin);

    if (lastWin == "X") {
      _this.winX++;
      _this.winsPlayerX.textContent = _this.winX;
    } else if (lastWin == "O") {
      _this.winO++;
      _this.winsPlayerO.textContent = _this.winO;
    }

    _this.winPlayer.textContent = lastWin;

    _this.clearBoard();
  };

  this.clearBoard = function () {
    _this.boxes.forEach(function (box) {
      box.innerHTML = "";
    });

    _this.board = [["", "", ""], ["", "", ""], ["", "", ""]];
  };

  this.resetResult = function () {
    _this.winO = 0;
    _this.winX = 0;
    _this.winsPlayerO.textContent = _this.winO;
    _this.winsPlayerX.textContent = _this.winX;
    _this.winPlayer.textContent = "-";

    _this.clearBoard();
  };

  this.playerX = "<i class=\"fas fa-times\"></i>";
  this.playerO = "<i class=\"far fa-circle\"></i>";
  this.winPlayer = document.querySelector(".info .win span");
  this.nextPlayer = document.querySelector(".info .next span");
  this.winsPlayerX = document.querySelector(".playerX span");
  this.winsPlayerO = document.querySelector(".playerO span");
  this.boxes = _toConsumableArray(document.querySelectorAll(".box"));
  this.turn = "";
  this.round = 0;
  this.winX = 0;
  this.winO = 0;
  this.modal = new _Modal.Modal();
  this.board = [["", "", ""], ["", "", ""], ["", "", ""]];
};

exports.Game = Game;
},{"./Modal.js":"src/js/Modal.js"}],"src/js/toggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggle = void 0;

var toggle = function toggle() {
  var toggleLight = document.querySelector(".toggle__light");
  var toggleDark = document.querySelector(".toggle__dark");
  var conteiner = document.querySelector(".conteiner");
  var checktoggle = document.querySelector("#checktoggle");
  var board = document.querySelector(".board");
  var boxs = document.querySelectorAll(".box");
  var info = document.querySelector(".info");
  var button = document.querySelector(".info button");
  var header = document.querySelector("header");
  var modal = document.querySelector(".modalDiv");
  var modalH1 = document.querySelector(".modalH1");
  var dark = localStorage.getItem("dark");
  dark = JSON.parse(dark);
  checktoggle.addEventListener("click", function () {
    dark = !dark;
    localStorage.setItem("dark", JSON.stringify(dark));
    changeColor(dark);
  });

  var changeColor = function changeColor(dark) {
    if (dark) {
      toggleLight.style.opacity = "0.5";
      toggleDark.style.opacity = "1";
      conteiner.style.backgroundColor = "#242526";
      document.body.style.backgroundColor = "#242526";
      header.style.backgroundColor = "#242526";
      header.style.boxShadow = "0 0 7px 2px black";
      board.style.backgroundColor = "#18191A";
      board.style.boxShadow = "0 0 7px 2px black";
      modal.style.backgroundColor = "#18191A";
      modalH1.style.color = "white";
      info.style.backgroundColor = "#18191A";
      info.style.boxShadow = "0 0 7px 2px black";
      info.style.color = "white";
      button.style.backgroundColor = "#18191A";
      button.style.border = "2px solid gray";
      button.style.color = "white";
    } else {
      toggleLight.style.opacity = "1";
      toggleDark.style.opacity = "0.5";
      conteiner.style.backgroundColor = "#F7F7F7";
      document.body.style.backgroundColor = "#F7F7F7";
      board.style.backgroundColor = "gray";
      board.style.boxShadow = "0 0 7px 0 black";
      header.style.backgroundColor = "gray";
      header.style.boxShadow = "0 0 7px 0 black";
      info.style.backgroundColor = "gray";
      info.style.boxShadow = "0 0 7px 0px black";
      modal.style.backgroundColor = "gray";
      modalH1.style.color = "white";
      button.style.backgroundColor = "white";
      button.style.border = "2px solid black";
      button.style.color = "black";
      boxs.forEach(function (box) {
        box.style.boxShadow = "0 0 7px 0px black";
      });
    }
  };

  var changePosition = function changePosition(flague) {
    if (flague) {
      var input = document.querySelector("#checktoggle");
      input.checked = true;
    }
  };

  changeColor(dark);
  changePosition(dark);
};

exports.toggle = toggle;
},{}],"src/js/index.js":[function(require,module,exports) {
"use strict";

require("../scss/style.scss");

var _Game = require("./Game.js");

var _toggle = require("./toggle.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var boxes = _toConsumableArray(document.querySelectorAll(".box"));

var btnReset = document.querySelector("button");
var game = new _Game.Game();
(0, _toggle.toggle)();
boxes.forEach(function (box) {
  return box.addEventListener("click", function (e) {
    return game.pick(e);
  });
});
btnReset.addEventListener("click", function () {
  return game.resetResult();
});
},{"../scss/style.scss":"src/scss/style.scss","./Game.js":"src/js/Game.js","./toggle.js":"src/js/toggle.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60316" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/index.js"], null)
//# sourceMappingURL=/js.d818e0ef.js.map