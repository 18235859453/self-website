---
title: "TypeScript 实用技巧：类型守卫"
description: "介绍 TypeScript 中类型守卫的几种写法，让代码更健壮。"
pubDate: 2026-05-15
tags: ["技术", "TypeScript"]
draft: false
---

## 什么是类型守卫

类型守卫（Type Guard）是 TypeScript 中用于在运行时缩小变量类型范围的机制。当你处理联合类型时，它们尤其有用。

## 几种常见写法

### typeof 守卫

```ts
function process(value: string | number) {
  if (typeof value === "string") {
    // 这里 value 的类型是 string
    return value.toUpperCase();
  }
  // 这里 value 的类型是 number
  return value.toFixed(2);
}
```

### in 操作符

```ts
interface Dog {
  bark: () => void;
}

interface Cat {
  meow: () => void;
}

function speak(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

### 自定义类型守卫

```ts
interface ApiResponse {
  data: unknown;
  error?: string;
}

function isSuccess(res: ApiResponse): res is { data: string } {
  return typeof res.data === "string" && !res.error;
}
```

`is` 关键字是自定义类型守卫的核心——它告诉 TypeScript，当函数返回 `true` 时，参数就是指定类型。

## 小结

类型守卫让你的代码在编译时和运行时都更安全。建议在项目中多使用 `is` 关键字定义自定义守卫，而不是到处写 `as` 断言。
