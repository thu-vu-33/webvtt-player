import React from "react";
import PropTypes from "prop-types";
import { Popup, Grid } from "semantic-ui-react";
import "./TranscriptLine.css";

class TranscriptLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isHover: false,
    };
    this.props.cue.onenter = this.onEnter.bind(this);
    this.props.cue.onexit = this.onExit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  render() {
    // note: dangerouslySetInnerHTML is used because the text may contain HTML


    let style = "";
    let style_line = "text";
    if (
      this.props.query &&
      this.props.cue.text.match(new RegExp(this.props.query, "i"))
    ) {
      style = "match";
    } else if (this.state.isActive) {
      style = "active";
    }

    const style_popup = {
      borderRadius: 0,
      fontWeight: 400,
      lineHeight: 1.58,
      fontSize: "17px",
      fontStyle: "normal",
      color: "blue",
      fontFamily: "Tno,Helvetica Neue,Helvetica,Arial,sans-serif",
    };
    if (this.state.isHover) {
      style_line = "text-hover";
    }
    const [en, vi] = this.props.cue.text.split("|");
    console.log("#DEBUG value cue en:", en, " vi:", vi);
    return (
      <Popup
        trigger={
          <div
            className={`${style} line`}
            onClick={this.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
          >
            <div
              className={`${style} ${style_line}`}
              dangerouslySetInnerHTML={{ __html: en }}
            />
          </div>
        }
        flowing
        hoverable
        // wide='very'
        style={style_popup}
        // size='large'
        // inverted
      >
        <Grid centered divided columns={1}>
          {vi}
        </Grid>
      </Popup>
    );

    //  let style = "";
    //  if (
    //    this.props.query &&
    //    this.props.cue.text.match(new RegExp(this.props.query, "i"))
    //  ) {
    //    style = "match";
    //  } else if (this.state.isActive) {
    //    style = "active";
    //  }
    // const [en, vi] = this.props.cue.text.split("|");
    // if (this.state.isHover) {
    //   return (
    //     <div
    //       className={`${style} line`}
    //       onClick={this.onClick}
    //       onMouseOver={this.onMouseOver}
    //       onMouseOut={this.onMouseOut}
    //     >
    //       <div
    //         className={`${style} text-hover`}
    //         dangerouslySetInnerHTML={{ __html: en }}
    //       />
    //       <div
    //         className={`${style} newline`}
    //         dangerouslySetInnerHTML={{ __html: vi }}
    //       />
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div
    //       className={`${style} line`}
    //       onClick={this.onClick}
    //       onMouseOver={this.onMouseOver}
    //       onMouseOut={this.onMouseOut}
    //     >
    //       <div
    //         className={`${style} text`}
    //         dangerouslySetInnerHTML={{ __html: this.props.cue.text }}
    //       />
    //     </div>
    //   );
    // }
  }

  onEnter() {
    this.setState({ isActive: true });
  }

  onExit() {
    this.setState({ isActive: false });
  }

  onMouseOver() {
    // console.log("DEBUG mouse over ")
    this.setState({ isHover: true });
  }

  onMouseOut() {
    //console.log("DEBUG mouse out ")
    this.setState({ isHover: false });
  }

  onClick() {
    console.log("DEBUG onlick ", this.props.cue.startTime);
    this.props.seek(this.props.cue.startTime);
  }

  startTime() {
    console.log("DEBUG startTime ", this.props.cue.startTime);
    return this.formatSeconds(this.props.cue.startTime);
  }

  endTime() {
    console.log("DEBUG endTime ", this.props.cue.endTime);
    return this.formatSeconds(this.props.cue.endTime);
  }

  formatSeconds(t) {
    let mins = Math.floor(t / 60);
    if (mins < 10) {
      mins = `0${mins}`;
    }

    let secs = Math.floor(t % 60);
    if (secs < 10) {
      secs = `0${secs}`;
    }

    return `${mins}:${secs}`;
  }
}

TranscriptLine.propTypes = {
  cue: PropTypes.object,
  seek: PropTypes.func,
  query: PropTypes.string,
};

export default TranscriptLine;
