import React, { useState, useEffect, useRef } from 'react'
import Barcode from 'react-barcode';

function BarcodeContainer(props) {
  return (
    <div className='barCodePan'>
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
      <h1>Total stake: {props.totalStake}</h1>
      <h1>Max Winning: {props.maxWinning}</h1>
      {props.betCollectList.map((item, index) =>
        <h3 key={index}>{item.homeTeam} : {item.awayTeam}</h3>)
      }
      <div className='confirmPan'>
        <p onClick={() => props.onClickConfirm()} className='confirm'>Confirm</p>
      </div>
    </div>
  )
}
export default BarcodeContainer;