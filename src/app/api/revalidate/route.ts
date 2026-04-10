/* eslint-disable import/prefer-default-export */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// 核心接收器：只允许 POST 请求，防止浏览器爬虫误触
export async function POST(request: NextRequest) {
  // 1. 提取 URL 中携带的暗号
  const secret = request.nextUrl.searchParams.get('secret');

  // 2. 物理鉴权：如果暗号和环境变量里的不一致，直接拦截并报警
  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    );
  }

  try {
    // 3. 核爆指令：精准定点清除主页（'/'）的永久数据缓存
    revalidatePath('/');
    
    // 4. 返回成功回执给 Python (或任何调用方)
    return NextResponse.json(
      { revalidated: true, now: Date.now() },
      { status: 200 }
    );
  } catch (err) {
    // 5. 异常处理：防止服务器崩溃
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
