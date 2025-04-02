'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

type AnimationVariant = 
  | 'fadeIn' 
  | 'fadeInUp' 
  | 'fadeInDown' 
  | 'fadeInLeft' 
  | 'fadeInRight'
  | 'slideInUp'
  | 'slideInLeft'
  | 'slideInRight'
  | 'zoomIn'
  | 'fadeInBlur';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationVariant;
  threshold?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  rootMargin?: string;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fadeInUp',
  threshold = 0.2,
  delay = 0,
  duration,
  once = true,
  rootMargin = '0px',
  staggerChildren = false,
  staggerDelay = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
    rootMargin,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    } else if (!once) {
      setIsVisible(false);
    }
  }, [inView, once]);

  // Recursively add staggered delays to child elements
  const addStaggeredDelays = (children: ReactNode, baseDelay: number): ReactNode => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      
      const staggeredDelay = baseDelay + (index * staggerDelay);
      
      const childProps = {
        ...child.props,
        style: {
          ...child.props.style,
          transitionDelay: `${staggeredDelay}s`,
          animationDelay: `${staggeredDelay}s`,
        },
      };
      
      // If the child has children and we want to stagger nested elements
      if (child.props.children && typeof child.props.children !== 'string') {
        childProps.children = addStaggeredDelays(child.props.children, staggeredDelay + staggerDelay);
      }
      
      return React.cloneElement(child, childProps);
    });
  };

  const getAnimationClass = () => {
    return isVisible ? `animate-${animation}` : 'opacity-0';
  };

  const renderChildren = () => {
    if (!staggerChildren) return children;
    return addStaggeredDelays(children, delay);
  };

  const style: React.CSSProperties = {
    animationDelay: delay ? `${delay}s` : undefined,
    animationDuration: duration ? `${duration}s` : undefined,
  };

  return (
    <div 
      ref={ref} 
      className={`${className} ${getAnimationClass()}`}
      style={style}
    >
      {staggerChildren ? renderChildren() : children}
    </div>
  );
};

export default AnimatedSection; 