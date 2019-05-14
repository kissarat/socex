import React from 'react'

export default class Editor extends React.PureComponent {
  render() {
    return (
        <div className="editor">
          <textarea></textarea>
          <button type="button">Send</button>
        </div>
    )
  }
}
