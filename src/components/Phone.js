import React from 'react'
import config from '../../config'
import {sendCode} from "../actions"
import {connect} from 'react-redux'

class Phone extends React.PureComponent {
  state = {
    phone: config.phone || ''
  }

  render() {
    const {dispatch} = this.props
    return (
        <div>
          <input value={this.state.phone} onChange={e => this.setState({phone: e.target.value})}/>
          <button type="button" onClick={() => sendCode(dispatch, this.state.phone)}>Send Code</button>
        </div>
    )
  }
}

export default connect(s => s.phone)(Phone)
