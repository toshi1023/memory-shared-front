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
      }
    },
    sectionMobile: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
  }));

export default DisplayStyles;