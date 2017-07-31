
import React, { PropTypes } from 'react';
import styles from './styles.scss';

function App({ children }) {
  return (
    <div className={ styles.content }>
      <div className={styles.terminal}>
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
