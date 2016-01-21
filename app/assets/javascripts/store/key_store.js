(function(root){
  if (typeof KeyStore === "undefined") {
    root.KeyStore = {};
  }
  var _keys = [];
  var _song = "";
  var CHANGE_EVENT = "CHANGE";
  var SONG_CHANGE_EVENT = "SONG_CHANGE_EVENT";

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

  var addNewKeyToSong = function(key) {
    _song += key+",";
  };

  var resetSong = function(song) {
    _song = song;
  };

  root.KeyStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _keys.slice();
    },

    currentSong: function() {
      var copySong = _song.slice();
      return copySong;
    },

    addChangeHandler: function(callback) {
      root.KeyStore.on(CHANGE_EVENT, callback);
    },

    removeChangeHandler: function(callback) {
      root.KeyStore.removeListener(CHANGE_EVENT, callback);
    },

    addSongChangeHandler: function(callback) {
      KeyStore.on(SONG_CHANGE_EVENT, callback);
    },

    changed: function() {
      // root.KeyStore.emit(CHANGE_EVENT);
    },

    dispatcherID: AppDispatcher.register(function(action) {
    switch(action.actionType) {
      case KeyConstants.RESET_KEYS:
        resetKeys(action.noteName);
        KeyStore.emit(CHANGE_EVENT);
        break;
      case KeyConstants.ADD_KEY:
        addNote(action.noteName);
        KeyStore.emit(CHANGE_EVENT);
        break;
      case KeyConstants.ADD_KEY_TO_SONG:
        addNewKeyToSong(action.key);
        KeyStore.emit(SONG_CHANGE_EVENT);
        break;
      case KeyConstants.UPDATE_WHOLE_SONG:
        resetSong(action.song);
        break;
      }
    })
  });
  root.KeyStore.setMaxListeners(50);
})(this);
