<script lang="ts">
	import type { Category } from '@prisma/client';
	import CategoryDropdown from './CategoryDropdown.svelte';
	import { convertToHierarchy, type CategoryWithChildren } from './functions';

	let modal: HTMLDialogElement;
	export let categories: CategoryWithChildren[];

	$: console.log(categories);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="card w-full h-full bg-base-300 hover:bg-secondary transition-colors cursor-pointer hover:text-secondary-content"
	on:click={() => modal.showModal()}
	role="button"
	tabindex="0"
>
	<div class="card-body gap-0 place-content-center items-center">
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
	<dialog bind:this={modal} class="modal text-base-content" data-theme="dark">
		<div class="modal-box w-11/12 max-w-3xl h-96">
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
			</form>
			<h3 class="font-bold text-lg">Report New Item</h3>
			<div class="py-4">
				<form>
					<!-- <p class="font-semibold">Type</p> -->
					<div class="w-48">
						<div class="form-control">
							<label class="label cursor-pointer">
								<span class="label-text">My Lost Item</span>
								<input type="radio" name="radio-10" class="radio checked:bg-primary" checked />
							</label>
						</div>
						<div class="form-control">
							<label class="label cursor-pointer">
								<span class="label-text">Something I Found</span>
								<input type="radio" name="radio-10" class="radio checked:bg-primary" />
							</label>
						</div>
						<CategoryDropdown {categories} />
					</div>
				</form>
			</div>
		</div>
	</dialog>
</div>
