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

   







> 1. 配置介绍
>
> 2. 实现方案
>
> 3. 在设置界面的展示样式 
>
> 4. 带来的新问题：各个设置如何排列？
>    每次提交时需要指定摆放位置。(这是第 4 条，同时也就是说两个提交不能有冲突)
>
>    在接收新选项时，界面排列需要更新
>
> 5. 新问题：
>    不同的配置的实现方案组合时不可以直接简单的叠加，还需要考虑先后顺序。
>    例如 speller/algebra 中：
>    简拼和模糊音两项配置，模糊音定义先于简拼定义，可以让简拼支持模糊音







### 特性

1. 通过一个「问号」的图标，鼠标移动上去时展示弹窗，弹窗内用图片展示属性效果

![image-20230129203914125](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20230129203914125.png)



---

2. 高级选项：
   1. 方案选择 <select>
   2. 特定应用中开启字符模式：例如在终端中
   3. 只能调整数字后标点（来自搜狗输入法）
   4. 皮肤跟随系统
   5. 切换到英文时，上屏已输入字符