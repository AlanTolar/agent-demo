export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","config.yml","favicon.png","uploads/08425d08565f60d193d1c76b31c5ad95.jpeg","uploads/0e608ef0bc5c4e0d77ca25ce8978c421.jpeg","uploads/233-2332677_image-500580-placeholder-transparent.webp","uploads/83d9f6dfd5d24163db2ddd6c2266c3c3-1-.jpeg","uploads/918b6d46e2b09af2d5bc5c359548a622.jpeg","uploads/a8308d6f4b2836c74177677fababf98f.jpeg","uploads/d6dfa17e7aa48e257f137248f8dfeb97.jpeg","uploads/farmer-pointing.jpeg","uploads/hero-backdrop.jpeg","uploads/logo-dark.svg","uploads/logo-light.svg","uploads/map-long.png","uploads/map.png","uploads/map1-2.png","uploads/people-talking.jpeg","uploads/picture.png","uploads/rhombus.png","uploads/z-picture.png","uploads/z-sign-pink.png"]),
	mimeTypes: {".yml":"text/yaml",".png":"image/png",".jpeg":"image/jpeg",".webp":"image/webp",".svg":"image/svg+xml"},
	_: {
		entry: {"file":"_app/immutable/start-adc06d6a.js","imports":["_app/immutable/start-adc06d6a.js","_app/immutable/chunks/index-e4c242c5.js","_app/immutable/chunks/singletons-d973b3ea.js","_app/immutable/chunks/preload-helper-aa6bc0ce.js"],"stylesheets":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js')
		],
		routes: [
			{
				id: "(app)",
				pattern: /^\/?$/,
				names: [],
				types: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "(admin)/admin",
				pattern: /^\/admin\/?$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "(app)/agents",
				pattern: /^\/agents\/?$/,
				names: [],
				types: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "(app)/listings",
				pattern: /^\/listings\/?$/,
				names: [],
				types: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "(app)/preview",
				pattern: /^\/preview\/?$/,
				names: [],
				types: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "(app)/sell",
				pattern: /^\/sell\/?$/,
				names: [],
				types: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "(app)/agents/[agent]",
				pattern: /^\/agents\/([^/]+?)\/?$/,
				names: ["agent"],
				types: [null],
				page: { layouts: [0,2], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "(app)/listings/[listing]",
				pattern: /^\/listings\/([^/]+?)\/?$/,
				names: ["listing"],
				types: [null],
				page: { layouts: [0,2], errors: [1,,], leaf: 8 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
