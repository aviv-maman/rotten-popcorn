'use client';
import { Splide, SplideSlide, type Options } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import type { MovieSeriesPersonListResponse, TrendingResponse, UpcomingMovieListResponse } from '@/lib/api.types';
import CardGeneric from './CardGeneric';

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: string[];
  data: UpcomingMovieListResponse[] | TrendingResponse[] | MovieSeriesPersonListResponse[];
}

const Carousel: React.FC<CarouselProps> = ({ tabs, data, ...rest }) => {
  const resultsArray = data?.map((item) => item.results);

  const options: Options = {
    gap: '1rem',
    perPage: 6,
    pagination: false,
    breakpoints: {
      524: {
        perPage: 2,
      },
      640: {
        perPage: 3,
      },
      768: {
        perPage: 3,
      },
      1024: {
        perPage: 4,
      },
    },
    autoHeight: true,
  };

  return (
    <div className='md:w-fit' {...rest}>
      <Card className='max-w-full border'>
        <CardBody className='overflow-hidden'>
          {!tabs ? (
            /* One carousel => No tabs */
            <Splide tag='section' aria-label='Media Carousel' options={options}>
              {resultsArray[0].map((slide, slideIndex) => (
                <SplideSlide key={slideIndex}>
                  <CardGeneric data={slide} />
                </SplideSlide>
              ))}
            </Splide>
          ) : (
            /* Multiple carousels => Tabs */
            <Tabs size='md' aria-label='Tabs section'>
              {resultsArray.map((results, resultsIndex) => (
                <Tab key={`tab-${resultsIndex}`} title={tabs ? tabs[resultsIndex] : resultsIndex + 1}>
                  <Splide tag='section' aria-label='Media Carousel' options={options}>
                    {results.map((slide, slideIndex) => (
                      <SplideSlide key={slideIndex}>
                        <CardGeneric data={slide} />
                      </SplideSlide>
                    ))}
                  </Splide>
                </Tab>
              ))}
            </Tabs>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Carousel;
