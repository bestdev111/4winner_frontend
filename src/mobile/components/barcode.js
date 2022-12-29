import React, { useState, useEffect, useRef } from 'react'
import Barcode from 'react-barcode';
import { betTypesList } from '../../utils/dataUtils'
function BarcodeContainer(props) {
  console.log('==>', props.betCollectList);
  return (
    <div className='barCodePan'>
      <div className='m-3 w-100 barcode-overflow'>
        {props.betCollectList.map((item, index) =>
          <div className='d-flex' key={index}>
            <div className='tip w-100'>
              <div className='tip-body'>
                <div className='tip-row'>
                  <div className="tip-col middle-col bold">{item.selectedOdds === 'o0' ? 'Draw' : item.selectedOdds === 'o1' ? item.homeTeam : item.awayTeam}</div>
                  <div className="tip-col right-col bold">{item.odds ? (item.odds[0][item.selectedOdds] / 100).toFixed(2) : item.odd ? item.odd : null}</div>
                  {/* <div className="tip-col right-col bold">{objFunc(item.odds[0], item, item.betType)}</div> */}
                </div>
                <div className='tip-row'>
                  <div className="tip-col middle-col">{betTypesList[item.betType].title}</div>
                  <div className="tip-col right-col bold">
                    <div className=" currentscore-green">{item.homeScore}:{item.awayScore}</div>
                  </div>
                </div>
                <div className='tip-row'>
                  <div className="tip-col middle-col">{item.homeTeam} - {item.awayTeam}</div>
                  <div className="tip-col right-col bold">
                    <div className=" currentscore-green">
                      {item.matchState > 2 ? item.matchTime ? item.matchTime + "'" : item.matchDate + " " + item.matchTime : item.matchDate ? item.matchDate : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='m-3'>
        <h1>Total stake: {props.totalStake}</h1>
        <h1>Max Winning: {props.maxWinning}</h1>
      </div>
      <div className='mb-5'>
        <Barcode
          className='barCode'
          value={props.barCodeJsonString}
          format="CODE128"
          displayValue={true}
          fontOptions=""
          font="monospace"
          textAlign="center"
          textPosition="top"
          textMargin={2}
          fontSize={20}
          background="#ffffff"
          lineColor="#000000"
          margin={10}
          marginTop={undefined}
          marginBottom={undefined}
          marginLeft={undefined}
          marginRight={undefined}
        />
      </div>
      <div className='confirmPan'>
        <p onClick={() => props.onClickConfirm()} className='confirm'>Confirm</p>
      </div>
    </div>
  )
}
export default BarcodeContainer;