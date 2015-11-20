(function(root){
  root.Organ = React.createClass({
    playSong: function(song) {
      if (song.length === 0) {
        return null;
      }
      var currentKey = song[0].toUpperCase();
      this.playKey(currentKey);
      setTimeout(function(){this.playSong(song.slice(1));}.bind(this), 1000);
    },

    playKey: function(key) {
      console.log("playing " + key);
      KeyActions.keyPressed(key);
      setTimeout(function(){this.stopKey(key);}.bind(this), 1000);
    },

    stopKey: function(key) {
      console.log("stopping "+key);
      KeyActions.keyReleased(key);
      KeyActions.removeKeyFromSong();
    },

    render: function(){
      var keys = [];
      for (var key in TONES){
          keys.push(<Key key={key} onClick={this.handleClick} note={key} />);
        }

        return(
          <div>
            <img className="left-speaker" src="speaker1.jpg" />
            <img className="right-speaker" src="speaker1.jpg" />
            <SongForm playSong={this.playSong}/>
            <ul className="key-container">
              {keys}
            </ul>
          </div>
        );
    }
  });
})(this);
