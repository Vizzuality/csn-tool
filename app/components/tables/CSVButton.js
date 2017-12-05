import React from 'react';
import PropTypes from 'prop-types';

class CSVButton extends React.Component {
  constructor(props, context) {
    super(props);
    this.context = context;

    this.state = {
      csv: this.renderCSV(props.columns, props.data)
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      csv: this.renderCSV(nextProps.columns, nextProps.data)
    });
  }

  componentDidUpdate() {
    // retrigger click when csv data has been loaded
    if (this.state.dataLoadedOnDemand) {
      this.linkElement.click();
    }
  }

  handleOnClick(e) {
    if (this.state.dataLoadedOnDemand) {
      this.setState({ dataLoadedOnDemand: false });
      return;
    }
    // if data is not a function, don't need to load it, continue with default behaviour
    if (typeof this.props.data !== 'function') return;

    e.preventDefault();

    this.props.data()
      .then((loadedData) => {
        this.setState({
          csv: this.renderCSV(this.props.columns, loadedData),
          dataLoadedOnDemand: true
        });
      });
  }

  renderCSV(columns, data) {
    if (typeof data === 'function') return null;

    const NEW_LINE_CHAR = '\n';
    const COMMA_CHAR = ',';
    const csvArray = []; // ['data:'];
    if (columns) {
      csvArray.push(columns.map((col) => this.context.t(col)).join(','));
    }
    if (data && data.length) {
      csvArray.push(
        data.map((row) => (
          columns.map((col) => {
            let result = row[col] && row[col].toString().replace(/"/g, '""') || '';
            if (result.search(/("|,|\n)/g) >= 0) {
              result = `"${result}"`;
            }
            return result;
          }).join(COMMA_CHAR)
        )).join(NEW_LINE_CHAR)
      );
    }

    const blob = new Blob([csvArray.join(NEW_LINE_CHAR)], { type: 'text/csv;charset=utf-8;' });
    return window.URL.createObjectURL && window.URL.createObjectURL(blob);
  }

  render() {
    if (!this.props.columns || !this.props.data) return null;

    const downloadCSV = this.state.csv || '#';

    return (
      <a
        className="icon-over-circle"
        href={downloadCSV}
        download="download.csv"
        ref={(link) => { this.linkElement = link; }}
        onClick={this.handleOnClick}
      >
        <svg className="icon -small -dark">
          <use xlinkHref="#icon-download"></use>
        </svg>
      </a>
    );
  }
}

CSVButton.contextTypes = {
  t: PropTypes.func.isRequired
};

CSVButton.propTypes = {
  columns: PropTypes.array.isRequired,
  loadData: PropTypes.func,
  data: PropTypes.any
};

export default CSVButton;
