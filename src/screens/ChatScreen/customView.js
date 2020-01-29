import React from 'react';
import {
    Linking,
    Platform,
    StyleSheet,
    TouchableOpacity,
    ViewPropTypes,
    MapView
} from 'react-native';
import PropTypes from 'prop-types';

export default class CustomView extends React.Component {
    render() {
        null;
    }
}

const styles = StyleSheet.create({
    mapView: {
      width: 150,
      height: 100,
      borderRadius: 13,
      margin: 3
    }
  });
  
  CustomView.defaultProps = {
    currentMessage: {},
    containerStyle: {},
    mapViewStyle: {}
  };
  
  CustomView.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    mapViewStyle: ViewPropTypes.style
  };
  