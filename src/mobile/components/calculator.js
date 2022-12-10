import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Calculator(props) {

    const { onClickOutside, show } = props;
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [showNum, setShowNum] = useState();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside, show]);
    
    if (!show){
        return null;
    }
    const handleDisplay = (e) => {
        // console.log( 'clac',showNum, e.currentTarget.textContent);
        console.log('here');
        setShowNum(showNum + e.currentTarget.textContent)
    }
    
    return (
        <div className='opacity-back'>
            <div id="calculator" className={!show ? 'calculator' : 'calculator opencalc'} ref={ref}>
                <div className="modal-dialog">
                    <div className="modal-body">
                        <div className="d-flex">
                            <span className="possible-winning-text">Max Winning</span>
                            <span className="possible-winning-value text-right">0.00</span>
                        </div>
                        <div className="col-xs-12">
                            <span className="form-control text-right numpet-input">{showNum}</span>
                        </div>
                        <div className="col-xs-12">
                            <div className="form-group error">
                                Maximum Playing value is 5000
                            </div>
                        </div>
                        <div className="col-xs-12 calc-num">
                            <span className="num-quick">10</span>
                            <span className="num-quick">25</span>
                            <span className="num-quick">50</span>
                            <span className="num-quick">100</span>
                            <span className="num-quick">250</span>
                        </div>
                        <div className='row calc-num-pan'>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-4 calc-num" onClick={handleDisplay}>
                                        <a className="num-btn btn-group-justified" onClick={handleDisplay}>1</a>
                                    </div>
                                    <div className="col-4 calc-num" onClick={handleDisplay}>
                                        <a className="num-btn btn-group-justified">2</a>
                                    </div>
                                    <div className="col-4 calc-num" onClick={handleDisplay}>
                                        <a className="num-btn btn-group-justified">3</a>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 calc-num" onClick={handleDisplay}>
                                        <a className="num-btn btn-group-justified">4</a>
                                    </div>
                                    <div className="col-4 calc-num" onClick={handleDisplay}>
                                        <a className="num-btn btn-group-justified">5</a>
                                    </div>
                                    <div className="col-4 calc-num" onClick={handleDisplay}>
                                        <a className="num-btn btn-group-justified">6</a>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 calc-num" onClick={handleDisplay}>
                                        <a className="num-btn btn-group-justified">7</a>
                                    </div>
                                    <div className="col-4 calc-num" onClick={handleDisplay}>
                                        <a className="num-btn btn-group-justified">8</a>
                                    </div>
                                    <div className="col-4 calc-num" onClick={handleDisplay}>
                                        <a className="num-btn btn-group-justified">9</a>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8 calc-num" onClick={handleDisplay}>
                                        <a className="num-btn btn-group-justified">0</a>
                                    </div>
                                    <div className="col-4 calc-num" onClick={handleDisplay}>
                                        <a className="num-btn btn-group-justified">.</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="row height-50">
                                    <div className="col-xs-12 calc-num">
                                        <a className="num-btn btn-group-justified double-line">DEL</a>
                                    </div>
                                </div>
                                <div className="row height-50">
                                    <div className="col-xs-12 calc-num">
                                        <a className="num-btn btn-group-justified double-line">OK</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="clearfix"></div> */}
                    </div>
                    {/* <div className="clearfix"></div> */}
                </div>
            </div>
        </div>
    );
}
export default Calculator 