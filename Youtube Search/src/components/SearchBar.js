import React from "react";



class SearchBar extends React.Component {
    
    state = { term: '' };
    
    onInputChange = (e) => {
        this.setState({ term: e.target.value });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.propFunc(this.state.term);
    }

    render() {
        
        return(
            <div className="ui segment SearchBar">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="field" style={{display: "flex", flexDirection: "row"}}>
                        <input 
                            placeholder="Video Search"
                            type="text" 
                            value={this.state.term} 
                            onChange={this.onInputChange} 
                        />
                        <button className="ui animated  historySearchButton button">
                            <div className="visible content">Search</div>
                            <div className="hidden content">
                                <i className="search icon"></i>
                            </div>
                        </button>
                    </div>
                    
                </form>
            </div>
        );
    };
};

export default SearchBar;