import React from 'react';
import Slider from './components/Slider';

const App = () => {
	const images = [
		'images/home/1.jpg',
		'images/home/2.jpg',
		'images/home/3.jpg',
		'images/home/4.jpg',
		'images/home/5.jpg',
		'images/home/6.jpg',
		'images/home/7.jpg',
		'images/home/8.jpg',
	];

	const smallImages = [
		'images/home/1small.jpg',
		'images/home/2small.jpg',
		'images/home/3small.jpg',
		'images/home/4small.jpg',
		'images/home/5small.jpg',
		'images/home/6small.jpg',
		'images/home/7small.jpg',
		'images/home/8small.jpg',
	];
	return (
		<div>
			<Slider images={images} smallImages={smallImages} />
		</div>
	);
};

export default App;
