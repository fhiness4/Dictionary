import React, { useState, useEffect } from 'react';
import './loadind.css';

const AutoBookAnimation = ({ 
  openDuration = 3000,      // How long book stays open
  closeDuration = 1000,     // How long closing animation takes
  cycleDelay = 2000,        // Delay between cycles
  autoStart = true
}) => {
  const [animationState, setAnimationState] = useState('closed');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!autoStart) return;

    let timeoutId;

    const startAnimationCycle = () => {
      // Start opening animation
      setIsAnimating(true);
      setAnimationState('opening');

      timeoutId = setTimeout(() => {
        setAnimationState('open');
        setIsAnimating(false);

        // After open duration, start closing
        timeoutId = setTimeout(() => {
          setIsAnimating(true);
          setAnimationState('closing');

          timeoutId = setTimeout(() => {
            setAnimationState('closed');
            setIsAnimating(false);

            // After cycle delay, restart the cycle
            timeoutId = setTimeout(startAnimationCycle, cycleDelay);
          }, closeDuration);
        }, openDuration);
      }, closeDuration); // Use closeDuration for opening too for consistency
    };

    startAnimationCycle();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [autoStart, openDuration, closeDuration, cycleDelay]);

  return (
    <div className={`auto-book-container ${animationState}`}>
      <div className="book">
        {/* Front Cover */}
        <div className="front-cover">
          <div className="cover-content">
            <h3>Finesse</h3>
            <div className="decorative-line"></div>
            <p>Dictionary</p>
          </div>
          <div className="spine"></div>
        </div>
        
        {/* Pages */}
        <div className="pages">
          <div className="page page-1"></div>
          <div className="page page-2"></div>
          <div className="page page-3"></div>
          <div className="page page-4"></div>
        </div>
        
        {/* Back Cover */}
        <div className="back-cover">
          <div className="spine"></div>
        </div>
        
       
      </div>
    </div>
  );
};

export default AutoBookAnimation;