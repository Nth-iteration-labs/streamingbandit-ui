import React from 'react';
import PropTypes from 'prop-types';

function saveAs(uri, filename) {
    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = uri;
        link.click();
        document.body.removeChild(link); //remove the link when done

    } else {
        window.location.replace(uri);
    }
}


class DownloadButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            fileData: null,
        };
        this._onGenerate = this._onGenerate.bind(this);
        this._donePreparing = this._donePreparing.bind(this);
        this._onDownload = this._onDownload.bind(this);
    }

    _onGenerate(){
        this.setState({loading: true, fileData: null});
        this.props.genFile(this._donePreparing);
    }

    _donePreparing(fileData) {
        this.setState({
            loading: false,
            fileData: fileData,
        });
    }

    _onDownload() {

        var fileData = (this.props.fileData || (this.props.async ? this.state.fileData : this.props.genFile()));

        if (!fileData) {
            return false;
        }
        var blob = new Blob([fileData.contents], {type: fileData.mime});
        var url = URL.createObjectURL(blob);
        saveAs(url, fileData.filename);
        this.props.onDownloaded && this.props.onDownloaded();
    }

    render () {
        // need one or the other
        if (!this.props.genFile && !this.props.fileData) {

          return (<em>Invalid configuration for download button</em>
                );
        }

        var style = this.props.style;
        var cls = 'DownloadButton ' + (this.props.className || '');

        if (this.props.fileData || !this.props.async || this.state.fileData) {

            var title = this.props.downloadTitle;

            if ('function' === typeof title) {
                title = title(this.props.fileData || this.state.fileData)

            }

            return (<button style={style} onClick={e => { e.preventDefault(); this._onDownload(); }} className={cls}>
                        {title}
                    </button>);
        }

        if (this.state.loading) {

            return (<button style={style} className={cls + ' DownloadButton-loading'}>
                        {this.props.loadingTitle}
                    </button>);
        }

        return (<button style={style} onClick={e => { e.preventDefault(); this._onGenerate(); }}  className={cls + ' DownloadButton-generate'}>
                    {this.props.generateTitle}
                </button>);
    }

}



DownloadButton.propTypes = {
    fileData: PropTypes.object,
    genFile: PropTypes.func,
    async: PropTypes.bool,
    generateTitle: PropTypes.string,
    downloadTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    loadingTitle: PropTypes.string,
    onDownloaded: PropTypes.func,
}

DownloadButton.defaultProps = {
    async: false,
    downloadTitle: 'Download',
    generateTitle: 'Generate file',
    loadingTitle: 'Loading...',

}

export default DownloadButton;