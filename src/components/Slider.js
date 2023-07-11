import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

const Slider = ({ images, smallImages }) => {
	const [current, setCurrent] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [items, setItems] = useState([]);
	const [itemsInner, setItemsInner] = useState([]);

	useEffect(() => {
		setItems(images);
		setItemsInner(smallImages);
		setCurrent(0);

		gsap.set([images, smallImages], { 'will-change': 'transform' });

		return () => {
			// Cleanup code if necessary
		};
	}, [images, smallImages]);

	const navigate = (direction) => {
		if (isAnimating) return false;
		setIsAnimating(true);

		const previous = current;
		const next =
			direction === 1
				? current < items.length - 1
					? current + 1
					: 0
				: current > 0
				? current - 1
				: items.length - 1;

		setCurrent(next);

		const currentItem = items[previous];
		const currentInner = itemsInner[previous];
		const upcomingItem = items[next];
		const upcomingInner = itemsInner[next];

		gsap
			.timeline({
				defaults: { duration: 1.1, ease: 'power3.inOut' },
				onComplete: () => {
					currentItem.classList.remove('slider__item--current');
					upcomingItem.classList.add('slider__item--current');
					setIsAnimating(false);
				},
			})
			.to(currentItem, {
				yPercent: -direction * 100,
				onComplete: () => gsap.set(currentItem, { opacity: 0 }),
			})
			.to(
				currentInner,
				{
					yPercent: direction * 30,
					startAt: {
						rotation: 0,
					},
					rotation: direction * -15,
					scaleY: 2.8,
				},
				0
			)
			.to(
				upcomingItem,
				{
					startAt: {
						opacity: 1,
						yPercent: -direction * 80,
					},
					yPercent: 0,
				},
				0
			)
			.to(
				upcomingInner,
				{
					startAt: {
						yPercent: direction * 30,
						scaleY: 2.8,
						rotation: direction * 15,
					},
					yPercent: 0,
					scaleY: 1,
					rotation: 0,
				},
				0
			);
	};

	const next = () => navigate(1);
	const prev = () => navigate(-1);

	return (
		<div>
			<div className='slider slider--bg'>
				{images.map((item, index) => (
					<div
						key={index}
						className={`slider__item ${
							index === current ? 'slider__item--current' : ''
						}`}
					>
						<div
							className='slider__item-inner'
							style={{ backgroundImage: `url(${item})` }}
						></div>
					</div>
				))}
			</div>
			<div className='slider slider--fg'>
				{smallImages.map((item, index) => (
					<div
						key={index}
						className={`slider__item ${
							index === current ? 'slider__item--current' : ''
						}`}
					>
						<div
							className='slider__item-inner'
							style={{ backgroundImage: `url(${item})` }}
						></div>
					</div>
				))}
			</div>
			<nav className='slider-nav'>
				<button
					className='unbutton slider-nav__item slider-nav__item--prev'
					onClick={prev}
				>
					<span>Prev</span>
				</button>
				<button
					className='unbutton slider-nav__item slider-nav__item--next'
					onClick={next}
				>
					<span>Next</span>
				</button>
			</nav>
		</div>
	);
};

export default Slider;
