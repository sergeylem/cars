const getRndImages = (maxArray) => {

	const getRndInteger = () => {
		const min = 0;
		const max = maxArray; //Set up max size of array where max + 1 = quantity of images
		return (Math.floor(Math.random() * (max - min + 1)) + min);
	}

	let x, a, b, c, d;

	// Generation fist number
	x = getRndInteger();
	a = x;

	// Generation second number
	x = getRndInteger();
	while (x === a)
		x = getRndInteger();
	b = x;

	// Generation third number
	x = getRndInteger();
	while (x === a || x === b)
		x = getRndInteger();
	c = x;

	// Generation fourth number
	x = getRndInteger();
	while (x === a || x === b || x === c)
		x = getRndInteger();
	d = x;

	return [a, b, c, d];
}

export default getRndImages;