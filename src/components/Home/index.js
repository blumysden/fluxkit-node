
import React from 'react';
import styles from './styles.scss';
import Cmdline from '../Cmdline'

const COMMANDS = {
  'Nbooks9': { redirect: '/specimens' }
}

class Home extends React.Component {

  constructor (props) {
    super(props)
  }

  render() {
    return <div className={ styles.content }>
      <section>
        <h1 className={ styles.terminal }>Project CCC</h1>
        <Cmdline prompt="Enter password for access" commands={ COMMANDS } defaultResponse="Invalid password.  Try again."/>
      </section>
    </div>
  }
}

export default Home;
