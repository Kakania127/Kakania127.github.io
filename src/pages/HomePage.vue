<template>
  <div class="home">
    <div class="background-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <div class="card">
      <div class="icon-container">
        <div class="mbti-icon">🧠</div>
      </div>

      <h1 class="title">MBTI 性格测试</h1>
      <p class="subtitle">
        通过 36 道精心设计的题目，深入探索你的 MBTI 性格类型，了解真实的自己。
      </p>

      <div class="features">
        <div class="feature-item">
          <span class="feature-icon">📊</span>
          <span>科学评估</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">⚡</span>
          <span>快速测试</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🔍</span>
          <span>深度解析</span>
        </div>
      </div>

      <button class="start-btn" @click="startTest">
        <span>开始探索</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function startTest() {
  router.push("/questions");
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.background-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  right: -100px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -80px;
  left: -80px;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 10%;
}

.card {
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 50px 40px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  text-align: center;
  animation: fadeInUp 0.8s ease;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.icon-container {
  margin-bottom: 20px;
}

.mbti-icon {
  font-size: 60px;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #42b883, #347474);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(66, 184, 131, 0.3);
}

.title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #2c3e50, #42b883);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.features {
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
  padding: 20px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #555;
}

.feature-icon {
  font-size: 24px;
}

.start-btn {
  padding: 18px 30px;
  width: 100%;
  background: linear-gradient(135deg, #42b883, #347474);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 10px 20px rgba(66, 184, 131, 0.3);
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(66, 184, 131, 0.4);
}

.start-btn:active {
  transform: translateY(0);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .card {
    padding: 40px 25px;
  }
  
  .title {
    font-size: 28px;
  }
  
  .features {
    flex-direction: column;
    gap: 15px;
  }
}
</style>