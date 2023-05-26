[![GitHub Actions Status](https://github.com/pdog18/rime-soak/actions/workflows/deploy.yml/badge.svg)](https://github.com/pdog18/rime-soak/actions)

# rime-soak 「润笔」

「不起个好名，写码兴致索然。」 [——— by 山景答問](https://rime.im/blog/2016/04/14/qna-in-mtvu/)

用毛笔时直接蘸墨书写的效果并不是最好的，更好的做法是先用清水浸泡，即为「润笔」。

希望使「鼠须管」与「小狼毫」的上手变得更为舒适，起到先润笔再书写的效果。

---

### 使用方式：

 [在线使用](https://pdog18.github.io/rime-soak/)

### TODO

- [ ] 符号界面
  - [x] 中文模式下使用英文标点
  - [x] 成对符号
  - [ ] 使用更直观的界面(键盘图)来进行符号编辑

- [X] 指定应用中关闭中文模式
- [x] 所见即所得的自定义界面
   - [x] 小狼毫
     - [x] 配色
     - [x] 布局
   - [x] 鼠须管
     - [x] 配色
     - [x] 布局
     - [x] 夜间模式

- [x] 按键设置(完成部分，需要优化)
- [X] 自定义短语(首选词)
- [X] 英语单词
- [ ] 其他
  - [ ] 词典管理
  - [ ] 鼠须管中英双字体支持(英文使用英文字体，中文使用中文字体)
  - [ ] 模糊音
  - [ ] 符号大全
  - [ ] 主题画廊
  - [ ] 智能调整数字后标点
  - [X] 快速输入时间
  - [x] 候选词横屏状态使用 ← 与 → 选词，而不是  ↑ 与 ↓ ([changed]该功能使用按键修改即可)
  - [ ] 双拼拆字
  - [ ] lua 脚本设计的更通用一些，对于常见的获取系统变量的参数类 lua，直接提供对应系统变量的预设名
- [ ] 共享平台

  - [ ] 词库分享
  - [ ] 高级配置分享(?直接启动某人的配置，然后在配置上进行调整)
- [ ] Electron App

  - [ ] 可以访问 Rime 文件夹，保存后自动部署。部署成功后展示输入框，用以测试本次的配置效果。
