/* global React */
/* global Note */
/* global TONES */
/* global KeyStore */
/* global Key */

(function(root){

  root.Organ = React.createClass({

    render: function(){
      var keys = [];
      for (var key in TONES){
          keys.push(<Key note={key} />);
        }

        return(
          <div className="organ">
            {keys}
          </div>
        );

    }
  });

})(this);
