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
      this.setState({ song: "" });
      KeyActions.submitSong("");
    },

    handleSubmit: function(event) {
      event.preventDefault();
      if (this.state.song === "") {
        alert("please input a keys to play");
      } else {
      KeyActions.submitSong(this.state.song);
      var song = this.state.song.replace(/ /g, "").split(",");
      if (song[song.length-1] === "") { song.splice(-1, 1); }
      this.props.playSong(song);
      // if the form should reset after submitting
      // this.setState({ song: "" });
      }
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
