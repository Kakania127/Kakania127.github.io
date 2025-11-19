<template>
  <div class="page">
    <div class="background-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
    </div>

    <div class="card">
      <!-- 头部信息 -->
      <div class="header">
        <h2 class="title">你的 MBTI 性格类型</h2>
        <p class="subtitle">探索你的性格特质，发现更好的自己</p>
      </div>

      <!-- MBTI 类型卡片 -->
      <div class="type-card">
        <div class="type-badge">
          <span class="mbti">{{ resultType }}</span>
        </div>
        <div class="type-info">
          <h3 class="type-title">{{ resultData.title }}</h3>
          <p class="type-subtitle">{{ resultData.subtitle }}</p>
        </div>
      </div>

      <!-- 描述部分 -->
      <div class="description-section">
        <h4 class="section-title">性格概述</h4>
        <p class="description">{{ resultData.description }}</p>
        <p class="detailed-description">{{ resultData.detailedDescription }}</p>
      </div>

      <!-- 四维度得分 -->
      <div class="score-section">
        <h4 class="section-title">维度分析</h4>
        <div class="score-grid">
          <div class="score-item">
            <div class="dimension">
              <span class="dimension-name">外向 (E)</span>
              <span class="dimension-name">内向 (I)</span>
            </div>
            <div class="score-bar">
              <div 
                class="score-fill score-e" 
                :style="{ width: getDimensionWidth(scores.E, scores.I) }"
              ></div>
            </div>
            <div class="score-values">
              <span class="score-value">{{ scores.E }}</span>
              <span class="score-value">{{ scores.I }}</span>
            </div>
          </div>

          <div class="score-item">
            <div class="dimension">
              <span class="dimension-name">实感 (S)</span>
              <span class="dimension-name">直觉 (N)</span>
            </div>
            <div class="score-bar">
              <div 
                class="score-fill score-s" 
                :style="{ width: getDimensionWidth(scores.S, scores.N) }"
              ></div>
            </div>
            <div class="score-values">
              <span class="score-value">{{ scores.S }}</span>
              <span class="score-value">{{ scores.N }}</span>
            </div>
          </div>

          <div class="score-item">
            <div class="dimension">
              <span class="dimension-name">思考 (T)</span>
              <span class="dimension-name">情感 (F)</span>
            </div>
            <div class="score-bar">
              <div 
                class="score-fill score-t" 
                :style="{ width: getDimensionWidth(scores.T, scores.F) }"
              ></div>
            </div>
            <div class="score-values">
              <span class="score-value">{{ scores.T }}</span>
              <span class="score-value">{{ scores.F }}</span>
            </div>
          </div>

          <div class="score-item">
            <div class="dimension">
              <span class="dimension-name">判断 (J)</span>
              <span class="dimension-name">感知 (P)</span>
            </div>
            <div class="score-bar">
              <div 
                class="score-fill score-j" 
                :style="{ width: getDimensionWidth(scores.J, scores.P) }"
              ></div>
            </div>
            <div class="score-values">
              <span class="score-value">{{ scores.J }}</span>
              <span class="score-value">{{ scores.P }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 优势与劣势 -->
      <div class="strengths-weaknesses">
        <div class="sw-column">
          <h4 class="section-title">核心优势</h4>
          <ul class="sw-list strengths-list">
            <li v-for="(strength, index) in resultData.strengths" :key="index" class="sw-item">
              <span class="sw-icon">✅</span>
              <span class="sw-text">{{ strength }}</span>
            </li>
          </ul>
        </div>
        <div class="sw-column">
          <h4 class="section-title">发展领域</h4>
          <ul class="sw-list weaknesses-list">
            <li v-for="(weakness, index) in resultData.weaknesses" :key="index" class="sw-item">
              <span class="sw-icon">💡</span>
              <span class="sw-text">{{ weakness }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 职业建议 -->
      <div class="careers-section">
        <h4 class="section-title">适合的职业方向</h4>
        <p class="career-style">{{ resultData.workStyle }}</p>
        <div class="career-tags">
          <span v-for="(career, index) in resultData.careers" :key="index" class="career-tag">
            {{ career }}
          </span>
        </div>
      </div>

      <!-- 人际关系 -->
      <div class="relationships-section">
        <h4 class="section-title">人际关系特点</h4>
        <p class="relationships-text">{{ resultData.relationships }}</p>
      </div>

      <!-- 成长建议 -->
      <div class="growth-section">
        <h4 class="section-title">个人成长建议</h4>
        <ul class="growth-list">
          <li v-for="(advice, index) in resultData.growthAdvice" :key="index" class="growth-item">
            <span class="growth-icon">🌱</span>
            <span class="growth-text">{{ advice }}</span>
          </li>
        </ul>
      </div>

      <!-- 知名人物 -->
      <div class="famous-section" v-if="resultData.famousExamples && resultData.famousExamples.length > 0">
        <h4 class="section-title">同类型知名人物</h4>
        <div class="famous-tags">
          <span v-for="(person, index) in resultData.famousExamples" :key="index" class="famous-tag">
            {{ person }}
          </span>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="action-buttons">
        <button class="action-btn share-btn" @click="shareResult">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 8.84066C7.54305 8.32015 6.80891 8 6 8C4.34315 8 3 9.34315 3 11C3 12.6569 4.34315 14 6 14C6.80891 14 7.54305 13.6798 8.08261 13.1593L15.0227 16.6294C15.0077 16.7508 15 16.8745 15 17C15 18.6569 16.3431 20 18 20C19.6569 20 21 18.6569 21 17C21 15.3431 19.6569 14 18 14C17.1911 14 16.4569 14.3202 15.9174 14.8407L8.97733 11.3706C8.99229 11.2492 9 11.1255 9 11C9 10.8745 8.99229 10.7508 8.97733 10.6294L15.9174 7.15934C16.4569 7.67985 17.1911 8 18 8Z" fill="currentColor"/>
          </svg>
          分享结果
        </button>
        <button class="action-btn primary-btn" @click="goHome">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { questions } from "../data/questions";
import { results } from "../data/results";

const route = useRoute();
const router = useRouter();

// 拿到用户答案
const answerArr = JSON.parse(route.query.data || "[]");

// 初始化分数
const scores = {
  E: 0, I: 0,
  S: 0, N: 0,
  T: 0, F: 0,
  J: 0, P: 0
};

// 计算维度
answerArr.forEach((value, index) => {
  const q = questions[index];
  if (!q) return;

  // 针对5点量表调整评分逻辑
  if (value >= 4) { // 同意或非常同意
    scores[q.positive] += 1;
  } else if (value <= 2) { // 不同意或非常不同意
    scores[q.negative] += 1;
  }
  // 中立(3分)不计算分数
});

// 计算最终类型
const resultType = computed(() => {
  const EI = scores.E >= scores.I ? "E" : "I";
  const SN = scores.S >= scores.N ? "S" : "N";
  const TF = scores.T >= scores.F ? "T" : "F";
  const JP = scores.J >= scores.P ? "J" : "P";
  return EI + SN + TF + JP;
});

// 对应解释
const resultData = computed(() => results[resultType.value] || {
  title: "未知类型",
  subtitle: "",
  description: "无法确定您的性格类型",
  strengths: [],
  weaknesses: [],
  careers: []
});

// 计算维度宽度
function getDimensionWidth(score1, score2) {
  const total = score1 + score2;
  if (total === 0) return '50%';
  return `${(score1 / total) * 100}%`;
}

// 分享结果
function shareResult() {
  if (navigator.share) {
    navigator.share({
      title: `我的MBTI性格类型：${resultType.value} - ${resultData.value.title}`,
      text: `我在MBTI性格测试中获得了${resultType.value}类型：${resultData.value.title}。${resultData.value.description}`,
      url: window.location.href
    }).catch(err => {
      console.log('分享取消或失败:', err);
    });
  } else {
    // 备用分享方式 - 复制到剪贴板
    const shareText = `我的MBTI性格类型：${resultType.value} - ${resultData.value.title}\n${resultData.value.description}\n\n测试链接：${window.location.origin}`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert('结果已复制到剪贴板，可以粘贴分享给朋友啦！');
    }).catch(err => {
      console.log('复制失败:', err);
      alert('请手动复制页面内容进行分享');
    });
  }
}

// 返回首页
function goHome() {
  router.push("/");
}
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow-x: hidden;
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
  width: 200px;
  height: 200px;
  top: -80px;
  right: -80px;
}

.shape-2 {
  width: 150px;
  height: 150px;
  bottom: -60px;
  left: -60px;
}

.card {
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  animation: fadeInUp 0.8s ease;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 20px 0;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #2c3e50, #42b883);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #666;
  font-size: 16px;
}

.type-card {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 30px 0;
  padding: 25px;
  background: linear-gradient(135deg, #f8fffc, #e8f5f0);
  border-radius: 20px;
  border: 1px solid rgba(66, 184, 131, 0.2);
}

.type-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #42b883, #347474);
  border-radius: 50%;
  box-shadow: 0 15px 30px rgba(66, 184, 131, 0.3);
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

.mbti {
  font-size: 32px;
  font-weight: 800;
  color: white;
  letter-spacing: 2px;
}

.type-info {
  flex: 1;
}

.type-title {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.type-subtitle {
  font-size: 16px;
  color: #42b883;
  font-weight: 500;
}

.description-section {
  margin: 30px 0;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f0f0;
}

.description {
  line-height: 1.7;
  color: #555;
  font-size: 16px;
  margin-bottom: 15px;
}

.detailed-description {
  line-height: 1.6;
  color: #666;
  font-size: 15px;
  font-style: italic;
  border-left: 3px solid #42b883;
  padding-left: 15px;
}

.score-section {
  margin: 30px 0;
}

.score-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.score-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dimension {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  color: #666;
}

.score-bar {
  height: 10px;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.score-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 1s ease;
  position: relative;
}

.score-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 2s infinite;
}

.score-e {
  background: linear-gradient(90deg, #ff6b6b, #ff8e8e);
}

.score-s {
  background: linear-gradient(90deg, #4ecdc4, #88d9d3);
}

.score-t {
  background: linear-gradient(90deg, #45b7d1, #7acde1);
}

.score-j {
  background: linear-gradient(90deg, #96ceb4, #b8e0c9);
}

.score-values {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  color: #555;
}

.strengths-weaknesses {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 30px 0;
}

.sw-column {
  display: flex;
  flex-direction: column;
}

.sw-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sw-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.sw-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.strengths-list .sw-item {
  border-left: 4px solid #42b883;
}

.weaknesses-list .sw-item {
  border-left: 4px solid #ff6b6b;
}

.sw-icon {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}

.sw-text {
  font-size: 14px;
  line-height: 1.5;
  color: #555;
}

.careers-section {
  margin: 30px 0;
}

.career-style {
  line-height: 1.6;
  color: #666;
  font-size: 15px;
  margin-bottom: 15px;
  font-style: italic;
}

.career-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.career-tag {
  background: linear-gradient(135deg, #42b883, #347474);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.relationships-section {
  margin: 30px 0;
}

.relationships-text {
  line-height: 1.7;
  color: #555;
  font-size: 16px;
}

.growth-section {
  margin: 30px 0;
}

.growth-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.growth-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 15px;
  padding: 15px;
  background: linear-gradient(135deg, #fff9e6, #fff0cc);
  border-radius: 12px;
  border-left: 4px solid #ffd700;
}

.growth-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

.growth-text {
  font-size: 15px;
  line-height: 1.6;
  color: #666;
}

.famous-section {
  margin: 30px 0;
}

.famous-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.famous-tag {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-top: 40px;
}

.action-btn {
  flex: 1;
  padding: 16px 20px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid #e9ecef;
  background: white;
  color: #666;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.primary-btn {
  background: linear-gradient(135deg, #42b883, #347474);
  color: white;
  border: none;
  box-shadow: 0 5px 15px rgba(66, 184, 131, 0.3);
}

.primary-btn:hover {
  box-shadow: 0 8px 20px rgba(66, 184, 131, 0.4);
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

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 15px 30px rgba(66, 184, 131, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 20px 40px rgba(66, 184, 131, 0.4);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 15px 30px rgba(66, 184, 131, 0.3);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: 768px) {
  .card {
    padding: 25px 20px;
  }
  
  .type-card {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .type-badge {
    width: 80px;
    height: 80px;
  }
  
  .mbti {
    font-size: 28px;
  }
  
  .strengths-weaknesses {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .career-tags, .famous-tags {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 10px;
  }
  
  .card {
    padding: 20px 15px;
  }
  
  .title {
    font-size: 24px;
  }
  
  .type-title {
    font-size: 20px;
  }
  
  .section-title {
    font-size: 16px;
  }
}
</style>