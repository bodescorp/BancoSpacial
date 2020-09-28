import React, { useState } from 'react';

import './styles.css';
import '../../global.css';
import api from '../../services/api'

export default function Logon() {
    const [nameCidade, setnameCidade] = useState('');
    const [box,setviewbox] = useState([]);
    const [svg,setsvg] = useState([]);
    
    
    async function enviarCidade(e) {
        e.preventDefault();

        console.log(nameCidade);
        try {
            const getViewBox = await api.get(`getViewBox/${nameCidade}`);
            const getSvg = await api.get(`getSvg/${ nameCidade }`);
            console.log({getSvg}, {getViewBox}); 

            setviewbox(getViewBox.data[0].getviewbox);
            setsvg(getSvg.data[0].st_assvg);
        } catch (error) {
            alert('Major deu certo não');
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <form onSubmit={enviarCidade}>
                    <h1>Me diga sua cidade</h1>

                    <input
                        placeholder="cidade"
                        value={nameCidade}
                        onChange={e => setnameCidade(e.target.value)}
                    />
                    <button className="button" type="submit">Enviar</button>
                </form>
            </section>
            
            <svg height="500" width="500" viewBox = {box}>
                <path d={svg} />
            </svg>

        </div>
    );
}