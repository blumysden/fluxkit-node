
import React from 'react';
import { Route, Link } from 'react-router-dom'
import App from '../components/App';


// https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
function asyncComponent(getComponent) {
  class AsyncComponent extends React.Component {

    constructor(props) {
      super(props)
      this.state = { Component: AsyncComponent.Component };
    }

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }

  AsyncComponent.Component = null
  return AsyncComponent
}

// Webpack 2 supports ES2015 `import()` by auto-
// chunking assets. Check out the following for more:
// https://webpack.js.org/guides/migrating/#code-splitting-with-es2015

const Deck = asyncComponent(() =>
  System.import(/* webpackChunkName: "home" */'../components/Deck').then(module => module.default)
)

const routes = <div>
  <Route exact path="/" component={Deck}/>
  <Route exact path="/deck" component={Deck}/>
  <Route exact path="/deck/:slide" component={Deck}/>
</div>

// Unfortunately, HMR breaks when we dynamically resolve
// routes so we need to require them here as a workaround.
// https://github.com/gaearon/react-hot-loader/issues/288
if (module.hot) {
  require('../components/Deck');    // eslint-disable-line global-require
}

export default routes;
