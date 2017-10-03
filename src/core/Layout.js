import {connect} from 'react-redux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {defaultTheme, Layout} from 'admin-on-rest';

export default connect(state => ({
    theme: state.theme === 'dark' ? darkBaseTheme : defaultTheme,
}))(Layout);
