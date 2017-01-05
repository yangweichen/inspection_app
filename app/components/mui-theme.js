// MuiTheme to be used by the entire app
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Most component colors are derived from this palette object
export const palette = {
  primary1Color: '#005B96',
  accent1Color: '#5A5A5A',
  textColor: 'black',
  alternateTextColor: 'white',
  canvasColor: '#D8D8D8',
  borderColor: '#5A5A5A',
  disabledColor: '#B3CDE0',
  errorColor: '#D9534F',
  focusColor: '#005B96',
  alternateFocusColor: '#01CCFF'
};

export const muiTheme = getMuiTheme({}, {
  fontFamily: 'Nunito',
  palette,
  appBar: {
    color: palette.accent1Color,
    textColor: palette.alternateTextColor
  },
  avatar: {
    color: palette.alternateTextColor,
    backgroundColor: palette.accent1Color
  },
  raisedButton: {
    color: palette.primary1Color,
    textColor: palette.alternateTextColor,
    primaryColor: palette.primary1Color,
    primaryTextColor: palette.alternateTextColor,
    secondaryColor: palette.accent1Color,
    secondaryTextColor: palette.alternateTextColor,
    disabledColor: palette.disabledColor,
    disabledTextColor: palette.canvasColor
  },
  floatingActionButton: {
    buttonSize: 56,
    miniSize: 40,
    color: palette.primary1Color,
    iconColor: palette.alternateTextColor,
    secondaryColor: palette.accent1Color,
    secondaryIconColor: palette.alternateTextColor,
    disabledColor: palette.disabledColor,
    disabledTextColor: palette.canvasColor
  },
  textField: {
    textColor: palette.textColor,
    hintColor: palette.accent1Color,
    floatingLabelColor: palette.accent1Color,
    disabledTextColor: palette.accent1Color,
    errorColor: palette.errorColor,
    focusColor: palette.focusColor,
    backgroundColor: 'transparent',
    borderColor: palette.borderColor
  }

});
