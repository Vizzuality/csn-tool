import React from 'react';
import PropTypes from 'prop-types';

class CSVButton extends React.Component {
  constructor(props, context) {
    super(props);
    this.context = context;

    this.state = {
      csv: this.renderCSV(props.columns, props.data)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      csv: this.renderCSV(nextProps.columns, nextProps.data)
    });
  }

  renderCSV(columns, data) {
    const NEW_LINE_CHAR = '\n';
    const COMMA_CHAR = ',';
    const csvArray = []; // ['data:'];
    if (columns) {
      csvArray.push(columns.map((col) => this.context.t(col)).join(','));
    }
    if (data) {
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

    const downloadCSV = this.state.csv;

    return (
      <a className="icon-over-circle" href={downloadCSV} download="download.csv">
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
  data: PropTypes.any
};

export default CSVButton;
