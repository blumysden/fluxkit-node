
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import archieml from 'archieml'
import $ from 'jquery'

class Photos extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      photosData: {
        photos: []
      }
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/photos.aml',
      dataType: 'text'
    }).then((response) => {
      this.setState({
        photosData: archieml.load(response)
      })
    })
  }

  render() {
    let { photosData } = this.state,
        { filter } = this.props

    console.log(photosData);
    return <div className={ styles.photos }>
      { photosData.photos.map((photo, i) => {
        let tags = (photo.tags || '').split(',').map((t) => t.trim())
        if (!filter || tags.indexOf(filter) != -1) {
          return <figure key={ `photos-${i}` }>
            <img src={ `/images/${photo.image}` } />
            <figcaption className={ styles.terminal }>
              <p>{ photo.title }</p>
              <p>{ photo.description }</p>
            </figcaption>
          </figure>
        } else {
          return null;
        }
      }) }
    </div>
  }
}

Photos.propTypes = {
  filter: PropTypes.string
}

export default Photos;
