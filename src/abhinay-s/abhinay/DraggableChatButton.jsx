import React from "react";

/* Draggable Chat Button Helper */
const DraggableChatButton = ({ onClick }) => {
  const [position, setPosition] = React.useState({ x: 24, y: 32 }); // Bottom-left default
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartPos = React.useRef({ x: 0, y: 0 });
  const buttonPosAtStart = React.useRef({ x: 0, y: 0 });
  const hasMoved = React.useRef(false);

  const startDrag = (clientX, clientY) => {
    setIsDragging(true);
    hasMoved.current = false;
    dragStartPos.current = { x: clientX, y: clientY };
    buttonPosAtStart.current = { x: position.x, y: position.y };
  };

  const onDrag = React.useCallback((clientX, clientY) => {
    if (!isDragging) return;
    const dx = clientX - dragStartPos.current.x;
    const dy = clientY - dragStartPos.current.y;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      hasMoved.current = true;
    }

    // Update position - x is from left, y is from bottom
    const newX = Math.max(0, Math.min(window.innerWidth - 64, buttonPosAtStart.current.x + dx));
    const newY = Math.max(0, Math.min(window.innerHeight - 64, buttonPosAtStart.current.y - dy));

    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  const endDrag = React.useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (!hasMoved.current) {
        onClick();
      }
    }
  }, [isDragging, onClick]);

  // Global mouse/touch events
  React.useEffect(() => {
    const handleMouseMove = (e) => onDrag(e.clientX, e.clientY);
    const handleTouchMove = (e) => onDrag(e.touches[0].clientX, e.touches[0].clientY);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', endDrag);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', endDrag);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', endDrag);
    };
  }, [isDragging, onDrag, endDrag]);

  return (
    <button
      onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
      onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
      aria-label="Open chat"
      className="fixed z-[9999] pointer-events-auto rounded-full p-2 hover:shadow-2xl transition transform hover:scale-105 active:scale-95 touch-none"
      style={{
        left: `${position.x}px`,
        bottom: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging ? 'none' : 'transform 0.2s, box-shadow 0.2s, left 0.1s, bottom 0.1s'
      }}
    >
      <img
        src="/abhinay/HomePageImages/kube.png"
        alt="Open chat"
        className="w-12 h-12 rounded-full border-5 border-[#9876b3] p-1 object-cover pointer-events-none select-none"
      />
    </button>
  );
};

export default DraggableChatButton;
