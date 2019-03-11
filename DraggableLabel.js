import React from "react";
import { StyleSheet, View, Text, PanResponder, Animated } from "react-native";
import { connect } from 'react-redux';

import { setResetLabels } from './reducers/GameActions';

class DraggableLabel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isBeingDragged: false,
      showDraggable: true,
      dropAreaValues: null,
      initals: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1)
    };
    this.resetLabel = this.resetLabel.bind(this);
  }

  componentWillMount() {
    this._val = { x:0, y:0 };
    this.setState({ initals: this._val });
    this.state.pan.addListener((value) => this._val = value);
    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderGrant: (e, gesture) => {
          this.setState({
            isBeingDragged: true
          })
          this.state.pan.setOffset({
            x:this._val.x,
            y:this._val.y
          })
          this.state.pan.setValue({ x:0, y:0 })
        },
        onPanResponderMove: Animated.event([ 
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ]),
        onPanResponderRelease: (e, gesture) => {
          //moveX, moveY is the latest screen coordinates of the recently-moved touch
          this.props.onDrop(gesture.moveX, gesture.moveY, this.props.id, this.props.name);
          this.setState({
            isBeingDragged: false
          })
          if (this.isDropArea(gesture)) {
            /*
            Animated.timing(this.state.opacity, {
              toValue: 0,
              duration: 1000
            }).start(() =>
              this.setState({
                showDraggable: false
              })
            );
            */
          } else {
            Animated.spring(this.state.pan, {
              toValue: { x: 0, y: 0 },
              friction: 5
            }).start();
          }
        }
      });
  }

  componentDidUpdate(){
    if(this.props.reset_labels){
      this.resetLabel();
    }
  }

  getLabelStyle(){
    return(
      {...styles.label, ...(this.state.isBeingDragged ? styles.pressed : {})}
    );
  }

  resetLabel(){
    console.log("resetLabel");
    this.state.pan.setOffset({ x: this.state.initals.x, y: this.state.initals.y});
    Animated.spring(this.state.pan, {
      toValue: { x: this.state.initals.x, y: this.state.initals.y },
      friction: 5
    }).start();
    this.props.setResetLabels(false);
  }

  isDropArea(gesture) {
    return gesture.moveY < 400;
  }

  render() {
    return (
      <View style={{ width: "20%", alignItems: "center" }}>
        {this.renderDraggable()}
      </View>
    );
  }

  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    if (this.state.showDraggable) {
      return (
        <View style={{ position: "absolute" }}>
          <Animated.Text 
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.label, {opacity:this.state.opacity}, this.state.isBeingDragged ? styles.pressed : {}]}
            >
            {this.props.name}
          </Animated.Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  label: {
    alignItems: 'center',
    backgroundColor: 'rgb(34, 155, 243)',
    borderColor: 'rgb(80, 171, 237)',
    borderRadius: 20,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  pressed: {
    backgroundColor: 'rgb(24, 245, 233)',
    borderStyle: 'dashed',
  }
});

const mapStateToProps = state => ({
  placed_labels: state.game.placed_labels,
  reset_labels: state.game.reset_labels
});

const mapDispatchToProps = dispatch => ({
  setResetLabels: setResetLabels(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DraggableLabel);