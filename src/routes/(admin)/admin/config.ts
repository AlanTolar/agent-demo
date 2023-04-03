import type { Config } from '@staticcms/core';

export const config: Config = {
	backend: {
		name: 'git-gateway',
		branch: 'master',
	},
	local_backend: true,
	media_folder: 'static/uploads',
	public_folder: '/uploads',
	collections: [
		{
			name: 'listing',
			label: 'Listings',
			folder: 'src/lib/content/listings',
			create: true,
			extension: 'json',
			summary: '{{title}} (/{{filename}})',
			// preview_path: 'listings/{{slug}}',
			fields: [
				{
					label: 'Title',
					name: 'title',
					widget: 'string',
				},
				{
					label: 'Publish Date',
					name: 'date',
					widget: 'datetime',
				},
				{
					label: 'Agent',
					name: 'agent',
					widget: 'relation',
					collection: 'agent',
					value_field: '{{slug}}',
					display_fields: ['{{name}} (/{{slug}})'],
					search_fields: ['name'],
				},
				{
					label: 'Address',
					name: 'address',
					widget: 'object',
					collapsed: false,
					fields: [
						{
							label: 'Street Address',
							name: 'street',
							widget: 'string',
							required: false,
						},
						{
							label: 'City',
							name: 'city',
							widget: 'string',
						},
						{
							label: 'State',
							name: 'state',
							widget: 'string',
						},
						{
							label: 'Postal Code',
							name: 'postCode',
							widget: 'string',
							required: false,
						},
						{
							label: 'County',
							name: 'county',
							widget: 'string',
							required: false,
						},
					],
				},
				{
					label: 'Acres',
					name: 'acres',
					widget: 'number',
					value_type: 'float',
					min: 0,
				},
				{
					label: 'Price',
					name: 'price',
					widget: 'number',
					value_type: 'int',
					min: 0,
				},
				{
					label: 'Featured Image',
					name: 'featuredImage',
					widget: 'image',
				},
				{
					label: 'Slideshow Images',
					name: 'slideshowImages',
					widget: 'list',
					required: false,
					fields: [
						{
							label: 'Slideshow Image',
							name: 'image',
							widget: 'image',
						},
					],
				},
				{
					label: 'Description',
					name: 'description',
					widget: 'markdown',
					required: false,
				},
				{
					label: 'Details',
					name: 'details',
					widget: 'markdown',
					required: false,
				},
				{
					label: 'Summary',
					name: 'summary',
					widget: 'object',
					collapsed: false,
					required: false,
					fields: [
						{
							label: 'Feature Categories',
							name: 'featureCategories',
							widget: 'list',
							required: false,
							fields: [
								{
									label: 'Feature Category',
									name: 'featureCategory',
									widget: 'string',
								},
								{
									label: 'List of Features',
									name: 'features',
									widget: 'string',
								},
							],
						},
						{
							label: 'Land Details',
							name: 'landDetails',
							widget: 'string',
							required: false,
						},
						{
							label: 'Distances',
							name: 'distances',
							widget: 'list',
							fields: [
								{
									label: 'City/Interstate/Attraction',
									name: 'location',
									widget: 'string',
								},
								{
									label: 'Distance (miles)',
									name: 'distance',
									widget: 'number',
									value_type: 'float',
									min: 0,
								},
							],
						},
						{
							label: 'Utilities',
							name: 'utilities',
							widget: 'list',
							required: false,
							fields: [
								{
									label: 'Utility',
									name: 'utility',
									widget: 'string',
								},
								{
									label: 'Availability',
									name: 'availability',
									widget: 'select',
									multiple: false,
									options: [
										{
											label: 'Onsite',
											value: 'Onsite',
										},
										{
											label: 'Nearby',
											value: 'Nearby',
										},
										{
											label: 'Unavailable',
											value: 'Unavailable',
										},
									],
								},
							],
						},
						{
							label: 'Housing',
							name: 'housing',
							widget: 'string',
							required: false,
						},
						{
							label: 'Improvements',
							name: 'improvements',
							widget: 'string',
							required: false,
						},
					],
				},
				{
					label: 'Download Brochure',
					name: 'brochure',
					widget: 'file',
					required: false,
				},
				{
					label: 'Location',
					name: 'location',
					widget: 'map',
					required: false,
				},
				{
					label: 'Video URL',
					name: 'videoURL',
					widget: 'string',
					required: false,
				},
				{
					label: 'Boundary Coordinates',
					name: 'boundaryCoordinates',
					widget: 'string',
					required: false,
				},
				{
					label: '3D Model URL',
					name: 'modelURL',
					widget: 'string',
					required: false,
				},
			],
		},
		{
			name: 'agent',
			label: 'Agents',
			folder: 'src/lib/content/agents',
			create: true,
			extension: 'json',
			summary: '{{name}} (/{{filename}})',
			identifier_field: 'name',
			// preview_path: 'agents/{{slug}}',
			fields: [
				{
					name: 'name',
					label: 'Name',
					widget: 'string',
				},
				{
					label: 'Position',
					name: 'position',
					widget: 'select',
					multiple: false,
					options: [
						{
							label: 'Broker',
							value: 'broker',
						},
						{
							label: 'Regional Manager',
							value: 'manager',
						},
					],
				},
				{
					name: 'email',
					label: 'Email',
					widget: 'string',
				},
				{
					name: 'phone',
					label: 'Phone',
					widget: 'string',
				},
				{
					name: 'location',
					label: 'Location',
					widget: 'string',
				},
				{
					name: 'image',
					label: 'Image',
					widget: 'image',
				},
				{
					name: 'bio',
					label: 'Bio',
					widget: 'markdown',
				},
				{
					name: 'reviews',
					label: 'Reviews',
					widget: 'list',
					fields: [
						{
							name: 'customer',
							label: 'Customer',
							widget: 'string',
						},
						{
							name: 'title',
							label: 'Title',
							widget: 'string',
						},
						{
							name: 'review',
							label: 'Review',
							widget: 'markdown',
						},
					],
				},
			],
		},
	],
};
