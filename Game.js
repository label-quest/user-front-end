import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNewGame, getNewGameMock, placeLabel, completedImage, changeStorageBox, setResetLabels } from './reducers/GameActions';
import DraggableLabel from './DraggableLabel';

class Game extends React.Component {
  constructor(props){
    super(props);
    const {height, width} = Dimensions.get('window');
    this.state = {time: 0, labelsPlaced: 0, roundsPlayed: 0, score: 0, height: height, width: width};
    this.handleNextImage = this.handleNextImage.bind(this);
    this.handleSkipImage = this.handleSkipImage.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
    this.incrementLabelCount = this.incrementLabelCount.bind(this);
    this.resetLabelCount = this.resetLabelCount.bind(this);
  }

  componentWillMount(){
    this.props.getNewGame(this.props.current_box);
    this.props.getNewGame((this.props.current_box+1)%2);
  }

  componentDidMount(){
    this.startTimer();
  }

  startTimer(){
    setInterval(this.incrementTimer, 1000);
  }

  incrementTimer(){ this.setState({time:this.state.time+1}) }
  resetTimer(){ this.setState({time: 0}) }
  incrementScore(score){ this.setState({score:this.state.score+score}) }
  incrementLabelCount(count){ this.setState({labelsPlaced:this.state.labelsPlaced+count}) }
  resetLabelCount(){ this.setState({labelsPlaced:0}) }

  imagePress = (e) =>{ alert(e.nativeEvent.locationX); }

  handleLabelDrop(x, y, id, name){
    perc_x = x/this.state.width;
    perc_y = y/this.state.height;
    this.props.placeLabel(perc_x, perc_y, id, name);
  }

  //Send the user_id, image_id and the placed label positions to the api. 
  //After that, change the current storage box and load a new game into the now unused box
  handleNextImage(){
    const game = this.props.boxes[this.props.current_box];
    labels = this.props.placed_labels;
    this.props.completedImage(this.props.user.user_info.id, game.image_id, labels);
    this.incrementLabelCount(labels.length);
    
    var accuracy = 0;
    var score = 0;
    for(var i = 0; i<labels.length; i++){
      accuracy = (labels[i].x + labels[i].y)*100;
      labelScore = Math.round(accuracy-this.state.time*5);
      if(labelScore<0) labelScore = 0;
      this.incrementScore(labelScore);
    }
    
    this.props.changeStorageBox((this.props.current_box+1)%2);
    this.props.getNewGame(this.props.current_box);
    this.props.setResetLabels(true);
    this.resetTimer();
  }

  handleSkipImage(){
    this.props.changeStorageBox((this.props.current_box+1)%2);
    this.props.getNewGame(this.props.current_box);
    this.props.setResetLabels(true);
    this.resetTimer();
  }

  //generate all the labels for this image
  makeDraggables(labels){
    return(
      labels != undefined ? labels.map((item, index) => (
         <DraggableLabel
         key = {index}
         onDrop = {this.handleLabelDrop.bind(this)}
         id = {item.id}
         name = {item.name}/>
      )) : <Text>NEXT</Text>
    )
  }

  render() {
    var game = this.props.boxes[this.props.current_box];
    var box = this.props.current_box;
    if(game.img_path == undefined){
      return(
        <View style={styles.container}>
          <Text>Ingen bild</Text>
        </View>
      )
    }
    return(
      <View style={styles.container}>
      <Text>Labels: {this.state.labelsPlaced}, Time: {this.state.time}, Score: {this.state.score}</Text>
        <View style={styles.mainContainer}>
          <View style={styles.dropZone}>
            <Image source={{uri:game.img_path}} style={{maxWidth: '100%',flex: 1}}/>
          </View>
          <View style={styles.ballContainer}>
            <View style={styles.row}>
                {this.makeDraggables(game.labels)}
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
    height: 100
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
  changeStorageBox: changeStorageBox(dispatch),
  setResetLabels: setResetLabels(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);