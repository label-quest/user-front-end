import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNewGame } from './reducers/GameActions';
import DraggableLabel from './DraggableLabel';

class Game extends React.Component {

  /*TODO: replace state with props using mapStateToProps*/
  state = {
    labels: [
       {'name': 'BMW', 'id': 1},
       {'name': 'SAAB', 'id': 2},
       {'name': '240 snus it', 'id': 3}
    ]
  }

  imagePress = (e) =>{
    alert(e.nativeEvent.locationX);
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.mainContainer}>
            <View style={styles.dropZone}>
              <Text style={styles.text}>Drop them here!</Text>
              {/*TODO: replace image with props.game.image*/}
              <Image source={require('./res/240.jpg')} style={{maxWidth: '100%',flex: 1}}/>
            </View>
            <View style={styles.ballContainer} />
              <View style={styles.row}>
                 {
                    //Todo: this.props.game.labels
                    this.state.labels.map((item, index) => (
                       <DraggableLabel
                       key = {item.id} 
                       text = {item.name}/>
                    ))
                 }
                
              </View>
            </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  row: {
    flexDirection: "row"
  },
  ballContainer: {
    height:100
  },
  dropZone: {
    height: 400,
    backgroundColor: "#00334d"
  },
  elementsContainer: {
    backgroundColor: '#ecf5fd',
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  },
  item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#d2f7f1'
   }
});

const mapStateToProps = state => ({
  game: state.game
});

const mapDispatchToProps = dispatch => ({
  getNewGame: getNewGame(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);