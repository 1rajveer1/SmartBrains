import './App.css';
import React from 'react';
import Logo from './componenets/Logo/Logo';
import Navigation from './componenets/navigation/Navigation';
import FaceRecognition from './componenets/FaceRecognition/FaceRecognition';
import ImageLinkForm from './componenets/ImageLinkForm/ImageLinkForm';
import SignIn from './componenets/SignIn/SignIn';
import Rank from './componenets/Rank/Rank';
import Register from './componenets/Register/Register';
import Particle from './componenets/ParticleComponent/ParticleComponent';


const clarifySteup = (imageUrl) =>{
      // Your PAT (Personal Access Token) can be found in the portal under Authentification
      const PAT = '651d5bf1f1eb4078964573effae6a1a0';
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = '1rajveer1';       
      const APP_ID = '1rajveer1';
      // Change these to whatever model and image URL you want to use
      const MODEL_ID = 'face-detection';
      const IMAGE_URL = imageUrl;

      ///////////////////////////////////////////////////////////////////////////////////
      // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
      ///////////////////////////////////////////////////////////////////////////////////
  
      const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
      });
  
      const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
      };
    return requestOptions;
}


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false,
    }
  };

  calculateFaceLocation = (data) =>{
    const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)

    return {
      leftCol : clarifyFace.left_col * width,
      topRow: clarifyFace. top_row * height,
      rightCol: width - (clarifyFace.right_col * width),
      bottomRow: height - (clarifyFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSumbit = () => {
    this.setState({imageUrl: this.state.input})
    // const url = this.state.input;
    console.log('yup',this.state)
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", clarifySteup(this.state.input))
    .then(response => response.json())
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
    console.log('is signed in',this.state.isSignedIn)
  }
  
  render (){
    // const { isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className="App">
      <Particle />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route === 'home' ? 
        <div>
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSumbit = {this.onButtonSumbit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /> 
      </div>
        : (
          this.state.route === 'signIn' ?
          <SignIn onRouteChange={this.onRouteChange}/> :
          <Register onRouteChange={this.onRouteChange}/>
        )
  }
    </div>
  );
}
}
export default App;
