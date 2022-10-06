import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from '../../shared/Header/Header';
import styles from './styles';

const Layout = () => {
  return (
    <Box sx={styles.layout}>
      <Header />
      <Box sx={styles.main}>
        <main>
          <Outlet />
        </main>
      </Box>
    </Box>
  );
};

export default Layout;
