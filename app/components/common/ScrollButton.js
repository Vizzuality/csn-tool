import React from 'react';
import smoothScroll from 'smoothscroll';

function topPosition(domEl) {
  if (!domEl) {
    return 0;
  }
  return domEl.offsetTop + topPosition(domEl.offsetParent);
}

class ScrollButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLabel: true
    };
    this.timeout = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.attachScrollListener();
  }

  onScroll() {
    if (this.scrollEl && this.scrollEl.getBoundingClientRect().top < Number(this.props.threshold)) {
      this.detachScrollListener();
    }
  }

  handleScroll() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.onScroll();
    }, 250);
    this.hideLabel();
  }

  hideLabel() {
    if (this.state.showLabel) this.setState({ showLabel: false });
  }

  scrollTo(el) {
    smoothScroll(topPosition(el) - this.props.threshold);
  }

  handleClick() {
    this.hideLabel();
    this.scrollTo(this.scrollEl);
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
      <div className={`c-scroll-button ${this.state.showLabel ? '' : '-hide'}`} ref={(scrollEl) => { this.scrollEl = scrollEl; }}>
        <div className="button" onClick={this.handleClick}>
          <svg width="18" height="11" viewBox="0 0 18 11"><title>Scroll down</title><path d="M1.641-.044l7.27 7.278 7.374-7.241L17.823 1.5 8.91 10.411 0 1.5z" fillRule="evenodd" /></svg>
        </div>
        <div className={`label`}><span>Scroll down to see the data</span></div>
      </div>
    );
  }
}

ScrollButton.defaultProps = {
  threshold: 100
};

ScrollButton.propTypes = {
  threshold: React.PropTypes.number
};

export default ScrollButton;
