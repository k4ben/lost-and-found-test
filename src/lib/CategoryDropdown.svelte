<script lang="ts">
	import type { Category } from '@prisma/client';
	import { convertToHierarchy2 } from './functions';
	import { v4 } from 'uuid';
	const groupId = v4().substring(0, 4);

	export let name: string | undefined = undefined;
	const root = name == undefined;
	export let categories: ReturnType<typeof convertToHierarchy2>;
</script>

<div class={`inline-block relative group/[${groupId}]`} class:join-item={!root}>
	<div
		class={`hidden group-hover/[${groupId}]:join join-vertical absolute border border-base-200 outline-1 bg-base-100 divide-y divide-neutral ${
			root ? 'top-full' : 'left-full top-0'
		}`}
	>
		{#each categories as c}
			{#if c.children.length == 0}
				<div class="join-item">{c.Name}</div>
			{:else}
				<svelte:self categories={c.children} name={c.Name} />
			{/if}
		{/each}
	</div>
	{#if root}
		<select class="select select-bordered" on:mousedown|preventDefault={() => {}}
			><option>Select Category</option>
		</select>
	{:else}
		<div class="join-item">{name}</div>
	{/if}
</div>

<style lang="postcss">
	.join-item {
		@apply px-2 py-1;
	}
</style>
