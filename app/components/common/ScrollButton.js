import React from 'react';
import PropTypes from 'prop-types';
import smoothScroll from 'smoothscroll';

class ScrollButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLabel: true,
      scroll: false,
      fixed: false
    };
    this.timeout = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.attachScrollListener();
  }

  componentWillReceiveProps() {
    this.cache();
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  onScroll() {
    if (window.pageYOffset >= (this.scrollLimit / 4)) {
      this.hideLabel();
    }
  }

  cache() {
    this.scrollLimit = this.topPosition(this.scrollContainer) - this.props.threshold;
  }

  topPosition(domEl) {
    if (!domEl) {
      return 0;
    }
    return domEl.offsetTop + this.topPosition(domEl.offsetParent);
  }

  handleScroll() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.onScroll();
    }, 100);
    if (window.pageYOffset >= this.scrollLimit && !this.state.scroll) {
      this.setState({
        scroll: true,
        fixed: true
      });
    } else if (window.pageYOffset < this.scrollLimit && this.state.scroll) {
      this.setState({
        scroll: false,
        fixed: false
      });
    }
  }

  hideLabel() {
    if (this.state.showLabel) this.setState({ showLabel: false });
  }

  handleClick() {
    this.hideLabel();
    smoothScroll(this.scrollLimit - 70);
  }

  attachScrollListener() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
  }

  detachScrollListener() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  render() {
    return (
      <div className={`c-scroll-button ${this.state.showLabel ? '' : '-hide'} ${this.state.fixed ? '-fixed' : ''}`} ref={(ref) => { this.scrollContainer = ref; }}>
        <div className="button" onClick={this.handleClick}>
          <svg width="18" height="11" viewBox="0 0 18 11"><title>{this.context.t('scrollText')}</title><path d="M1.641-.044l7.27 7.278 7.374-7.241L17.823 1.5 8.91 10.411 0 1.5z" fillRule="evenodd" /></svg>
        </div>
        <div className="label"><span>{this.context.t('scrollText')}</span></div>
      </div>
    );
  }
}

ScrollButton.contextTypes = {
  t: PropTypes.func.isRequired
};

ScrollButton.defaultProps = {
  threshold: 30
};

ScrollButton.propTypes = {
  threshold: PropTypes.number,
  setScrollState: PropTypes.func,
  scroll: PropTypes.bool
};

export default ScrollButton;
