'use client';

import { useState, useMemo, useEffect } from 'react';
import { Clock, Coins, TrendingUp, Info, ChevronDown, Sparkles } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';
import Link from 'next/link';

// ─── 스테이지 데이터 ───────────────────────────────────────────────────────────
// exp: LV18 기준 한판당 경험치 실측 획득량 (클리어 후 - 클리어 전), null = 미측정
// expPredicted: 1-4~2-2 선형 추세 기반 예측값
const STAGES = [

    { id: '1-1', area: 1, gold: { 0: 10 , 5: 10 , 10: 11 , 15: 11 ,  20: 12,  25: 12,  30: 13  }, exp: { 18: 0.037, 20: 0.032, 21: 0.029, 22: 0.027, 23: 0.025, 24: 0.023, 25: 0.021, 26: 0.019, 27: 0.018, 28: 0.017, 29: 0.015, 30: 0.014, 31: 0.012, 32: 0.011, 33: 0.01, 34: 0.009, 35: 0.008, 36: 0.007, 37: 0.006, 38: 0.006, 39: 0.005 }, expPredicted: { 18: false, 20: false, 21: false, 22: false, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '1-2', area: 1, gold: { 0: 30 , 5: 31 , 10: 33 , 15: 34 ,  20: 36,  25: 37,  30: 39  }, exp: { 18: 0.136, 20: 0.114, 21: 0.106, 22: 0.097, 23: 0.09, 24: 0.083, 25: 0.076, 26: 0.07, 27: 0.063, 28: 0.058, 29: 0.053, 30: 0.049, 31: 0.042, 32: 0.038, 33: 0.034, 34: 0.031, 35: 0.028, 36: 0.025, 37: 0.023, 38: 0.02, 39: 0.018 }, expPredicted: { 18: false, 20: false, 21: false, 22: false, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '1-3', area: 1, gold: { 0: 50 , 5: 52 , 10: 55 , 15: 57 ,  20: 60,  25: 62,  30: 65  }, exp: { 18: 0.339, 20: 0.287, 21: 0.264, 22: 0.243, 23: 0.223, 24: 0.206, 25: 0.189, 26: 0.174, 27: 0.159, 28: 0.146, 29: 0.134, 30: 0.123, 31: 0.105, 32: 0.095, 33: 0.085, 34: 0.077, 35: 0.07, 36: 0.063, 37: 0.057, 38: 0.051, 39: 0.046 }, expPredicted: { 18: false, 20: false, 21: false, 22: false, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '1-4', area: 1, gold: { 0: 70 , 5: 73 , 10: 77 , 15: 80 ,  20: 84,  25: 87,  30: 91  }, exp: { 18: 0.408, 20: 0.344, 21: 0.316, 22: 0.292, 23: 0.267, 24: 0.246, 25: 0.226, 26: 0.208, 27: 0.191, 28: 0.175, 29: 0.161, 30: 0.148, 31: 0.126, 32: 0.114, 33: 0.103, 34: 0.092, 35: 0.083, 36: 0.075, 37: 0.068, 38: 0.061, 39: 0.055 }, expPredicted: { 18: false, 20: false, 21: false, 22: false, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '1-5', area: 1, gold: { 0: 90 , 5: 94 , 10: 99 , 15: 103,  20: 108, 25: 112, 30: 117 }, exp: { 18: 0.475, 20: 0.401, 21: 0.369, 22: 0.34, 23: 0.312, 24: 0.287, 25: 0.264, 26: 0.243, 27: 0.222, 28: 0.204, 29: 0.187, 30: 0.171, 31: 0.147, 32: 0.133, 33: 0.12, 34: 0.108, 35: 0.097, 36: 0.088, 37: 0.079, 38: 0.071, 39: 0.064 }, expPredicted: { 18: false, 20: false, 21: false, 22: false, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '1-6', area: 1, gold: { 0: 110, 5: 115, 10: 121, 15: 126, 20: 132, 25: 137, 30: 143 }, exp: { 18: 0.6, 20: 0.573, 21: 0.528, 22: 0.486, 23: 0.447, 24: 0.411, 25: 0.378, 26: 0.348, 27: 0.317, 28: 0.291, 29: 0.267, 30: 0.245, 31: 0.21, 32: 0.189, 33: 0.171, 34: 0.154, 35: 0.139, 36: 0.125, 37: 0.113, 38: 0.102, 39: 0.092 }, expPredicted: { 18: false, 20: false, 21: false, 22: false, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '1-7', area: 1, gold: { 0: 130, 5: 136, 10: 143, 15: 149, 20: 156, 25: 162, 30: 169 }, exp: { 18: 0.747, 20: 0.631, 21: 0.58, 22: 0.535, 23: 0.491, 24: 0.452, 25: 0.416, 26: 0.382, 27: 0.349, 28: 0.32, 29: 0.294, 30: 0.27, 31: 0.231, 32: 0.208, 33: 0.188, 34: 0.17, 35: 0.153, 36: 0.138, 37: 0.124, 38: 0.112, 39: 0.101 }, expPredicted: { 18: false, 20: false, 21: false, 22: false, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '1-8', area: 1, gold: { 0: 150, 5: 157, 10: 165, 15: 172, 20: 180, 25: 187, 30: 195 }, exp: { 18: 0.951, 20: 0.802, 21: 0.739, 22: 0.681, 23: 0.625, 24: 0.575, 25: 0.529, 26: 0.487, 27: 0.444, 28: 0.407, 29: 0.374, 30: 0.343, 31: 0.294, 32: 0.265, 33: 0.239, 34: 0.216, 35: 0.195, 36: 0.176, 37: 0.158, 38: 0.143, 39: 0.129 }, expPredicted: { 18: false, 20: false, 21: false, 22: false, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '1-9', area: 1, gold: { 0: 170, 5: 178, 10: 187, 15: 195, 20: 204, 25: 212, 30: 221 }, exp: { 18: 1.087, 20: 0.917, 21: 0.844, 22: 0.778, 23: 0.714, 24: 0.657, 25: 0.605, 26: 0.556, 27: 0.508, 28: 0.466, 29: 0.428, 30: 0.392, 31: 0.336, 32: 0.303, 33: 0.273, 34: 0.247, 35: 0.222, 36: 0.201, 37: 0.181, 38: 0.163, 39: 0.147 }, expPredicted: { 18: false, 20: false, 21: false, 22: false, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '2-1', area: 2, gold: { 0: 400, 5: 420, 10: 440, 15: 459, 20: 480, 25: 500, 30: 520 }, exp: { 18: 1.155, 20: 0.974, 21: 0.897, 22: 0.827, 23: 0.761, 24: 0.698, 25: 0.643, 26: 0.591, 27: 0.54, 28: 0.495, 29: 0.455, 30: 0.417, 31: 0.357, 32: 0.322, 33: 0.29, 34: 0.262, 35: 0.236, 36: 0.213, 37: 0.192, 38: 0.173, 39: 0.156 }, expPredicted: { 18: false, 20: false, 21: false, 22: false, 23: false, 24: true, 25: true, 26: true, 27: false, 28: true, 29: true, 30: true, 31: false, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '2-2', area: 2, gold: { 0: 430, 5: 451, 10: 473, 15: 494, 20: 516, 25: 537, 30: 559 }, exp: { 18: 1.359, 20: 1.146, 21: 1.055, 22: 0.973, 23: 0.896, 24: 0.822, 25: 0.756, 26: 0.695, 27: 0.635, 28: 0.583, 29: 0.535, 30: 0.49, 31: 0.42, 32: 0.379, 33: 0.342, 34: 0.308, 35: 0.278, 36: 0.251, 37: 0.226, 38: 0.204, 39: 0.184 }, expPredicted: { 18: false, 20: false, 21: false, 22: false, 23: false, 24: true, 25: true, 26: true, 27: false, 28: true, 29: true, 30: true, 31: false, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '2-3', area: 2, gold: { 0: 460, 5: 483, 10: 506, 15: 529, 20: 552, 25: 575, 30: 598 }, exp: { 18: 1.426, 20: 1.203, 21: 1.107, 22: 1.021, 23: 0.941, 24: 0.862, 25: 0.793, 26: 0.73, 27: 0.666, 28: 0.611, 29: 0.561, 30: 0.514, 31: 0.442, 32: 0.399, 33: 0.36, 34: 0.324, 35: 0.293, 36: 0.264, 37: 0.238, 38: 0.215, 39: 0.194 }, expPredicted: { 18: true, 20: false, 21: false, 22: false, 23: false, 24: true, 25: true, 26: true, 27: false, 28: true, 29: true, 30: true, 31: false, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '2-4', area: 2, gold: { 0: 490, 5: 514, 10: 539, 15: 563, 20: 588, 25: 612, 30: 637 }, exp: { 18: 1.634, 20: 1.379, 21: 1.268, 22: 1.167, 23: 1.075, 24: 0.987, 25: 0.908, 26: 0.836, 27: 0.762, 28: 0.699, 29: 0.641, 30: 0.589, 31: 0.504, 32: 0.455, 33: 0.41, 34: 0.37, 35: 0.334, 36: 0.301, 37: 0.271, 38: 0.245, 39: 0.221 }, expPredicted: { 18: true, 20: true, 21: true, 22: false, 23: false, 24: true, 25: true, 26: true, 27: false, 28: true, 29: true, 30: true, 31: false, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '2-5', area: 2, gold: { 0: 520, 5: 546, 10: 572, 15: 598, 20: 624, 25: 650, 30: 676 }, exp: { 18: 1.697, 20: 1.431, 21: 1.318, 22: 1.215, 23: 1.12, 24: 1.033, 25: 0.952, 26: 0.878, 27: 0.793, 28: 0.728, 29: 0.668, 30: 0.612, 31: 0.525, 32: 0.474, 33: 0.427, 34: 0.385, 35: 0.348, 36: 0.313, 37: 0.283, 38: 0.255, 39: 0.23 }, expPredicted: { 18: true, 20: true, 21: true, 22: false, 23: false, 24: true, 25: true, 26: true, 27: false, 28: true, 29: true, 30: true, 31: false, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '2-6', area: 2, gold: { 0: 550, 5: 577, 10: 605, 15: 632, 20: 660, 25: 687, 30: 715 }, exp: { 18: 1.901, 20: 1.603, 21: 1.476, 22: 1.361, 23: 1.255, 24: 1.157, 25: 1.067, 26: 0.984, 27: 0.888, 28: 0.815, 29: 0.748, 30: 0.686, 31: 0.588, 32: 0.53, 33: 0.478, 34: 0.432, 35: 0.389, 36: 0.351, 37: 0.317, 38: 0.286, 39: 0.258 }, expPredicted: { 18: true, 20: true, 21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: false, 28: true, 29: true, 30: true, 31: false, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '2-7', area: 2, gold: { 0: 580, 5: 609, 10: 638, 15: 667, 20: 696, 25: 725, 30: 754 }, exp: { 18: 1.968, 20: 1.66, 21: 1.528, 22: 1.409, 23: 1.299, 24: 1.198, 25: 1.104, 26: 1.018, 27: 0.92, 28: 0.844, 29: 0.774, 30: 0.711, 31: 0.609, 32: 0.549, 33: 0.495, 34: 0.447, 35: 0.403, 36: 0.364, 37: 0.328, 38: 0.296, 39: 0.267 }, expPredicted: { 18: true, 20: true, 21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: false, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '2-8', area: 2, gold: { 0: 610, 5: 640, 10: 671, 15: 701, 20: 732, 25: 762, 30: 793 }, exp: { 18: 2.172, 20: 1.832, 21: 1.687, 22: 1.555, 23: 1.434, 24: 1.322, 25: 1.219, 26: 1.124, 27: 1.015, 28: 0.931, 29: 0.854, 30: 0.784, 31: 0.651, 32: 0.587, 33: 0.53, 34: 0.478, 35: 0.431, 36: 0.389, 37: 0.351, 38: 0.316, 39: 0.285 }, expPredicted: { 18: true, 20: true, 21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: false, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '2-9', area: 2, gold: { 0: 640, 5: 672, 10: 704, 15: 736, 20: 768, 25: 800, 30: 832 }, exp: { 18: 2.239, 20: 1.888, 21: 1.739, 22: 1.603, 23: 1.478, 24: 1.363, 25: 1.256, 26: 1.158, 27: 1.046, 28: 0.96, 29: 0.881, 30: 0.808, 31: 0.693, 32: 0.625, 33: 0.564, 34: 0.509, 35: 0.459, 36: 0.414, 37: 0.373, 38: 0.337, 39: 0.304 }, expPredicted: { 18: true, 20: true, 21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: false, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '3-1', area: 3, gold: { 0: 700, 5: 735, 10: 770, 15: 804, 20: 840, 25: 875, 30: 910 }, exp: { 18: 2.443, 20: 2.06, 21: 1.897, 22: 1.749, 23: 1.613, 24: 1.487, 25: 1.371, 26: 1.264, 27: 1.142, 28: 1.048, 29: 0.961, 30: 0.882, 31: 0.714, 32: 0.644, 33: 0.581, 34: 0.524, 35: 0.473, 36: 0.426, 37: 0.385, 38: 0.347, 39: 0.313 }, expPredicted: { 18: true, 20: true, 21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: false, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '3-2', area: 3, gold: { 0: 750, 5: 787, 10: 825, 15: 862, 20: 900, 25: 937, 30: 975 }, exp: { 18: 2.51, 20: 2.117, 21: 1.949, 22: 1.797, 23: 1.657, 24: 1.528, 25: 1.408, 26: 1.299, 27: 1.173, 28: 1.076, 29: 0.987, 30: 0.906, 31: 0.777, 32: 0.701, 33: 0.632, 34: 0.57, 35: 0.514, 36: 0.464, 37: 0.418, 38: 0.377, 39: 0.34 }, expPredicted: { 18: true, 20: true, 21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '3-3', area: 3, gold: { 0: 800, 5: 840, 10: 880, 15: 919, 20: 960, 25: 1000, 30: 1040 }, exp: { 18: 2.715, 20: 2.29, 21: 2.108, 22: 1.943, 23: 1.791, 24: 1.651, 25: 1.522, 26: 1.403, 27: 1.268, 28: 1.163, 29: 1.067, 30: 0.979, 31: 0.839, 32: 0.757, 33: 0.683, 34: 0.616, 35: 0.555, 36: 0.501, 37: 0.452, 38: 0.408, 39: 0.368 }, expPredicted: { 18: true, 20: true, 21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '3-4', area: 3, gold: { 0: 850, 5: 892, 10: 935, 15: 977, 20: 1020, 25: 1062, 30: 1105 }, exp: { 18: 2.783, 20: 2.348, 21: 2.161, 22: 1.991, 23: 1.836, 24: 1.692, 25: 1.56, 26: 1.438, 27: 1.299, 28: 1.192, 29: 1.094, 30: 1.003, 31: 0.86, 32: 0.776, 33: 0.7, 34: 0.631, 35: 0.569, 36: 0.513, 37: 0.463, 38: 0.418, 39: 0.377 }, expPredicted: { 18: true, 20: true, 21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '3-5', area: 3, gold: { 0: 900, 5: 945, 10: 990, 15: 1035, 20: 1080, 25: 1125, 30: 1170 }, exp: { 18: 2.985, 20: 2.518, 21: 2.317, 22: 2.137, 23: 1.97, 24: 1.816, 25: 1.674, 26: 1.543, 27: 1.395, 28: 1.279, 29: 1.174, 30: 1.077, 31: 0.923, 32: 0.833, 33: 0.751, 34: 0.677, 35: 0.611, 36: 0.551, 37: 0.497, 38: 0.448, 39: 0.404 }, expPredicted: { 18: true, 20: true, 21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '3-6', area: 3, gold: { 0: 950, 5: 997, 10: 1045, 15: 1092, 20: 1140, 25: 1187, 30: 1235 }, exp: { 18: 3.053, 20: 2.575, 21: 2.37, 22: 2.185, 23: 2.015, 24: 1.858, 25: 1.713, 26: 1.579, 27: 1.426, 28: 1.308, 29: 1.2, 30: 1.101, 31: 0.944, 32: 0.851, 33: 0.768, 34: 0.693, 35: 0.625, 36: 0.564, 37: 0.508, 38: 0.459, 39: 0.414 }, expPredicted: { 18: true, 20: true, 21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '3-7', area: 3, gold: { 0: 1000, 5: 1050, 10: 1100, 15: 1150, 20: 1200, 25: 1250, 30: 1300 }, exp: { 18: 3.255, 20: 2.745, 21: 2.527, 22: 2.331, 23: 2.149, 24: 1.981, 25: 1.827, 26: 1.684, 27: 1.521, 28: 1.395, 29: 1.28, 30: 1.174, 31: 1.007, 32: 0.908, 33: 0.819, 34: 0.739, 35: 0.667, 36: 0.601, 37: 0.542, 38: 0.489, 39: 0.441 }, expPredicted: { 18: true, 20: true, 21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '3-8', area: 3, gold: { 0: 1050, 5: 1102, 10: 1155, 15: 1207, 20: 1260, 25: 1312, 30: 1365 }, exp: { 18: 3.323, 20: 2.803, 21: 2.58, 22: 2.379, 23: 2.194, 24: 2.022, 25: 1.864, 26: 1.718, 27: 1.552, 28: 1.424, 29: 1.307, 30: 1.199, 31: 1.027, 32: 0.926, 33: 0.836, 34: 0.754, 35: 0.68, 36: 0.613, 37: 0.553, 38: 0.499, 39: 0.45 }, expPredicted: { 18: true, 20: true, 21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },
    { id: '3-9', area: 3, gold: { 0: 1100, 5: 1155, 10: 1210, 15: 1265, 20: 1320, 25: 1375, 30: 1430 }, exp: { 18: 3.527, 20: 2.975, 21: 2.738, 22: 2.525, 23: 2.328, 24: 2.146, 25: 1.979, 26: 1.824, 27: 1.647, 28: 1.511, 29: 1.387, 30: 1.273, 31: 1.09, 32: 0.983, 33: 0.887, 34: 0.8, 35: 0.722, 36: 0.651, 37: 0.587, 38: 0.53, 39: 0.478 }, expPredicted: { 18: true, 20: true, 21: true, 22: true, 23: true, 24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true, 32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true } },

];

const BONUS_OPTIONS = [
    { label: '기본 (0%)', value: 0 },
    { label: '+5%',       value: 5 },
    { label: '+10%',      value: 10 },
    { label: '+15%',      value: 15 },
    { label: '+20%',      value: 20 },
    { label: '+25%',      value: 25 },
    { label: '+30% 최대', value: 30 },
];

const AREA_COLORS: Record<number, { border: string; bg: string; badge: string; label: string; dot: string }> = {
    1: { border: 'border-sky-700/40',    bg: 'bg-sky-900/20',    badge: 'bg-sky-900/60 text-sky-300 border-sky-700/50',         label: '1지역', dot: 'bg-sky-400'    },
    2: { border: 'border-violet-700/40', bg: 'bg-violet-900/20', badge: 'bg-violet-900/60 text-violet-300 border-violet-700/50', label: '2지역', dot: 'bg-violet-400' },
    3: { border: 'border-amber-700/40',  bg: 'bg-amber-900/20',  badge: 'bg-amber-900/60 text-amber-300 border-amber-700/50',   label: '3지역', dot: 'bg-amber-400'  },
};

function fmtTime(sec: number) {
    if (sec >= 60) {
        const m = Math.floor(sec / 60);
        const s = Math.round(sec % 60);
        return s === 0 ? `${m}분` : `${m}분 ${s}초`;
    }
    return `${Math.round(sec * 10) / 10}초`;
}

export default function UltimaSquadCalculator() {
    const [charLevel, setCharLevel] = useState<18 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39>(18);
    const [bonus, setBonus]         = useState<number>(0);
    const [refId, setRefId]         = useState<string>('1-5');
    const [refMin, setRefMin]       = useState<string>('');
    const [refSecInp, setRefSecInp] = useState<string>('');
    const [isCalculated, setIsCalculated] = useState<boolean>(false);

    useEffect(() => {
        setIsCalculated(false);
    }, [charLevel, bonus, refId, refMin, refSecInp]);

    const refStage  = STAGES.find(s => s.id === refId)!;
    const refGold   = refStage.gold[bonus as keyof typeof refStage.gold];
    const refExp    = refStage.exp[charLevel]; // 실측 or 예측 경험치 %
    
    const m = refMin ? parseInt(refMin) || 0 : 0;
    const s = refSecInp ? parseFloat(refSecInp) || 0 : 0;
    const refSec = (refMin || refSecInp) ? (m * 60 + s) : null;

    const refGPH = refSec && refSec > 0 ? (refGold * 60) / (refSec / 3600) : null;
    const refEPH = refSec && refSec > 0 && refExp ? refExp / (refSec / 3600) : null;
    const refMPM = refSec && refSec > 0 ? 3600 / refSec : null;

    const results = useMemo(() => {
        return STAGES.map(stage => {
            const g = stage.gold[bonus as keyof typeof stage.gold];
            const breakevenGold = refSec && refSec > 0 ? refSec * (g / refGold) : null;
            const expVal = stage.exp[charLevel];
            const breakevenExp  = refSec && refSec > 0 && refExp && expVal
                ? refSec * (expVal / refExp)
                : null;
            return { ...stage, goldPerKill: g, breakevenGold, breakevenExp, currentExp: expVal, currentExpPredicted: stage.expPredicted[charLevel] };
        });
    }, [charLevel, bonus, refGold, refExp, refSec]);

    return (
        <div className="space-y-6">

            
            {/* ─── 0. 캐릭터 레벨 ─────────────────────────────── */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                <h2 className="font-bold text-slate-100 text-sm mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    캐릭터 레벨
                </h2>
                <div className="flex flex-wrap gap-2">
                    {[18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39].map(lvl => (
                        <button
                            key={lvl}
                            onClick={() => setCharLevel(lvl as 18 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39)}
                            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border transition-all ${
                                charLevel === lvl
                                    ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300 shadow-md'
                                    : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                            }`}
                        >
                            LV.{lvl}
                        </button>
                    ))}
                </div>
                <div className="mt-3 text-xs text-slate-400 space-y-1.5">
                    <p>※ 앞으로 직접 측정한 레벨별 실측 데이터가 계속 추가될 예정입니다.</p>
                    <p className="text-emerald-300/90 font-semibold bg-emerald-500/10 inline-block px-2 py-1 rounded">
                        ※ 20레벨 이후부터는 레벨이 올라도 스테이지 간 상대적인 사냥 효율이 거의 동일하므로, 본인과 가장 가까운 레벨을 선택해 주시면 됩니다.
                    </p>
                </div>
            </div>

            {/* ─── ① 골드 보너스 ─────────────────────────────── */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                <h2 className="font-bold text-slate-100 text-sm mb-3 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-yellow-400" />
                    골드 보너스
                </h2>
                <div className="flex flex-wrap gap-2">
                    {BONUS_OPTIONS.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => setBonus(opt.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border transition-all ${
                                bonus === opt.value
                                    ? 'bg-yellow-500/20 border-yellow-400/60 text-yellow-300 shadow-md'
                                    : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── ② 기준 스테이지 + 타임 입력 ──────────────── */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                <h2 className="font-bold text-slate-100 text-sm mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-400" />
                    기준 스테이지 설정
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <select
                            value={refId}
                            onChange={e => setRefId(e.target.value)}
                            className="w-full appearance-none bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/30 transition-all pr-8"
                        >
                            {STAGES.map(s => (
                                <option key={s.id} value={s.id}>
                                    스테이지 {s.id} — 1마리당 {s.gold[bonus as keyof typeof s.gold]}G{s.exp[charLevel] !== null ? ` · 경험치 ${s.expPredicted[charLevel] ? '~' : ''}${s.exp[charLevel].toFixed(3)}%` : ''}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-64">
                        <div className="flex items-center gap-2 w-full">
                            <input
                                type="number"
                                min="0"
                                placeholder="분"
                                value={refMin}
                                onChange={e => setRefMin(e.target.value)}
                                className="w-full bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/30 transition-all"
                            />
                            <span className="text-sm text-slate-400 shrink-0">분</span>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <input
                                type="number"
                                min="0"
                                placeholder="초"
                                value={refSecInp}
                                onChange={e => setRefSecInp(e.target.value)}
                                className="w-full bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/30 transition-all"
                            />
                            <span className="text-sm text-slate-400 shrink-0">초</span>
                        </div>
                    </div>
                </div>

                {/* 계산하기 버튼 */}
                <div className="pt-2">
                    <button
                        onClick={() => setIsCalculated(true)}
                        disabled={!refSec || refSec <= 0}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-base sm:text-lg py-3.5 rounded-xl transition-colors shadow-lg active:scale-[0.98]"
                    >
                        계산하기
                    </button>
                </div>
            </div>

            {isCalculated && refSec && refSec > 0 && (
                <>
                    <div className="my-6">
                        <InArticleAd />
                    </div>

                    {/* 기준 효율 표시 */}
                    <div className="mt-3 p-3 bg-sky-950/40 border border-sky-700/40 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                            <TrendingUp className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                            <span>골드/시간</span>
                            <span className="text-yellow-300 font-black ml-auto">
                                {refGPH! >= 1_000_000
                                    ? (refGPH! / 1_000_000).toFixed(2) + 'M'
                                    : Math.round(refGPH!).toLocaleString()}G
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>경험치/시간</span>
                            <span className="text-emerald-300 font-black ml-auto">
                                {refEPH ? refEPH.toFixed(2) + '%' : <span className="text-slate-600">미측정</span>}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                            <Clock className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                            <span>분당 처치 수</span>
                            <span className="text-violet-300 font-black ml-auto">
                                {refMPM!.toFixed(1)}마리
                            </span>
                        </div>
                    </div>

                    <p className="mt-2 mb-6 text-xs text-slate-400">
                        ※ 마지막에 나오는 보스가 주는 메소는 포함하지 않았기 때문에 더 많은 골드를 획득할 수 있습니다.
                    </p>
            {/* ─── ③ 결과 테이블 ──────────────────────────────── */}
                <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                    <h2 className="font-bold text-slate-100 text-sm mb-1 flex items-center gap-2">
                        <Info className="w-4 h-4 text-slate-400" />
                        동일 효율 달성 필요 클리어 타임
                    </h2>
                    <p className="text-xs text-slate-500 mb-4">
                        각 스테이지를 아래 시간 이내에 클리어하면
                        <span className="text-sky-400 font-semibold mx-1">스테이지 {refId} ({refSec}초)</span>
                        보다 효율이 높습니다. 경험치는 선택한 레벨 기준 실측(또는 예측)값입니다.
                    </p>

                    <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[640px]">
                            <thead>
                                <tr className="bg-slate-800/80 border-b border-slate-700 text-slate-300">
                                    <th className="p-2.5 border border-slate-700 font-bold">스테이지</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-slate-400">지역</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-yellow-300 text-right">1마리당 골드</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-yellow-200 text-right">골드 기준 타임</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-emerald-300 text-right">한판당 경험치</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-emerald-200 text-right">경험치 기준 타임</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-yellow-100 text-right">필요 분당 처치<br/><span className="text-[10px] font-normal text-yellow-300/70">(골드 기준)</span></th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-emerald-100 text-right">필요 분당 처치<br/><span className="text-[10px] font-normal text-emerald-300/70">(경험치 기준)</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((r, idx) => {
                                    const isRef = r.id === refId;
                                    const areaCol = AREA_COLORS[r.area];
                                    return (
                                        <tr
                                            key={r.id}
                                            className={`border-b border-slate-800 transition-colors ${
                                                isRef
                                                    ? 'bg-sky-950/40'
                                                    : idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/40'
                                            }`}
                                        >
                                            {/* 스테이지 */}
                                            <td className="p-2.5 border border-slate-700 font-bold text-white">
                                                {r.id}
                                                {isRef && (
                                                    <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-sky-800/60 text-sky-300 rounded border border-sky-700/50 font-semibold">기준</span>
                                                )}
                                            </td>
                                            {/* 지역 */}
                                            <td className="p-2.5 border border-slate-700">
                                                <span className={`text-xs px-1.5 py-0.5 rounded border font-semibold ${areaCol.badge}`}>
                                                    {areaCol.label}
                                                </span>
                                            </td>
                                            {/* 1마리당 골드 */}
                                            <td className="p-2.5 border border-slate-700 text-right text-yellow-300 font-semibold">
                                                {r.goldPerKill}G
                                            </td>
                                            {/* 골드 기준 타임 */}
                                            <td className="p-2.5 border border-slate-700 text-right font-bold">
                                                {isRef ? (
                                                    <span className="text-sky-300">{fmtTime(refSec!)} (기준)</span>
                                                ) : r.breakevenGold !== null ? (
                                                    <span className={r.breakevenGold > refSec ? 'text-yellow-300' : 'text-rose-400'}>
                                                        {fmtTime(r.breakevenGold)} 이내
                                                    </span>
                                                ) : '-'}
                                            </td>
                                            {/* 한판당 경험치 */}
                                            <td className="p-2.5 border border-slate-700 text-right font-semibold">
                                                {r.currentExp !== null ? (
                                                    r.currentExpPredicted ? (
                                                        <span className="text-slate-400">
                                                            ~{r.currentExp.toFixed(3)}%
                                                            <span className="text-slate-600 text-[10px] ml-1">예측</span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-emerald-300">
                                                            {r.currentExp.toFixed(3)}%
                                                            <span className="text-slate-500 text-[10px] ml-1">LV{charLevel}</span>
                                                        </span>
                                                    )
                                                ) : <span className="text-slate-600 text-xs">미측정</span>}
                                            </td>
                                            {/* 경험치 기준 타임 */}
                                            <td className="p-2.5 border border-slate-700 text-right font-bold">
                                                {isRef ? (
                                                    <span className="text-sky-300">{fmtTime(refSec!)} (기준)</span>
                                                ) : r.breakevenExp !== null ? (
                                                    <span className={r.breakevenExp > refSec ? 'text-emerald-300' : 'text-rose-400'}>
                                                        {fmtTime(r.breakevenExp)} 이내
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-600 text-xs">미측정</span>
                                                )}
                                            </td>
                                            {/* 분당 처치 수 (골드) */}
                                            <td className="p-2.5 border border-slate-700 text-right font-bold text-yellow-100">
                                                {isRef
                                                    ? <span className="text-sky-300">{`${(3600 / refSec).toFixed(1)}마리`}</span>
                                                    : r.breakevenGold !== null
                                                        ? `${(3600 / r.breakevenGold).toFixed(1)}마리`
                                                        : '-'}
                                            </td>
                                            {/* 분당 처치 수 (경험치) */}
                                            <td className="p-2.5 border border-slate-700 text-right font-bold text-emerald-100">
                                                {isRef
                                                    ? <span className="text-sky-300">{`${(3600 / refSec).toFixed(1)}마리`}</span>
                                                    : r.breakevenExp !== null
                                                        ? `${(3600 / r.breakevenExp).toFixed(1)}마리`
                                                        : (
                                                            <span className="text-slate-600 text-xs">미측정</span>
                                                        )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* 범례 */}
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 inline-block" />
                            골드: 기준보다 여유 (달성 쉬움)
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 inline-block" />
                            경험치: 기준보다 여유 (달성 쉬움)
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                            기준보다 빠르게 클리어해야 함
                        </span>
                    </div>
                </div>

                {/* 공략글로 돌아가기 버튼 */}
                <div className="mt-8 mb-4">
                    <Link 
                        href="/blog/ultima-squad-minigame-guide"
                        prefetch={false}
                        className="flex items-center justify-center gap-2 w-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 hover:border-orange-500/50 text-slate-200 hover:text-white font-bold py-4 rounded-xl transition-all shadow-md group"
                    >
                        <span>울티마 스쿼드 완벽 공략글로 돌아가기</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
                </>
            )}
        </div>
    );
}
