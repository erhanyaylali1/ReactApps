import React, { useState } from 'react';
import { fetchResults } from '../features/weathcerSlice';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

const SearchBar = (props) => {

    const [term, setTerm] = useState('');
    const dispatch = useDispatch();

    const onTermSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchResults(term));
        setTerm('');
        props.history.push('/');
    }
 
    return (
        <div className="container">
            <form 
                className="input-group"
                onSubmit={(e)=> onTermSubmit(e)}
            >
                <input 
                    className="w-75 form-control" 
                    placeholder="Search City" 
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
                <span className="input-group-append">
                    <button type="submit" className="btn btn-success">
                        Search
                    </button>
                </span>
            </form>
        </div>
    )
}

export default withRouter(SearchBar)
