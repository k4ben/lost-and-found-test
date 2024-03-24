<script lang="ts">
	import type { UserUnionType } from '../routes/user/[id]/proxy+page.server';
	import { createEventDispatcher } from 'svelte';

	export let tab: 'Lost' | 'Found';

	const dispatch = createEventDispatcher<{ tabClick: 'Lost' | 'Found' }>();

	export let lostItems: UserUnionType['Item'];
	export let foundItems: UserUnionType['Item'];
</script>

<div class="text-center">
	<div class="mx-auto">
		<div class="join">
			<button
				class="tab-selector-btn"
				class:btn-primary-active={tab == 'Lost'}
				on:click={() => dispatch('tabClick', 'Lost')}
				>My Stuff <div class="badge">{lostItems.length}</div></button
			>
			<button
				class="tab-selector-btn"
				class:btn-primary-active={tab == 'Found'}
				on:click={() => dispatch('tabClick', 'Found')}
				>Things I've Found <div class="badge">{foundItems.length}</div></button
			>
		</div>
	</div>
</div>

<style lang="postcss">
	.tab-selector-btn {
		@apply join-item btn bg-base-300;
	}
	.btn-primary-active {
		@apply btn-active btn-primary text-primary-content;
	}
</style>
