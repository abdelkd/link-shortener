<script lang="ts">
  import {generateShortUrl, getOriginalUrl} from '../Api'

  let url: string;
  let failedRequest: boolean;
  let requestBody;

  let BASE_URI = window.location.href.split('/')[2];
  let API_URI = import.meta.env.VITE_API_URI;

  // Detect BaseURI
  (async()=>{if(window.location.href.split('/')[3].length >= 1) {
    let shortCode = window.location.href.split('/')[3];
    let res = await getOriginalUrl(shortCode, API_URI);

    if(res.ok === false) return window.location.href = '/'
    else return window.location.href = BASE_URI;

  }})()

  $: generate = async() => {
    let apiRes = await generateShortUrl(url, API_URI);
    if(apiRes === false) return failedRequest = true;
    else requestBody = apiRes;
  }
</script>

<section>
    {#if failedRequest}
      <p class="error">Something wrong happened.</p>
    {/if}

    {#if requestBody}
      <p class="short-url">{BASE_URI}/{requestBody.shortCode}</p>
    {/if}

    <div>
      <input class="url-form" type="text" placeholder="Insert the URL here" bind:value={url}/>
      <input class="shorten-btn" type="button" value="SHORTEN" on:click={generate}/>
    </div>
  </section>