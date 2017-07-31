
import React from 'react';
import styles from './styles.scss';
import Cmdline from '../Cmdline'
import Photos from '../Photos'

const COMMANDS = {
  'fauna': { redirect: '/specimens/fauna' },
  'list types': 'flora, fauna, fireworks'
}

class Specimens extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  renderSpecimens() {
    let { match } = this.props,
        filter = match.params.type

    if (filter) {
      if (filter === 'all') {
        return <Photos />
      } else {
        return <Photos filter={ filter }/>
      }
    }
  }

  render() {
    return (
      <div className={ styles.content }>
        <h1 className={ styles.terminal }>Project CCC: Specimens</h1>
        <Cmdline prompt="Enter type of specimen to explore" commands={ COMMANDS }/>
        { this.renderSpecimens() }
      </div>
    );
  }
}

export default Specimens;
