import { Link } from 'react-router-dom';

const ScoreBoard = () => {
    let scores = JSON.parse(localStorage.getItem('players'));
    
    if (scores === null) {
        scores = []
    }

    let i = 1;

    return (
        <div className="d-flex flex-column gap-3 mx-auto" style={{ maxWidth: '760px', color: 'white' }}>
            <h1 className="h1 text-center text-uppercase mt-5 ">Výsledky</h1>
            <div>
                <h2 className='h2 text-center pb-2'>Datlování - 1 minuta</h2>
                <table className="table">
                    <thead className='thead'>
                        <tr>
                            <th>Pořadí</th>
                            <th>Hráči</th>
                            <th>Score</th>
                            <th>Chyby</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.filter((p) => p.limit === 1).sort((p1, p2) => (p1.score > p2.score ? -1 : 1)).map((player) =>
                            <tr key={player.name}>
                                <th scope="row">{i++}.</th>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                                <td>{player.mistakes}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className='h2 text-center pb-2'>Datlování - 2 minuty</h2>
                <table className="table">
                    <thead className='thead'>
                        <tr>
                            <th>Pořadí</th>
                            <th>Hráči</th>
                            <th>Score</th>
                            <th>Chyby</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.filter((p) => p.limit === 2).sort((p1, p2) => (p1.score > p2.score ? -1 : 1)).map((player) =>
                            <tr key={player.name}>
                                <th scope="row">{i++}.</th>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                                <td>{player.mistakes}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className='h2 text-center pb-2'>Datlování - 5 minut</h2>
                <table className="table">
                    <thead className='thead'>
                        <tr>
                            <th>Pořadí</th>
                            <th>Hráči</th>
                            <th>Score</th>
                            <th>Chyby</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.filter((p) => p.limit === 5).sort((p1, p2) => (p1.score > p2.score ? -1 : 1)).map((player) =>
                            <tr key={player.name}>
                                <th scope="row">{i++}.</th>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                                <td>{player.mistakes}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
            <Link to="/" className='navLink m-auto mt-3' >Zpět na hlavní stránku</Link>
        </div>
    )
}

export default ScoreBoard;