import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

import './Carousel.scss';

const items = [
  {
    src: 'https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    altText: 'Woman eating popcorn and watching movie',
    caption: 'You love movies. You love your friends. Invite them to a movie night with MovieF(r)iend',
  },
  {
    src: 'https://images.unsplash.com/photo-1572188863110-46d457c9234d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    altText: 'Slide 2',
    caption: 'It\'s as simple as searching the database for a movie and then picking out which friends to invite.',
  },
  {
    src: 'https://images.unsplash.com/photo-1514899706957-d22ee867a77b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
    altText: 'Slide 3',
    caption: 'Going to the movies? You can invite your friends using MovieF(r)iend!',
  },
];

const CarouselComponent = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="carouselImg" src={item.src} alt={item.altText} />
        <CarouselCaption captionHeader={item.caption} />
      </CarouselItem>
  ));

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
};

export default CarouselComponent;
