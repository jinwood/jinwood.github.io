import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import Img from "gatsby-image";

interface ICarouselProps {
  data: [{ node: { id: string; childImageSharp: any } }];
}

const ProjectCarousel = (props: ICarouselProps) => {
  const { data } = props;
  return (
    <Carousel
      interval={7000}
      nextIcon={<ArrowRight />}
      prevIcon={<ArrowRight />}
    >
      {data.map((pic: any) => (
        <CarouselItem key={pic.node.id}>
          <Img fluid={pic.node.childImageSharp.fluid} />
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default ProjectCarousel;
