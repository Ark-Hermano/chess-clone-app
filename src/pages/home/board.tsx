import React, { useEffect, useState } from 'react'
import Cell from './cell'
import Piece from './piece'

const Board = ({
  houses,
  setHouses,
  dropFunction,
  checkDrop,
  turn,
  setTurn,
  returnState,
  switchState
}: any) => {

  let operator = 'impar'
  const [turnState, setTurnState] = useState(turn)
  const [checkState, setCheckState] = useState<any>({ checker: null, kingHouse: null })
  const [state, setState] = useState<any>()
  const [checkMate, setCheckMate] = useState<any>()

  function validate(item: any, cord: any, index: any) {
    if (item.text === 'torre' || item.text === 'rainha') {
      let temPeça = false
      let index = cord.x + 1

      while (index < 9 && !temPeça) {

        const house = houses.find((house: any) => house.x === index && house.y === cord.y)

        if (house && house.piece) {
          if ((house?.piece && house.piece.initialPosition !== item.initialPosition)) {
            if (house.piece.text === "rei" && house.piece.initialPosition !== item.initialPosition) {

              const piece = houses.filter((house: any) => house.x > cord.x && house.y === cord.y).find((house: any) => house.piece && house.piece.initialPosition !== turn)

              if (!piece) {
                houses.filter((house: any) => house.x >= cord.x && house.y === cord.y).map((house: any) => house.blocked = true)

                house.blocked = true
              }
            }
          }

          temPeça = true
        } else if (!house?.piece && house) {
          if (house.piece !== "rei") {
          }
        }

        index++
      }

      index = cord.x - 1
      temPeça = false

      while (index > 0 && !temPeça) {

        const house = houses.find((house: any) => house.x === index && house.y === cord.y)

        if (house && house.piece) {
          if ((house?.piece && house.piece.initialPosition !== item.initialPosition)) {
            if (house.piece.text === "rei" && house.piece.initialPosition !== item.initialPosition) {


              const piece = houses.filter((house: any) => house.x > cord.x && house.y === cord.y).find((house: any) => house.piece && house.piece.initialPosition !== turn)

              if (!piece) {
                houses.filter((house: any) => house.x <= cord.x && house.y === cord.y).map((house: any) => house.blocked = true)

                house.blocked = true

              }

            }
          }
          temPeça = true
        } else if (!house?.piece && house) {

          if (house.piece === "rei") {
            house.blocked = true
          }
        }

        index--
      }

      temPeça = false
      index = cord.y + 1

      while (index < 9 && !temPeça) {

        const house = houses.find((house: any) => house.y === index && house.x === cord.x)

        if (house && house.piece) {
          if ((house?.piece && house.piece.initialPosition !== item.initialPosition)) {
            if (house.piece.text === "rei" && house.piece.initialPosition !== item.initialPosition) {


              const piece = houses.filter((house: any) => house.y > cord.y && house.x === cord.x).find((house: any) => house.piece && house.piece.initialPosition !== turn)

              if (!piece) {
                houses.filter((house: any) => house.y >= cord.y && house.x === cord.x).map((house: any) => house.blocked = true)

                house.blocked = true

              }

            }
          }
        } else if (!house?.piece && house) {

        }

        index++
      }

      index = cord.y - 1
      temPeça = false

      while (index > 0 && !temPeça) {

        const house = houses.find((house: any) => house.y === index && house.x === cord.x)

        if (house && house.piece) {
          if ((house?.piece && house.piece.initialPosition !== item.initialPosition)) {
            if (house.piece.text === "rei" && house.piece.initialPosition !== item.initialPosition) {


              const piece = houses.filter((house: any) => house.y < cord.y && house.x === cord.x).find((house: any) => house.piece && house.piece.initialPosition !== turn)

              if (!piece) {
                houses.filter((house: any) => house.y <= cord.y && house.x === cord.x).map((house: any) => house.blocked = true)

                house.blocked = true

              }

            }
          }
          temPeça = true
        } else if (!house?.piece && house) {

          if (house.piece === "rei") {
            house.blocked = true
          }
        }

        index--
      }

    }

    if (item.text === 'bispo' || item.text === 'rainha') {
      let temPeça = false
      let indexX = cord.x + 1
      let indexY = cord.y + 1
      index = 0

      while (index < 9 && !temPeça) {

        const house = houses.find((house: any) => house.x === indexX && house.y === indexY && (house?.piece?.initialPosition !== turn || !house.piece))

        if (house?.piece) {
          if (house.piece.text === "rei" && house.piece.initialPosition !== item.initialPosition) {


            const piece = houses
              .filter((house: any) =>
                house.x < indexX && house.y < indexY &&
                (house.y > item.cord.y && house.x > item.cord.x) &&
                (house.y - item.cord.y === house.x - item.cord.x))
              .find((house: any) =>
                house.piece
              )

            if (!piece) {
              houses.filter((house: any) => {
                return (house.y >= item.cord.y && house.x >= item.cord.x) &&
                  (house.y - item.cord.y === house.x - item.cord.x)
              }).map((house: any) => house.blocked = true)

              house.blocked = true
            }

          }
        } else if (house) {

        }

        index++
        indexX++
        indexY++
      }

      temPeça = false
      indexX = cord.x + 1
      indexY = cord.y - 1
      index = 0

      while (index < 9 && !temPeça) {

        const house = houses.find((house: any) => house.x === indexX && house.y === indexY)

        if (house?.piece) {
          if (house.piece.text === "rei" && house.piece.initialPosition !== item.initialPosition) {


            const piece = houses
              .filter((house: any) =>
                house.x < indexX &&
                house.y > indexY)
              .find((house: any) =>
                house.piece

              )

            if (!piece || house) {
              houses.filter((house: any) => {
                return (house.y <= item.cord.y && house.x >= item.cord.x) &&
                  (house.y - item.cord.y === ((house.x - item.cord.x) * -1))
              }).map((house: any) => house.blocked = true)

              house.blocked = true
            }

          }
          temPeça = true
        } else if (house) {
          if (house.piece === "rei") {
            house.blocked = true
          }
        }

        index++
        indexX++
        indexY--
      }

      temPeça = false
      indexX = cord.x - 1
      indexY = cord.y + 1
      index = 0

      while (index < 9 && !temPeça) {

        const house = houses.find((house: any) => house.x === indexX && house.y === indexY)

        if (house?.piece) {
          if (house.piece.text === "rei" && house.piece.initialPosition !== item.initialPosition) {


            const piece = houses
              .filter((house: any) =>
                house.x > indexX &&
                house.y < indexY)
              .find((house: any) =>
                house.piece

              )

            if (!piece || house) {
              houses.filter((house: any) => {
                return (house.y >= item.cord.y && house.x <= item.cord.x) &&
                  (house.y - item.cord.y === (house.x - item.cord.x) * -1)
              }).map((house: any) => house.blocked = true)

              house.blocked = true
            }

          }
          temPeça = true
        } else if (house) {

          if (house.piece === "rei") {
            house.blocked = true
          }
        }

        index++
        indexX--
        indexY++
      }

      temPeça = false
      indexX = cord.x - 1
      indexY = cord.y - 1
      index = 0

      while (index < 9 && !temPeça) {

        const house = houses.find((house: any) => house.x === indexX && house.y === indexY)

        if (house?.piece) {
          if (house.piece.text === "rei" && house.piece.initialPosition !== item.initialPosition) {


            const piece = houses.filter((house: any) => house.x > indexX && house.y > indexY).find((house: any) => house.piece && house.piece.initialPosition !== turn)

            if (!piece || house) {
              houses.filter((house: any) => {
                return (house.y <= item.cord.y && house.x <= item.cord.x) &&
                  (house.y - item.cord.y === (house.x - item.cord.x))
              }).map((house: any) => house.blocked = true)

              house.blocked = true
            }

          }
          temPeça = true
        } else if (house) {
          if (house.piece === "rei") {
            house.blocked = true
          }
        }

        index++
        indexX--
        indexY--
      }

    }

    if (item?.text === "cavalo") {
      houses.map((house: any, houseIndex: any) => {

        if (
          (house.y === cord.y + 2 && house.x === cord.x + 1 ||
            (house.y === cord.y + 2 && house.x === cord.x - 1) ||
            (house.y === cord.y - 2 && house.x === cord.x + 1) ||
            (house.y === cord.y - 2 && house.x === cord.x - 1) ||
            (house.y === cord.y + 1 && house.x === cord.x + 2) ||
            (house.y === cord.y + 1 && house.x === cord.x - 2) ||
            (house.y === cord.y - 1 && house.x === cord.x + 2) ||
            (house.y === cord.y - 1 && house.x === cord.x - 2)) &&
          ((house.piece && house.piece.initialPosition != item.initialPosition) || !house.piece)
        ) {

          if (house.piece === "rei") {
            house.blocked = true
          }
        }

        return house

      })
    }

    if (item?.text === "rei") {
      houses.map((house: any, houseIndex: any) => {

        if (
          ((house.y === cord.y + 1 && house.x === cord.x) ||
            (house.y === cord.y && house.x === cord.x + 1) ||
            (house.y === cord.y - 1 && house.x === cord.x) ||
            (house.y === cord.y && house.x === cord.x - 1) ||
            (house.y === cord.y + 1 && house.x === cord.x + 1) ||
            (house.y === cord.y - 1 && house.x === cord.x - 1) ||
            (house.y === cord.y - 1 && house.x === cord.x + 1) ||
            (house.y === cord.y + 1 && house.x === cord.x - 1)) &&
          ((house.piece && house.piece.initialPosition != item.initialPosition) || !house.piece)
        ) {
          if (house.piece === "rei") {
            house.blocked = true
          }
        }

        return house

      })
    }

    if (item?.text === "peão") {
      houses.map((house: any, houseIndex: any) => {

        if (
          ((house.y === cord.y + 1 && house.x === cord.x) ||
            (house.y === cord.y + 1 && house.x === cord.x + 1 && house.piece) ||
            (house.y === cord.y + 1 && house.x === cord.x - 1 && house.piece)
          ) &&
          item?.text === "peão" &&
          item.initialPosition !== "bottom"
        ) {
          if (house.piece === "rei") {
            house.blocked = true
          }
        } else if (
          ((house.y === cord.y - 1 && house.x === cord.x) ||
            (house.y === cord.y - 1 && house.x === cord.x + 1 && house.piece) ||
            (house.y === cord.y - 1 && house.x === cord.x - 1 && house.piece)
          ) &&
          item?.text === "peão" &&
          item.initialPosition === "bottom"
        ) {
          if (house.piece === "rei") {
            house.blocked = true
          }
        }

        return house

      })
    }

  }

  function validateMoves(item: any, cord: any, index: any) {

    if (item.text === 'torre' || item.text === 'rainha') {
      let temPeça = false
      let index = cord.x + 1

      while (index < 9 && !temPeça) {

        const house = houses.find((house: any) => house.x === index && house.y === cord.y)

        if (house?.piece) {
          temPeça = true
        } else if (house) {

          house.liberated = true
        }

        index++
      }

      index = cord.x - 1
      temPeça = false

      while (index > 0 && !temPeça) {

        const house = houses.find((house: any) => house.x === index && house.y === cord.y)

        if (house?.piece) {
          temPeça = true
        } else if (house) {

          house.liberated = true
        }

        index--
      }


      temPeça = false
      index = cord.y + 1

      while (index < 9 && !temPeça) {
        const house = houses.find((house: any) => house.y === index && house.x === cord.x)

        if (house?.piece) {
          temPeça = true
        } else if (house) {
          house.liberated = true
        }
        index++
      }

      index = cord.y - 1
      temPeça = false

      while (index > 0 && !temPeça) {
        const house = houses.find((house: any) => house.y === index && house.x === cord.x)

        if (house?.piece) {
          temPeça = true
        } else if (house) {
          house.liberated = true
        }
        index--
      }
    }

    if (item.text === 'bispo' || item.text === 'rainha') {
      let temPeça = false
      let indexX = cord.x + 1
      let indexY = cord.y + 1
      index = 0

      while (index < 9 && !temPeça) {
        const house = houses.find((house: any) => house.x === indexX && house.y === indexY)
        if (house?.piece) {
          temPeça = true
        } else if (house) {
          house.liberated = true
        }

        index++
        indexX++
        indexY++
      }

      temPeça = false
      indexX = cord.x + 1
      indexY = cord.y - 1
      index = 0

      while (index < 9 && !temPeça) {
        const house = houses.find((house: any) => house.x === indexX && house.y === indexY)
        if (house?.piece) {
          temPeça = true
        } else if (house) {
          house.liberated = true
        }

        index++
        indexX++
        indexY--
      }

      temPeça = false
      indexX = cord.x - 1
      indexY = cord.y + 1
      index = 0

      while (index < 9 && !temPeça) {
        const house = houses.find((house: any) => house.x === indexX && house.y === indexY)
        if (house?.piece) {
          temPeça = true
        } else if (house) {

          house.liberated = true
        }
        index++
        indexX--
        indexY++
      }

      temPeça = false
      indexX = cord.x - 1
      indexY = cord.y - 1
      index = 0

      while (index < 9 && !temPeça) {
        const house = houses.find((house: any) => house.x === indexX && house.y === indexY)
        if (house?.piece) {
          temPeça = true
        } else if (house) {
          house.liberated = true
        }

        index++
        indexX--
        indexY--
      }

    }

    if (item?.text === "cavalo") {
      houses.map((house: any, houseIndex: any) => {

        if (
          (house.y === cord.y + 2 && house.x === cord.x + 1 ||
            (house.y === cord.y + 2 && house.x === cord.x - 1) ||
            (house.y === cord.y - 2 && house.x === cord.x + 1) ||
            (house.y === cord.y - 2 && house.x === cord.x - 1) ||
            (house.y === cord.y + 1 && house.x === cord.x + 2) ||
            (house.y === cord.y + 1 && house.x === cord.x - 2) ||
            (house.y === cord.y - 1 && house.x === cord.x + 2) ||
            (house.y === cord.y - 1 && house.x === cord.x - 2)) && !house.piece


        ) {
          houses[houseIndex].liberated = true
        }

        return house

      })
    }

    if (item?.text === "rei") {
      houses.map((house: any, houseIndex: any) => {
        if (
          ((house.y === cord.y + 1 && house.x === cord.x) ||
            (house.y === cord.y && house.x === cord.x + 1) ||
            (house.y === cord.y - 1 && house.x === cord.x) ||
            (house.y === cord.y && house.x === cord.x - 1) ||
            (house.y === cord.y + 1 && house.x === cord.x + 1) ||
            (house.y === cord.y - 1 && house.x === cord.x - 1) ||
            (house.y === cord.y - 1 && house.x === cord.x + 1) ||
            (house.y === cord.y + 1 && house.x === cord.x - 1)
          ) && !house.piece && !house.blocked && house.liberated
        ) {

          const kingHouse = houses.filter((house: any) =>
            (house.piece &&
              house.piece.initialPosition === 'bottom' &&
              house?.piece?.text === 'rei') ||

            (house.piece &&
              house.piece.initialPosition === 'top' &&
              house?.piece?.text === 'rainha')
          )
          if (!house.liberatedByTop) {
            houses[houseIndex].liberated = true
          }
        }
        return house
      })
    }

    if (item?.text === "peão") {
      houses.map((house: any, houseIndex: any) => {

        if (house.y === cord.y + 1 && cord.x === house.x && item?.text === "peão" && item.initialPosition !== "bottom") {
          houses[houseIndex].liberated = true
        } else if (house.y === cord.y - 1 && house.x === cord.x && item?.text === "peão" && item.initialPosition === "bottom") {
          houses[houseIndex].liberated = true
        }
        return house
      })
    }

    const existBlockedHouse = houses.find((house: any) => house.blocked)

    if (existBlockedHouse && item.text !== 'rei') {

      const kingHouse = houses.find((house: any) => house.piece && house.piece.text === "rei" && house.piece.initialPosition !== turn)

      let isBeforeKingHouse = false

      if ((checkState?.checker?.position - kingHouse?.position) < 0) {
        isBeforeKingHouse = true
      }

      if ((checkState?.checker?.position - kingHouse?.position) > 0) {
        isBeforeKingHouse = false
      }

      houses.map((house: any) => {
        if (!house.blocked) {
          house.liberated = false
        }

        if (house.blocked) {
          if (isBeforeKingHouse && (house.position > kingHouse.position)) {
            house.liberated = false
          }

          if (!isBeforeKingHouse && (house.position < kingHouse.position)) {
            house.liberated = false
          }
        }

        return house
      })

    }
  }

  function validateIfCheckMate() {

  }

  function validateIfDrowningDraw() {

  }

  function validateIfLocked() {

    const locked = houses.filter((house: any) => house.blocked && house.piece && house.piece.initialPosition === turn && house.piece.text !== 'rei').map((house: any) => {
      house.locked = true
      house.blocked = false
      return house
    })

    if (locked.length === 1) {
      houses.map((house: any) => {
        house.blocked = false

        return house
      })
    } else if (locked.length > 1) {

      houses.map((house: any) => {
        house.locked = false

        return house
      })
    }
  }

  useEffect(() => {
    houses.map((house: any) => {
      house.blocked = false
      house.liberated = false
      house.locked = false

      return house
    })

    houses.map((house: any, index: any) => {
      if (house.piece) {
        validate(house.piece, house, index)
        if (house.piece.initialPosition !== turn) {
          validateMoves(house.piece, house, index)
        }
        validateIfDrowningDraw()
        validateIfLocked()
      }
    })


    const checker = houses.find((house: any) => house?.blocked === true && house?.piece && house?.piece?.text !== 'rei')

    if (checker) {
      setCheckState({
        checker: checker
      })
    }

    setState(state + 'a')

  }, [houses])

  useEffect(() => {
  }, [state])

  function doRoque(kingHouse: any, towerHouse: any) {

    houses.find()

  }


  return (
    <div className=''>
      cell {`${turn}`}  <br />
      checker     {checkState.checker?.piece?.text}<br />
      kinghHouse  {checkState.kinghHouse?.piece?.text}<br />

      <button onClick={() => {
        switchState()

      }}>{`${turn}`}</button>
      <div className='table'>
        {houses.map((house: any, index: any) => {
          let type = ""

          if ((index % 8) === 0 && index) {
            operator = "par"
          }

          if ((index % 16) === 0 && index) {
            operator = "impar"
          }

          if (index % 2) {
            type = operator === "par" ? 'black' : 'white'
          }

          if (!(index % 2)) {
            type = operator === "par" ? 'white' : 'black'
          }


          const _turnState = turnState
          const item = house.piece
          const cord = house

          function validateMoves() {

            if (house.locked) {
              return
            }

            if (item.text === 'torre' || item.text === 'rainha') {
              let temPeça = false
              let index = cord.x + 1

              while (index < 9 && !temPeça) {

                const house = houses.find((house: any) => house.x === index && house.y === cord.y)

                if (house?.piece) {
                  temPeça = true
                } else if (house) {

                  house.highlighted = true
                }

                index++
              }

              index = cord.x - 1
              temPeça = false

              while (index > 0 && !temPeça) {

                const house = houses.find((house: any) => house.x === index && house.y === cord.y)

                if (house?.piece) {
                  temPeça = true
                } else if (house) {

                  house.highlighted = true
                }

                index--
              }


              temPeça = false
              index = cord.y + 1

              while (index < 9 && !temPeça) {
                const house = houses.find((house: any) => house.y === index && house.x === cord.x)

                if (house?.piece) {
                  temPeça = true
                } else if (house) {
                  house.highlighted = true
                }
                index++
              }

              index = cord.y - 1
              temPeça = false

              while (index > 0 && !temPeça) {
                const house = houses.find((house: any) => house.y === index && house.x === cord.x)

                if (house?.piece) {
                  temPeça = true
                } else if (house) {
                  house.highlighted = true
                }
                index--
              }
            }

            if (item.text === 'bispo' || item.text === 'rainha') {
              let temPeça = false
              let indexX = cord.x + 1
              let indexY = cord.y + 1
              index = 0

              while (index < 9 && !temPeça) {
                const house = houses.find((house: any) => house.x === indexX && house.y === indexY)
                if (house?.piece) {
                  temPeça = true
                } else if (house) {
                  house.highlighted = true
                }

                index++
                indexX++
                indexY++
              }

              temPeça = false
              indexX = cord.x + 1
              indexY = cord.y - 1
              index = 0

              while (index < 9 && !temPeça) {
                const house = houses.find((house: any) => house.x === indexX && house.y === indexY)
                if (house?.piece) {
                  temPeça = true
                } else if (house) {
                  house.highlighted = true
                }

                index++
                indexX++
                indexY--
              }

              temPeça = false
              indexX = cord.x - 1
              indexY = cord.y + 1
              index = 0

              while (index < 9 && !temPeça) {
                const house = houses.find((house: any) => house.x === indexX && house.y === indexY)
                if (house?.piece) {
                  temPeça = true
                } else if (house) {

                  house.highlighted = true
                }
                index++
                indexX--
                indexY++
              }

              temPeça = false
              indexX = cord.x - 1
              indexY = cord.y - 1
              index = 0

              while (index < 9 && !temPeça) {
                const house = houses.find((house: any) => house.x === indexX && house.y === indexY)
                if (house?.piece) {
                  temPeça = true
                } else if (house) {
                  house.highlighted = true
                }

                index++
                indexX--
                indexY--
              }

            }

            if (item?.text === "cavalo") {
              houses.map((house: any, houseIndex: any) => {

                if (
                  (house.y === cord.y + 2 && house.x === cord.x + 1 ||
                    (house.y === cord.y + 2 && house.x === cord.x - 1) ||
                    (house.y === cord.y - 2 && house.x === cord.x + 1) ||
                    (house.y === cord.y - 2 && house.x === cord.x - 1) ||
                    (house.y === cord.y + 1 && house.x === cord.x + 2) ||
                    (house.y === cord.y + 1 && house.x === cord.x - 2) ||
                    (house.y === cord.y - 1 && house.x === cord.x + 2) ||
                    (house.y === cord.y - 1 && house.x === cord.x - 2)) && !house.piece


                ) {
                  houses[houseIndex].highlighted = true
                }

                return house

              })
            }

            if (item?.text === "rei") {
              houses.map((house: any, houseIndex: any) => {
                if (
                  ((house.y === cord.y + 1 && house.x === cord.x) ||
                    (house.y === cord.y && house.x === cord.x + 1) ||
                    (house.y === cord.y - 1 && house.x === cord.x) ||
                    (house.y === cord.y && house.x === cord.x - 1) ||
                    (house.y === cord.y + 1 && house.x === cord.x + 1) ||
                    (house.y === cord.y - 1 && house.x === cord.x - 1) ||
                    (house.y === cord.y - 1 && house.x === cord.x + 1) ||
                    (house.y === cord.y + 1 && house.x === cord.x - 1)
                  ) && !house.piece && !house.blocked && !house.liberated
                ) {

                  const kingHouse = houses.filter((house: any) =>
                    (house.piece &&
                      house.piece.initialPosition === 'bottom' &&
                      house?.piece?.text === 'rei') ||

                    (house.piece &&
                      house.piece.initialPosition === 'top' &&
                      house?.piece?.text === 'rei')
                  )

                  console.log({ kingHouse })

                  const toRight = houses.filter((house: any) =>
                    (house.y === cord.y - 1 &&
                      house.x > cord.x &&
                      house.piece) ||
                    (house.y === cord.y &&
                      house.x > cord.x &&
                      house.x !== cord.x + 1 &&
                      !house.piece)).filter((house: any) => !house.piece).map((house: any) => {

                        house.roqueToRight = true

                        return house
                      })

                  const toLeft = houses.filter((house: any) =>
                    (house.y === cord.y - 1 &&
                      house.x < cord.x &&
                      house.piece) ||
                    (house.y === cord.y &&
                      house.x < cord.x &&
                      house.x !== cord.x - 1 &&
                      !house.piece)).filter((house: any) => !house.piece).map((house: any) => {

                        house.roqueToLeft = true


                        return house
                      })
                }
                return house
              })
            }

            if (item?.text === "peão") {

              houses.map((house: any, houseIndex: any) => {

                if ((((house.y < cord.y + 3 && house.y > cord.y && !item.doubleHouseAlready) || (house.y > cord.y && house.y === cord.y + 1 && item.doubleHouseAlready)) &&
                  cord.x === house.x &&
                  item?.text === "peão" &&
                  item.initialPosition === "top" &&
                  !house.piece) ||
                  //en passant

                  (house.y === cord.y && cord.y === 5 &&
                    house?.piece?.text === "peão" && item.initialPosition === "top"
                    &&
                    (house.x === cord.x + 1 || house.x === cord.x - 1) &&
                    house.piece.initialPosition === "bottom" &&
                    house.piece.doubleHouseAlready
                  ) ||

                  //en passant
                  (house.y === cord.y + 1 &&
                    (cord.x === house.x + 1 ||
                      cord.x === house.x - 1) &&
                    item?.text === "peão" &&
                    item.initialPosition === "top" &&
                    house.piece && house.piece.initialPosition != turn)
                ) {
                  if (house.y === cord.y && item.initialPosition === "top" && house?.piece?.text === "peão" && (house.x === cord.x + 1 || house.x === cord.x - 1)
                  ) {
                    houses[houseIndex + 8].enPassant = true
                    houses[houseIndex + 8].highlighted = true

                  }

                  if (house.y !== cord.y) {
                    houses[houseIndex].highlighted = true



                  }

                  if (house.y === 8) {
                    house.promotion = true
                  }

                } else if ((
                  ((house.y < cord.y && house.y > cord.y - 3 && !item.doubleHouseAlready) ||
                    (house.y < cord.y && house.y === cord.y - 1 && item.doubleHouseAlready)) &&
                  house.x === cord.x &&
                  item?.text === "peão" &&
                  item.initialPosition === "bottom" &&
                  !house.piece) ||
                  //en passant

                  (house.y === cord.y && cord.y === 4 &&
                    house?.piece?.text === "peão" && item.initialPosition === "bottom"
                    &&
                    (house.x === cord.x + 1 || house.x === cord.x - 1) &&
                    house.piece.initialPosition === "top" &&
                    house.piece.doubleHouseAlready
                  ) ||

                  //en passant
                  (house.y === cord.y - 1 &&
                    (cord.x === house.x + 1 ||
                      cord.x === house.x - 1) &&
                    item?.text === "peão" &&
                    item.initialPosition === "bottom" &&
                    house.piece && house.piece.initialPosition != turn)
                ) {

                  if (house.y === cord.y && item.initialPosition === "bottom" && house?.piece?.text === "peão" && (house.x === cord.x + 1 || house.x === cord.x - 1)
                  ) {
                    houses[houseIndex - 8].enPassant = true
                    houses[houseIndex - 8].highlighted = true

                  }

                  if (house.y !== cord.y) {
                    houses[houseIndex].highlighted = true

                    if (house.y === 1) {
                      house.promotion = true
                    }
                  }

                }
                return house
              })
            }

            const existBlockedHouse = houses.find((house: any) => house.blocked)

            if (existBlockedHouse && item.text !== 'rei') {

              const kingHouse = houses.find((house: any) => house.piece && house.piece.text === "rei" && house.piece.initialPosition === "bottom")

              let isBeforeKingHouse = false

              if ((checkState?.checker?.position - kingHouse?.position) < 0) {
                isBeforeKingHouse = true
              }

              if ((checkState?.checker?.position - kingHouse?.position) > 0) {
                isBeforeKingHouse = false
              }

              houses.map((house: any) => {
                if (!house.blocked) {
                  house.highlighted = false
                }

                if (house.blocked) {
                  if (isBeforeKingHouse && (house?.position > kingHouse?.position)) {
                    house.highlighted = false
                  }

                  if (!isBeforeKingHouse && (house?.position < kingHouse?.position)) {
                    house.highlighted = false
                  }
                }

                return house
              })

            }
          }

          return (
            <>
              <Cell
                state={state}
                setState={setState}
                houses={houses}
                returnState={() => turn}
                switchState={() => {
                  switchState()
                }}
                setTurn={setTurn}
                turn={turn}
                type={type}
                index={index}
                cord={{ x: house.x, y: house.y, ...house }}
                house={house}
                dropFunction={dropFunction}
                item={house.piece}
                validateMoves={validateMoves}
              >
                {house?.piece?.text && (
                  <>
                    <Piece houses={houses} house={house} checkDrop={checkDrop} index={index} />
                  </>
                )}
              </Cell>
            </>
          )
        })}
      </div>


    </div>
  )
}

export default Board