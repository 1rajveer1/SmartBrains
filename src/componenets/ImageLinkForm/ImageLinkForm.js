import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSumbit}) =>{
    return(
        <div>
            <p className="f3">
                {'Please only use PNG and JPEG images as other types may not be supported. Enjoy :) '}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type='tex'onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSumbit}>Detect</button>
                </div>
            </div>
        </div>
    );
}
export default ImageLinkForm;