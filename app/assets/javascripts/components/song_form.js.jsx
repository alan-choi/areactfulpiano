(function(root){
  root.SongForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
      return { song: "" };
    },

    componentDidMount: function() {
      KeyStore.addSongChangeHandler(this.updateSong);
    },

    updateSong: function() {
      var updatedSong = KeyStore.currentSong();

      this.setState({ song: updatedSong });
    },

    clearSong: function() {
      KeyActions.submitSong("");
      this.setState({ song: "" });
    },

    handleSubmit: function(event) {
      event.preventDefault();
      var song = this.state.song.replace(/ /g, "").split(",");

      if (song.length === 0) { alert("please input keys to play"); }
      if (song[song.length-1] === "") { song.splice(-1, 1); }

      for (var i = 0; i < song.length; i++) {
        if (!this.checkKeyinTones(song[i].toUpperCase())) {
          alert(song[i]+ " is not a valid key");
          return "invalid key";
        }
      }

      KeyActions.submitSong(this.state.song);
      this.props.playSong(song);
      // if the form should reset after submitting
      // this.setState({ song: "" });
    },

    checkKeyinTones: function(currentKey) {
      return Object.keys(TONES).some(
        function(key) { return key  === currentKey; }
      );
    },

    render: function() {
      return (
        <form className="song-form" onSubmit={this.handleSubmit}>
          <textarea
            className="song-input"
            type="text"
            valueLink={this.linkState("song")}></textarea>
          <div className="buttons-container">
            <button>
              <img src="icons/play-round-32.png"/>
            </button>
            <div className="clear-form" onClick={this.clearSong}>
              clear
            </div>
          </div>
        </form>
      );
    }
  });
})(this);
