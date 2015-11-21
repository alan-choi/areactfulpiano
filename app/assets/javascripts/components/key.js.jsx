(function(root){
  root.Key = React.createClass({
    getInitialState: function() {
      return { pressed: "" };
    },

    componentDidMount: function() {
      if (typeof TONES[this.props.note] !== "undefined") {
        this.note = new Note(TONES[this.props.note]);
        KeyStore.addChangeHandler(this._onChange);
      }
    },

    _onChange: function() {
      var pressed;
      var keys = KeyStore.all();

      if (keys.indexOf(this.props.note) !== -1){
        this.setState({ pressed: " pressed" });
        this.note.start();
      } else if (keys.indexOf(this.props.note) === -1){
        this.setState({ pressed: "" });
        this.note.stop();
      }
    },

    temporaryHighlight: function(mseconds) {
      this.setState({ pressed: " pressed" });
      setTimeout(function() {
        this.setState({ pressed: "" });
      }.bind(this), mseconds);
    },

    handleClick: function(event) {
      event.preventDefault();

      KeyActions.addKeyToSong(this.props.note);
      this.temporaryHighlight(200);
      KeyActions.keyPressed(this.props.note);
      setTimeout(
        function(){ KeyActions.keyReleased(this.props.note); }.bind(this), 200
      );
    },

    render: function(){
      var keyClass;
      
      if (this.props.note.indexOf("S") === 1){
        keyClass = " sharp";
      } else {
        keyClass = " major";
      }
      return(
        <li
          className={ "key" + keyClass + this.state.pressed }
          onClick={ this.handleClick }>
          { this.props.note }
        </li>
      );
    }
  });
})(this);
