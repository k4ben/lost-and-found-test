<script lang="ts">
	import type { Category } from '@prisma/client';
	import { convertToHierarchy2 } from './functions';

	export let name: string | undefined = undefined;
	export let categories: ReturnType<typeof convertToHierarchy2>;
</script>

{#if name == undefined}
	<div class="group/a inline-block relative">
		<div
			class="hidden group-hover/a:join join-vertical absolute top-full border border-base-200 outline-1 bg-base-100 divide-y divide-neutral"
		>
			{#each categories as c}
				{#if c.children.length == 0}
					<div class="join-item">{c.Name}</div>
				{:else}
					<svelte:self categories={c.children} name={c.Name} />
				{/if}
			{/each}
		</div>
		<select class="select select-bordered" on:mousedown|preventDefault={() => {}}
			><option>Select Category</option>
		</select>
	</div>
{:else}
	<div class="join-item group/b inline-block relative">
		<div
			class="top-0 hidden group-hover/b:join join-vertical absolute left-full border border-base-200 outline-1 bg-base-100 divide-y divide-neutral"
		>
			{#each categories as c}
				{#if c.children.length == 0}
					<div class="join-item">{c.Name}</div>
				{:else}
					<svelte:self categories={c.children} name={c.Name} />
				{/if}
			{/each}
		</div>
		<div>{name}</div>
	</div>
{/if}

<style lang="postcss">
	.join-item {
		@apply px-2 py-1;
	}
</style>
