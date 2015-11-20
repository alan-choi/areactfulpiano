var KeyActions = {
  keyPressed: function(name){
    var action = {
      actionType: KeyConstants.ADD_KEY,
      noteName: name
    };
    AppDispatcher.dispatch(action);
  },

  keyReleased: function(name){
    var action = {
      actionType: KeyConstants.RESET_KEYS,
      noteName: name
    };
    AppDispatcher.dispatch(action);
  },

  addKeyToSong: function(newKey) {
    var action = {
      actionType: KeyConstants.ADD_KEY_TO_SONG,
      key: newKey
    };
    AppDispatcher.dispatch(action);
  },

  removeKeyFromSong: function() {
    var action = {
      actionType: KeyConstants.REMOVE_KEY_FROM_SONG,
    };
    AppDispatcher.dispatch(action);
  },

  submitSong: function(submitSong) {
    var action = {
      actionType: KeyConstants.UPDATE_WHOLE_SONG,
      song: submitSong
    };
    AppDispatcher.dispatch(action);
  }
};
