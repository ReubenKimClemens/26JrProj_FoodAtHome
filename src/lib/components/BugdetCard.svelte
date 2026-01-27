<script>
    import { TrendingDown, TrendingUp } from 'lucide-svelte';

</script>

<div data-type="under" class="budget-status">

    <div class="top-row">
        <div class="icon-wrapper">
            <TrendingDown color="#ffffff" size={30}/>
        </div>

        <div class="container">

            <div class="amount-spent">
                <div class="spent">
                    <span>$48.12</span>
                    <span>spent</span>
                </div>

                <div class="subtitle body-xsm">
                    <span class="percentage">8.7%</span>
                    <span>less than yesterday</span>
                </div>
                
            </div>

            <div class="budget-wrapper">
                <div class="budget title-lg"><span>$400</span></div>
                <span class="subtitle body-xsm">Budget</span>
            </div>

        </div>
    </div>

    <div class="progress-bar-wrapper">
        <div class="remaining-amount body-sm">
            <span>$357.82</span>
            <span>remaining</span>
        </div>

        <div class="bar-container">
            <div class="progress-bar">
                <div class="track">
                    <div class="filled"></div>
                </div>
            </div>

            <div><span class="percent body-sm">10%</span></div>
        </div>

    </div>

    <div class="set-new-budget body-md-bold-link">
        <a href="">Set new budget</a>
    </div>
</div>

<style>
    /* budget card */
    .budget-status {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 24px;
        background: var(--Color-Green-50, #E7F6F1);
        box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.05), 0px 1px 4px rgba(12, 12, 13, 0.10);
        border-radius: 8px;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        gap: 16px;
        display: inline-flex;
    }

    /* top-row style */
    .top-row {
        align-self: stretch;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;
        display: inline-flex;
    }



    /* icon style */
    .icon-wrapper {
        background: var(--bg-brand-primary);
        height: 3rem;
        width: 3rem;
        border-radius: var(--radius-full);
        box-shadow: var(--drop-shadow-for-navbar-200);

        display: flex;
        align-items: center;
        justify-content: center;

    }
    

    .subtitle , .budget, .percent {
        color: var(--text-secondary, #737780);
    }

    /* amount spent style */
    .spent {
        color: var(--text-brand-primary, #0FA376);
        font-size: 18px;
        font-family: Quicksand;
        font-weight: 700;
        text-transform: capitalize;
        line-height: 24px;
        word-wrap: break-word;
    }

    /* budget container */
    .budget-wrapper {
        flex-direction: column;
        justify-content: center;
        align-items: end;
        display: inline-flex;
    }

    /* budget style */
    .budget {
        color: var(--text-default);
    }

    /* remaining amount */
    .remaining-amount {
        color: var(--text-secondary, #737780);
    }


    /* set new budget link */
    .set-new-budget, .set-new-budget a, .set-new-budget a:visited {
        align-self: stretch;
        text-align: center;

        color: var(--text-secondary, #737780);
    }

    /* amount spent & set budget container */
    .container {
        flex: 1 1 0;
        justify-content: space-between;
        align-items: center;
        display: flex;
    }

    /* progress bar style */
    .progress-bar-wrapper {
        align-self: stretch;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        display: flex;
    }

    /* the actual bar container */
    .progress-bar {
        flex: 1 1 0;
        padding-top: 4px;
        padding-bottom: 4px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 8px;
        display: inline-flex;
    }

    /* proress bar background, the grey part */
    .track {
        align-self: stretch;
        height: 6px;
        position: relative;
        background: rgba(120, 120, 120, 0.20);
        border-radius: var(--radius-minimal);
    }

    /* progress bar green part */
    .filled {
    width: 38.38px;
    height: 6px;
    left: 0px;
    top: 0px;
    position: absolute;
    background: var(--background-default-brand-primary, #0FA376);
    border-radius: 3px;
    }

    /* container for progress bar and percent */
    .bar-container {
        align-self: stretch;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;
        display: inline-flex;
    }

    

</style>