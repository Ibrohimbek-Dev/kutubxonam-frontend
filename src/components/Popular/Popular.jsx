import React, { useEffect, useState } from "react";
import HomeButtons from "../Home/HomeButtons";
import CardItems from "../Card/CardItems";

const Popular = ({ popularStories }) => {
  const [current, setCurrent] = useState(0);

  const prevItem = () => {
    if (current === 0) {
      setCurrent(popularStories.length - 1);
    } else {
      setCurrent(current - 1);
    }
  };

  const nextSlide = () => {
    if (current === popularStories.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  return (
		<div className="flex flex-col bg-transparent lg:flex-row w-full xsm:h-40 h-full lg:h-80">
			<div className="lg:hidden">
				<h1 className="text-2xl mnsm:text-xl mb-1 xsm:text-sm">
					Eng Mashxur Xikoyalar
				</h1>
			</div>
			<div className="hidden lg:flex transition-transform duration-500">
				<HomeButtons
					textName={"Eng Mashxur Xikoyalar"}
					moveSliderRight={nextSlide}
					moveSliderLeft={prevItem}
				/>
			</div>

			<div className="flex flex-row scrollbarItemSlide p-0 sm:p-1 lg:overflow-hidden overflow-x-auto">
				{popularStories &&
					popularStories.map((story, index) => (
						<div key={index} className="mx-1">
							<CardItems
								title={story.name}
								imageURL={story.imageURL}
								current={current}
								index={index}
								author={story.author}
								category={story.category}
								storyUrl={story.storyURL}
								storyPdfUrl={story.storyPdfURL}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default Popular;
