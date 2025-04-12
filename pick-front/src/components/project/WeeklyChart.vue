<!-- WeeklyChart.vue -->
<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Commit',
      data: [2, 4, 1, 3, 0, 2, 1],
      backgroundColor: '#FF6B81',
      stack: 'stack1',
      barThickness: 8
    },
    {
      label: 'Issue',
      data: [1, 2, 4, 2, 0, 3, 2],
      backgroundColor: '#4445B2',
      stack: 'stack1',
      barThickness: 8
    },
    {
      label: 'Pull Request',
      data: [0, 1, 2, 2, 0, 0, 3],
      backgroundColor: '#4E9CFF',
      stack: 'stack1',
      barThickness: 8
    },
    {
      label: 'Comment',
      data: [0, 1, 2, 2, 0, 0, 3],
      backgroundColor: '#DCDCE5',
      stack: 'stack1',
      barThickness: 8
    }
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 10,       // 🔹 범례 아이콘 너비 축소
        padding: 12,        // 🔹 아이템 간 간격 조절
        font: {
          size: 12          // 🔹 글자 크기 축소
        }
      },
      maxHeight: 30   
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false, // 🔥 x축 격자 없앰
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: false, // 🔥 x축 격자 없앰
      },
    },
  },
}
</script>
