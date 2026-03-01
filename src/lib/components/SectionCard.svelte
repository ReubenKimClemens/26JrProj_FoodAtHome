<script>
    let {
      title = '',
      linkText = '',
      linkHref = '#',
      content
    } = $props();
</script>

<div class="section-card">
    <div class="title">
        <div><span class="title_span">{title}</span></div>
        <a href={linkHref} class="link-box">
            <span class="link_span">{linkText}</span>
        </a>
    </div>
    <div class="content-wrapper">
        {@render content()}
    </div>
</div>

<style>
.title_span {
    color: var(--text-default, #444955);
    font-size: 20px;
    font-family: Quicksand;
    font-weight: 700;
    text-transform: capitalize;
    line-height: 24px;
    word-wrap: break-word;
}

.link_span {
    color: var(--text-on-action, white);
    font-size: 16px;
    font-family: Nunito;
    font-weight: 700;
    text-decoration: underline;
    line-height: 20px;
    word-wrap: break-word;
}

.link-box {
    padding: 8px 24px 8px 32px;
    background: var(--background-default-brand-primary, #0FA376);
    border-top-left-radius: 360px;
    border-top-right-radius: 16px;
    justify-content: center;
    align-items: center;
    display: flex;
    text-decoration: none;
}

.content-wrapper {
    align-self: stretch;
    padding: 24px 32px;
    /* margin-bottom: 24px; */
    background: var(--background-default-page-secondary, white);
    box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
    overflow: hidden;
    border-top-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 4px;
    display: flex;
}

.title {
    align-self: stretch;
    justify-content: space-between;
    align-items: center;
    display: inline-flex;
}

.section-card {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    display: inline-flex;
}
</style>