import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypeList, getAllMatches, getMatches } from '../../store/actions/sportsActions'

function Calculator(props) {

    const { onClickOutside, show } = props;
    const ref = useRef(null);
    const dispatch = useDispatch();

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

    if (!show)
        return null;

    return (
        <div className='opacity-back'>
            <div id="calculator" className={!show ? 'calculator' : 'calculator opencalc'} ref={ref}>
                <div class="modal-dialog">
                    <div class="modal-body">
                        <div class="d-flex">
                            <span class="possible-winning-text">Max Winning</span>
                            <span class="possible-winning-value text-right">0.00</span>
                        </div>
                        <div class="col-xs-12">
                            <span class="form-control text-right numpet-input"></span>
                        </div>
                        <div class="col-xs-12">
                            <div class="form-group error">
                                Maximum Playing value is 5000
                            </div>
                        </div>
                        <div class="col-xs-12 calc-num">
                            <span class="num-quick">10</span>
                            <span class="num-quick">25</span>
                            <span class="num-quick">50</span>
                            <span class="num-quick">100</span>
                            <span class="num-quick">250</span>
                        </div>
                        <div className='row calc-num-pan'>
                            <div class="col-9">
                                <div class="row">
                                    <div class="col-4 calc-num">
                                        <a class="num-btn btn-group-justified">1</a>
                                    </div>
                                    <div class="col-4 calc-num">
                                        <a class="num-btn btn-group-justified">2</a>
                                    </div>
                                    <div class="col-4 calc-num">
                                        <a class="num-btn btn-group-justified">3</a>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4 calc-num">
                                        <a class="num-btn btn-group-justified">4</a>
                                    </div>
                                    <div class="col-4 calc-num">
                                        <a class="num-btn btn-group-justified">5</a>
                                    </div>
                                    <div class="col-4 calc-num">
                                        <a class="num-btn btn-group-justified">6</a>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4 calc-num">
                                        <a class="num-btn btn-group-justified">7</a>
                                    </div>
                                    <div class="col-4 calc-num">
                                        <a class="num-btn btn-group-justified">8</a>
                                    </div>
                                    <div class="col-4 calc-num">
                                        <a class="num-btn btn-group-justified">9</a>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-8 calc-num">
                                        <a class="num-btn btn-group-justified">0</a>
                                    </div>
                                    <div class="col-4 calc-num">
                                        <a class="num-btn btn-group-justified">.</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="row height-50">
                                    <div class="col-xs-12 calc-num">
                                        <a class="num-btn btn-group-justified double-line">DEL</a>
                                    </div>
                                </div>
                                <div class="row height-50">
                                    <div class="col-xs-12 calc-num">
                                        <a class="num-btn btn-group-justified double-line">OK</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div class="clearfix"></div> */}
                    </div>
                    {/* <div class="clearfix"></div> */}
                </div>
            </div>
        </div>
    );
}
export default Calculator 