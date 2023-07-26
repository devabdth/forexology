window.onload= ()=> {
	const facebook= document.querySelector('.shadow-icon-button#facebook');
	facebook.onclick= ()=> { window.open('https://facebook.com/forexologyfx/', '_self'); }
	const twitter= document.querySelector('.shadow-icon-button#twitter');
	twitter.onclick= ()=> { window.open('https://twitter.com/forexologyfx/', '_self'); }
	const instagram= document.querySelector('.shadow-icon-button#instagram');
	instagram.onclick= ()=> { window.open('https://instagram.com/forexologyfx/', '_self'); }
	const linkedin= document.querySelector('.shadow-icon-button#linkedin')	;
	linkedin.onclick= ()=> { window.open('https://linkedin.com/forexologyfx/', '_self'); }
	const display= document.querySelector('section p.countdown');

	const date= new Date('August 1, 2023 10:00:00');

	let x= setInterval(()=> {
		const now= new Date().getTime();
		const distance= date - now;
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		if (distance < 0) {
			clearInterval(x);
			display.innerHTML= `<a target="_self" href='/' class="main-button">Show Website</a>`;
			return;
		}

		display.innerHTML= `${days} Days : ${hours} Hours : ${minutes} Minutes : ${seconds} Seconds`

	}, 1);
}