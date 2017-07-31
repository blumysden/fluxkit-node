
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import styles from './styles.scss';

class Cmdline extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      cmd: '',
      redirect: false,
      stack: [
        { msg: this.props.prompt }
      ]
    }
    this.validate = this.validate.bind(this)
    this.update = this.update.bind(this)
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  componentDidMount() {
    this.focus()
  }

  componentDidUpdate() {
    this.focus();
  }

  update(e) {
    let cmd = this.input.value
    this.setState({ cmd })
  }

  addToStack(msg, cmd) {
    this.setState({
      stack: this.state.stack.concat({ msg, cmd }),
      cmd: ''
    })
  }

  validate(e) {
    e.preventDefault()
    let cmd = this.input.value,
        { commands, defaultResponse } = this.props

    if (commands[cmd]) {
      if (commands[cmd].redirect) {
        return this.setState({redirect: commands[cmd].redirect});
      } else if (typeof commands[cmd] === 'string') {
        return this.addToStack(commands[cmd], cmd)
      } else if (typeof commands[cmd] === 'function') {
        return this.addToStack(commands[cmd](cmd), cmd)
      }
    }
    defaultResponse = defaultResponse || `No command ${cmd}`
    return this.addToStack(defaultResponse, cmd)
  }

  renderStack() {
    let { stack } = this.state,
        count = stack.length

    return stack.map((item, i) => {
      return <div key={ `cmdstack-${i}` }>
        { (item.cmd) ? <div className={ styles.terminal }>>&nbsp; { item.cmd }</div> : null }
        <label className={ styles.terminal }>{ item.msg }</label>
        { (i === count - 1) ?
          <div>
            <span className={ styles.terminal }>>&nbsp;</span>
            <input type="text" value={ this.state.cmd } onChange={ this.update } className={ styles.terminal } ref={ (el) => this.input = el } />
          </div> :
          null }
      </div>
    })
  }

  render() {
    let { redirect } = this.state
    if (this.state.redirect) {
      return <Redirect push to={ redirect } />
    } else {
      return <form onSubmit={ this.validate }>
        { this.renderStack() }
      </form>
    }
  }
}

Cmdline.defaultProps = {
  prompt: 'Enter password for access'
}

Cmdline.propTypes = {
  prompt: PropTypes.string,
  commands: PropTypes.object.isRequired,
  defaultResponse: PropTypes.string
}

export default Cmdline;
