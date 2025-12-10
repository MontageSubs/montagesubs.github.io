# Work Markdown Generator

生成符合网站格式的电影工作 markdown 文件的 Python 脚本（依赖 TMDB_API_KEY）。

## 使用方法

### 环境设置

1. 安装依赖：
```bash
pip install requests
```

2. 获取 TMDB API Key：
   - 访问 [TMDB](https://www.themoviedb.org/) 并注册账户
   - 在设置 > API 中获取 API Key

3. 设置环境变量（推荐）：
```bash
export TMDB_API_KEY="your_api_key_here"
```

### 基础用法

```bash
python scripts/generate_work_md.py <tmdb_id>
```

示例：
```bash
python scripts/generate_work_md.py 1088166
```

这会在 `_works/` 目录生成一个新的 markdown 文件。

### 高级选项

```bash
python scripts/generate_work_md.py <tmdb_id> [options]
```

选项说明：

- `--title <text>` - 中文标题（如不提供，将从 TMDB 获取）
- `--original-title <text>` - 原始标题（如不提供，将从 TMDB 获取）
- `--director <text>` - 导演名字
- `--summary <text>` - 电影简介（如不提供，将从 TMDB 获取）
- `--release-date <YYYY-MM-DD>` - 发布日期
- `--github-repo <owner/repo>` - GitHub 仓库名（如 MontageSubs/Movie_Title_Year）
- `--output <filename>` - 自定义输出文件名
- `--output-dir <path>` - 输出目录（默认：_works）
- `--api-key <key>` - 直接提供 API Key（推荐使用环境变量）

### 使用示例

```bash
# 基础：仅提供 TMDB ID
python scripts/generate_work_md.py 1088166

# 完整：提供所有信息
python scripts/generate_work_md.py 1088166 \
  --title "传话人" \
  --original-title "Relay" \
  --director "大卫·马肯兹 (David Mackenzie)" \
  --summary "他是一名匿名的化解高手..." \
  --release-date "2025-08-22" \
  --github-repo "MontageSubs/Relay_2024"

# 自定义输出位置
python scripts/generate_work_md.py 1088166 --output-dir ./test_output
```

## 生成的文件格式

脚本生成的 markdown 文件包含以下部分（需要手动填补的部分用空值表示）：

- **自动填充**：标题（中文优先）、原始标题（英文优先）、海报 URL、导演（credits 里取）、演员前 5、IMDb 链接、TMDB 链接、简介、上映日期
- **需手动填充**：
  - Douban 链接（豆瓣）
  - 字幕发布日期和更新信息
  - 字幕团队成员（翻译、校对、后期）
  - 下载链接（默认留 SubHD、字幕库 占位，可自行增减）
  - GitHub 仓库名/ID（`github_repo`），giscus 的 `repo_id`、`category_id`

## 文件结构

生成的文件遵循以下命名约定：
- 文件名格式：`{原始标题}_{年份}.md`
- 示例：`Relay_2024.md`, `Sorry_Baby_2025.md`

## 标题抓取逻辑

- 中文标题：依次尝试 `zh-CN`、`zh-SG` 翻译，均缺失时退回英文标题
- 英文标题：优先 `en-US`（或其他 `en` 翻译），再回退到 TMDB 的 `original_title`

## 注意事项

1. 脚本需要网络连接以调用 TMDB API
2. API 密钥请妥善保管，不要提交到代码仓库
3. 生成的文件需要人工审核和补充信息后才能发布
4. Douban 链接无法自动获取，需要手动添加
