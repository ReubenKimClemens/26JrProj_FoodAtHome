<script>
    let {
      title = '',
      linkText = '',      
      children
    } = $props();
</script>

<div class="sizefull-width-link">
    <div class="title">
        <div><span class="title_01_span">Title</span></div>
        <div class="link-box">
            <div class="link"><span class="link_span">Link</span></div>
            <div class="vector"></div>
        </div>
    </div>
    <div class="contentplaceholder">
        <div class="content">
            <div><span class="placeholder_span">Placeholder</span></div>
        </div>
    </div>
</div>

<style>
.title_01_span {
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

.placeholder_span {
    color: var(--text-secondary, #737780);
    font-size: 16px;
    font-family: Nunito;
    font-weight: 500;
    text-transform: capitalize;
    word-wrap: break-word;
}

.content {
    align-self: stretch;
    background: var(--background-default-page-secondary, white);
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    display: flex;
}

.link-box {
    width: 115px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 32px;
    padding-right: 24px;
    background: var(--background-default-brand-primary, #0FA376);
    border-top-left-radius: 360px;
    border-top-right-radius: 16px;
    justify-content: center;
    align-items: center;
    display: flex;
}

.contentplaceholder {
    width: 365px;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 24px;
    padding-bottom: 24px;
    background: var(--background-default-page-secondary, white);
    box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
    overflow: hidden;
    border-top-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
    display: flex;
}

.title {
    align-self: stretch;
    justify-content: space-between;
    align-items: center;
    display: inline-flex;
}

.sizefull-width-link {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    display: inline-flex;
}
</style>