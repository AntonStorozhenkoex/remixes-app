import colors from '@/helpers/theme/colors';

const styles = {
  button: {
    color: colors.common.white,
    background: colors.background1,
    '&:nth-child(1)': {
      marginRight: 1
    }
  },
  main: {
    flex: 1
  }
};

export default styles;
