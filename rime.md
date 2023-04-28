1. 正确处理 m, n, ng, hm 等这些读音

   > https://github.com/rime/rime-pinyin-simp/issues/18
   >

   ```yaml
   # pinyin_simp.custom.yaml
   patch:
     speller/algebra/+:
       - derive/^([hmn]).+$/$1/
   ```

   > 补充： `speller/algebra/+` ，注意看最后的 `+` ，如果没有这个 `+` ，则原方案会被覆盖导致无效
   >
2. 自定义符号

   ```yaml
   # pinyin_simp.custom.yaml
   patch:
     punctuator/half_shape:
       "/" : "/"
       "[" : "["
       "]" : "]"
       "{" : "「"
       "}" : "」"
       "=" : "="
       "~" : "~"
       "(" : "("
       ")" : ")"
   ```

   1. 「在中文模式下使用英文标点」
3. 超级简拼

   wsm => 为什么

   ```yaml
   # pinyin_simp.custom.yaml
   speller/algebra:
       - abbrev/^([a-z]).+$/$1/           # 簡拼（首字母）
       - abbrev/^([zcs]h).+$/$1/          # 簡拼（zh, ch, sh）
   ```
4. hint

   ```yaml
     "含列表的設定項/@0": 列表第一個元素新的設定值
     "含列表的設定項/@last": 列表最後一個元素新的設定值
     https://github.com/rime/home/wiki/RimeWithSchemata#%E7%88%B2%E5%95%A5%E9%80%99%E9%BA%BC%E7%B9%81
   ```
5. 纠错/纠错

   ```yaml
   # pinyin_simp.custom.yaml
   speller/algebra:
       - derive/^([nl])ve$/$1ue/          # nve = nue, lve = lue
       - derive/^([jqxy])u/$1v/           # ju = jv,
       - derive/un$/uen/                  # gun = guen,
       - derive/ui$/uei/                  # gui = guei,
       - derive/iu$/iou/                  # jiu = jiou,

       - derive/([aeiou])ng$/$1gn/        # dagn => dang 
       - derive/([dtngkhrzcs])o(u|ng)$/$1o/  # zho => zhong|zhou
       - derive/ong$/on/                  # zhonguo => zhong guo
       - derive/ao$/oa/                   # hoa => hao
       - derive/([iu])a(o|ng?)$/a$1$2/    # tain => tian
   ```

## 开发中的随想

#### 可以考虑的特性

1. 通过一个「问号」的图标，鼠标移动上去时展示弹窗，弹窗内用图片展示属性效果

![image-20230129203914125](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20230129203914125.png)

---

2. 高级选项：

   1. 方案选择
   2. 特定应用中开启字符模式：例如在终端中
   3. 智能调整数字后标点（参考搜狗输入法）
   4. 皮肤跟随系统
   5. 切换到英文时，上屏已输入字符
3. 配置的市场(用于发布自己的配置/下载其他人的配置)
4. rime 在配置好以后可以弹出一个输入框，用以测试本次的配置。
   这样减少了配置完后，主动寻找一个输入框的行为。
   这个输入框可以命名为「说给 Rime 」，用于使用者发布想说给 Rime 的话
5. rime 的初始字的频率太低了。例如
   (hao)绝大多数情况下都是期望输入 (好)不要因为输入了一次(号)就立马被挤到后方了。
   所以应该有一个设置固定词的功能。
6. 横屏状态下，应该是 ctrl +→←来切换候选词，所以在选择横屏后，应该弹出提示是否切换选择候选词快捷键。
7. 「符号配置」应该在一个键盘图上更加美观？(可以两种方案同时存在，进行切换。)

#### chatgpt

1. 一个中文输入法应该有哪些设置可以由用户进行选择？

> 中文输入法可以提供许多设置供用户进行选择，以下是一些常见的设置：
> 拼音选择：用户可以选择使用普通话拼音、粤语拼音、闽南语拼音等不同的拼音输入方式。
> 笔画输入：用户可以选择使用笔画输入法来输入汉字。
> 字库选择：用户可以选择使用不同的字库，如常用字库、古汉字库、网络流行词库等。
> 自定义词库：用户可以添加自己的词库，方便输入个人常用的词语。
> 多语言支持：用户可以选择使用多种语言的输入法，如中英文混合、中日韩输入法等。
> 自动纠错：用户可以选择是否开启自动纠错功能。
> 快捷键设置：用户可以自定义一些常用操作的快捷键，以提高输入效率。
> 界面风格：用户可以选择不同的皮肤或主题来改变输入法的界面风格。
> 输入方式选择：用户可以选择使用拼音、手写、语音等不同的输入方式。
> 输入提示：用户可以选择是否开启输入提示功能，以帮助输入更准确和快捷。
> 自动保存：用户可以选择是否开启自动保存功能，以保存输入过的词语或句子。
> 自动更新：用户可以选择是否开启自动更新功能，以更新输入法的词库和软件版本。
> 以上是一些常见的中文输入法设置，不同的输入法可能会有所不同。用户可以根据自己的需求选择相应的设置。

1. 你对 Rime 输入法有什么好的建议吗？


---



1. 如果是系统配色，那么使用系统配色
2. 如果不是系统配色，尝试从配置文件中获取以下颜色

   1. back_color
   2. border_color
   3. preedit_back_color
   4. text_color
   5. hilited_text_color ?? text_color
   6. hilited_back_color
   7. candidate_text_color ?? text_color
   8. hilited_candidate_text_color ?? hilited_text_color
   9. hilited_candidate_back_color ?? hilited_back_color
   10. comment_text_color
   11. hilited_comment_text_color
   12. label_color
   13. label_hilited_color (hilited_candidate_label_color 兼容)
3. 经过(2)后，下面判断对应颜色是否存在，如果不存在，则使用(默认)配色

   1. backgroundColor
   2. candidateTextColor
   3. candidateLabelColor ， 如果没有判断当前是否是 native 配色，如果是那么使用 secondaryTextColor，如果不是 `blendColors(candidateTextColor, backgroundColor)`
   4. highlightedCandidateTextColor
   5. highlightedCandidateBackColor
   6. highlightedCandidateLabelColor，如果没有判断当前是否是 native 配色，如果是那么使用 secondaryTextColor，如果不是 `blendColors(highlightedCandidateTextColor, highlightedCandidateBackColor)`
   7. commentTextColor ?? secondaryTextColor
   8. highlightedCommentTextColor ?? commentTextColor
   9. textColor ?? secondaryTextColor
   10. highlightedTextColor
