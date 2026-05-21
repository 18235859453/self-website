export interface Resume {
  name: string;
  title: string;
  email: string;
  github: string;
  summary: string;
  experience: Array<{
    company: string;
    role: string;
    period: string;
    highlights: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    period: string;
  }>;
  skills: Array<{ category: string; items: string[] }>;
  projects: Array<{
    name: string;
    description: string;
    url?: string;
    tech?: string[];
  }>;
}

export const resume: Resume = {
  name: "温世明",
  title: "嵌入式系统工程师",
  email: "18235859453@163.com",
  github: "https://github.com/18235859453",
  summary:
    "电子信息工程专业毕业，专注于嵌入式系统软硬件架构设计。熟练掌握 C/C++ 和 Python，具备从原理图设计到 PCB Layout 再到固件开发的完整能力。热衷将 AI 技术与嵌入式设备结合，追求极致性能与可靠性的工程实现。",
  experience: [
    {
      company: "实习 · 电机/变压器测试设备",
      role: "嵌入式开发",
      period: "2024",
      highlights: [
        "设计恒流源驱动与高精度信号调理电路，用于绕组温升测量",
        "实现 ADC 采样与数据处理算法，阻值测量精度达万分之三",
        "负责模块整体嵌入式软件开发与调试",
      ],
    },
    {
      company: "实习 · 家电研发",
      role: "电饭煲研发",
      period: "2023",
      highlights: [
        "参与智能电饭煲控制逻辑开发与温控算法调试",
        "协助硬件测试与 PCB 设计验证",
      ],
    },
  ],
  education: [
    {
      school: "中国计量大学",
      degree: "电子信息工程 · 本科",
      period: "2020.09 — 2024.07",
    },
  ],
  skills: [
    {
      category: "编程语言",
      items: ["C/C++", "Python"],
    },
    {
      category: "嵌入式",
      items: ["STM32", "ESP32", "FreeRTOS", "UART / IIC / SPI", "YOLO-v3", "PID 控制"],
    },
    {
      category: "硬件设计",
      items: ["模拟/数字电路", "PCB 设计", "信号完整性", "EMI/C", "OLED 显示"],
    },
    {
      category: "理论基础",
      items: ["微积分", "线性代数", "电路分析", "数字电路", "模拟电路"],
    },
  ],
  projects: [
    {
      name: "智能送药小车（2021 电赛）",
      description: "基于 STM32 和 FreeRTOS 的自主导航送药小车，集成 UART / IIC 通信，使用 YOLO-v3 视觉识别和 PID 速度控制算法。",
      url: "https://www.bilibili.com/video/BV1DN411a7DZ",
      tech: ["STM32", "FreeRTOS", "Python", "PID", "YOLO-v3"],
    },
    {
      name: "激光打靶系统（2023 电赛）",
      description: "省级一等奖。设计高精度激光打靶系统，包含光电传感器阵列与实时评分算法。",
      url: "https://www.bilibili.com/video/BV1F8411C7Th",
      tech: ["STM32", "传感器", "PCB"],
    },
    {
      name: "板球控制系统（2017 电赛）",
      description: "基于视觉反馈的板球平衡控制系统，使用 MuJoCo 仿真 IK 运动学解算，实现小球在平板上的精确定位控制。",
      url: "https://www.bilibili.com/video/BV1eu4y1U78N",
      tech: ["MuJoCo", "Python", "控制算法"],
    },
    {
      name: "双车跟随系统",
      description: "设计双车协同跟随系统，实现前车路径记录与后车自动循迹，支持动态避障与速度匹配。",
      url: "https://www.bilibili.com/video/BV1jk4y1V7QM",
      tech: ["STM32", "传感器融合", "PID"],
    },
    {
      name: "智能墨水屏显示终端",
      description: "基于 ESP32 的低功耗墨水屏信息显示终端，支持 WiFi 远程更新内容与电池供电长期运行。",
      url: "https://www.bilibili.com/video/BV1MC411n7Pm",
      tech: ["ESP32", "墨水屏", "WiFi", "低功耗"],
    },
    {
      name: "AI 语音聊天机器人",
      description: "基于 ESP32 的本地 AI 语音交互机器人，集成语音识别、TTS 与大模型 API，实现自然语言对话。",
      tech: ["ESP32", "AI", "语音识别", "TTS"],
    },
  ],
};
