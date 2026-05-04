name: 讨论
description: 开放讨论、建议反馈或协作改进
title: "[discussion] "
labels:
  - discussion

body:
  - type: markdown
    attributes:
      value: |
        感谢你的想法！这里是开放讨论的地方，帮助我们达成共识和集思广益。
        
        提示：
        - 欢迎分享任何想法、建议或改进意见
        - 如果对已实施的改动有不同看法，我们一起讨论
        - 充分沟通后仍无法达成共识时，在评论中发起投票帖，使用 👍 赞同 / 👎 反对 emoji 反应投票

  - type: textarea
    id: background
    attributes:
      label: 背景与想法
      description: 为什么提出这个讨论？你有什么想法或建议。
      placeholder: |
        例如：
        - 我注意到...，觉得可以...
        - 想讨论是否应该采用某个方案
        - 认为当前的做法可以改进，建议...
    validations:
      required: true

  - type: textarea
    id: thoughts
    attributes:
      label: 具体意见
      description: 详细说明你的观点和理由。
      placeholder: "清晰阐述你的想法，便于大家讨论和理解"
    validations:
      required: true

  - type: textarea
    id: related
    attributes:
      label: 相关链接（可选）
      description: 关联的 Issue、PR、提交或讨论。
      placeholder: "例如：#123、PR #456、提交 abc1234"
