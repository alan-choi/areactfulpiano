/* global KeyStore */
/* global KeyConstants */
/* global EventEmitter  */
/* global AppDispatcher  */

(function(root){
  if (typeof KeyStore === "undefined") {
    root.KeyStore = {};
  }

  var _keys = [];
  var CHANGE_EVENT = "CHANGE";

  var resetKeys = function(key) {
    var index = _keys.indexOf(key);
    _keys.splice(index, 1);
    KeyStore.changed();
  };
  var addNote = function(key) {
    if (_keys.indexOf(key) === -1){
    _keys.push(key);
    }
    KeyStore.changed();
  };

  root.KeyStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _keys.slice();
    },

    addChangeHandler: function (cb) {
      root.KeyStore.on(CHANGE_EVENT, cb);
    },

    removeChangeHandler: function(cb) {
      root.KeyStore.removeListener(CHANGE_EVENT, cb);
    },

    changed: function() {
      root.KeyStore.emit(CHANGE_EVENT);
    },

    dispatcherID: AppDispatcher.register(function (action) {
    switch(action.actionType) {
    case KeyConstants.RESET_KEYS:
      resetKeys(action.noteName);
      break;
    case KeyConstants.ADD_KEY:
      addNote(action.noteName);
      break;
    }
    }) 
  });
})(this);
