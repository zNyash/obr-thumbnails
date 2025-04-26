import axios from "axios";

export default async function () {
	if (import.meta.server) {
		const response = await axios("https://osu.ppy.sh/oauth/token", {
			headers: {
				"Content-Type": "aplication/json",
			},
			data: JSON.stringify({
				client_id: "38570",
				client_secret: "WeVicawMV1fWTRZNBeNw8UfwTLnAkA8ea1vHmhGb",
				grant_type: "client_credentials",
				scope: "public",
			}),
			method: "POST",
		});

		process.env.OSU_TOKEN = response.data.access_token;
	}
}
