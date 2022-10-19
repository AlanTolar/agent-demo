export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","config.yml","favicon.png","uploads/map-long.png","uploads/map.png","uploads/map1-2.png","uploads/picture.png","uploads/z-picture.png","uploads/z-sign-pink.png"]),
	mimeTypes: {".yml":"text/yaml",".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-5c63901c.js","imports":["_app/immutable/start-5c63901c.js","_app/immutable/chunks/index-95be4f6f.js","_app/immutable/chunks/singletons-2c86b363.js","_app/immutable/chunks/preload-helper-aa6bc0ce.js"],"stylesheets":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js')
		],
		routes: [
			{
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "admin",
				pattern: /^\/admin\/?$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "listings",
				pattern: /^\/listings\/?$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "preview",
				pattern: /^\/preview\/?$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "listings/[listing]",
				pattern: /^\/listings\/([^/]+?)\/?$/,
				names: ["listing"],
				types: [null],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
