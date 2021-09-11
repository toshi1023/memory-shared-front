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
      fontSize: 14,
      textAlign: 'right'
    },

    content: {
      fontSize: 16,
      textAlign: 'left'
    },

    description: {
      fontSize: 16,
      padding: '0 5px 0 5px',
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
        backgroundColor: 'rgba(245, 241, 16, 0.904)',
        color: 'white'
    },

    green: {
      backgroundColor: 'rgb(68, 231, 104)',
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
    },

    registerButton: {
        margin: '20px 0 20px 0',
        height: '50px',
        width: '60%',
        alignItems: 'right',
        backgroundColor: '#fff',
        border: '2px solid #f8cf77',
        borderRadius: '30px',
        boxSizing: 'border-box',
        color: '#f8cf77',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        '&:hover': {
            background: 'rgb(245, 218, 160)',
            color: '#fff',

            registerIcon: {
                color: '#fff'
            }
        }
    },

    registerIcon: {
        color: '#f8cf77',
        marginRight: '10px'
    },

    editButton: {
      fontWeight: 'bold',
      color: 'rgb(168, 168, 168)'
    },

    submitButton: {
        margin: '20px 0 20px 0',
        width: '80%',
        height: '50px',
        position: 'relative',
        background: '#f8cf77',
        border: '1px solid #f8cf77',
        borderRadius: '30px',
        boxSizing: 'border-box',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        
        '&:before': {
            content: '',
            width: '8px',
            height: '8px',
            border: 0,
            borderTop: '2px solid #fff',
            borderRight: '2px solid #fff',
            transform: 'rotate(45deg)',
            position: 'absolute',
            top: '50%',
            right: '25px',
            marginTop: '-6px',
        },
        '&:hover': {
            background: '#fff',
            color: '#f8cf77',
        },
        '&:hover:before': {
            borderTop: '2px solid #f8cf77',
            borderRight: '2px solid #f8cf77'
        }
    },

    disabledButton: {
        margin: '20px 0 20px 0',
        width: '80%',
        height: '50px',
        background: '#e6e1e1',
        border: '1px solid #e6e1e1',
        borderRadius: '30px',
        boxSizing: 'border-box',
        fontSize: '16px',
        fontWeight: 'bold',
    },

    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '50%',
        position: 'relative'
    },
    closeIcon: {
        position: 'absolute',
        right: 5,
        top: 2,
        cursor: 'pointer'
    },
  }));

export default ComponentStyles;