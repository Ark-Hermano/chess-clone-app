import React from 'react'
import { useDrag } from 'react-dnd'

const Piece = ({ houses, house, index }: any) => {

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'pawn',
    item: house.piece,
    collect: (monitor) => {
      if (house.piece) {
        house.piece.position = index
        house.piece.cord = {
          x: house.x,
          y: house.y
        }
      }
    },
    isDragging: (monitor) => {

      return true
    }
  }))


  return (
    <>
      <div ref={drag} className={`piece  ${house.piece.initialPosition === "bottom" ? 'dark' : 'light'}`} >
        <span>
          {house.piece.text}
        </span>
      </div>
    </>
  )
}

export default Piece