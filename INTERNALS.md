- each comic series (`manga`) is stored in a folder named after `mangaId` and each section (`mangaSection`) is stored as a subfolder named after `mangaSectionId`
- each section has a corresponding `.mhr_down_config`, which is a Base64 encoded Java serialization data
- Java serialization data is deserialized with [java.io](https://github.com/node-modules/java.io)
- the comic images are JPEG/PNGs stored with `.` prefix (hidden) and as `.mhr`: `.0.mhr`, `.1.mhr`, etc...
- the comic images file name is stored in `mangaSectionImages`
- each section has a corresponding category, determined by `mangaSectionName`
  - "第\d+话": 連載
  - "第\d 卷": 卷
  - others: 番外
- `sectionType` is always `1`

E.g.:

```
manhuaren
└── download
    └── 16464
        ├── 176845
        ├── 182758
        ├── 190209
        ├── 193209
        ├── 200873
        ├── 206800
        ├── 217398
        ├── 217999
        └── 251650
```

```sh
$ refine-manhuaren info ~/manhuaren/
[佐助写轮眼传]  (16464)
  [第1话: 宇智波佐助]  (176845)
  - /home/leesei/manhuaren/download/佐助写轮眼传/176845
  - 34 images
  - type[1] verticle[0] way[2]
  - prev[-1] next[182758]
  [第2话: 鹰…！！]  (182758)
  - /home/leesei/manhuaren/download/佐助写轮眼传/182758
  - 32 images
  - type[1] verticle[0] way[2]
  - prev[176845] next[190209]
  [第3话: 宇智波鼬！！]  (190209)
  - /home/leesei/manhuaren/download/佐助写轮眼传/190209
  - 37 images
  - type[1] verticle[0] way[2]
  - prev[182758] next[193209]
  [外传：第1话: JUMP客串版+番外]  (193209)
  - /home/leesei/manhuaren/download/佐助写轮眼传/193209
  - 5 images
  - type[1] verticle[0] way[2]
  - prev[190209] next[200873]
  [第4话: 漩涡鸣人]  (200873)
  - /home/leesei/manhuaren/download/佐助写轮眼传/200873
  - 30 images
  - type[1] verticle[0] way[2]
  - prev[193209] next[206800]
  [第5话]  (206800)
  - /home/leesei/manhuaren/download/佐助写轮眼传/206800
  - 29 images
  - type[1] verticle[0] way[2]
  - prev[200873] next[217398]
  [外传：第2话: 宇智波佐助与瞬人]  (217398)
  - /home/leesei/manhuaren/download/佐助写轮眼传/217398
  - 9 images
  - type[1] verticle[0] way[2]
  - prev[206800] next[217999]
  [第6话: 鹰的暑假！！]  (217999)
  - /home/leesei/manhuaren/download/佐助写轮眼传/217999
  - 30 images
  - type[1] verticle[0] way[2]
  - prev[217398] next[251650]
  [特别篇]  (251650)
  - /home/leesei/manhuaren/download/佐助写轮眼传/251650
  - 3 images
  - type[1] verticle[0] way[2]
  - prev[217999] next[-2]

```
