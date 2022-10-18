export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","admin/config.yml","admin/index.html","favicon.png"]),
	mimeTypes: {".yml":"text/yaml",".html":"text/html",".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-46e38ccf.js","imports":["_app/immutable/start-46e38ccf.js","_app/immutable/chunks/index-edd250b0.js","_app/immutable/chunks/singletons-10374625.js"],"stylesheets":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
