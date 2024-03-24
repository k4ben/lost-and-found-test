<script lang="ts">
	import type { UserUnionType } from '../routes/user/[id]/+page.server';
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'June',
		'July',
		'Aug',
		'Sept',
		'Oct',
		'Nov',
		'Dec'
	];

	export let item: UserUnionType['Item'][number];
</script>

<div
	class="card w-full bg-base-100 border-2 border-base-300 group hover:bg-primary hover:text-primary-content transition-colors cursor-pointer"
>
	<div class="card-body flex flex-row gap-4">
		<div class="flex flex-col">
			<div class="flex gap-2 items-center">
				<div class="text-lg font-bold">{item.Category.Name}</div>
				{#if item.FoundItemID == null}
					<div class="badge badge-error text-error-content font-medium text-sm">Lost</div>
				{:else}
					<div class="badge badge-success text-success-content font-medium text-sm">Found</div>
				{/if}
			</div>
			<div class="flex-grow"></div>
			<div class="text-xs flex gap-1 items-center">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
					/></svg
				>
				<!-- <p>{item.Location.School.Name}</p>/ -->
				<p>{item.Location.Name}, JMU</p>
			</div>
			<div class="text-xs flex gap-1 items-center">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2q.425 0 .713.288T8 3v1h8V3q0-.425.288-.712T17 2q.425 0 .713.288T18 3v1h1q.825 0 1.413.588T21 6v4.675q0 .425-.288.713t-.712.287q-.425 0-.712-.288T19 10.676V10H5v10h5.8q.425 0 .713.288T11.8 21q0 .425-.288.713T10.8 22zm13 1q-2.075 0-3.537-1.463T13 18q0-2.075 1.463-3.537T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23m.5-5.2v-2.3q0-.2-.15-.35T18 15q-.2 0-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15q.15-.15.15-.35t-.15-.35z"
					/></svg
				>
				<p>
					{months[item.CreatedAt.getMonth()]}
					{item.CreatedAt.getDate()}, {item.CreatedAt.getFullYear()}
				</p>
			</div>
		</div>
		<div class="flex-grow"></div>
		{#if item.Image.length > 0}
			<img
				src={item.Image[0].URL}
				alt={item.Category.Name + '_Image'}
				class="w-full max-w-24 outline outline-base-200 rounded-sm group-hover:outline-accent transition-"
			/>
		{/if}
	</div>
</div>
