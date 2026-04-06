import { redirect } from 'next/navigation';
import octokit from './octokit';

const owner = process.env.NEXT_PUBLIC_OWNER;
const repo = process.env.NEXT_PUBLIC_REPO;

// 核心升级：增加可选的 tag 参数
export async function getPosts(page: number, tag?: string) {
  try {
    // 逻辑组合：如果有 tag，则请求 'blog,具体的tag'；否则只请求 'blog'
    const labels = tag ? `blog,${tag}` : 'blog';
    const { data } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      per_page: 10,
      page,
      labels, 
    });

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 核心新增：获取仓库中存在的所有标签（用于生成标签墙）
export async function getTags() {
  try {
    const { data } = await octokit.rest.issues.listLabelsForRepo({
      owner,
      repo,
    });
    // 物理过滤：排除掉系统底层用作标识的 'blog' 标签
    return data.filter(label => label.name !== 'blog');
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 下方原有逻辑保持绝对不变
export async function getPost(issue_number: number) {
  try {
    const { data } = await octokit.rest.issues.get({
      owner,
      repo,
      issue_number,
    });

    if (data.state === 'closed') {
      throw new Error('Post is deleted');
    }

    return data;
  } catch (error) {
    console.error(error);
    redirect('/');
  }
}

export async function getComments(issue_number: number) {
  try {
    const { data } = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number,
    });

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}