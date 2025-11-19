<template>
  <div class="page">
    <div class="card">
      
      <!-- 进度条 -->
      <div class="progress-section">
        <div class="progress-info">
          <span class="progress-text">进度 {{ currentIndex + 1 }}/{{ total }}</span>
          <span class="progress-percent">{{ Math.round(progressPercent) }}%</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
      </div>

      <!-- 题干 -->
      <div class="question-section">
        <h2 class="question-title">第 {{ currentIndex + 1 }} 题</h2>
        <p class="question-text">{{ currentQuestion.text }}</p>
      </div>

      <!-- 选项按钮 -->
      <div class="options">
        <button
          v-for="option in currentQuestion.options"
          :key="option.value"
          class="option-btn"
          :class="{ active: answers[currentIndex] === option.value }"
          @click="selectOption(option.value)"
        >
          <span class="option-label">{{ option.label }}</span>
          <span class="option-value">{{ getOptionText(option.value) }}</span>
        </button>
      </div>

      <div class="footer">
        <button class="nav-btn back-btn" :disabled="currentIndex === 0" @click="goBack">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          上一题
        </button>

        <button
          class="nav-btn next-btn"
          :disabled="!hasAnswered"
          @click="goNext"
        >
          {{ isLast ? "查看结果" : "下一题" }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { questions } from "../data/questions";

const router = useRouter();

const currentIndex = ref(0);
const answers = ref([]);

// 当前题目
const currentQuestion = computed(() => questions[currentIndex.value]);

// 总题数
const total = questions.length;

// 是否最后一题
const isLast = computed(() => currentIndex.value === total - 1);

// 是否已作答
const hasAnswered = computed(() => answers.value[currentIndex.value] !== undefined);

// 进度条百分比
const progressPercent = computed(() => ((currentIndex.value + 1) / total) * 100);

// 获取选项文本
function getOptionText(value) {
  const texts = {
    1: "非常不同意",
    2: "不同意",
    3: "中立",
    4: "同意",
    5: "非常同意"
  };
  return texts[value] || "";
}

// 选择答案
function selectOption(value) {
  answers.value[currentIndex.value] = value;
}

// 下一题或提交
function goNext() {
  if (!hasAnswered.value) return;

  if (isLast.value) {
    router.push({
      path: "/result",
      query: { data: JSON.stringify(answers.value) },
    });
  } else {
    currentIndex.value++;
  }
}

// 上一题
function goBack() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.card {
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.5s ease;
}

.progress-section {
  margin-bottom: 30px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.progress-text {
  font-weight: 500;
}

.progress-percent {
  font-weight: 600;
  color: #42b883;
}

.progress-bar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #42b883, #347474);
  border-radius: 10px;
  transition: width 0.5s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 2s infinite;
}

.question-section {
  margin-bottom: 30px;
  text-align: center;
}

.question-title {
  font-size: 16px;
  color: #42b883;
  font-weight: 600;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.question-text {
  font-size: 20px;
  line-height: 1.6;
  color: #333;
  font-weight: 500;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.option-btn {
  padding: 18px 20px;
  border: 2px solid #f0f0f0;
  background: #fafafa;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.option-btn:hover {
  border-color: #42b883;
  background: #f8fffc;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(66, 184, 131, 0.1);
}

.option-btn.active {
  border-color: #42b883;
  background: linear-gradient(135deg, #f8fffc, #e8f5f0);
  color: #2d7a5c;
  box-shadow: 0 5px 15px rgba(66, 184, 131, 0.2);
}

.option-label {
  font-weight: 500;
  font-size: 18px;
  min-width: 40px;
  text-align: left;
}

.option-value {
  font-size: 16px;
  color: #666;
  text-align: right;
  flex: 1;
}

.option-btn.active .option-value {
  color: #2d7a5c;
  font-weight: 500;
}

.footer {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.nav-btn {
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
}

.back-btn {
  background: #f8f9fa;
  color: #666;
  border: 2px solid #e9ecef;
}

.back-btn:not(:disabled):hover {
  background: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.back-btn:disabled {
  background: #f8f9fa;
  color: #bbb;
  cursor: not-allowed;
  opacity: 0.6;
}

.next-btn {
  background: linear-gradient(135deg, #42b883, #347474);
  color: white;
  box-shadow: 0 5px 15px rgba(66, 184, 131, 0.3);
}

.next-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(66, 184, 131, 0.4);
}

.next-btn:disabled {
  background: #c8e6d4;
  cursor: not-allowed;
  box-shadow: none;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

@media (max-width: 480px) {
  .card {
    padding: 25px 20px;
  }
  
  .question-text {
    font-size: 18px;
  }
  
  .option-btn {
    padding: 15px;
    flex-direction: column;
    gap: 5px;
  }
  
  .option-label, .option-value {
    text-align: center;
  }
  
  .footer {
    flex-direction: column;
  }
}
</style>