import React, { useEffect, useState } from 'react';

interface GridProps {
  squareSize?: number;
  borderColor?: string;
  hoverFillColor?: string;
  borderWidth?: number;
  className?: string;
  isBackground?: boolean;
  opacity?: number;
}

const Grid: React.FC<GridProps> = ({
  squareSize = 20,
  borderColor = '#999',
  hoverFillColor = '#222',
  borderWidth = 1,
  isBackground = false,
  opacity = 1
}) => {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  const [gridSize, setGridSize] = useState({ cols: 10, rows: 10 });

  useEffect(() => {
    const calculateGridSize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const cols = Math.ceil(viewportWidth / squareSize) + 2;
      const rows = Math.ceil(viewportHeight / squareSize) + 2;
      setGridSize({ cols, rows });
    };

    calculateGridSize();
    window.addEventListener('resize', calculateGridSize);
    return () => window.removeEventListener('resize', calculateGridSize);
  }, [squareSize]);

  const { cols, rows } = gridSize;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, ${squareSize}px)`,
      gridTemplateRows: `repeat(${rows}, ${squareSize}px)`,
      // width: isBackground ? `${cols * squareSize}px` : '100%',
      // height: isBackground ? `${rows * squareSize}px` : '100%',
      height: '100%',
      minHeight: '100%',
      overflowX: 'visible',
      overflowY: 'hidden',
      width: '100',
      position: isBackground ? 'absolute' : 'relative',
      zIndex: isBackground ? 0 : 1,
      opacity: opacity,
      ...(isBackground && {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        // margin: `${squareSize/2}px 0 0 ${squareSize/2}px`
      })
    }}>
      {Array.from({ length: cols * rows }).map((_, index) => (
        <div
          key={index}
          className="grid-cell"
          style={{
            borderTop: `${borderWidth}px solid ${borderColor}`,
            borderLeft: `${borderWidth}px solid ${borderColor}`,
            backgroundColor: hoveredCell === index ? hoverFillColor : 'transparent',
            aspectRatio: '1',
            marginTop: `-${borderWidth}px`,
            marginLeft: `-${borderWidth}px`
          }}
          onMouseEnter={() => setHoveredCell(index)}
          onMouseLeave={() => setHoveredCell(null)}
        />
      ))}
    </div>
  );
};

export default Grid;
