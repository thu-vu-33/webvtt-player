import React from 'react'
import PropTypes from 'prop-types'
import './TranscriptLine.css'

class TranscriptLine extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isActive: false
    }
    this.props.cue.onenter = this.onEnter.bind(this)
    this.props.cue.onexit = this.onExit.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  render() {
    let style = ''
    if (this.props.query && this.props.cue.text.match(new RegExp(this.props.query, 'i'))) {
      style = 'match'
    } else if (this.state.isActive) {
      style = 'active'
    }

    // note: dangerouslySetInnerHTML is used because the text may contain HTML
    console.log("#DEBUG value cue:", this.props.cue.text)
    let langueage = this.props.cue.text.substring(0,4)
    console.log("#DEBUG value language:", langueage)
    let textStyle = 'text'
    let content = this.props.cue.text
    if (langueage == "[VI]") {
      textStyle = 'newline'
      content = content.substring(4)
    }
    return (
      <div className={`${style} line`} onClick={this.onClick}>
        <div
          className={`${style} ${textStyle}`}
          dangerouslySetInnerHTML={{__html: content}} />
      </div>
    )
  }

  onEnter() {
    this.setState({isActive: true})
  }

  onExit() {
    this.setState({isActive: false})
  }

  onClick() {
    this.props.seek(this.props.cue.startTime)
  }

  startTime() {
    return this.formatSeconds(this.props.cue.startTime)
  }

  endTime() {
    return this.formatSeconds(this.props.cue.endTime)
  }

  formatSeconds(t) {
    let mins = Math.floor(t / 60)
    if (mins < 10) {
      mins = `0${mins}`
    }

    let secs = Math.floor(t % 60)
    if (secs < 10) {
      secs = `0${secs}`
    }

    return `${mins}:${secs}`
  }

}

TranscriptLine.propTypes = {
  cue: PropTypes.object,
  seek: PropTypes.func,
  query: PropTypes.string,
}

export default TranscriptLine
