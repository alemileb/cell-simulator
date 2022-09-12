import React, { useState, useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import _ from 'lodash';

function App() {
  const cols: number = 8;
  const rows: number = 8;
  let initialMatrix: boolean[][] = [];
  
  //Initiates an empty board/matrix
  for (let i = 0; i < rows; i++) {
    initialMatrix[i] = [];
    for (let j = 0; j < cols; j++) {
      initialMatrix[i][j] = false;
    }
  }

  const [matrix, setMatrix] = useState(initialMatrix);
  const [animation, setAnimation] = useState(false);

  //Toggles the status (live/dead) of a cell 
  const setCellAlive = (x: number, y: number) => {
    let newMatrix = _.cloneDeep(matrix);
    newMatrix[x][y] = !newMatrix[x][y];
    setMatrix(newMatrix);
  };

  //Count alive neighbours for a cell given its x and y position
  const countNeighbourCells = (x: number, y: number) => {
    let total = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          !(i === 0 && j === 0) && //doesnt include the current cell
          !(x === 0 || y === 0 || x === cols - 1 || y === rows - 1)
        ) {
          total += matrix[x + j][y + i] ? 1 : 0;
        }
      }
    }
    return total;
  };

  //Excecutes next generation of cells
  const nextGeneration = (currentMatrix: boolean[][]) => {
    let newMatrix = _.cloneDeep(currentMatrix);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let adjacentsCells = countNeighbourCells(x, y);
        newMatrix[x][y] =
          (newMatrix[x][y] && adjacentsCells === 2) || adjacentsCells === 3;
      }
    }
    setMatrix(newMatrix);
  };

  
  //Executes when animation has started and when the matrix is updated
  useEffect(() => {
    let interval = 0;
    if (animation) { 
       interval = window.setInterval(() => {
        nextGeneration(matrix)
      }, 2000);
    }
    else {
      clearInterval(interval);
    }    
    return () => clearInterval(interval);
    //eslint-disable-next-line
  }, [animation, matrix]);

  // starts simulation and update it every 2 seconds
  const startSimulation = () =>  setAnimation(true);

  //stops the simulation
  const stopSimulation = () =>  setAnimation(false);
 
  return (
    <div className='App'>
      <div className='matrix'>
        {matrix.map((row, i) => {
          return (
            <Row key={`row-${i}`} className='no-gutters'>
              {row.map((col, j) => {
                return (
                  <Col
                    md='auto'
                    key={`col-${i}-${j}`}
                    className={`${col ? 'alive' : ''}`}
                    onClick={() => setCellAlive(i, j)}
                  >
                    <div className='cell'></div>
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </div>
      <br></br>
      <Container>
        <Row>
        { !animation &&  
          <Col md='2'>
            <input
              type='button'
              value='start'
              onClick={() => startSimulation()}
            />
          </Col>
        }
          { animation && 
          <Col md='2'>
            <input
              type='button'
              value='stop'
              onClick={() => stopSimulation()}
            />
          </Col>
          }
          <Col md='2'>
            <input
              type='button'
              value='clear'
              onClick={() => setMatrix(initialMatrix)}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
