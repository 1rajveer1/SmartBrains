const Rank = ({name, entries}) =>{
    return(
        <div>
            <div className="white f3">
                {` hello ${name}, you have sumbited..`}
            </div>
            <div className="white f1">
                {`${entries} pictures`}
            </div>
        </div>
    );
}
export default Rank;