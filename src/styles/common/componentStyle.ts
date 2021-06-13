import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

/**
 * Componentsで共通するスタイル
 */
const ComponentStyles = makeStyles((theme: Theme) =>
  createStyles({
    offset: {
      flexGrow: 1  // 要素を右寄せにするために必要なプロパティ
    },

    imageAvatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginBottom: theme.spacing(1),
      display: 'inline-block',
    },

    title: {
      fontSize: 16,
      textAlign: 'right'
    },

    content: {
      fontSize: 18,
      textAlign: 'left'
    },

    description: {
      fontSize: 16,
      textAlign: 'left'
    },

    privateFlgTrue: {
      fontSize: '0.8rem',
      color: 'red'
    },

    privateFlgFalse: {
        fontSize: '0.8rem',
        color: 'blue'
    },

    participants: {
      textAlign: 'left',
      color: 'rgb(245, 176, 111)'
    },

    unit: {
      fontSize: '0.6rem',
      color: 'rgb(139, 139, 139)'
    },

    albums: {
      textAlign: 'left',
      fontSize: '0.9rem'
    },

    yellow: {
        backgroundColor: 'rgb(213, 247, 119)',
        color: 'white'
    },

    green: {
      backgroundColor: 'rgb(105, 247, 148)',
      color: 'white'
    },

    chip: {
        fontSize: '0.5rem',
    },
    chipButton: {
      '&:hover': {
          cursor: 'pointer'
      }
    },

    tooltip: {
      fontSize: '1rem'
    },

    footerContainer: {
      paddingLeft: '20px'
    }
  }));

export default ComponentStyles;