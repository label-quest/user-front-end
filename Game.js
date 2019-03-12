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
    this.state = {feedback:'Place some labels!', time: 10, labelsPlaced: 0, roundsPlayed: 0, score: 0, height: height, width: width};
    this.handleNextImage = this.handleNextImage.bind(this);
    this.handleSkipImage = this.handleSkipImage.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
    this.incrementLabelCount = this.incrementLabelCount.bind(this);
    this.resetLabelCount = this.resetLabelCount.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.handleNewGameEvent = this.handleNewGameEvent.bind(this);
    this.setFeedback = this.setFeedback.bind(this);
  }

  componentWillMount(){
    this.props.getNewGame(this.props.current_box);
    this.props.getNewGame((this.props.current_box+1)%2);
  }

  componentDidMount(){
    this.startTimer();
  }

  startTimer(){
    setInterval(this.decrementTimer, 1000);
  }

  decrementTimer(){ 
    this.setState({time:this.state.time-1})
    if(this.state.time == 0){
      this.setFeedback('Time out, gotta go faster!');
      this.handleSkipImage();
      this.resetTimer();
    }
  }

  resetTimer(){ this.setState({time: 10}) }
  incrementScore(score){ this.setState({score:this.state.score+score}) }
  incrementLabelCount(count){ this.setState({labelsPlaced:this.state.labelsPlaced+count}) }
  resetLabelCount(){ this.setState({labelsPlaced:0}) }

  setFeedback(feedback){ this.setState({feedback:feedback}) }

  imagePress = (e) =>{ alert(e.nativeEvent.locationX); }

  handleLabelDrop(x, y, id, name){
    perc_x = x/this.state.width;
    perc_y = y/this.state.height;
    this.props.placeLabel(perc_x, perc_y, id, name);
  }

  //makes a score based on accuracy and time. Score is between 10 (accuracy = 0, time = 1) and 100 (accuracy = 1, time = 10)
  handleScore(){
    var accuracy = 0;
    var score = 0;
    labels = this.props.placed_labels;
    for(var i = 0; i<labels.length; i++){
      console.log(labels[i]);
      accuracy = (1-(Math.abs(0.5-labels[i].x)+Math.abs(0.5-labels[i].y)))*50;
      labelScore = Math.round(accuracy+this.state.time*5);
      if(labelScore<0) labelScore = 0;
      score += labelScore;
    }
    score = Math.round(score/labels.length);
    this.incrementScore(score);
    console.log("SCORE: " + score);
    var feedback = '';
    if (score < 30) feedback = 'We\'re not sure that\'s correct'
    else if (score < 50) feedback = 'You can do better!'
    else if (score < 70) feedback = 'Good job!'
    else if (score < 80) feedback = 'Very nice!'
    else if (score > 80) feedback = 'Perfect!'
    this.setFeedback(feedback);
  }

  //Send the user_id, image_id and the placed label positions to the api. 
  //After that, change the current storage box and load a new game into the now unused box
  handleNextImage(){
    const game = this.props.boxes[this.props.current_box];
    labels = this.props.placed_labels;
    this.props.completedImage(this.props.user.user_info.id, game.image_id, labels);
    this.incrementLabelCount(labels.length);
    this.handleScore();
    this.handleNewGameEvent();
  }

  handleSkipImage(){
    this.handleNewGameEvent();
  }

  handleNewGameEvent(){
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
      <Text style={styles.textZone}>Labels placed: {this.state.labelsPlaced}, Time: {this.state.time}, Score: {this.state.score}</Text>
      <Text style={styles.textZone}>{this.state.feedback}</Text>
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
    height: 80
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
  textZone: {
    textAlign: "center",
    fontSize: 18,
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