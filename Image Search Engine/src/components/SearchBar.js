import React from 'react';

class SearchBar extends React.Component {

    state = { term: '' };

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.sendInputfromSearch(this.state.term);
    };

    onInputChange = (e) => {
        this.setState({ term: e.target.value })
    }

    render() {

        return (
            <div className="ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <label>Image Search</label>
                        <input 
                            type='text'
                            value={this.state.term} 
                            onChange={this.onInputChange}
                        />
                    </div>
                </form>
            </div>
        );
    };
};

export default SearchBar