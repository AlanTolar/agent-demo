import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","config.yml","farmer-pointing.jpeg","favicon.png","hero-backdrop.jpeg","people-talking.jpeg","picture.png","placeholder.webp","sunshine-field.jpeg","sunshine-trees.jpeg","uploads/08425d08565f60d193d1c76b31c5ad95.jpeg","uploads/0e608ef0bc5c4e0d77ca25ce8978c421.jpeg","uploads/233-2332677_image-500580-placeholder-transparent.webp","uploads/5b02dcbf400b84af24b1bf9213b531d2.jpeg","uploads/83d9f6dfd5d24163db2ddd6c2266c3c3-1-.jpeg","uploads/918b6d46e2b09af2d5bc5c359548a622.jpeg","uploads/a8308d6f4b2836c74177677fababf98f.jpeg","uploads/c896f53ac3437e7315a4a76b85441416.jpeg","uploads/d6dfa17e7aa48e257f137248f8dfeb97.jpeg"]),
	mimeTypes: {".yml":"text/yaml",".jpeg":"image/jpeg",".png":"image/png",".webp":"image/webp"},
	_: {
		entry: {"file":"_app/immutable/start-e45c7001.js","imports":["_app/immutable/start-e45c7001.js","_app/immutable/chunks/index-0c4492da.js","_app/immutable/chunks/singletons-b590ad08.js","_app/immutable/chunks/index-6fc333c3.js","_app/immutable/chunks/preload-helper-41c905a7.js","_app/immutable/chunks/control-f5b05b5f.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js'),
			() => import('../server/nodes/2.js'),
			() => import('../server/nodes/3.js'),
			() => import('../server/nodes/4.js'),
			() => import('../server/nodes/6.js'),
			() => import('../server/nodes/7.js'),
			() => import('../server/nodes/8.js'),
			() => import('../server/nodes/9.js'),
			() => import('../server/nodes/10.js')
		],
		routes: [
			{
				id: "/(app)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(admin)/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(app)/agents/[agent]",
				pattern: /^\/agents\/([^/]+?)\/?$/,
				params: [{"name":"agent","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(app)/listings",
				pattern: /^\/listings\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(app)/listings/[listing]",
				pattern: /^\/listings\/([^/]+?)\/?$/,
				params: [{"name":"listing","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(app)/preview",
				pattern: /^\/preview\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(app)/sell",
				pattern: /^\/sell\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 9 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
