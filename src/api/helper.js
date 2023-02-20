import axios from 'axios';

const API_HOST = "http://ws.bus.go.kr";

const helper = {
  API: (END_POINT = 'api/rest') =>
		axios.create({
			baseURL: `${API_HOST}/${END_POINT}`,
			headers: {
				'Content-Type': 'application/json',
			},
			validateStatus: status => status >= 200 && status < 404 || status === 500
		}),
};

export default helper;
