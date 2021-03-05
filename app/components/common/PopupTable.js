import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class PopupTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false
    };

    this.showPopupBlock = this.showPopupBlock.bind(this);
    this.fadePopupBlock = this.fadePopupBlock.bind(this);
    this.changeShowValue = this.changeShowValue.bind(this);
  }

  showPopupBlock() {
    this.changeShowValue(true);
  }

  fadePopupBlock() {
    this.changeShowValue(false);
  }

  changeShowValue(value) {
    const { timeout } = this.props;
    setTimeout(() => {
      this.setState(({
        isShow: value
      }));
    }, timeout);
  }

  render() {
    const { isShow } = this.state;
    const { title, position } = this.props;
    return (
      <div
        className="popup-container"
        onMouseEnter={this.showPopupBlock}
        onMouseLeave={this.fadePopupBlock}
      >
        {this.props.children}

        <div
          className={classnames('popup-block', 'popup-text', `position-${position}`, { show: isShow && title.length !== 0 })}
        >
          <span>{title}</span>
        </div>
      </div>
    );
  }
}

PopupTable.defaultProps = {
  timeout: 300,
  title: '',
  position: 'top'
};

PopupTable.PropTypes = {
  children: PropTypes.node,
  timeout: PropTypes.number,
  title: PropTypes.string,
  position: PropTypes.string
};

export default PopupTable;
