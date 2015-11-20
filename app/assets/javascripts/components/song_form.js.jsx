/* global React */
/* global Note */
/* global TONES */
/* global KeyStore */
/* global Key */
(function(root){
  root.SongForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
      return { song: [] };
    },

    componentDidMount: function() {
      KeyStore.addSongChangeHandler(this.updateSong);
    },

    updateSong: function() {
      var updatedSong = KeyStore.currentSong();
      this.setState({ song: updatedSong });
    },

    handleSubmit: function(event) {
      event.preventDefault();
      KeyActions.submitSong(this.state.song);
      var song = this.state.song.replace(/ /g, "").split(",");
      if (song[-1] === undefined) { song.splice(-1, 1); }
      this.props.playSong(song);
      // this.setState({ song: "" });
    },

    render: function() {
      return (
        <form className="song-form" onSubmit={this.handleSubmit}>
          <input className="song-input" type="text" valueLink={this.linkState("song")}></input>
          <button><img src="icons/play-round-32.png"></img></button>
        </form>
      );
    }
  });
})(this);
