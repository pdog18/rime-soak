1. 正确处理 m, n, ng, hm 等这些读音

   > https://github.com/rime/rime-pinyin-simp/issues/18

   ```yaml
   # pinyin_simp.custom.yaml
   patch:
     speller/algebra/+:
       - derive/^([hmn]).+$/$1/
   ```

   > 补充： `speller/algebra/+` ，注意看最后的 `+` ，如果没有这个 `+` ，则原方案会被覆盖导致无效

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

