import './App.css';
import Logo from './componenets/Logo/Logo';
import Navigation from './componenets/navigation/Navigation';
import ImageLinkForm from './componenets/ImageLinkForm/ImageLinkForm';
import Rank from './componenets/Rank/Rank';
import Particle from './componenets/ParticleComponent/ParticleComponent';

function App() {
  return (
    <div className="App">
      <Particle />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*<FaceRecognition /> */}
    </div>
  );
}

export default App;
