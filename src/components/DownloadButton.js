/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";

function saveAs(parameters) {
  let { uri, filename } = parameters;
  let link = document.createElement("a");

  if (typeof link.download !== "string") {
    window.location.replace(uri);
  } else {
    document.body.appendChild(link); // Firefox requires the link to be in the body
    link.download = filename;
    link.href = uri;
    link.click();
    document.body.removeChild(link); // remove the link when done
  }
}

class DownloadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fileData: null,
      bgcolor: "rgb(0, 188, 212)"
    };
    this._onGenerate = this._onGenerate.bind(this);
    this._donePreparing = this._donePreparing.bind(this);
    this._onDownload = this._onDownload.bind(this);
  }

  _onGenerate() {
    this.setState({ loading: true, fileData: null });
    this.props.genFile(this._donePreparing);
  }

  _donePreparing(fileData) {
    this.setState({
      loading: false,
      fileData: fileData,
      bgcolor: "rgb(255, 64, 129)"
    });
  }

  _onDownload() {
    let fileData =
      this.props.fileData ||
      (this.props.async ? this.state.fileData : this.props.genFile());

    if (!fileData) {
      return false;
    }
    let blob = new Blob([fileData.contents], { type: fileData.mime });
    let url = URL.createObjectURL(blob);
    saveAs({ uri: url, filename: fileData.filename });
    this.props.onDownloaded && this.props.onDownloaded();
    this.setState({
      loading: false,
      fileData: null,
      bgcolor: "rgb(0, 188, 212)"
    });
  }

  render() {
    // need one or the other
    if (!this.props.genFile && !this.props.fileData) {
      return <em>Invalid configuration for download button</em>;
    }

    let style = this.props.style;
    let cls = "DownloadButton " + (this.props.className || "");

    if (this.props.fileData || !this.props.async || this.state.fileData) {
      let title = this.props.downloadTitle;

      if (typeof title === "function") {
        title = title(this.props.fileData || this.state.fileData);
      }

      return (
        <RaisedButton
          backgroundColor={this.state.bgcolor}
          style={style}
          onClick={e => {
            e.preventDefault();
            this._onDownload();
          }}
          className={cls}
        >
          {title}
        </RaisedButton>
      );
    }

    if (this.state.loading) {
      return (
        <RaisedButton
          backgroundColor={this.state.bgcolor}
          style={style}
          className={cls + " DownloadButton-loading"}
        >
          {this.props.loadingTitle}
        </RaisedButton>
      );
    }

    return (
      <RaisedButton
        backgroundColor={this.state.bgcolor}
        style={style}
        onClick={e => {
          e.preventDefault();
          this._onGenerate();
        }}
        className={cls + " DownloadButton-generate"}
      >
        {this.props.generateTitle}
      </RaisedButton>
    );
  }
}

DownloadButton.propTypes = {
  fileData: PropTypes.object,
  genFile: PropTypes.func,
  async: PropTypes.bool,
  generateTitle: PropTypes.string,
  downloadTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  loadingTitle: PropTypes.string,
  onDownloaded: PropTypes.func
};

DownloadButton.defaultProps = {
  async: false,
  downloadTitle: "Download",
  generateTitle: "Generate file",
  loadingTitle: "Loading..."
};

export default DownloadButton;
