import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

/**
 * PC画面, スマホ画面切り替え
 */
const DisplayStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
          display: "block"
      },
      marginBottom: "15px"
    },
    sectionMobileAppBar: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    sectionMobile: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none"
        },
        marginBottom: "100px"
    },
    sectionMobileNoBottom: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none"
        },
    },
  }));

export default DisplayStyles;