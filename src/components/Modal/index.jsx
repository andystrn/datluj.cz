import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css"
import './style.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';


const ModalDatluj = ({ show, onClose, words, mistakes, statistic, timeLimit }) => {
    const [name, setName] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let scoreBoardData = JSON.parse(localStorage.getItem('players'));

        if (scoreBoardData === null) {
            scoreBoardData = []
        }

        const player = { name: name, score: words, mistakes: mistakes, limit: timeLimit };
        scoreBoardData.push(player);

        localStorage.setItem('players', JSON.stringify(scoreBoardData));
        setName('');
        setShowAlert(true);
    }

    const handleClick = () => {
        onClose();
        setShowAlert(false);
    }

    return (
        <>
            <div style={{ position: '' }}>
                <Modal show={show} >
                    <Modal.Header>
                        <Modal.Title className='text-uppercase'>Konec hry</Modal.Title>
                        <Link to="/" className='navLink' onClick={handleClick} style={{ width: '40px', height: '40px' }}>X</Link>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex flex-column mb-3'>
                            <p className='fs-5 text-uppercase'>Správně nadatlovaná slova: <span className='fw-bold fs-3 text'>{words}</span> </p>
                            <p className='fs-5 text-uppercase'>Počet chyb: <span className='fw-bold fs-3 text'>{mistakes}</span> </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='d-flex gap-3 '>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={name}
                                    placeholder='Jméno hráče'
                                    onChange={(e) => setName(e.target.value)} />

                                <button className='btn btn-success' type="submit">Zapsat do listiny výsledků</button>
                            </div>
                        </form>
                        <div className={`mt-2 ${showAlert ? 'alert alert-success' : 'invisible'}`} role="alert">
                            Výsledek byl zapsán do listiny výsledků
                        </div>
                        <p></p>
                        <h3>Statistika chybných slov:</h3>
                        {statistic.map((word) => <p>{word.word} - {word.mistakes} chyb</p>)}
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-between'>
                        <div className='d-flex gap-3'>
                            <Link to="/vysledky" className='navLink' style={{ width: '50%' }}>Výsledky</Link>
                            <Button onClick={handleClick} className='navLink' style={{ width: '50%' }}>Hrát znovu</Button>
                        </div>
                        <Link to="/" className='navLink' onClick={handleClick} style={{ width: '28%' }}>Zavřít</Link>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ModalDatluj;