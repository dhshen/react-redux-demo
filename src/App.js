import React,{ Component } from 'react';
class App extends Component{


    render(){

        const { number,increase,decrease} = this.props;

        return (
            <div>
                <div className="showPanel">
                    {number}
                </div>
                <div className="optPanel">
                    <button onClick={increase}>+</button>
                    <button onClick={decrease}>-</button>
                </div>
            </div>
        );
    }

}



export default App;