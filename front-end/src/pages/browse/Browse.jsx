import React from 'react';

import MovieList from '../../components/browse/MovieList';
import requests from '../../utils/requests';
import Banner from '../../components/browse/Banner';
import Nav from '../../components/browse/Nav';

import './Browse.css';

function Browse() {
	return (
		<div className="app">
			<Nav />
			<Banner />
			{/* <MovieList title="" isLargeRow fetchUrl={requests.fetchNetflixOriginals} /> */}
			<MovieList title="" isLargeRow fetchUrl={requests.fetchTrending} fetchVideo={requests.fetchDetailMovie}/>
			<MovieList title="Xếp hạng cao" fetchUrl={requests.fetchTopRated} fetchVideo={requests.fetchDetailMovie}/>
			<MovieList title="Hành động" fetchUrl={requests.fetchActionMovies} fetchVideo={requests.fetchDetailMovie}/>
			<MovieList title="Hài" fetchUrl={requests.fetchComedyMovies} fetchVideo={requests.fetchDetailMovie}/>
			<MovieList title="Kinh dị" fetchUrl={requests.fetchHorrorMovies} fetchVideo={requests.fetchDetailMovie}/>
			<MovieList title="Lãng mạn" fetchUrl={requests.fetchRomanceMovies} fetchVideo={requests.fetchDetailMovie}/>
			<MovieList title="Tài liệu" fetchUrl={requests.fetchDocumentaries} fetchVideo={requests.fetchDetailMovie}/>
		</div>
	);
}

export default Browse;

