import update from 'immutability-helper'
import React, { FC, useEffect, useRef } from 'react'
import { useCallback, useState } from 'react'
import { useDrag, useDrop, XYCoord } from 'react-dnd'
import Board from './board'
import Cell from './cell'
import Piece from './piece'


const style = {
  width: 400,
}

export const Play: FC = () => {
  const [reset, setReset] = useState<any[]>([])

  const [houses, setHouses] = useState<any[]>([])
  const [modal, setModal] = useState<any>(false)
  const [promotionPeao, setPromotionPeao] = useState<any>()
  const [historic, setHistoric] = useState<any[]>([])
  const [houseSnap, setHouseSnap] = useState<any[]>([])
  const [historicIndex, setHistoricIndex] = useState<any>(historic.length - 1)
  const [state, setState] = useState<boolean>(false)
  const [turn, setTurn] = useState<any>('top')
  const [loading, setLoading] = useState<boolean>(true)
  const [whitePieces, setWhitePieces] = useState<any>([
    { id: 1, initialPosition: 'top', text: 'torre' },
    { id: 2, initialPosition: 'top', text: 'cavalo' },
    { id: 3, initialPosition: 'top', text: 'bispo' },
    { id: 4, initialPosition: 'top', text: 'rei' },
    { id: 5, initialPosition: 'top', text: 'rainha' },
    { id: 6, initialPosition: 'top', text: 'bispo' },
    { id: 7, initialPosition: 'top', text: 'cavalo' },
    { id: 8, initialPosition: 'top', text: 'torre' },
    { id: 9, initialPosition: 'top', text: 'peão' },
    { id: 10, initialPosition: 'top', text: 'peão' },
    { id: 11, initialPosition: 'top', text: 'peão' },
    { id: 12, initialPosition: 'top', text: 'peão' },
    { id: 13, initialPosition: 'top', text: 'peão' },
    { id: 14, initialPosition: 'top', text: 'peão' },
    { id: 15, initialPosition: 'top', text: 'peão' },
    { id: 16, initialPosition: 'top', text: 'peão' },
  ])

  const [blackPieces, setBlackPieces] = useState<any>([
    { id: 1, initialPosition: 'bottom', text: 'torre' },
    { id: 2, initialPosition: 'bottom', text: 'cavalo' },
    { id: 3, initialPosition: 'bottom', text: 'bispo' },
    { id: 4, initialPosition: 'bottom', text: 'rei' },
    { id: 5, initialPosition: 'bottom', text: 'rainha' },
    { id: 6, initialPosition: 'bottom', text: 'bispo' },
    { id: 7, initialPosition: 'bottom', text: 'cavalo' },
    { id: 8, initialPosition: 'bottom', text: 'torre' },
    { id: 9, initialPosition: 'bottom', text: 'peão' },
    { id: 10, initialPosition: 'bottom', text: 'peão' },
    { id: 11, initialPosition: 'bottom', text: 'peão' },
    { id: 12, initialPosition: 'bottom', text: 'peão' },
    { id: 13, initialPosition: 'bottom', text: 'peão' },
    { id: 14, initialPosition: 'bottom', text: 'peão' },
    { id: 15, initialPosition: 'bottom', text: 'peão' },
    { id: 16, initialPosition: 'bottom', text: 'peão' },
  ])

  useEffect(() => {

    let index = 0

    while (houses.length <= 63) {

      const object =
      {
        house: 'house',
        position: houses.length,
        piece: whitePieces[index] && ((whitePieces[index].text === "peão" && whitePieces[index].id === 11) || whitePieces[index].text === "torre" || whitePieces[index].text === "rei") ? whitePieces[index] : null,
        x: 0,
        y: 0
      }

      if (index > 47) {
        const rest = (index % 48 - 16) * -1
        const array = blackPieces
        const reversed = array.reverse().map((item: any) => item)
        const item = blackPieces.find((item: any) => item.id === rest && ((item.text === "peão" && item.id === 11) || item.text === "torre" || item.text === "rei"))
        object.piece = item ? item : null
      }
      if (index < 8) {
        object.y = Math.ceil((index + 1) / 8)
        object.x = index + 1
      } else {
        let rest = index % 8 + 1
        object.y = index % 8 ? Math.ceil(index / 8) : Math.ceil(index / 8) + 1
        object.x = rest
      }

      houses.push(object)
      index++
    };
    setReset(houses)
    setLoading(false)
  }, [])

  const handlePromotion = (piece: any) => {
    console.log({ piece })
    setModal(true)
    setPromotionPeao(piece)
  }

  const dropFunction = (monitor: any, index: any, setTurn: any) => {

    console.log({ historichoouses: houses })
    const newHouses = [...houses]
    ///////////attarck//////
    if (houses[index]?.piece && houses[index]?.piece === monitor.initialPosition) {
      return false

    }
    if (houses[index]?.piece && houses[index]?.piece.initialPosition === monitor?.initialPosition) {
      return false

    } else if (houses[index]?.piece && houses[index]?.piece.initialPosition !== monitor?.initialPosition) {

      houses[monitor?.position].piece = null
      houses[index].piece.initialPosition = monitor.initialPosition
      houses[index].piece.text = monitor.text

      const _houses = houses.map((house) => {
        house.highlighted = false
        house.liberatedByTop = false
        house.liberatedByBottom = false

        return house
      })

      historic.push({ newHouses: [...houseSnap], captured: true, piece: monitor, from: houses[monitor?.position].x + " - " + houses[monitor?.position].y, to: houses[index].x + " - " + houses[index].y })
      setHistoric([...historic])
      setHouses([...houses])

      return true

    } else {

      const houseDifference = Math.abs(houses[index].y - houses[monitor?.position].y)

      if (monitor && houseDifference === 2 && monitor.text === "peão") {
        houses[monitor?.position].piece.doubleHouseAlready = true
      }

      if (houses[index].enPassant && monitor.initialPosition === "top") {
        houses[index - 8].piece = null
      } else if (houses[index].enPassant && monitor.initialPosition === "bottom") {
        houses[index + 8].piece = null
      }

      houses[index].piece = null
      houses[monitor?.position].piece = null
      houses[index].piece = monitor


      if (houses[index].promotion) {
        handlePromotion(monitor)
      }


      const _houses = houses.map((house) => {

        if (houses[index].roqueToLeft
          && house?.piece?.text === 'torre'
          && house.y === houses[index].y &&
          house.x === 1) {
          houses[index + 1].piece = house.piece
          house.piece = null
        }

        if (houses[index].roqueToRight &&
          house?.piece?.text === 'torre' &&
          house.y === houses[index].y &&
          house.x === 8) {
          houses[index - 1].piece = house.piece
          house.piece = null

        }

        house.highlighted = false
        house.liberatedByTop = false
        house.liberatedByBottom = false

        return house
      })

      houses.map((house) => {
        house.roqueToRight = false
        house.roqueToLeft = false
        return house
      })

      historic.push({ newHouses: [...houseSnap], captured: false, piece: monitor, from: houses[monitor?.position].x + " - " + houses[monitor?.position].y, to: houses[index].x + " - " + houses[index].y })
      setHistoric([...historic])
      setHouses([...houses])

      return true
    }


  }

  useEffect(() => {

    console.log({ historicoativado: houses })
    setHouseSnap(houses)
  }, [modal, houses])



  const returnState = () => {

    return turn
  }


  const switchState = () => {
    if (turn === 'top') {
      setTurn('bottom')
      return 'bottom'
    } else {
      setTurn('top')
      return 'top'
    }
  }

  if (loading) {
    return <div>carregando</div>
  }

  const handleChangePiecePromotion = (text: string) => {
    houses.find((house: any) => {

      if (house.position === promotionPeao.position) {
        house.piece.text = text

      }

    })

    setModal(false)
    setHouses([...houses])
  }

  const handleGoHistory = () => {
    setHouses([...historic[historicIndex + 1].houses])

  }

  const handleUndoHistory = () => {
    setHouses([...historic[historicIndex - 1].houses])
  }

  const handleGoToIndexHistory = (index: number) => {

    console.log({ isIdentical: houses === historic[index].houses })

    setHistoricIndex(index)
    setHouses([...historic[index].houses])
  }

  console.log({ houses, historic: historic })

  return (
    <>
      <div>{modal && (
        <div>

          <button onClick={() => handleChangePiecePromotion("cavalo")} >cavalo</button>
          <button onClick={() => handleChangePiecePromotion("bispo")} >bispo</button>
          <button onClick={() => handleChangePiecePromotion("torre")} >torre</button>
          <button onClick={() => handleChangePiecePromotion("rainha")} >rainha</button>


        </div>

      )}</div>
      <button onClick={() => {
        switchState()

      }}>{`${turn}`}</button>
      <div className="">
        <Board
          returnState={returnState}
          dropFunction={dropFunction}
          handlePromotion={handlePromotion}
          switchState={switchState}
          houses={houses}
          setHouses={setHouses}
          setTurn={setTurn}
          turn={turn}
        />

        {historic.map((item, index) => (
          <div>
            <button onClick={() => handleGoToIndexHistory(index)}>
              <div>{item.from}</div>
              <div>{item.to}</div>
              <div>{item.piece.text}</div>
              <div>{item.newHouses[0]?.piece?.text}</div>

            </button>
          </div>
        ))}

        <button onClick={handleGoHistory}>go</button>
        <button onClick={handleUndoHistory}>undo</button>
      </div>
    </>
  )
}

