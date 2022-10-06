import colors from '../../helpers/theme/colors';

const styles = {
  table: {
    minHeight: 550,
    position: 'relative',
    '& th': {
      cursor: 'pointer'
    }
  },
  pagination: {
    position: 'absolute',
    bottom: 0,
    '& ul': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 15px 0 15px',
      listStyle: 'none'
    },
    '& .disabled  > * button': {
      backgroundColor: colors.background3
    },
    '& .pageCount': {
      cursor: 'pointer'
    },
    '& .selected': {
      color: colors.status.error
    }
  },
  button: {
    backgroundColor: colors.background1,
    color: colors.common.white
  }
};

export default styles;
