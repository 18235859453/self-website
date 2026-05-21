---
title: "ESP32 低功耗设计笔记"
description: "记录在智能墨水屏终端项目中，让 ESP32 在电池供电下运行数月的低功耗优化经验。"
pubDate: 2026-05-21
tags: ["嵌入式", "ESP32"]
draft: false
---

## 背景

在墨水屏显示终端项目中，设备需要电池供电并长期运行。ESP32 本身的功耗不低，不做优化的话几天就得换电池。本文记录我踩过的坑和最终方案。

## 核心策略

### 1. Deep Sleep 是基本盘

ESP32 的 deep sleep 模式下电流可以降到 **10μA 以下**。关键代码：

```c
#include "esp_sleep.h"

// 设置唤醒源：定时器
esp_sleep_enable_timer_wakeup(60 * 1000000); // 60 秒后唤醒

// 进入深度睡眠
esp_deep_sleep_start();
```

### 2. 唤醒后只做必要的事

每次唤醒后只更新屏幕、同步数据，然后立刻再睡。实测整个过程 3 秒内完成。

```c
void app_main() {
    // 检查唤醒原因
    esp_sleep_wakeup_cause_t cause = esp_sleep_get_wakeup_cause();

    // 快速更新显示
    update_display();
    sync_data();

    // 继续睡
    go_to_sleep(REFRESH_INTERVAL);
}
```

### 3. 外设电源管理

墨水屏驱动、传感器这些外设不用的时候要把电断干净，用 MOSFET 做电源开关，别依赖芯片内部的 GPIO 拉高。

## 实测数据

| 模式 | 电流 |
|------|------|
| 正常跑 WiFi | ~80mA |
| 仅 BLE | ~40mA |
| Light Sleep | ~0.8mA |
| Deep Sleep | ~8μA |

我的设备配置为 **每 10 分钟唤醒一次**，一块 2000mAh 的锂电池可以跑 **4 个月以上**。

## 小结

ESP32 做低功耗的关键不是某个黑科技，而是老老实实做好每次唤醒只干最少的事、用 deep sleep 消磨绝大多数时间、外设断电要切断底。
