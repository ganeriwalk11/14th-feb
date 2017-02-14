import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData } from '../actions/index';
import { setColor } from '../actions/validations';

class SpreadSheet extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.fetchData();
    //this.props.setColor();
  }

  getData(){
      this.props.fetchData();
  }

  render() {
    return (
        <div>
            <br/>
            <button onClick={this.getData.bind(this)}>Fetch Data</button>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: bindActionCreators(fetchData, dispatch),
        //setColor: bindActionCreators(setColor, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(SpreadSheet);
