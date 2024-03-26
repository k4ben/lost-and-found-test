<script lang="ts">
	import type { Category } from '@prisma/client';
	import { convertToHierarchy2 } from './functions';
	import { v4 } from 'uuid';
	import { generator } from './SerialNumberGenerator';
	import { createEventDispatcher } from 'svelte';

	const groupId = generator.generateSerialNumber();

	export let name: string | undefined = undefined;
	const root = name == undefined;
	export let categories: ReturnType<typeof convertToHierarchy2>;
	let selectedName: string | null = null;
	let selectedId: bigint | null = null;

	function onClick(name: string, id: bigint) {
		selectedName = name;
		selectedId = id;
		dispatch('selection', { name, id });
	}

	const dispatch = createEventDispatcher<{ selection: { name: string; id: bigint } }>();
</script>

<div class={`inline-block relative group/${groupId}`} class:join-item={!root}>
	<div
		style="border-radius: 0;"
		class={`hidden group-hover/${groupId}:join join-vertical absolute border border-base-200 outline-1 bg-base-100 divide-y divide-neutral ${
			root ? 'top-full' : 'left-full top-0'
		}`}
	>
		{#each categories as c}
			{#if c.children.length == 0}
				<div class="join-item" on:click={() => onClick(c.Name, c.ID)}>{c.Name}</div>
			{:else}
				<svelte:self
					categories={c.children}
					name={c.Name}
					on:selection={(s) => onClick(s.detail.name, s.detail.id)}
				/>
			{/if}
		{/each}
	</div>
	{#if root}
		<select class="select select-bordered min-w-48" on:mousedown|preventDefault={() => {}}
			><option>{selectedName == null ? 'Select Category' : selectedName}</option>
		</select>
	{:else}
		<div class="flex items-center">
			<div>{name}</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="-mr-1"
				width="16"
				height="16"
				viewBox="0 0 24 24"><path fill="currentColor" d="M10 17V7l5 5z" /></svg
			>
		</div>
	{/if}
</div>

<style lang="postcss">
	.join-item {
		@apply px-2 py-1;
	}
</style>
