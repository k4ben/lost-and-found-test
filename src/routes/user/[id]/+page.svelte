<script lang="ts">
	import Item from '$lib/item.svelte';
	import LostItem from '$lib/LostItem.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import TabSelector from '$lib/TabSelector.svelte';
	import AddItem from '$lib/AddItem.svelte';

	let tab: 'Lost' | 'Found' = 'Lost';

	export let data: PageData;

	$: lostItems = data.user.Item.filter((i) => i.Type == 'LostItem');
	$: foundItems = data.user.Item.filter((i) => i.Type == 'FoundItem');

	onMount(() => document.documentElement.setAttribute('data-theme', 'light'));
</script>

<div class="bg-base-200 h-screen">
	<div class="navbar bg-base-100 mb-8">
		<div class="flex-1">
			<div class="btn btn-ghost text-xl">Lost and Found</div>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<li>
					<details>
						<summary>
							{data.user?.Name}
						</summary>
						<ul class="p-2 bg-base-100 rounded-t-none">
							<li><a>Link 1</a></li>
							<li><a>Link 2</a></li>
						</ul>
					</details>
				</li>
			</ul>
		</div>
	</div>
	<TabSelector {lostItems} {foundItems} {tab} on:tabClick={(t) => (tab = t.detail)} />
	<div class="mx-4 md:mx-16 mt-8">
		<div
			class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 w-full justify-items-center gap-4 lg:gap-24"
		>
			<AddItem categories={data.categories} />
			{#if tab == 'Lost'}
				{#each lostItems as item}
					<LostItem {item} />
				{/each}
			{:else}
				{#each foundItems as item}
					<Item {item} />
				{/each}
			{/if}
		</div>
	</div>
</div>
