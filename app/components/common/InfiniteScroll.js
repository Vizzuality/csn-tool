import React from 'react';
import LoadingSpinner from 'components/common/LoadingSpinner';

function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetTop + topPosition(domElt.offsetParent);
}

class ScrolledTableList extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = null;
    this.threshold = this.props.threshold || 250;
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    this.attachScrollListener();
  }

  componentDidUpdate() {
    if (this.props.hasMore) {
      this.attachScrollListener();
    }
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  onScroll() {
    const scrollTop = (window.pageYOffset !== undefined)
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    if (topPosition(this.scrollEl) + this.scrollEl.offsetHeight - scrollTop - window.innerHeight < Number(this.threshold)) {
      this.detachScrollListener();
      this.props.loadMore();
    }
  }

  handleScroll() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.onScroll();
    }, 250);
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
      <div ref={(scrollEl) => { this.scrollEl = scrollEl; }} className="c-infinite-scroll">
        {this.props.children}
        {this.props.hasMore &&
          <div className="loading">
            <LoadingSpinner inner />
          </div>
        }
      </div>
    );
  }
}

ScrolledTableList.propTypes = {
  timeout: React.PropTypes.string,
  threshold: React.PropTypes.string,
  hasMore: React.PropTypes.bool.isRequired,
  loadMore: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired
};

export default ScrolledTableList;
