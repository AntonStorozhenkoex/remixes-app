import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import styles from './styles';

const Header = () => {
  return (
    <header>
      <Box sx={styles.filler} />
      <Box sx={styles.headerWrapper}>
        <Container sx={styles.header}>
          <Link to="/">Test App</Link>
        </Container>
        <Container sx={styles.header}>
          <Link data-link="remixes" to="/remixes">
            Remixes
          </Link>
        </Container>
      </Box>
    </header>
  );
};

export default Header;
