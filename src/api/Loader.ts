import axios from 'axios';
import * as Queries from './queries';
import * as URL from './baseURLs';

export enum operation {
	TRENDING = 0,
	SEARCH = 1,
	SIMILAR = 2,
}

export const operationPicker = async (op: number, input: string) => {
	switch (op) {
		case operation.TRENDING: {
			return fetchTrending();
		}
		case operation.SEARCH: {
			return fetchSearch(input);
		}
		default: {
			return fetchSimilar(input);
		}
	}
};

const fetchTrending = () => {
	return new Promise((resolve) => {
		axios
			.post(URL.GRAPHQL_API, {
				query: Queries.FETCH_TRENDING_QUERY,
			})
			.then((data) => {
				resolve(data.data.data.movies);
			});
	});
};

const fetchSearch = (input: string) => {
	return new Promise((resolve) => {
		axios
			.post(URL.GRAPHQL_API, {
				query: Queries.FETCH_SEARCH_QUERY(input),
			})
			.then((data) => {
				resolve(data.data.data.searchMovies);
			});
	});
};

const fetchSimilar = (id: string) => {
	return new Promise((resolve) => {
		axios
			.post(URL.GRAPHQL_API, {
				query: Queries.FETCH_SIMILAR_QUERY(id),
			})
			.then((data) => {
				resolve(data.data.data.movie.similar);
			});
	});
};

export const getLinks = (name: string) => {
	const readableName = name
		.replaceAll(' ', '_')
		.replaceAll(/[^,:'.!?\w\s]/gi, '')
		.trim();
	const IMDB_url: string = URL.IMDB_TITLE_QUERY(readableName);
	const WIKI_url: string = URL.WIKIPEDIA_SEARCH_QUERY(readableName);

	return Promise.all([
		new Promise((resolve) => {
			fetch(IMDB_url)
				.then((response: any) => {
					return response.json();
				})
				.then((response: any) => {
					resolve(response);
				});
		}),
		new Promise((resolve) => {
			fetch(WIKI_url)
				.then((response: any) => {
					return response.json();
				})
				.then((response: any) => {
					resolve(response);
				});
		}),
	]);
};
