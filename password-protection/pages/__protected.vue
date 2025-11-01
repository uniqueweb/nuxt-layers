<template>
  <div class="auth-container">
    <div class="auth-card-wrapper">
      <div class="auth-card">
        <div class="top-section">
          <div class="logo-container">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.5704 17.3298L25.114 42.2778C22.7137 46.42 18.2779 48.9717 13.4776 48.9717C3.13377 48.9717 -3.33105 37.8144 1.84107 28.8887L11.3597 12.462C12.2324 10.956 13.8451 10.0283 15.5904 10.0283H15.5927C19.3534 10.0283 21.7038 14.0848 19.8233 17.3298L10.3036 33.758C8.89266 36.1928 10.6562 39.2365 13.4779 39.2365C14.7874 39.2365 15.9974 38.5404 16.6522 37.4104L31.1092 12.462C31.9819 10.956 33.5946 10.0283 35.3398 10.0283C39.1004 10.0283 41.4509 14.0847 39.5704 17.3298Z" fill="black"/>
              <path d="M59.3175 17.3298L42.3923 46.538C41.5197 48.044 39.907 48.9717 38.1617 48.9717C34.401 48.9717 32.0507 44.9152 33.9311 41.6702L50.8563 12.462C51.7289 10.956 53.3416 10.0283 55.0869 10.0283C58.8475 10.0283 61.1979 14.0847 59.3175 17.3298Z" fill="black"/>
            </svg>
          </div>

          <h1 class="title">Password Required</h1>

          <p class="description">
            This website is password protected. Please enter the password to view it.
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="bottom-section">
          <label for="password" class="label">PASSWORD</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="input-field"
            :class="{ 'input-error': error }"
            placeholder=""
            @input="error = ''"
          />

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <button
            class="login-button"
            type="submit">
            Get access
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const password = ref<string>('')
const error = ref<string>('')

const handleSubmit = async () => {
  error.value = ''

  try {
    const response = await $fetch('/api/__protected/verify', {
      method: 'POST',
      body: {
        password: password.value,
      },
    })

    if (response.success) {
      await navigateTo('/')
    }
  } catch (err: any) {
    error.value = err.data?.message || 'Invalid password. Please try again.'
    password.value = ''
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  position: relative;
}

.auth-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.10) 1px, transparent 1px);
  background-size: 10px 10px, 10px 10px, 100px 100px, 100px 100px;
  pointer-events: none;
}

.auth-card-wrapper {
  padding: 20px;
}

.auth-card {
  background: white;
  border-radius: 16px;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  text-align: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.top-section {
  padding: 48px 40px 32px 40px;
  background: white;
}

.bottom-section {
  padding: 24px 40px 48px 40px;
  background: #f8f8f8;
  text-align: left;
  border-radius: 0 0 16px 16px;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  color: #000;
}

.title {
  font-size: 28px;
  font-weight: 600;
  color: #000;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
}

.description {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin: 0;
  padding: 0 10px;
}

.label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.input-field {
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
  font-family: inherit;
  background: white;
}

.input-field:hover {
  border-color: #c0c0c0;
}

.input-field:focus {
  border-color: #000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.input-error {
  border-color: #ef4444 !important;
}

.input-error:focus {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

.error-message {
  color: #ef4444;
  font-size: 13px;
  margin-top: 8px;
  font-weight: 500;
}

.login-button {
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  font-weight: 600;
  color: white;
  background: #000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;
  transition: all 0.2s ease;
  font-family: inherit;
}

.login-button:hover {
  background: #1a1a1a;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.login-button:active {
  transform: translateY(0);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .top-section {
    padding: 36px 28px 28px 28px;
  }

  .bottom-section {
    padding: 20px 28px 36px 28px;
  }

  .title {
    font-size: 24px;
  }

  .description {
    font-size: 14px;
  }
}
</style>
