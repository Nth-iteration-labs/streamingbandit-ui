import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, propTypes, reduxForm } from "redux-form";
import { connect } from "react-redux";
import compose from "recompose/compose";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { Card, CardActions } from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import LockIcon from "material-ui/svg-icons/action/lock-outline";
import { cyan500, pinkA200 } from "material-ui/styles/colors";
import validUrl from "valid-url";
import {
  Notification,
  translate,
  userLogin as userLoginAction
} from "admin-on-rest";
import { easyComp } from "react-easy-state";
import store from "../stores/store";

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    minWidth: 300
  },
  avatar: {
    margin: "1em",
    textAlign: "center "
  },
  form: {
    padding: "0 1em 1em 1em"
  },
  input: {
    display: "flex"
  },
  hint: {
    textAlign: "center",
    marginTop: "1em",
    color: "#ccc"
  }
};

function getColorsFromTheme(theme) {
  if (!theme) return { primary1Color: cyan500, accent1Color: pinkA200 };
  const { palette: { primary1Color, accent1Color } } = theme;
  return { primary1Color, accent1Color };
}

const renderInput = ({
  meta: { touched, error } = {},
  input: { ...inputProps },
  ...props
}) => (
  <TextField
    errorText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

class Login extends Component {
  login = ({ username, password }) => {
    let serverurlparam = store.serverurl;

    const { userLogin, location } = this.props;
    userLogin(
      { username, password, serverurlparam },
      location.state ? location.state.nextPathname : "/"
    );

    // this.setState({ navigate: true })  // needed bc easyComp wrapper
  };

  /* state = {
        navigate: false
    } */

  constructor(props) {
    super(props);
    this.props = props;
    this.login = this.login.bind(this);
  }

  render() {
    const { handleSubmit, submitting, theme, translate } = this.props;
    const muiTheme = getMuiTheme(theme);
    const { primary1Color, accent1Color } = getColorsFromTheme(muiTheme);

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{ ...styles.main, backgroundColor: primary1Color }}>
          <Card style={styles.card}>
            <div style={styles.avatar}>
              <Avatar
                backgroundColor={accent1Color}
                icon={<LockIcon />}
                size={60}
              />
            </div>
            <form onSubmit={handleSubmit(this.login)}>
              <div style={styles.form}>
                <p style={styles.hint}>Welcome to StreamingBandit</p>
                <div style={styles.input}>
                  <Field
                    name="username"
                    component={renderInput}
                    floatingLabelText={translate("aor.auth.username")}
                  />
                </div>
                <div style={styles.input}>
                  <Field
                    name="password"
                    component={renderInput}
                    floatingLabelText={translate("aor.auth.password")}
                    type="password"
                  />
                </div>
                <div style={styles.input}>
                  <Field
                    name="server_url"
                    component={renderInput}
                    floatingLabelText="Server URL"
                  />
                </div>
              </div>
              <CardActions>
                <RaisedButton
                  type="submit"
                  primary
                  disabled={submitting}
                  label={translate("aor.auth.sign_in")}
                  fullWidth
                />
              </CardActions>
            </form>
          </Card>
          <Notification />
        </div>
      </MuiThemeProvider>
    );
  }
}

Login.propTypes = {
  ...propTypes,
  authClient: PropTypes.func.isRequired,
  previousRoute: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired
};

Login.defaultProps = {
  theme: {}
};

const enhance = compose(
  translate,
  reduxForm({
    form: "signIn",
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false,
    initialValues: {
      server_url: store.serverurl
    },
    validate: (values, props) => {
      store.serverurl = values.server_url;
      const errors = {};
      const { translate } = props;
      if (!values.username)
        errors.username = translate("aor.validation.required");
      if (!values.password)
        errors.password = translate("aor.validation.required");
      if (!validUrl.isWebUri(values.server_url))
        errors.server_url =
          "Enter a valid URL, ie 'http://www.example.com:8080'";
      return errors;
    }
  }),
  connect(null, { userLogin: userLoginAction })
);

export default enhance(easyComp(Login));
