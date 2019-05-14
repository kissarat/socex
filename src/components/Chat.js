import React from 'react'

export default class Chat extends React.PureComponent {
  render() {
    return (
        <div className="chat">
          <div className="replicas"></div>
          <textarea></textarea>
        </div>
    )
  }
}
