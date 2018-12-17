import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNewGame, getNewGameMock, placeLabel, completedImage, changeStorageBox } from './reducers/GameActions';
import DraggableLabel from './DraggableLabel';

class Game extends React.Component {

  constructor(props){
    super(props);
    this.handleNextImage = this.handleNextImage.bind(this);
    this.handleSkipImage = this.handleSkipImage.bind(this);
  }

  componentWillMount(){

    this.props.getNewGame(this.props.current_box);
    this.props.getNewGame((this.props.current_box+1)%2);
  }

  imagePress = (e) =>{
    alert(e.nativeEvent.locationX);
  }

  handleLabelDrop(x, y, id, name){
    this.props.placeLabel(x, y, id, name);
  }

  //Send the user_id, image_id and the placed label positions to the api. 
  //After that, change the current storage box and load a new game into the now unused box
  handleNextImage(){
    const game = this.props.boxes[this.props.current_box];
    this.props.completedImage(this.props.user.user_info.id, game.image_id, this.props.placed_labels);
    //var other_box = (this.props.current_box+1)%2;
    this.props.changeStorageBox((this.props.current_box+1)%2);
    this.props.getNewGame(this.props.current_box);
  }

  handleSkipImage(){
    console.log("skipping image");
  }

  render() {
    const game = this.props.boxes[this.props.current_box];
    var box = this.props.current_box;
    if(game.img_path == undefined){
      return(<View style={styles.container}>
        <Text>Ingen bild</Text>
        </View>
        )
    }
    return(
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text>Current box: {box}</Text>
          <View style={styles.dropZone}>
            <Image source={{uri:game.img_path}} style={{maxWidth: '100%',flex: 1}}/>
          </View>
          <View style={styles.ballContainer}>
            <View style={styles.row}>
               {
                  game.labels != undefined ? game.labels.map((item, index) => (
                     <DraggableLabel
                     key = {item.id}
                     onDrop = {this.handleLabelDrop.bind(this)}
                     id = {item.id}
                     name = {item.name}/>
                  )) : <Text>NEXT</Text>
               }
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button 
              title="Next image"
              onPress={() => this.handleNextImage()}
            />
            <Button 
              title="Skip image"
              onPress={() => this.handleSkipImage()}
            />
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
  buttonContainer:{
    height: 100
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
  placed_labels: state.game.placed_labels,
  boxes: state.game.boxes,
  current_box: state.game.current_box,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  placeLabel: placeLabel(dispatch),
  getNewGame: getNewGame(dispatch),
  getNewGameMock: getNewGameMock(dispatch),
  completedImage: completedImage(dispatch),
  changeStorageBox: changeStorageBox(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);