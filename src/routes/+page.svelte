<script>
    import Input from '$lib/components/InputField.svelte';
    import SectionCard from '$lib/components/SectionCard.svelte';
    import ProgressBar from '$lib/components/ProgressBar.svelte';
    import Divider from '$lib/components/Divider.svelte';
</script>

<Input 
label="Label" 
placeholder="Value"
/>

<div class="page-container">
    <SectionCard 
      title="Recently Added" 
      linkText="See All" 
      linkHref="/inventory?sort=recent"
    >
      {#snippet children()}
        {#each recentItems as item}
          <div class="list-item">
            <div>
              <div class="item-title">{item.name}</div>
              <div class="item-meta">{item.category} · {item.added}</div>
            </div>
          </div>
        {/each}
      {/snippet}
    </SectionCard>
    <Divider />
    <ProgressBar value={25} max={100} />
</div>

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%;
        margin: 24px auto;
        
  }
</style>