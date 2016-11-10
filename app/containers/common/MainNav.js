import { connect } from 'react-redux';
import MainNav from 'components/common/MainNav';
import { updateLang } from 'actions/locales';

const mapStateToProps = (state) => ({
  lang: state.i18nState.lang
});

const mapDispatchToProps = (dispatch) => ({
  updateLang: lang => dispatch(updateLang(lang))
});

// {pure: false} documentation
// https://github.com/reactjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
// to update the activeClassName in router changes.
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(MainNav);
