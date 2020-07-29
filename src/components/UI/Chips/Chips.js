import React, { Component } from 'react';
import Chips, { Chip } from 'react-chips';
 
class YourComponent extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      chips: []
    }
  }
 
  onChange = chips => {
    this.setState({ chips });
    console.log(this.state)
  }
 
  render() {
    return (
      <div>
        <Chips
          value={this.state.chips}
          onChange={this.onChange}
          suggestions={["Your", "Data", "Here"]}
 
        />
      </div>
    );
  }
}

export default Chips;