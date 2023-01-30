import React, { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'

const Cell = ({
  houses,
  children,
  type,
  dropFunction,
  index,
  cord,
  setTurn,
  turn,
  house,
  returnState,
  switchState,
  setState,
  state,
  item,
  validateMoves,
  handlePromotion
}: any) => {

  const [first, setfirst] = useState<any>()

  useEffect(() => {

  }, [first])

  useEffect(() => {

  }, [houses])


  const functionCanDrop = (item: any, cord: any) => {

    const houseF = houses.find((house: any) => house.position === cord.position)
    const newCord = houses.find((house: any) => house.x === cord.x && house.y === cord.y)


    console.log({ gu: cord })
    if (item.initialPosition && !cord.piece) {

      if (
        newCord.highlighted && item?.text === "peão") {
        return true

      } else if (
        newCord.highlighted && item?.text === "peão") {
        return true

      }

      if (
        (cord.y === item?.cord.y + 2 && cord.x === item?.cord.x + 1 ||
          cord.y === item?.cord.y + 2 && cord.x === item?.cord.x - 1 ||
          cord.y === item?.cord.y - 2 && cord.x === item?.cord.x + 1 ||
          cord.y === item?.cord.y - 2 && cord.x === item?.cord.x - 1 ||
          cord.y === item?.cord.y + 1 && cord.x === item?.cord.x + 2 ||
          cord.y === item?.cord.y + 1 && cord.x === item?.cord.x - 2 ||
          cord.y === item?.cord.y - 1 && cord.x === item?.cord.x + 2 ||
          cord.y === item?.cord.y - 1 && cord.x === item?.cord.x - 2)
        && item?.text === "cavalo") {


        return true
      }

      if (
        (cord.y !== item?.cord.y && cord.x === item?.cord.x ||
          cord.x !== item?.cord.x && cord.y === item?.cord.y)
        && item?.text === "torre") {

        return true
      }

      if (
        !(cord.y === item?.cord.y + 2 && cord.x === item?.cord.x + 1 ||
          cord.y === item?.cord.y + 2 && cord.x === item?.cord.x - 1 ||
          cord.y === item?.cord.y - 2 && cord.x === item?.cord.x + 1 ||
          cord.y === item?.cord.y - 2 && cord.x === item?.cord.x - 1 ||
          cord.y === item?.cord.y + 1 && cord.x === item?.cord.x + 2 ||
          cord.y === item?.cord.y + 1 && cord.x === item?.cord.x - 2 ||
          cord.y === item?.cord.y - 1 && cord.x === item?.cord.x + 2 ||
          cord.y === item?.cord.y - 1 && cord.x === item?.cord.x - 2)
        &&
        !(cord.y === item?.cord.y + 2 && cord.x === item?.cord.x + 1 ||
          cord.y === item?.cord.y + 2 && cord.x === item?.cord.x - 1 ||
          cord.y === item?.cord.y - 2 && cord.x === item?.cord.x + 1 ||
          cord.y === item?.cord.y - 2 && cord.x === item?.cord.x - 1 ||
          cord.y === item?.cord.y + 1 && cord.x === item?.cord.x + 2 ||
          cord.y === item?.cord.y + 1 && cord.x === item?.cord.x - 2 ||
          cord.y === item?.cord.y - 1 && cord.x === item?.cord.x + 2 ||
          cord.y === item?.cord.y - 1 && cord.x === item?.cord.x - 2)


        &&

        ((cord.y !== item?.cord.y && cord.x !== item?.cord.x) ||
          (cord.x !== item?.cord.x && cord.y !== item?.cord.y))
        && item?.text === "bispo") {

        return true
      }

      if (
        !(cord.y === item?.cord.y + 2 && cord.x === item?.cord.x + 1 ||
          cord.y === item?.cord.y + 2 && cord.x === item?.cord.x - 1 ||
          cord.y === item?.cord.y - 2 && cord.x === item?.cord.x + 1 ||
          cord.y === item?.cord.y - 2 && cord.x === item?.cord.x - 1 ||
          cord.y === item?.cord.y + 1 && cord.x === item?.cord.x + 2 ||
          cord.y === item?.cord.y + 1 && cord.x === item?.cord.x - 2 ||
          cord.y === item?.cord.y - 1 && cord.x === item?.cord.x + 2 ||
          cord.y === item?.cord.y - 1 && cord.x === item?.cord.x - 2)
        &&
        ((cord.y !== item?.cord.y && cord.x !== item?.cord.x ||
          cord.x !== item?.cord.x && cord.y !== item?.cord.y) ||
          (cord.y !== item?.cord.y && cord.x === item?.cord.x ||
            cord.x !== item?.cord.x && cord.y === item?.cord.y)
        )
        && item?.text === "rainha") {

        return true
      }

      if (
        (cord.y === item?.cord.y + 1 && cord.x === item?.cord.x ||
          cord.y === item?.cord.y && cord.x === item?.cord.x + 1 ||
          cord.y === item?.cord.y - 1 && cord.x === item?.cord.x ||
          cord.y === item?.cord.y && cord.x === item?.cord.x - 1 ||
          cord.y === item?.cord.y + 1 && cord.x === item?.cord.x + 1 ||
          cord.y === item?.cord.y - 1 && cord.x === item?.cord.x - 1 ||
          cord.y === item?.cord.y - 1 && cord.x === item?.cord.x + 1 ||
          cord.y === item?.cord.y + 1 && cord.x === item?.cord.x - 1 ||
          houseF.roqueToRight || houseF.roqueToLeft
        )
        && item?.text === "rei") {

        if (houseF.roqueToLeft) {
          return true
        }

        return true
      }

      ////////////
      return false
    }
    return false
  }

  const [collectedProps, drop] = useDrop(() => ({
    accept: ['pawn', 'knight', 'tower'],
    canDrop: (item: any, monitor: any) => {

      return functionCanDrop(item, cord)
    },
    drop: (monitor) => {

      dropFunction(monitor, index, setTurn)
    },
  }))


  return (
    <div ref={drop} onDragStartCapture={(e) => {
      if (turn !== item.initialPosition) {
        e.preventDefault()
      } else {
        validateMoves()
      }
      setState(state + 'a')

    }} onDrop={() => {
      switchState()

      if (turn === 'top') {
        setfirst('bottom')
      } else {
        setfirst('top')
      }
    }} className={`house-cell 
        ${houses[index].liberatedByBottom ? 'liberatedByBottom' : ''}  
        ${houses[index].liberatedByTop ? 'liberatedByTop' : ''}  
        ${houses[index].highlighted ||
        (houses[index].roqueToRight ||
          houses[index].roqueToLeft) ? 'highlighted' : ''}  
        ${type}`} key={index}
    >

      {(houses[index].highlighted ||
        houses[index].roqueToRight ||
        houses[index].roqueToLeft) && (
          <div className='black-cicle'>
          </div>
        )}

      {houses[index].blocked && 'b'}
      {houses[index].locked && 'l'}
      {houses[index].roqueToRight && 'rt'}
      {houses[index].roqueToLeft && 'rl'}
      {houses[index].enPassant && 'ep'}
      {houses[index].promotion && 'pro'}



      {children}
    </div>
  )
}

export default Cell