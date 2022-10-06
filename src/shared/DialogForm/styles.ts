import colors from '../../helpers/theme/colors';

const styles = {
  dialog: {
    '& .MuiPaper-root': {
      width: 500
    }
  },
  dialogContent: {
    padding: '10px !important'
  },
  textFieldContainer: {
    position: 'relative'
  },
  errorMessage: {
    color: 'red',
    position: 'absolute',
    bottom: 5,
    paddingLeft: '5px',
    fontSize: '14px !important'
  },
  textField: {
    marginBottom: '30px'
  },
  select: {},
  buttonsContainer: {
    padding: '10px',
    justifyContent: 'center'
  },
  button: {
    padding: '10px 25px'
  },
  submitButton: {
    background: colors.status.info,
    color: colors.common.white,
    marginRight: '10px'
  },
  cancelButton: {
    background: colors.background1,
    color: colors.common.white
  },
  dialogTitle: {
    textAlign: 'center'
  }
};

export default styles;
