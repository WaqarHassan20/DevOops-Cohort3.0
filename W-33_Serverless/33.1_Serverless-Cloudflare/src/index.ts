// const main: ExportedHandler<Env> = {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		return Response.json({
// 			name: 'The Fate and of the Furious ',
// 		});
// 	},
// };
// export default main;



const main: ExportedHandler<Env> = {
	fetch(request, env, ctx): Response {
		return Response.json({
			name: 'The Fate and of the Furious ',
			changes: 'Something changed here ',
		});
	},
};

export default main;