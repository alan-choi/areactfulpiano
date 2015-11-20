/* global React */
/* global Note */
/* global TONES */
/* global KeyStore */

(function(root){
  root.Key = React.createClass({
    getInitialState: function() {
      return {pressed: ""};
    },

    componentDidMount: function () {
      this.noteName = this.props.note;
      if (typeof TONES[this.noteName] !== "undefined") {
        this.note = new Note(TONES[this.noteName]);
        KeyStore.addChangeHandler(this._onChange);
      }
    },

    _onChange: function () {
      var pressed;
      var keys = KeyStore.all();
      if (keys.indexOf(this.props.note) !== -1){
        this.setState({pressed: " pressed"});
        this.note.start();
      } else if (keys.indexOf(this.props.note) === -1){
        this.setState({pressed: ""});
        this.note.stop();
      }
    },

    handleClick: function(event) {
      event.preventDefault();
      debugger;
    },

    render: function(){
      var keyClass;
      if (this.props.note.indexOf("S") === 1){
        keyClass = " sharp";
      } else {
        keyClass = " major";
      }
      return(
        <div className={"key"+keyClass+ this.state.pressed} onClick={this.handleClick}>
          {this.props.note}
        </div>
      );
    }
  });
})(this);
