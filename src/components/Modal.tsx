import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function Modal({movie, findSimilar}:any) {
    return (
        <div className="modal-content">
            <h1>{movie.name}</h1>
            <p>{movie.score}/10</p>
            <ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button group">
                <Button>Wikipedia</Button>
                <Button onClick={() => findSimilar(movie)}>Similar movies</Button>
                <Button>IMDB</Button>
            </ButtonGroup>
        </div>
    )
}

export default Modal