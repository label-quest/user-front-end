import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNewGame, getNewGameMock, placeLabel, completedImage } from './reducers/GameActions';
import DraggableLabel from './DraggableLabel';

class Game extends React.Component {

  constructor(props){
    super(props);
    this.handleNextImage = this.handleNextImage.bind(this);
    this.handleSkipImage = this.handleSkipImage.bind(this);
  }

  componentWillMount(){
    this.props.getNewGameMock();
  }

  imagePress = (e) =>{
    alert(e.nativeEvent.locationX);
  }

  handleLabelDrop(x, y, id){
    console.log("drop");
    console.log(x, y, id);
    this.props.placeLabel(x, y, id);
  }

  handleNextImage(){
    console.log("handle next");
    this.props.completedImage(this.props.user.id, this.props.game.image.id, this.props.game.placed_labels);
    this.props.getNewGameMock();
  }

  handleSkipImage(){
    console.log("skipping image");
  }

  render() {
    if(this.props.game.image.id == 0){
      return(<Text>No image</Text>);
    }
    return(
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.dropZone}>
            <Image source={{uri:this.props.game.image.imageSrc}} style={{maxWidth: '100%',flex: 1}}/>
          </View>
          <View style={styles.ballContainer}>
            <View style={styles.row}>
               {
                  this.props.game.labels != undefined ? this.props.game.labels.map((item, index) => (
                     <DraggableLabel
                     key = {item.id}
                     onDrop = {this.handleLabelDrop.bind(this)}
                     id = {item.id}
                     text = {item.name}/>
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
  game: state.game,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  placeLabel: placeLabel(dispatch),
  getNewGame: getNewGame(dispatch),
  getNewGameMock: getNewGameMock(dispatch),
  completedImage: completedImage(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);