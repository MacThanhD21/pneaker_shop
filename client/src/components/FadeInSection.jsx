import React from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const FadeInSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <FadeInWrapper
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </FadeInWrapper>
  );
};

const FadeInWrapper = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
`;

export default FadeInSection; 