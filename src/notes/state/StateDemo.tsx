import { useState } from "react";

type SquareValue = "X" | "O" | null;
type Squares = SquareValue[];

type SquareProps = {
  value: SquareValue;
  position: number;
  onSquareClick: () => void;
};

type BoardProps = {
  xIsNext: boolean;
  squares: Squares;
  onPlay: (nextSquares: Squares) => void;
};

const Square = ({ value, position, onSquareClick }: SquareProps) => {
  return (
    <button
      className="square"
      type="button"
      aria-label={`棋盘第 ${position + 1} 格${value ? `：${value}` : "，空"}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

const Board = ({ xIsNext, squares, onPlay }: BoardProps) => {
  const handleClick = (i: number) => {
    // 已经分出胜负或当前位置已有棋子时，不允许继续落子。
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // 复制一份棋盘状态，避免直接修改 React state。
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} position={0} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} position={1} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} position={2} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} position={3} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} position={4} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} position={5} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} position={6} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} position={7} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} position={8} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
};

export function StateDemo() {
  // history 保存每一步的棋盘快照，用于实现回到历史步骤。
  const [history, setHistory] = useState<Squares[]>([
    Array<SquareValue>(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: Squares) => {
    // 如果从历史步骤重新落子，需要丢弃该步骤之后的旧分支。
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((_squares, move) => {
    // 根据历史下标生成可点击的时间旅行按钮。
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button type="button" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

const calculateWinner = (squares: Squares) => {
  // 所有可能连成一线的获胜组合。
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
