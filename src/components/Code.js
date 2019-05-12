import React from 'react'
import {authenticate} from "../actions"
import {connect} from 'react-redux'

class Code extends React.PureComponent {
  state = {
    code: ''
  }

  render() {
    const {dispatch, phone, hash} = this.props
    return (
        <div>
          <input value={this.state.code} onChange={e => this.setState({code: e.target.value})}/>
          <button type="button" onClick={() => authenticate(dispatch, phone, hash, this.state.code)}>Send Code</button>
        </div>
    )
  }
}

export default connect(s => s.phone)(Code)
