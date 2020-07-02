import React from 'react'

class Search extends React.Component{
    constructor(props) {
        super(props) 
        this.state = {
            value:''
        };
    }
    handleInput(e){
        this.props.handleInput(e.target.value);
        this.setState({
            value: e.target.value
        });
    }
    render(){
        // <div className="search-bar">
        //     <input className="input-contorl" type="text" value={this.state.value} onChange={this.handleInput.bind(this)} />
        // </div>
    }
}

export default Search;