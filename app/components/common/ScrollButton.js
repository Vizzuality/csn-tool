import React from 'react';
import smoothScroll from 'smoothscroll';

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
    if (window.pageYOffset >= (this.props.scrollLimit / 4)) {
      this.hideLabel();
      this.detachScrollListener();
    }
  }

  handleScroll() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.onScroll();
    }, 250);
  }

  hideLabel() {
    if (this.state.showLabel) this.setState({ showLabel: false });
  }

  handleClick() {
    // console.log(this.props.scrollLimit);
    this.hideLabel();
    smoothScroll(this.props.scrollLimit);
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
      <div className={`c-scroll-button ${this.state.showLabel ? '' : '-hide'}`}>
        <div className="button" onClick={this.handleClick}>
          <svg width="18" height="11" viewBox="0 0 18 11"><title>Scroll down</title><path d="M1.641-.044l7.27 7.278 7.374-7.241L17.823 1.5 8.91 10.411 0 1.5z" fillRule="evenodd" /></svg>
        </div>
        <div className="label"><span>Scroll down to see the data</span></div>
      </div>
    );
  }
}

ScrollButton.defaultProps = {
  threshold: 100
};

ScrollButton.propTypes = {
  threshold: React.PropTypes.number,
  scrollLimit: React.PropTypes.number
};

export default ScrollButton;
