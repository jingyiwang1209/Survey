import React from "react";

const SearchBar = props => {
    return (
        <input
            type="text"
            placeholder="survey..."
            onChange={event => props.onTermChange(event.target.value)}
        />
    );
};

export default SearchBar;

