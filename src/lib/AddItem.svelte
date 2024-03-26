<script lang="ts">
	import type { Category } from '@prisma/client';
	import CategoryDropdown from './CategoryDropdown.svelte';
	import { convertToHierarchy, type CategoryWithChildren } from './functions';
	import { onMount } from 'svelte';
	import type { EventHandler } from 'svelte/elements';

	let modal: HTMLDialogElement;
	export let categories: CategoryWithChildren[];
	let category = -1n;

	$: console.log(categories);

	function filterNonNumericRootProps(obj: Record<string, any>): Record<string, any> {
		const result: Record<string, any> = {};
		for (const key in obj) {
			if (!isNaN(Number(key))) continue; // Skip numeric keys
			result[key] = obj[key];
		}
		return result;
	}

	onMount(() => modal.showModal());

	function unpack(obj: Object): { [key: string]: any } {
		console.log(Object.entries(obj));
		return Object.fromEntries(
			Object.entries(obj)
				.filter((o) => isNaN(Number(o[0])))
				.map((o) => [o[0], o[1].value])
		);
	}

	const handleSubmit: EventHandler<Event, HTMLFormElement> = (s) => {
		console.log(s);
		const { category, type } = unpack(s.currentTarget.elements);
		fetch(`/api/item`, {
			method: 'POST',
			body: JSON.stringify({
				CategoryID: category,
				Type: type,
				Description: 'test',
				UserID: location.pathname.replace('/user/', ''),
				locationName: 'test location',
				SchoolID: '953821716830420993'
			})
		});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="card w-full h-full bg-base-300 hover:bg-secondary transition-colors hover:text-secondary-content"
	on:click={() => modal.showModal()}
	role="button"
	tabindex="0"
>
	<div class="card-body gap-0 place-content-center items-center cursor-pointer">
		<div class="text-lg font-medium">Report New Item</div>
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
				/></svg
			>
		</div>
	</div>
	<dialog bind:this={modal} class="modal text-base-content cursor-default">
		<div class="modal-box w-11/12 max-w-3xl h-96">
			<form class="flex flex-col h-full" on:submit|preventDefault={handleSubmit}>
				<form method="dialog">
					<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
				</form>
				<h3 class="font-bold text-lg">Report New Item</h3>
				<div class="py-4">
					<!-- <p class="font-semibold">Type</p> -->
					<div class="w-1/2">
						<p class="form-control-label">Type:</p>
						<div class="flex gap-4">
							<div class="form-control">
								<label class="label cursor-pointer">
									<input
										type="radio"
										name="type"
										value="LostItem"
										class="radio checked:bg-primary"
										checked
									/>
									<span class="label-text ml-2">My Lost Item</span>
								</label>
							</div>
							<div class="form-control">
								<label class="label cursor-pointer">
									<input
										type="radio"
										name="type"
										value="FoundItem"
										class="radio checked:bg-primary"
									/>
									<span class="label-text ml-2">Something I Found</span>
								</label>
							</div>
						</div>
						<p class="form-control-label">Category:</p>
						<input hidden type="text" name="category" bind:value={category} />
						<CategoryDropdown {categories} on:selection={(s) => (category = s.detail.id)} />
					</div>
				</div>
				<div class="flex-grow"></div>
				<div class="">
					<input type="submit" value="Submit" class="btn btn-primary float-right" />
				</div>
			</form>
		</div>
	</dialog>
</div>

<style lang="postcss">
	.form-control-label {
		@apply font-medium my-1;
	}
</style>
