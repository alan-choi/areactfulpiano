/* global React */
/* global Note */
/* global TONES */
/* global KeyStore */
/* global Key */
(function(root){
  root.SongForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
      return { song: "" };
    },

    render: function() {
      return (
        <form className="song-form">
          <input className="song-input" type="text" valueLink={this.linkState("song")}></input>
          <button><img src="icons/play-round-32.png"></img></button>
        </form>
      );
    }
  });
})(this);
