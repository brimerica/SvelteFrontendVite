<script>
  import { onMount } from 'svelte';
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'

	let message = 'Loading...'

	onMount(() => {
    getMessage();
  })

  async function getMessage(){
    try {
      // Fetch data from your Express API
      const response = await fetch('/api/message');
      const data = await response.json();
      message = data.message;
    } catch (error) {
      console.error('Error fetching message:', error);
      message = 'Failed to load message.';
    }
  };
</script>

<main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <!-- <h1>Vite + Svelte</h1> -->
  <h1 on:click={getMessage}>{message}</h1>

  <!-- <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p> -->
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  h1{
    cursor: pointer;
  }
</style>
