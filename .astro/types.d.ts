declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof AnyEntryMap> = AnyEntryMap[C][keyof AnyEntryMap[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"brands": {
"atmos.md": {
	id: "atmos.md";
  slug: "atmos";
  body: string;
  collection: "brands";
  data: any
} & { render(): Render[".md"] };
"fion-tech.md": {
	id: "fion-tech.md";
  slug: "fion-tech";
  body: string;
  collection: "brands";
  data: any
} & { render(): Render[".md"] };
"operand.md": {
	id: "operand.md";
  slug: "operand";
  body: string;
  collection: "brands";
  data: any
} & { render(): Render[".md"] };
"slip.md": {
	id: "slip.md";
  slug: "slip";
  body: string;
  collection: "brands";
  data: any
} & { render(): Render[".md"] };
"stepzen.md": {
	id: "stepzen.md";
  slug: "stepzen";
  body: string;
  collection: "brands";
  data: any
} & { render(): Render[".md"] };
"zora.md": {
	id: "zora.md";
  slug: "zora";
  body: string;
  collection: "brands";
  data: any
} & { render(): Render[".md"] };
};
"developers": {
"devs1/dev1.md": {
	id: "devs1/dev1.md";
  slug: "devs1/dev1";
  body: string;
  collection: "developers";
  data: any
} & { render(): Render[".md"] };
"devs1/dev2.md": {
	id: "devs1/dev2.md";
  slug: "devs1/dev2";
  body: string;
  collection: "developers";
  data: any
} & { render(): Render[".md"] };
"devs1/dev3.md": {
	id: "devs1/dev3.md";
  slug: "devs1/dev3";
  body: string;
  collection: "developers";
  data: any
} & { render(): Render[".md"] };
"devs2/dev1.md": {
	id: "devs2/dev1.md";
  slug: "devs2/dev1";
  body: string;
  collection: "developers";
  data: any
} & { render(): Render[".md"] };
"devs2/dev2.md": {
	id: "devs2/dev2.md";
  slug: "devs2/dev2";
  body: string;
  collection: "developers";
  data: any
} & { render(): Render[".md"] };
"devs2/dev3.md": {
	id: "devs2/dev3.md";
  slug: "devs2/dev3";
  body: string;
  collection: "developers";
  data: any
} & { render(): Render[".md"] };
"devs3/dev1.md": {
	id: "devs3/dev1.md";
  slug: "devs3/dev1";
  body: string;
  collection: "developers";
  data: any
} & { render(): Render[".md"] };
"devs3/dev2.md": {
	id: "devs3/dev2.md";
  slug: "devs3/dev2";
  body: string;
  collection: "developers";
  data: any
} & { render(): Render[".md"] };
"devs3/dev3.md": {
	id: "devs3/dev3.md";
  slug: "devs3/dev3";
  body: string;
  collection: "developers";
  data: any
} & { render(): Render[".md"] };
};
"iterate-accelerate-list1": {
"automagic-builds.md": {
	id: "automagic-builds.md";
  slug: "automagic-builds";
  body: string;
  collection: "iterate-accelerate-list1";
  data: any
} & { render(): Render[".md"] };
"infrastructure-as-legos.md": {
	id: "infrastructure-as-legos.md";
  slug: "infrastructure-as-legos";
  body: string;
  collection: "iterate-accelerate-list1";
  data: any
} & { render(): Render[".md"] };
};
"iterate-accelerate-list2": {
"railway-cli.md": {
	id: "railway-cli.md";
  slug: "railway-cli";
  body: string;
  collection: "iterate-accelerate-list2";
  data: any
} & { render(): Render[".md"] };
"secrets-management.md": {
	id: "secrets-management.md";
  slug: "secrets-management";
  body: string;
  collection: "iterate-accelerate-list2";
  data: any
} & { render(): Render[".md"] };
};
"launch-scale-list1": {
"autoscaling.md": {
	id: "autoscaling.md";
  slug: "autoscaling";
  body: string;
  collection: "launch-scale-list1";
  data: any
} & { render(): Render[".md"] };
"production-ready.md": {
	id: "production-ready.md";
  slug: "production-ready";
  body: string;
  collection: "launch-scale-list1";
  data: any
} & { render(): Render[".md"] };
};
"launch-scale-list2": {
"safe-and-sound.md": {
	id: "safe-and-sound.md";
  slug: "safe-and-sound";
  body: string;
  collection: "launch-scale-list2";
  data: any
} & { render(): Render[".md"] };
"uptime.md": {
	id: "uptime.md";
  slug: "uptime";
  body: string;
  collection: "launch-scale-list2";
  data: any
} & { render(): Render[".md"] };
};
"launch-scale-list3": {
"supreme-support.md": {
	id: "supreme-support.md";
  slug: "supreme-support";
  body: string;
  collection: "launch-scale-list3";
  data: any
} & { render(): Render[".md"] };
"usage-metrics.md": {
	id: "usage-metrics.md";
  slug: "usage-metrics";
  body: string;
  collection: "launch-scale-list3";
  data: any
} & { render(): Render[".md"] };
};
"start-tinker-list1": {
"infrastructure-as-legos.md": {
	id: "infrastructure-as-legos.md";
  slug: "infrastructure-as-legos";
  body: string;
  collection: "start-tinker-list1";
  data: any
} & { render(): Render[".md"] };
"solid-base.md": {
	id: "solid-base.md";
  slug: "solid-base";
  body: string;
  collection: "start-tinker-list1";
  data: any
} & { render(): Render[".md"] };
};
"start-tinker-list2": {
"railway-cli.md": {
	id: "railway-cli.md";
  slug: "railway-cli";
  body: string;
  collection: "start-tinker-list2";
  data: any
} & { render(): Render[".md"] };
"secrets-management.md": {
	id: "secrets-management.md";
  slug: "secrets-management";
  body: string;
  collection: "start-tinker-list2";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = never;
}
