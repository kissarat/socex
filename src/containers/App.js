import React from 'react'
import {connect} from 'react-redux'
import Phone from '../components/Phone'
import Code from '../components/Code'
import settings from '../settings'

class App extends React.PureComponent {
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

  render() {
    return (
        <div>
          {this.authentication()}
          <div className="env">{settings.dev ? 'Development' : 'Production'}</div>
        </div>
    )
  }
}

export default connect(s => s.phone)(App)
