import React from 'react'
import {connect} from 'react-redux'
import Phone from '../components/Phone'
import Code from '../components/Code'
import settings from '../settings'
import {fetchDialogs} from '../actions'
import Inside from "../containers/Inside";

class App extends React.PureComponent {
  state = {
    authenticate: false
  }

  componentDidMount() {
    setTimeout(() => fetchDialogs(this.props.dispatch), 300)
  }

  authentication() {
    const {phone, hash, user} = this.props
    if (user) {
      return <div>Authenticated</div>
    }
    else if (hash) {
      return <Code/>
    }
    else if (phone) {
      return <div>Code to {phone} was send</div>
    }
    else {
      return <Phone/>
    }
  }

  showDialogs() {
    return <div>
      <button type="button" onClick={() => fetchDialogs(this.props.dispatch)}>Show Dialogs</button>
    </div>
  }

  render() {
    return (
        <div>
          <div>
            {this.authentication()}
            {this.showDialogs()}
          </div>
          {this.props.hasDialogs ? <Inside/> : null}
          <div className="env">{settings.dev ? 'Development' : 'Production'}</div>
        </div>
    )
  }
}

function map(props) {
  return {
    ...props.auth,
    hasDialogs: !!props.entities.dialogs
  }
}

export default connect(map)(App)
