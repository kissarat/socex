import React from 'react'
import {connect} from "react-redux";

class History extends React.PureComponent {
  list() {
    return this.props.history
        .filter(t => 'message' === t._)
        .map(m => <div key={m.id} id={m.id}>{m.message}</div>)
  }
  render() {
    return <div>{this.list()}</div>
  }
}

export default connect(s => s.entities)(History)
